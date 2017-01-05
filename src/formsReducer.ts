import * as R from 'ramda';

import { Value } from './utils/getValue';
import { form, field, FormObj, FieldObj } from './utils/containers';
import { arrayShift, arraySwap } from './utils/arrays';

import {
  Action,
  ADD_FORM,
  REMOVE_FORM,
  ADD_FIELD,
  REMOVE_FIELD,
  TOUCH_ALL,
  SUBMIT_START,
  SUBMIT_STOP,

  ADD_ARRAY,
  REMOVE_ARRAY,
  ARRAY_PUSH,
  ARRAY_POP,
  ARRAY_UNSHIFT,
  ARRAY_SHIFT,
  ARRAY_INSERT,
  ARRAY_REMOVE,
  ARRAY_SWAP,

  FIELD_CHANGE,
  FIELD_FOCUS,
  FIELD_BLUR,
  FIELD_VALUE,
  FIELD_ERROR,
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

    case SUBMIT_START:
      return R.set(R.lensPath([a.payload.form, 'submitting']), true, state);

    case SUBMIT_STOP:
      return R.set(R.lensPath([a.payload.form, 'submitting']), false, state);

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

    case ARRAY_PUSH:
      return R.over(
        R.lensPath([a.payload.form, 'arrays', a.payload.id]),
        R.inc,
        state,
      );

    case ARRAY_POP:
      return R.over(
        R.lensPath([a.payload.form, 'arrays', a.payload.id]),
        R.dec,
        state,
      );

    case ARRAY_UNSHIFT:
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

    case ARRAY_SHIFT:
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

    case ARRAY_INSERT:
      return R.compose<State, State, State>(
        R.over(
          R.lensPath([a.payload.form, 'fields']),
          arrayShift(a.payload.id, a.payload.index + 1),
        ),
        R.over(
          R.lensPath([a.payload.form, 'arrays', a.payload.id]),
          R.inc,
        ),
      )(state);

    case ARRAY_REMOVE:
      return R.compose<State, State, State>(
        R.over(
          R.lensPath([a.payload.form, 'fields']),
          arrayShift(a.payload.id, a.payload.index, false),
        ),
        R.over(
          R.lensPath([a.payload.form, 'arrays', a.payload.id]),
          R.dec,
        ),
      )(state);

    case ARRAY_SWAP:
      return R.over(
        R.lensPath([a.payload.form, 'fields']),
        arraySwap(a.payload.pos1, a.payload.pos2),
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
      return R.compose<State, State, State, State, State, State>(
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'value'], a.payload.value),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'error'], a.payload.error),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'dirty'], a.payload.dirty),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'active'], false),
          R.assocPath([a.payload.form, 'fields', a.payload.field, 'touched'], true),
      )(state);

    case FIELD_VALUE:
      return R.assocPath(
        [a.payload.form, 'fields', a.payload.field, 'value'], a.payload.value, state,
      );

    case FIELD_ERROR:
      return R.assocPath(
        [a.payload.form, 'fields', a.payload.field, 'error'], a.payload.error, state,
      );

    default:
      return state;
  }
}
