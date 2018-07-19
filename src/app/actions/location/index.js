import types from 'app/consts/actions/location';

export function navigate(path) {
  return { 
    type: types.locationRequest,
    path 
  };
}

export function navigateSuccess(path) {
  return { 
    type: types.locationSucceed,
    path 
  };
}

export function navigateFail(path) {
  return { 
    type:  types.locationFail,
    path 
  };
}