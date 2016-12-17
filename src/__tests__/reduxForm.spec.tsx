/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { mount } from 'enzyme';

import reduxForm from '../reduxForm';
import { form } from '../utils/containers';


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


describe('#reduxForm', () => {
  it('should require name to be passed', () => {
    const badOpts: any = {};

    expect(() => reduxForm(badOpts)).toThrowError(/is a required string/);
  });

  it('should require form to be a string', () => {
    const badOpts: any = { form: 123 };

    expect(() => reduxForm(badOpts)).toThrowError(/is a required string/);
  });

  it('should have a correct name', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    expect(Decorated.displayName).toBe('ReduxForm');
  });

  it('should provide original component static reference', () => {
    const Expected = reduxForm({ form: 'test' })(MyComp).WrappedComponent;

    expect(Expected).toBe(MyComp);
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

  it('should not add a form if already present', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const addForm = jest.fn();
    const wrapper = mount(
      <Decorated
        _form={form}
        _addForm={addForm}
        _removeForm={jest.fn()}
      />,
    );

    expect(addForm).not.toBeCalled();
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

  it('should not render without form', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const wrapper = mount(
      <Decorated
        _form={null}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
      />,
    );

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should not pass any private props', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const wrapper = mount(
      <Decorated
        _form={form}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
      />,
    );

    expect(wrapper.find(MyComp).props()).toEqual({});
  });

  it('should provide context', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp).WrappedForm;

    const wrapper = mount(
      <Decorated
        _form={form}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
      />,
    );

    expect((wrapper.instance() as any).getChildContext()).toEqual({
      reduxForms: {
        form: 'test',
        context: '',
      },
    });
  });
});
