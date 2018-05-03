export function debounce(fn, ms) {
  let timer = null;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    };

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, ms);
  };
}


/**
 * Returns a function, that, when invoked, will only be triggered at most once
 * during a given window of time.
 * @param  {Function} fn Function that should be called
 * @param  {Number} ms Time span to reset the limit count
 */
export function throttle(fn, ms) {
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


/**
 * Wait until document is ready to run method
 * @param  {Function} fn Method to run
 */
export function documentReady(fn) {

  // Sanity check
  if (typeof fn !== 'function') return;

  // If document is already loaded, run method
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    return fn();
  }

  // Otherwise, wait until document is loaded
  document.addEventListener('DOMContentLoaded', fn, false);

};


/**
 * Wait until document is loaded to run method
 * @param  {Function} fn Method to run
 */
export function documentLoaded(fn) {

  // Sanity check
  if (typeof fn !== 'function') return;

  // If document is already loaded, run method
  if (document.readyState === 'complete') {
    return fn();
  }

  // Otherwise, wait until document is loaded
  window.addEventListener('load', fn, false);

};


export function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}


export function noDragElements(selector) {
  const noDragObjects = [...document.querySelectorAll(selector)];
  noDragObjects.forEach(el => {
    el.addEventListener('dragstart', event => event.preventDefault());
  });
}


export function getScrollWidth() {
  const element = document.createElement('div');
  Object.assign(element.style, {
    overflowY: 'scroll',
    height: '50px',
    width: '50px',
    visibility: 'hidden'
  });
  document.body.append(element);
  const scrollWidth = element.offsetWidth - element.clientWidth;
  element.remove();

  return scrollWidth;
}

export function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

export function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}