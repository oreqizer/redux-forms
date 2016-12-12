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
    const state = reducer({
      form: { fields: {} },
    }, duck.addField('form', 'field', field));

    expect(state).toEqual({
      form: { fields: { field } },
    });
  });

  it('should remove a field', () => {
    const state = reducer({
      form: { fields: { field } },
    }, duck.removeField('form', 'field'));

    expect(state).toEqual({
      form: { fields: {} },
    });
  });
});
