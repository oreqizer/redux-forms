import { Field } from "./containers";
import { Value } from "./shared/getValue";


export const ADD_FORM = '@@redux-forms/ADD_FORM';
export const REMOVE_FORM = '@@redux-forms/REMOVE_FORM';
export const ADD_FIELD = '@@redux-forms/ADD_FIELD';
export const REMOVE_FIELD = '@@redux-forms/REMOVE_FIELD';
export const TOUCH_ALL = '@@redux-forms/TOUCH_ALL';
export const SUBMIT_START = '@@redux-forms/SUBMIT_START';
export const SUBMIT_STOP = '@@redux-forms/SUBMIT_STOP';

export const ADD_ARRAY = '@@redux-forms/ADD_ARRAY';
export const REMOVE_ARRAY = '@@redux-forms/REMOVE_ARRAY';
export const ARRAY_PUSH = '@@redux-forms/ARRAY_PUSH';
export const ARRAY_POP = '@@redux-forms/ARRAY_POP';
export const ARRAY_UNSHIFT = '@@redux-forms/ARRAY_UNSHIFT';
export const ARRAY_SHIFT = '@@redux-forms/ARRAY_SHIFT';
export const ARRAY_INSERT = '@@redux-forms/ARRAY_INSERT';
export const ARRAY_REMOVE = '@@redux-forms/ARRAY_REMOVE';
export const ARRAY_SWAP = '@@redux-forms/ARRAY_SWAP';
export const ARRAY_MOVE = '@@redux-forms/ARRAY_MOVE';

export const FIELD_CHANGE = '@@redux-forms/FIELD_CHANGE';
export const FIELD_FOCUS = '@@redux-forms/FIELD_FOCUS';
export const FIELD_BLUR = '@@redux-forms/FIELD_BLUR';
export const FIELD_VALUE = '@@redux-forms/FIELD_VALUE';
export const FIELD_ERROR = '@@redux-forms/FIELD_ERROR';


export type AddFormAction = { type: '@@redux-forms/ADD_FORM', payload: {
  name: string,
} };

export type AddFormCreator = (name: string) => AddFormAction;

export const addForm: AddFormCreator = (name) => ({
  type: ADD_FORM,
  payload: { name },
});


export type RemoveFormAction = { type: '@@redux-forms/REMOVE_FORM', payload: {
  name: string,
} };

export type RemoveFormCreator = (name: string) => RemoveFormAction;

export const removeForm: RemoveFormCreator = (name) => ({
  type: REMOVE_FORM,
  payload: { name },
});


export type AddFieldAction = { type: '@@redux-forms/ADD_FIELD', payload: {
  form: string,
  id: string,
  field: Field,
} };

export type AddFieldCreator = (form: string, id: string, field: Field) => AddFieldAction;

export const addField: AddFieldCreator = (form, id, field) => ({
  type: ADD_FIELD,
  payload: { form, id, field },
});


export type RemoveFieldAction = { type: '@@redux-forms/REMOVE_FIELD', payload: {
  form: string,
  id: string,
} };

export type RemoveFieldCreator = (form: string, id: string) => RemoveFieldAction;

export const removeField: RemoveFieldCreator = (form, id) => ({
  type: REMOVE_FIELD,
  payload: { form, id },
});


export type TouchAllAction = { type: '@@redux-forms/TOUCH_ALL', payload: {
  form: string,
} };

export type TouchAllCreator = (form: string) => TouchAllAction;

export const touchAll: TouchAllCreator = (form) => ({
  type: TOUCH_ALL,
  payload: { form },
});


export type SubmitStartAction = { type: '@@redux-forms/SUBMIT_START', payload: {
  form: string,
} };

export type SubmitStartCreator = (form: string) => SubmitStartAction;

export const submitStart: SubmitStartCreator = (form) => ({
  type: SUBMIT_START,
  payload: { form },
});


export type SubmitStopAction = { type: '@@redux-forms/SUBMIT_STOP', payload: {
  form: string,
} };

export type SubmitStopCreator = (form: string) => SubmitStopAction;

export const submitStop: SubmitStopCreator = (form) => ({
  type: SUBMIT_STOP,
  payload: { form },
});


export type AddArrayAction = { type: '@@redux-forms/ADD_ARRAY', payload: {
  form: string,
  id: string,
} };

export type AddArrayCreator = (form: string, id: string) => AddArrayAction;

export const addArray: AddArrayCreator = (form, id) => ({
  type: ADD_ARRAY,
  payload: { form, id },
});


export type RemoveArrayAction = { type: '@@redux-forms/REMOVE_ARRAY', payload: {
  form: string,
  id: string,
} };

export type RemoveArrayCreator = (form: string, id: string) => RemoveArrayAction;

export const removeArray: RemoveArrayCreator = (form, id) => ({
  type: REMOVE_ARRAY,
  payload: { form, id },
});


export type ArrayPushAction = { type: '@@redux-forms/ARRAY_PUSH', payload: {
  form: string,
  id: string,
} };

