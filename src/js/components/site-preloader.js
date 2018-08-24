import { documentReady } from '../helpers/functions';


documentReady(() => {
  const images = document.images;
  const imagesCount = images.length;
  let currentLoaded = 0;

  if (imagesCount) {
    for (let i = 0; i < imagesCount; i++) {
      const clone = new Image();
      clone.addEventListener('load', imageLoaded);
      clone.addEventListener('error', imageLoaded);
      clone.src = images[i].src;
    }
  } else {
    preloaderLoad();
  }

  function imageLoaded() {
    currentLoaded++;

    if (currentLoaded >= imagesCount) {
      preloaderLoad();
    }
  }
});





function preloaderLoad({selector = '#preloader', transition = 1000} = {}) {
  const preloader = document.querySelector(selector);
  if (!preloader) return;

  preloader.style.transition = `opacity ${transition}ms ease, visibility ${transition}ms ease`;
  preloader.classList.add('loaded');
  setTimeout(() => preloader.remove(), transition);
}
