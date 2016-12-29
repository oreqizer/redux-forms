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
    const res = arrayShift('flat', 1, false)(fields);

    expect(res['flat.2']).toBeUndefined();

    expect(res['flat.0']).toBeDefined();
    expect(res['flat.1']).toBeDefined();
  });

  it('should not unshift to negative', () => {
    const res = arrayShift('flat', 0, false)(fields);

    expect(res['flat.-1']).toBeUndefined();

    expect(res['flat.0']).toBeDefined();
    expect(res['flat.1']).toBeDefined();
  });

  it('should shift flat array', () => {
    const res = arrayShift('flat', 1)(fields);

    expect(res['flat.1']).toBeUndefined();

    expect(res['flat.0']).toBeDefined();
    expect(res['flat.2']).toBeDefined();
    expect(res['flat.3']).toBeDefined();
  });

  it('should unshift flat array', () => {
    const res = arrayShift('flat', 1)(fields);

    expect(res['flat.1']).toBeUndefined();

    expect(res['flat.0']).toBeDefined();
    expect(res['flat.2']).toBeDefined();
    expect(res['flat.3']).toBeDefined();
  });

  it('should shift nested array', () => {
    const res = arrayShift('medium.0.nest', 2)(fields);

    expect(res['medium.0.nest.2']).toBeUndefined();

    expect(res['medium.0.nest.0']).toBeDefined();
    expect(res['medium.0.nest.1']).toBeDefined();
    expect(res['medium.0.nest.3']).toBeDefined();
    expect(res['medium.0.nest.4']).toBeDefined();
  });

  it('should shift recursive array - head', () => {
    const res = arrayShift('rec', 0)(fields);

    expect(res['rec.0.rec.0.rec.0']).toBeUndefined();
    expect(res['rec.0.rec.0.rec.1']).toBeUndefined();
    expect(res['rec.0.rec.0.rec.2']).toBeUndefined();

    expect(res['rec.1.rec.0.rec.0']).toBeDefined();
    expect(res['rec.1.rec.0.rec.1']).toBeDefined();
    expect(res['rec.1.rec.0.rec.2']).toBeDefined();
  });

  it('should shift recursive array - mid', () => {
    const res = arrayShift('rec.0.rec', 0)(fields);

    expect(res['rec.0.rec.0.rec.0']).toBeUndefined();
    expect(res['rec.0.rec.0.rec.1']).toBeUndefined();
    expect(res['rec.0.rec.0.rec.2']).toBeUndefined();

    expect(res['rec.0.rec.1.rec.0']).toBeDefined();
    expect(res['rec.0.rec.1.rec.1']).toBeDefined();
    expect(res['rec.0.rec.1.rec.2']).toBeDefined();
  });

  it('should shift recursive array - last', () => {
    const res = arrayShift('rec.0.rec.0.rec', 1)(fields);

    expect(res['rec.0.rec.0.rec.1']).toBeUndefined();

    expect(res['rec.0.rec.0.rec.0']).toBeDefined();
    expect(res['rec.0.rec.0.rec.2']).toBeDefined();
    expect(res['rec.0.rec.0.rec.3']).toBeDefined();
  });
});
