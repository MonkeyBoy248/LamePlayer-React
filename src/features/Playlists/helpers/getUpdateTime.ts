export const getUpdateTime = (timestamp: number): string => {
  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const timePassedFromTheLastUpdate = Date.now() - timestamp;
  const twoDaysInMilliseconds = 48 * 60 * 60 * 1000;

  if (timePassedFromTheLastUpdate > dayInMilliseconds && timePassedFromTheLastUpdate <= twoDaysInMilliseconds) {
    return 'Yesterday';
  }

  if (timePassedFromTheLastUpdate <= dayInMilliseconds) {
    return 'Today';
  }

  return new Date(timestamp).toLocaleDateString();
};
