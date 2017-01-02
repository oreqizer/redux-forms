import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as invariant from 'invariant';

import * as actions from './actions';
import * as selectors from './selectors';
import { FormObj } from "./utils/containers";
import { isString, isPromise } from "./utils/helpers";


export type Options = {
  form: string,
  persistent?: boolean,
};

export type Context = {
  reduxFormLite: string;
};

export type WrappedComponent<T> = React.ComponentClass<T> | React.SFC<T>;

export type Connected<T> = React.ComponentClass<T> & {
  WrappedComponent: WrappedComponent<T>,
  WrappedForm: React.ComponentClass<Props<T>>,
};

export type StateProps = {
  _form: FormObj | null,
  _valid: boolean,
  _values: Object,
};

export type ActionProps = {
  _addForm: actions.AddFormCreator,
  _removeForm: actions.RemoveFormCreator,
  _touchAll: actions.TouchAllCreator,
  _submitStart: actions.SubmitStartCreator,
  _submitStop: actions.SubmitStopCreator,
};

export type Props<T> = StateProps & ActionProps & T & {
  onSubmit?: (values: Object) => Promise<any> | void,
  withRef?: (el: React.ReactElement<any>) => void,
};

export type SuppliedProps<T> = T & {
  onSubmit?: (ev: React.SyntheticEvent<HTMLFormElement>) => void,
};


const PROPS_TO_OMIT = [
  'withRef',
  '_form',
  '_valid',
  '_values',
  '_addForm',
  '_removeForm',
  '_touchAll',
  '_submitStart',
  '_submitStop',
];


const reduxForm = <T>(options: Options) => {
  invariant(
      isString(options.form),
      '[redux-form-lite] "form" is required on the "reduxForm" decorator.',
  );

  return (Wrapped: WrappedComponent<Props<T>>): Connected<SuppliedProps<T>> => {
    class ReduxForm extends React.Component<Props<T>, void> implements React.ChildContextProvider<Context> {
      static displayName = 'ReduxForm';

      static childContextTypes = {
        reduxFormLite: React.PropTypes.string.isRequired,
      };

      constructor(props: Props<T>) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentWillMount() {
        const { _form, _addForm } = this.props;

        if (!_form) {
          _addForm(options.form);
        }
      }

      componentWillUnmount() {
        if (!options.persistent) {
          this.props._removeForm(options.form);
        }
      }

      getChildContext() {
        return {
          reduxFormLite: options.form,
        };
      }

      handleSubmit(ev: React.SyntheticEvent<HTMLFormElement>) {
        const { onSubmit, _valid, _values, _touchAll, _submitStart, _submitStop } = this.props;

        ev.preventDefault();

        _touchAll(options.form);
        if (!_valid || typeof onSubmit !== 'function') {
          return;
        }

        const maybePromise = onSubmit(_values);
        if (isPromise(maybePromise)) {
          _submitStart(options.form);

          maybePromise.then(() => _submitStop(options.form));
        }
      }

      render() {
        const { withRef, _form } = this.props;

        // Wait until form is initialized
        if (!_form) {
          return null;
        }

        const props = R.mergeAll([this.props, { ref: withRef }, {
          onSubmit: this.handleSubmit,
        }]);

        // React.SFC vs. React.ClassComponent collision
        return React.createElement(<any> Wrapped, R.omit(PROPS_TO_OMIT, props));
      }
    }

    const Connected = connect<StateProps, ActionProps, T>((state) => ({
      _form: R.prop<FormObj>(options.form, state.reduxFormLite),
      _values: selectors.valueSelector(options.form, state),
      _valid: selectors.isValid(options.form, state),
      // public
      submitting: selectors.isSubmitting(options.form, state),
    }), {
      _addForm: actions.addForm,
      _removeForm: actions.removeForm,
      _touchAll: actions.touchAll,
      _submitStart: actions.submitStart,
      _submitStop: actions.submitStop,
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
