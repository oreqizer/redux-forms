import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from 'redux-forms';
import createLogger from 'redux-logger';

import MyForm from './src/MyForm';
import FlatForm from './src/FlatForm';


const logger = createLogger({ collapsed: true });
const store = createStore(combineReducers({
  reduxForms: reducer,
}), {}, applyMiddleware(logger));


const onSubmit = (values) => console.log(values);

const Root = () => (
  <Provider store={store}>
    <div>
      <MyForm onSubmit={onSubmit} />
      <FlatForm onSubmit={onSubmit} />
    </div>
  </Provider>
);

const node = document.getElementById('root'); // eslint-disable-line no-undef

ReactDOM.render(<Root />, node);
