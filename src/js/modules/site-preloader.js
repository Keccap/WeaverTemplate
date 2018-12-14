import PubSub from './PubSub';


export default {
  imagesNumber: 0,
  imagesLoaded: 0,
  transition: 1000,

  init() {
    const images = [...document.images];
    this.imagesNumber = images.length;

    if (this.imagesNumber) {
      images.forEach(image => {
        const clone = new Image();
        clone.addEventListener('load', this.imageLoaded.bind(this));
        clone.addEventListener('error', this.imageLoaded.bind(this));
        clone.src = image.src;
      });
    } else {
      this.preloaderHide();
    }
  },

  preloaderHide(selector = '#site-preloader', transition = this.transition) {
    const preloader = document.querySelector(selector);
    if (!preloader) return;

    preloader.style.transition = `opacity ${transition}ms ease, visibility ${transition}ms ease`;
    preloader.classList.add('_loaded');
    PubSub.publish('site-preloader.hiding');

    setTimeout(() => {
      preloader.remove();
      PubSub.publish('site-preloader.removed');
    }, transition);
  },


  imageLoaded() {
    this.imagesLoaded++;

    if (this.imagesLoaded >= this.imagesNumber) {
      this.preloaderHide();
    }
  }
};
