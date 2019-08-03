import Swiper from 'Swiper';
import dispatcher from './dispatcher';

export default {
  init() {
    this.sliderExample();
    this.handleEvents();
    this.handleDispatcher();
  },

  handleEvents() {

  },

  handleDispatcher() {
    dispatcher.subscribe(event => {
      const { type } = event;
      if (type === 'example-slider:next') {}
      if (type === 'example-slider:prev') {}
    });
  },

  sliderExample() {
    const name = 'js-example-slider';
    const classes = {
      block: name + '-block',
      slider: name,
      wrapper: name + '-wrapper',
      slide: name + '-slide',
      nav: name + '-nav',
      pagination: name + '-pagination',
      prev: 'js-prev',
      next: 'js-next',
      style: {
        bullet: 'slider-pagination__item'
      },
      activeClass: '_active-slide'
    };

    const sliders = [...document.querySelectorAll(`.${classes.block}`)];

    sliders.forEach(block => {
      const slider = block.querySelector(`.${classes.slider}`);
      const nav = block.querySelector(`.${classes.nav}`);
      const pagination = block.querySelector(`.${classes.pagination}`);

      if (!slider || !pagination || !nav) {
        return false;
      }

      new Swiper(slider, {
        slidesPerView: 3, // 'auto'
        spaceBetween: 30,
        centeredSlides: false,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        grabCursor: false,
        wrapperClass: classes.wrapper,
        slideClass: classes.slide,
        slideActiveClass: classes.activeClass,
        navigation: {
          prevEl: nav.querySelector(`.${classes.prev}`),
          nextEl: nav.querySelector(`.${classes.next}`)
        },
        pagination: {
          el: pagination,
          type: 'bullets',
          clickable: true
        },

        breakpoints: {
          767: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      });
    });
  }
};
