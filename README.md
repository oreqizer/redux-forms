# redux-forms

[![Build Status](https://travis-ci.org/oreqizer/redux-forms.svg?branch=master)](https://travis-ci.org/oreqizer/redux-forms)
[![codecov](https://codecov.io/gh/oreqizer/redux-forms/branch/master/graph/badge.svg)](https://codecov.io/gh/oreqizer/redux-forms)

A simple form manager for **Redux**. Bindings available for **React**!

### Packages

* `redux-forms` [![npm](https://img.shields.io/npm/v/redux-forms.svg)](https://www.npmjs.com/package/redux-forms)
* `redux-forms-react` [![npm](https://img.shields.io/npm/v/redux-forms-react.svg)](https://www.npmjs.com/package/redux-forms-react)

## Size

* `redux-forms` alone is **6kb** gzipped.
* `redux-forms-react` is **9kb** with `redux-forms` included!

**Dependencies**

* Ramda

The build process includes `babel-plugin-ramda`, so no unnecessary functions get into your bundle!

## Installation

Simply:

`yarn add redux-forms`

Or:

`npm i redux-forms --save`

Then just install bindings for any UI library you prefer.

## Quickstart

Mount the `redux-forms` reducer to your root reducer as `reduxForms`.

```js
import { createStore, combineReducers } from 'redux';
import reduxFormsReducer from 'redux-forms';

const rootReducer = combineReducers({
  // ... your other reducers
  reduxForms: reduxFormsReducer,
});

const store = createStore(rootReducer);
```

Create a component wrapped in the `field` decorator.

```js
import { field } from 'redux-forms-react';

const Input = props => (
  <input type="text" {...props.input} />
);

export default field(Input);
```

Then simply wrap your desired form with the `Form` component and you're ready to go!

```js
import { Form } from 'redux-forms-react';

import Input from './Input';

const MyForm = props => (
  <Form name="contact">
    <div>
      <label htmlFor="name">Name</label>
      <Input name="name" />
    </div>
    <div>
      <label htmlFor="email">Email</label>
      <Input name="email" />
    </div>
    <button type="submit">Submit</button>
  </Form>
);

export default MyForm;
```

That's it! This is how you mount the most basic form. For more advanced usage, check out the API docs below.

## Documentation

* [reducer](https://oreqizer.gitbooks.io/redux-forms/content/reducer.html)
* [Form](https://oreqizer.gitbooks.io/redux-forms/content/form.html)
* [field](https://oreqizer.gitbooks.io/redux-forms/content/field.html)
* [fieldArray](https://oreqizer.gitbooks.io/redux-forms/content/fieldarray.html)
* [selectors](https://oreqizer.gitbooks.io/redux-forms/content/selectors.html)
* [actions](https://oreqizer.gitbooks.io/redux-forms/content/actions.html)

## Migrating from 0.11.x

The API in `redux-forms-react` for `Field` and `FieldArray` changed from the `0.11.x` version. The reasons are:

* less magic with supplied props
* better type support in both _TypeScript_ and _Flow_
* easier unit testing
* less overhead with imports

### Field -> field

The `Field` higher order component changed to a `field` decorator. 

> Note: native components are no longer supported, you have to provide a regular component.

This is how you upgrade your fields:

**Before:**
```js
// Input.js
const Input = props => (
  <input type="text" {...props.input} />
);

export default Input;

// MyForm.js
const MyForm = props => (
  <Form name="contact">
    <div>
      <label htmlFor="name">Name</label>
      <Field name="name">
        <Input />
      </Field>
    </div>
    <button type="submit">Submit</button>
  </Form>
);
```

**After:**
```js
// Input.js
const Input = props => (
  <input type="text" {...props.input} />
);

export default field(Input);

// MyForm.js
const MyForm = props => (
  <Form name="contact">
    <div>
      <label htmlFor="name">Name</label>
      <InputField name="name" />
    </div>
    <button type="submit">Submit</button>
  </Form>
);
```

### FieldArray -> fieldArray

The `FieldArray` higher order component changed to a `fieldArray` decorator.

This is how you upgrade your field arrays:

**Before:**
```js
// Inputs.js
const Inputs = props => (
  <div className="Inputs">
    {props.fields.map(id => (
      <Field key={id} name={id}>
        <Input />
      </Field>
    ))}
    <button className="Inputs-btn" onClick={props.fields.push}>
      Add field
    </button>
  </div>
);

export default Inputs;

// MyForm.js
const MyForm = props => (
  <Form name="contact">
    <FieldArray name="name">
      <Inputs />
    </FieldArray>
    <button type="submit">Submit</button>
  </Form>
);
```

**After:**
```js
// Inputs.js
const Inputs = props => (
  <div className="Inputs">
    {props.fields.map(id => (
      <InputField key={id} name={id} />
    ))}
    <button className="Inputs-btn" onClick={props.fields.push}>
      Add field
    </button>
  </div>
);

export default fieldArray(Inputs);

// MyForm.js
const MyForm = props => (
  <Form name="contact">
    <InputsArray name="name" />
    <button type="submit">Submit</button>
  </Form>
);
```

## License

MIT
