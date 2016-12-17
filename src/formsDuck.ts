import * as R from 'ramda';

import { Value } from "./utils/getValue";
import { form, field, FormObj, FieldObj } from "./utils/containers";


export const ADD_FORM = '@redux-forms/ADD_FORM';
export const REMOVE_FORM = '@redux-forms/REMOVE_FORM';
export const ADD_FIELD = '@redux-forms/ADD_FIELD';
export const REMOVE_FIELD = '@redux-forms/REMOVE_FIELD';

export const ADD_ARRAY = '@redux-forms/ADD_ARRAY';
export const REMOVE_ARRAY = '@redux-forms/REMOVE_ARRAY';
export const PUSH = '@redux-forms/PUSH';
export const POP = '@redux-forms/POP';

export const FIELD_CHANGE = '@redux-forms/FIELD_CHANGE';
export const FIELD_FOCUS = '@redux-forms/FIELD_FOCUS';
export const FIELD_BLUR = '@redux-forms/FIELD_BLUR';


export default function formsReducer(state: State = {}, a: Action): State {
  switch (a.type) {
    // Form
    // ---
    case ADD_FORM:
      return R.assocPath<FormObj, State>(
        [a.payload.name], form, state,
      );

    case REMOVE_FORM:
      return R.dissocPath<State>(
        [a.payload.name], state,
      );

    case ADD_FIELD:
      return R.assocPath<FieldObj, State>(
        [a.payload.form, 'fields', a.payload.id], a.payload.field, state,
      );

    case REMOVE_FIELD:
      return R.dissocPath<State>(
        [a.payload.form, 'fields', a.payload.id], state,
      );

    // Array
    // ---
    case ADD_ARRAY:
      return R.compose<State, State, State>(
        R.assocPath<string[]>([a.payload.form, 'arrays', a.payload.id], []),
        R.assocPath<number>([a.payload.form, 'counters', a.payload.id], 0),
      )(state);

    case REMOVE_ARRAY:
      return R.compose<State, State, State>(
        R.dissocPath([a.payload.form, 'arrays', a.payload.id]),
        R.dissocPath([a.payload.form, 'counters', a.payload.id]),
      )(state);

    case PUSH:
      return R.compose<State, State, State>(
        R.over(
          R.lensPath([a.payload.form, 'counters', a.payload.id]),
          R.inc,
        ),
        R.over(
          R.lensPath([a.payload.form, 'arrays', a.payload.id]),
          R.append(`[${R.path([a.payload.form, 'counters', a.payload.id], state)}]`),
        ),
      )(state);

    case POP:
      return R.over(
        R.lensPath([a.payload.form, 'arrays', a.payload.id]),
        R.dropLast(1),
        state,
      );

    // Field
    // ---
    case FIELD_CHANGE:
      return R.compose<State, State, State, State>(
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'value'], a.payload.value),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'error'], a.payload.error),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'dirty'], a.payload.dirty),
      )(state);

    case FIELD_FOCUS:
      return R.compose<State, State, State>(
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'active'], true),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'visited'], true),
      )(state);

    case FIELD_BLUR:
      return R.compose<State, State, State, State, State>(
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'error'], a.payload.error),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'dirty'], a.payload.dirty),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'active'], false),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'touched'], true),
      )(state);

    default:
      return state;
  }
}


export type AddFormAction = { type: '@redux-forms/ADD_FORM', payload: {
  name: string,
} };

export type AddFormCreator = (name: string) => AddFormAction;

export const addForm: AddFormCreator = (name) => ({
  type: ADD_FORM,
  payload: { name },
});


export type RemoveFormAction = { type: '@redux-forms/REMOVE_FORM', payload: {
  name: string,
} };

export type RemoveFormCreator = (name: string) => RemoveFormAction;

export const removeForm: RemoveFormCreator = (name) => ({
  type: REMOVE_FORM,
  payload: { name },
});


export type AddFieldAction = { type: '@redux-forms/ADD_FIELD', payload: {
  form: string,
  id: string,
  field: FieldObj,
} };

export type AddFieldCreator = (form: string, id: string, field: FieldObj) => AddFieldAction;

export const addField: AddFieldCreator = (form, id, field) => ({
  type: ADD_FIELD,
  payload: { form, id, field },
});


export type RemoveFieldAction = { type: '@redux-forms/REMOVE_FIELD', payload: {
  form: string,
  id: string,
} };

export type RemoveFieldCreator = (form: string, id: string) => RemoveFieldAction;

export const removeField: RemoveFieldCreator = (form, id) => ({
  type: REMOVE_FIELD,
  payload: { form, id },
});


export type AddArrayAction = { type: '@redux-forms/ADD_ARRAY', payload: {
  form: string,
  id: string,
} };

export type AddArrayCreator = (form: string, id: string) => AddArrayAction;

export const addArray: AddArrayCreator = (form, id) => ({
  type: ADD_ARRAY,
  payload: { form, id },
});


export type RemoveArrayAction = { type: '@redux-forms/REMOVE_ARRAY', payload: {
  form: string,
  id: string,
} };

export type RemoveArrayCreator = (form: string, id: string) => RemoveArrayAction;

export const removeArray: RemoveArrayCreator = (form, id) => ({
  type: REMOVE_ARRAY,
  payload: { form, id },
});


export type PushAction = { type: '@redux-forms/PUSH', payload: {
  form: string,
  id: string,
} };

export type PushCreator = (form: string, id: string) => PushAction;

export const push: PushCreator = (form, id) => ({
  type: PUSH,
  payload: { form, id },
});


export type PopAction = { type: '@redux-forms/POP', payload: {
  form: string,
  id: string,
} };

export type PopCreator = (form: string, id: string) => PopAction;

export const pop: PopCreator = (form, id) => ({
  type: POP,
  payload: { form, id },
});


export type FieldChangeAction = { type: '@redux-forms/FIELD_CHANGE', payload: {
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


export type FieldFocusAction = { type: '@redux-forms/FIELD_FOCUS', payload: {
  form: string,
  field: string,
} };

export type FieldFocusCreator = (form: string, field: string) => FieldFocusAction;

export const fieldFocus: FieldFocusCreator = (form, field) => ({
  type: FIELD_FOCUS,
  payload: { form, field },
});


export type FieldBlurAction = { type: '@redux-forms/FIELD_BLUR', payload: {
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

export type State = {
  [form: string]: FormObj,
};

export type Action =
    AddFormAction |
    RemoveFormAction |
    AddFieldAction |
    RemoveFieldAction |
    AddArrayAction |
    RemoveArrayAction |
    PushAction |
    PopAction |
    FieldChangeAction |
    FieldFocusAction |
    FieldBlurAction;
