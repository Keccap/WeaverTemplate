import getScrollWidth from '../../utils/getScrollWidth';

export default {
  init() {
    this.calculate();
  },
  calculate() {
    const scrollWidth = getScrollWidth();
    document.documentElement.style.setProperty('--scroll-width', `${scrollWidth}px`);
  }
};
