export const INPUT_PROPS = [
  'autocomplete',
  'checked',
  'height',
  'name',
  'pattern',
  'placeholder',
  'readonly',
  'required',
  'size',
  'selected',
  'spellCheck',
  'step',
  'type',
  'value',
  'width',
  'onChange',
  'onFocus',
  'onBlur',
];

export const META_PROPS = [
  'active',
  'dirty',
  'error',
  'touched',
  'visited',
];

export const IGNORE_PROPS = [
  ...INPUT_PROPS,
  ...META_PROPS,
  'component',
  'defaultValue',
  'index',
  'normalize',
  'validate',
  // state
  '_field',
  // actions
  '_addField',
  '_removeField',
  '_fieldChange',
  '_fieldFocus',
  '_fieldBlur',
  // context
  '_form',
  '_id',
];

export const ARRAY_IGNORE_PROPS = [
  'flat',
  'component',
  // state
  '_array',
  // actions
  '_push',
  '_pop',
  // context
  '_form',
  '_arrayId',
];
