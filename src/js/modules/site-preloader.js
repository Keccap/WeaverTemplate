import Mediator from './Mediator';


export default {
  images: null,
  backgroundEls: null,
  imagesNumber: 0,
  imagesLoaded: 0,
  transition: 1000,

  init() {
    this.images = [...document.images];
    this.backgroundEls = [...document.querySelectorAll('.js-preloader-bg')];

    const imagesPaths = this.images.map(image => image.src);
    const backgroundPaths = this.backgroundEls.map(elem => {
      const backgroundImage = window.getComputedStyle(elem, false).backgroundImage;
      return backgroundImage.slice(4, -1).replace(/"/g, '');
    });
    const allPaths = [...imagesPaths, ...backgroundPaths];

    this.imagesNumber = allPaths.length;

    if (this.imagesNumber) {
      allPaths.forEach(imagesPath => {
        const clone = new Image();
        clone.addEventListener('load', this.imageLoaded.bind(this));
        clone.addEventListener('error', this.imageLoaded.bind(this));
        clone.src = imagesPath;
      });
    } else {
      this.preloaderHide();
    }
  },

  preloaderHide(selector = '#site-preloader', transition = this.transition) {
    const preloader = document.querySelector(selector);
    if (!preloader) return;

    Mediator.publish('site-preloader.hiding');

    preloader.style.transition = `opacity ${transition}ms ease, visibility ${transition}ms ease`;
    preloader.classList.add('_loaded');
    document.body.classList.add('_site-loaded');

    setTimeout(() => {
      Mediator.publish('site-preloader.removed');

      preloader.remove();
      document.body.classList.add('_preloader-hidden');
    }, transition);
  },


  imageLoaded() {
    this.imagesLoaded++;

    if (this.imagesLoaded >= this.imagesNumber) {
      this.preloaderHide();
    }
  }
};
