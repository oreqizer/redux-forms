import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { FormObj } from "./utils/containers";
import { isString, isPromise, isFunction } from "./utils/helpers";
import formProps from './utils/formProps';
import * as actions from './actions';
import * as selectors from './selectors';


export interface IFormProps extends React.HTMLProps<HTMLFormElement> {
  name: string;
  persistent?: boolean;
  onSubmit?: (values: Object) => Promise<any> | void;
  withRef?: (el: HTMLFormElement) => void;
}

export type StateProps = {
  _form: FormObj | null,
  _values: Object,
  _valid: boolean,
  _submitting: boolean,
};

export type ActionProps = {
  _addForm: actions.AddFormCreator,
  _removeForm: actions.RemoveFormCreator,
  _touchAll: actions.TouchAllCreator,
  _submitStart: actions.SubmitStartCreator,
  _submitStop: actions.SubmitStopCreator,
};

export type Props<T> = StateProps & ActionProps & IFormProps & T;

export type Context = {
  reduxFormLite: string;
};


class Form<T> extends React.PureComponent<Props<T>, void> implements React.ChildContextProvider<Context> {
  static childContextTypes = {
    reduxFormLite: React.PropTypes.string.isRequired,
  };

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    persistent: React.PropTypes.bool,
  };

  constructor(props: Props<T>) {
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
    const {
      name,
      onSubmit,
      _valid,
      _values,
      _touchAll,
      _submitting,
      _submitStart,
      _submitStop,
    } = this.props;

    ev.preventDefault();

    _touchAll(name);
    if (_submitting) {
      return;
    }

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
    const { children, withRef, _form } = this.props;

    // Wait until form is initialized
    if (!_form) {
      return null;
    }

    return React.createElement('form', formProps(R.merge(this.props, {
      children,
      ref: withRef,
      onSubmit: this.handleSubmit,
    })));
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
  _submitting: selectors.isSubmitting(props.name, state),
}), bindActions)(Form);
