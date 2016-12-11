/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import * as R from 'ramda';

import ConnectedField from '../Field';
import { freshField } from '../formsDuck';


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
  it('should mount a field with a string component', () => {
    const addField = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component="input"
        _field={freshField}
        _id="test"
        _form="form"
        _addField={addField}
      />,
    );

    expect(addField).toBeCalledWith('form', 'test');

    expect(wrapper.prop('name')).toBe('test');
    expect(wrapper.prop('value')).toBe('');
    expect(wrapper.prop('onChange')).toBeDefined();
    expect(wrapper.prop('onFocus')).toBeDefined();
    expect(wrapper.prop('onBlur')).toBeDefined();

    expect(wrapper.prop('component')).toBeUndefined();
  });

  it('should mount a field with a custom component', () => {
    const addField = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        _field={freshField}
        _id="test"
        _form="form"
        _addField={addField}
      />,
    );

    expect(addField).toBeCalledWith('form', 'test');

    expect(wrapper.prop('input').value).toBe('');
    expect(wrapper.prop('input').onChange).toBeDefined();
    expect(wrapper.prop('input').onFocus).toBeDefined();
    expect(wrapper.prop('input').onBlur).toBeDefined();

    expect(wrapper.prop('meta')).toEqual(freshMeta);

    expect(wrapper.prop('component')).toBeUndefined();
    expect(wrapper.prop('field')).toBeUndefined();
  });

  it('should unmount a field', () => {
    const addField = jest.fn();
    const removeField = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        _field={freshField}
        _id="test"
        _form="form"
        _addField={addField}
        _removeField={removeField}
      />,
    );

    expect(addField).toBeCalledWith('form', 'test');
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
        _field={freshField}
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
        _field={freshField}
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
        _field={freshField}
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
