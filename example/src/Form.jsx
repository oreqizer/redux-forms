import React from 'react';
import { reduxForm, Field, FieldArray } from '../../lib';

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
      Add field
    </button>
    <button onClick={props.fields.pop}>
      Remove field
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

const Form = props => (
  <div>
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
    <button onClick={() => console.log(props.form.values)}>
      values -> console
    </button>
  </div>
);

export default reduxForm({
  form: 'first',
})(Form);
