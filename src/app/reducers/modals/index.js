import types from 'app/consts/actions/modals';
import without from 'app/utils/object/without';

export default function (modals = { }, action) {
  switch (action.type) {

    case types.showModal:
      return {
        ...modals,
        [action.name]: {
          ...(modals[action.name] || {}),
          data: action.data
        }
      };

    case types.toggleModalVisibility:
      return {
        ...modals,
        [action.name]: {
          ...(modals[action.name] || {}),
          visible: action.value
        }
      };

    case types.hideModal:
      return without(modals, action.name);

    default:
      return modals;
  }
}
