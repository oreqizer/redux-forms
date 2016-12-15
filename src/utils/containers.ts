import { Value } from "./getValue";


export const form = {
  fields: {},
  fieldArrays: {},
};

export const field = {
  value: '',
  error: null,
  visited: false,
  touched: false,
  active: false,
  dirty: false,
};


export type FieldObj = {
  value: Value;
  visited: boolean;
  touched: boolean;
  active: boolean;
  error: string | null;
  dirty: boolean;
};

export type FormObj = {
  // key - value pairs of field id and the field object
  fields: { [key: string]: FieldObj },
  // array of field ids that belong to given array
  fieldArrays: { [key: string]: string[] },
};
