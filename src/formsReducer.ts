import * as R from 'ramda';

import { Value } from './utils/getValue';
import { form, field, FormObj, FieldObj } from './utils/containers';
import arrayShift from './utils/arrayShift';

import {
  Action,
  ADD_FORM,
  REMOVE_FORM,
  ADD_FIELD,
  REMOVE_FIELD,
  TOUCH_ALL,

  ADD_ARRAY,
  REMOVE_ARRAY,
  PUSH,
  POP,
  UNSHIFT,
  SHIFT,

  FIELD_CHANGE,
  FIELD_FOCUS,
  FIELD_BLUR,
} from './actions';


export type State = {
  [form: string]: FormObj,
};


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

    case TOUCH_ALL:
      return R.over(
        R.lensPath([a.payload.form, 'fields']),
        R.map(R.set(R.lensProp('touched'), true)),
        state,
      );

    // Array
    // ---
    case ADD_ARRAY:
      return R.assocPath<number, State>(
        [a.payload.form, 'arrays', a.payload.id], 0, state,
      );

    case REMOVE_ARRAY:
      return R.dissocPath<State>(
        [a.payload.form, 'arrays', a.payload.id], state,
      );

    case PUSH:
      return R.over(
        R.lensPath([a.payload.form, 'arrays', a.payload.id]),
        R.inc,
        state,
      );

    case POP:
      return R.over(
        R.lensPath([a.payload.form, 'arrays', a.payload.id]),
        R.dec,
        state,
      );

    case UNSHIFT:
      return R.compose<State, State, State>(
        R.over(
          R.lensPath([a.payload.form, 'fields']),
          arrayShift(a.payload.id, 0),
        ),
        R.over(
          R.lensPath([a.payload.form, 'arrays', a.payload.id]),
          R.inc,
        ),
      )(state);

    case SHIFT:
      return R.compose<State, State, State>(
        R.over(
          R.lensPath([a.payload.form, 'fields']),
          arrayShift(a.payload.id, 0, false),
        ),
        R.over(
          R.lensPath([a.payload.form, 'arrays', a.payload.id]),
          R.dec,
        ),
      )(state);

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
