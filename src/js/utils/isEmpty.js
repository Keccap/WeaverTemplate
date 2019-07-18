import isSet from './isSet';
import isEmptyObject from './isEmptyObject';

/**
 * Проверка переменной на пустоту
 *
 * @param data
 * @returns {*}
 */
export const isEmpty = (data) => {
  if (isSet(data)) {
    if (typeof data === 'object') {
      return isEmptyObject(data);
    }
    if (data === 'null' || data === 'undefined') {
      return true;
    }
    if (
      typeof data === 'boolean'
      || typeof data === 'string' && data.length
      || typeof data === 'number' && !isNaN(data)
    ) {
      return false;
    }
  }

  return true;
};

export default isEmpty;
