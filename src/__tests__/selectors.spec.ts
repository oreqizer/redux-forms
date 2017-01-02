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
    flat2: { ...field, touched: false },
  },
};

const dirtyform = {
  ...form,
  fields: {
    flat: { ...field, dirty: true },
    flat2: { ...field, dirty: false },
  },
};

const submitform = {
  ...form,
  submitting: true,
};

const emptystate: any = {};

const state = {
  reduxFormLite: { test: demoform },
};

const errstate = {
  reduxFormLite: { test: errform },
};

const touchstate = {
  reduxFormLite: { test: touchform },
};

const dirtystate = {
  reduxFormLite: { test: dirtyform },
};

const submitstate = {
  reduxFormLite: { test: submitform },
};


describe('#selectors', () => {
  it('should return empty if no reducer - value', () => {
    expect(selectors.valueSelector('nonexistent', emptystate)).toEqual({});
  });

  it('should return empty if no reducer - error', () => {
    expect(selectors.errorSelector('nonexistent', emptystate)).toEqual({});
  });

  it('should return empty if no reducer - valid', () => {
    expect(selectors.isValid('nonexistent', emptystate)).toBe(false);
  });

  it('should return empty if no reducer - touched', () => {
    expect(selectors.isTouched('nonexistent', emptystate)).toBe(false);
  });

  it('should return empty if no reducer - dirty', () => {
    expect(selectors.isDirty('nonexistent', emptystate)).toBe(false);
  });

  it('should return empty if no reducer - submitting', () => {
    expect(selectors.isSubmitting('nonexistent', emptystate)).toBe(false);
  });

  it('should return empty if no form - value', () => {
    expect(selectors.valueSelector('nonexistent', state)).toEqual({});
  });

  it('should return empty if no form - error', () => {
    expect(selectors.errorSelector('nonexistent', state)).toEqual({});
  });

  it('should return empty if no form - valid', () => {
    expect(selectors.isValid('nonexistent', state)).toBe(false);
  });

  it('should return empty if no form - touched', () => {
    expect(selectors.isTouched('nonexistent', state)).toBe(false);
  });

  it('should return empty if no form - valid', () => {
    expect(selectors.isDirty('nonexistent', state)).toBe(false);
  });

  it('should return empty if no form - touched', () => {
    expect(selectors.isSubmitting('nonexistent', state)).toBe(false);
  });

  it('should produce a memoized value form', () => {
    const res = selectors.valueSelector('test', state);
    const res2 = selectors.valueSelector('test', state);

    expect(res).toBe(res2);
  });

  it('should produce a memoized error form', () => {
    const res = selectors.errorSelector('test', state);
    const res2 = selectors.errorSelector('test', state);

    expect(res).toBe(res2);
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

  it('should reduce dirty - false', () => {
    const res = selectors.isDirty('test', state);

    expect(res).toBe(false);
  });

  it('should reduce dirty - true', () => {
    const res = selectors.isDirty('test', dirtystate);

    expect(res).toBe(true);
  });

  it('should determine submitting - false', () => {
    const res = selectors.isSubmitting('test', state);

    expect(res).toBe(false);
  });

  it('should determine submitting - true', () => {
    const res = selectors.isSubmitting('test', submitstate);

    expect(res).toBe(true);
  });
});
