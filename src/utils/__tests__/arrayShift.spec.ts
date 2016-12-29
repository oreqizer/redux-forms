import arrayShift from '../arrayShift';

import { field } from '../containers';

const fields = {
  'flat.0': field,
  'flat.1': field,
  'flat.2': field,
  'medium.0.nest.0': field,
  'medium.0.nest.1': field,
  'medium.0.nest.2': field,
  'medium.0.nest.3': field,
  'rec.0.rec.0.rec.0': field,
  'rec.0.rec.0.rec.1': field,
  'rec.0.rec.0.rec.2': field,
};

describe('#arrayShift', () => {
  it('should unshift', () => {
    const res = arrayShift(fields, 'flat', 1, false);

    expect(res['flat.2']).toBeUndefined();

    expect(res['flat.0']).toBeDefined();
    expect(res['flat.1']).toBeDefined();
  });

  it('should not unshift to negative', () => {
    const res = arrayShift(fields, 'flat', 0, false);

    expect(res['flat.-1']).toBeUndefined();

    expect(res['flat.0']).toBeDefined();
    expect(res['flat.1']).toBeDefined();
  });

  it('should shift flat array', () => {
    const res = arrayShift(fields, 'flat', 1);

    expect(res['flat.1']).toBeUndefined();

    expect(res['flat.0']).toBeDefined();
    expect(res['flat.2']).toBeDefined();
    expect(res['flat.3']).toBeDefined();
  });

  it('should unshift flat array', () => {
    const res = arrayShift(fields, 'flat', 1);

    expect(res['flat.1']).toBeUndefined();

    expect(res['flat.0']).toBeDefined();
    expect(res['flat.2']).toBeDefined();
    expect(res['flat.3']).toBeDefined();
  });

  it('should shift nested array', () => {
    const res = arrayShift(fields, 'medium.0.nest', 2);

    expect(res['medium.0.nest.2']).toBeUndefined();

    expect(res['medium.0.nest.0']).toBeDefined();
    expect(res['medium.0.nest.1']).toBeDefined();
    expect(res['medium.0.nest.3']).toBeDefined();
    expect(res['medium.0.nest.4']).toBeDefined();
  });

  it('should shift recursive array - head', () => {
    const res = arrayShift(fields, 'rec', 0);

    expect(res['rec.0.rec.0.rec.0']).toBeUndefined();
    expect(res['rec.0.rec.0.rec.1']).toBeUndefined();
    expect(res['rec.0.rec.0.rec.2']).toBeUndefined();

    expect(res['rec.1.rec.0.rec.0']).toBeDefined();
    expect(res['rec.1.rec.0.rec.1']).toBeDefined();
    expect(res['rec.1.rec.0.rec.2']).toBeDefined();
  });

  it('should shift recursive array - mid', () => {
    const res = arrayShift(fields, 'rec.0.rec', 0);

    expect(res['rec.0.rec.0.rec.0']).toBeUndefined();
    expect(res['rec.0.rec.0.rec.1']).toBeUndefined();
    expect(res['rec.0.rec.0.rec.2']).toBeUndefined();

    expect(res['rec.0.rec.1.rec.0']).toBeDefined();
    expect(res['rec.0.rec.1.rec.1']).toBeDefined();
    expect(res['rec.0.rec.1.rec.2']).toBeDefined();
  });

  it('should shift recursive array - last', () => {
    const res = arrayShift(fields, 'rec.0.rec.0.rec', 1);

    expect(res['rec.0.rec.0.rec.1']).toBeUndefined();

    expect(res['rec.0.rec.0.rec.0']).toBeDefined();
    expect(res['rec.0.rec.0.rec.2']).toBeDefined();
    expect(res['rec.0.rec.0.rec.3']).toBeDefined();
  });
});
