import {
  assoc,
  assocPath,
  dissoc,
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
  defaultTo,
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

const RarrayInc = compose(inc, defaultTo(0));
const RarrayDec = compose(dec, defaultTo(0));

export default function formsReducer(state: State = {}, a: Action): State {
  switch (a.type) {
    // Form
    // ---
    case ADD_FORM:
      return assocPath<Form, State>(
        [a.payload.name], form, state,
      );

    case REMOVE_FORM:
      return dissoc<State>(a.payload.name, state);

    case ADD_FIELD:
      return ifElse(
        has(a.payload.form),
        assocPath([a.payload.form, 'fields', a.payload.id], a.payload.field),
        identity,
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
      return ifElse(
        has(a.payload.form),
        assocPath([a.payload.form, 'submitting'], true),
        identity,
      )(state);

    case SUBMIT_STOP:
      return ifElse(
        has(a.payload.form),
        assocPath([a.payload.form, 'submitting'], false),
        identity,
      )(state);

    // Array
    // ---
    case ADD_ARRAY:
      return ifElse(
        has(a.payload.form),
        assocPath([a.payload.form, 'arrays', a.payload.id], 0),
        identity,
      )(state);

    case REMOVE_ARRAY:
      // TODO remove any associated fields
      return dissocPath<State>(
        [a.payload.form, 'arrays', a.payload.id], state,
      );

    case ARRAY_PUSH:
      return ifElse(
        has(a.payload.form),
        over(lensPath([a.payload.form, 'arrays', a.payload.id]), RarrayInc),
        identity,
      )(state);

    case ARRAY_POP:
      return ifElse(
        has(a.payload.form),
        over(
          lensPath([a.payload.form, 'arrays', a.payload.id]),
          ifElse(lt(0), RarrayDec, always(0)),
        ),
        identity,
      )(state);

    case ARRAY_UNSHIFT:
      return ifElse(
        has(a.payload.form),
        compose<State, State, State>(
          over(
            lensPath([a.payload.form, 'fields']),
            arrayUnshift(a.payload.id, 0),
          ),
          over(
            lensPath([a.payload.form, 'arrays', a.payload.id]),
            RarrayInc,
          ),
        ),
        identity,
      )(state);

    case ARRAY_SHIFT:
      return ifElse(
        has(a.payload.form),
        compose<State, State, State>(
          over(
            lensPath([a.payload.form, 'fields']),
            arrayShift(a.payload.id, 0),
          ),
          over(
            lensPath([a.payload.form, 'arrays', a.payload.id]),
            ifElse(lt(0), RarrayDec, always(0)),
          ),
        ),
        identity,
      )(state);

    case ARRAY_INSERT:
      return ifElse(
        has(a.payload.form),
        compose<State, State, State>(
          over(
            lensPath([a.payload.form, 'fields']),
            arrayUnshift(a.payload.id, a.payload.index + 1),
          ),
          over(
            lensPath([a.payload.form, 'arrays', a.payload.id]),
            RarrayInc,
          ),
        ),
        identity,
      )(state);

    case ARRAY_REMOVE:
      return ifElse(
        has(a.payload.form),
        compose<State, State, State>(
          over(
            lensPath([a.payload.form, 'fields']),
            arrayShift(a.payload.id, a.payload.index),
          ),
          over(
            lensPath([a.payload.form, 'arrays', a.payload.id]),
            ifElse(lt(0), RarrayDec, always(0)),
          ),
        ),
        identity,
      )(state);

    case ARRAY_SWAP:
      return ifElse(
        has(a.payload.form),
        over(
          lensPath([a.payload.form, 'fields']),
          arraySwap(a.payload.id, a.payload.index1, a.payload.index2),
        ),
        identity,
      )(state);

    case ARRAY_MOVE:
      return compose<State, State, State>(
        over(
          lensPath([a.payload.form, 'fields']),
          arrayMove(a.payload.id, a.payload.from, a.payload.to),
        ),
        ifElse(
          has(a.payload.form),
          identity,
          assoc(a.payload.form, form),
        ),
      )(state);

    // Field
    // ---
    case FIELD_CHANGE:
      return ifElse(
        pathSatisfies(Boolean, [a.payload.form, 'fields', a.payload.field]),
        compose<State, State, State, State>(
          assocPath([a.payload.form, 'fields', a.payload.field, 'value'], a.payload.value),
          assocPath([a.payload.form, 'fields', a.payload.field, 'error'], a.payload.error),
          assocPath([a.payload.form, 'fields', a.payload.field, 'dirty'], a.payload.dirty),
        ),
        identity,
      )(state);

    case FIELD_FOCUS:
      return ifElse(
        pathSatisfies(Boolean, [a.payload.form, 'fields', a.payload.field]),
        compose<State, State, State>(
          assocPath([a.payload.form, 'fields', a.payload.field, 'active'], true),
          assocPath([a.payload.form, 'fields', a.payload.field, 'visited'], true),
        ),
        identity,
      )(state);

    case FIELD_BLUR:
      return ifElse(
        pathSatisfies(Boolean, [a.payload.form, 'fields', a.payload.field]),
        compose<State, State, State, State, State, State>(
          assocPath([a.payload.form, 'fields', a.payload.field, 'value'], a.payload.value),
          assocPath([a.payload.form, 'fields', a.payload.field, 'error'], a.payload.error),
          assocPath([a.payload.form, 'fields', a.payload.field, 'dirty'], a.payload.dirty),
          assocPath([a.payload.form, 'fields', a.payload.field, 'active'], false),
          assocPath([a.payload.form, 'fields', a.payload.field, 'touched'], true),
        ),
        identity,
      )(state);

    case FIELD_VALUE:
      return ifElse(
        pathSatisfies(Boolean, [a.payload.form, 'fields', a.payload.field]),
        assocPath([a.payload.form, 'fields', a.payload.field, 'value'], a.payload.value),
        identity,
      )(state);

    case FIELD_ERROR:
      return ifElse(
        pathSatisfies(Boolean, [a.payload.form, 'fields', a.payload.field]),
        assocPath([a.payload.form, 'fields', a.payload.field, 'error'], a.payload.error),
        identity,
      )(state);

    case FIELD_DIRTY:
      return ifElse(
        pathSatisfies(Boolean, [a.payload.form, 'fields', a.payload.field]),
        assocPath([a.payload.form, 'fields', a.payload.field, 'dirty'], a.payload.dirty),
        identity,
      )(state);

    default:
      return state;
  }
}
