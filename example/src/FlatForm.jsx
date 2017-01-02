import React from 'react';
import { Form, Field } from '../../lib';

const MyForm = (props) => (
  <Form name="second">
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
    <button onClick={() => console.log(props.form.values)}>
      values -> console
    </button>
  </Form>
);

export default MyForm;
