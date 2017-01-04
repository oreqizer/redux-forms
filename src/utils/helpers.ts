import * as R from 'ramda';

export function isString(cand: any): cand is string {
  return typeof cand === 'string';
}

export function isNumber(cand: any): cand is number {
  return typeof cand === 'number';
}

export function isPromise<T>(cand: any): cand is PromiseLike<T> {
  return Boolean(cand) && typeof cand === 'object' && typeof cand.then === 'function';
}

export function isFunction(cand: any): cand is Function {
  return typeof cand === 'function';
}

export function isEvent(cand: any): cand is React.SyntheticEvent<any> {
  return Boolean(
    cand &&
    typeof cand === 'object' &&
    isFunction(cand.preventDefault) &&
    isFunction(cand.stopPropagation),
  );
}


export type Props = { [key: string]: any };

export function shallowCompare(props1: Props, props2: Props): boolean {
  return R.reduce((acc, key) =>
    R.prop(key, props1) === R.prop(key, props2), true, R.keys(props1));
}

export type Flat = { [key: string]: any };

// NOTE: ugly imperative code
// A rewrite would be welcome.
export function unflatten(obj: Flat) {
  let result = {};

  Object.keys(obj)
    .forEach((prop) => prop.split('.')
      .reduce((acc: any, key, index, array) => {
        const k = Number.isNaN(Number(key)) ? key : Number(key);

        if (index === array.length - 1) {
          return acc[k] = obj[prop];
        }

        if (acc[k]) {
          return acc[k] = acc[k];
        }

        if (!Number.isNaN(Number(array[index + 1]))) {
          return acc[k] = [];
        }

        return acc[k] = {};
      }, result));

  return result;
}

export function invariant(cond: boolean, msg: string) {
  if (cond) {
    return;
  }

  const error = new Error(msg);

  error.name = 'Invariant violation';

  throw error;
}
