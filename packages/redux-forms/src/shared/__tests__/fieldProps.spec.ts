/// <reference types="jest" />
import * as R from "ramda";

import fieldProps, { boolField } from '../fieldProps';


const onChange = R.identity;
const onFocus = R.identity;
const onBlur = R.identity;

const props = {
  // input
  // ---
  value: '1337',
  checked: false,
  name: 'fieldz',
  onChange,
  onFocus,
  onBlur,

  // meta
  // ---
  error: 'not enough peanuts',
  dirty: false,
  visited: false,
  touched: true,
  active: false,

  // field
  // ---
  _field: {},
};

const props2 = {
  ...props,
  value: true,
};

describe('#fieldProps', () => {
  it('should separate input props', () => {
    const result: any = fieldProps(props);

    expect(result.input.value).toBe('1337');
    expect(result.input.checked).toBe(false);
    expect(result.input.name).toBe('fieldz');
    expect(result.input.onChange).toBeDefined();
    expect(result.input.onFocus).toBeDefined();
    expect(result.input.onBlur).toBeDefined();
  });

  it('should separate meta props', () => {
    const result: any = fieldProps(props);

    expect(result.meta.error).toBe('not enough peanuts');
    expect(result.meta.dirty).toBe(false);
    expect(result.meta.visited).toBe(false);
    expect(result.meta.touched).toBe(true);
    expect(result.meta.active).toBe(false);
  });

  it('should add a "checked" prop for boolean value', () => {
    const result: any = fieldProps(props2);

    expect(result.input.checked).toBe(true);
  });

  it('should turn "_field" prop to a boolean', () => {
    expect(boolField(props)).toEqual({
      ...props,
      _field: true,
    });
  });
});
