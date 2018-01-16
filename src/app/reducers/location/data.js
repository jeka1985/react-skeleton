import types from 'app/consts/actions/location';

export default function (data = { path: '/' }, action) {
  switch (action.type) {
    
    case types.locationSucceed:
      return {
        ...data,
        path: action.path
      };

    default:
      return data;
  }
}
