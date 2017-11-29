import types from 'app/consts/actions/location';

export function locationRequest(params) {
  return {
    type: types.locationRequest,
    path: params.path
  };
}

export function locationSucceed(params) {
  var path = params.path;

  window.history.pushState({ path }, null, path);
  
  return {
    type: types.locationSucceed,
    path
  };
}

export function locationFail(params) {
  return {
    type: types.locationFail,
    path: params.path
  };
}
