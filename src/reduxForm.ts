import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as invariant from 'invariant';

import * as duck from './formsDuck';
import { FormObj } from "./utils/containers";


export type Options = {
  form: string,
  persistent?: boolean,
};

export type Context = {
  reduxForms: {
    form: string,
    context: string,
  };
};

export type WrappedComponent<T> = React.ComponentClass<T> | React.SFC<T>;

export type Connected<T> = React.ComponentClass<T> & {
  WrappedComponent: WrappedComponent<T>,
  WrappedForm: React.ComponentClass<T>,
};

type StateProps = {
  _form: FormObj | null,
};

type ActionProps = {
  _addForm: duck.AddFormCreator,
  _removeForm: duck.RemoveFormCreator,
};

type Props<T> = StateProps & ActionProps & T;


const PROPS_TO_OMIT = [
  '_form',
  '_addForm',
  '_removeForm',
];


const reduxForm = <T>(options: Options) => {
  invariant(
      options.form && typeof options.form === 'string',
      '[mobx-forms] "form" is a required string on the "reduxForm" decorator.',
  );

  return (Wrapped: WrappedComponent<Props<T>>): Connected<Props<T>> => {
    class ReduxForm extends React.Component<Props<T>, void> implements React.ChildContextProvider<Context> {
      static displayName = `ReduxForm(${Wrapped.displayName || 'Component'})`;

      static childContextTypes = {
        reduxForms: React.PropTypes.shape({
          form: React.PropTypes.string.isRequired,
          context: React.PropTypes.string.isRequired,
        }).isRequired,
      };

      constructor(props: Props<T>) {
        super(props);

        if (!props._form) {
          props._addForm(options.form);
        }
      }

      componentWillUnmount() {
        if (!options.persistent) {
          this.props._removeForm(options.form);
        }
      }

      getChildContext() {
        return {
          reduxForms: {
            form: options.form,
            context: '',
          },
        };
      }

      render() {
        // Wait until form is initialized
        if (!this.props._form) {
          return null;
        }

        // React.SFC vs. React.ClassComponent collision
        return React.createElement(<any> Wrapped, R.omit(PROPS_TO_OMIT, this.props));
      }
    }

    const Connected = connect<StateProps, ActionProps, T>((state) => ({
      _form: R.prop<FormObj>(options.form, state.reduxForms),
    }), {
      _addForm: duck.addForm,
      _removeForm: duck.removeForm,
    })(ReduxForm) as Connected<Props<T>>;  // allows for 'WrappedComponent' and 'ReduxForm'

    // Needed also here to overwrite connect's naming
    Connected.displayName = `ReduxForm(${Wrapped.displayName || 'Component'})`;

    // Expose the original component
    Connected.WrappedComponent = Wrapped;

    // Expose the wrapper for testing
    Connected.WrappedForm = ReduxForm;

    return Connected;
  };
};

export default reduxForm;
