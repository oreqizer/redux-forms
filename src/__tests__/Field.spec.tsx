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

const pattern = '__val__ km';
const validate = (value: string) => value.includes('always error') ? null : 'bad format';
const normalize = (value: string) => pattern.replace('__val__', value);

const event = (value: string) => ({
  preventDefault: R.identity,
  stopPropagation: R.identity,
  target: { value },
});


describe('#Field', () => {
  it('should not add a field', () => {
    const addField = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        _field={field}
        _id="test"
        _form="form"
        _addField={addField}
      />,
    );

    expect(addField).not.toBeCalled();
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
      error: 'bad format',
    });
  });

  it('should add a field with a normalizer', () => {
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
      error: 'bad format',
    });
  });

  it('should add a field with a default value, a validator and a normalizer', () => {
    const addField = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        defaultValue="asdf"
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
      value: 'asdf km',
      error: 'bad format',
    });
  });

  it('should re-mount a clean field', () => {
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

    wrapper.setProps({ _form: "form2", _id: "test2" });

    expect(addField).toBeCalledWith('form2', 'test2', field);
  });

  it('should re-mount a field with a default value', () => {
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

    wrapper.setProps({ defaultValue: 'doge' });

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      value: 'doge',
    });
  });

  it('should re-mount a field with a validator', () => {
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

    wrapper.setProps({ validate });

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      error: 'bad format',
    });
  });

  it('should re-mount a field with a normalizer', () => {
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

    wrapper.setProps({ normalize });

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      value: ' km',
    });
  });

  it('should re-mount a field with a validator and a normalizer', () => {
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

    wrapper.setProps({ validate, normalize });

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      value: ' km',
      error: 'bad format',
    });
  });

  it('should re-mount a field with a default value, a validator and a normalizer', () => {
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

    wrapper.setProps({ validate, normalize, defaultValue: 'asdf' });

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      value: 'asdf km',
      error: 'bad format',
    });
  });

  it('should change a field when default value changes', () => {
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

    wrapper.setProps({ defaultValue: '250' });

    expect(fieldChange).toBeCalledWith('form', 'test', '', null, true);
  });

  it('should change a field when validate changes', () => {
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

    wrapper.setProps({ validate });

    expect(fieldChange).toBeCalledWith('form', 'test', '', 'bad format', false);
  });

  it('should change a field when normalize changes', () => {
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

    wrapper.setProps({ normalize });

    expect(fieldChange).toBeCalledWith('form', 'test', ' km', null, true);
  });

  it('should change a field when default value, validator and normalizer changes', () => {
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

    wrapper.setProps({ validate, normalize, defaultValue: 'nope' });

    expect(fieldChange).toBeCalledWith('form', 'test', ' km', 'bad format', true);
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

  it('should fire a change action with default value', () => {
    const fieldChange = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        defaultValue="doge"
        _field={field}
        _id="test"
        _form="form"
        _fieldChange={fieldChange}
      />,
    );

    expect(fieldChange).not.toBeCalled();

    (wrapper.instance() as any).handleChange(event('doge'));

    expect(fieldChange).toBeCalledWith('form', 'test', 'doge', null, false);
  });

  it('should fire a validated change action', () => {
    const fieldChange = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        validate={validate}
        _field={field}
        _id="test"
        _form="form"
        _fieldChange={fieldChange}
      />,
    );

    expect(fieldChange).not.toBeCalled();

    (wrapper.instance() as any).handleChange(event('doge'));

    expect(fieldChange).toBeCalledWith('form', 'test', 'doge', 'bad format', true);
  });

  it('should fire a normalized change action', () => {
    const fieldChange = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        normalize={normalize}
        _field={field}
        _id="test"
        _form="form"
        _fieldChange={fieldChange}
      />,
    );

    expect(fieldChange).not.toBeCalled();

    (wrapper.instance() as any).handleChange(event('doge'));

    expect(fieldChange).toBeCalledWith('form', 'test', 'doge km', null, true);
  });

  it('should fire a validated and normalized change action with default value', () => {
    const fieldChange = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        validate={validate}
        normalize={normalize}
        defaultValue="doge km"
        _field={field}
        _id="test"
        _form="form"
        _fieldChange={fieldChange}
      />,
    );

    expect(fieldChange).not.toBeCalled();

    (wrapper.instance() as any).handleChange(event('doge'));

    expect(fieldChange).toBeCalledWith('form', 'test', 'doge km', 'bad format', false);
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

  it('should fire a blur action with default value', () => {
    const fieldBlur = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        defaultValue="doge"
        _field={field}
        _id="test"
        _form="form"
        _fieldBlur={fieldBlur}
      />,
    );

    expect(fieldBlur).not.toBeCalled();

    (wrapper.instance() as any).handleBlur(event('doge'));

    expect(fieldBlur).toBeCalledWith('form', 'test', null, false);
  });

  it('should fire a validated blur action', () => {
    const fieldBlur = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        validate={validate}
        _field={field}
        _id="test"
        _form="form"
        _fieldBlur={fieldBlur}
      />,
    );

    expect(fieldBlur).not.toBeCalled();

    (wrapper.instance() as any).handleBlur(event('doge'));

    expect(fieldBlur).toBeCalledWith('form', 'test', 'bad format', true);
  });

  it('should fire a normalized blur action', () => {
    const fieldBlur = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        normalize={normalize}
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

  it('should fire a validated and normalized blur action with default value', () => {
    const fieldBlur = jest.fn();
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        validate={validate}
        normalize={normalize}
        defaultValue="doge km"
        _field={field}
        _id="test"
        _form="form"
        _fieldBlur={fieldBlur}
      />,
    );

    expect(fieldBlur).not.toBeCalled();

    (wrapper.instance() as any).handleBlur(event('doge'));

    expect(fieldBlur).toBeCalledWith('form', 'test', 'bad format', false);
  });

  it('should not render without a field', () => {
    const wrapper = shallow(
      <Field
        name="test"
        component="input"
        _field={null}
        _id="test"
        _form="form"
        _addField={jest.fn()}
      />,
    );

    expect(wrapper.isEmptyRender()).toBe(true);
  });

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
});
