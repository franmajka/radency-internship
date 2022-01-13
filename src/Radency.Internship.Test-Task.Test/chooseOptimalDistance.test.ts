import { chooseOptimalDistance } from "../Radency.Internship.Test-Task/chooseOptimalDistance";


describe('Choose optimal distance', () => {
  it('Base', () => {
    expect(chooseOptimalDistance(174, 3, [51, 56, 58, 59, 61])).toBe(173);
  });

  it('Not enough cities', () => {
    expect(chooseOptimalDistance(Infinity, Infinity, [])).toBe(null);
  });

  it('Not enough max distance', () => {
    expect(chooseOptimalDistance(0, 1, [1, 2, 3])).toBe(null);
    expect(chooseOptimalDistance(20, 2, [16, 14, 22, 25])).toBe(null);
  });

  it('Only one city', () => {
    expect(chooseOptimalDistance(Infinity, 1, [1, 2, 3])).toBe(3);
  });

  it('All cities', () => {
    expect(chooseOptimalDistance(Infinity, 3, [1, 2, 3])).toBe(6);
  });

  it('Unsorted', () => {
    expect(chooseOptimalDistance(174, 3, [59, 51, 58, 61, 56])).toBe(173);
    expect(chooseOptimalDistance(40, 2, [16, 14, 22, 25, 25])).toBe(39);
  });

  it('Zero distances', () => {
    expect(chooseOptimalDistance(0, 3, [0, 0, 0, 0, 0])).toBe(0);
  });
})
