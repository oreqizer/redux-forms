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

Or for the oldschool:

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

## License

MIT
