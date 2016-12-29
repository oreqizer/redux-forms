import { createSelector } from 'reselect';
import { unflatten } from 'flat';
import * as R from 'ramda';

import { State } from "../formsDuck";
import { FormObj } from "../utils/containers";


export interface IState {
  reduxFormLite: State;
}

export interface IProps {
  _form: string;
}


const formSelector = (state: IState, props: IProps) => state.reduxFormLite[props._form];


export const unflattenSelector = createSelector(
  formSelector, (form: FormObj | null) => {
    if (!form) {
      return {};
    }

    return unflatten(form);
  },
);
