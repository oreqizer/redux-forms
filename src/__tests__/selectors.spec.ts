import { fieldSelector, mapSelector } from '../selectors';

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

const state = {
  reduxFormLite: { test: demoform },
};


describe('#selectors', () => {
  it('should produce an empty object', () => {
    const res = fieldSelector('nonexistent', state);

    expect(res).toEqual({});
  });

  it('should produce a nested form', () => {
    const res = fieldSelector('test', state);

    expect(res).toEqual({
      flat: field,
      array: [field, field],
      deep: [{
        array: [{ name: field }, { name: field }],
      }],
    });
  });

  it('should map an empty object', () => {
    const res = mapSelector('nonexistent', (f) => f.value, state);

    expect(res).toEqual({});
  });

  it('should map a nested form', () => {
    const res = mapSelector('test', (f) => f.value, state);

    expect(res).toEqual({
      flat: '',
      array: ['', ''],
      deep: [{
        array: [{ name: '' }, { name: '' }],
      }],
    });
  });
});
