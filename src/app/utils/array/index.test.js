import equals from './equals';
import includes from './includes';

/* array/equals */
describe('equals', () => {

  it('returns false for different length arrays', () => {
    expect(equals([1,2], [1,2,3,4]))
      .toEqual(false);
  });

  it('returns true for same order and value arrays', () => {
    expect(equals([1,2,3], [1,2,3]))
      .toEqual(true);
  });

  it('returns false for same values but different order arrays', () => {
    expect(equals([1,2,3], [3,2,1]))
      .toEqual(false);
  });

  it('correctly set default values', () => {
    expect(equals())
      .toEqual(true);
  });

});

/* array/include */
describe('include', () => {

  it('returns false if value missing', () => {
    expect(includes([1,2], '6'))
      .toEqual(false);
  });

  it('correctly set default values', () => {
    expect(includes())
      .toEqual(false);
  });

});
