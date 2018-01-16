import types from 'app/consts/actions/location';
import without from 'app/utils/object/without';

export default function (ui = { }, action) {
  switch (action.type) {

    case types.locationRequest:
      return {
        ...without(ui, ['error']),
        pending: action.path,
      };

    case types.locationSucceed:
      return without(ui, ['pending']);

    case types.locationFail:
      return {
        ...without(ui, ['pending']),
        error: action.path
      };

    default:
      return ui;
  }
}
