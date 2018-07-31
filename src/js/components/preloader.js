import { documentLoaded } from '../helpers/functions';


documentLoaded(() => {
  preloaderLoad();
});


function preloaderLoad({selector = '#preloader', transition = 1000} = {}) {
  const preloader = document.querySelector(selector);
  if (!preloader) return;

  preloader.style.transition = `opacity ${transition}ms ease, visibility ${transition}ms ease`;
  preloader.classList.add('loaded');
  setTimeout(() => preloader.remove(), transition);
}
