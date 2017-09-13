import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mount } from "enzyme";

import reducer from 'redux-forms/lib/index';
import { form, field } from 'redux-forms/lib/containers';
import { Form, field as fieldDecorator, fieldArray } from '../src/';

const Field = fieldDecorator((props: any) => (
  <input type="text" {...props.input} />
));

const FlatFieldsComponent = (props: any) => (
  <div className="FlatFields">
    {props.fields.map((id: string) => (
      <Field key={id} name={id} />
    ))}
  </div>
);
const FlatFields = fieldArray(FlatFieldsComponent);

const DeepFieldsComponent = (props: any) => (
  <div className="DeepFields">
    {props.fields.map((id: string) => (
      <div className="DeepField" key={id}>
        <Field name={`${id}.name`} />
        <Field name={`${id}.surname`} />
      </div>
    ))}
  </div>
);
const DeepFields = fieldArray(DeepFieldsComponent);

const MyForm = () => (
  <Form name="test" className="Form">
    <Field name="title" />
    <FlatFields name="flatarray" />
    <DeepFields name="deeparray" />
  </Form>
);

// Any to allow nested property dot notation
const newStore = () => createStore(combineReducers<any>({
  reduxForms: reducer,
}));

const getForm = (store: any) => store.getState().reduxForms.test;


describe('#integration', () => {
  it('should initialize properly', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <MyForm />
      </Provider>
    ));

    const f = getForm(store);
    expect(f.fields).toEqual({ title: field });
    expect(f.arrays).toEqual({ flatarray: 0, deeparray: 0 });
  });

  it('should add a field to a flat array', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <MyForm />
      </Provider>
    ));

    wrapper.find(FlatFieldsComponent).prop('fields').push();

    const f = getForm(store);
    expect(f.fields).toEqual({ 'title': field, 'flatarray.0': field });
    expect(f.arrays).toEqual({ flatarray: 1, deeparray: 0 });
  });

  it('should add a field to a deep array', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <MyForm />
      </Provider>
    ));

    wrapper.find(DeepFieldsComponent).prop('fields').push();

    const f = getForm(store);
    expect(f.arrays).toEqual({ flatarray: 0, deeparray: 1 });
    expect(f.fields).toEqual({
      'title': field,
      'deeparray.0.name': field,
      'deeparray.0.surname': field,
    });
  });
});
