# redux-form-lite

[![Build Status](https://travis-ci.org/oreqizer/redux-form-lite.svg?branch=master)](https://travis-ci.org/oreqizer/redux-form-lite)
[![codecov](https://codecov.io/gh/oreqizer/redux-form-lite/branch/master/graph/badge.svg)](https://codecov.io/gh/oreqizer/redux-form-lite)

A simple form manager for React and Redux. The API similarities to `redux-form` are intentional - this project is meant to take the best of `redux-form` while keeping it as lightweight and simple to use as possible!

### Installation

Make sure you have `react`, `redux` and `react-redux` installed! Then simply:

`yarn add redux-form-lite`

Or for the oldschool:

`npm i redux-form-lite --save`

### Quickstart

Mount the `redux-form-lite` reducer to your root reducer as `reduxFormLite`.

```js
import { createStore, combineReducers } from 'redux';
import { reducer } from 'redux-form-lite';

const rootReducer = combineReducers({
  // ... your other reducers
  reduxFormLite: reducer,
});

const store = createStore(rootReducer);
```

Then simply wrap your desired form with the `Form` component.

```js
import { Form, Field } from 'redux-form-lite';

const MyForm = (props) => (
  <Form name="contact">
    <div>
      <label htmlFor="name">Name</label>
      <Field name="name" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="email">Email</label>
      <Field name="email" component="input" type="email" />
    </div>
    <button type="submit">Submit</button>
  </Form>
);

export default MyForm;
```

That's it! This is how you mount the most basic form. For more advanced usage, check out the API - there are examples for each use case.

### Documentation

* [reducer](https://oreqizer.gitbooks.io/redux-form-lite/content/reducer.html)
* [Form](https://oreqizer.gitbooks.io/redux-form-lite/content/form.html)
* [Field](https://oreqizer.gitbooks.io/redux-form-lite/content/field.html)
* [FieldArray](https://oreqizer.gitbooks.io/redux-form-lite/content/fieldarray.html)
* [selectors](https://oreqizer.gitbooks.io/redux-form-lite/content/selectors.html)
* [actions](https://oreqizer.gitbooks.io/redux-form-lite/content/actions.html)

