// onload
window.onload = function() {

  OFLwithLazyload()
  
};
// onload end



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


