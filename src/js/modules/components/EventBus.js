export default class EventBus {
  constructor() {
    this.channels = {};
  }

  subscribe(channelName, listener) {
    if (!this.channels[channelName]) {
      this.channels[channelName] = [];
    }

    this.channels[channelName].push(listener);
  }

  publish(channelName, data) {
    if (this.channels[channelName]) {
      this.channels[channelName].forEach(listener => listener(data));
    }
  }
}
