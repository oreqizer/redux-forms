import { Value, SynthEvent } from "../utils/getValue";


export interface IAllProps {
  value: Value;
  checked?: boolean;
}

export type InputProps = {
  value: Value,
  onChange: (ev: SynthEvent) => void,
  // TODO add remaining
};

export type MetaProps = {
  error: string | null,
  dirty: boolean,
  touched: boolean,
  visited: boolean,
  active: boolean,
};

export type SeparatedProps = {
  input: InputProps;
  meta: MetaProps;
  custom: Object;
};
