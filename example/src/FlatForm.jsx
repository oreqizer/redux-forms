import React from 'react';
import { Form, Field } from 'redux-forms-react';

const MyForm = (props) => (
  <Form name="second" onSubmit={props.onSubmit}>
    <h2>My form 2 (native inputs):</h2>
    input
    <Field name="test">
      <input type="text" />
    </Field>
    textarea
    <Field name="test2">
      <textarea />
    </Field>
    checkbox
    <Field name="test3">
      <input type="checkbox"/>
    </Field>
    <div>---</div>
    <button type="submit">
      Submit
    </button>
  </Form>
);

export default MyForm;
