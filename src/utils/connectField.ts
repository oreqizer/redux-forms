import * as React from 'react';
import * as R from 'ramda';

import { Context } from "../reduxForm";


export type NameProp = {
  name: string,
};

export type ContextProps = {
  _form: string,
  _id: string,
};


export default function connectField<T>(
    Wrapped: React.ComponentClass<T & NameProp & ContextProps>,
): React.SFC<T & NameProp> {
  const ConnectedField: React.SFC<T & NameProp> = (props: T & NameProp, { reduxForms }: Context) =>
      React.createElement(Wrapped, R.merge(props, {
        _form: reduxForms.form,
        _id: reduxForms.context ? `${reduxForms.context}.${props.name}` : props.name,
      }));

  ConnectedField.contextTypes = {
    reduxForms: React.PropTypes.shape({
      form: React.PropTypes.string.isRequired,
      context: React.PropTypes.string.isRequired,
    }).isRequired,
  };

  ConnectedField.displayName = Wrapped.displayName;

  return ConnectedField;
}
