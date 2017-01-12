import * as React from 'react';
import * as R from 'ramda';

import { invariant, isString } from 'redux-forms/lib/shared/helpers';
import { Context } from './Form';


export type FormProps = {
  name: string,
};

export type ContextProps = {
  _form: string,
};

export type WrappedField<T> = React.ComponentClass<T & FormProps & ContextProps>;

export type Connected<T> = React.SFC<T & FormProps> & {
  WrappedComponent?: WrappedField<T>,
};


export default function connectField<T>(Wrapped: WrappedField<T>): Connected<T> {
  const ConnectedField: Connected<T> = (props: T & FormProps, { reduxForms }: Context) => {
    invariant(
      isString(reduxForms),
      '[redux-forms] Field and FieldArray must be a children of the Form component.',
    );

    return React.createElement(Wrapped, R.merge(props, {
      _form: reduxForms,
    }));
  };


  ConnectedField.contextTypes = {
    reduxForms: React.PropTypes.string.isRequired,
  };

  ConnectedField.displayName = Wrapped.displayName;

  ConnectedField.WrappedComponent = Wrapped;

  return ConnectedField;
}
