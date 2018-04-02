

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
