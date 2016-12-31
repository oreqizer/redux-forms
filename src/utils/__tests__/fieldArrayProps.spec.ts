import fieldArrayProps from '../fieldArrayProps';


const fields = {
  length: 2,
  map: (id: any) => id,
  push: () => null,
  pop: () => null,
  unshift: () => null,
  shift: () => null,
};

const props = {
  // to omit
  // ---
  component: 'input',
  _form: 'form',
  _arrayId: 'arrayId',
  _array: 1,
  _addArray: (id: any) => id,
  _removeArray: (id: any) => id,
  _push: (id: any) => id,
  _pop: (id: any) => id,
  _unshift: (id: any) => id,
  _shift: (id: any) => id,

  // custom
  // ---
  damage: 'tons of',
  wow: 'so test',
};


describe('#fieldArrayProps', () => {
  it('should separate functions', () => {
    const res = fieldArrayProps(props, fields);

    expect(res.fields.length).toBe(2);
    expect(res.fields.map).toEqual(fields.map);
    expect(res.fields.push).toEqual(fields.push);
    expect(res.fields.pop).toEqual(fields.pop);
    expect(res.fields.unshift).toEqual(fields.unshift);
    expect(res.fields.shift).toEqual(fields.shift);
  });

  it('should filter out ignored properties', () => {
    const res = fieldArrayProps(props, fields);

    expect(res).toEqual({
      fields,
      damage: 'tons of',
      wow: 'so test',
    });
  });
});
