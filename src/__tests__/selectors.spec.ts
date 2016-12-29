import * as selectors from '../selectors';

import { form, field } from "../utils/containers";


const demoform = {
  ...form,
  fields: {
    'flat': field,
    'array.0': field,
    'array.1': field,
    'deep.0.array.0.name': field,
    'deep.0.array.1.name': field,
  },
};

const errform = {
  ...form,
  fields: {
    'flat': { ...field, error: 'error' },
    'array.0': field,
  },
};

const touchform = {
  ...form,
  fields: {
    flat: { ...field, touched: true },
  },
};

const state = {
  reduxFormLite: { test: demoform },
};

const errstate = {
  reduxFormLite: { test: errform },
};

const touchstate = {
  reduxFormLite: { test: touchform },
};


describe('#selectors', () => {
  it('should throw if no form in mapper', () => {
    expect(() => selectors.fieldSelector('nonexistent', state)).toThrow();
  });

  it('should throw if no form in reducer', () => {
    expect(() => selectors.isValid('nonexistent', state)).toThrow();
  });

  it('should produce a memoized form', () => {
    const res = selectors.fieldSelector('test', state);
    const res2 = selectors.fieldSelector('test', state);

    expect(res).toBe(res2);
  });

  it('should produce a nested form', () => {
    const res = selectors.fieldSelector('test', state);

    expect(res).toEqual({
      flat: field,
      array: [field, field],
      deep: [{
        array: [{ name: field }, { name: field }],
      }],
    });
  });

  it('should produce nested values', () => {
    const res = selectors.valueSelector('test', state);

    expect(res).toEqual({
      flat: '',
      array: ['', ''],
      deep: [{
        array: [{ name: '' }, { name: '' }],
      }],
    });
  });

  it('should produce nested errors', () => {
    const res = selectors.errorSelector('test', state);

    expect(res).toEqual({
      flat: null,
      array: [null, null],
      deep: [{
        array: [{ name: null }, { name: null }],
      }],
    });
  });

  it('should reduce valid - true', () => {
    const res = selectors.isValid('test', state);

    expect(res).toBe(true);
  });

  it('should reduce valid - false', () => {
    const res = selectors.isValid('test', errstate);

    expect(res).toBe(false);
  });

  it('should reduce touched - false', () => {
    const res = selectors.isTouched('test', state);

    expect(res).toBe(false);
  });

  it('should reduce touched - true', () => {
    const res = selectors.isTouched('test', touchstate);

    expect(res).toBe(true);
  });
});
