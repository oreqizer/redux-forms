import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as invariant from 'invariant';

import { Context } from "./reduxForm";

import contextWrap, { ContextProps } from './utils/contextWrap';
import prepareProps from './utils/prepareProps';
import getValue, { Value, SynthEvent } from './utils/getValue';
import { IAllProps } from "./utils/prepareProps";
import { InputProps, MetaProps } from "./types/Props";

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

export type StateProps = {
  field: duck.FieldObject,
};

export type ActionProps = {
  addField: duck.AddFieldCreator,
  removeField: duck.RemoveFieldCreator,
  fieldChange: duck.FieldChangeCreator,
  fieldFocus: duck.FieldFocusCreator,
  fieldBlur: duck.FieldBlurCreator,
};

export type AllProps = StateProps & ActionProps & ContextProps & IOwnProps;


class Field extends React.Component<IOwnProps, void> {
  static defaultProps = {
    name: '',
    component: 'input',
    validate: () => null,
    normalize: () => null,
    defaultValue: '',
    field: duck.freshField,
    _form: '',
    _context: '',
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

    props.addField(props._form, props._context);
  }

  componentWillUnmount() {
    const { _form, _context } = this.props;

    this.props.removeField(_form, _context);
  }

  handleChange(ev: SynthEvent) {
    const { _form, _context, normalize, validate, defaultValue } = this.props;

    const value = (<Normalize> normalize)(getValue(ev));
    const error = (<Validate> validate)(value);
    const dirty = value === defaultValue;

    this.props.fieldChange(_form, _context, value, error, dirty);
  }

  handleFocus() {
    const { _form, _context } = this.props;

    this.props.fieldFocus(_form, _context);
  }

  handleBlur(ev: SynthEvent) {
    const { _form, _context, normalize, validate, defaultValue } = this.props;

    const value = (<Normalize> normalize)(getValue(ev));
    const error = (<Validate> validate)(value);
    const dirty = value === defaultValue;

    this.props.fieldBlur(_form, _context, error, dirty);
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

const actions = {
  addField: duck.addField,
  removeField: duck.removeField,
  fieldChange: duck.fieldChange,
  fieldFocus: duck.fieldFocus,
  fieldBlur: duck.fieldBlur,
};

// TODO remove wrappers, deal directly with context
export default connect<StateProps, ActionProps, IOwnProps>((state, props: IOwnProps & ContextProps) => ({
  field: R.path<duck.FieldObject>([props._form, 'fields', props._context], state.reduxForms),
}), actions)(contextWrap<AllProps>(Field));
