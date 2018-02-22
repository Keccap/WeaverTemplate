;(function(global, window, document, undefined) {
  'use strict';




  // ONLOAD
  window.addEventListener('load', () => {
    OFIwithLazyload();
    preloaderLoad();
  });
  // ONLOAD END



  function preloaderLoad({selector = '#preloader', transition = 1000} = {}) {
    const preloader = document.querySelector(selector);
    if (!preloader) return;

    preloader.style.transition = `opacity ${transition}ms ease, visibility ${transition}ms ease`;
    preloader.classList.add('loaded');
    setTimeout(() => preloader.remove(), transition);
  }


  function OFIwithLazyload() {
    objectFitImages('img:not(.lazyload)');
    OFIbyLazyloadEvent();

    function OFIbyLazyloadEvent() {
      const imgs = [...document.getElementsByTagName('img')];
      if (!imgs.length) return;

      imgs.forEach(img => {
        img.addEventListener('lazyloaded', () => objectFitImages('img.lazyloaded'));
      });
    }
  }


  function noDragElements(selector) {
    const noDragObjects = [...document.querySelectorAll(selector)];
    noDragObjects.forEach(el => {
      el.addEventListener('dragstart', event => event.preventDefault());
    });
  }


  function throttle(func, ms) {
    let isThrottled = false;
    let savedArgs;
    let savedThis;

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }


})(this, window, window.document);
