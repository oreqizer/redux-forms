import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as invariant from 'invariant';

import { Context } from "./reduxForm";

import prepareProps from './utils/prepareProps';
import getValue, { Value, SynthEvent } from './utils/getValue';
import { InputProps, MetaProps, IAllProps } from "./types/Props";

import * as duck from './formsDuck';


export interface ISuppliedProps {
  input: InputProps;
  meta: MetaProps;
}

export interface IProps {
  name: string;
  component: React.ComponentClass<ISuppliedProps> | React.SFC<ISuppliedProps> | string;
  validate?: Validate;
  normalize?: Normalize;
  defaultValue?: string;
}

export type State = { field: duck.FieldObject };

export type Validate = (value: Value) => string | null;

export type Normalize = (value: Value) => Value;

const omitCtx = R.omit(['form']);


export default class Field extends React.Component<IProps, State> {
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

  static contextTypes = {
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

  props: IProps;
  state: State;
  context: Context;
  id: string;

  constructor(props: IProps, c: Context) {
    super(props);

    invariant(
        c.reduxForms,
        '[redux-forms] Field must be in a component decorated with "reduxForm"',
    );

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    const { addField, form, formName, context } = c.reduxForms;

    this.id = context ? `${context}.${props.name}` : props.name;
    this.state = {
      field: R.path<duck.FieldObject>(['fields', this.id], form),
    };

    addField(formName, this.id);
  }

  shouldComponentUpdate(nextProps: IProps, _: void, nextContext: Context) {
    const { reduxForms } = this.context;

    // Check all props (deep compare - props should be shallow)
    const propsOk = R.equals(this.props, nextProps);

    // Check field's identity
    const newField = R.path(['fields', this.id], nextContext.reduxForms.form);
    const fieldOk = this.field === newField;

    // Check if a shallow context property didn't change
    const contextOk = R.equals(omitCtx(nextContext.reduxForms), omitCtx(reduxForms));

    return R.any(R.not, [propsOk, fieldOk, contextOk]);
  }

  componentWillUnmount() {
    const { removeField, formName } = this.context.reduxForms;

    removeField(formName, this.id);
  }

  handleChange(ev: SynthEvent) {
    const { fieldChange, formName } = this.context.reduxForms;
    const { normalize, validate, defaultValue } = this.props;

    const value = (<Normalize> normalize)(getValue(ev));
    const error = (<Validate> validate)(value);
    const dirty = value === defaultValue;

    fieldChange(formName, this.id, value, error, dirty);
  }

  handleFocus() {
    const { fieldFocus, formName } = this.context.reduxForms;

    fieldFocus(formName, this.id);
  }

  handleBlur(ev: SynthEvent) {
    const { fieldBlur, formName } = this.context.reduxForms;
    const { normalize, validate, defaultValue } = this.props;

    const value = (<Normalize> normalize)(getValue(ev));
    const error = (<Validate> validate)(value);
    const dirty = value === defaultValue;

    fieldBlur(formName, this.id, error, dirty);
  }

  render(): JSX.Element {
    const { component, ...rest } = this.props;

    const { input, meta, custom } = prepareProps(R.mergeAll<IAllProps>([rest, this.field, {
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
