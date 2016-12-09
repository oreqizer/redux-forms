import * as R from 'ramda';
import { Value } from "./utils/getValue";

export const ADD_FIELD = '@redux-forms/ADD_FIELD';
export const REMOVE_FIELD = '@redux-forms/REMOVE_FIELD';

const field = {
  value: '',
  error: null,
  visited: false,
  touched: false,
  active: false,
  dirty: false,
};

const initialState = {
  fields: {},
};

export default function formsReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ADD_FIELD:
      return R.assocPath<Field, State>(['fields', action.payload.name], field, state);

    case REMOVE_FIELD:
      return R.dissocPath<State>(['fields', action.payload.name], state);

    default:
      return state;
  }
}

export const addField = (name: string) => ({
  type: ADD_FIELD,
  payload: { name },
});

export const removeField = (name: string) => ({
  type: REMOVE_FIELD,
  payload: { name },
});

export type Field = {
  value: Value;
  visited: boolean;
  touched: boolean;
  active: boolean;
  error: string | null;
  dirty: boolean;
}

export type State = {
  fields: { [key: string]: Field }
}

export type Action =
    { type: '@redux-forms/ADD_FIELD', payload: { form: string, name: string } }
    | { type: '@redux-forms/REMOVE_FIELD', payload: { form: string, name: string } }
