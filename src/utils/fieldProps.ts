import * as R from 'ramda';

import { Value } from './getValue';

import { InputProps, MetaProps, IAllProps, SeparatedProps } from "../types/Props";


const INPUT_PROPS = [
  'checked',
  'name',
  'value',
  'onChange',
  'onFocus',
  'onBlur',
];

const META_PROPS = [
  'active',
  'dirty',
  'error',
  'touched',
  'visited',
];

const FIELD_PROPS = [
  'component',
  'defaultValue',
  'normalize',
  'validate',
  'withRef',
  // state
  '_form',
  '_field',
  // actions
  '_addField',
  '_removeField',
  '_fieldChange',
  '_fieldFocus',
  '_fieldBlur',
];


const maybeCheckProps = (all: IAllProps): IAllProps => {
  if (typeof all.value === 'boolean') {
    return R.merge(all, { checked: all.value });
  }
  return all;
};

const separateProps = (all: IAllProps): SeparatedProps => ({
  input: R.pick<IAllProps, InputProps>(INPUT_PROPS, all),
  meta: R.pick<IAllProps, MetaProps>(META_PROPS, all),
  custom: R.omit(R.flatten([INPUT_PROPS, META_PROPS, FIELD_PROPS]), all),
});

export default R.compose(separateProps, maybeCheckProps);
