/**
 * Проверка существования переменной
 *
 * @param data
 * @returns {boolean}
 */
export const isSet = (data) => {
  if (typeof data === 'boolean' || typeof data === 'string' || data === 0) {
    return true;
  }

  return !!data;
};

export default isSet;
