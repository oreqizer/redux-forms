import * as R from 'ramda';

import { Field } from "./containers";


export type Fields = { [key: string]: Field };


export function arrayUnshift(path: string, start: number) {
  const toParts = R.compose(R.tail, R.split('.'), R.replace(path, ''));

  return (fields: Fields): Fields => R.reduce((acc, key) => {
    if (key.indexOf(path) !== 0) {
      return R.assoc(key, R.prop(key, fields), acc);
    }

    const parts = toParts(key);
    const index = Number(R.head(parts));

    if (Number.isNaN(index) || index < start) {
      return R.assoc(key, R.prop(key, fields), acc);
    }

    const lead = `${path}.${index + 1}`;
    const newkey = R.prepend(lead, R.tail(parts)).join('.');
    return R.assoc(newkey, R.prop(key, fields), acc);
  }, {}, R.keys(fields));
}

export function arrayShift(path: string, start: number) {
  const toParts = R.compose(R.tail, R.split('.'), R.replace(path, ''));

  return (fields: Fields): Fields => R.reduce((acc, key) => {
    if (key.indexOf(path) !== 0) {
      return R.assoc(key, R.prop(key, fields), acc);
    }

    const parts = toParts(key);
    const index = Number(R.head(parts));

    if (Number.isNaN(index) || index < start) {
      return R.assoc(key, R.prop(key, fields), acc);
    }

    const newindex = index - 1;
    if (newindex < 0 || index === start) {
      return acc;
    }

    const lead = `${path}.${newindex}`;
    const newkey = R.prepend(lead, R.tail(parts)).join('.');
    return R.assoc(newkey, R.prop(key, fields), acc);
  }, {}, R.keys(fields));
}


function hasPaths(pos1: string, pos2: string, fields: Fields) {
  const keys = R.keys(fields);
  const ok1 = R.compose(
    R.any(R.identity),
    R.map<string, boolean>((key) => key.indexOf(pos1) === 0),
  )(keys);

  const ok2 = R.compose(
    R.any(R.identity),
    R.map<string, boolean>((key) => key.indexOf(pos2) === 0),
  )(keys);

  return ok1 && ok2;
}

export function arraySwap(path: string, index1: number, index2: number) {
  return (fields: Fields): Fields => {
    const pos1 = `${path}.${index1}`;
    const pos2 = `${path}.${index2}`;

    if (!hasPaths(pos1, pos2, fields)) {
      return fields;
    }

    return R.reduce((acc, key) => {
      if (key.indexOf(pos1) === 0) {
        return R.assoc(R.replace(pos1, pos2, key), R.prop(key, fields), acc);
      }

      if (key.indexOf(pos2) === 0) {
        return R.assoc(R.replace(pos2, pos1, key), R.prop(key, fields), acc);
      }

      return R.assoc(key, R.prop(key, fields), acc);
    }, {}, R.keys(fields));
  };
}

export function arrayMove(path: string, index1: number, index2: number) {
  return (fields: Fields): Fields => {
    const pos1 = `${path}.${index1}`;
    const pos2 = `${path}.${index2}`;

    if (!hasPaths(pos1, pos2, fields)) {
      return fields;
    }

    return R.compose<Fields, Fields, Fields, Fields>(
      R.assoc(pos2, R.prop(pos1, fields)),
      arrayUnshift(path, index2),
      arrayShift(path, index1),
    )(fields);
  };
}
