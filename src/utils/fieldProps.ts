import * as R from 'ramda';

import { Value } from './getValue';

import { InputProps, MetaProps, IAllProps, SeparatedProps } from "../types/Props";


const INPUT_PROPS = [
  'autocomplete',
  'checked',
  'height',
  'name',
  'pattern',
  'placeholder',
  'readonly',
  'required',
  'size',
  'selected',
  'spellCheck',
  'step',
  'type',
  'value',
  'width',
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

const IGNORE_PROPS = [
  ...INPUT_PROPS,
  ...META_PROPS,
  'component',
  'defaultValue',
  'index',
  'normalize',
  'validate',
  // state
  '_field',
  // actions
  '_addField',
  '_removeField',
  '_fieldChange',
  '_fieldFocus',
  '_fieldBlur',
  // context
  '_form',
  '_id',
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
  custom: R.omit(IGNORE_PROPS, all),
});

// Order matters!
// Separate always last
export default R.compose(separateProps, maybeCheckProps);
