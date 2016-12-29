import { unflatten } from 'flat';
import * as R from 'ramda';

import { State } from "./formsDuck";
import { FormObj, FieldObj } from "./utils/containers";


export interface IState {
  reduxFormLite: State;
}

export type Mapper = (field: FieldObj) => any;


const memUnflat = R.memoize(unflatten);

export const fieldSelector = (name: string, state: IState): Object => {
  const form = state.reduxFormLite[name];
  if (!form) {
    return {};
  }

  return memUnflat(form.fields);
};

export const mapSelector = (name: string, fn: Mapper, state: IState): Object => {
  const form = state.reduxFormLite[name];
  if (!form) {
    return {};
  }

  // TS doesn't recognize objects as Functors
  return memUnflat(R.map(fn, <any> form.fields));
};
