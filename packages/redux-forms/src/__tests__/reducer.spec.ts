import reducer from '../reducer';
import * as actions from '../actions';
import { form, field } from '../containers';


describe('#formsReducer', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, {} as any);

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

  it('should not add a field without form', () => {
    const state: any = reducer({}, actions.addField('form', 'field', field));

    expect(state.form).toBeUndefined();
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

  it('should not touch all fields without form', () => {
    const state: any = reducer({}, actions.touchAll('form'));

    expect(state).toEqual({});
  });

  it('should start submit', () => {
    const state: any = reducer({ form }, actions.submitStart('form'));

    expect(state.form.submitting).toBe(true);
  });

  it('should not start submit without form', () => {
    const state: any = reducer({}, actions.submitStart('form'));

    expect(state.form).toBeUndefined();
  });

  it('should stop submit', () => {
    const state: any = reducer({
      form: { ...form, submitting: true },
    }, actions.submitStop('form'));

    expect(state.form.submitting).toBe(false);
  });

  it('should not stop submit without form', () => {
    const state: any = reducer({}, actions.submitStop('form'));

    expect(state.form).toBeUndefined();
  });

  it('should add an array', () => {
    const state: any = reducer({
      form,
    }, actions.addArray('form', 'array'));

    expect(state.form.arrays.array).toBe(0);
  });

  it('should not add an array without form', () => {
    const state: any = reducer({}, actions.addArray('form', 'array'));

    expect(state.form).toBeUndefined();
  });

  it('should remove an array', () => {
    const state: any = reducer({
      form: {
        ...form,
        fields: { 'array.0': field },
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
    }, actions.arrayPush('form', 'array'));

    expect(state.form.arrays.array).toBe(2);
  });

  it('should not push to an array without form', () => {
    const state: any = reducer({}, actions.arrayPush('form', 'array'));

    expect(state.form).toBeUndefined();
  });

  it('should pop from an array', () => {
    const state: any = reducer({
      form: { ...form, arrays: { array: 2 } },
    }, actions.arrayPop('form', 'array'));

    expect(state.form.arrays.array).toBe(1);
  });

  it('should not pop from an array without form', () => {
    const state: any = reducer({}, actions.arrayPop('form', 'array'));

    expect(state.form).toBeUndefined();
  });

  it('should unshift an array', () => {
    const state: any = reducer({
      form: {
        ...form,
        fields: { 'array.0': field },
        arrays: { array: 1 },
      },
    }, actions.arrayUnshift('form', 'array'));

    expect(state.form.fields['array.0']).toBeUndefined();
    expect(state.form.fields['array.1']).toBeDefined();
    expect(state.form.arrays.array).toBe(2);
  });

  it('should not unshift an array without form', () => {
    const state: any = reducer({}, actions.arrayUnshift('form', 'array'));

    expect(state.form).toBeUndefined();
  });

  it('should shift an array', () => {
    const state: any = reducer({
      form: {
        ...form,
        fields: { 'array.0': field, 'array.1': field },
        arrays: { array: 2 },
      },
    }, actions.arrayShift('form', 'array'));

    expect(state.form.fields['array.0']).toBeDefined();
    expect(state.form.fields['array.1']).toBeUndefined();
    expect(state.form.arrays.array).toBe(1);
  });

  it('should not shift an array without form', () => {
    const state: any = reducer({ }, actions.arrayShift('form', 'array'));

    expect(state.form).toBeUndefined();
  });

  it('should insert to an array', () => {
    const state: any = reducer({
      form: {
        ...form,
        fields: { 'array.0': field, 'array.1': field },
        arrays: { array: 2 },
      },
    }, actions.arrayInsert('form', 'array', 0));

    expect(state.form.fields['array.0']).toBeDefined();
    expect(state.form.fields['array.1']).toBeUndefined();
    expect(state.form.fields['array.2']).toBeDefined();
    expect(state.form.arrays.array).toBe(3);
  });

  it('should not insert to an array without form', () => {
    const state: any = reducer({}, actions.arrayInsert('form', 'array', 0));

    expect(state.form).toBeUndefined();
  });

  it('should remove from an array', () => {
    const field0 = { ...field, value: '0' };
    const field2 = { ...field, value: '2' };

    const state: any = reducer({
      form: {
        ...form,
        fields: { 'array.0': field0, 'array.1': field, 'array.2': field2 },
        arrays: { array: 3 },
      },
    }, actions.arrayRemove('form', 'array', 1));

    expect(state.form.fields['array.0']).toBe(field0);
    expect(state.form.fields['array.1']).toBe(field2);
    expect(state.form.fields['array.2']).toBeUndefined();
    expect(state.form.arrays.array).toBe(2);
  });

  it('should not remove from an array without form', () => {
    const state: any = reducer({}, actions.arrayRemove('form', 'array', 1));

    expect(state.form).toBeUndefined();
  });

  it('should swap fields in an array', () => {
    const field0 = { ...field, value: '0' };
    const field1 = { ...field, value: '1' };

    const state: any = reducer({
      form: {
        ...form,
        fields: { 'array.0': field0, 'array.1': field1 },
        arrays: { array: 2 },
      },
    }, actions.arraySwap('form', 'array', 0, 1));

    expect(state.form.fields['array.0']).toBe(field1);
    expect(state.form.fields['array.1']).toBe(field0);
  });

  it('should not swap fields in an array without form', () => {
    const state: any = reducer({}, actions.arraySwap('form', 'array', 0, 1));

    expect(state.form).toBeUndefined();
  });

  it('should move a field in an array', () => {
    const field0 = { ...field, value: '0' };
    const field1 = { ...field, value: '1' };
    const field2 = { ...field, value: '2' };

    const state: any = reducer({
      form: {
        ...form,
        fields: { 'array.0': field0, 'array.1': field1, 'array.2': field2 },
        arrays: { array: 2 },
      },
    }, actions.arrayMove('form', 'array', 0, 2));

    expect(state.form.fields['array.0']).toBe(field1);
    expect(state.form.fields['array.1']).toBe(field2);
    expect(state.form.fields['array.2']).toBe(field0);
  });

  it('should not move a field in an array without form', () => {
    const state: any = reducer({}, actions.arrayMove('form', 'array', 0, 2));

    expect(state.form).toBeUndefined();
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

  it('should not change a field without form', () => {
    const state: any = reducer({}, actions.fieldChange('form', 'field', 'doge', 'error', true));

    expect(state.form).toBeUndefined();
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

  it('should not focus a field without form', () => {
    const state: any = reducer({}, actions.fieldFocus('form', 'field'));

    expect(state.form).toBeUndefined();
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
    }, actions.fieldBlur('form', 'field', 'value', 'error', true));

    expect(state.form.fields.field).toEqual({
      value: 'value',
      error: 'error',
      dirty: true,
      touched: true,
      visited: false,
      active: false,
    });
  });

  it('should not blur a field without form', () => {
    const state: any = reducer({}, actions.fieldBlur('form', 'field', 'value', 'error', true));

    expect(state.form).toBeUndefined();
  });

  it('should not blur unwanted props', () => {
    const newField = {
      ...field,
      visited: true,
    };

    const state: any = reducer({
      form: { ...form, fields: { field: newField } },
    }, actions.fieldBlur('form', 'field', 'value', 'error', true));

    expect(state.form.fields.field.visited).toBe(true);
  });

  it('should change field value', () => {
    const state: any = reducer({
      form: { ...form, fields: { field } },
    }, actions.fieldValue('form', 'field', 'value'));

    expect(state.form.fields.field.value).toBe('value');
  });

  it('should not change field value without form', () => {
    const state: any = reducer({}, actions.fieldValue('form', 'field', 'value'));

    expect(state.form).toBeUndefined();
  });

  it('should change field error', () => {
    const state: any = reducer({
      form: { ...form, fields: { field } },
    }, actions.fieldError('form', 'field', 'error'));

    expect(state.form.fields.field.error).toBe('error');
  });

  it('should not change field error without form', () => {
    const state: any = reducer({}, actions.fieldError('form', 'field', 'error'));

    expect(state.form).toBeUndefined();
  });

  it('should change field dirty', () => {
    const state: any = reducer({
      form: { ...form, fields: { field } },
    }, actions.fieldDirty('form', 'field', true));

    expect(state.form.fields.field.dirty).toBe(true);
  });

  it('should not change field dirty without form', () => {
    const state: any = reducer({}, actions.fieldDirty('form', 'field', true));

    expect(state.form).toBeUndefined();
  });
});
