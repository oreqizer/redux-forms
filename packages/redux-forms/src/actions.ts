import { Field } from './containers';


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
export const FIELD_DIRTY = '@@redux-forms/FIELD_DIRTY';


export type AddFormAction = { type: '@@redux-forms/ADD_FORM', payload: {
  name: string,
} };

export const addForm = (name: string): AddFormAction => ({
  type: ADD_FORM,
  payload: { name },
});


export type RemoveFormAction = { type: '@@redux-forms/REMOVE_FORM', payload: {
  name: string,
} };

export const removeForm = (name: string): RemoveFormAction => ({
  type: REMOVE_FORM,
  payload: { name },
});


export type AddFieldAction = { type: '@@redux-forms/ADD_FIELD', payload: {
  form: string,
  id: string,
  field: Field,
} };

export const addField = (form: string, id: string, field: Field): AddFieldAction => ({
  type: ADD_FIELD,
  payload: { form, id, field },
});


export type RemoveFieldAction = { type: '@@redux-forms/REMOVE_FIELD', payload: {
  form: string,
  id: string,
} };

export const removeField = (form: string, id: string): RemoveFieldAction => ({
  type: REMOVE_FIELD,
  payload: { form, id },
});


export type TouchAllAction = { type: '@@redux-forms/TOUCH_ALL', payload: {
  form: string,
} };

export const touchAll = (form: string): TouchAllAction => ({
  type: TOUCH_ALL,
  payload: { form },
});


export type SubmitStartAction = { type: '@@redux-forms/SUBMIT_START', payload: {
  form: string,
} };

export const submitStart = (form: string): SubmitStartAction => ({
  type: SUBMIT_START,
  payload: { form },
});


export type SubmitStopAction = { type: '@@redux-forms/SUBMIT_STOP', payload: {
  form: string,
} };

export const submitStop = (form: string): SubmitStopAction => ({
  type: SUBMIT_STOP,
  payload: { form },
});


export type AddArrayAction = { type: '@@redux-forms/ADD_ARRAY', payload: {
  form: string,
  id: string,
} };

export const addArray = (form: string, id: string): AddArrayAction => ({
  type: ADD_ARRAY,
  payload: { form, id },
});


export type RemoveArrayAction = { type: '@@redux-forms/REMOVE_ARRAY', payload: {
  form: string,
  id: string,
} };

export const removeArray = (form: string, id: string): RemoveArrayAction => ({
  type: REMOVE_ARRAY,
  payload: { form, id },
});


export type ArrayPushAction = { type: '@@redux-forms/ARRAY_PUSH', payload: {
  form: string,
  id: string,
} };

export const arrayPush = (form: string, id: string): ArrayPushAction => ({
  type: ARRAY_PUSH,
  payload: { form, id },
});


export type ArrayPopAction = { type: '@@redux-forms/ARRAY_POP', payload: {
  form: string,
  id: string,
} };

export const arrayPop = (form: string, id: string): ArrayPopAction => ({
  type: ARRAY_POP,
  payload: { form, id },
});


export type ArrayUnshiftAction = { type: '@@redux-forms/ARRAY_UNSHIFT', payload: {
  form: string,
  id: string,
} };

export const arrayUnshift = (form: string, id: string): ArrayUnshiftAction => ({
  type: ARRAY_UNSHIFT,
  payload: { form, id },
});


export type ArrayShiftAction = { type: '@@redux-forms/ARRAY_SHIFT', payload: {
  form: string,
  id: string,
} };

export const arrayShift = (form: string, id: string): ArrayShiftAction => ({
  type: ARRAY_SHIFT,
  payload: { form, id },
});


export type ArrayInsertAction = { type: '@@redux-forms/ARRAY_INSERT', payload: {
  form: string,
  id: string,
  index: number,
} };

export const arrayInsert = (form: string, id: string, index: number): ArrayInsertAction => ({
  type: ARRAY_INSERT,
  payload: { form, id, index },
});


export type ArrayRemoveAction = { type: '@@redux-forms/ARRAY_REMOVE', payload: {
  form: string,
  id: string,
  index: number,
} };

export const arrayRemove = (form: string, id: string, index: number): ArrayRemoveAction => ({
  type: ARRAY_REMOVE,
  payload: { form, id, index },
});


export type ArraySwapAction = { type: '@@redux-forms/ARRAY_SWAP', payload: {
  form: string,
  id: string,
  index1: number,
  index2: number,
} };

export const arraySwap = (form: string, id: string, index1: number, index2: number): ArraySwapAction => ({
  type: ARRAY_SWAP,
  payload: { form, id, index1, index2 },
});


export type ArrayMoveAction = { type: '@@redux-forms/ARRAY_MOVE', payload: {
  form: string,
  id: string,
  from: number,
  to: number,
} };

export const arrayMove = (form: string, id: string, from: number, to: number): ArrayMoveAction => ({
  type: ARRAY_MOVE,
  payload: { form, id, from, to },
});


export type FieldChangeAction = { type: '@@redux-forms/FIELD_CHANGE', payload: {
  form: string,
  field: string,
  value: any,
  error: string | null,
  dirty: boolean,
} };

export const fieldChange = (
  form: string, field: string, value: any, error: string | null, dirty: boolean,
): FieldChangeAction => ({
  type: FIELD_CHANGE,
  payload: { form, field, value, error, dirty },
});


export type FieldFocusAction = { type: '@@redux-forms/FIELD_FOCUS', payload: {
  form: string,
  field: string,
} };

export const fieldFocus = (form: string, field: string): FieldFocusAction => ({
  type: FIELD_FOCUS,
  payload: { form, field },
});


export type FieldBlurAction = { type: '@@redux-forms/FIELD_BLUR', payload: {
  form: string,
  field: string,
  value: any,
  error: string | null,
  dirty: boolean,
} };

export const fieldBlur = (
  form: string, field: string, value: any, error: string | null, dirty: boolean,
): FieldBlurAction => ({
  type: FIELD_BLUR,
  payload: { form, field, value, error, dirty },
});


export type FieldValueAction = { type: '@@redux-forms/FIELD_VALUE', payload: {
  form: string,
  field: string,
  value: any,
} };

export const fieldValue = (form: string, field: string, value: any): FieldValueAction => ({
  type: FIELD_VALUE,
  payload: { form, field, value },
});


export type FieldErrorAction = { type: '@@redux-forms/FIELD_ERROR', payload: {
  form: string,
  field: string,
  error: string | null,
} };

export const fieldError = (form: string, field: string, error: string | null): FieldErrorAction => ({
  type: FIELD_ERROR,
  payload: { form, field, error },
});


export type FieldDirtyAction = { type: '@@redux-forms/FIELD_DIRTY', payload: {
  form: string,
  field: string,
  dirty: boolean,
} };

export const fieldDirty = (form: string, field: string, dirty: boolean): FieldDirtyAction => ({
  type: FIELD_DIRTY,
  payload: { form, field, dirty },
});


export type Action =
    | AddFormAction
    | RemoveFormAction
    | AddFieldAction
    | RemoveFieldAction
    | TouchAllAction
    | SubmitStartAction
    | SubmitStopAction
    | AddArrayAction
    | RemoveArrayAction
    | ArrayPushAction
    | ArrayPopAction
    | ArrayUnshiftAction
    | ArrayShiftAction
    | ArrayInsertAction
    | ArrayRemoveAction
    | ArraySwapAction
    | ArrayMoveAction
    | FieldChangeAction
    | FieldFocusAction
    | FieldBlurAction
    | FieldValueAction
    | FieldErrorAction
    | FieldDirtyAction;
