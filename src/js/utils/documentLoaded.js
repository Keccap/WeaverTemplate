/**
 * Wait until document is loaded to run method
 * @param  {Function} fn Method to run
 */
export default function documentLoaded(fn) {
  // Sanity check
  if (typeof fn !== 'function') return;

  // If document is already loaded, run method
  if (document.readyState === 'complete') {
    return fn();
  }

  // Otherwise, wait until document is loaded
  window.addEventListener('load', fn, false);
}
