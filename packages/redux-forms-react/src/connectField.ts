import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  merge,
} from 'ramda';

import { invariant, isString } from 'redux-forms/lib/shared/helpers';
import { Context } from './Form';


export type FormProp = {
  _form: string,
};

export type WrappedField<T> = React.ComponentClass<T & FormProp>;

export type Connected<T> = React.SFC<T> & {
  WrappedComponent?: React.ComponentClass<T>,
};


// TODO add option to supply from prop
export default function connectField<T>(Wrapped: React.ComponentClass<T & FormProp>): Connected<T> {
  const ConnectedField: Connected<T> = (props: T, { reduxForms }: Context) => {
    invariant(
      isString(reduxForms),
      '[redux-forms] \'field(...)\' and \'fieldArray(...)\' must be a child of the Form component.',
    );

    return React.createElement(Wrapped, merge(props, {
      _form: reduxForms,
    }));
  };


  ConnectedField.contextTypes = {
    reduxForms: PropTypes.string.isRequired,
  };

  ConnectedField.displayName = Wrapped.displayName;

  ConnectedField.WrappedComponent = Wrapped;

  return ConnectedField;
}
