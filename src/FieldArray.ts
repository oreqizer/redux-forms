import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { Context } from './reduxForm';
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
    const { _array, _addArray, form, name } = this.props;

    if (!_array) {
      _addArray(form, name);
    }
  }

  componentWillUnmount() {
    const { _removeArray, form, name } = this.props;

    _removeArray(form, name);
  }

  handleMap<T>(fn: (arr: string[]) => T) {
    const { name, _array } = this.props;

    const array = Array.from(Array(_array));
    return R.map(fn, R.addIndex(R.map)((_, i) => `${name}.${i}`, array));
  }

  handlePush() {
    const { name, _arrayPush, form } = this.props;

    _arrayPush(form, name);
  }

  handlePop() {
    const { name, _array, _arrayPop, form } = this.props;

    if (_array > 0) {
      _arrayPop(form, name);
    }
  }

  handleUnshift() {
    const { name, _arrayUnshift, form } = this.props;

    _arrayUnshift(form, name);
  }

  handleShift() {
    const { name, _array, _arrayShift, form } = this.props;

    if (_array > 0) {
      _arrayShift(form, name);
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
  _array: R.path<number>([props.form, 'arrays', props.name], state.reduxFormLite),
}), bindActions)(FieldArray);

const Contexted = connectField<IOwnProps>(Connected);

Contexted.displayName = FieldArray.displayName;

export default Contexted;
