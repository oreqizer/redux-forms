import * as R from 'ramda';

import { FieldObj } from "./containers";


export type Fields = { [key: string]: FieldObj };


export function arrayShift(path: string, start: number, plus: boolean = true) {
  const modifier = plus ? 1 : -1;

  return (fields: Fields): Fields => R.reduce((acc, key) => {
    if (key.indexOf(path) !== 0) {
      return R.assoc(key, R.prop(key, fields), acc);
    }

    const parts = R.compose(R.tail, R.split('.'), R.replace(path, ''))(key);
    const index = Number(R.head(parts));

    if (Number.isNaN(index) || index < start) {
      return R.assoc(key, R.prop(key, fields), acc);
    }

    const newindex = index + modifier;
    if (newindex < 0 || (!plus && index === start)) {
      return acc;
    }

    const lead = `${path}.${newindex}`;
    const newkey = R.prepend(lead, R.tail(parts)).join('.');
    return R.assoc(newkey, R.prop(key, fields), acc);
  }, {}, R.keys(fields));
}

export function arraySwap(pos1: string, pos2: string) {
  return (fields: Fields): Fields => {
    const ok1 = R.compose(
      R.any(R.identity),
      R.map<string, boolean>((key) => key.indexOf(pos1) === 0),
      R.keys,
    )(fields);

    const ok2 = R.compose(
      R.any(R.identity),
      R.map<string, boolean>((key) => key.indexOf(pos2) === 0),
      R.keys,
    )(fields);

    if (!ok1 || !ok2) {
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
