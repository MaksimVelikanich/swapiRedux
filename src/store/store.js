import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReduser';

const simpleMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

const store = createStore(rootReducer, applyMiddleware(simpleMiddleware));

export default store;
