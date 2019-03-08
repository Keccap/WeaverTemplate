export default class EventEmitter {
  constructor() {
    this.channels = {};
  }

  subscribe(channelName, listener) {
    if (!this.channels[channelName]) {
      this.channels[channelName] = [];
    }

    if (this.channels[channelName].indexOf(listener) === -1
      && typeof listener === 'function') {
      this.channels[channelName].push(listener);
    }
  }

  unsubscribe(channelName, listener) {
    if (!this.channels[channelName]) return;

    if (this.channels[channelName].indexOf(listener) !== -1) {
      this.channels[channelName] = this.channels[channelName].filter(l => l !== listener);
    }
  }

  publish(channelName, data) {
    if (this.channels[channelName]) {
      this.channels[channelName].forEach(listener => listener(data));
    }
  }
}
