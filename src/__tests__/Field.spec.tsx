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

const getContext = (context: string) => ({
  context: {
    reduxForms: {
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
    )).toThrowError(/Field must be in a component decorated/);
  });

  // TODO tests after finishing API
});
