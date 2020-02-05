export default class EventEmitter {
  constructor() {
    this._handlers = {
      all: []
    };
    this._frozen = false;
  }

  dispatch(channel, event) {
    if (!event) {
      event = channel;
      channel = 'all';
    }

    if (event && event.type.indexOf(':')) {
      channel = event.type.split(':')[0];
    }

    if (!this._handlers.hasOwnProperty(channel)) {
      this._handlers[channel] = [];
    }

    this._frozen = true;

    this._handlers[channel].forEach(handler => handler(event));

    if (channel !== 'all') {
      this._handlers['all'].forEach(handler => handler(event));
    }

    this._frozen = false;
  }

  subscribe(channel, handler) {
    if (!handler) {
      handler = channel;
      channel = 'all';
    }

    if (this._frozen) {
      console.error('trying to subscribe to EventEmitter while dispatch is working');
    }

    if (typeof handler !== 'function') {
      console.error('handler has to be a function');
      return;
    }

    if (!this._handlers.hasOwnProperty(channel)) {
      this._handlers[channel] = [];
    }

    if (this._handlers[channel].indexOf(handler) === -1) {
      this._handlers[channel].push(handler);
    } else {
      console.error('handler already set');
    }
  }

  unsubscribe(channel, handler) {
    if (!handler) {
      handler = channel;
      channel = 'all';
    }

    if (this._frozen) {
      console.error('trying to unsubscribe from EventEmitter while dispatch is working');
    }

    if (typeof handler !== 'function') {
      console.error('handler has to be a function');
    }

    if (!this._handlers[channel]) {
      console.error('channel ' + channel + ' does not exist');
      return;
    }

    if (this._handlers[channel].indexOf(handler) === -1) {
      console.log(handler);
      console.error('trying to unsubscribe unexisting handler');
      return;
    }

    this._handlers[channel] = this._handlers[channel].filter((h) => h !== handler);
  }
}
