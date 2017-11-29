import { getState } from 'app/store';
import get from 'app/utils/object/get';

function getByName(name) {
  var rootKey = 'caretaker';

  return get(getState(), [rootKey, name], {});
}

export function getMementoList(name) {
  var caretaker = getByName(name);

  return get(caretaker, 'history', []);
}

export function canUndo(name) {
  var caretaker = getByName(name),
      isHistory = getMementoList(name).length;

  return isHistory && !!get(caretaker, 'index', 0);
}

export function canRedo(name) {
  var caretaker = getByName(name),
      index = get(caretaker, 'index', 0),
      history = getMementoList(name);

  return !!history.length && index != history.length - 1;
}

export function getMemento(name) {
  var caretaker = getByName(name),
      index = get(caretaker, 'index', 0),
      data = get(caretaker, 'history', [])[index];

  return data || {};
}
