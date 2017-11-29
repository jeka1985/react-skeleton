import types from 'app/consts/actions/modals';

export function showModal(name, data) {
  return (dispatch, getState) => {
    dispatch({
      type: types.showModal,
      name,
      data
    });

    window.setTimeout(() => {
      dispatch(toggleModalVisibility(name, true));
    }, 100);
  };
}

export function toggleModalVisibility(name, value) {
  return {
    type: types.toggleModalVisibility,
    name,
    value
  };
}

export function hideModal(name) {
  return (dispatch, getState) => {
    dispatch(toggleModalVisibility(name, false));

    window.setTimeout(() => {
      dispatch({
        type: types.hideModal,
        name
      });
    }, 100);
  };
}
