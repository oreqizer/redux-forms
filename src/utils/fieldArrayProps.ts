import * as R from 'ramda';


const FIELD_ARRAY_PROPS = [
  'component',
  'withRef',
  // state
  '_form',
  '_array',
  // actions
  '_addArray',
  '_removeArray',
  '_arrayPush',
  '_arrayPop',
  '_arrayUnshift',
  '_arrayShift',
];


export type FieldProps = {
  length: number,
  map: (fn: (arr: string[]) => any) => any,
  push: () => void,
  pop: () => void,
  unshift: () => void,
  shift: () => void,
};

const fieldArrayProps = <T>(props: T, fields: FieldProps) => R.merge(
  R.omit(FIELD_ARRAY_PROPS, props), { fields },
);

export default fieldArrayProps;
