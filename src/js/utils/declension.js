/**
 * Склонение окончаний
 *
 * @param number
 * @param expressions ['пользователь','пользователя','пользователей']
 * @returns {*}
 */
export const declension = (number, expressions) => {
  let n = Math.abs(number);
  return expressions[(n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)];
};

export default declension;
