/// <reference types="jest" />
import fieldProps from '../fieldProps';


const onChange = (id: any) => id;
const onFocus = (id: any) => id;
const onBlur = (id: any) => id;

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

  // custom
  // ---
  damage: 'tons of',
  wow: 'so test',
};

const props2 = Object.assign({}, props, {
  value: true,
});

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

  it('should separate custom props', () => {
    const result: any = fieldProps(props);

    expect(result.custom.damage).toBe('tons of');
    expect(result.custom.wow).toBe('so test');
  });

  it('should add a "checked" prop for boolean value', () => {
    const result: any = fieldProps(props2);

    expect(result.input.checked).toBe(true);
  });
});
