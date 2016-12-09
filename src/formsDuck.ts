import * as R from 'ramda';
import { Value } from "./utils/getValue";

export const ADD_FORM = '@redux-forms/ADD_FORM';
export const REMOVE_FORM = '@redux-forms/REMOVE_FORM';

export const ADD_FIELD = '@redux-forms/ADD_FIELD';
export const REMOVE_FIELD = '@redux-forms/REMOVE_FIELD';

export const SET_VALUE = '@redux-forms/SET_VALUE';
export const SET_ERROR = '@redux-forms/SET_ERROR';
export const SET_VISITED = '@redux-forms/SET_VISITED';
export const SET_TOUCHED = '@redux-forms/SET_TOUCHED';
export const SET_ACTIVE = '@redux-forms/SET_ACTIVE';

export const field = {
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

export default function formsReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    // Form
    // ---
    case ADD_FORM:
      return R.assocPath<Form, State>(['forms', action.payload.name], {}, state);

    case REMOVE_FORM:
      return R.dissocPath<State>(['forms', action.payload.name], state);

    case ADD_FIELD:
      return R.assocPath<Field, State>(['forms', action.payload.form, action.payload.id], field, state);

    case REMOVE_FIELD:
      return R.dissocPath<State>(['forms', action.payload.form, action.payload.id], state);

    // Field
    // ---

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

export type Action =
    AddFormAction |
    RemoveFormAction |
    AddFieldAction |
    RemoveFieldAction;
