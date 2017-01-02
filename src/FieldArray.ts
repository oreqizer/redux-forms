import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { Context } from './Form';
import * as actions from './actions';
import connectField, { ContextProps } from './utils/connectField';
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
    component: React.PropTypes.func.isRequired,
  };

  static displayName = 'FieldArray';

  constructor(props: AllProps) {
    super(props);

    this.handleMap = this.handleMap.bind(this);
    this.handlePush = this.handlePush.bind(this);
    this.handlePop = this.handlePop.bind(this);
    this.handleUnshift = this.handleUnshift.bind(this);
    this.handleShift = this.handleShift.bind(this);
  }

  componentWillMount() {
    const { _array, _addArray, _form, name } = this.props;

    if (!_array) {
      _addArray(_form, name);
    }
  }

  componentWillUnmount() {
    const { _removeArray, _form, name } = this.props;

    _removeArray(_form, name);
  }

  handleMap<T>(fn: (arr: string[]) => T) {
    const { name, _array } = this.props;

    const array = Array.from(Array(_array));
    return R.map(fn, R.addIndex(R.map)((_, i) => `${name}.${i}`, array));
  }

  handlePush() {
    const { name, _arrayPush, _form } = this.props;

    _arrayPush(_form, name);
  }

  handlePop() {
    const { name, _array, _arrayPop, _form } = this.props;

    if (_array > 0) {
      _arrayPop(_form, name);
    }
  }

  handleUnshift() {
    const { name, _arrayUnshift, _form } = this.props;

    _arrayUnshift(_form, name);
  }

  handleShift() {
    const { name, _array, _arrayShift, _form } = this.props;

    if (_array > 0) {
      _arrayShift(_form, name);
    }
  }

  render() {
    const { component, withRef, _array, ...rest } = this.props;

    if (typeof _array !== 'number') {
      return null;
    }

    // React.SFC vs. React.ClassComponent collision
    return React.createElement(<any> component, fieldArrayProps(R.merge(rest, { ref: withRef }), {
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
  _array: R.path<number>([props._form, 'arrays', props.name], state.reduxFormLite),
}), bindActions)(FieldArray);

const Contexted = connectField<IOwnProps>(Connected);

Contexted.displayName = FieldArray.displayName;

export default Contexted;
