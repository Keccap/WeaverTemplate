import isSet from './isSet';

/**
 * Проверка объекта на пустоту
 *
 * @param data
 * @returns {boolean}
 */
export const isEmptyObject = (data) => {
  if (isSet(data)) {
    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        return false;
      }
    }
  }

  return true;
};

export default isEmptyObject;
