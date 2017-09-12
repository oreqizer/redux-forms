import React from 'react';
import { connect } from 'react-redux';
import { Form, fieldArray } from 'redux-forms-react';
import { getValues } from 'redux-forms/selectors';

import Input from './Input';

const InputArray = fieldArray(props => (
  <div>
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
    {props.fields.map((id, index) =>
      <div key={id}>
        <Input name={id} />
        <button onClick={(ev) => { ev.preventDefault(); props.fields.insert(index) }}>
          Insert field
        </button>
        <button onClick={(ev) => { ev.preventDefault(); props.fields.remove(index) }}>
          Remove field
        </button>
        <button onClick={(ev) => { ev.preventDefault(); props.fields.swap(index, prompt('Index:')) }}>
          Swap
        </button>
        <button onClick={(ev) => { ev.preventDefault(); props.fields.move(index, prompt('Index:')) }}>
          Move
        </button>
      </div>
    )}
  </div>
));

const DeepArray = fieldArray(props => (
  <div>
    <button onClick={props.fields.push}>
      Add fields
    </button>
    <button onClick={props.fields.pop}>
      Remove fields
    </button>
    {props.fields.map(id =>
      <div key={id}>
        <Input name={`${id}.name`} />
        <br />
        <Input name={`${id}.surname`} />
      </div>
    )}
  </div>
));

const validate = value => value.length < 5 ? 'too short' : null;

const MyForm = props => (
  <Form name="first" onSubmit={props.onSubmit}>
    <h2>My form:</h2>
    <Input
      name="test"
      defaultValue="default"
    />
    <Input
      name="test2"
      validate={validate}
      placeholder="longer than 5 chars"
    />
    <br />
    <InputArray name="hobbies" />
    <br />
    <DeepArray name="profiles" />
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
  values: getValues('first', state),
}))(MyForm);
