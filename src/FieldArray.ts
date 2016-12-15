import * as React from 'react';

import { Context } from "./reduxForm";


interface ISuppliedProps {
  // TODO
}

interface IOwnProps {
  name: string;
  flat?: boolean;
  component: React.ComponentClass<ISuppliedProps> | React.SFC<ISuppliedProps>;
}

class FieldArray extends React.PureComponent<IOwnProps, void> implements React.ChildContextProvider<Context> {
  static contextTypes = {
    reduxForms: React.PropTypes.shape({
      form: React.PropTypes.string.isRequired,
      context: React.PropTypes.string.isRequired,
      flattened: React.PropTypes.bool.isRequired,
    }).isRequired,
  };

  static childContextTypes = {
    reduxForms: React.PropTypes.shape({
      form: React.PropTypes.string.isRequired,
      context: React.PropTypes.string.isRequired,
      flattened: React.PropTypes.bool.isRequired,
    }).isRequired,
  };

  getChildContext() {
    const { name, flat } = this.props;
    const { form, context } = this.context;

    return {
      reduxForms: {
        form,
        context: context ? `${context}.${name}` : context,
        flattened: Boolean(flat),
      },
    };
  }

  render() {
    const { component } = this.props;

    // React.SFC vs. React.ClassComponent collision
    return React.createElement(<any> component, this.props);
  }
}
