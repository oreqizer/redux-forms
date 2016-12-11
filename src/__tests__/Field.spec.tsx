/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import reducer, { freshField } from '../formsDuck';

import ConnectedField from '../Field';


// NOTE:
// We're unwrapping 'Field' from 'connect' and 'connectField'.
// Props needed mocking:
// - _form: string
// - _id: string
// state:
// - field: FieldObject
// actions:
// - addField: AddFieldCreator
// - removeField: RemoveFieldCreator
// - fieldChange: FieldChangeCreator
// - fieldFocus: FieldFocusCreator
// - fieldBlur: FieldBlurCreator
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

const mountOptions = (form: string, context: string) => ({
  context: {
    reduxForms: {
      form,
      context,
    },
  },
  childContextTypes: {
    reduxForms: React.PropTypes.shape({
      form: React.PropTypes.string.isRequired,
      context: React.PropTypes.string.isRequired,
    }).isRequired,
  },
});

const getStore = () => createStore(combineReducers({
  reduxForms: reducer,
}));


describe('#Field', () => {
  it('should mount a field with a string component', () => {
    const input = mount(
      <Field
        name="test"
        component="input"
        field={freshField}
      />,
    ).find('input');

    expect(input.prop('name')).toBe('test');
    expect(input.prop('value')).toBe('');
    expect(input.prop('onChange')).toBeDefined();
    expect(input.prop('onFocus')).toBeDefined();
    expect(input.prop('onBlur')).toBeDefined();

    expect(input.prop('component')).toBeUndefined();
  });

  it('should mount a field with a custom component', () => {
    const component = mount(
      <Field
        name="test"
        component={Component}
        field={freshField}
      />,
    ).find(Component);

    expect(component.prop('input').value).toBe('');
    expect(component.prop('input').onChange).toBeDefined();
    expect(component.prop('input').onFocus).toBeDefined();
    expect(component.prop('input').onBlur).toBeDefined();

    expect(component.prop('meta')).toEqual(freshMeta);

    expect(component.prop('component')).toBeUndefined();
  });
});
