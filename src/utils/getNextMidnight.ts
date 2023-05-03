const getNextMidnight = () => {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return new Date(tomorrow.getTime() - now.getTimezoneOffset() * 60000);
};

export default getNextMidnight;
