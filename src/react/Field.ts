import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux-forms/actions';
import * as R from 'ramda';

import connectField, { ContextProps } from './connectField';
import fieldProps, { boolField, InputProps, MetaProps } from '../shared/fieldProps';
import getValue, { Value, Target } from '../shared/getValue';
import { shallowCompare } from '../shared/helpers';
import { field, FieldObj } from '../shared/containers';


export type SuppliedProps = {
  input: InputProps,
  meta: MetaProps,
};

export type FieldProps<T> = T & {
  name: string,
  component: React.ComponentClass<T & SuppliedProps> | React.SFC<T & SuppliedProps> | string,
  validate?: Validate,
  normalize?: Normalize,
  defaultValue?: string,
  withRef?: (el: React.ReactElement<any>) => void,
};

export type Validate = (value: Value) => string | null;

export type Normalize = (value: Value) => Value;


class Field<T> extends React.Component<Props<T>, void> {
  // Must contain all props of 'StateProps & ActionProps'
  static defaultProps = {
    validate: () => null,
    normalize: R.identity,
    defaultValue: '',
    // state
    _field: null,
    // actions
    _addField: R.identity,
    _removeField: R.identity,
    _fieldChange: R.identity,
    _fieldFocus: R.identity,
    _fieldBlur: R.identity,
  };

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    component: React.PropTypes.oneOfType([
      React.PropTypes.string, React.PropTypes.func,
    ]).isRequired,
    validate: React.PropTypes.func,
    normalize: React.PropTypes.func,
    defaultValue: React.PropTypes.string,
  };

  static displayName = 'Field';

  constructor(props: Props<T>) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  shouldComponentUpdate(nextProps: Props<T>) {
    const { _field } = this.props;

    if (!shallowCompare(boolField(this.props), boolField(nextProps))) {
      return true;
    }

    return R.not(_field && nextProps._field && shallowCompare(_field, nextProps._field));
  }

  componentWillMount() {
    if (!this.props._field) {
      this.newField(this.props);
    }
  }

  componentWillReceiveProps(next: Props<T>) {
    const { _fieldChange, _form, name, normalize, validate, defaultValue } = this.props;

    if (!next._field) {
      this.newField(next);
      return;
    }

    if (defaultValue !== next.defaultValue) {
      const value = next.normalize(next._field.value);
      const error = next.validate(value);
      const dirty = next.defaultValue !== value;

      _fieldChange(_form, name, value, error, dirty);
    }
  }

  componentWillUnmount() {
    const { _removeField, _form, name } = this.props;

    _removeField(_form, name);
  }

  newField(props: Props<T>) {
    const value = props.normalize(props.defaultValue);
    const newField = R.compose<FieldObj, FieldObj, FieldObj>(
      R.set(R.lensProp('value'), value),
      R.set(R.lensProp('error'), props.validate(value)),
    )(field);

    props._addField(props._form, props.name, newField);
  }

  handleChange(ev: React.SyntheticEvent<Target> | Value) {
    const { _fieldChange, _form, name, normalize, validate, defaultValue } = this.props;

    const value = normalize(getValue(ev));
    const error = validate(value);
    const dirty = value !== defaultValue;

    _fieldChange(_form, name, value, error, dirty);
  }

  handleFocus() {
    const { _fieldFocus, _form, name } = this.props;

    _fieldFocus(_form, name);
  }

  handleBlur(ev: React.SyntheticEvent<Target> | Value) {
    const { _fieldBlur, _form, name, normalize, validate, defaultValue } = this.props;

    const value = normalize(getValue(ev));
    const error = validate(value);
    const dirty = value !== defaultValue;

    _fieldBlur(_form, name, value, error, dirty);
  }

  render() {
    const { component, withRef, _field } = this.props;

    // Wait until field is initialized
    if (!_field) {
      return null;
    }

    const props = R.mergeAll<T & InputProps & MetaProps>([this.props, { ref: withRef }, _field, {
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    }]);

    const { input, meta, custom } = fieldProps(props);

    if (typeof component === 'string') {
      return React.createElement(component, R.merge(custom, input));
    }

    // React.SFC vs. React.ClassComponent collision
    return React.createElement(component as any, R.merge(custom, { input, meta }));
  }
}


type ConnectedProps<T> = FieldProps<T> & ContextProps;

type DefaultProps = {
  validate: Validate,
  normalize: Normalize,
  defaultValue: string,
};

type StateProps = {
  _field: FieldObj | null,
};

type ActionProps = {
  _addField: actions.AddFieldCreator,
  _removeField: actions.RemoveFieldCreator,
  _fieldChange: actions.FieldChangeCreator,
  _fieldFocus: actions.FieldFocusCreator,
  _fieldBlur: actions.FieldBlurCreator,
};

type Props<T> = ConnectedProps<T> & StateProps & ActionProps & DefaultProps;


const bindActions = {
  _addField: actions.addField,
  _removeField: actions.removeField,
  _fieldChange: actions.fieldChange,
  _fieldFocus: actions.fieldFocus,
  _fieldBlur: actions.fieldBlur,
};

const Connected = connect<StateProps, ActionProps, ConnectedProps<{}>>((state, props: ConnectedProps<{}>) => ({
  _field: R.path<FieldObj>([props._form, 'fields', props.name], state.reduxFormLite),
}), bindActions)(Field);

const Contexted = connectField(Connected);

Contexted.displayName = Field.displayName;

export default Contexted;
