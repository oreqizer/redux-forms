import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  identity,
  merge,
  prop,
} from 'ramda';

import { isString, isPromise, isFunction, shallowCompare } from 'redux-forms/lib/shared/helpers';
import formProps, { toUpdate } from 'redux-forms/lib/shared/formProps';
import * as containers from 'redux-forms/lib/containers';
import * as actions from 'redux-forms/actions';
import * as selectors from 'redux-forms/selectors';


// FIXME don't use 'values: any'. TS doesn't understand I have my own onSubmit
export interface IFormProps extends React.HTMLProps<HTMLFormElement> {
  name: string;
  persistent?: boolean;
  onSubmit?: (values: any) => Promise<any> | null | undefined;
  withRef?: (el: HTMLFormElement) => void;
}

export type Context = {
  reduxForms: string;
};


class Form extends React.Component<Props, {}> implements React.ChildContextProvider<Context> {
  static defaultProps = {
    persistent: false,
    onSubmit: () => null,
    withRef: () => null,
    // state
    _form: false,
    _values: {},
    _valid: false,
    _submitting: false,
    // actions
    _addForm: identity,
    _removeForm: identity,
    _touchAll: identity,
    _submitStart: identity,
    _submitStop: identity,
  };

  static childContextTypes = {
    reduxForms: PropTypes.string.isRequired,
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    // TODO this shouldn't be required, but TS bitches about things
    persistent: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    withRef: PropTypes.func.isRequired,
  };

  static displayName = 'Form';

  props: Props;

  constructor(props: Props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps: Props) {
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

    return React.createElement('form', formProps(merge(this.props, {
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
  _addForm: typeof actions.addForm,
  _removeForm: typeof actions.removeForm,
  _touchAll: typeof actions.touchAll,
  _submitStart: typeof actions.submitStart,
  _submitStop: typeof actions.submitStop,
};

export type Props = StateProps & ActionProps & IFormProps;


const bindActions = {
  _addForm: actions.addForm,
  _removeForm: actions.removeForm,
  _touchAll: actions.touchAll,
  _submitStart: actions.submitStart,
  _submitStop: actions.submitStop,
};

const Connected = connect<StateProps, ActionProps, IFormProps>((state, props: IFormProps) => ({
  _form: Boolean(prop<containers.Form>(props.name, state.reduxForms)),
  _values: selectors.getValues(props.name, state),
  _valid: selectors.isValid(props.name, state),
  _submitting: selectors.isSubmitting(props.name, state),
}), bindActions)(Form as any);

Connected.displayName = Form.displayName;

export default Connected;
