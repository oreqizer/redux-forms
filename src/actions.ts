import { FieldObj } from "./utils/containers";
import { Value } from "./utils/getValue";


export const ADD_FORM = '@redux-form-lite/ADD_FORM';
export const REMOVE_FORM = '@redux-form-lite/REMOVE_FORM';
export const ADD_FIELD = '@redux-form-lite/ADD_FIELD';
export const REMOVE_FIELD = '@redux-form-lite/REMOVE_FIELD';
export const TOUCH_ALL = '@redux-form-lite/TOUCH_ALL';
export const SUBMIT_START = '@redux-form-lite/SUBMIT_START';
export const SUBMIT_STOP = '@redux-form-lite/SUBMIT_STOP';

export const ADD_ARRAY = '@redux-form-lite/ADD_ARRAY';
export const REMOVE_ARRAY = '@redux-form-lite/REMOVE_ARRAY';
export const ARRAY_PUSH = '@redux-form-lite/ARRAY_PUSH';
export const ARRAY_POP = '@redux-form-lite/ARRAY_POP';
export const ARRAY_UNSHIFT = '@redux-form-lite/ARRAY_UNSHIFT';
export const ARRAY_SHIFT = '@redux-form-lite/ARRAY_SHIFT';
export const ARRAY_INSERT = '@redux-form-lite/ARRAY_INSERT';
export const ARRAY_REMOVE = '@redux-form-lite/ARRAY_REMOVE';
export const ARRAY_SWAP = '@redux-form-lite/ARRAY_SWAP';

export const FIELD_CHANGE = '@redux-form-lite/FIELD_CHANGE';
export const FIELD_FOCUS = '@redux-form-lite/FIELD_FOCUS';
export const FIELD_BLUR = '@redux-form-lite/FIELD_BLUR';
export const FIELD_VALUE = '@redux-form-lite/FIELD_VALUE';
export const FIELD_ERROR = '@redux-form-lite/FIELD_ERROR';


export type AddFormAction = { type: '@redux-form-lite/ADD_FORM', payload: {
  name: string,
} };

export type AddFormCreator = (name: string) => AddFormAction;

export const addForm: AddFormCreator = (name) => ({
  type: ADD_FORM,
  payload: { name },
});


export type RemoveFormAction = { type: '@redux-form-lite/REMOVE_FORM', payload: {
  name: string,
} };

export type RemoveFormCreator = (name: string) => RemoveFormAction;

export const removeForm: RemoveFormCreator = (name) => ({
  type: REMOVE_FORM,
  payload: { name },
});


export type AddFieldAction = { type: '@redux-form-lite/ADD_FIELD', payload: {
  form: string,
  id: string,
  field: FieldObj,
} };

export type AddFieldCreator = (form: string, id: string, field: FieldObj) => AddFieldAction;

export const addField: AddFieldCreator = (form, id, field) => ({
  type: ADD_FIELD,
  payload: { form, id, field },
});


export type RemoveFieldAction = { type: '@redux-form-lite/REMOVE_FIELD', payload: {
  form: string,
  id: string,
} };

export type RemoveFieldCreator = (form: string, id: string) => RemoveFieldAction;

export const removeField: RemoveFieldCreator = (form, id) => ({
  type: REMOVE_FIELD,
  payload: { form, id },
});


export type TouchAllAction = { type: '@redux-form-lite/TOUCH_ALL', payload: {
  form: string,
} };

export type TouchAllCreator = (form: string) => TouchAllAction;

export const touchAll: TouchAllCreator = (form) => ({
  type: TOUCH_ALL,
  payload: { form },
});


export type SubmitStartAction = { type: '@redux-form-lite/SUBMIT_START', payload: {
  form: string,
} };

export type SubmitStartCreator = (form: string) => SubmitStartAction;

export const submitStart: SubmitStartCreator = (form) => ({
  type: SUBMIT_START,
  payload: { form },
});


export type SubmitStopAction = { type: '@redux-form-lite/SUBMIT_STOP', payload: {
  form: string,
} };

export type SubmitStopCreator = (form: string) => SubmitStopAction;

export const submitStop: SubmitStopCreator = (form) => ({
  type: SUBMIT_STOP,
  payload: { form },
});


export type AddArrayAction = { type: '@redux-form-lite/ADD_ARRAY', payload: {
  form: string,
  id: string,
} };

export type AddArrayCreator = (form: string, id: string) => AddArrayAction;

export const addArray: AddArrayCreator = (form, id) => ({
  type: ADD_ARRAY,
  payload: { form, id },
});


