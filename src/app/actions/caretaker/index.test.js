import types from 'app/constants/actions/caretaker';
import {
  addMemento,
  moveIndex,
  dropHistory
} from './index.js';

describe('caretaker actions', () => {
  it('should create an action to add a memento', () => {
    var key = 'something_important',
        data = { keep: 'it', please: true };

    expect(addMemento(key, data)).toEqual({
      type: types.addMemento,
      key,
      data
    })
  });

  it('should create an action to drop history', () => {
    var key = 'no_need_anymore';

    expect(dropHistory(key)).toEqual({
      type: types.dropHistory,
      key
    })
  });

  it('should create an action to move index', () => {
    var key = 'time_mashine',
        params = { step: 1 };

    expect(moveIndex(key, params)).toEqual({
      type: types.moveIndex,
      key,
      step: params.step
    })
  });
})
