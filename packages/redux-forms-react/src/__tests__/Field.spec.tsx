/* eslint-disable react/prop-types */
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as R from 'ramda';

import reducer from 'redux-forms/lib/index';
import { form, field } from 'redux-forms/lib/containers';
import ConnectedField from '../Field';


// NOTE:
// We're unwrapping 'Field' from 'connect' and 'connectField'.
// Props needed mocking:
// - _form: string
// state:
// - _field: FieldObject
// actions:
// - _addField: AddFieldCreator
// - _fieldChange: FieldChangeCreator
// - _fieldFocus: FieldFocusCreator
// - _fieldBlur: FieldBlurCreator
const Field = (ConnectedField as any).WrappedComponent.WrappedComponent;

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

const options = {
  context: {
    reduxForms: 'test',
  },
  childContextTypes: {
    reduxForms: React.PropTypes.string.isRequired,
  },
};

// Any to allow nested property dot notation
const newStore = () => createStore(combineReducers<any>({
  reduxForms: reducer,
}), {
  reduxForms: { test: form },
});

const getForm = (state: any) => state.getState().reduxForms.test;


describe('#Field', () => {
  it('should not add a field', () => {
    const addField = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={field}
        _addField={addField}
      >
        <input />
      </Field>
    ));

    expect(addField).not.toBeCalled();
  });

  it('should add a clean field', () => {
    const addField = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={null}
        _addField={addField}
      >
        <input />
      </Field>
    ));

    expect(addField).toBeCalledWith('form', 'test', field);
  });

  it('should add a field with a default value', () => {
    const addField = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        defaultValue="doge"
        _form="form"
        _field={null}
        _addField={addField}
      >
        <input />
      </Field>
    ));

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      value: 'doge',
    });
  });

  it('should add a field with a validator', () => {
    const addField = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        validate={validate}
        _form="form"
        _field={null}
        _addField={addField}
      >
        <input />
      </Field>
    ));

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      error: 'bad format',
    });
  });

  it('should add a field with a normalizer', () => {
    const addField = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        normalize={normalize}
        _form="form"
        _field={null}
        _addField={addField}
      >
        <input />
      </Field>
    ));

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      value: ' km',
    });
  });

  it('should add a field with a validator and a normalizer', () => {
    const addField = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        validate={validate}
        normalize={normalize}
        _form="form"
        _field={null}
        _addField={addField}
      >
        <input />
      </Field>
    ));

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      value: ' km',
      error: 'bad format',
    });
  });

  it('should add a field with a default value, a validator and a normalizer', () => {
    const addField = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        defaultValue="asdf"
        validate={validate}
        normalize={normalize}
        _form="form"
        _field={null}
        _addField={addField}
      >
        <input />
      </Field>
    ));

    expect(addField).toBeCalledWith('form', 'test', {
      ...field,
      value: 'asdf km',
      error: 'bad format',
    });
  });

  it('should re-mount when no field', () => {
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={null}
        _addField={jest.fn()}
      >
        <input />
      </Field>
    ));

    const addField = jest.fn();

    wrapper.setProps({ _addField: addField });

    expect(addField).toBeCalled();
  });

  it('should re-mount a clean field', () => {
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={null}
        _addField={jest.fn()}
      >
        <input />
      </Field>
    ));

    const addField = jest.fn();

    wrapper.setProps({ _addField: addField, _form: "form2", name: "test2" });

    expect(addField).toBeCalledWith('form2', 'test2', field);
  });

  it('should re-mount a field with a default value', () => {
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={null}
        _addField={jest.fn()}
      >
        <input />
      </Field>
    ));

    const addField = jest.fn();

    wrapper.setProps({ _addField: addField, name: "test2", defaultValue: 'doge' });

    expect(addField).toBeCalledWith('form', 'test2', {
      ...field,
      value: 'doge',
    });
  });

  it('should re-mount a field with a validator', () => {
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={null}
        _addField={jest.fn()}
      >
        <input />
      </Field>
    ));

    const addField = jest.fn();

    wrapper.setProps({ _addField: addField, name: "test2", validate });

    expect(addField).toBeCalledWith('form', 'test2', {
      ...field,
      error: 'bad format',
    });
  });

  it('should re-mount a field with a normalizer', () => {
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={null}
        _addField={jest.fn()}
      >
        <input />
      </Field>
    ));

    const addField = jest.fn();

    wrapper.setProps({ _addField: addField, name: "test2", normalize });

    expect(addField).toBeCalledWith('form', 'test2', {
      ...field,
      value: ' km',
    });
  });

  it('should re-mount a field with a validator and a normalizer', () => {
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={null}
        _addField={jest.fn()}
      >
        <input />
      </Field>
    ));

    const addField = jest.fn();

    wrapper.setProps({ _addField: addField, name: "test2", validate, normalize });

    expect(addField).toBeCalledWith('form', 'test2', {
      ...field,
      value: ' km',
      error: 'bad format',
    });
  });

  it('should re-mount a field with a default value, a validator and a normalizer', () => {
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={null}
        _addField={jest.fn()}
      >
        <input />
      </Field>
    ));

    const addField = jest.fn();

    wrapper.setProps({
      _addField: addField,
      name: "test2",
      validate,
      normalize,
      defaultValue: 'asdf',
    });

    expect(addField).toBeCalledWith('form', 'test2', {
      ...field,
      value: 'asdf km',
      error: 'bad format',
    });
  });

  it('should change a field when default value changes', () => {
    const fieldChange = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={field}
        _fieldChange={fieldChange}
      >
        <input />
      </Field>
    ));

    wrapper.setProps({ defaultValue: '250' });

    expect(fieldChange).toBeCalledWith('form', 'test', '', null, true);
  });

  it('should fire a change action', () => {
    const fieldChange = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={field}
        _fieldChange={fieldChange}
      >
        <input />
      </Field>
    ));

    expect(fieldChange).not.toBeCalled();

    const instance: any = wrapper.instance();
    instance.handleChange(event('doge'));

    expect(fieldChange).toBeCalledWith('form', 'test', 'doge', null, true);
  });

  it('should fire a change action with default value', () => {
    const fieldChange = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        defaultValue="doge"
        _form="form"
        _field={field}
        _fieldChange={fieldChange}
      >
        <input />
      </Field>
    ));

    expect(fieldChange).not.toBeCalled();

    const instance: any = wrapper.instance();
    instance.handleChange(event('doge'));

    expect(fieldChange).toBeCalledWith('form', 'test', 'doge', null, false);
  });

  it('should fire a validated change action', () => {
    const fieldChange = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        validate={validate}
        _form="form"
        _field={field}
        _fieldChange={fieldChange}
      >
        <input />
      </Field>
    ));

    expect(fieldChange).not.toBeCalled();

    const instance: any = wrapper.instance();
    instance.handleChange(event('doge'));

    expect(fieldChange).toBeCalledWith('form', 'test', 'doge', 'bad format', true);
  });

  it('should fire a normalized change action', () => {
    const fieldChange = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        normalize={normalize}
        _form="form"
        _field={field}
        _fieldChange={fieldChange}
      >
        <input />
      </Field>
    ));

    expect(fieldChange).not.toBeCalled();

    const instance: any = wrapper.instance();
    instance.handleChange(event('doge'));

    expect(fieldChange).toBeCalledWith('form', 'test', 'doge km', null, true);
  });

  it('should fire a validated and normalized change action with default value', () => {
    const fieldChange = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        validate={validate}
        normalize={normalize}
        defaultValue="doge km"
        _form="form"
        _field={field}
        _fieldChange={fieldChange}
      >
        <input />
      </Field>
    ));

    expect(fieldChange).not.toBeCalled();

    const instance: any = wrapper.instance();
    instance.handleChange(event('doge'));

    expect(fieldChange).toBeCalledWith('form', 'test', 'doge km', 'bad format', false);
  });

  it('should fire a focus action', () => {
    const fieldFocus = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={field}
        _fieldFocus={fieldFocus}
      >
        <input />
      </Field>
    ));

    expect(fieldFocus).not.toBeCalled();

    const instance: any = wrapper.instance();
    instance.handleFocus();

    expect(fieldFocus).toBeCalledWith('form', 'test');
  });

  it('should fire a blur action', () => {
    const fieldBlur = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={field}
        _fieldBlur={fieldBlur}
      >
        <input />
      </Field>
    ));

    expect(fieldBlur).not.toBeCalled();

    const instance: any = wrapper.instance();
    instance.handleBlur(event('doge'));

    expect(fieldBlur).toBeCalledWith('form', 'test', 'doge', null, true);
  });

  it('should fire a blur action with default value', () => {
    const fieldBlur = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        defaultValue="doge"
        _form="form"
        _field={field}
        _fieldBlur={fieldBlur}
      >
        <input />
      </Field>
    ));

    expect(fieldBlur).not.toBeCalled();

    const instance: any = wrapper.instance();
    instance.handleBlur(event('doge'));

    expect(fieldBlur).toBeCalledWith('form', 'test', 'doge', null, false);
  });

  it('should fire a validated blur action', () => {
    const fieldBlur = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        validate={validate}
        _form="form"
        _field={field}
        _fieldBlur={fieldBlur}
      >
        <input />
      </Field>
    ));

    expect(fieldBlur).not.toBeCalled();

    const instance: any = wrapper.instance();
    instance.handleBlur(event('doge'));

    expect(fieldBlur).toBeCalledWith('form', 'test', 'doge', 'bad format', true);
  });

  it('should fire a normalized blur action', () => {
    const fieldBlur = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        normalize={normalize}
        _form="form"
        _field={field}
        _fieldBlur={fieldBlur}
      >
        <input />
      </Field>
    ));

    expect(fieldBlur).not.toBeCalled();

    const instance: any = wrapper.instance();
    instance.handleBlur(event('doge'));

    expect(fieldBlur).toBeCalledWith('form', 'test', 'doge km', null, true);
  });

  it('should fire a validated and normalized blur action with default value', () => {
    const fieldBlur = jest.fn();
    const wrapper = shallow((
      <Field
        name="test"
        validate={validate}
        normalize={normalize}
        defaultValue="doge km"
        _form="form"
        _field={field}
        _fieldBlur={fieldBlur}
      >
        <input />
      </Field>
    ));

    expect(fieldBlur).not.toBeCalled();

    const instance: any = wrapper.instance();
    instance.handleBlur(event('doge'));

    expect(fieldBlur).toBeCalledWith('form', 'test', 'doge km', 'bad format', false);
  });

  it('should not render without a field', () => {
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={null}
        _addField={jest.fn()}
      >
        <input />
      </Field>
    ));

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should pass props to a string component', () => {
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={field}
        _addField={jest.fn()}
      >
        <input />
      </Field>
    ));

    expect(wrapper.prop('name')).toBe('test');
    expect(wrapper.prop('value')).toBe('');
    expect(wrapper.prop('onChange')).toBeDefined();
    expect(wrapper.prop('onFocus')).toBeDefined();
    expect(wrapper.prop('onBlur')).toBeDefined();

    expect(wrapper.prop('component')).toBeUndefined();
  });

  it('should pass props to a custom component', () => {
    const wrapper = shallow((
      <Field
        name="test"
        _form="form"
        _field={field}
        _addField={jest.fn()}
      >
        <Component />
      </Field>
    ));

    expect(wrapper.prop('input').value).toBe('');
    expect(wrapper.prop('input').onChange).toBeDefined();
    expect(wrapper.prop('input').onFocus).toBeDefined();
    expect(wrapper.prop('input').onBlur).toBeDefined();

    expect(wrapper.prop('meta')).toEqual({
      active: false,
      dirty: false,
      error: null,
      touched: false,
      visited: false,
    });

    expect(wrapper.prop('component')).toBeUndefined();
    expect(wrapper.prop('field')).toBeUndefined();
  });
});