export type RemoveArrayAction = { type: '@redux-form-lite/REMOVE_ARRAY', payload: {
  form: string,
  id: string,
} };

export type RemoveArrayCreator = (form: string, id: string) => RemoveArrayAction;

export const removeArray: RemoveArrayCreator = (form, id) => ({
  type: REMOVE_ARRAY,
  payload: { form, id },
});


export type ArrayPushAction = { type: '@redux-form-lite/ARRAY_PUSH', payload: {
  form: string,
  id: string,
} };

export type ArrayPushCreator = (form: string, id: string) => ArrayPushAction;

export const arrayPush: ArrayPushCreator = (form, id) => ({
  type: ARRAY_PUSH,
  payload: { form, id },
});


export type ArrayPopAction = { type: '@redux-form-lite/ARRAY_POP', payload: {
  form: string,
  id: string,
} };

export type ArrayPopCreator = (form: string, id: string) => ArrayPopAction;

export const arrayPop: ArrayPopCreator = (form, id) => ({
  type: ARRAY_POP,
  payload: { form, id },
});


export type ArrayUnshiftAction = { type: '@redux-form-lite/ARRAY_UNSHIFT', payload: {
  form: string,
  id: string,
} };

export type ArrayUnshiftCreator = (form: string, id: string) => ArrayUnshiftAction;

export const arrayUnshift: ArrayUnshiftCreator = (form, id) => ({
  type: ARRAY_UNSHIFT,
  payload: { form, id },
});


export type ArrayShiftAction = { type: '@redux-form-lite/ARRAY_SHIFT', payload: {
  form: string,
  id: string,
} };

export type ArrayShiftCreator = (form: string, id: string) => ArrayShiftAction;

export const arrayShift: ArrayShiftCreator = (form, id) => ({
  type: ARRAY_SHIFT,
  payload: { form, id },
});


export type ArrayInsertAction = { type: '@redux-form-lite/ARRAY_INSERT', payload: {
  form: string,
  id: string,
  index: number,
} };

export type ArrayInsertCreator = (form: string, id: string, index: number) => ArrayInsertAction;

export const arrayInsert: ArrayInsertCreator = (form, id, index) => ({
  type: ARRAY_INSERT,
  payload: { form, id, index },
});


export type ArrayRemoveAction = { type: '@redux-form-lite/ARRAY_REMOVE', payload: {
  form: string,
  id: string,
  index: number,
} };

export type ArrayRemoveCreator = (form: string, id: string, index: number) => ArrayRemoveAction;

export const arrayRemove: ArrayRemoveCreator = (form, id, index) => ({
  type: ARRAY_REMOVE,
  payload: { form, id, index },
});


export type ArraySwapAction = { type: '@redux-form-lite/ARRAY_SWAP', payload: {
  form: string,
  pos1: string,
  pos2: string,
} };

export type ArraySwapCreator = (form: string, pos1: string, pos2: string) => ArraySwapAction;

export const arraySwap: ArraySwapCreator = (form, pos1, pos2) => ({
  type: ARRAY_SWAP,
  payload: { form, pos1, pos2 },
});


export type FieldChangeAction = { type: '@redux-form-lite/FIELD_CHANGE', payload: {
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


export type FieldFocusAction = { type: '@redux-form-lite/FIELD_FOCUS', payload: {
  form: string,
  field: string,
} };

export type FieldFocusCreator = (form: string, field: string) => FieldFocusAction;

export const fieldFocus: FieldFocusCreator = (form, field) => ({
  type: FIELD_FOCUS,
  payload: { form, field },
});


export type FieldBlurAction = { type: '@redux-form-lite/FIELD_BLUR', payload: {
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


export type FieldValueAction = { type: '@redux-form-lite/FIELD_VALUE', payload: {
  form: string,
  field: string,
  value: Value,
} };

export type FieldValueCreator = (form: string, field: string, value: Value) => FieldValueAction;

export const fieldValue: FieldValueCreator = (form, field, value) => ({
  type: FIELD_VALUE,
  payload: { form, field, value },
});


export type FieldErrorAction = { type: '@redux-form-lite/FIELD_ERROR', payload: {
  form: string,
  field: string,
  error: string | null,
} };

export type FieldErrorCreator = (form: string, field: string, error: string | null) => FieldErrorAction;

export const fieldError: FieldErrorCreator = (form, field, error) => ({
  type: FIELD_ERROR,
  payload: { form, field, error },
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
    FieldChangeAction |
    FieldFocusAction |
    FieldBlurAction |
    FieldValueAction |
    FieldErrorAction;
