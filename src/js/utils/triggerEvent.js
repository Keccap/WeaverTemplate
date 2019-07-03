export const trigger = (element, eventName) => {
  if (typeof Event === 'function') {
    element.dispatchEvent(new Event(String(eventName)));
  } else {
    const event = document.createEvent('Event');
    event.initEvent(String(eventName), false, true);
    element.dispatchEvent(event);
  }
};

export const triggerAsync = (element, eventName) => {
  setTimeout(() => {
    trigger(element, eventName);
  }, 0);
};

export default trigger;
