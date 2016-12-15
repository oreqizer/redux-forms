import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { Context } from './reduxForm';
import * as duck from './formsDuck';
import connectFieldArray, { ContextProps } from './utils/connectFieldArray';
import fieldArrayProps, { FunctionProps } from './utils/fieldArrayProps';


export interface ISuppliedProps {
  name: string;
  fields: FunctionProps;
}

export interface IOwnProps {
  name: string;
  flat?: boolean;
  component: React.ComponentClass<ISuppliedProps> | React.SFC<ISuppliedProps>;
}


class FieldArray extends React.PureComponent<AllProps, void> {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    flat: React.PropTypes.bool,
    component: React.PropTypes.oneOfType([
      React.PropTypes.string, React.PropTypes.func,
    ]).isRequired,
  };

  static displayName = 'FieldArray';

  constructor(props: AllProps) {
    super(props);

    this.handleMap = this.handleMap.bind(this);
    this.handlePush = this.handlePush.bind(this);
    this.handlePop = this.handlePop.bind(this);
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

  handleMap<T>(fn: (arr: string[]) => T) {
    const { _array } = this.props;

    return R.map(fn, (<string[]> _array));
  }

  handlePush() {
    const { name, _counter, _push, _form, _arrayId } = this.props;

    _push(_form, _arrayId, `${_arrayId}[${_counter}]`);
  }

  handlePop() {
    const { name, _pop, _form, _arrayId } = this.props;

    _pop(_form, _arrayId);
  }

  render() {
    const { component, _array } = this.props;

    if (!_array) {
      return null;
    }

    // React.SFC vs. React.ClassComponent collision
    return React.createElement(<any> component, fieldArrayProps(this.props, {
      map: this.handleMap,
      push: this.handlePush,
      pop: this.handlePop,
    }));
  }
}


type ConnectedProps = IOwnProps & ContextProps;

type StateProps = {
  _array?: string[],
  _counter?: number,
};

type ActionProps = {
  _addArray: duck.AddArrayCreator,
  _removeArray: duck.RemoveArrayCreator,
  _push: duck.PushCreator,
  _pop: duck.PopCreator,
};

type AllProps = StateProps & ActionProps & ConnectedProps;


const actions = {
  _addArray: duck.addArray,
  _removeArray: duck.removeArray,
  _push: duck.push,
  _pop: duck.pop,
};

const Connected = connect<StateProps, ActionProps, ConnectedProps>((state, props: ConnectedProps) => ({
  _array: R.path<string[]>([props._form, 'arrays', props._arrayId], state),
  _counter: R.path<number>([props._form, 'counters', props._arrayId], state),
}), actions)(FieldArray);

const Contexted = connectFieldArray<IOwnProps>(Connected);

Contexted.displayName = FieldArray.displayName;

export default Contexted;
