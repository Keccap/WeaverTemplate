export default function delegate(elem, targetSelector, eventName, cb, flag = false) {

  if (!elem || !elem.addEventListener) throw new Error('Cannot delegate of not element node');

  function handler(event) {
    const target = event.target.closest(targetSelector);
    if (!target) return;

    cb.call(target, event);
  }

  elem.addEventListener(eventName, handler, flag);
}
