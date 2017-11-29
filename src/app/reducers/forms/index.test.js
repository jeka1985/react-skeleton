import reducer from './index.js';
import types from 'app/constants/actions/forms';

describe('forms reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle forms/RESET', () => {
    var name = 'rolling_stone',
        data = { qwe: 123 };

    expect(
      reducer({
        [name]: {
          data: { initial: 45 }
        }
      }, {
        type: types.reset,
        name,
        data: { data }
      })
    ).toEqual({
      [name]: { data: data }
    })
  });

  it('should handle forms/UPDATE_DATA', () => {
    var name = 'numa-numa-e',
        initial = { qwe: 45 },
        update = { flip: 99 };

    expect(
      reducer({
        [name]: { data: initial }
      }, {
        type: types.updateData,
        name,
        data: update
      })
    ).toEqual({
      [name]: {
        data: {
          ...initial,
          ...update
        }
      }
    });
  });
  describe('handle forms/DELETE_DATA', () => {
    it('deletes data by keys', () => {
      var name = 'pam-param',
          initial = {
            data: { qwe: 45, flip: 99, zero: false }
          };

      expect(
        reducer({
          [name]: initial
        }, {
          type: types.deleteData,
          name,
          keys: ['qwe', 'flip']
        })
      ).toEqual({
        [name]: {
          data: {
            zero: false
          }
        }
      });
    });

    it('drops data by name', () => {
      var name = 'pam-param',
          initial = {
            data: { qwe: 45, flip: 99, zero: false }
          };

      expect(
        reducer({
          [name]: initial
        }, {
          type: types.deleteData,
          name
        })
      ).toEqual({
        [name]: { }
      });
    })
  });

  it('should handle forms/CHECK_DATA', () => {
    var name = 'bad-form',
        data = {
          valid: false,
          invalid: true,
          errors: {
            some: { missing: 'ohhh, Johny..' }
          }
        };

    expect(
      reducer({
        [name]: {
          data: { some: '' }
        }
      }, {
        type: types.checkData,
        name,
        data
      })
    ).toEqual({
      [name]: {
        data: { some: '' },
        ui: data
      }
    });
  });

  describe('handle forms/CLEAR_ERRORS', () => {
    it('drop all validation results', () => {
      var name = 'bad-form',
          data = { some: '' },
          initial = {
            data,
            ui: {
              valid: false,
              invalid: true,
              errors: {
                some: { missing: 'ohhh, Johny..' }
              }
            }
          };

      expect(
        reducer({
          [name]: initial
        }, {
          type: types.clearErrors,
          name
        })
      ).toEqual({
        [name]: {
          data,
          ui: {}
        }
      });
    });

    it('drop all validation results', () => {
      var name = 'bad-form',
          data = { some: '' },
          initial = {
            data,
            ui: {
              valid: false,
              invalid: true,
              errors: {
                some: { missing: 'ohhh, Johny..' },
                other: { dammit: 'no way' }
              }
            }
          };

      expect(
        reducer({
          [name]: initial
        }, {
          type: types.clearErrors,
          name,
          keys: ['some']
        })
      ).toEqual({
        [name]: {
          data,
          ui: {
            valid: false,
            invalid: true,
            errors: {
              other: { dammit: 'no way' }
            }
          }
        }
      });
    });
  });
});
