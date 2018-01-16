import types from 'app/consts/actions/forms';
import { getByName, getDataByName } from 'app/selectors/forms';
import keys from 'app/utils/object/keys';
import get from 'app/utils/object/get';

export function reset(name, data) {
  return {
    type: types.reset,
    name,
    data
  };
}

/* @TODO: add destroy action */

export function updateData(name, data) {
  return {
    type: types.updateData,
    name,
    data
  };
}

export function deleteData(name, keys) {
  return {
    type: types.deleteData,
    name,
    keys
  };
}

/* @TODO: not sure about that*/
export function clearErrors(name, keys) {
  return {
    type: types.clearErrors,
    name,
    keys
  };
}
