/**
 * Возвращает массив с массивами заданного размера.
 *
 * @param array {Array} Исходный массив
 * @param chunkSize {Integer} Размер каждой группы
 */
export default function chunkArray(array, chunkSize) {
  let newArr = array.slice();
  let results = [];

  while (newArr.length) {
    results.push(newArr.splice(0, chunkSize));
  }

  return results;
}
