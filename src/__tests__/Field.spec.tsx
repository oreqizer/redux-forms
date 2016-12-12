/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import * as R from 'ramda';

import ConnectedField from '../Field';
import { field } from '../utils/containers';


// NOTE:
// We're unwrapping 'Field' from 'connect' and 'connectField'.
// Props needed mocking:
// - _form: string
// - _id: string
// state:
// - _field: FieldObject
// actions:
// - _addField: AddFieldCreator
// - _removeField: RemoveFieldCreator
// - _fieldChange: FieldChangeCreator
// - _fieldFocus: FieldFocusCreator
// - _fieldBlur: FieldBlurCreator
const Field = (ConnectedField as any).WrappedComponent;

const freshMeta = {
  active: false,
  dirty: false,
  error: null,
  touched: false,
  visited: false,
};

const Component = (props: any) => (
  <input
    type="text"
    value={props.input.value}
    onChange={props.input.onChange}
    onFocus={props.input.onFocus}
    onBlur={props.input.onBlur}
  />
);

const event = (value: string) => ({
  preventDefault: R.identity,
  stopPropagation: R.identity,
  target: { value },
});


describe('#Field', () => {
  it('should pass props to a string component', () => {
    const wrapper = shallow(
      <Field
        name="test"
        component="input"
        _field={field}
        _id="test"
        _form="form"
        _addField={jest.fn()}
      />,
    );

    expect(wrapper.prop('name')).toBe('test');
    expect(wrapper.prop('value')).toBe('');
    expect(wrapper.prop('onChange')).toBeDefined();
    expect(wrapper.prop('onFocus')).toBeDefined();
    expect(wrapper.prop('onBlur')).toBeDefined();

    expect(wrapper.prop('component')).toBeUndefined();
  });

  it('should pass props to a custom component', () => {
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        _field={field}
        _id="test"
        _form="form"
        _addField={jest.fn()}
      />,
    );

    expect(wrapper.prop('input').value).toBe('');
    expect(wrapper.prop('input').onChange).toBeDefined();
    expect(wrapper.prop('input').onFocus).toBeDefined();
    expect(wrapper.prop('input').onBlur).toBeDefined();

    expect(wrapper.prop('meta')).toEqual(freshMeta);

    expect(wrapper.prop('component')).toBeUndefined();
    expect(wrapper.prop('field')).toBeUndefined();
  });

  it('should add a clean field', () => {
    const addField = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        _field={null}
        _id="test"
        _form="form"
        _addField={addField}
      />,
    );

    expect(addField).toBeCalledWith('form', 'test', field);
  });

  it('should add a field with a default value', () => {
    const addField = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        defaultValue="doge"
        _field={null}
        _id="test"
        _form="form"
        _addField={addField}
      />,
    );

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      value: 'doge',
    });
  });

  it('should add a field with a validator', () => {
    const validate = (value: string) => value.length > 5 ? null : 'too short';

    const addField = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        validate={validate}
        _field={null}
        _id="test"
        _form="form"
        _addField={addField}
      />,
    );

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      error: 'too short',
    });
  });

  it('should add a field with a normalizer', () => {
    const pattern = '__val__ km';
    const normalize = (value: string) => pattern.replace('__val__', value);

    const addField = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        normalize={normalize}
        _field={null}
        _id="test"
        _form="form"
        _addField={addField}
      />,
    );

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      value: ' km',
    });
  });

  it('should add a field with a validator and a normalizer', () => {
    const pattern = '__val__ km';
    const validate = (value: string) => value.includes('km') ? null : 'bad format';
    const normalize = (value: string) => pattern.replace('__val__', value);

    const addField = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        validate={validate}
        normalize={normalize}
        _field={null}
        _id="test"
        _form="form"
        _addField={addField}
      />,
    );

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      value: ' km',
      error: null,
    });
  });

  it('should add a field with a default value, a validator and a normalizer', () => {
    const pattern = '__val__ km';
    const validate = (value: string) => value.includes('km') ? null : 'bad format';
    const normalize = (value: string) => pattern.replace('__val__', value);

    const addField = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        defaultValue="250"
        validate={validate}
        normalize={normalize}
        _field={null}
        _id="test"
        _form="form"
        _addField={addField}
      />,
    );

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      value: '250 km',
      error: null,
    });
  });

  it('should unmount a field', () => {
    const removeField = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        _field={field}
        _id="test"
        _form="form"
        _addField={jest.fn()}
        _removeField={removeField}
      />,
    );

    expect(removeField).not.toBeCalled();

    wrapper.unmount();

    expect(removeField).toBeCalledWith('form', 'test');
  });

  it('should fire a change action', () => {
    const fieldChange = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        _field={field}
        _id="test"
        _form="form"
        _fieldChange={fieldChange}
      />,
    );

    expect(fieldChange).not.toBeCalled();

    (wrapper.instance() as any).handleChange(event('doge'));

    expect(fieldChange).toBeCalledWith('form', 'test', 'doge', null, true);
  });

  it('should fire a focus action', () => {
    const fieldFocus = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        _field={field}
        _id="test"
        _form="form"
        _fieldFocus={fieldFocus}
      />,
    );

    expect(fieldFocus).not.toBeCalled();

    (wrapper.instance() as any).handleFocus();

    expect(fieldFocus).toBeCalledWith('form', 'test');
  });

  it('should fire a blur action', () => {
    const fieldBlur = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        _field={field}
        _id="test"
        _form="form"
        _fieldBlur={fieldBlur}
      />,
    );

    expect(fieldBlur).not.toBeCalled();

    (wrapper.instance() as any).handleBlur(event('doge'));

    expect(fieldBlur).toBeCalledWith('form', 'test', null, true);
  });
});
