import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import * as invariant from 'invariant';

import * as actions from './actions';
import * as selectors from './selectors';
import { FormObj } from "./utils/containers";
import { isString, isPromise, isFunction } from "./utils/helpers";


export interface IFormProps {
  name: string;
  persistent?: boolean;
}

export type Context = {
  reduxFormLite: string;
};

export type StateProps = {
  _form: FormObj | null,
  _valid: boolean,
  _values: Object,
};

export type ActionProps = {
  _addForm: actions.AddFormCreator,
  _removeForm: actions.RemoveFormCreator,
  _touchAll: actions.TouchAllCreator,
  _submitStart: actions.SubmitStartCreator,
  _submitStop: actions.SubmitStopCreator,
};

export type Props = StateProps & ActionProps & IFormProps & {
  onSubmit?: (values: Object) => Promise<any> | void,
  withRef?: (el: React.ReactElement<any>) => void,
};


const PROPS_TO_OMIT = [
  'children',
  'withRef',
  '_form',
  '_valid',
  '_values',
  '_addForm',
  '_removeForm',
  '_touchAll',
  '_submitStart',
  '_submitStop',
];


class Form extends React.PureComponent<Props, void> implements React.ChildContextProvider<Context> {
  static displayName = 'ReduxForm';

  static childContextTypes = {
    reduxFormLite: React.PropTypes.string.isRequired,
  };

  constructor(props: Props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { name, _form, _addForm } = this.props;

    if (!_form) {
      _addForm(name);
    }
  }

  componentWillUnmount() {
    const { name, persistent } = this.props;

    if (!persistent) {
      this.props._removeForm(name);
    }
  }

  getChildContext() {
    const { name } = this.props;

    return {
      reduxFormLite: name,
    };
  }

  handleSubmit(ev: React.SyntheticEvent<HTMLFormElement>) {
    const { name, onSubmit, _valid, _values, _touchAll, _submitStart, _submitStop } = this.props;

    ev.preventDefault();

    _touchAll(name);
    if (!_valid || !isFunction(onSubmit)) {
      return;
    }

    const maybePromise = onSubmit(_values);
    if (isPromise(maybePromise)) {
      _submitStart(name);

      maybePromise.then(() => _submitStop(name));
    }
  }

  render() {
    const { children, withRef, _form, ...rest } = this.props;

    // Wait until form is initialized
    if (!_form) {
      return null;
    }

    const props = R.omit(PROPS_TO_OMIT, rest);

    return (
      <form onSubmit={this.handleSubmit} ref={withRef} {...props}>
        {children}
      </form>
    );
  }
}

const bindActions = {
  _addForm: actions.addForm,
  _removeForm: actions.removeForm,
  _touchAll: actions.touchAll,
  _submitStart: actions.submitStart,
  _submitStop: actions.submitStop,
};

export default connect<StateProps, ActionProps, IFormProps>((state, props: IFormProps) => ({
  _form: R.prop<FormObj>(props.name, state.reduxFormLite),
  _values: selectors.valueSelector(props.name, state),
  _valid: selectors.isValid(props.name, state),
}), bindActions)(Form);
