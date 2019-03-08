export default function debounce(fn, ms) {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, ms);
  };
}
