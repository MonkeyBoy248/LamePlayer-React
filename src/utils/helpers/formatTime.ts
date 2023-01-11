const pad = (value: number) => {
  return value < 10 ? `0${value}` : value;
}

export const formatTime = (timeInMilliseconds: number) => {
  const minutes = Math.floor(timeInMilliseconds / 60);
  const seconds = Math.floor(timeInMilliseconds % 60);

  return `${pad(minutes)}:${pad(seconds)}`;
}
