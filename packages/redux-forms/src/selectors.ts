import {
  memoize,
  compose,
  map,
  prop,
  path,
  values,
  none,
  any,
  identity,
} from 'ramda';

import { State } from './formsReducer';
import { Form } from './containers';
import { unflatten } from './shared/helpers';
import { Value } from './shared/getValue';


export type Values = { [key: string]: Value | Value[] | Values[] };

export type Error = string | null;
export type Errors = { [key: string]: Error | Error[] | Errors[] };

export interface IState {
  reduxForms: State;
}

type Memoize<T> = (x: T[]) => T;


const EMPTY = {};

const memUnflatten = memoize(unflatten) as Memoize<{}>;

const memValue = memoize(compose(
  memUnflatten,
  map(prop('value')),
));

export function valueSelector(name: string, state: IState): Values {
  const form = path<Form>(['reduxForms', name], state);
  if (!form) {
    return EMPTY;
  }

  return memValue(form.fields);
}


const memError = memoize(compose(
  memUnflatten,
  map(prop('error')),
));

export function errorSelector(name: string, state: IState): Errors {
  const form = path<Form>(['reduxForms', name], state);
  if (!form) {
    return EMPTY;
  }

  return memError(form.fields);
}


const memValues = memoize(values) as Memoize<{}>;

const memValid = memoize(compose(
  none(Boolean),
  memValues,
  map(prop('error')),
));

export function isValid(name: string, state: IState): boolean {
  const form = path<Form>(['reduxForms', name], state);
  if (!form) {
    return false;
  }

  return memValid(form.fields);
}


const memTouched = memoize(compose(
  any(identity),
  memValues,
  map(prop('touched')),
));

export function isTouched(name: string, state: IState): boolean {
  const form = path<Form>(['reduxForms', name], state);
  if (!form) {
    return false;
  }

  return memTouched(form.fields);
}


const memDirty = memoize(compose(
  any(identity),
  memValues,
  map(prop('dirty')),
));

export function isDirty(name: string, state: IState): boolean {
  const form = path<Form>(['reduxForms', name], state);
  if (!form) {
    return false;
  }

  return memDirty(form.fields);
}


export function isSubmitting(name: string, state: IState): boolean {
  const form = path<Form>(['reduxForms', name], state);
  if (!form) {
    return false;
  }

  return form.submitting;
}
