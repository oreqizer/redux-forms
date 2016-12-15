import reducer, * as duck from '../formsDuck';

import { form, field } from '../utils/containers';


describe('#formsDuck', () => {
  // Action creators
  // ---

  it('should create an ADD_FORM action', () => {
    expect(duck.addForm('form')).toEqual({
      type: duck.ADD_FORM,
      payload: { name: 'form' },
    });
  });

  it('should create a REMOVE_FORM action', () => {
    expect(duck.removeForm('form')).toEqual({
      type: duck.REMOVE_FORM,
      payload: { name: 'form' },
    });
  });

  it('should create an ADD_FIELD action', () => {
    expect(duck.addField('form', 'field', field)).toEqual({
      type: duck.ADD_FIELD,
      payload: { form: 'form', id: 'field', field },
    });
  });

  it('should create a REMOVE_FIELD action', () => {
    expect(duck.removeField('form', 'field')).toEqual({
      type: duck.REMOVE_FIELD,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should create an ADD_ARRAY action', () => {
    expect(duck.addArray('form', 'field')).toEqual({
      type: duck.ADD_ARRAY,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should create a REMOVE_ARRAY action', () => {
    expect(duck.removeArray('form', 'field')).toEqual({
      type: duck.REMOVE_ARRAY,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should create a PUSH action', () => {
    expect(duck.push('form', 'field', 'field[0]')).toEqual({
      type: duck.PUSH,
      payload: { form: 'form', id: 'field', name: 'field[0]' },
    });
  });

  it('should create a POP action', () => {
    expect(duck.pop('form', 'field')).toEqual({
      type: duck.POP,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should create a FIELD_CHANGE action', () => {
    expect(duck.fieldChange('form', 'field', 'value', 'error', true)).toEqual({
      type: duck.FIELD_CHANGE,
      payload: { form: 'form', field: 'field', value: 'value', error: 'error', dirty: true },
    });
  });

  it('should create a FIELD_FOCUS action', () => {
    expect(duck.fieldFocus('form', 'field')).toEqual({
      type: duck.FIELD_FOCUS,
      payload: { form: 'form', field: 'field' },
    });
  });

  it('should create a FIELD_BLUR action', () => {
    expect(duck.fieldBlur('form', 'field', 'error', true)).toEqual({
      type: duck.FIELD_BLUR,
      payload: { form: 'form', field: 'field', error: 'error', dirty: true },
    });
  });

  // Reducer
  // ---

  it('should return initial state', () => {
    const state = reducer(undefined, <any> {});

    expect(state).toEqual({});
  });

  it('should add a form', () => {
    const state = reducer({}, duck.addForm('form'));

    expect(state).toEqual({ form });
  });

  it('should remove a form', () => {
    const state = reducer({ form }, duck.removeForm('form'));

    expect(state).toEqual({});
  });

  it('should add a field', () => {
    const state: any = reducer({
      form: { ...form, fields: {} },
    }, duck.addField('form', 'field', field));

    expect(state.form.fields.field).toEqual(field);
  });

  it('should remove a field', () => {
    const state: any = reducer({
      form: { ...form, fields: { field } },
    }, duck.removeField('form', 'field'));

    expect(state.form.fields).toEqual({});
  });

  it('should add an array', () => {
    const state: any = reducer({
      form,
    }, duck.addArray('form', 'array'));

    expect(state.form.arrays.array).toEqual([]);
    expect(state.form.counters.array).toBe(0);
  });

  it('should remove an array', () => {
    const state: any = reducer({
      form: {
        ...form,
        arrays: { array: [] },
        counters: { array: 0 },
      },
    }, duck.removeArray('form', 'array'));

    expect(state.form).toEqual(form);
  });

  it('should push to an array', () => {
    const state: any = reducer({
      form: {
        ...form,
        arrays: { array: ['array[0]'] },
        counters: { array: 1 },
      },
    }, duck.push('form', 'array', 'array[1]'));

    expect(state.form.arrays.array).toEqual(['array[0]', 'array[1]']);
    expect(state.form.counters.array).toBe(2);
  });

  it('should pop from an array', () => {
    const state: any = reducer({
      form: { ...form, arrays: { array: ['array[0]', 'array[1]'] } },
    }, duck.pop('form', 'array'));

    expect(state.form.arrays.array).toEqual(['array[0]']);
  });

  it('should change a field', () => {
    const state: any = reducer({
      form: { ...form, fields: { field } },
    }, duck.fieldChange('form', 'field', 'doge', 'error', true));

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
    }, duck.fieldChange('form', 'field', 'doge', 'error', true));

    expect(state.form.fields.field.touched).toBe(true);
    expect(state.form.fields.field.visited).toBe(true);
    expect(state.form.fields.field.active).toBe(true);
  });

  it('should focus a field', () => {
    const state: any = reducer({
      form: { ...form, fields: { field } },
    }, duck.fieldFocus('form', 'field'));

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
    }, duck.fieldFocus('form', 'field'));

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
    }, duck.fieldBlur('form', 'field', 'error', true));

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
    }, duck.fieldBlur('form', 'field', 'error', true));

    expect(state.form.fields.field.value).toBe('doge');
    expect(state.form.fields.field.visited).toBe(true);
  });
});
