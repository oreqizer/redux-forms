/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import reduxForm from '../reduxForm';
import reducer from '../formsReducer';
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
  reduxFormLite: reducer,
}), {
  reduxFormLite: { test: form },
});

const getForm = (state: any) => state.getState().reduxFormLite.test;


describe('#connect(reduxForm)', () => {
  it('should error out without opitons', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    expect(store.getState().reduxFormLite).toEqual({ test: form });
  });

  it('should mount an unnamed component', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    expect(wrapper.find(Decorated).name()).toBe('ReduxForm(Component)');
  });

  it('should name a component with a name', () => {
    const Dummy: any = () => <MyComp />;

    Dummy.displayName = 'Dummy';

    const Decorated = reduxForm({ form: 'test' })(Dummy);

    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    expect(wrapper.find(Decorated).name()).toBe('ReduxForm(Dummy)');
  });

  it('should add a form', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    expect(store.getState().reduxFormLite).toEqual({ test: form });
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

    expect(store.getState().reduxFormLite).toEqual({});
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
