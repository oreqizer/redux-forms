import { arrayShift, arraySwap } from '../arrays';

import { field } from '../containers';


const field0 = { ...field, value: '0' };
const field1 = { ...field, value: '1' };
const field2 = { ...field, value: '2' };
const field3 = { ...field, value: '3' };

const fields = {
  'flat.0': field0,
  'flat.1': field1,
  'flat.2': field2,
  'medium.0.nest.0': field0,
  'medium.0.nest.1': field1,
  'medium.0.nest.2': field2,
  'medium.0.nest.3': field3,
  'medium.1.nest.0': field3,
  'medium.1.nest.1': field2,
  'medium.1.nest.2': field1,
  'medium.1.nest.3': field0,
  'rec.0.rec.0.rec.0': field0,
  'rec.0.rec.0.rec.1': field1,
  'rec.0.rec.0.rec.2': field2,
};


describe('#arrays', () => {
  it('should not shift to negative index', () => {
    const res = arrayShift('flat', 0, false)(fields);

    expect(res['flat.-1']).toBeUndefined();

    expect(res['flat.0']).toBe(field1);
    expect(res['flat.1']).toBe(field2);
  });

  it('should shift flat array', () => {
    const res = arrayShift('flat', 1)(fields);

    expect(res['flat.1']).toBeUndefined();

    expect(res['flat.0']).toBe(field0);
    expect(res['flat.2']).toBe(field1);
    expect(res['flat.3']).toBe(field2);
  });

  it('should shift flat array - negative', () => {
    const res = arrayShift('flat', 1, false)(fields);

    expect(res['flat.2']).toBeUndefined();

    expect(res['flat.0']).toBe(field0);
    expect(res['flat.1']).toBe(field2);
  });

  it('should shift nested array', () => {
    const res = arrayShift('medium.0.nest', 2)(fields);

    expect(res['medium.0.nest.2']).toBeUndefined();

    expect(res['medium.0.nest.0']).toBe(field0);
    expect(res['medium.0.nest.1']).toBe(field1);
    expect(res['medium.0.nest.3']).toBe(field2);
    expect(res['medium.0.nest.4']).toBe(field3);
  });

  it('should shift nested array - negative', () => {
    const res = arrayShift('medium.0.nest', 2, false)(fields);

    expect(res['medium.0.nest.3']).toBeUndefined();

    expect(res['medium.0.nest.0']).toBe(field0);
    expect(res['medium.0.nest.1']).toBe(field1);
    expect(res['medium.0.nest.2']).toBe(field3);
  });

  it('should shift recursive array - head', () => {
    const res = arrayShift('rec', 0)(fields);

    expect(res['rec.0.rec.0.rec.0']).toBeUndefined();
    expect(res['rec.0.rec.0.rec.1']).toBeUndefined();
    expect(res['rec.0.rec.0.rec.2']).toBeUndefined();

    expect(res['rec.1.rec.0.rec.0']).toBe(field0);
    expect(res['rec.1.rec.0.rec.1']).toBe(field1);
    expect(res['rec.1.rec.0.rec.2']).toBe(field2);
  });

  it('should shift recursive array - mid', () => {
    const res = arrayShift('rec.0.rec', 0)(fields);

    expect(res['rec.0.rec.0.rec.0']).toBeUndefined();
    expect(res['rec.0.rec.0.rec.1']).toBeUndefined();
    expect(res['rec.0.rec.0.rec.2']).toBeUndefined();

    expect(res['rec.0.rec.1.rec.0']).toBe(field0);
    expect(res['rec.0.rec.1.rec.1']).toBe(field1);
    expect(res['rec.0.rec.1.rec.2']).toBe(field2);
  });

  it('should shift recursive array - last', () => {
    const res = arrayShift('rec.0.rec.0.rec', 1)(fields);

    expect(res['rec.0.rec.0.rec.1']).toBeUndefined();

    expect(res['rec.0.rec.0.rec.0']).toBe(field0);
    expect(res['rec.0.rec.0.rec.2']).toBe(field1);
    expect(res['rec.0.rec.0.rec.3']).toBe(field2);
  });

  it('should swap two fields', () => {
    const res = arraySwap('medium.0.nest.1', 'medium.0.nest.3')(fields);

    expect(res).toEqual({
      ...fields,
      'medium.0.nest.1': field3,
      'medium.0.nest.3': field1,
    });
  });

  it('should swap not swap nonexistent fields', () => {
    const res = arraySwap('medium.0.nest.1', 'medium.0.nest.8')(fields);

    expect(res).toBe(fields);
  });

  it('should swap nested fields', () => {
    const res = arraySwap('medium.0', 'medium.1')(fields);

    expect(res['medium.0.nest.0']).toBe(fields['medium.1.nest.0']);
    expect(res['medium.0.nest.1']).toBe(fields['medium.1.nest.1']);
    expect(res['medium.0.nest.2']).toBe(fields['medium.1.nest.2']);
    expect(res['medium.0.nest.3']).toBe(fields['medium.1.nest.3']);

    expect(res['medium.1.nest.0']).toBe(fields['medium.0.nest.0']);
    expect(res['medium.1.nest.1']).toBe(fields['medium.0.nest.1']);
    expect(res['medium.1.nest.2']).toBe(fields['medium.0.nest.2']);
    expect(res['medium.1.nest.3']).toBe(fields['medium.0.nest.3']);
  });
});
