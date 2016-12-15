import * as R from 'ramda';

import { ARRAY_IGNORE_PROPS } from './consts';


export type FunctionProps = {
  map: (fn: (arr: string[]) => any) => any,
  push: () => void,
  pop: () => void,
};

const separateProps = <T>(props: T, fns: FunctionProps) => R.merge(
  R.omit(ARRAY_IGNORE_PROPS, props), { fields: fns },
);

export default separateProps;
