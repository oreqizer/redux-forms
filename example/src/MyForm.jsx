import React from 'react';
import { connect } from 'react-redux';
import { Form, Field, FieldArray } from 'redux-form-lite';
import { valueSelector } from 'redux-form-lite/selectors';

import Input from './Input';

const InputArray = props => (
  <div>
    {props.fields.map((id) =>
      <Field
        key={id}
        name={id}
        component={Input}
      />
    )}
    <button onClick={props.fields.push}>
      Push field
    </button>
    <button onClick={props.fields.pop}>
      Pop field
    </button>
    <button onClick={props.fields.unshift}>
      Unshift field
    </button>
    <button onClick={props.fields.shift}>
      Shift field
    </button>
  </div>
);

const DeepArray = props => (
  <div>
    {props.fields.map(id =>
      <div key={id}>
        name:
        <Field
          name={`${id}.name`}
          component={Input}
        />
        <br />
        surname:
        <Field
          name={`${id}.surname`}
          component={Input}
        />
      </div>
    )}
    <button onClick={props.fields.push}>
      Add fields
    </button>
    <button onClick={props.fields.pop}>
      Remove fields
    </button>
  </div>
);

const validate = value => value.length < 5 ? 'too short' : null;

const MyForm = props => (
  <Form name="first" onSubmit={props.onSubmit}>
    <h2>My form:</h2>
    <h4>first Field</h4>
    <Field
      name="test"
      defaultValue="default"
      component={Input}
    />
    <h4>second Field</h4>
    <Field
      name="test2"
      validate={validate}
      placeholder="longer than 5 chars"
      component={Input}
    />
    <br />
    <FieldArray
      name="hobbies"
      component={InputArray}
    />
    <br />
    <FieldArray
      name="profiles"
      component={DeepArray}
    />
    <div>---</div>
    <br />
    Values:
    <pre>{JSON.stringify(props.values, null, 2)}</pre>
    <br />
    <button type="submit">
      Submit
    </button>
  </Form>
);

export default connect(state => ({
  values: valueSelector('first', state),
}))(MyForm);
