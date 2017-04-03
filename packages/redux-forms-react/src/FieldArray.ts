import * as React from 'react';
import { connect } from 'react-redux';
import {
  addIndex,
  map,
  path,
} from 'ramda';

import { Target } from 'redux-forms/lib/shared/getValue';
import { isNumber, isEvent } from "redux-forms/lib/shared/helpers";
import * as actions from 'redux-forms/actions';
import { Context } from './Form';
import connectField, { ContextProps } from './connectField';


export type FieldsProp = {
  length: number,
  map: (fn: (el: string, index: number) => any) => any[],
  push: () => void,
  pop: () => void,
  unshift: () => void,
  shift: () => void,
  insert: (index: number) => void,
  remove: (index: number) => void,
  swap: (index1: number, index2: number) => void,
  move: (from: number, to: number) => void,
};

export type SuppliedProps = {
  name?: string,
  fields: FieldsProp,
};

export type FieldArrayProps = {
  name: string,
  children?: React.ReactElement<any>,  // TODO find out how to specify children
};


const RindexMap = addIndex(map);

class FieldArray extends React.PureComponent<Props, void> {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
  };

  static displayName = 'FieldArray';

  props: Props;

  constructor(props: Props) {
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
    const { children, _array } = this.props;

    if (!children || !isNumber(_array)) {
      return null;
    }

    return React.cloneElement(children, {
      fields: {
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
      },
    });
  }
}


type ConnectedProps = FieldArrayProps & ContextProps;

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

type Props = StateProps & ActionProps & ConnectedProps;


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

const Connected = connect<StateProps, ActionProps, ConnectedProps>((state: any, props: ConnectedProps) => ({
  _array: path<number>([props._form, 'arrays', props.name], state.reduxForms),
}), bindActions)(FieldArray);

const Contexted = connectField(Connected);

Contexted.displayName = FieldArray.displayName;

export default Contexted;
