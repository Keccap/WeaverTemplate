import dispatcher from '../dispatcher';
import isTouchDevice from '../../utils/isTouchDevice';

export default {
  init() {
    this.calculate();
    this.handleResize();
  },
  calculate() {
    const vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${ vh }px`);
  },
  handleResize() {
    dispatcher.subscribe(({ type }) => {
      const targetType = isTouchDevice() ? 'resize:both' : 'resize:height';

      if (type === targetType) {
        this.calculate();
      }
    });
  },
};
