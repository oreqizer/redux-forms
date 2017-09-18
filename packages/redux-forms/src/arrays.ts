import {
  compose,
  tail,
  split,
  replace,
  reduce,
  assoc,
  prop,
  head,
  prepend,
  keys,
  any,
  map,
  identity,
  not,
  startsWith,
  pickBy,
} from 'ramda';

import { Field } from "./containers";


export type Fields = { [key: string]: Field };


export function arrayUnshift(path: string, start: number) {
  const toParts = compose<string, string, string[], string[]>(
    tail,
    split('.'),
    replace(path, ''),
  );

  return (fields: Fields): Fields => reduce((acc, key) => {
    if (key.indexOf(path) !== 0) {
      return assoc(key, prop(key, fields), acc);
    }

    const parts = toParts(key);
    const index = Number(head(parts));

    if (isNaN(index) || index < start) {
      return assoc(key, prop(key, fields), acc);
    }

    const lead = `${path}.${index + 1}`;
    const newkey = prepend(lead, tail(parts)).join('.');
    return assoc(newkey, prop(key, fields), acc);
  }, {}, keys(fields));
}

export function arrayShift(path: string, start: number) {
  const toParts = compose<string, string, string[], string[]>(
    tail,
    split('.'),
    replace(path, ''),
  );

  return (fields: Fields): Fields => reduce((acc, key) => {
    if (key.indexOf(path) !== 0) {
      return assoc(key, prop(key, fields), acc);
    }

    const parts = toParts(key);
    const index = Number(head(parts));

    if (isNaN(index) || index < start) {
      return assoc(key, prop(key, fields), acc);
    }

    const newindex = index - 1;
    if (newindex < 0 || index === start) {
      return acc;
    }

    const lead = `${path}.${newindex}`;
    const newkey = prepend(lead, tail(parts)).join('.');
    return assoc(newkey, prop(key, fields), acc);
  }, {}, keys(fields));
}


function hasPaths(pos1: string, pos2: string, fields: Fields) {
  const keyz = keys(fields);
  const ok1 = compose(
    any(Boolean),
    map<string, boolean>((key) => key.indexOf(pos1) === 0),
  )(keyz);

  const ok2 = compose(
    any(Boolean),
    map<string, boolean>((key) => key.indexOf(pos2) === 0),
  )(keyz);

  return ok1 && ok2;
}

export function arraySwap(path: string, index1: number, index2: number) {
  return (fields: Fields): Fields => {
    const pos1 = `${path}.${index1}`;
    const pos2 = `${path}.${index2}`;

    if (!hasPaths(pos1, pos2, fields)) {
      return fields;
    }

    return reduce((acc, key) => {
      if (key.indexOf(pos1) === 0) {
        return assoc(replace(pos1, pos2, key), prop(key, fields), acc);
      }

      if (key.indexOf(pos2) === 0) {
        return assoc(replace(pos2, pos1, key), prop(key, fields), acc);
      }

      return assoc(key, prop(key, fields), acc);
    }, {}, keys(fields));
  };
}

export function arrayMove(path: string, index1: number, index2: number) {
  return (fields: Fields): Fields => {
    const pos1 = `${path}.${index1}`;
    const pos2 = `${path}.${index2}`;

    if (!hasPaths(pos1, pos2, fields)) {
      return fields;
    }

    return compose<Fields, Fields, Fields, Fields>(
      assoc(pos2, prop(pos1, fields)),
      arrayUnshift(path, index2),
      arrayShift(path, index1),
    )(fields);
  };
}

export function arrayCleanup(path: string) {
  return pickBy(compose(not, (_, key) => startsWith(path, key)));
}
