import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { Context } from './reduxForm';
import * as actions from './actions';
import connectFieldArray, { ContextProps } from './utils/connectFieldArray';
import fieldArrayProps, { FieldProps } from './utils/fieldArrayProps';


export interface ISuppliedProps {
  name: string;
  fields: FieldProps;
}

export interface IOwnProps {
  name: string;
  component: React.ComponentClass<ISuppliedProps> | React.SFC<ISuppliedProps>;
  withRef?: (el: React.ReactElement<any>) => void;
}


class FieldArray extends React.PureComponent<AllProps, void> {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    component: React.PropTypes.oneOfType([
      React.PropTypes.string, React.PropTypes.func,
    ]).isRequired,
  };

  static displayName = 'FieldArray';

  constructor(props: AllProps) {
    super(props);

    this.handleRef = this.handleRef.bind(this);
    this.handleMap = this.handleMap.bind(this);
    this.handlePush = this.handlePush.bind(this);
    this.handlePop = this.handlePop.bind(this);
    this.handleUnshift = this.handleUnshift.bind(this);
    this.handleShift = this.handleShift.bind(this);
  }

  componentWillMount() {
    const { _array, _addArray, _form, _arrayId } = this.props;

    if (!_array) {
      _addArray(_form, _arrayId);
    }
  }

  componentWillUnmount() {
    const { _removeArray, _form, _arrayId } = this.props;

    _removeArray(_form, _arrayId);
  }

  handleRef(el: React.ReactElement<any>) {
    const { withRef } = this.props;

    if (typeof withRef === 'function') {
      withRef(el);
    }
  }

  handleMap<T>(fn: (arr: string[]) => T) {
    const { _array } = this.props;

    const array = Array.from(Array(_array));
    return R.map(fn, R.addIndex(R.map)((_, i) => `.${i}`, array));
  }

  handlePush() {
    const { name, _arrayPush, _form, _arrayId } = this.props;

    _arrayPush(_form, _arrayId);
  }

  handlePop() {
    const { name, _array, _arrayPop, _form, _arrayId } = this.props;

    if (_array > 0) {
      _arrayPop(_form, _arrayId);
    }
  }

  handleUnshift() {
    const { name, _arrayUnshift, _form, _arrayId } = this.props;

    _arrayUnshift(_form, _arrayId);
  }

  handleShift() {
    const { name, _array, _arrayShift, _form, _arrayId } = this.props;

    if (_array > 0) {
      _arrayShift(_form, _arrayId);
    }
  }

  render() {
    const { component, withRef, _array, ...rest } = this.props;

    if (typeof _array !== 'number') {
      return null;
    }

    const maybeRef = withRef ? { ref: this.handleRef } : {};

    // React.SFC vs. React.ClassComponent collision
    return React.createElement(<any> component, fieldArrayProps(R.merge(rest, maybeRef), {
      length: _array,
      map: this.handleMap,
      push: this.handlePush,
      pop: this.handlePop,
      unshift: this.handleUnshift,
      shift: this.handleShift,
    }));
  }
}


type ConnectedProps = IOwnProps & ContextProps;

type StateProps = {
  _array?: number,
};

type ActionProps = {
  _addArray: actions.AddArrayCreator,
  _removeArray: actions.RemoveArrayCreator,
  _arrayPush: actions.PushCreator,
  _arrayPop: actions.PopCreator,
  _arrayUnshift: actions.UnshiftCreator,
  _arrayShift: actions.ShiftCreator,
};

type AllProps = StateProps & ActionProps & ConnectedProps;


const bindActions = {
  _addArray: actions.addArray,
  _removeArray: actions.removeArray,
  _arrayPush: actions.arrayPush,
  _arrayPop: actions.arrayPop,
  _arrayUnshift: actions.arrayUnshift,
  _arrayShift: actions.arrayShift,
};

const Connected = connect<StateProps, ActionProps, ConnectedProps>((state, props: ConnectedProps) => ({
  _array: R.path<number>([props._form, 'arrays', props._arrayId], state.reduxFormLite),
}), bindActions)(FieldArray);

const Contexted = connectFieldArray<IOwnProps>(Connected);

Contexted.displayName = FieldArray.displayName;

export default Contexted;
