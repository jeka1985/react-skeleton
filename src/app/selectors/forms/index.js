import { getState } from 'app/store';
import get from 'app/utils/object/get';
import pick from 'app/utils/object/pick';

export function getByName(name) {
  var storeRoot = 'forms';

  return get(getState(), [storeRoot, name], {});
}

export function getDataByName(name) {
  var form = getByName(name);

  return get(form, 'data', {});
}

export function getCheckResultByName(name) {
  var form = getByName(name);

  return pick(form.ui || {}, ['valid', 'invalid', 'errors']);
}
