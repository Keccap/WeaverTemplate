import config from '../modules/config';

export default class EventEmitter_new {
  constructor() {
    this._handlers = {
      all: []
    };
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

    this._handlers[channel].forEach(function(handler) {
      handler(event);
    });

    if (channel !== 'all') {
      this._handlers['all'].forEach(function(handler) {
        handler(event);
      });
    }
  }

  subscribe(channel, handler) {
    if (!handler) {
      handler = channel;
      channel = 'all';
    }

    if (typeof handler !== 'function') {
      if (config.dev) {
        console.log('handler has to be a function');
      }
      return;
    }

    if (!this._handlers.hasOwnProperty(channel)) {
      this._handlers[channel] = [];
    }

    if (this._handlers[channel].indexOf(handler) === -1) {
      this._handlers[channel].push(handler);
    } else {
      if (config.dev) {
        console.log('handler already set');
        console.log(handler);
      }
      return;
    }
  }

  unsubscribe(channel, handler) {
    if (!handler) {
      handler = channel;
      channel = 'all';
    }

    if (typeof handler !== 'function') {
      if (config.dev) {
        console.log('handler has to be a function');
      }
      return;
    }

    if (!this._handlers[channel]) {
      if (config.dev) {
        console.log('channel ' + channel + '  does not exist');
      }
      return;
    }

    if (this._handlers[channel].indexOf(handler) === -1) {
      if (config.dev) {
        console.log(handler);
        console.log('trying to unsubscribe unexisting handler');
      }
      return;
    }
    this._handlers[channel] = this._handlers[channel].filter(function(h) {
      return h !== handler;
    });
  }
}
