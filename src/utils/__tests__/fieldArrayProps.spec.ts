import fieldArrayProps from '../fieldArrayProps';


const fns = {
  map: (id: any) => id,
  push: () => null,
  pop: () => null,
};

const props = {
  // to omit
  // ---
  flat: true,
  component: 'input',
  _form: 'form',
  _arrayId: 'arrayId',
  _array: ['omfg[1]', 'omfg[2]'],
  _counter: 0,
  _push: (id: any) => id,
  _pop: (id: any) => id,

  // custom
  // ---
  damage: 'tons of',
  wow: 'so test',
};


describe('#fieldArrayProps', () => {
  it('should separate functions', () => {
    const res = fieldArrayProps<any, any>(props, fns);

    expect(res.fields.map).toEqual(fns.map);
    expect(res.fields.push).toEqual(fns.push);
    expect(res.fields.pop).toEqual(fns.pop);
  });

  it('should filter out ignored properties', () => {
    const res = fieldArrayProps<any, any>(props, fns);

    expect(res).toEqual({
      fields: fns,
      damage: 'tons of',
      wow: 'so test',
    });
  });
});
