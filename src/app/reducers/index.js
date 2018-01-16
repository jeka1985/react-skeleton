import { combineReducers } from 'redux';

export default function createReducer(injected = {}) {
  return combineReducers({
    modals: require('app/reducers/modals').default,
    //forms: require('app/reducers/forms').default,
    location: require('app/reducers/location').default,
    caretaker: require('app/reducers/caretaker').default,
    ...injected
  });
}
