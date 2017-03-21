import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { isString, isPromise, isFunction, shallowCompare } from 'redux-forms/lib/shared/helpers';
import formProps, { toUpdate } from 'redux-forms/lib/shared/formProps';
import * as containers from 'redux-forms/lib/containers';
import * as actions from 'redux-forms/actions';
import * as selectors from 'redux-forms/selectors';


// FIXME don't use 'values: any'. TS doesn't understand I have my own onSubmit
export interface IFormProps extends React.HTMLProps<HTMLFormElement> {
  name: string;
  persistent?: boolean;
  onSubmit?: (values: any) => Promise<any> | void;
  withRef?: (el: HTMLFormElement) => void;
}

export type Context = {
  reduxForms: string;
};


class Form<T> extends React.Component<Props<T>, void> implements React.ChildContextProvider<Context> {
  static childContextTypes = {
    reduxForms: React.PropTypes.string.isRequired,
  };

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    persistent: React.PropTypes.bool,
  };

  static displayName = 'Form';

  props: Props<T>;

  constructor(props: Props<T>) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps: Props<T>) {
    return !shallowCompare(toUpdate(this.props), toUpdate(nextProps));
  }

  componentWillMount() {
    const { name, _form, _addForm } = this.props;

    if (!_form) {
      _addForm(name);
    }
  }

  componentWillUnmount() {
    const { name, persistent, _removeForm } = this.props;

    if (!persistent) {
      _removeForm(name);
    }
  }

  getChildContext() {
    const { name } = this.props;

    return {
      reduxForms: name,
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
      ref: withRef,
      onSubmit: this.handleSubmit,
    })), children);
  }
}


export type StateProps = {
  _form: boolean,
  _values: any,
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


const bindActions = {
  _addForm: actions.addForm,
  _removeForm: actions.removeForm,
  _touchAll: actions.touchAll,
  _submitStart: actions.submitStart,
  _submitStop: actions.submitStop,
};

const Connected = connect<StateProps, ActionProps, IFormProps>((state, props: IFormProps) => ({
  _form: Boolean(R.prop<containers.Form>(props.name, state.reduxForms)),
  _values: selectors.valueSelector(props.name, state),
  _valid: selectors.isValid(props.name, state),
  _submitting: selectors.isSubmitting(props.name, state),
}), bindActions)(Form);

Connected.displayName = Form.displayName;

export default Connected;
