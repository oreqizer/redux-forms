import * as React from 'react';
import * as R from 'ramda';
import * as invariant from 'invariant';

import { Context } from '../Form';
import { isString } from './helpers';


export type FormProps = {
  name: string,
  form?: string,
};

export type ContextProps = {
  form: string,
};

export type WrappedField<T> = React.ComponentClass<T & FormProps & ContextProps>;

export type Connected<T> = React.SFC<T & FormProps> & {
  WrappedComponent?: WrappedField<T>,
};


export default function connectField<T>(Wrapped: WrappedField<T>): Connected<T> {
  const ConnectedField: Connected<T> = (props: T & FormProps, { reduxFormLite }: Context) => {
    invariant(
      isString(reduxFormLite) || isString(props.form),
      `[redux-form-lite] Decorate your form with "reduxForm" or
      supply the "form" prop to Field and FieldArray yourself.`,
    );

    return React.createElement(Wrapped, R.merge(props, {
      form: props.form || reduxFormLite,
    }));
  };


  ConnectedField.contextTypes = {
    reduxFormLite: React.PropTypes.string.isRequired,
  };

  ConnectedField.displayName = Wrapped.displayName;

  ConnectedField.WrappedComponent = Wrapped;

  return ConnectedField;
}
