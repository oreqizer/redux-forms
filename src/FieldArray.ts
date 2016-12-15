import * as React from 'react';
import { connect } from '@types/react-redux';
import * as R from 'ramda';

import { Context } from './reduxForm';
import connectFieldArray, { ContextProps } from './utils/connectFieldArray';
import * as duck from './formsDuck';


export interface ISuppliedProps {
  // TODO
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

    this.handlePush = this.handlePush.bind(this);
    this.handlePop = this.handlePop.bind(this);
  }

  handlePush() {
    const { name, _push, _form, _arrayId } = this.props;

    // TODO solve array indexing
    _push(_form, _arrayId, `_arrayId[TODO]`);
  }

  handlePop() {

  }

  render() {
    const { component } = this.props;

    // React.SFC vs. React.ClassComponent collision
    return React.createElement(<any> component, this.props);
  }
}


type ConnectedProps = IOwnProps & ContextProps;

type StateProps = {
  _array: string[],
};

type ActionProps = {
  _push: duck.PushCreator,
  _pop: duck.PopCreator,
};

type AllProps = StateProps & ActionProps & ConnectedProps;


const actions = {
  _push: duck.push,
  _pop: duck.pop,
};

const Connected = connect<StateProps, ActionProps, ConnectedProps>((state, props: ConnectedProps) => ({
  _array: R.path<string[]>([props._form, 'fieldArrays', props._arrayId], state),
}), actions)(FieldArray);

const Contexted = connectFieldArray<IOwnProps>(Connected);

Contexted.displayName = FieldArray.displayName;

export default Contexted;
