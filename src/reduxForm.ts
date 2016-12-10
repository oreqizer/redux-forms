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
    form: duck.Form,
    formName: string,
    context: string,
    // actions
    addField: duck.AddFieldCreator,
    removeField: duck.RemoveFieldCreator,
    fieldChange: duck.FieldChangeCreator,
    fieldFocus: duck.FieldFocusCreator,
    fieldBlur: duck.FieldBlurCreator,
  };
};

export type WrappedComponent<T> = React.ComponentClass<T> | React.SFC<T>;

type StateProps = {
  _form: duck.Form,
};

type ActionProps = {
  addForm: duck.AddFormCreator,
  removeForm: duck.RemoveFormCreator,
  addField: duck.AddFieldCreator,
  removeField: duck.RemoveFieldCreator,
  fieldChange: duck.FieldChangeCreator,
  fieldFocus: duck.FieldFocusCreator,
  fieldBlur: duck.FieldBlurCreator,
};

type Props<T> = StateProps & ActionProps & T;


const PROPS_TO_OMIT = [
  '_form',
  'addForm',
  'removeForm',
  'addField',
  'removeField',
  'fieldChange',
  'fieldFocus',
  'fieldBlur',
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
          form: React.PropTypes.object.isRequired,
          formName: React.PropTypes.string.isRequired,
          context: React.PropTypes.string.isRequired,
          // actions
          addField: React.PropTypes.func.isRequired,
          removeField: React.PropTypes.func.isRequired,
          fieldChange: React.PropTypes.func.isRequired,
          fieldFocus: React.PropTypes.func.isRequired,
          fieldBlur: React.PropTypes.func.isRequired,
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
        const {
          _form,
          addField,
          removeField,
          fieldChange,
          fieldFocus,
          fieldBlur,
        } = this.props;

        return {
          reduxForms: {
            form: _form,  // TODO check if existent soon enough
            formName: options.form,
            context: '',
            // actions
            addField,
            removeField,
            fieldChange,
            fieldFocus,
            fieldBlur,
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
      addField: duck.addField,
      removeField: duck.removeField,
      fieldChange: duck.fieldChange,
      fieldFocus: duck.fieldFocus,
      fieldBlur: duck.fieldBlur,
    })(ReduxForm);
  };
};

export default reduxForm;
