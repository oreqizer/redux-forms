import * as R from 'ramda';

import reducer from '../formsReducer';
import * as actions from '../actions';

import { form, field } from '../utils/containers';


describe('#formsReducer', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, <any> {});

    expect(state).toEqual({});
  });

  it('should add a form', () => {
    const state = reducer({}, actions.addForm('form'));

    expect(state).toEqual({ form });
  });

  it('should remove a form', () => {
    const state = reducer({ form }, actions.removeForm('form'));

    expect(state).toEqual({});
  });

  it('should add a field', () => {
    const state: any = reducer({
      form: { ...form, fields: {} },
    }, actions.addField('form', 'field', field));

    expect(state.form.fields.field).toEqual(field);
  });

  it('should remove a field', () => {
    const state: any = reducer({
      form: { ...form, fields: { field } },
    }, actions.removeField('form', 'field'));

    expect(state.form.fields).toEqual({});
  });

  it('should touch all fields', () => {
    const state: any = reducer({
      form: {
        ...form,
        fields: { field1: field, field2: field },
      },
    }, actions.touchAll('form'));

    expect(state.form.fields.field1.touched).toBe(true);
    expect(state.form.fields.field2.touched).toBe(true);
  });

  it('should touch start submit', () => {
    const state: any = reducer({ form }, actions.submitStart('form'));

    expect(state.form.submitting).toBe(true);
  });

  it('should touch stop submit', () => {
    const state: any = reducer({
      form: { ...form, submitting: true },
    }, actions.submitStop('form'));

    expect(state.form.submitting).toBe(false);
  });

  it('should add an array', () => {
    const state: any = reducer({
      form,
    }, actions.addArray('form', 'array'));

    expect(state.form.arrays.array).toBe(0);
  });

  it('should remove an array', () => {
    const state: any = reducer({
      form: {
        ...form,
        arrays: { array: 1 },
      },
    }, actions.removeArray('form', 'array'));

    expect(state.form).toEqual(form);
  });

  it('should push to an array', () => {
    const state: any = reducer({
      form: {
        ...form,
        arrays: { array: 1 },
      },
    }, actions.push('form', 'array'));

    expect(state.form.arrays.array).toBe(2);
  });

  it('should pop from an array', () => {
    const state: any = reducer({
      form: { ...form, arrays: { array: 2 } },
    }, actions.pop('form', 'array'));

    expect(state.form.arrays.array).toBe(1);
  });

  it('should unshift an array', () => {
    const state: any = reducer({
      form: {
        ...form,
        fields: { 'array.0': field },
        arrays: { array: 1 },
      },
    }, actions.unshift('form', 'array'));

    expect(state.form.fields['array.0']).toBeUndefined();
    expect(state.form.fields['array.1']).toBeDefined();
    expect(state.form.arrays.array).toBe(2);
  });

  it('should shift an array', () => {
    const state: any = reducer({
      form: {
        ...form,
        fields: { 'array.0': field, 'array.1': field },
        arrays: { array: 2 },
      },
    }, actions.shift('form', 'array'));

    expect(state.form.fields['array.0']).toBeDefined();
    expect(state.form.fields['array.1']).toBeUndefined();
    expect(state.form.arrays.array).toBe(1);
  });

  it('should change a field', () => {
    const state: any = reducer({
      form: { ...form, fields: { field } },
    }, actions.fieldChange('form', 'field', 'doge', 'error', true));

    expect(state.form.fields.field).toEqual({
      value: 'doge',
      error: 'error',
      dirty: true,
      touched: false,
      visited: false,
      active: false,
    });
  });

  it('should not change unwanted props', () => {
    const newField = {
      ...field,
      touched: true,
      visited: true,
      active: true,
    };

    const state: any = reducer({
      form: { ...form, fields: { field: newField } },
    }, actions.fieldChange('form', 'field', 'doge', 'error', true));

    expect(state.form.fields.field.touched).toBe(true);
    expect(state.form.fields.field.visited).toBe(true);
    expect(state.form.fields.field.active).toBe(true);
  });

  it('should focus a field', () => {
    const state: any = reducer({
      form: { ...form, fields: { field } },
    }, actions.fieldFocus('form', 'field'));

    expect(state.form.fields.field).toEqual({
      value: '',
      error: null,
      dirty: false,
      touched: false,
      visited: true,
      active: true,
    });
  });

  it('should not focus unwanted props', () => {
    const newField = {
      ...field,
      value: 'doge',
      error: 'error',
      dirty: true,
      touched: true,
    };

    const state: any = reducer({
      form: { ...form, fields: { field: newField } },
    }, actions.fieldFocus('form', 'field'));

    expect(state.form.fields.field.value).toBe('doge');
    expect(state.form.fields.field.error).toBe('error');
    expect(state.form.fields.field.dirty).toBe(true);
    expect(state.form.fields.field.touched).toBe(true);
  });

  it('should blur a field', () => {
    const newField = {
      ...field,
      active: true,
    };

    const state: any = reducer({
      form: { ...form, fields: { field: newField } },
    }, actions.fieldBlur('form', 'field', 'error', true));

    expect(state.form.fields.field).toEqual({
      value: '',
      error: 'error',
      dirty: true,
      touched: true,
      visited: false,
      active: false,
    });
  });

  it('should not blur unwanted props', () => {
    const newField = {
      ...field,
      value: 'doge',
      visited: true,
    };

    const state: any = reducer({
      form: { ...form, fields: { field: newField } },
    }, actions.fieldBlur('form', 'field', 'error', true));

    expect(state.form.fields.field.value).toBe('doge');
    expect(state.form.fields.field.visited).toBe(true);
  });
});
