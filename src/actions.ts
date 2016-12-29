import { FieldObj } from "./utils/containers";
import { Value } from "./utils/getValue";


export const ADD_FORM = '@redux-form-lite/ADD_FORM';
export const REMOVE_FORM = '@redux-form-lite/REMOVE_FORM';
export const ADD_FIELD = '@redux-form-lite/ADD_FIELD';
export const REMOVE_FIELD = '@redux-form-lite/REMOVE_FIELD';
export const TOUCH_ALL = '@redux-form-lite/TOUCH_ALL';

export const ADD_ARRAY = '@redux-form-lite/ADD_ARRAY';
export const REMOVE_ARRAY = '@redux-form-lite/REMOVE_ARRAY';
export const PUSH = '@redux-form-lite/PUSH';
export const POP = '@redux-form-lite/POP';
export const UNSHIFT = '@redux-form-lite/UNSHIFT';
export const SHIFT = '@redux-form-lite/SHIFT';

export const FIELD_CHANGE = '@redux-form-lite/FIELD_CHANGE';
export const FIELD_FOCUS = '@redux-form-lite/FIELD_FOCUS';
export const FIELD_BLUR = '@redux-form-lite/FIELD_BLUR';


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


export type PushAction = { type: '@redux-form-lite/PUSH', payload: {
  form: string,
  id: string,
} };

export type PushCreator = (form: string, id: string) => PushAction;

export const push: PushCreator = (form, id) => ({
  type: PUSH,
  payload: { form, id },
});


export type PopAction = { type: '@redux-form-lite/POP', payload: {
  form: string,
  id: string,
} };

export type PopCreator = (form: string, id: string) => PopAction;

export const pop: PopCreator = (form, id) => ({
  type: POP,
  payload: { form, id },
});


export type UnshiftAction = { type: '@redux-form-lite/UNSHIFT', payload: {
  form: string,
  id: string,
} };

export type UnshiftCreator = (form: string, id: string) => UnshiftAction;

export const unshift: UnshiftCreator = (form, id) => ({
  type: UNSHIFT,
  payload: { form, id },
});


export type ShiftAction = { type: '@redux-form-lite/SHIFT', payload: {
  form: string,
  id: string,
} };

export type ShiftCreator = (form: string, id: string) => ShiftAction;

export const shift: ShiftCreator = (form, id) => ({
  type: SHIFT,
  payload: { form, id },
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
  error: string | null,
  dirty: boolean,
} };

export type FieldBlurCreator = (
  form: string, field: string, error: string | null, dirty: boolean,
) => FieldBlurAction;

export const fieldBlur: FieldBlurCreator = (form, field, error, dirty) => ({
  type: FIELD_BLUR,
  payload: { form, field, error, dirty },
});


export type Action =
  AddFormAction |
    RemoveFormAction |
    AddFieldAction |
    RemoveFieldAction |
    TouchAllAction |
    AddArrayAction |
    RemoveArrayAction |
    PushAction |
    PopAction |
    UnshiftAction |
    ShiftAction |
    FieldChangeAction |
    FieldFocusAction |
    FieldBlurAction;
