import * as R from 'ramda';

import { State } from './formsReducer';
import { FormObj, FieldObj } from './utils/containers';
import { unflatten } from './utils/helpers';


export interface IState {
  reduxFormLite: State;
}

type Memoize<T> = (x: T[]) => T;


const EMPTY = {};

const memUnflatten = <Memoize<{}>> R.memoize(unflatten);

const memValue = R.memoize(R.compose(
  memUnflatten,
  R.map(R.prop('value')),
));

export function valueSelector(name: string, state: IState): Object {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return EMPTY;
  }

  return memValue(form.fields);
}


const memError = R.memoize(R.compose(
  memUnflatten,
  R.map(R.prop('error')),
));

export function errorSelector(name: string, state: IState): Object {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return EMPTY;
  }

  return memError(form.fields);
}


const memValues = <Memoize<{}>> R.memoize(R.values);

const memValid = R.memoize(R.compose(
  R.none(Boolean),
  memValues,
  R.map(R.prop('error')),
));

export function isValid(name: string, state: IState): boolean {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return false;
  }

  return memValid(form.fields);
}


const memTouched = R.memoize(R.compose(
  R.any(R.identity),
  memValues,
  R.map(R.prop('touched')),
));

export function isTouched(name: string, state: IState): boolean {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return false;
  }

  return memTouched(form.fields);
}


const memDirty = R.memoize(R.compose(
  R.any(R.identity),
  memValues,
  R.map(R.prop('dirty')),
));

export function isDirty(name: string, state: IState): boolean {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return false;
  }

  return memDirty(form.fields);
}


export function isSubmitting(name: string, state: IState): boolean {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return false;
  }

  return form.submitting;
}
