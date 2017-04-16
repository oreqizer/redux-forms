/* eslint-disable react/prop-types */
import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import * as R from "ramda";

import reducer from 'redux-forms/lib/index';
import { form, field } from 'redux-forms/lib/containers';
import ConnectedForm from '../Form';


// NOTE:
// We're unwrapping 'Form' from 'connect'.
// Props needed mocking:
// state:
// _form: Form
// _values: Object
// _valid: boolean
// _submitting: boolean
// actions:
// _addForm: AddFormCreator
// _removeForm: RemoveFormCreator
// _touchAll: TouchAllCreator
// _submitStart: SubmitStartCreator
// _submitStop: SubmitStopCreator
const Form = (ConnectedForm as any).WrappedComponent;

const MyComp = () => (
  <div className="Component" />
);

// Any to allow nested property dot notation
const newStore = () => createStore(combineReducers<any>({
  reduxForms: reducer,
}), {
  reduxForms: { test: form },
});

const getForm = (state: any) => state.getState().reduxForms.test;

type Fn = Function;  // tslint:disable-line ban-types
const event = (pd: Fn) => ({
  preventDefault: pd,
});


describe('#Form', () => {
  it('should add a form', () => {
    const addForm = jest.fn();
    const wrapper = mount((
        <Form
          name="test"
          _form={false}
          _values={{}}
          _valid={false}
          _addForm={addForm}
          _removeForm={jest.fn()}
          _touchAll={jest.fn()}
          _submitStart={jest.fn()}
          _submitStop={jest.fn()}
        >
          <MyComp />
        </Form>
      ));

    expect(addForm).toBeCalledWith('test');
  });

  it('should not add a form if already present', () => {
    const addForm = jest.fn();
    const wrapper = mount((
      <Form
        name="test"
        _form={form}
        _values={{}}
        _valid={false}
        _addForm={addForm}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      >
        <MyComp />
      </Form>
    ));

    expect(addForm).not.toBeCalled();
  });

  it('should remove a form', () => {
    const removeForm = jest.fn();
    const wrapper = mount((
      <Form
        name="test"
        _form={false}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _removeForm={removeForm}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      >
        <MyComp />
      </Form>
    ));

    expect(removeForm).not.toBeCalled();

    wrapper.unmount();

    expect(removeForm).toBeCalledWith('test');
  });

  it('should not remove a form if persistent', () => {
    const removeForm = jest.fn();
    const wrapper = mount((
      <Form
        name="test"
        persistent
        _form={false}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _removeForm={removeForm}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      >
        <MyComp />
      </Form>
    ));

    expect(removeForm).not.toBeCalled();

    wrapper.unmount();

    expect(removeForm).not.toBeCalled();
  });

  it('should not render without form', () => {
    const wrapper = mount((
      <Form
        name="test"
        _form={false}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      >
        <MyComp />
      </Form>
    ));

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should not pass any private props', () => {
    const onSubmit = jest.fn();
    const wrapper = mount((
      <Form
        name="test"
        persistent
        onSubmit={onSubmit}
        withRef={jest.fn()}
        _form={form}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      >
        <MyComp />
      </Form>
    ));

    expect(wrapper.find('form').prop('onSubmit')).not.toBe(onSubmit);

    expect(wrapper.find('form').prop('name')).toBeUndefined();
    expect(wrapper.find('form').prop('persistent')).toBeUndefined();
    expect(wrapper.find('form').prop('withRef')).toBeUndefined();
    expect(wrapper.find('form').prop('_form')).toBeUndefined();
    expect(wrapper.find('form').prop('_values')).toBeUndefined();
    expect(wrapper.find('form').prop('_valid')).toBeUndefined();
    expect(wrapper.find('form').prop('_submitting')).toBeUndefined();
    expect(wrapper.find('form').prop('_addForm')).toBeUndefined();
    expect(wrapper.find('form').prop('_removeForm')).toBeUndefined();
    expect(wrapper.find('form').prop('_touchAll')).toBeUndefined();
    expect(wrapper.find('form').prop('_submitStart')).toBeUndefined();
    expect(wrapper.find('form').prop('_submitStop')).toBeUndefined();
  });

  it('should provide context', () => {
    const wrapper = mount((
      <Form
        name="test"
        _form={false}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      >
        <MyComp />
      </Form>
    ));

    expect((wrapper.instance() as any).getChildContext()).toEqual({
      reduxForms: 'test',
    });
  });

  it('should prevent default and touch all with onSubmit', () => {
    const pd = jest.fn();
    const touchAll = jest.fn();
    const wrapper = mount((
      <Form
        name="test"
        _form={form}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _touchAll={touchAll}
      >
        <MyComp />
      </Form>
    ));

    wrapper.find('form').simulate('submit', event(pd));

    expect(pd).toBeCalled();
    expect(touchAll).toBeCalled();
  });

  it('should not fire onSubmit if invalid', () => {
    const pd = jest.fn();
    const onSubmit = jest.fn();
    const wrapper = mount((
      <Form
        name="test"
        onSubmit={onSubmit}
        _form={form}
        _values={{}}
        _valid={false}
        _addForm={jest.fn()}
        _touchAll={jest.fn()}
      >
        <MyComp />
      </Form>
    ));

    wrapper.find('form').simulate('submit', event(pd));

    expect(pd).toBeCalled();
    expect(onSubmit).not.toBeCalled();
  });

  it('should not fire onSubmit if submitting', () => {
    const pd = jest.fn();
    const touchAll = jest.fn();
    const onSubmit = jest.fn();
    const wrapper = mount((
      <Form
        name="test"
        onSubmit={onSubmit}
        _form={true}
        _values={{}}
        _valid
        _submitting
        _addForm={jest.fn()}
        _touchAll={touchAll}
      >
        <MyComp />
      </Form>
    ));

    wrapper.find('form').simulate('submit', event(pd));

    expect(pd).toBeCalled();
    expect(touchAll).toBeCalled();
    expect(onSubmit).not.toBeCalled();
  });

  it('should fire onSubmit', () => {
    const touchAll = jest.fn();
    const onSubmit = jest.fn();
    const wrapper = mount((
      <Form
        name="testzz"
        onSubmit={onSubmit}
        _form={form}
        _values={{ test: 'yo' }}
        _valid
        _addForm={jest.fn()}
        _touchAll={touchAll}
      >
        <MyComp />
      </Form>
    ));

    wrapper.find('form').simulate('submit', event(jest.fn()));

    expect(touchAll).toBeCalled();
    expect(onSubmit).toBeCalledWith({ test: 'yo' });
  });

  it('should fire submit start and stop', () => {
    let cb: Fn = (id: any) => id;
    const then = (fn: Fn) => { cb = fn; };

    const pd = jest.fn();
    const onSubmit: any = () => ({ then });
    const submitStart = jest.fn();
    const submitStop = jest.fn();
    const wrapper = mount((
      <Form
        name="test"
        onSubmit={onSubmit}
        _form={form}
        _values={{}}
        _valid
        _addForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={submitStart}
        _submitStop={submitStop}
      >
        <MyComp />
      </Form>
    ));

    expect(submitStart).not.toBeCalled();

    wrapper.find('form').simulate('submit', event(pd));

    expect(pd).toBeCalled();
    expect(submitStart).toBeCalled();
    expect(submitStop).not.toBeCalled();

    cb();

    expect(submitStop).toBeCalled();
  });

  it('should fire ref callback on mount', () => {
    const withRef = jest.fn();
    const wrapper = mount((
      <Form
        name="test"
        withRef={withRef}
        _form={form}
        _values={{}}
        _addForm={jest.fn()}
        _removeForm={jest.fn()}
        _touchAll={jest.fn()}
        _submitStart={jest.fn()}
        _submitStop={jest.fn()}
      >
        <MyComp />
      </Form>
    ));

    expect(withRef).toBeCalled();
  });
});


describe('#connect(Form)', () => {
  it('should add a form', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <ConnectedForm name="test">
          <MyComp />
        </ConnectedForm>
      </Provider>
    ));

    expect(store.getState().reduxForms).toEqual({ test: form });
  });

  it('should remove a form', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <ConnectedForm name="test">
          <MyComp />
        </ConnectedForm>
      </Provider>
    ));

    wrapper.unmount();

    expect(store.getState().reduxForms).toEqual({});
  });

  it('should not remove a form if persistent', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <ConnectedForm name="test" persistent>
          <MyComp />
        </ConnectedForm>
      </Provider>
    ));

    wrapper.unmount();

    expect(store.getState().reduxForms).toEqual({ test: form });
  });
});
