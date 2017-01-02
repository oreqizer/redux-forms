export function isString(cand: any): cand is string {
  return typeof cand === 'string';
}

export function isPromise<T>(cand: any): cand is PromiseLike<T> {
  return Boolean(cand) && typeof cand === 'object' && typeof cand.then === 'function';
}

export function isFunction(cand: any): cand is Function {
  return typeof cand === 'function';
}
