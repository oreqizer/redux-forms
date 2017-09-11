import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addIndex,
  map,
  path,
  repeat,
  merge,
} from 'ramda';

import { IReduxFormsState } from 'redux-forms/lib/index';
import fieldArrayProps from 'redux-forms/lib/shared/fieldArrayProps';
import { Target } from 'redux-forms/lib/shared/getValue';
import { isNumber, isEvent } from "redux-forms/lib/shared/helpers";
import * as actions from 'redux-forms/actions';
import { Context } from './Form';
import connectField, { FormProp } from './connectField';


export type SuppliedProps = {
  fields: {
    length: number,
    map: <T>(fn: (el: string, index: number) => T) => T[],
    push: () => void,
    pop: () => void,
    unshift: () => void,
    shift: () => void,
    insert: (index: number) => void,
    remove: (index: number) => void,
    swap: (index1: number, index2: number) => void,
    move: (from: number, to: number) => void,
  },
};

export type FieldArrayProps = {
  name: string,
};

type ConnectedProps = FieldArrayProps & FormProp;

type StateProps = {
  _array?: number,
};

type ActionProps = {
  _addArray: typeof actions.addArray,
  _arrayPush: typeof actions.arrayPush,
  _arrayPop: typeof actions.arrayPop,
  _arrayUnshift: typeof actions.arrayUnshift,
  _arrayShift: typeof actions.arrayShift,
  _arrayInsert: typeof actions.arrayInsert,
  _arrayRemove: typeof actions.arrayRemove,
  _arraySwap: typeof actions.arraySwap,
  _arrayMove: typeof actions.arrayMove,
};

type Props<T> = T & StateProps & ActionProps & ConnectedProps;


const RindexMap = addIndex(map);

function fieldArray<T>(Component: React.ComponentType<T & SuppliedProps>): React.ComponentType<T & FieldArrayProps> {
  class FieldArray extends React.PureComponent {
    static propTypes = {
      name: PropTypes.string.isRequired,
    };

    props: Props<T>;

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

    handleMap<U>(fn: (el: string, index: number) => U): U[] {
      const { name, _array } = this.props;

      const array = repeat(null, _array);
      return RindexMap(fn, RindexMap((_, i) => `${name}.${i}`, array));
    }

    handlePush() {
      const { _form, name, _arrayPush } = this.props;

      _arrayPush(_form, name);
    }

    handlePop() {
      const { _form, name, _array, _arrayPop } = this.props;

      if (isNumber(_array) && _array > 0) {
        _arrayPop(_form, name);
      }
    }

    handleUnshift() {
      const { _form, name, _arrayUnshift } = this.props;

      _arrayUnshift(_form, name);
    }

    handleShift() {
      const { _form, name, _array, _arrayShift } = this.props;

      if (isNumber(_array) && _array > 0) {
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
      const { _array } = this.props;

      if (!isNumber(_array)) {
        return null;
      }

      // TODO SFC not compatibile with class... wtf TS
      return React.createElement(Component as any, merge(fieldArrayProps(this.props), {
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
      }));
    }
  }


  const connector = connect<StateProps, ActionProps, ConnectedProps & T>(
    (state: IReduxFormsState, props: ConnectedProps & T) => ({
      _array: path<number>([props._form, 'arrays', props.name], state.reduxForms),
    }),
    {
      _addArray: actions.addArray,
      _arrayPush: actions.arrayPush,
      _arrayPop: actions.arrayPop,
      _arrayUnshift: actions.arrayUnshift,
      _arrayShift: actions.arrayShift,
      _arrayInsert: actions.arrayInsert,
      _arrayRemove: actions.arrayRemove,
      _arraySwap: actions.arraySwap,
      _arrayMove: actions.arrayMove,
    },
  );

  // TODO SFC not compatibile with class... wtf TS
  const Connected = connector(FieldArray as any);

  const Contexted = connectField(Connected);

  Contexted.displayName = `fieldArray(${Component.displayName || 'Component'})`;

  return Contexted;
}

export default fieldArray;
