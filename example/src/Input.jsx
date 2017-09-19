import React from 'react';
import { field } from 'redux-forms-react';

const Input = props => (
  <div>
    <h3>{props.input.name}</h3>
    <div>Error: {String(props.meta.error)}</div>
    <div>Dirty: {String(props.meta.dirty)}</div>
    <div>Touched: {String(props.meta.touched)}</div>
    <div>Visited: {String(props.meta.visited)}</div>
    <div>Active: {String(props.meta.active)}</div>
    <input
      {...props.input}
      type={props.type}
      placeholder={props.placeholder}
    />
  </div>
);

export default field(Input);
