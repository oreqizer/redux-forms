import { unflatten } from 'flat';
import * as R from 'ramda';
import * as invariant from 'invariant';

import { State } from "./formsDuck";
import { FormObj, FieldObj } from "./utils/containers";


export interface IState {
  reduxFormLite: State;
}

export type Mapper = (field: FieldObj) => any;


const memUnflat = R.memoize(unflatten);

const mapSelector = (name: string, fn: Mapper, state: IState): Object => {
  const form = state.reduxFormLite[name];
  invariant(form, '[redux-form-lite] Form not found - check supplied form name.');

  // TS doesn't recognize objects as Functors
  return memUnflat(R.map(fn, <any> form.fields));
};


export const fieldSelector = (name: string, state: IState): Object => {
  return mapSelector(name, R.identity, state);
};

export const valueSelector = (name: string, state: IState): Object => {
  return mapSelector(name, R.prop('value'), state);
};

export const errorSelector = (name: string, state: IState): Object => {
  return mapSelector(name, R.prop('error'), state);
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
