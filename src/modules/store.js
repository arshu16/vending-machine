import { createStore, applyMiddleware, compose } from "redux";
import apiMiddleware from '../middleware/apiMiddleware';
import logger from "redux-logger";
import reducer from "./reducer";
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk, apiMiddleware()),  
    applyMiddleware(logger),
    (process.env.REACT_APP_ENV === 'development' &&  window.__REDUX_DEVTOOLS_EXTENSION__) ?  window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ));
  return store;
}