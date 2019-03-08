// const unique = a.filter(onlyUnique);
export default function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
