import { Value } from "./shared/getValue";


export const form = {
  fields: {},
  arrays: {},
  submitting: false,
};

export const field = {
  value: '',
  error: null,
  visited: false,
  touched: false,
  active: false,
  dirty: false,
};


export type Form = {
  // key - value pairs of field id and the field object
  fields: { [key: string]: Field },
  // a map of array names and its lengths
  arrays: { [key: string]: number },
  submitting: boolean,
};

export type Field = {
  value: Value;
  visited: boolean;
  touched: boolean;
  active: boolean;
  error: string | null;
  dirty: boolean;
};
