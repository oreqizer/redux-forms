/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { shallow } from 'enzyme';

import ConnectedField from '../Field';
import { freshField } from '../formsDuck';


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


describe('#Field', () => {
  it('should mount a field with a string component', () => {
    const wrapper = shallow(
      <Field
        name="test"
        component="input"
        field={freshField}
      />,
    );

    expect(wrapper.prop('name')).toBe('test');
    expect(wrapper.prop('value')).toBe('');
    expect(wrapper.prop('onChange')).toBeDefined();
    expect(wrapper.prop('onFocus')).toBeDefined();
    expect(wrapper.prop('onBlur')).toBeDefined();

    expect(wrapper.prop('component')).toBeUndefined();
  });

  it('should mount a field with a custom component', () => {
    const wrapper = shallow(
      <Field
        name="test"
        component={Component}
        field={freshField}
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
