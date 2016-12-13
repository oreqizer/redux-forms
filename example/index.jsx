import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from 'redux-forms';
import createLogger from 'redux-logger';
import whyDidYouUpdate from 'why-did-you-update';

import Form from './src/Form';
import Form2 from './src/FlatForm';

whyDidYouUpdate(React);

const logger = createLogger({ collapsed: true });
const store = createStore(combineReducers({
  reduxForms: reducer,
}), {}, applyMiddleware(logger));

const Root = () => (
  <Provider store={store}>
    <div>
      <Form />
    </div>
  </Provider>
);

const node = document.getElementById('root'); // eslint-disable-line no-undef

ReactDOM.render(<Root />, node);