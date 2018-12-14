export default class EventObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(
      observer => observer !== fn
    );
  }

  broadcast(data) {
    this.observers.forEach(observer => observer(data));
  }
}
