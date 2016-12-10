import * as React from 'react';
import * as R from 'ramda';

import { Context } from "../reduxForm";


export interface INameProp {
  name: string;
}

export type ContextProps = {
  _form: string,
  _id: string,
};

export type Field<T> = React.ComponentClass<T>;


export default function connectField<T>(Wrapped: Field<T & INameProp>): React.SFC<T & INameProp> {
  const ConnectedField: React.SFC<T & INameProp> = (props: T & INameProp, { reduxForms }: Context) =>
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
