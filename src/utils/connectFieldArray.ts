import * as React from 'react';
import * as R from 'ramda';
import * as invariant from 'invariant';

import { Context } from "../reduxForm";


export type NameProps = {
  name: string,
};

export type ContextProps = {
  _form: string,
  _arrayId: string,
};

export type WrappedField<T> = React.ComponentClass<T & NameProps & ContextProps>;

export type Connected<T> = React.ComponentClass<T & NameProps> & {
  WrappedComponent?: WrappedField<T>,
};


export default function connectFieldArray<T>(Wrapped: WrappedField<T>): Connected<T> {
  class ConnectedFieldArray
  extends React.PureComponent<T & NameProps, void>
  implements React.ChildContextProvider<Context> {
    static contextTypes = {
      reduxForms: React.PropTypes.shape({
        form: React.PropTypes.string.isRequired,
        context: React.PropTypes.string.isRequired,
      }).isRequired,
    };

    static childContextTypes = {
      reduxForms: React.PropTypes.shape({
        form: React.PropTypes.string.isRequired,
        context: React.PropTypes.string.isRequired,
      }).isRequired,
    };

    static displayName = Wrapped.displayName;

    static WrappedComponent = Wrapped;

    constructor(props: T & NameProps, context: Context) {
      super(props);

      invariant(
        context.reduxForms,
        '[redux-forms] Fields must be in a component decorated with "reduxForm"',
      );
    }

    getChildContext() {
      const { name } = this.props;
      const { form, context } = this.context.reduxForms;

      return {
        reduxForms: {
          form,
          context: context + name,
        },
      };
    }

    render() {
      const { name } = this.props;
      const { context, form } = this.context.reduxForms;

      return React.createElement(Wrapped, R.merge(this.props, {
        _form: form,
        _arrayId: context + name,
      }));
    }
  }

  return ConnectedFieldArray;
}
