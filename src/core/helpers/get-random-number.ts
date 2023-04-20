export const getRandomNumber = (max: number, min: number = 0): number => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
