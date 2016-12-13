import React from 'react';
import { reduxForm, Field } from '../../lib';

import Input from './Input';

const InputArray = props => (
  <div>
    {props.fields.map((index) =>
      <Field
        name="flatfield"
        key={index}
        index={index}
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
    {props.fields.map(index =>
      <div key={index}>
        name:
        <Field
          name="name"
          index={index}
          component={Input}
        />
        <br />
        surname:
        <Field
          name="surname"
          index={index}
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
      validate={value => value.length < 5 ? 'too short' : null}
      placeholder="longer than 5 chars"
      component={Input}
    />
    <br />
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