export type ArrayPushCreator = (form: string, id: string) => ArrayPushAction;

export const arrayPush: ArrayPushCreator = (form, id) => ({
  type: ARRAY_PUSH,
  payload: { form, id },
});


export type ArrayPopAction = { type: '@@redux-forms/ARRAY_POP', payload: {
  form: string,
  id: string,
} };

export type ArrayPopCreator = (form: string, id: string) => ArrayPopAction;

export const arrayPop: ArrayPopCreator = (form, id) => ({
  type: ARRAY_POP,
  payload: { form, id },
});


export type ArrayUnshiftAction = { type: '@@redux-forms/ARRAY_UNSHIFT', payload: {
  form: string,
  id: string,
} };

export type ArrayUnshiftCreator = (form: string, id: string) => ArrayUnshiftAction;

export const arrayUnshift: ArrayUnshiftCreator = (form, id) => ({
  type: ARRAY_UNSHIFT,
  payload: { form, id },
});


export type ArrayShiftAction = { type: '@@redux-forms/ARRAY_SHIFT', payload: {
  form: string,
  id: string,
} };

export type ArrayShiftCreator = (form: string, id: string) => ArrayShiftAction;

export const arrayShift: ArrayShiftCreator = (form, id) => ({
  type: ARRAY_SHIFT,
  payload: { form, id },
});


export type ArrayInsertAction = { type: '@@redux-forms/ARRAY_INSERT', payload: {
  form: string,
  id: string,
  index: number,
} };

export type ArrayInsertCreator = (form: string, id: string, index: number) => ArrayInsertAction;

export const arrayInsert: ArrayInsertCreator = (form, id, index) => ({
  type: ARRAY_INSERT,
  payload: { form, id, index },
});


export type ArrayRemoveAction = { type: '@@redux-forms/ARRAY_REMOVE', payload: {
  form: string,
  id: string,
  index: number,
} };

export type ArrayRemoveCreator = (form: string, id: string, index: number) => ArrayRemoveAction;

export const arrayRemove: ArrayRemoveCreator = (form, id, index) => ({
  type: ARRAY_REMOVE,
  payload: { form, id, index },
});


export type ArraySwapAction = { type: '@@redux-forms/ARRAY_SWAP', payload: {
  form: string,
  id: string,
  index1: number,
  index2: number,
} };

export type ArraySwapCreator = (form: string, id: string, index1: number, index2: number) => ArraySwapAction;

export const arraySwap: ArraySwapCreator = (form, id, index1, index2) => ({
  type: ARRAY_SWAP,
  payload: { form, id, index1, index2 },
});


export type ArrayMoveAction = { type: '@@redux-forms/ARRAY_MOVE', payload: {
  form: string,
  id: string,
  from: number,
  to: number,
} };

export type ArrayMoveCreator = (form: string, id: string, from: number, to: number) => ArrayMoveAction;

export const arrayMove: ArrayMoveCreator = (form, id, from, to) => ({
  type: ARRAY_MOVE,
  payload: { form, id, from, to },
});


export type FieldChangeAction = { type: '@@redux-forms/FIELD_CHANGE', payload: {
  form: string,
  field: string,
  value: Value,
  error: string | null,
  dirty: boolean,
} };

export type FieldChangeCreator = (
  form: string, field: string, value: Value, error: string | null, dirty: boolean,
) => FieldChangeAction;

export const fieldChange: FieldChangeCreator = (form, field, value, error, dirty) => ({
  type: FIELD_CHANGE,
  payload: { form, field, value, error, dirty },
});


export type FieldFocusAction = { type: '@@redux-forms/FIELD_FOCUS', payload: {
  form: string,
  field: string,
} };

export type FieldFocusCreator = (form: string, field: string) => FieldFocusAction;

export const fieldFocus: FieldFocusCreator = (form, field) => ({
  type: FIELD_FOCUS,
  payload: { form, field },
});


export type FieldBlurAction = { type: '@@redux-forms/FIELD_BLUR', payload: {
  form: string,
  field: string,
  value: Value,
  error: string | null,
  dirty: boolean,
} };

export type FieldBlurCreator = (
  form: string, field: string, value: Value, error: string | null, dirty: boolean,
) => FieldBlurAction;

export const fieldBlur: FieldBlurCreator = (form, field, value, error, dirty) => ({
  type: FIELD_BLUR,
  payload: { form, field, value, error, dirty },
});


export type Action =
    AddFormAction |
    RemoveFormAction |
    AddFieldAction |
    RemoveFieldAction |
    TouchAllAction |
    SubmitStartAction |
    SubmitStopAction |
    AddArrayAction |
    RemoveArrayAction |
    ArrayPushAction |
    ArrayPopAction |
    ArrayUnshiftAction |
    ArrayShiftAction |
    ArrayInsertAction |
    ArrayRemoveAction |
    ArraySwapAction |
    ArrayMoveAction |
    FieldChangeAction |
    FieldFocusAction |
    FieldBlurAction ;
