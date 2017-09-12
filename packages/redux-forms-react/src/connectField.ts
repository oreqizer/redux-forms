import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  merge,
} from 'ramda';

import { invariant, isString } from 'redux-forms/lib/shared/helpers';
import { Context } from './Form';


export type SuppliedProps = {
  _form: string,
};

export type InputProps = {
  form?: string,
};

export type WrappedField<T> = React.ComponentClass<T & SuppliedProps>;

export type Connected<T> = React.SFC<T> & {
  WrappedComponent?: React.ComponentClass<T>,
};


export default function connectField<T>(
  Wrapped: React.ComponentClass<T & SuppliedProps>,
): Connected<T & InputProps> {
  const ConnectedField: Connected<T & InputProps> = (props: T & InputProps, { reduxForms }: Context) => {
    const contextForm = isString(reduxForms) ? reduxForms : null;
    const form = isString(props.form) ? props.form : contextForm;
    invariant(
      isString(form),
      '[redux-forms] "field(...)" and "fieldArray(...)" must be a child of the Form ' +
        'component or an explicit "form" prop must be supplied.',
    );

    return React.createElement(Wrapped, merge(props, {
      _form: (form as string),
    }));
  };


  ConnectedField.contextTypes = {
    reduxForms: PropTypes.string,
  };

  ConnectedField.displayName = Wrapped.displayName;

  ConnectedField.WrappedComponent = Wrapped;

  return ConnectedField;
}
