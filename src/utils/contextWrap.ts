import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as invariant from 'invariant';

import { Context } from "../reduxForm";


export type NameProps = {
  name: string,
};

export type ContextProps = {
  _form: string,
  _context: string,
};


export default function contextWrap<T>(
    Wrapped: React.ComponentClass<T & NameProps & ContextProps>,
): React.ComponentClass<T & NameProps> {
  class ContextWrap extends React.PureComponent<T & NameProps, void> {
    static contextTypes = {
      mobxForms: React.PropTypes.shape({
        context: React.PropTypes.string.isRequired,
      }).isRequired,
    };

    context: Context;

    constructor(props: T & NameProps) {
      super(props);

      invariant(
          this.context.reduxForms,
          '[redux-forms] Field must be in a component decorated with "reduxForm"',
      );
    }

    render() {
      const { name } = this.props;
      const { form, context } = this.context.reduxForms;

      return React.createElement(Wrapped, R.merge(this.props, {
        _form: form,
        _context: `${context}.${name}`,
      }));
    }
  }

  return ContextWrap;
}
