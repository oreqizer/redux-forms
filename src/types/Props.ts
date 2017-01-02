import { Value, Target } from "../utils/getValue";


export interface IAllProps {
  value: Value;
  checked?: boolean;
}

export type InputProps = {
  name: string,
  value: Value,
  onChange: (ev: React.SyntheticEvent<Target>) => void,
  onFocus: (ev: React.SyntheticEvent<Target>) => void,
  onBlur: (ev: React.SyntheticEvent<Target>) => void,
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
