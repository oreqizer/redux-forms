import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as invariant from 'invariant';

import connectField, { ContextProps } from './utils/connectField';
import prepareProps from './utils/prepareProps';
import getValue, { Value, SynthEvent } from './utils/getValue';
import { InputProps, MetaProps, IAllProps } from "./types/Props";

import * as duck from './formsDuck';


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


class Field extends React.PureComponent<IOwnProps, void> {
  // Must contain all props of 'AllProps'
  static defaultProps = {
    name: '',
    component: 'input',
    validate: () => null,
    normalize: () => null,
    defaultValue: '',
    // context
    _form: '',
    _id: '',
    // state
    _field: duck.freshField,
    // actions
    _addField: R.identity,
    _removeField: R.identity,
    _fieldChange: R.identity,
    _fieldFocus: R.identity,
    _fieldBlur: R.identity,
  };

  props: AllProps;

  constructor(props: AllProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    props._addField(props._form, props._id);
  }

  componentWillUnmount() {
    const { _removeField, _form, _id } = this.props;

    _removeField(_form, _id);
  }

  handleChange(ev: SynthEvent) {
    const { _fieldChange, _form, _id, normalize, validate, defaultValue } = this.props;

    const value = (<Normalize> normalize)(getValue(ev));
    const error = (<Validate> validate)(value);
    const dirty = value === defaultValue;

    _fieldChange(_form, _id, value, error, dirty);
  }

  handleFocus() {
    const { _fieldFocus, _form, _id } = this.props;

    _fieldFocus(_form, _id);
  }

  handleBlur(ev: SynthEvent) {
    const { _fieldBlur, _form, _id, normalize, validate, defaultValue } = this.props;

    const value = (<Normalize> normalize)(getValue(ev));
    const error = (<Validate> validate)(value);
    const dirty = value === defaultValue;

    _fieldBlur(_form, _id, error, dirty);
  }

  render(): JSX.Element {
    const { component, _field, ...rest } = this.props;

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

type StateProps = {
  _field: duck.FieldObject,
};

type ActionProps = {
  _addField: duck.AddFieldCreator,
  _removeField: duck.RemoveFieldCreator,
  _fieldChange: duck.FieldChangeCreator,
  _fieldFocus: duck.FieldFocusCreator,
  _fieldBlur: duck.FieldBlurCreator,
};

type AllProps = ConnectedProps & StateProps & ActionProps;


const Connected = connectField<AllProps>(Field);

const actions = {
  _addField: duck.addField,
  _removeField: duck.removeField,
  _fieldChange: duck.fieldChange,
  _fieldFocus: duck.fieldFocus,
  _fieldBlur: duck.fieldBlur,
};

export default connect<StateProps, ActionProps, IOwnProps>((state, props: ConnectedProps) => ({
  _field: R.path<duck.FieldObject>([props._form, 'fields', props._id], state.reduxForms),
}), actions)(Connected);
