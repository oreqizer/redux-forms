import { Value, SynthEvent } from "../utils/getValue";

export type InputProps = {
  value: Value,
  onChange: (ev: SynthEvent) => void,
};

export type MetaProps = {
  error: string | null,
  dirty: boolean,
  touched: boolean,
  visited: boolean,
  active: boolean,
};
