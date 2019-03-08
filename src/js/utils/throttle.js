/**
 * Returns a function, that, when invoked, will only be triggered at most once
 * during a given window of time.
 * @param  {Function} fn Function that should be called
 * @param  {Number} ms Time span to reset the limit count
 */
export default function throttle(fn, ms) {
  let isThrottle = false;
  let saveArgs = null;
  let saveThis = null;

  return function wrapper() {

    if (isThrottle) {
      saveArgs = arguments;
      saveThis = this;
      return;
    }

    fn.apply(this, arguments);
    isThrottle = true;

    setTimeout(() => {
      isThrottle = false;
      if (saveArgs) {
        wrapper.apply(saveThis, saveArgs);
        saveArgs = saveThis = null;
      }
    }, ms);

  };
}
