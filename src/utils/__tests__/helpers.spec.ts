import * as R from 'ramda';

import * as helpers from '../helpers';


const event = {
  preventDefault: R.identity,
  stopPropagation: R.identity,
};


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

  it('should recognize a function', () => {
    expect(helpers.isFunction(R.identity)).toBe(true);
    expect(helpers.isFunction(() => null)).toBe(true);
  });

  it('should not recognize a function', () => {
    expect(helpers.isFunction(undefined)).toBe(false);
    expect(helpers.isFunction(null)).toBe(false);
    expect(helpers.isFunction(1234)).toBe(false);
    expect(helpers.isFunction('asdf')).toBe(false);
    expect(helpers.isFunction({})).toBe(false);
    expect(helpers.isFunction([])).toBe(false);
  });

  it('should recognize an event', () => {
    expect(helpers.isEvent(event)).toBe(true);
  });

  it('should not recognize an event', () => {
    expect(helpers.isEvent(undefined)).toBe(false);
    expect(helpers.isEvent(null)).toBe(false);
    expect(helpers.isEvent(1234)).toBe(false);
    expect(helpers.isEvent('asdf')).toBe(false);
    expect(helpers.isEvent({})).toBe(false);
    expect(helpers.isEvent([])).toBe(false);
  });
});
