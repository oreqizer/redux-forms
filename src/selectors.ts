import * as R from 'ramda';
import * as invariant from 'invariant';

import { State } from './formsReducer';
import { FormObj, FieldObj } from './utils/containers';
import { unflatten } from './utils/helpers';


export interface IState {
  reduxFormLite: State;
}


const memValues = R.memoize(R.compose(
  unflatten,
  R.map(R.prop('value')),
));

export function valueSelector(name: string, state: IState): Object {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return {};
  }

  return memValues(form.fields);
}


const memErrors = R.memoize(R.compose(
  unflatten,
  R.map(R.prop('error')),
));

export function errorSelector(name: string, state: IState): Object {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return {};
  }

  return memErrors(form.fields);
}


const memValid = R.memoize(R.compose(
  R.none(Boolean),
  R.values,
  R.map(R.prop('error')),
));

export function isValid(name: string, state: IState): boolean {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return false;
  }

  // TS thinks 'form.fields' is not a functor
  return memValid(<any> form.fields);
}


const memTouched = R.memoize(R.compose(
  R.any(R.identity),
  R.values,
  R.map(R.prop('touched')),
));

export function isTouched(name: string, state: IState): boolean {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return false;
  }

  // TS thinks 'form.fields' is not a functor
  return memTouched(<any> form.fields);
}


const memDirty = R.memoize(R.compose(
  R.any(R.identity),
  R.values,
  R.map(R.prop('dirty')),
));

export function isDirty(name: string, state: IState): boolean {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return false;
  }

  // TS thinks 'form.fields' is not a functor
  return memDirty(<any> form.fields);
}


export function isSubmitting(name: string, state: IState): boolean {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return false;
  }

  return form.submitting;
}
