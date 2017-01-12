import * as R from 'ramda';

import { State } from './formsReducer';
import { Form } from './containers';
import { unflatten } from './shared/helpers';


export interface IState {
  reduxForms: State;
}

type Memoize<T> = (x: T[]) => T;


const EMPTY = {};

const memUnflatten = R.memoize(unflatten) as Memoize<{}>;

const memValue = R.memoize(R.compose(
  memUnflatten,
  R.map(R.prop('value')),
));

export function valueSelector(name: string, state: IState): Object {
  const form = R.path<Form>(['reduxForms', name], state);
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
  const form = R.path<Form>(['reduxForms', name], state);
  if (!form) {
    return EMPTY;
  }

  return memError(form.fields);
}


const memValues = R.memoize(R.values) as Memoize<{}>;

const memValid = R.memoize(R.compose(
  R.none(Boolean),
  memValues,
  R.map(R.prop('error')),
));

export function isValid(name: string, state: IState): boolean {
  const form = R.path<Form>(['reduxForms', name], state);
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
  const form = R.path<Form>(['reduxForms', name], state);
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
  const form = R.path<Form>(['reduxForms', name], state);
  if (!form) {
    return false;
  }

  return memDirty(form.fields);
}


export function isSubmitting(name: string, state: IState): boolean {
  const form = R.path<Form>(['reduxForms', name], state);
  if (!form) {
    return false;
  }

  return form.submitting;
}
