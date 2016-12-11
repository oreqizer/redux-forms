/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { mount } from 'enzyme';

import reduxForm from '../reduxForm';


// NOTE:
// When un-connecting ReduxForm from the decorator, mock the necessary props.
// state:
// _form: Form
// actions:
// _addForm: AddFormCreator
// _removeForm: RemoveFormCreator

const MyComp = () => (
  <div className="Component" />
);

const formMock = { fields: {} };


describe('#reduxForm', () => {
  it('should require name to be passed', () => {
    const badOpts: any = {};

    expect(() => reduxForm(badOpts)).toThrowError(/is a required string/);
  });

  it('should provide original component static reference', () => {
    const Expected = reduxForm({ form: 'test',  })(MyComp).WrappedComponent;

    expect(Expected).toBe(MyComp);
  });

  it('should mount an unnamed component', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const addForm = jest.fn();
    const decorated = mount(
      <Decorated
        _form={null}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
      />,
    );

    expect(decorated.name()).toBe('ReduxForm(Component)');
  });

  it('should name a component with a name', () => {
    const Dummy: any = () => <MyComp />;

    Dummy.displayName = 'Dummy';

    const Decorated = reduxForm({ form: 'test' })(Dummy).WrappedForm;

    const decorated = mount(
      <Decorated
        _form={null}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
      />,
    );

    expect(decorated.name()).toBe('ReduxForm(Dummy)');
  });

  it('should add a form', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const addForm = jest.fn();
    const wrapper = mount(
      <Decorated
        _form={null}
        _addForm={addForm}
        _removeForm={jest.fn()}
      />,
    );

    expect(addForm).toBeCalledWith('test');
  });

  it('should remove a form', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const removeForm = jest.fn();
    const wrapper = mount(
      <Decorated
        _form={null}
        _addForm={jest.fn()}
        _removeForm={removeForm}
      />,
    );

    expect(removeForm).not.toBeCalled();

    wrapper.unmount();

    expect(removeForm).toBeCalledWith('test');
  });

  it('should not add a form if already present', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const addForm = jest.fn();
    const wrapper = mount(
      <Decorated
        _form={formMock}
        _addForm={addForm}
        _removeForm={jest.fn()}
      />,
    );

    expect(addForm).not.toBeCalled();
  });

  it('should not remove a form if persistent', () => {
    const Decorated = reduxForm({ form: 'test', persistent: true })(MyComp).WrappedForm;

    const removeForm = jest.fn();
    const wrapper = mount(
      <Decorated
        _form={null}
        _addForm={jest.fn()}
        _removeForm={removeForm}
      />,
    );

    expect(removeForm).not.toBeCalled();

    wrapper.unmount();

    expect(removeForm).not.toBeCalled();
  });

  it('should not pass any private props', () => {
    const Decorated = reduxForm({ form: 'test', persistent: true })(MyComp).WrappedForm;

    const wrapper = mount(
      <Decorated
        _form={null}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
      />,
    );

    expect(wrapper.find(MyComp).props()).toEqual({});
  });
});
