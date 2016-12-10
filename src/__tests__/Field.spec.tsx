/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import reducer from '../formsDuck';

import Field from '../Field';


const rawMeta = {
  active: false,
  dirty: false,
  error: null,
  touched: false,
  visited: false,
};

const Component = (props: any) => (
  <input
    type="text"
    value={props.input.value}
    onChange={props.input.onChange}
    onFocus={props.input.onFocus}
    onBlur={props.input.onBlur}
  />
);

const getContext = (form: string, context: string) => ({
  context: {
    reduxForms: {
      form,
      context,
    },
  },
});

const getStore = () => createStore(combineReducers({
  reduxForms: reducer,
}));


describe('#Field', () => {
  it('should not mount in a non-decorated component', () => {
    expect(() => mount(
      <Provider store={getStore()}>
        <Field
          name="test"
          component={Component}
        />
      </Provider>,
    )).toThrowError(/component decorated with/);
  });

  it('should mount a field with a string component', () => {
    const field = mount(
      <Provider store={getStore()}>
        <Field
          name="test"
          component="input"
        />
      </Provider>,
      getContext('test', ''),
    );

    // TODO fix context + component withdrawal
    console.log(field.props());
  });
});
