(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.AOSwithLazyload = factory());
}(this, function() {

  if (window.lazySizes && window.AOS) {
    AOSwithLazyload();
  }

  // AOS + LAZYSIZES
  function AOSwithLazyload() {
    var imgs = document.querySelectorAll('img.lazyload:not([data-aos-lazyfix])');

    if (!imgs.length) return;

    Array.prototype.forEach.call(imgs, function(img) {
      img.addEventListener('load', function() {
        AOS.refresh();
      });
      img.setAttribute('data-aos-lazyfix', '');
    });
  }

  return AOSwithLazyload;
}));
