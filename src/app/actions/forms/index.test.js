import configureStore from 'redux-mock-store';
import thunk from 'app/store/middlewares/thunk';
import types from 'app/constants/actions/forms';
import {
  reset,
  updateData,
  checkData,
  deleteData,
  clearErrors
} from './index.js';

function mockStore() {
  return configureStore([thunk])({});
}

jest.mock('app/store', () => mockStore());

describe('forms actions', () => {

  it('should create an action to reset form', () => {
    var name = 'form_to_reset',
        resetState = {
          ui: {},
          data: { fly: 'me_to_the_moon' }
        };

    expect(reset(name, resetState)).toEqual({
      type: types.reset,
      name,
      data: resetState
    })
  });

  it('should create an action to update form data', () => {
    var name = 'lets_rock',
        dataUpdate = {
          rayony: 'kvartaly',
          jilye: 'massivy'
        };

    expect(updateData(name, dataUpdate)).toEqual({
      type: types.updateData,
      name,
      data: dataUpdate
    })
  });

  it('should create an action to delete all form data', () => {
    var name = 'lets_rock';

    expect(deleteData(name)).toEqual({
      type: types.deleteData,
      name
    });
  });

  it('should create an action to delete form data by keys', () => {
    var name = 'lets_rock',
        keys = ['a', 'b'];

    expect(deleteData(name, keys)).toEqual({
      type: types.deleteData,
      name,
      keys
    });
  });

  it('should create an action to check form data', () => {
    var name = 'i_called_up_the_Captain',
        key = 'pleaseBringMeMy',
        candidate = { [key]: 'vodka' },
        schema = {
          [key]: {
            validation: {
              rules: {
                youShouldKnow: {
                  message: 'Shame on you!',
                  check: data => data[key] == 'wine'
                }
              }
            }
          }
        };

    updateData(name, candidate);

    expect(checkData(name, schema)).toEqual({
      type: types.checkData,
      name,
      data: {
        valid: false,
        invalid: true,
        errors: {
          [key]: {
            youShouldKnow: 'Shame on you!'
          }
        }
      }
    })
  });

  it('should create an action to check only key in form data', () => {
    var name = 'the_only_key',
        candidate = {
          some: '',
          other: '1234567'
        },
        schema = {
          other: {
            validation: {
              rules: {
                too_long: {
                  message: 'too long',
                  check: () => false
                }
              }
            }
          },
          some: {
            validation: {
              rules: {
                required: {
                  message: 'cant be empty',
                  check: () => false
                }
              }
            }
          }
        };

    updateData(name, candidate);

    expect(checkData(name, schema, 'some')).toEqual({
      type: types.checkData,
      name,
      data: {
        invalid: true,
        valid: false,
        errors: {
          some: {
            required: 'cant be empty'
          }
        }
      }
    })
  });

  it('should create an action to clear form errors', () => {
    var name = 'give_me_one_more_chance';

    expect(clearErrors(name)).toEqual({
      type: types.clearErrors,
      name
    })
  });
})
