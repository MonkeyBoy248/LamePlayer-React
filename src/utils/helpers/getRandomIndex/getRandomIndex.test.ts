import { getRandomIndex } from './getRandomIndex';
import { describe, expect, it } from 'vitest';

describe('getRandomIndex', () => {
  it('should get random index of the given array', () => {
    const testArray = [1, 2, 3, 5];

    expect(getRandomIndex(testArray)).toBeLessThanOrEqual(testArray.length - 1);
  });

  it('should return 0 when the given array is empty', () => {
    expect(getRandomIndex([])).toBe(0);
  });
});
