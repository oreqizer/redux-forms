import { Value } from "./getValue";


export const form = {
  fields: {},
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
  fields: { [key: string]: FieldObj },
};
