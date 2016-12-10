import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as invariant from 'invariant';

import * as duck from './formsDuck';


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

type StateProps = {
  _form: duck.Form,
};

type ActionProps = {
  addForm: duck.AddFormCreator,
  removeForm: duck.RemoveFormCreator,
};

type Props<T> = StateProps & ActionProps & T;


const PROPS_TO_OMIT = [
  '_form',
  'addForm',
  'removeForm',
];


const reduxForm = <T>(options: Options) => {
  invariant(
      options.form && typeof options.form === 'string',
      '[mobx-forms] "form" is a required string on the "reduxForm" decorator.',
  );

  return (Wrapped: WrappedComponent<Props<T>>): React.ComponentClass<T> => {
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

        props.addForm(options.form);
      }

      componentWillUnmount() {
        if (!options.persistent) {
          this.props.removeForm(options.form);
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
        // React.SFC vs. React.ClassComponent collision
        return React.createElement(<any> Wrapped, R.omit(PROPS_TO_OMIT, this.props));
      }
    }

    return connect<StateProps, ActionProps, T>((state) => ({
      _form: R.prop<duck.Form>(options.form, state.reduxForms),
    }), {
      addForm: duck.addForm,
      removeForm: duck.removeForm,
    })(ReduxForm);
  };
};

export default reduxForm;
