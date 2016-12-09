import * as R from 'ramda';

import { INPUT_PROPS, META_PROPS, IGNORE_PROPS } from './consts';
import { Value } from './getValue';

import { InputProps, MetaProps } from "../types/Props";


export interface IAllProps {
  value: Value;
  checked?: boolean;
}

export type SeparatedProps = {
  input: InputProps;
  meta: MetaProps;
  custom: Object;
};


const maybeCheckProps = (all: IAllProps): IAllProps => {
  if (typeof all.value === 'boolean') {
    return R.merge(all, { checked: all.value });
  }
  return all;
};

const separateProps = (all: IAllProps): SeparatedProps => ({
  input: R.pick<IAllProps, InputProps>(INPUT_PROPS, all),
  meta: R.pick<IAllProps, MetaProps>(META_PROPS, all),
  custom: R.omit(IGNORE_PROPS, all),
});

// Order matters!
// Separate always last
export default R.compose(separateProps, maybeCheckProps);