describe('#connect(Field)', () => {
  it('should not mount without context', () => {
    const store = newStore();
    const wrapperFn = () => mount((
      <Provider store={store}>
        <ConnectedField name="test">
          <input />
        </ConnectedField>
      </Provider>
    ));

    expect(wrapperFn).toThrowError(/Form/);
  });

  it('should have a correct name', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <ConnectedField name="test">
          <input />
        </ConnectedField>
      </Provider>
    ), options);

    expect(wrapper.find(ConnectedField).name()).toBe('Field');
  });

  it('should add a field', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <ConnectedField name="test">
          <input />
        </ConnectedField>
      </Provider>
    ), options);

    expect(getForm(store).fields).toEqual({ test: field });
    expect(wrapper.find('input').length).toBe(1);
  });

  it('should handle a change event', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <ConnectedField name="test">
          <input />
        </ConnectedField>
      </Provider>
    ), options);

    wrapper.find('input').simulate('change', event('doge'));

    expect(getForm(store).fields).toEqual({ test: {
      ...field,
      value: 'doge',
      dirty: true,
    } });
  });

  it('should handle a focus event', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <ConnectedField name="test">
          <input />
        </ConnectedField>
      </Provider>
    ), options);

    wrapper.find('input').simulate('focus');

    expect(getForm(store).fields).toEqual({ test: {
      ...field,
      visited: true,
      active: true,
    } });
  });

  it('should handle a blur event', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <ConnectedField name="test">
          <input />
        </ConnectedField>
      </Provider>
    ), options);

    wrapper.find('input').simulate('blur', event('doge'));

    expect(getForm(store).fields).toEqual({ test: {
      ...field,
      value: 'doge',
      touched: true,
      dirty: true,
    } });
  });
});
