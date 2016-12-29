import * as R from 'ramda';

import { FieldObj } from "./containers";


export type Fields = { [key: string]: FieldObj };


export default function arrayShift(fields: Fields, path: string, start: number, plus: boolean = true): Fields {
  const modifier = plus ? 1 : -1;

  return R.reduce((acc, key) => {
    if (key.indexOf(path) !== 0) {
      return R.assoc(key, R.prop(key, fields), acc);
    }

    const parts = R.compose(R.tail, R.split('.'))(key.replace(path, ''));
    const index = Number(R.head(parts));

    if (Number.isNaN(index) || index < start) {
      return R.assoc(key, R.prop(key, fields), acc);
    }

    const lead = `${path}.${index + modifier}`;
    const newkey = R.append(lead, R.tail(parts)).join('.');
    return R.assoc(newkey, R.prop(key, fields), acc);
  }, {}, R.keys(fields));
}
