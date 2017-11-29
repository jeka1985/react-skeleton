import reducer from './index.js';
import types from 'app/constants/actions/caretaker';

describe('caretaker reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle caretaker/addMemento', () => {
    var key = 'let_it_snow',
        data = { some: 123 };

    expect(
      reducer({}, {
        type: types.addMemento,
        key,
        data
      })
    ).toEqual({
      [key]: {
        history: [data],
        index: 0
      }
    })
  });

  describe('should handle caretaker/moveIndex', () => {
    var history = [{ x: 1 }, { y: 2 }, { z: 3 }];

    it('increment index', () => {
      expect(
        reducer({ a: { history, index: 0 } }, {
          type: types.moveIndex,
          key: 'a',
          step: 1
        })
      ).toEqual({ a: { history, index: 1 } })
    });

    it('decrement index', () => {
      expect(
        reducer({ a: { history, index: 3 } }, {
          type: types.moveIndex,
          key: 'a',
          step: -1
        })
      ).toEqual({ a: { history, index: 2 } })
    });

    it('do not decrement if on first item', () => {
      var caretaker = {
        a: { history, index: 0 }
      };

      expect(
        reducer(caretaker, {
          type: types.moveIndex,
          key: 'a',
          step: -2
        })
      ).toEqual(caretaker)
    });

    it('do not increment if on last item', () => {
      var caretaker = {
        a: { history, index: 2 }
      };

      expect(
        reducer(caretaker, {
          type: types.moveIndex,
          key: 'a',
          step: 2
        })
      ).toEqual(caretaker)
    });
  });


  it('should handle caretaker/dropHistory', () => {
    var slice = {
      a: {
        history: [{ z: 55 }],
        index: 0
      }
    };

    expect(
      reducer({
        ...slice,
        x: {
          history: [{ qwe: 33 }],
          index: 0
        }
      }, {
        type: types.dropHistory,
        key: 'x'
      })
    ).toEqual(slice)
  });
})
