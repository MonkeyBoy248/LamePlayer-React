export const filterArrayByKeys = <T>(array: T[], filters: (keyof T)[], value: string): T[] => {
  if (!Array.isArray(array)) {
    return [];
  }

  if (!array.length) {
    return array;
  }

  return array.filter((item) => {
    return filters.some((filter) => {
      const targetElement = item[filter];

      if (typeof targetElement !== 'string') {
        return;
      }

      return targetElement.toLowerCase().includes(value.toLowerCase());
    });
  });
};
