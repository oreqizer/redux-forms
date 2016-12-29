import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { Context } from './reduxForm';
import * as actions from './actions';
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

    const array = Array.from(Array(_array));
    return R.map(fn, R.addIndex(R.map)((_, i) => String(i), array));
  }

  handlePush() {
    const { name, _push, _form, _arrayId } = this.props;

    _push(_form, _arrayId);
  }

  handlePop() {
    const { name, _pop, _form, _arrayId } = this.props;

    _pop(_form, _arrayId);
  }

  render() {
    const { component, _array } = this.props;

    if (typeof _array !== 'number') {
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
  _array?: number,
};

type ActionProps = {
  _addArray: actions.AddArrayCreator,
  _removeArray: actions.RemoveArrayCreator,
  _push: actions.PushCreator,
  _pop: actions.PopCreator,
};

type AllProps = StateProps & ActionProps & ConnectedProps;


const bindActions = {
  _addArray: actions.addArray,
  _removeArray: actions.removeArray,
  _push: actions.push,
  _pop: actions.pop,
};

const Connected = connect<StateProps, ActionProps, ConnectedProps>((state, props: ConnectedProps) => ({
  _array: R.path<number>([props._form, 'arrays', props._arrayId], state.reduxFormLite),
}), bindActions)(FieldArray);

const Contexted = connectFieldArray<IOwnProps>(Connected);

Contexted.displayName = FieldArray.displayName;

export default Contexted;
