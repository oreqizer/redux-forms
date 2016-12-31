import fieldArrayProps from '../fieldArrayProps';


const fns = {
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
    const res = fieldArrayProps(props, fns);

    expect(res.fields.map).toEqual(fns.map);
    expect(res.fields.push).toEqual(fns.push);
    expect(res.fields.pop).toEqual(fns.pop);
    expect(res.fields.unshift).toEqual(fns.unshift);
    expect(res.fields.shift).toEqual(fns.shift);
  });

  it('should filter out ignored properties', () => {
    const res = fieldArrayProps(props, fns);

    expect(res).toEqual({
      fields: fns,
      damage: 'tons of',
      wow: 'so test',
    });
  });
});
