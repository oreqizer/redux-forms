import * as actions from '../actions';

import { field } from "../utils/containers";


describe('#actions', () => {
  it('should create an ADD_FORM action', () => {
    expect(actions.addForm('form')).toEqual({
      type: actions.ADD_FORM,
      payload: { name: 'form' },
    });
  });

  it('should create a REMOVE_FORM action', () => {
    expect(actions.removeForm('form')).toEqual({
      type: actions.REMOVE_FORM,
      payload: { name: 'form' },
    });
  });

  it('should create an ADD_FIELD action', () => {
    expect(actions.addField('form', 'field', field)).toEqual({
      type: actions.ADD_FIELD,
      payload: { form: 'form', id: 'field', field },
    });
  });

  it('should create an TOUCH_ALL action', () => {
    expect(actions.touchAll('form')).toEqual({
      type: actions.TOUCH_ALL,
      payload: { form: 'form' },
    });
  });

  it('should create an SUBMIT_START action', () => {
    expect(actions.submitStart('form')).toEqual({
      type: actions.SUBMIT_START,
      payload: { form: 'form' },
    });
  });

  it('should create an SUBMIT_STOP action', () => {
    expect(actions.submitStop('form')).toEqual({
      type: actions.SUBMIT_STOP,
      payload: { form: 'form' },
    });
  });

  it('should create a REMOVE_FIELD action', () => {
    expect(actions.removeField('form', 'field')).toEqual({
      type: actions.REMOVE_FIELD,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should create an ADD_ARRAY action', () => {
    expect(actions.addArray('form', 'field')).toEqual({
      type: actions.ADD_ARRAY,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should create a REMOVE_ARRAY action', () => {
    expect(actions.removeArray('form', 'field')).toEqual({
      type: actions.REMOVE_ARRAY,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should create an ARRAY_PUSH action', () => {
    expect(actions.arrayPush('form', 'field')).toEqual({
      type: actions.ARRAY_PUSH,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should create an ARRAY_POP action', () => {
    expect(actions.arrayPop('form', 'field')).toEqual({
      type: actions.ARRAY_POP,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should create an ARRAY_UNSHIFT action', () => {
    expect(actions.arrayUnshift('form', 'field')).toEqual({
      type: actions.ARRAY_UNSHIFT,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should create an ARRAY_SHIFT action', () => {
    expect(actions.arrayShift('form', 'field')).toEqual({
      type: actions.ARRAY_SHIFT,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should create an ARRAY_INSERT action', () => {
    expect(actions.arrayInsert('form', 'field', 1)).toEqual({
      type: actions.ARRAY_INSERT,
      payload: { form: 'form', id: 'field', index: 1 },
    });
  });

  it('should create an ARRAY_REMOVE action', () => {
    expect(actions.arrayRemove('form', 'field', 1)).toEqual({
      type: actions.ARRAY_REMOVE,
      payload: { form: 'form', id: 'field', index: 1 },
    });
  });

  it('should create an ARRAY_SWAP action', () => {
    expect(actions.arraySwap('form', 'arr', 1, 2)).toEqual({
      type: actions.ARRAY_SWAP,
      payload: { form: 'form', id: 'arr', index1: 1, index2: 2 },
    });
  });

  it('should create an ARRAY_MOVE action', () => {
    expect(actions.arrayMove('form', 'arr', 1, 2)).toEqual({
      type: actions.ARRAY_MOVE,
      payload: { form: 'form', id: 'arr', from: 1, to: 2 },
    });
  });

  it('should create a FIELD_CHANGE action', () => {
    expect(actions.fieldChange('form', 'field', 'value', 'error', true)).toEqual({
      type: actions.FIELD_CHANGE,
      payload: { form: 'form', field: 'field', value: 'value', error: 'error', dirty: true },
    });
  });

  it('should create a FIELD_FOCUS action', () => {
    expect(actions.fieldFocus('form', 'field')).toEqual({
      type: actions.FIELD_FOCUS,
      payload: { form: 'form', field: 'field' },
    });
  });

  it('should create a FIELD_BLUR action', () => {
    expect(actions.fieldBlur('form', 'field', 'value', 'error', true)).toEqual({
      type: actions.FIELD_BLUR,
      payload: { form: 'form', field: 'field', value: 'value', error: 'error', dirty: true },
    });
  });
});
