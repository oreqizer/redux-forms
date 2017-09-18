import {
  assocPath,
  dissocPath,
  over,
  lensPath,
  ifElse,
  identity,
  has,
  hasIn,
  map,
  set,
  lensProp,
  inc,
  dec,
  lt,
  always,
  pathSatisfies,
  compose,
} from 'ramda';

import { form, field, Form, Field } from './containers';
import { arrayUnshift, arrayShift, arraySwap, arrayMove } from './arrays';
import { isNumber } from './shared/helpers';

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
  ARRAY_MOVE,

  FIELD_CHANGE,
  FIELD_FOCUS,
  FIELD_BLUR,
  FIELD_VALUE,
  FIELD_ERROR,
  FIELD_DIRTY,
} from './actions';


export type State = {
  [form: string]: Form,
};


export default function formsReducer(state: State = {}, a: Action): State {
  switch (a.type) {
    // Form
    // ---
    case ADD_FORM:
      return assocPath<Form, State>(
        [a.payload.name], form, state,
      );

    case REMOVE_FORM:
      return dissocPath<State>(
        [a.payload.name], state,
      );

    case ADD_FIELD:
      return compose(
        assocPath<Field, State>([a.payload.form, 'fields', a.payload.id], a.payload.field),
        ifElse(
          has(a.payload.form),
          identity,
          assocPath<Form, State>([a.payload.form], form),
        ),
      )(state);

    case REMOVE_FIELD:
      return dissocPath<State>(
        [a.payload.form, 'fields', a.payload.id], state,
      );

    case TOUCH_ALL:
      return ifElse(
        has(a.payload.form),
        over(
          lensPath([a.payload.form, 'fields']),
          map(set(lensProp('touched'), true)),
        ),
        identity,
      )(state);

    case SUBMIT_START:
      return compose<State, State, State>(
        set(lensPath([a.payload.form, 'submitting']), true),
        ifElse(
          has(a.payload.form),
          identity,
          assocPath<Form, State>([a.payload.form], form),
        ),
      )(state);

    case SUBMIT_STOP:
      return compose<State, State, State>(
        set(lensPath([a.payload.form, 'submitting']), false),
        ifElse(
          has(a.payload.form),
          identity,
          assocPath<Form, State>([a.payload.form], form),
        ),
      )(state);

    // Array
    // ---
    case ADD_ARRAY:
      return compose<State, State, State>(
        assocPath<number, State>(
          [a.payload.form, 'arrays', a.payload.id], 0,
        ),
        ifElse(
          has(a.payload.form),
          identity,
          assocPath<Form, State>([a.payload.form], form),
        ),
      )(state);

    case REMOVE_ARRAY:
      return dissocPath<State>(
        [a.payload.form, 'arrays', a.payload.id], state,
      );

    case ARRAY_PUSH:
      return compose<State, State, State, State>(
        over(
          lensPath([a.payload.form, 'arrays', a.payload.id]),
          inc,
        ),
        ifElse(
          pathSatisfies(isNumber, [a.payload.form, 'arrays', a.payload.id]),
          identity,
          assocPath([a.payload.form, 'arrays', a.payload.id], 0),
        ),
        ifElse(
          has(a.payload.form),
          identity,
          assocPath<Form, State>([a.payload.form], form),
        ),
      )(state);

    case ARRAY_POP:
      return compose<State, State, State, State>(
        over(
          lensPath([a.payload.form, 'arrays', a.payload.id]),
          ifElse(lt(0), dec, always(0)),
        ),
        ifElse(
          pathSatisfies(isNumber, [a.payload.form, 'arrays', a.payload.id]),
          identity,
          assocPath([a.payload.form, 'arrays', a.payload.id], 0),
        ),
        ifElse(
          has(a.payload.form),
          identity,
          assocPath<Form, State>([a.payload.form], form),
        ),
      )(state);

    case ARRAY_UNSHIFT:
      return compose<State, State, State, State, State>(
        over(
          lensPath([a.payload.form, 'fields']),
          arrayUnshift(a.payload.id, 0),
        ),
        over(
          lensPath([a.payload.form, 'arrays', a.payload.id]),
          inc,
        ),
        ifElse(
          pathSatisfies(isNumber, [a.payload.form, 'arrays', a.payload.id]),
          identity,
          assocPath([a.payload.form, 'arrays', a.payload.id], 0),
        ),
        ifElse(
          has(a.payload.form),
          identity,
          assocPath<Form, State>([a.payload.form], form),
        ),
      )(state);

    case ARRAY_SHIFT:
      return compose<State, State, State, State, State>(
        over(
          lensPath([a.payload.form, 'fields']),
          arrayShift(a.payload.id, 0),
        ),
        over(
          lensPath([a.payload.form, 'arrays', a.payload.id]),
          ifElse(lt(0), dec, always(0)),
        ),
        ifElse(
          pathSatisfies(isNumber, [a.payload.form, 'arrays', a.payload.id]),
          identity,
          assocPath([a.payload.form, 'arrays', a.payload.id], 0),
        ),
        ifElse(
          has(a.payload.form),
          identity,
          assocPath<Form, State>([a.payload.form], form),
        ),
      )(state);

    case ARRAY_INSERT:
      return compose<State, State, State, State, State>(
        over(
          lensPath([a.payload.form, 'fields']),
          arrayUnshift(a.payload.id, a.payload.index + 1),
        ),
        over(
          lensPath([a.payload.form, 'arrays', a.payload.id]),
          inc,
        ),
        ifElse(
          pathSatisfies(isNumber, [a.payload.form, 'arrays', a.payload.id]),
          identity,
          assocPath([a.payload.form, 'arrays', a.payload.id], 0),
        ),
        ifElse(
          has(a.payload.form),
          identity,
          assocPath<Form, State>([a.payload.form], form),
        ),
      )(state);

    case ARRAY_REMOVE:
      return compose<State, State, State, State, State>(
        over(
          lensPath([a.payload.form, 'fields']),
          arrayShift(a.payload.id, a.payload.index),
        ),
        over(
          lensPath([a.payload.form, 'arrays', a.payload.id]),
          ifElse(lt(0), dec, always(0)),
        ),
        ifElse(
          pathSatisfies(isNumber, [a.payload.form, 'arrays', a.payload.id]),
          identity,
          assocPath([a.payload.form, 'arrays', a.payload.id], 0),
        ),
        ifElse(
          has(a.payload.form),
          identity,
          assocPath<Form, State>([a.payload.form], form),
        ),
      )(state);

    case ARRAY_SWAP:
      return compose<State, State, State, State>(
        over(
          lensPath([a.payload.form, 'fields']),
          arraySwap(a.payload.id, a.payload.index1, a.payload.index2),
        ),
        ifElse(
          pathSatisfies(isNumber, [a.payload.form, 'arrays', a.payload.id]),
          identity,
          assocPath([a.payload.form, 'arrays', a.payload.id], 0),
        ),
        ifElse(
          has(a.payload.form),
          identity,
          assocPath<Form, State>([a.payload.form], form),
        ),
      )(state);

    case ARRAY_MOVE:
      return compose<State, State, State, State>(
        over(
          lensPath([a.payload.form, 'fields']),
          arrayMove(a.payload.id, a.payload.from, a.payload.to),
        ),
        ifElse(
          pathSatisfies(isNumber, [a.payload.form, 'arrays', a.payload.id]),
          identity,
          assocPath([a.payload.form, 'arrays', a.payload.id], 0),
        ),
        ifElse(
          has(a.payload.form),
          identity,
          assocPath<Form, State>([a.payload.form], form),
        ),
      )(state);

    // Field
    // ---
    case FIELD_CHANGE:
      return compose<State, State, State, State>(
          assocPath([a.payload.form, 'fields', a.payload.field, 'value'], a.payload.value),
          assocPath([a.payload.form, 'fields', a.payload.field, 'error'], a.payload.error),
          assocPath([a.payload.form, 'fields', a.payload.field, 'dirty'], a.payload.dirty),
      )(state);

    case FIELD_FOCUS:
      return compose<State, State, State>(
          assocPath([a.payload.form, 'fields', a.payload.field, 'active'], true),
          assocPath([a.payload.form, 'fields', a.payload.field, 'visited'], true),
      )(state);

    case FIELD_BLUR:
      return compose<State, State, State, State, State, State>(
          assocPath([a.payload.form, 'fields', a.payload.field, 'value'], a.payload.value),
          assocPath([a.payload.form, 'fields', a.payload.field, 'error'], a.payload.error),
          assocPath([a.payload.form, 'fields', a.payload.field, 'dirty'], a.payload.dirty),
          assocPath([a.payload.form, 'fields', a.payload.field, 'active'], false),
          assocPath([a.payload.form, 'fields', a.payload.field, 'touched'], true),
      )(state);

    case FIELD_VALUE:
      return assocPath([a.payload.form, 'fields', a.payload.field, 'value'], a.payload.value, state);

    case FIELD_ERROR:
      return assocPath([a.payload.form, 'fields', a.payload.field, 'error'], a.payload.error, state);

    case FIELD_DIRTY:
      return assocPath([a.payload.form, 'fields', a.payload.field, 'dirty'], a.payload.dirty, state);

    default:
      return state;
  }
}
