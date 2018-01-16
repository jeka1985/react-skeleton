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



// export function navigate(path) {
//   return (dispatch, getState) => {
//     dispatch({ 
//       type:  types.locationFail,
//       path 
//     });

//     // return params.resolve()
//     //   .then(data => {
//     //     
        
//     //     dispatch({ 
//     //       type: types.locationSucceed,
//     //       path: params.path
//     //     });
//     //   })
//     //   .catch(e => {
//     //     dispatch({ 
//     //       type: types.locationFail,
//     //       path: params.path
//     //     });

//     //     throw new Error(e)
//     //   })
//   };
// }
