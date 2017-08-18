import {
  omit,
} from 'ramda';

const IGNORE_PROPS = [
  '_form',
  '_array',
  '_addArray',
  '_arrayPush',
  '_arrayPop',
  '_arrayUnshift',
  '_arrayShift',
  '_arrayInsert',
  '_arrayRemove',
  '_arraySwap',
  '_arrayMove',
];

const clearProps = <T>(all: T): T => omit<T>(IGNORE_PROPS, all);

export default clearProps;
