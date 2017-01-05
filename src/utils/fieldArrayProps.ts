import * as R from 'ramda';


export type Omitted = {
  component?: any,
  withRef?: any,
  // state
  _form?: any,
  _array?: any,
  // actions
  _addArray?: any,
  _removeArray?: any,
  _arrayPush?: any,
  _arrayPop?: any,
  _arrayUnshift?: any,
  _arrayShift?: any,
  _arrayInsert?: any,
  _arrayRemove?: any,
  _arraySwap?: any,
};

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
  '_arrayInsert',
  '_arrayRemove',
  '_arraySwap',
];


export type FieldsProp = {
  length: number,
  map: (fn: (el: string, index: number) => any) => any[],
  push: () => void,
  pop: () => void,
  unshift: () => void,
  shift: () => void,
  insert: (index: number) => void,
  remove: (index: number) => void,
  swap: (pos1: number, pos2: number) => void,
};

export type FieldProp = { fields: FieldsProp };


const fieldArrayProps = <T>(props: T & Omitted, fields: FieldsProp): T & FieldProp => R.merge(
  R.omit(FIELD_ARRAY_PROPS, props), { fields },
);

export default fieldArrayProps;
