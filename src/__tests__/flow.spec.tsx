import * as React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { mount } from "enzyme";

import reducer from '../formsDuck';
import reduxForm from '../reduxForm';
import Field from '../Field';
import FieldArray from '../FieldArray';
import { form, field } from "../utils/containers";


const FlatFields = (props: any) => (
  <div className="FlatFields">
    {props.fields.map((id: string) => (
      <Field
        name={id}
        component="input"
      />
    ))}
  </div>
);

const DeepFields = (props: any) => (
  <div className="DeepFields">
    {props.fields.map((id: string) => (
      <div className="DeepField">
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
  reduxForms: reducer,
}));

const getForm = (store: any) => store.getState().reduxForms.test;


describe('#flow', () => {
  it('should initialize properly', () => {
    const store = newStore();
    const wrapper = mount(
      <Provider store={store}>
        <Form />
      </Provider>,
    );

    const f = getForm(store);
    expect(f.fields).toEqual({ title: field });
    expect(f.arrays).toEqual({ flatarray: [], deeparray: [] });
    expect(f.counters).toEqual({ flatarray: 0, deeparray: 0 });
  });
});
