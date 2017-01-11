import * as React from '../../.';
import { connect } from 'react-redux';
import { actions } from 'redux-forms';
import * as R from 'ramda';

import { Context } from './Form';
import connectField, { ContextProps } from './connectField';
import { Target } from '../../redux-forms/src/shared/getValue';
import fieldArrayProps, { FieldsProp } from '../../redux-forms/src/shared/fieldArrayProps';
import { isNumber, isEvent } from "../../redux-forms/src/shared/helpers";


export type SuppliedProps = {
  name?: string,
  fields: FieldsProp,
};

export type FieldArrayProps<T> = T & {
  name: string,
  component: React.ComponentClass<T & SuppliedProps> | React.SFC<T & SuppliedProps>,
  withRef?: (el: React.ReactElement<any>) => void,
};


const RindexMap = R.addIndex(R.map);

class FieldArray<T> extends React.PureComponent<Props<T>, void> {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    component: React.PropTypes.func.isRequired,
  };

  static displayName = 'FieldArray';

  constructor(props: Props<T>) {
    super(props);

    this.handleMap = this.handleMap.bind(this);
    this.handlePush = this.handlePush.bind(this);
    this.handlePop = this.handlePop.bind(this);
    this.handleUnshift = this.handleUnshift.bind(this);
    this.handleShift = this.handleShift.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSwap = this.handleSwap.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  componentWillMount() {
    const { _form, name, _array, _addArray } = this.props;

    if (!_array) {
      _addArray(_form, name);
    }
  }

  componentWillUnmount() {
    const { _form, name, _removeArray } = this.props;

    _removeArray(_form, name);
  }

  handleMap<T>(fn: (el: string, index: number) => T): T[] {
    const { name, _array } = this.props;

    const array = Array.from(Array(_array));
    return RindexMap(fn, RindexMap((_, i) => `${name}.${i}`, array));
  }

  handlePush(ev?: React.SyntheticEvent<Target>) {
    const { _form, name, _arrayPush } = this.props;

    if (isEvent(ev)) {
      ev.preventDefault();
    }

    _arrayPush(_form, name);
  }

  handlePop(ev?: React.SyntheticEvent<Target>) {
    const { _form, name, _array, _arrayPop } = this.props;

    if (isEvent(ev)) {
      ev.preventDefault();
    }

    if (_array > 0) {
      _arrayPop(_form, name);
    }
  }

  handleUnshift(ev?: React.SyntheticEvent<Target>) {
    const { _form, name, _arrayUnshift } = this.props;

    if (isEvent(ev)) {
      ev.preventDefault();
    }

    _arrayUnshift(_form, name);
  }

  handleShift(ev?: React.SyntheticEvent<Target>) {
    const { _form, name, _array, _arrayShift } = this.props;

    if (isEvent(ev)) {
      ev.preventDefault();
    }

    if (_array > 0) {
      _arrayShift(_form, name);
    }
  }

  handleInsert(index: number) {
    const { _form, name, _arrayInsert } = this.props;

    _arrayInsert(_form, name, index);
  }

  handleRemove(index: number) {
    const { _form, name, _arrayRemove } = this.props;

    _arrayRemove(_form, name, index);
  }

  handleSwap(index1: number, index2: number) {
    const { _form, name, _arraySwap } = this.props;

    _arraySwap(_form, name, index1, index2);
  }

  handleMove(from: number, to: number) {
    const { _form, name, _arrayMove } = this.props;

    _arrayMove(_form, name, from, to);
  }

  render() {
    const { component, withRef, _array } = this.props;

    if (!isNumber(_array)) {
      return null;
    }

    // React.SFC vs. React.ClassComponent collision
    return React.createElement(component as any, fieldArrayProps(R.merge(this.props, { ref: withRef }), {
      length: _array,
      map: this.handleMap,
      push: this.handlePush,
      pop: this.handlePop,
      unshift: this.handleUnshift,
      shift: this.handleShift,
      insert: this.handleInsert,
      remove: this.handleRemove,
      swap: this.handleSwap,
      move: this.handleMove,
    }));
  }
}


type ConnectedProps<T> = FieldArrayProps<T> & ContextProps;

type StateProps = {
  _array?: number,
};

type ActionProps = {
  _addArray: actions.AddArrayCreator,
  _removeArray: actions.RemoveArrayCreator,
  _arrayPush: actions.ArrayPushCreator,
  _arrayPop: actions.ArrayPopCreator,
  _arrayUnshift: actions.ArrayUnshiftCreator,
  _arrayShift: actions.ArrayShiftCreator,
  _arrayInsert: actions.ArrayInsertCreator,
  _arrayRemove: actions.ArrayRemoveCreator,
  _arraySwap: actions.ArraySwapCreator,
  _arrayMove: actions.ArrayMoveCreator,
};

type Props<T> = StateProps & ActionProps & ConnectedProps<T>;


const bindActions = {
  _addArray: actions.addArray,
  _removeArray: actions.removeArray,
  _arrayPush: actions.arrayPush,
  _arrayPop: actions.arrayPop,
  _arrayUnshift: actions.arrayUnshift,
  _arrayShift: actions.arrayShift,
  _arrayInsert: actions.arrayInsert,
  _arrayRemove: actions.arrayRemove,
  _arraySwap: actions.arraySwap,
  _arrayMove: actions.arrayMove,
};

const Connected = connect<StateProps, ActionProps, ConnectedProps<{}>>((state, props: ConnectedProps<{}>) => ({
  _array: R.path<number>([props._form, 'arrays', props.name], state.reduxFormLite),
}), bindActions)(FieldArray);

const Contexted = connectField(Connected);

Contexted.displayName = FieldArray.displayName;

export default Contexted;
