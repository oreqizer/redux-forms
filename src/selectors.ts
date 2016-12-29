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
  const form = state.reduxFormLite[name];
  invariant(form, '[redux-form-lite] Form not found - check supplied form name.');

  return memValues(form.fields);
};


const memErrors = R.memoize(R.compose(
  unflatten,
  R.map(R.prop('error')),
));

export const errorSelector = (name: string, state: IState): Object => {
  const form = state.reduxFormLite[name];
  invariant(form, '[redux-form-lite] Form not found - check supplied form name.');

  return memErrors(form.fields);
};


const memValid = R.memoize(R.compose(
  R.none(Boolean),
  R.values,
  R.map(R.prop('error')),
));

export const isValid = (name: string, state: IState): boolean => {
  const form = state.reduxFormLite[name];
  invariant(form, '[redux-form-lite] Form not found - check supplied form name.');

  return memValid(<any> form.fields);
};


const memTouched = R.memoize(R.compose(
  R.all(R.identity),
  R.values,
  R.map(R.prop('touched')),
));

export const isTouched = (name: string, state: IState): boolean => {
  const form = state.reduxFormLite[name];
  invariant(form, '[redux-form-lite] Form not found - check supplied form name.');

  return memTouched(<any> form.fields);
};
