export const setItemToLocalStorage = <T>(key: string, value: T): void => {
  const valueToString = JSON.stringify(value);

  localStorage.setItem(key, valueToString);
};

export function getItemFromLocalStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key) ?? 'null';

  return JSON.parse(item);
}
