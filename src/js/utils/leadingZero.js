/**
 * Подстановка ведущих нулей
 *
 * @param number
 * @param length
 * @returns {*}
 */
export const leadingZero = (number, length = 2) => {
  while (number.toString().length < length) {
    number = `0${number}`;
  }

  return number;
};

export default leadingZero;
