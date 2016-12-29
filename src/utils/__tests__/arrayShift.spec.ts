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
  'rec.0.rec.0.rec.1': field,
  'rec.0.rec.0.rec.2': field,
  'rec.0.rec.0.rec.3': field,
};

describe('#arrayShift', () => {
  it('should shift flat array', () => {
    const res: any = arrayShift(fields, 'flat', 1);

    expect(res['flat.1']).toBeUndefined();

    expect(res['flat.0']).toBeDefined();
    expect(res['flat.2']).toBeDefined();
    expect(res['flat.3']).toBeDefined();
  });

  // TODO more tests
});
