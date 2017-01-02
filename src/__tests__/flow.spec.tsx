import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mount } from "enzyme";

import reducer from '../formsReducer';
import reduxForm from '../Form';
import Field from '../Field';
import FieldArray from '../FieldArray';
import { form, field } from "../utils/containers";


const FlatFields = (props: any) => (
  <div className="FlatFields">
    {props.fields.map((id: string) => (
      <Field
        key={id}
        name={id}
        component="input"
      />
    ))}
  </div>
);

const DeepFields = (props: any) => (
  <div className="DeepFields">
    {props.fields.map((id: string) => (
      <div className="DeepField" key={id}>
        <Field
          name={`${id}.name`}
          component="input"
        />
        <Field
          name={`${id}.surname`}
          component="input"
        />
      </div>
    ))}
  </div>
);

const RawForm = () => (
  <div className="Form">
    <Field
      name="title"
      component="input"
    />
    <FieldArray
      name="flatarray"
      component={FlatFields}
    />
    <FieldArray
      name="deeparray"
      component={DeepFields}
    />
  </div>
);

const Form = reduxForm({ form: 'test' })(RawForm);

// Any to allow nested property dot notation
const newStore = () => createStore(combineReducers<any>({
  reduxFormLite: reducer,
}));

const getForm = (store: any) => store.getState().reduxFormLite.test;


describe('#flow', () => {
  it('should initialize properly', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <Form />
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
        <Form />
      </Provider>
    ));

    wrapper.find(FlatFields).prop('fields').push();

    const f = getForm(store);
    expect(f.fields).toEqual({ 'title': field, 'flatarray.0': field });
    expect(f.arrays).toEqual({ flatarray: 1, deeparray: 0 });
  });

  it('should add a field to a deep array', () => {
    const store = newStore();
    const wrapper = mount((
      <Provider store={store}>
        <Form />
      </Provider>
    ));

    wrapper.find(DeepFields).prop('fields').push();

    const f = getForm(store);
    expect(f.arrays).toEqual({ flatarray: 0, deeparray: 1 });
    expect(f.fields).toEqual({
      'title': field,
      'deeparray.0.name': field,
      'deeparray.0.surname': field,
    });
  });
});
