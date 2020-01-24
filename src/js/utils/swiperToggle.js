import Swiper from 'Swiper';

export default function swiperToggle(initialized, element, options) {
  if (initialized) {
    if (!element.swiper) {
      return new Swiper(element, options);
    }
  } else {
    if (element.swiper) {
      element.swiper.destroy();
    }
  }
};
