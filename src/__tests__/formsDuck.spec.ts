import reducer, * as duck from '../formsDuck';

describe('#formsDuck', () => {
  it('should create an ADD_FIELD action', () => {
    expect(duck.addField('field')).toEqual({
      type: duck.ADD_FIELD,
      payload: { id: 'field' },
    });
  });

  it('should create an ADD_FIELD action', () => {
    expect(duck.removeField('field')).toEqual({
      type: duck.REMOVE_FIELD,
      payload: { id: 'field' },
    });
  });

  it('should return initial state', () => {
    const state = reducer(undefined, <any> {});

    expect(state).toEqual(duck.initialState);
  });

  it('should add a field', () => {
    const state = reducer(duck.initialState, duck.addField('field'));

    expect(state).toEqual({
      fields: { field: duck.field },
    });
  });

  it('should remove a field', () => {
    const state = reducer({
      fields: { field: duck.field },
    }, duck.removeField('field'));

    expect(state).toEqual(duck.initialState);
  });
});
