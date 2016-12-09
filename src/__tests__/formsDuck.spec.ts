import reducer, * as duck from '../formsDuck';

describe('#formsDuck', () => {
  // Action creators
  // ---

  it('should create an ADD_FORM action', () => {
    expect(duck.addForm('form')).toEqual({
      type: duck.ADD_FORM,
      payload: { name: 'form' },
    });
  });

  it('should create a REMOVE_FORM action', () => {
    expect(duck.removeForm('form')).toEqual({
      type: duck.REMOVE_FORM,
      payload: { name: 'form' },
    });
  });

  it('should create an ADD_FIELD action', () => {
    expect(duck.addField('form', 'field')).toEqual({
      type: duck.ADD_FIELD,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should create a REMOVE_FIELD action', () => {
    expect(duck.removeField('form', 'field')).toEqual({
      type: duck.REMOVE_FIELD,
      payload: { form: 'form', id: 'field' },
    });
  });

  it('should return initial state', () => {
    const state = reducer(undefined, <any> {});

    expect(state).toEqual(duck.initialState);
  });

  // Reducer
  // ---

  it('should add a form', () => {
    const state = reducer({
      forms: {},
    }, duck.addForm('form'));

    expect(state).toEqual({
      forms: { form: {} },
    });
  });

  it('should remove a form', () => {
    const state = reducer({
      forms: { form: {} },
    }, duck.removeForm('form'));

    expect(state).toEqual({
      forms: {},
    });
  });

  it('should add a field', () => {
    const state = reducer({
      forms: { form: {} },
    }, duck.addField('form', 'field'));

    expect(state).toEqual({
      forms: { form: { field: duck.field } },
    });
  });

  it('should remove a field', () => {
    const state = reducer({
      forms: { form: { field: duck.field } },
    }, duck.removeField('form', 'field'));

    expect(state).toEqual({
      forms: { form: {} },
    });
  });
});
