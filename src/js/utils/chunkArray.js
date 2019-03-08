/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
export default function chunkArray(myArray, chunkSize) {
  var newArr = myArray.slice();
  var results = [];

  while (newArr.length) {
    results.push(newArr.splice(0, chunkSize));
  }

  return results;
}
