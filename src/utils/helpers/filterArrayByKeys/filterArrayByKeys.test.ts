import { filterArrayByKeys } from './filterArrayByKeys';
import { describe, expect, it } from 'vitest';

type TestArr = { name: string; genre: string | number };

const filters: (keyof TestArr)[] = ['name', 'genre'];

describe('filterArrayByKeys', () => {
  it('should return an array with an element whose name and genre fields are equal to Tool', () => {
    const array: TestArr[] = [
      { name: 'Tool', genre: 'Prog' },
      { name: 'Seether', genre: 'Rock' },
    ];
    const value = 'Tool';

    expect(filterArrayByKeys(array, filters, value)).toStrictEqual(array.slice(0, 1));
  });

  it('should return an array with an element whose name and genre fields are equal to Rock', () => {
    const array: TestArr[] = [
      { name: 'Tool', genre: 'Prog' },
      { name: 'Seether', genre: 'Rock' },
    ];
    const value = 'Rock';

    expect(filterArrayByKeys(array, filters, value)).toStrictEqual(array.slice(1));
  });

  it('should return an empty array if the given array was also empty', () => {
    const value = 'Rock';
    const array: TestArr[] = [];

    expect(filterArrayByKeys(array, filters, value)).toStrictEqual([]);
  });

  it('should return an empty array if none of the properties is equal to the one that are being searched for', () => {
    const array: TestArr[] = [
      { name: 'Tool', genre: 'Prog' },
      { name: 'Seether', genre: 'Rock' },
    ];
    const value = 'Pop';

    expect(filterArrayByKeys(array, filters, value)).toStrictEqual([]);
  });

  it("should return an array with the correct element even if the value of the element's property is not a string", () => {
    const value = '5';
    const array: TestArr[] = [
      { name: 'Tool', genre: 'Prog' },
      { name: 'Seether', genre: 5 },
    ];

    expect(filterArrayByKeys(array, filters, value)).toStrictEqual(array.slice(1));
  });
});
