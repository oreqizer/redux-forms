/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import reduxForm from '../reduxForm';
import reducer from '../formsDuck';
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

// Any to allow nested property dot notation
const newStore = () => createStore(combineReducers<any>({
  reduxForms: reducer,
}), {
  reduxForms: { test: form },
});

const getForm = (state: any) => state.getState().reduxForms.test;


describe('#connect(reduxForm)', () => {
  it('should error out without opitons', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    expect(store.getState().reduxForms).toEqual({ test: form });
  });

  it('should add a form', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    expect(store.getState().reduxForms).toEqual({ test: form });
  });

  it('should remove a form', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    wrapper.unmount();

    expect(store.getState().reduxForms).toEqual({});
  });

  it('should supply a form prop', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    expect(wrapper.find(Decorated.WrappedForm).prop('_form')).toEqual(form);
  });
});