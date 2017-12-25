

if (window.lazySizes && window.AOS) {
  AOSwithLazyload();
}

// AOS + LAZYSIZES
function AOSwithLazyload() {
  var imgs = document.getElementsByTagName('img');
  if (imgs === null) {
    return;
  }
  Array.prototype.forEach.call(imgs, function(img) {
    img.addEventListener('load', function() {
      AOS.refresh();
    });
  });
}