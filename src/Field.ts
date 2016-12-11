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

export type State = { field: duck.FieldObject };

export type Validate = (value: Value) => string | null;

export type Normalize = (value: Value) => Value;


class Field extends React.PureComponent<IOwnProps, State> {
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
    field: duck.freshField,
    // actions
    addField: R.identity,
    removeField: R.identity,
    fieldChange: R.identity,
    fieldFocus: R.identity,
    fieldBlur: R.identity,
  };

  props: AllProps;

  constructor(props: AllProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    props.addField(props._form, props._id);
  }

  componentWillUnmount() {
    const { removeField, _form, _id } = this.props;

    removeField(_form, _id);
  }

  handleChange(ev: SynthEvent) {
    const { fieldChange, _form, _id, normalize, validate, defaultValue } = this.props;

    const value = (<Normalize> normalize)(getValue(ev));
    const error = (<Validate> validate)(value);
    const dirty = value === defaultValue;

    fieldChange(_form, _id, value, error, dirty);
  }

  handleFocus() {
    const { fieldFocus, _form, _id } = this.props;

    fieldFocus(_form, _id);
  }

  handleBlur(ev: SynthEvent) {
    const { fieldBlur, _form, _id, normalize, validate, defaultValue } = this.props;

    const value = (<Normalize> normalize)(getValue(ev));
    const error = (<Validate> validate)(value);
    const dirty = value === defaultValue;

    fieldBlur(_form, _id, error, dirty);
  }

  render(): JSX.Element {
    const { component, field, ...rest } = this.props;

    const { input, meta, custom } = prepareProps(R.mergeAll<IAllProps>([rest, field, {
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
  field: duck.FieldObject,
};

type ActionProps = {
  addField: duck.AddFieldCreator,
  removeField: duck.RemoveFieldCreator,
  fieldChange: duck.FieldChangeCreator,
  fieldFocus: duck.FieldFocusCreator,
  fieldBlur: duck.FieldBlurCreator,
};

type AllProps = ConnectedProps & StateProps & ActionProps;


const Connected = connectField<AllProps>(Field);

const actions = {
  addField: duck.addField,
  removeField: duck.removeField,
  fieldChange: duck.fieldChange,
  fieldFocus: duck.fieldFocus,
  fieldBlur: duck.fieldBlur,
};

export default connect<StateProps, ActionProps, IOwnProps>((state, props: ConnectedProps) => ({
  field: R.path<duck.FieldObject>([props._form, 'fields', props._id], state.reduxForms),
}), actions)(Connected);
