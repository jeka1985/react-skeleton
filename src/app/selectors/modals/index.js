import { getState } from 'app/store';
import get from 'app/utils/object/get';
import keys from 'app/utils/object/keys';

const root = 'modals';

export function getModalsList() {
  var data = get(getState(), root, {});

  return keys(data).map(name => ({
    name,
    ...data[name]
  }));
}

export function getModalByName(name) {
  var data = get(getState(), root, {});

  return data[name] || null;
}
