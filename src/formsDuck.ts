import * as R from 'ramda';
import { Value } from "./utils/getValue";

export const ADD_FORM = '@redux-forms/ADD_FORM';
export const REMOVE_FORM = '@redux-forms/REMOVE_FORM';

export const ADD_FIELD = '@redux-forms/ADD_FIELD';
export const REMOVE_FIELD = '@redux-forms/REMOVE_FIELD';

export const FIELD_CHANGE = '@redux-forms/FIELD_CHANGE';
export const FIELD_FOCUS = '@redux-forms/FIELD_FOCUS';
export const FIELD_BLUR = '@redux-forms/FIELD_BLUR';

export const freshField = {
  value: '',
  error: null,
  visited: false,
  touched: false,
  active: false,
  dirty: false,
};

export const initialState = {
  forms: {},
};

export default function formsReducer(state: State = initialState, a: Action): State {
  switch (a.type) {
    // Form
    // ---
    case ADD_FORM:
      return R.assocPath<Form, State>(['forms', a.payload.name], {}, state);

    case REMOVE_FORM:
      return R.dissocPath<State>(['forms', a.payload.name], state);

    case ADD_FIELD:
      return R.assocPath<Field, State>(['forms', a.payload.form, a.payload.id], freshField, state);

    case REMOVE_FIELD:
      return R.dissocPath<State>(['forms', a.payload.form, a.payload.id], state);

    // Field
    // ---
    case FIELD_CHANGE:
      return R.compose<State, State, State, State>(
          R.assocPath(['forms', a.payload.form, a.payload.field, 'value'], a.payload.value),
          R.assocPath(['forms', a.payload.form, a.payload.field, 'error'], a.payload.error),
          R.assocPath(['forms', a.payload.form, a.payload.field, 'dirty'], a.payload.dirty),
      )(state);

    case FIELD_FOCUS:
      return R.compose<State, State, State>(
          R.assocPath(['forms', a.payload.form, a.payload.field, 'active'], true),
          R.assocPath(['forms', a.payload.form, a.payload.field, 'visited'], true),
      )(state);

    case FIELD_BLUR:
      return R.compose<State, State, State, State, State>(
          R.assocPath(['forms', a.payload.form, a.payload.field, 'error'], a.payload.error),
          R.assocPath(['forms', a.payload.form, a.payload.field, 'dirty'], a.payload.dirty),
          R.assocPath(['forms', a.payload.form, a.payload.field, 'active'], false),
          R.assocPath(['forms', a.payload.form, a.payload.field, 'touched'], true),
      )(state);

    default:
      return state;
  }
}

export const addForm = (name: string): AddFormAction => ({
  type: ADD_FORM,
  payload: { name },
});

export const removeForm = (name: string): RemoveFormAction => ({
  type: REMOVE_FORM,
  payload: { name },
});

export const addField = (form: string, id: string): AddFieldAction => ({
  type: ADD_FIELD,
  payload: { form, id },
});

export const removeField = (form: string, id: string): RemoveFieldAction => ({
  type: REMOVE_FIELD,
  payload: { form, id },
});

export const fieldChange = (
    form: string, field: string, value: Value, error: string | null, dirty: boolean,
): FieldChangeAction => ({
  type: FIELD_CHANGE,
  payload: { form, field, value, error, dirty },
});

export const fieldFocus = (
    form: string, field: string,
): FieldFocusAction => ({
  type: FIELD_FOCUS,
  payload: { form, field },
});

export const fieldBlur = (
    form: string, field: string, error: string | null, dirty: boolean,
): FieldBlurAction => ({
  type: FIELD_BLUR,
  payload: { form, field, error, dirty },
});


export type Field = {
  value: Value;
  visited: boolean;
  touched: boolean;
  active: boolean;
  error: string | null;
  dirty: boolean;
};

export type Form = { [key: string]: Field };

export type State = {
  forms: { [key: string]: Form },
};

export type AddFormAction = { type: '@redux-forms/ADD_FORM', payload: {
  name: string,
} };

export type RemoveFormAction = { type: '@redux-forms/REMOVE_FORM', payload: {
  name: string,
} };

export type AddFieldAction = { type: '@redux-forms/ADD_FIELD', payload: {
  form: string,
  id: string,
} };

export type RemoveFieldAction = { type: '@redux-forms/REMOVE_FIELD', payload: {
  form: string,
  id: string,
} };

export type FieldChangeAction = { type: '@redux-forms/FIELD_CHANGE', payload: {
  form: string,
  field: string,
  value: Value,
  error: string | null,
  dirty: boolean,
} };

export type FieldFocusAction = { type: '@redux-forms/FIELD_FOCUS', payload: {
  form: string,
  field: string,
} };

export type FieldBlurAction = { type: '@redux-forms/FIELD_BLUR', payload: {
  form: string,
  field: string,
  error: string | null,
  dirty: boolean,
} };

export type Action =
    AddFormAction |
    RemoveFormAction |
    AddFieldAction |
    RemoveFieldAction |
    FieldChangeAction |
    FieldFocusAction |
    FieldBlurAction;
