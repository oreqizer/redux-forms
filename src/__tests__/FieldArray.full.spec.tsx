/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import * as R from 'ramda';

import FieldArray from '../FieldArray';
import reducer from '../formsDuck';
import { form, field } from '../utils/containers';


const options = {
  context: {
    reduxForms: {
      form: 'test',
      context: '',
      flattened: false,
    },
  },
  childContextTypes: {
    reduxForms: React.PropTypes.object.isRequired,
  },
};

const event = { target: { value: 'doge' } };

const MyComp = () => (
  <div className="MyComp" />
);

// Any to allow nested property dot notation
const newStore = () => createStore(combineReducers<any>({
  reduxForms: reducer,
}), {
  reduxForms: { test: form },
});

const getForm = (state: any) => state.getState().reduxForms.test;


describe('#connect(FieldArray)', () => {
  it('should not mount without context', () => {
    const store = newStore();
    const wrapperFn = () => mount(
      <Provider store={store}>
        <FieldArray
          name="test"
          component={MyComp}
        />
      </Provider>,
    );

    expect(wrapperFn).toThrowError(/decorated with "reduxForm"/);
  });

  it('should have a correct name', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <FieldArray
          name="test"
          component={MyComp}
        />
      </Provider>,
      options,
    );

    expect(wrapper.find(FieldArray).name()).toBe('FieldArray');
  });

  it('should add an array', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <FieldArray
          name="test"
          component={MyComp}
        />
      </Provider>,
      options,
    );

    expect(getForm(store).arrays).toEqual({ test: [] });
    expect(getForm(store).counters).toEqual({ test: 0 });
  });

  it('should remove an array', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <FieldArray
          name="test"
          component={MyComp}
        />
      </Provider>,
      options,
    );

    wrapper.unmount();

    expect(getForm(store).arrays).toEqual({});
    expect(getForm(store).counters).toEqual({});
  });

  it('should push a field', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <FieldArray
          name="test"
          component={MyComp}
        />
      </Provider>,
      options,
    ).find(MyComp);

    wrapper.prop('fields').push();

    expect(getForm(store).arrays).toEqual({ test: ['[0]'] });
  });

  it('should pop a field', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <FieldArray
          name="test"
          component={MyComp}
        />
      </Provider>,
      options,
    ).find(MyComp);

    wrapper.prop('fields').push();
    wrapper.prop('fields').pop();

    expect(getForm(store).arrays).toEqual({ test: [] });
  });

  it('should map fields', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <FieldArray
          name="test"
          component={MyComp}
        />
      </Provider>,
      options,
    ).find(MyComp);

    wrapper.prop('fields').push();
    wrapper.prop('fields').push();

    expect(wrapper.prop('fields').map(R.identity)).toEqual(['[0]', '[1]']);
  });
});
