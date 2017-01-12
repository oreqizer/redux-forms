import React from 'react';
import { Form, Field } from 'redux-forms-react';

const MyForm = (props) => (
  <Form name="second" onSubmit={props.onSubmit}>
    <h2>My form 2 (native inputs):</h2>
    input
    <Field
      name="test"
      component="input"
    />
    textarea
    <Field
      name="test2"
      component="textarea"
    />
    checkbox
    <Field
      name="test3"
      component="input"
      type="checkbox"
    />
    <div>---</div>
    <button type="submit">
      Submit
    </button>
  </Form>
);

export default MyForm;
