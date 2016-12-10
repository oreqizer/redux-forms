import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as invariant from 'invariant';

import { Context } from "../reduxForm";


export interface IProps {
  name: string;
}

export type ContextProps = {
  _form: string,
  _context: string,
};


export default function contextWrap(
    Wrapped: React.ComponentClass<IProps>,
): React.ComponentClass<IProps> {
  class ContextWrap extends React.PureComponent<IProps, void> {
    static contextTypes = {
      mobxForms: React.PropTypes.shape({
        context: React.PropTypes.string.isRequired,
      }).isRequired,
    };

    context: Context;

    constructor(props: IProps) {
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
