import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as invariant from 'invariant';

import connectField, { ContextProps } from './utils/connectField';
import fieldProps from './utils/fieldProps';
import getValue, { Value, SynthEvent } from './utils/getValue';
import { InputProps, MetaProps, IAllProps } from "./types/Props";

import * as actions from './actions';
import { field, FieldObj } from "./utils/containers";


export interface ISuppliedProps {
  input: InputProps;
  meta: MetaProps;
}

export interface IOwnProps {
  name: string;
  component: React.ComponentClass<ISuppliedProps> | React.SFC<ISuppliedProps> | string;
  validate?: Validate;
  normalize?: Normalize;
  defaultValue?: string;
  withRef?: (el: React.ReactElement<any>) => void;
}

export type Validate = (value: Value) => string | null;

export type Normalize = (value: Value) => Value;


class Field extends React.PureComponent<AllProps, void> {
  // Must contain all props of 'AllProps'
  static defaultProps = {
    validate: () => null,
    normalize: R.identity,
    defaultValue: '',
    // context
    _form: '',
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

  props: AllProps;

  constructor(props: AllProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillMount() {
    if (!this.props._field) {
      this.newField(this.props);
    }
  }

  componentWillReceiveProps(next: AllProps) {
    const { _fieldChange, form, name, normalize, validate, defaultValue } = this.props;

    if (!next._field) {
      this.newField(next);
      return;
    }

    if (defaultValue !== next.defaultValue) {
      const value = next.normalize(next._field.value);
      const error = next.validate(value);
      const dirty = next.defaultValue !== value;

      _fieldChange(form, name, value, error, dirty);
    }
  }

  componentWillUnmount() {
    const { _removeField, form, name } = this.props;

    _removeField(form, name);
  }

  newField(props: AllProps) {
    const value = props.normalize(props.defaultValue);
    const newField = R.compose<FieldObj, FieldObj, FieldObj>(
      R.set(R.lensProp('value'), value),
      R.set(R.lensProp('error'), props.validate(value)),
    )(field);

    props._addField(props.form, props.name, newField);
  }

  handleChange(ev: SynthEvent) {
    const { _fieldChange, form, name, normalize, validate, defaultValue } = this.props;

    const value = normalize(getValue(ev));
    const error = validate(value);
    const dirty = value !== defaultValue;

    _fieldChange(form, name, value, error, dirty);
  }

  handleFocus() {
    const { _fieldFocus, form, name } = this.props;

    _fieldFocus(form, name);
  }

  handleBlur(ev: SynthEvent) {
    const { _fieldBlur, form, name, normalize, validate, defaultValue } = this.props;

    const value = normalize(getValue(ev));
    const error = validate(value);
    const dirty = value !== defaultValue;

    _fieldBlur(form, name, error, dirty);
  }

  render() {
    const { component, withRef, _field, ...rest } = this.props;

    // Wait until field is initialized
    if (!_field) {
      return null;
    }

    const { input, meta, custom } = fieldProps(R.mergeAll<IAllProps>([rest, { ref: withRef }, _field, {
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    }]));

    if (typeof component === 'string') {
      return React.createElement(component, R.merge(custom, input));
    }

    // React.SFC vs. React.ClassComponent collision
    return React.createElement(<any> component, R.merge(custom, { input, meta }));
  }
}


type ConnectedProps = IOwnProps & ContextProps;

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

type AllProps = ConnectedProps & StateProps & ActionProps & DefaultProps;


const bindActions = {
  _addField: actions.addField,
  _removeField: actions.removeField,
  _fieldChange: actions.fieldChange,
  _fieldFocus: actions.fieldFocus,
  _fieldBlur: actions.fieldBlur,
};

const Connected = connect<StateProps, ActionProps, ConnectedProps>((state, props: ConnectedProps) => ({
  _field: R.path<FieldObj>([props.form, 'fields', props.name], state.reduxFormLite),
}), bindActions)(Field);

const Contexted = connectField<IOwnProps>(Connected);

Contexted.displayName = Field.displayName;

export default Contexted;
