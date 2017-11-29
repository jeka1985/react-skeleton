import types from 'app/constants/actions/caretaker';

export function addMemento(key, data) {
  return {
    type: types.addMemento,
    key,
    data
  };
}

export function moveIndex(key, params) {
  return {
    type: types.moveIndex,
    step: params.step,
    key
  };
}

export function dropHistory(key) {
  return {
    type: types.dropHistory,
    key
  };
}
