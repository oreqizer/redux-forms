import {
  merge,
  pick,
  compose,
  over,
  lensProp,
  omit,
} from 'ramda';

import { Target } from './getValue';


export type InputProps = {
  name: string,
  value: any,
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

export type All<T> = T & InputProps & MetaProps;

export type SeparatedProps<T> = {
  input: InputProps,
  meta: MetaProps,
  rest: T,
};


const INPUT_PROPS = [
  'checked',
  'name',
  'value',
  'onChange',
  'onFocus',
  'onBlur',
];

export type InputProp =
  | 'checked'
  | 'name'
  | 'value'
  | 'onChange'
  | 'onFocus'
  | 'onBlur';

const META_PROPS = [
  'active',
  'dirty',
  'error',
  'touched',
  'visited',
];

export type MetaProp =
  | 'active'
  | 'dirty'
  | 'error'
  | 'touched'
  | 'visited';

const IGNORE_PROPS = [
  ...INPUT_PROPS,
  ...META_PROPS,
  'validate',
  'normalize',
  'defaultValue',
  '_form',
  '_addField',
  '_fieldChange',
  '_fieldFocus',
  '_fieldBlur',
];


const maybeCheckProps = <T>(all: All<T>): All<T> => {
  if (typeof all.value === 'boolean') {
    return merge(all, { checked: all.value });
  }
  return all;
};

const separateProps = <T>(all: All<T>): SeparatedProps<T> => ({
  input: pick<All<T>, InputProp>(INPUT_PROPS, all),
  meta: pick<All<T>, MetaProp>(META_PROPS, all),
  rest: omit<T>(IGNORE_PROPS, all),
});

export default compose(separateProps, maybeCheckProps);


export const boolField = over(lensProp('_field'), Boolean);
