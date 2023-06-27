import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from './reducers';
import rootSaga from './sagas';

export const makeStore = () => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  // 2: Add an extra parameter for applying middleware
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  // 3: Run your sagas on server
  (store as any).sagaTask = sagaMiddleware.run(rootSaga);

  // 4: now return the store
  return store;
};

export const wrapper = createWrapper(makeStore);