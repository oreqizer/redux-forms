import { unflatten } from 'flat';
import * as R from 'ramda';
import * as invariant from 'invariant';

import { State } from "./formsReducer";
import { FormObj, FieldObj } from "./utils/containers";


export interface IState {
  reduxFormLite: State;
}


const memValues = R.memoize(R.compose(
  unflatten,
  R.map(R.prop('value')),
));

export const valueSelector = (name: string, state: IState): Object => {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return {};
  }

  return memValues(form.fields);
};


const memErrors = R.memoize(R.compose(
  unflatten,
  R.map(R.prop('error')),
));

export const errorSelector = (name: string, state: IState): Object => {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return {};
  }

  return memErrors(form.fields);
};


const memValid = R.memoize(R.compose(
  R.none(Boolean),
  R.values,
  R.map(R.prop('error')),
));

export const isValid = (name: string, state: IState): boolean => {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return false;
  }

  return memValid(<any> form.fields);
};


const memTouched = R.memoize(R.compose(
  R.all(R.identity),
  R.values,
  R.map(R.prop('touched')),
));

export const isTouched = (name: string, state: IState): boolean => {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return false;
  }

  return memTouched(<any> form.fields);
};


export const isSubmitting = (name: string, state: IState): boolean => {
  const form = R.path<FormObj>(['reduxFormLite', name], state);
  if (!form) {
    return false;
  }

  return form.submitting;
};
