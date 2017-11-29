import ReduxThunk from 'redux-thunk';
import {
  compose,
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import isBrowser from 'app/utils/env/isBrowser';
import isDev from 'app/utils/env/isDev';

import createReducer from 'app/reducers';

let store;

export function create(appData = {}) {
  let devToolName = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
      extensionCompose = isDev() && isBrowser() && window[devToolName] ?
        window[devToolName] :
        compose;

  store = createStore(
    createReducer(),
    appData,
    extensionCompose(
      applyMiddleware(ReduxThunk)));

  store.injectedReducers = {};

  return store;
}

export function getState() {
  return store ? store.getState() : {};
}

export function injectReducer(name, reducer) {
  store.injectedReducers[name] = reducer;
  store.replaceReducer(createReducer(store.injectedReducers));
}
