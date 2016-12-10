/// <reference types="jest" />

/* eslint-disable react/prop-types */
import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import reducer from '../formsDuck';
import reduxForm from '../reduxForm';


const MyComp = () => (
  <div className="Component" />
);

const getStore = () => createStore(combineReducers<any>({
  reduxForms: reducer,
}));


describe('#reduxForm', () => {
  it('should require name to be passed', () => {
    const fakeOpts: any = {};

    expect(() => reduxForm(fakeOpts)).toThrowError(/is a required string/);
  });

  it('should mount an unnamed component correctly', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const decorated = mount(
      <Provider store={getStore()}>
        <Decorated />
      </Provider>,
    ).find(Decorated);

    expect(decorated.name()).toBe('Connect(ReduxForm(Component))');
  });

  it('should name a component with a name correctly', () => {
    const Dummy: any = () => <MyComp />;

    Dummy.displayName = 'Dummy';

    const Decorated = reduxForm({ form: 'test' })(Dummy);

    const decorated = mount(
        <Provider store={getStore()}>
          <Decorated />
        </Provider>,
    ).find(Decorated);

    expect(decorated.name()).toBe('Connect(ReduxForm(Dummy))');
  });

  it('should set up a form correctly', () => {
    const Decorated = reduxForm({ form: 'test' })(MyComp);

    const store = getStore();
    const wrapper = mount(
      <Provider store={store}>
        <Decorated />
      </Provider>,
    );

    expect(store.getState().reduxForms.test).toBeDefined();

    wrapper.unmount();

    expect(store.getState().reduxForms.test).toBeUndefined();
  });
});
