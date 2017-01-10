import * as R from 'ramda';


export type Omitted = {
  name?: any,
  persistent?: any,
  withRef?: any,
  // state
  _form?: any,
  _values?: any,
  _valid?: any,
  _submitting?: any,
  // actions
  _addForm?: any,
  _removeForm?: any,
  _touchAll?: any,
  _submitStart?: any,
  _submitStop?: any,
};

const FORM_PROPS = [
  'name',
  'persistent',
  'withRef',
  // state
  '_form',
  '_values',
  '_valid',
  '_submitting',
  // actions
  '_addForm',
  '_removeForm',
  '_touchAll',
  '_submitStart',
  '_submitStop',
];

const formProps = <T>(props: Omitted & T): T => R.omit(FORM_PROPS, props);

export default formProps;


export type NotUpdated = {
  _values?: any,
  _valid?: any,
  _submitting?: any,
};

const NOT_TO_UPDATE = [
  '_values',
  '_valid',
  '_submitting',
];

export const toUpdate = <T>(all: T & NotUpdated): T => R.omit(NOT_TO_UPDATE, all);
