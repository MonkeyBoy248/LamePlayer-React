const pad = (value: number): string | number => {
  return value < 10 ? `0${value}` : value;
}

export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${pad(minutes)}:${pad(seconds)}`;
}
