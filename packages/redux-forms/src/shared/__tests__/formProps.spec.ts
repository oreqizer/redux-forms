import * as R from "ramda";

import formProps, { toUpdate } from '../formProps';


const props = {
  // to omit
  // ---
  name: 'form',
  persistent: true,
  withRef: R.identity,
  // state
  _form: {},
  _values: {},
  _valid: false,
  _submitting: false,
  // actions
  _addForm: R.identity,
  _removeForm: R.identity,
  _touchAll: R.identity,
  _submitStart: R.identity,
  _submitStop: R.identity,

  // custom
  // ---
  damage: 'tons of',
  wow: 'so test',
};

const props2 = Object.assign({}, props, {
  value: true,
});

describe('#fieldProps', () => {
  it('should omit props', () => {
    const result = formProps(props);

    expect(result.name).toBeUndefined();
    expect(result.persistent).toBeUndefined();
    expect(result.withRef).toBeUndefined();
    expect(result._form).toBeUndefined();
    expect(result._values).toBeUndefined();
    expect(result._valid).toBeUndefined();
    expect(result._submitting).toBeUndefined();
    expect(result._addForm).toBeUndefined();
    expect(result._removeForm).toBeUndefined();
    expect(result._touchAll).toBeUndefined();
    expect(result._submitStart).toBeUndefined();
    expect(result._submitStop).toBeUndefined();
  });

  it('should keep custom props', () => {
    const result = formProps(props);

    expect(result.damage).toBe('tons of');
    expect(result.wow).toBe('so test');
  });

  it('should omit props not to update for', () => {
    const result = toUpdate(props);

    expect(result._values).toBeUndefined();
    expect(result._valid).toBeUndefined();
    expect(result._submitting).toBeUndefined();

    expect(result.name).toBeDefined();
    expect(result.persistent).toBeDefined();
    expect(result.withRef).toBeDefined();
    expect(result._form).toBeDefined();
    expect(result._addForm).toBeDefined();
    expect(result._removeForm).toBeDefined();
    expect(result._touchAll).toBeDefined();
    expect(result._submitStart).toBeDefined();
    expect(result._submitStop).toBeDefined();
  });
});
