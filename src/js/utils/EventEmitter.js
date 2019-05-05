export default class EventEmitter {
  constructor() {
    this._handlers = [];
  }

  dispatch(event) {
    this._handlers.forEach(handler => {
      handler(event);
    });
  }

  subscribe(handler) {
    if (this._handlers.indexOf(handler) === -1
      && typeof handler === 'function') {
      this._handlers.push(handler);
    }
  }

  unsubscribe(handler) {
    this._handlers = this._handlers.filter(h => h !== handler);
  }
}
