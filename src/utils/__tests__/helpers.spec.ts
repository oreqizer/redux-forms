import * as R from 'ramda';

import * as helpers from '../helpers';


const event = {
  preventDefault: R.identity,
  stopPropagation: R.identity,
};

const fields = {
  'name': 'John',
  'nicknames.0': 'johnny',
  'nicknames.1': 'leet',
  'pets.0.foods.0.calories': 133,
  'pets.0.foods.1.calories': 337,
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

  it('should recognize a number', () => {
    expect(helpers.isNumber(1234)).toBe(true);
    expect(helpers.isNumber(13.37)).toBe(true);
  });

  it('should not recognize a number', () => {
    expect(helpers.isNumber(undefined)).toBe(false);
    expect(helpers.isNumber(null)).toBe(false);
    expect(helpers.isNumber('1234')).toBe(false);
    expect(helpers.isNumber({})).toBe(false);
    expect(helpers.isNumber([])).toBe(false);
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

  it('should unflatten an object', () => {
    expect(helpers.unflatten(fields)).toEqual({
      name: 'John',
      nicknames: ['johnny', 'leet'],
      pets: [{
        foods: [{
          calories: 133,
        }, {
          calories: 337,
        }],
      }],
    });
  });

  it('should not throw if ok', () => {
    expect(() => helpers.invariant(true, 'asdf')).not.toThrow();
  });

  it('should throw if not ok', () => {
    expect(() => helpers.invariant(false, 'asdf')).toThrowError(/asdf/);
  });
});
