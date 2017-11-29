import types from 'app/consts/actions/caretaker';
import get from 'app/utils/object/get';
import without from 'app/utils/object/without';

export default function (caretaker = { }, action) {
  switch (action.type) {

    case types.addMemento:
      var slice = get(caretaker, [action.key], {}),
          nextHistory = get(slice, 'history', []).concat([action.data]);

      return {
        ...caretaker,
        [action.key]: {
          ...slice,
          history: nextHistory,
          index: nextHistory.length - 1
        }
      };

    case types.moveIndex:
      var slice = get(caretaker, [action.key], {}),
          length = get(slice, 'history', []).length,
          index = get(slice, 'index', 0) + action.step,
          lastIndex = length - 1;

      return {
        ...caretaker,
        [action.key]: {
          ...slice,
          index: index <= 0 ?
            0 :
            index >= lastIndex ? lastIndex : index
        }
      };

    case types.dropHistory:
      return without(caretaker, action.key);

    default:
      return caretaker;
  }
}
