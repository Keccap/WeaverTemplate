import dispatcher from './dispatcher';
import documentReady from '../utils/documentReady';

const preloader = {
  el: null,
  images: [],
  backgroundEls: [],
  imagesNumber: 0,
  imagesLoaded: 0,
  transition: 1000,

  init() {
    this.el = document.querySelector('#site-preloader');
    this.images = [...document.images];
    this.backgroundEls = [...document.querySelectorAll('.js-preloader-bg')];

    const imagesPaths = this.images.map((image) => image.src);
    const backgroundPaths = this.backgroundEls.map((elem) => {
      const { backgroundImage } = window.getComputedStyle(elem, false);
      return backgroundImage.slice(4, -1).replace(/"/g, '');
    });
    const allPaths = [...imagesPaths, ...backgroundPaths];

    // eslint-disable-next-line prefer-destructuring
    this.imagesNumber = allPaths.length;

    if (this.imagesNumber) {
      allPaths.forEach((imagesPath) => {
        const clone = new Image();
        clone.addEventListener('load', this.imageLoaded.bind(this));
        clone.addEventListener('error', this.imageLoaded.bind(this));
        clone.src = imagesPath;
      });
    } else {
      this.preloaderHide();
    }
  },

  preloaderHide(transition = this.transition) {
    const { el: preloader } = this;
    if (!preloader) return;

    dispatcher.dispatch({
      type: 'site-preloader:hiding',
    });

    preloader.style.transition = `opacity ${ transition }ms ease, visibility ${ transition }ms ease`;
    preloader.classList.add('_loaded');
    document.body.classList.add('_site-loaded');

    setTimeout(() => {
      dispatcher.dispatch({
        type: 'site-preloader:removed',
      });

      preloader.remove();
      document.body.classList.add('_site-preloader-hidden');
    }, transition);
  },

  imageLoaded() {
    this.imagesLoaded += 1;

    if (this.imagesLoaded >= this.imagesNumber) {
      this.preloaderHide();
    }
  },
};

documentReady(() => {
  preloader.init();
});

export default preloader;
