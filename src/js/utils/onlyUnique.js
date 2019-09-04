/**
 * Возвращает массив с уникальными значениями исходного массива
 *
 * @param array {Array} Исходный массив
 */

export default function onlyUnique(array) {
  return array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
}
