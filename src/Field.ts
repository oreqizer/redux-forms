import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as invariant from 'invariant';

import connectField, { ContextProps } from './utils/connectField';
import prepareProps from './utils/prepareProps';
import getValue, { Value, SynthEvent } from './utils/getValue';
import { InputProps, MetaProps, IAllProps } from "./types/Props";

import * as duck from './formsDuck';
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
}

export type Validate = (value: Value) => string | null;

export type Normalize = (value: Value) => Value;


class Field extends React.PureComponent<AllProps, void> {
  // Must contain all props of 'AllProps'
  static defaultProps = {
    name: '',
    component: 'input',
    validate: () => null,
    normalize: R.identity,
    defaultValue: '',
    // context
    _form: '',
    _id: '',
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
    const { _fieldChange, _form, _id, normalize, validate, defaultValue } = this.props;

    if (!next._field) {
      // if form/id changes, add a new field
      if (_id !== next._id || _form !== next._form) {
        this.newField(next);
      }

      return;
    }

    if (defaultValue !== next.defaultValue) {
      const value = next.normalize(next._field.value);
      const error = next.validate(value);
      const dirty = next.defaultValue !== value;

      _fieldChange(_form, _id, value, error, dirty);
    }
  }

  componentWillUnmount() {
    const { _removeField, _form, _id } = this.props;

    _removeField(_form, _id);
  }

  newField(props: AllProps) {
    const value = props.normalize(props.defaultValue);
    const newField = R.compose<FieldObj, FieldObj, FieldObj>(
      R.set(R.lensProp('value'), value),
      R.set(R.lensProp('error'), props.validate(value)),
    )(field);

    props._addField(props._form, props._id, newField);
  }

  handleChange(ev: SynthEvent) {
    const { _fieldChange, _form, _id, normalize, validate, defaultValue } = this.props;

    const value = normalize(getValue(ev));
    const error = validate(value);
    const dirty = value !== defaultValue;

    _fieldChange(_form, _id, value, error, dirty);
  }

  handleFocus() {
    const { _fieldFocus, _form, _id } = this.props;

    _fieldFocus(_form, _id);
  }

  handleBlur(ev: SynthEvent) {
    const { _fieldBlur, _form, _id, normalize, validate, defaultValue } = this.props;

    const value = normalize(getValue(ev));
    const error = validate(value);
    const dirty = value !== defaultValue;

    _fieldBlur(_form, _id, error, dirty);
  }

  render() {
    const { component, _field, ...rest } = this.props;

    // Wait until field is initialized
    if (!_field) {
      return null;
    }

    const { input, meta, custom } = prepareProps(R.mergeAll<IAllProps>([rest, _field, {
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
  _addField: duck.AddFieldCreator,
  _removeField: duck.RemoveFieldCreator,
  _fieldChange: duck.FieldChangeCreator,
  _fieldFocus: duck.FieldFocusCreator,
  _fieldBlur: duck.FieldBlurCreator,
};

type AllProps = ConnectedProps & StateProps & ActionProps & DefaultProps;


const actions = {
  _addField: duck.addField,
  _removeField: duck.removeField,
  _fieldChange: duck.fieldChange,
  _fieldFocus: duck.fieldFocus,
  _fieldBlur: duck.fieldBlur,
};

const Connected = connect<StateProps, ActionProps, ConnectedProps>((state, props: ConnectedProps) => ({
  _field: R.path<FieldObj>([props._form, 'fields', props._id], state.reduxForms),
}), actions)(Field);

const Contexted = connectField<IOwnProps>(Connected);

Contexted.displayName = Field.displayName;

export default Contexted;
