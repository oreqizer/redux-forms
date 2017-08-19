/// <reference types="jest" />
import * as R from "ramda";

import fieldArrayProps from '../fieldArrayProps';


const props = {
  _form: null,
  _array: null,
  _addArray: null,
  _arrayPush: null,
  _arrayPop: null,
  _arrayUnshift: null,
  _arrayShift: null,
  _arrayInsert: null,
  _arrayRemove: null,
  _arraySwap: null,
  _arrayMove: null,
  lol: 'kek',
  fields: {},
};

describe('#fieldArrayProps', () => {
  it('should filter props', () => {
    const result: any = fieldArrayProps(props);

    expect(result).toEqual({ lol: 'kek', fields: {} });
  });
});
