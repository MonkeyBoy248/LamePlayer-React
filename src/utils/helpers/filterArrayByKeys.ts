export const filterArrayByKeys = <T>(array: T[], filters: (keyof T)[], value: string) => {
  return array.filter((item) => {
    return filters.some((filter) => (item[filter] as string).toLowerCase().includes(value.toLowerCase()));
  })
}