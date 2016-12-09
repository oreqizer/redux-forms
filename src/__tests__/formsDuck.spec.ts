import reducer, * as actions from '../formsDuck';

describe('#formsDuck', () => {
  it('should create an ADD_FIELD action', () => {
    expect(actions.addField('field')).toEqual({
      type: actions.ADD_FIELD,
      payload: { name: 'field' },
    });
  });

  it('should create an ADD_FIELD action', () => {
    expect(actions.removeField('field')).toEqual({
      type: actions.REMOVE_FIELD,
      payload: { name: 'field' },
    });
  });
});
