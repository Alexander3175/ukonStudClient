export const isTokenExpired = (exp: number): boolean => {
  return exp * 1000 < Date.now();
};
