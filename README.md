# redux-forms

[![Build Status](https://travis-ci.org/oreqizer/redux-forms.svg?branch=master)](https://travis-ci.org/oreqizer/redux-forms)
[![codecov](https://codecov.io/gh/oreqizer/redux-forms/branch/master/graph/badge.svg)](https://codecov.io/gh/oreqizer/redux-forms)

A simple form manager for React and Redux. The API similarities to `redux-form` are intentional - this project is meant to take the best of `redux-form` while keeping it as lightweight as possible.

## Usage

> These docs are temporary - fully covered documentation will come after the API is done.

First, add `reduxForms` to your root reducer.

```javascript
import { reducer } from 'redux-forms';

export default combineReducers({
  reduxForms: reducer,
});
```

To create a form, decorate a component with `reduxForm`:

```javascript
import { reduxForm } from 'redux-forms';

// ... your component

export default reduxForm({
  form: 'myForm',
})(Form);
```

Then you can mount your fields. Your fields can be either a string, or a custom component.

* `string` - will have all handlers mounted, accept any custom properties supported by the element
* `component` - will receive all the props you supplied, as well as a `meta` and `input` objects

`input` prop contains all properties necessary for native components (`input`, `textarea`...).
`meta` prop has information about the field. The info is:

- `error: string | null` - an error message from your validation function, if any
- `dirty: boolean` - value differs from default value
- `active: boolean` - the element is currently active
- `touched: boolean` - the element was blurred
- `visited: boolean` - the element was focused

`Field` accepts the following props (that won't be propagated as your custom props, except for `name`):

- `name: string` - required. the name of your component
- `component: string | React.ComponentClass | React.StatelessFunction` - required. the component to render
- `defaultValue: string` - default component value
- `validate: (val: string) => string | null` - should return string as an error message, or null if the value is valid 
- `normalize: (val: string) => string` - function to normalize the input. e.g. accept only numbers

```javascript
import { Field } from 'redux-forms';

const Form = (props) => (
  <div className="Form">
    <h2>My form:</h2>
    <Field
      name="name"
      component="input"
    />
    <Field
      name="surname"
      component="textarea"
    />
    <Field
      name="password"
      component={MyComponent}
    />
  </div>
);
```

**MORE COMING IN THE FUTURE**
