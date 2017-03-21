import getValue from '../getValue';

const preventDefault = (id: any) => id;
const stopPropagation = (id: any) => id;

const evValue: any = (value: any) => ({
  preventDefault,
  stopPropagation,
  target: {
    type: 'text',
    value,
  },
});

const evChecked: any = (checked: boolean) => ({
  preventDefault,
  stopPropagation,
  target: {
    type: 'checkbox',
    checked,
  },
});

const evFiles: any = (files: string[]) => ({
  preventDefault,
  stopPropagation,
  target: {
    type: 'file',
    files,
  },
});

type Option = { selected: boolean, value: string };
const evSelect: any = (options: Option[]) => ({
  preventDefault,
  stopPropagation,
  target: {
    type: 'select-multiple',
    options,
  },
});

describe('#getValue', () => {
  it('should return value for non-event values', () => {
    expect(getValue(null)).toBeNull();
    expect(getValue('kek')).toBe('kek');
    expect(getValue(true)).toBe(true);
    expect(getValue(false)).toBe(false);
  });

  it('should return value for value', () => {
    expect(getValue(evValue(null))).toBeNull();
    expect(getValue(evValue(undefined))).toBeUndefined();
    expect(getValue(evValue(1337))).toBe(1337);
    expect(getValue(evValue('y u do dis'))).toBe('y u do dis');
  });

  it('should return checked for checkbox', () => {
    expect(getValue(evChecked(true))).toBe(true);
    expect(getValue(evChecked(false))).toBe(false);
  });

  it('should return files for files', () => {
    const files = ['lol', 'kek', 'bur'];
    expect(getValue(evFiles(files))).toEqual(files);
  });

  it('should return options for select-multiple', () => {
    const options = [
      { selected: false, value: 'lol' },
      { selected: true, value: 'kek' },
      { selected: false, value: 'bur' },
    ];
    expect(getValue(evSelect(options))).toEqual(['kek']);
    expect(getValue(evSelect([]))).toEqual([]);
  });
});
