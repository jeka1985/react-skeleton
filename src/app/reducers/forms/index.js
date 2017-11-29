import types from 'app/consts/actions/forms';
import without from 'app/utils/object/without';
import get from 'app/utils/object/get';

export default function (forms = {}, action) {

  function getMergedCopy(slice, value) {
    return {
      ...forms,
      [action.name]: {
        ...get(forms, action.name, {}),
        [slice]: {
          ...get(forms, [action.name, slice], {}),
          ...value
        }
      }
    };
  };

  switch (action.type) {

    case types.reset:
      return {
        ...forms,
        [action.name]: action.data
      }

    case types.updateData:
      return getMergedCopy('data', action.data);

    case types.deleteData:

      return {
        ...forms,
        [action.name]: action.keys ?
          {
            ...get(forms, action.name, {}),
            data: without(get(forms, [action.name, 'data'], {}), action.keys)
          } :
          without(get(forms, action.name, {}), 'data')
      };

    case types.checkData:
      return getMergedCopy('ui', action.data);

    case types.clearErrors:
      var ui = get(forms, [action.name, 'ui'], {}),
          keys = action.keys;

      return {
        ...forms,
        [action.name]: {
          ...get(forms, action.name, {}),
          ui: keys ?
            {
              ...without(ui, keys),
              errors: without(get(ui, 'errors', {}), keys)
            } :
            without(ui, ['errors', 'valid', 'invalid'])
        }
      };

    default:
      return forms;
  }
}
