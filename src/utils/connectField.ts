import * as React from 'react';
import * as R from 'ramda';
import * as invariant from 'invariant';

import { Context } from "../reduxForm";


export type NameProp = {
  name: string,
};

export type ContextProps = {
  _form: string,
  _id: string,
};

export type WrappedField<T> = React.ComponentClass<T & NameProp & ContextProps>;

export type Connected<T> = React.SFC<T & NameProp> & {
  WrappedComponent?: WrappedField<T>,
};


export default function connectField<T>(Wrapped: WrappedField<T>): Connected<T> {
  const ConnectedField: Connected<T> = (props: T & NameProp, { reduxFormLite }: Context) => {
    invariant(reduxFormLite, '[redux-form-lite] Fields must be in a component decorated with "reduxForm"');

    return React.createElement(Wrapped, R.merge(props, {
      _form: reduxFormLite.form,
      _id: reduxFormLite.context + props.name,
    }));
  };


  ConnectedField.contextTypes = {
    reduxFormLite: React.PropTypes.shape({
      form: React.PropTypes.string.isRequired,
      context: React.PropTypes.string.isRequired,
    }).isRequired,
  };

  ConnectedField.displayName = Wrapped.displayName;

  ConnectedField.WrappedComponent = Wrapped;

  return ConnectedField;
}
