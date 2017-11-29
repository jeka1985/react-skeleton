import { types } from 'app/constants/actions/location';
import {
  locationRequest,
  locationSucceed,
  locationFail
} from 'app/actions/location';

describe('location', () => {
  it('creates request action', () => {
    expect(locationRequest({ path: '/a' }))
      .toEqual({
        type: types.locationRequest,
        path: '/a'
      });
  });

  it('creates succeed action', () => {
    expect(locationSucceed({ path: '/b' }))
      .toEqual({
        type: types.locationSucceed,
        path: '/b'
      });
  });

  it('creates fail action', () => {
    expect(locationFail({ path: '/c' }))
      .toEqual({
        type: types.locationFail,
        path: '/c'
      });
  });
});
