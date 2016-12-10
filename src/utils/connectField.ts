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

type WrappedField<T> = React.ComponentClass<T & NameProp & ContextProps>;

type Connected<T> = React.SFC<T & NameProp>;


export default function connectField<T>(Wrapped: WrappedField<T>): Connected<T> {
  const ConnectedField: Connected<T> = (props: T & NameProp, { reduxForms }: Context) => {
    invariant(reduxForms, '[redux-forms] Fields must be in a component decorated with "reduxForms"');

    return React.createElement(Wrapped, R.merge(props, {
      _form: reduxForms.form,
      _id: reduxForms.context ? `${reduxForms.context}.${props.name}` : props.name,
    }));
  };


  ConnectedField.contextTypes = {
    reduxForms: React.PropTypes.shape({
      form: React.PropTypes.string.isRequired,
      context: React.PropTypes.string.isRequired,
    }).isRequired,
  };

  ConnectedField.displayName = Wrapped.displayName;

  return ConnectedField;
}
