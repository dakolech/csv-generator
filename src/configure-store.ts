import { connectRouter, routerMiddleware } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';

import filter from 'redux-storage-decorator-filter';
import { reducers } from './reducers';

export const history = createBrowserHistory();


export function configureStore() {
  const storeKey = 'table';

  const initialState = {};
  const reducer = storage.reducer(connectRouter(history)(combineReducers({
    ...reducers,
  })));

  const devTools = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
  const composeEnhancers = window[devTools] || compose;

  const engine = filter(
    createEngine(storeKey),
    [],
    [ 'router' ]
  );
  const middleware = storage.createMiddleware(engine);
  const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(...[routerMiddleware(history), middleware]),
  )(createStore);

  const load = storage.createLoader(engine);
  const cachedStore = typeof window !== 'undefined'
    ? !!window.localStorage.getItem(storeKey)
    : false;

  const store = initialState && !cachedStore
    ? createStoreWithMiddleware(reducer, initialState)
    : createStoreWithMiddleware(reducer);

  if (cachedStore) {
    load(store);
  }

  return store;
}


