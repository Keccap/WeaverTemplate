;(function(global, window, document, undefined) {
  'use strict';

  noDragElements('img, a');



  // onload
  window.onload = function() {
    
    OFLwithLazyload()

    // preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('loaded');
      setTimeout(() => {
        preloader.classList.add('no-anim');
      }, 1000)
    }

    // aos

    // ...


  };
  // onload end



  function noDragElements(selector) {
    const noDragObjects = document.querySelectorAll(selector);
    Array.prototype.forEach.call(noDragObjects, el => {
      el.addEventListener("dragstart", event => event.preventDefault()); 
    })
  }

  function OFLwithLazyload() {
    objectFitImages('img:not(.lazyload)');
    OFIbyLazyloadEvent();

    function OFIbyLazyloadEvent() {
      var imgs = document.getElementsByTagName('img');
      if (imgs === null) {
        return;
      }
      Array.prototype.forEach.call(imgs, function(img) {
        img.addEventListener('lazyloaded', function() {
          objectFitImages('img.lazyloaded')
        });
      });
    }
  }



})(this, window, window.document);
 