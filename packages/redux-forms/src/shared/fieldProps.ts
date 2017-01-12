import * as R from 'ramda';

import { Value, Target } from "./getValue";


export type InputProps = {
  name: string,
  value: Value,
  checked?: boolean,
  onChange: (ev: React.SyntheticEvent<Target>) => void,
  onFocus: (ev: React.SyntheticEvent<Target>) => void,
  onBlur: (ev: React.SyntheticEvent<Target>) => void,
};

export type MetaProps = {
  error: string | null,
  dirty: boolean,
  touched: boolean,
  visited: boolean,
  active: boolean,
};

export type SeparatedProps<T> = {
  input: InputProps;
  meta: MetaProps;
  custom: T;
};


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


const maybeCheckProps = (all: InputProps): InputProps => {
  if (typeof all.value === 'boolean') {
    return R.merge(all, { checked: all.value });
  }
  return all;
};

const separateProps = <T>(all: T & InputProps & MetaProps): SeparatedProps<T> => ({
  input: R.pick<InputProps, InputProps>(INPUT_PROPS, all),
  meta: R.pick<InputProps, MetaProps>(META_PROPS, all),
  custom: R.omit(R.flatten([INPUT_PROPS, META_PROPS, FIELD_PROPS]), all),
});

export default R.compose(separateProps, maybeCheckProps);


export const boolField = R.over(R.lensProp('_field'), Boolean);
