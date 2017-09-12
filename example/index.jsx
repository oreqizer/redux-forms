import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxForms from 'redux-forms';
import { createLogger } from 'redux-logger';

import MyForm from './src/MyForm';


const logger = createLogger({ collapsed: true });
const store = createStore(combineReducers({
  reduxForms,
}), {}, applyMiddleware(logger));


const onSubmit = (values) => console.log(values);

const Root = () => (
  <Provider store={store}>
    <MyForm onSubmit={onSubmit} />
  </Provider>
);

const node = document.getElementById('root'); // eslint-disable-line no-undef

ReactDOM.render(<Root />, node);
