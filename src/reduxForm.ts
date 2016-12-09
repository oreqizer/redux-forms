import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as invariant from 'invariant';

import FormStore from './containers/FormStore';
import FormsStore from './FormsStore';


export type Options = {
  form: string;
}

export type Context = {
  reduxForms: {
    context: string;
  };
}

export type WrappedComponent<T> = React.ComponentClass<T> | React.SFC<T>;

type StateProps = {
  reduxForms: Object,
}

type DispatchProps = {}

type Props<T> = StateProps & DispatchProps & T;


const getName = (Wrapped: WrappedComponent<any>): string =>
  Wrapped.displayName || Wrapped.name || 'Component';

const reduxForm = <T>({ form }: Options) => {
  invariant(
      form && typeof form === 'string',
      '[mobx-forms] "form" is a required string on the "mobxForm" decorator.'
  );

  return (Wrapped: WrappedComponent<Props<T>>): React.ComponentClass<T> => {
    class ReduxForm extends React.Component<Props<T>, void> implements React.ChildContextProvider<Context> {
      static displayName = `ReduxForm(${getName(Wrapped)})`;

      getChildContext() {
        return {
          reduxForms: {
            context: form,
          },
        };
      }

      render() {
        // <any>Wrapped here because, for whatever reason, it doesn't compute
        return React.createElement(<any>Wrapped, this.props);
      }
    }

    return connect<StateProps, DispatchProps, T>(state => ({
      reduxForms: state.reduxForms,
    }))(ReduxForm);
  };
};

export default reduxForm;
