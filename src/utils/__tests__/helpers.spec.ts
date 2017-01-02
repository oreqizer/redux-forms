import * as helpers from '../helpers';


describe('#helpers', () => {
  it('should recognize a string', () => {
    expect(helpers.isString('')).toBe(true);
    expect(helpers.isString('adsf')).toBe(true);
    expect(helpers.isString('1234')).toBe(true);
  });

  it('should not recognize a string', () => {
    expect(helpers.isString(undefined)).toBe(false);
    expect(helpers.isString(null)).toBe(false);
    expect(helpers.isString(1234)).toBe(false);
    expect(helpers.isString({})).toBe(false);
    expect(helpers.isString([])).toBe(false);
  });

  it('should recognize a promise', () => {
    expect(helpers.isPromise(new Promise((resolve) => resolve()))).toBe(true);
    expect(helpers.isPromise({ then: () => null })).toBe(true);
  });

  it('should not recognize a promise', () => {
    expect(helpers.isPromise(undefined)).toBe(false);
    expect(helpers.isPromise(null)).toBe(false);
    expect(helpers.isPromise(1234)).toBe(false);
    expect(helpers.isPromise('asdf')).toBe(false);
    expect(helpers.isPromise({})).toBe(false);
    expect(helpers.isPromise([])).toBe(false);
  });
});