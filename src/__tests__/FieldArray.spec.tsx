/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import * as R from 'ramda';

import ConnectedFieldArray from '../FieldArray';


// NOTE:
// We're unwrapping 'FieldArray' from 'connect' and 'connectFieldArray'.
// Props needed mocking:
// - _form: string
// - _arrayId: string
// state:
// - _array: string[]
// actions:
// - _addArray: AddArrayCreator
// - _removeArray: RemoveArrayCreator
// - _push: PushCreator
// - _pop: PopCreator
const FieldArray = (ConnectedFieldArray as any).WrappedComponent.WrappedComponent;

const Component = (props: any) => (
  <div className="Component" />
);


describe('#FieldArray', () => {
  it('should have a correct name', () => {
    const wrapper = mount(
      <FieldArray
        name="array"
        component={Component}
        _addArray={jest.fn()}
      />,
    );

    expect(wrapper.name()).toBe('FieldArray');
  });

  it('should not add an array', () => {
    const addArray = jest.fn();
    const wrapper = mount(
      <FieldArray
        name="array"
        component={Component}
        _array={1}
        _addArray={addArray}
      />,
    );

    expect(addArray).not.toBeCalled();
  });

  it('should add an array', () => {
    const addArray = jest.fn();
    const wrapper = mount(
      <FieldArray
        name="array"
        component={Component}
        _form="form"
        _arrayId="arrayId"
        _addArray={addArray}
      />,
    );

    expect(addArray).toBeCalledWith('form', 'arrayId');
  });

  it('should remove an array', () => {
    const removeArray = jest.fn();
    const wrapper = mount(
      <FieldArray
        name="array"
        component={Component}
        _form="form"
        _arrayId="arrayId"
        _addArray={jest.fn()}
        _removeArray={removeArray}
      />,
    );

    wrapper.unmount();

    expect(removeArray).toBeCalledWith('form', 'arrayId');
  });

  it('should handle map', () => {
    const wrapper = shallow(
      <FieldArray
        name="array"
        component={Component}
        _array={2}
        _addArray={jest.fn()}
      />,
    );

    expect(wrapper.prop('fields').map(R.identity)).toEqual(['0', '1']);
  });

  it('should handle push', () => {
    const push = jest.fn();
    const wrapper = shallow(
      <FieldArray
        name="array"
        component={Component}
        _form="form"
        _arrayId="arrayId"
        _array={1}
        _addArray={jest.fn()}
        _push={push}
      />,
    );

    wrapper.prop('fields').push();

    expect(push).toBeCalledWith('form', 'arrayId');
  });

  it('should handle pop', () => {
    const pop = jest.fn();
    const wrapper = shallow(
      <FieldArray
        name="array"
        component={Component}
        _form="form"
        _arrayId="arrayId"
        _array={1}
        _addArray={jest.fn()}
        _pop={pop}
      />,
    );

    wrapper.prop('fields').pop();

    expect(pop).toBeCalledWith('form', 'arrayId');
  });

  it('should not render without an array', () => {
    const wrapper = mount(
      <FieldArray
        name="array"
        component={Component}
        _addArray={jest.fn()}
      />,
    );

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should render a component', () => {
    const wrapper = mount(
      <FieldArray
        name="array"
        component={Component}
        _array={1}
        _addArray={jest.fn()}
      />,
    );

    expect(wrapper.find('.Component').length).toBe(1);
  });

  it('should pass custom props', () => {
    const wrapper = shallow(
      <FieldArray
        name="array"
        component={Component}
        doge="wow"
        _array={1}
        _addArray={jest.fn()}
      />,
    );

    expect(wrapper.prop('doge')).toBe('wow');
  });
});
