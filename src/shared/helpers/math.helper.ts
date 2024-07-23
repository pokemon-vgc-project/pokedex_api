export const getFloatNumberPattern = (n: number): number => {
  return Number(parseFloat(n.toString()).toFixed(2));
};
