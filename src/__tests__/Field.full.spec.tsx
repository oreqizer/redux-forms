/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import * as R from 'ramda';

import Field from '../Field';
import reducer from '../formsDuck';
import { form, field } from '../utils/containers';


const options = {
  context: {
    reduxFormLite: {
      form: 'test',
      context: '',
    },
  },
  childContextTypes: {
    reduxFormLite: React.PropTypes.object.isRequired,
  },
};

const event = { target: { value: 'doge' } };

// Any to allow nested property dot notation
const newStore = () => createStore(combineReducers<any>({
  reduxFormLite: reducer,
}), {
  reduxFormLite: { test: form },
});

const getForm = (state: any) => state.getState().reduxFormLite.test;


describe('#connect(Field)', () => {
  it('should not mount without context', () => {
    const store = newStore();
    const wrapperFn = () => mount(
      <Provider store={store}>
        <Field
          name="test"
          component="input"
        />
      </Provider>,
    );

    expect(wrapperFn).toThrowError(/decorated with "reduxForm"/);
  });

  it('should have a correct name', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Field
          name="test"
          component="input"
        />
      </Provider>,
      options,
    );

    expect(wrapper.find(Field).name()).toBe('Field');
  });

  it('should add a field', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Field
          name="test"
          component="input"
        />
      </Provider>,
      options,
    );

    expect(getForm(store).fields).toEqual({ test: field });
    expect(wrapper.find('input').length).toBe(1);
  });

  it('should remove a field', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Field
          name="test"
          component="input"
        />
      </Provider>,
      options,
    );

    wrapper.unmount();

    expect(getForm(store).fields).toEqual({});
  });

  it('should handle a change event', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Field
          name="test"
          component="input"
        />
      </Provider>,
      options,
    );

    wrapper.find('input').simulate('change', event);

    expect(getForm(store).fields).toEqual({ test: {
      ...field,
      value: 'doge',
      dirty: true,
    } });
  });

  it('should handle a focus event', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Field
          name="test"
          component="input"
        />
      </Provider>,
      options,
    );

    wrapper.find('input').simulate('focus');

    expect(getForm(store).fields).toEqual({ test: {
      ...field,
      visited: true,
      active: true,
    } });
  });

  it('should handle a blur event', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Field
          name="test"
          component="input"
        />
      </Provider>,
      options,
    );

    wrapper.find('input').simulate('blur', event);

    expect(getForm(store).fields).toEqual({ test: {
      ...field,
      touched: true,
      dirty: true,
    } });
  });
});
