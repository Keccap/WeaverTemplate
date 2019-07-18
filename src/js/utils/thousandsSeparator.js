/**
 * Форматирование числа по разрядам с разделителем
 *
 * @param value
 * @param separator
 * @returns {string}
 */
export const thousandsSeparator = (value, separator = ' ') => {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separator);
};

export default thousandsSeparator;
