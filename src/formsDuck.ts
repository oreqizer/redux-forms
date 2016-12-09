import * as R from 'ramda';
import { Value } from "./utils/getValue";

export const ADD_FIELD = '@redux-forms/ADD_FIELD';
export const REMOVE_FIELD = '@redux-forms/REMOVE_FIELD';

export const field = {
  value: '',
  error: null,
  visited: false,
  touched: false,
  active: false,
  dirty: false,
};

export const initialState = {
  fields: {},
};

export default function formsReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ADD_FIELD:
      return R.assocPath<Field, State>(['fields', action.payload.id], field, state);

    case REMOVE_FIELD:
      return R.dissocPath<State>(['fields', action.payload.id], state);

    default:
      return state;
  }
}

export const addField = (id: string): AddFieldAction => ({
  type: ADD_FIELD,
  payload: { id },
});

export const removeField = (id: string): RemoveFieldAction => ({
  type: REMOVE_FIELD,
  payload: { id },
});

export type Field = {
  value: Value;
  visited: boolean;
  touched: boolean;
  active: boolean;
  error: string | null;
  dirty: boolean;
};

export type State = {
  fields: { [key: string]: Field },
};

export type AddFieldAction = { type: '@redux-forms/ADD_FIELD', payload: { id: string } };

export type RemoveFieldAction = { type: '@redux-forms/REMOVE_FIELD', payload: { id: string } };

export type Action =
    AddFieldAction |
    RemoveFieldAction;
