export const filterArrayByKeys = <T>(array: T[], filters: (keyof T)[], value: string): T[] => {
  if (!Array.isArray(array)) {
    return [];
  }

  if (!array.length) {
    return array;
  }

  return array.filter((item) => {
    return filters.some((filter) => (item[filter] as string).toLowerCase().includes(value.toLowerCase()));
  });
};
