import { StatUtils } from './stat-utils';

describe('StatUtils ', () => {
  const arrEven = [10, 2, 13, 4, 8, 5, 0, 1]; // length 8 Average 5.375 Medain 4.5
  const arrOdd = [9, 3, 12, 66, 400, 1, 29, 29, 1]; // length 9 Average 61.1111111... Median 12
  const irrationalArr = [-1, -28, 10, 29, 31, -11]; // length 6 Average 5 Medain 4.5

  describe('find Average method', () => {
    it('work for even count array', () => {
      expect(StatUtils.findAverage(arrEven)).toBeCloseTo(5.375, 3);
    });

    it('work for odd count array', () => {
      expect(StatUtils.findAverage(arrOdd)).toBeCloseTo(61.1111111, 5);
    });

    it('work for array with irrational values', () => {
      expect(StatUtils.findAverage(irrationalArr)).toBeCloseTo(5, 0);
    });

    it ('with empty array should return null', () => {
      expect(StatUtils.findAverage([])).toBeNull();
    });

    it ('with array of one value should return the value', () => {
      expect(StatUtils.findAverage([2])).toBe(2);
    });
  });
  describe('find Median method', () => {
    it('work for even count array', () => {
      expect(StatUtils.findMedian(arrEven)).toBe(4.5);
    });

    it('work for odd count array', () => {
      expect(StatUtils.findMedian(arrOdd)).toBe(10);
    });

    it('work for array with irrational values', () => {
      expect(StatUtils.findMedian(irrationalArr)).toBe(4.5);
    });

    it ('with empty array should return null', () => {
      expect(StatUtils.findMedian([])).toBeNull();
    });

    it ('with array of one value should return the value', () => {
      expect(StatUtils.findMedian([2])).toBe(2);
    });
  });
});
