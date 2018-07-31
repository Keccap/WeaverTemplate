import { objectFitImages } from '../polyfills/css/object-fit-images/my-lazySizes-version/OFLwithLazyload';
import { documentLoaded } from '../helpers/functions';


documentLoaded(() => {
  OFIwithLazyload();
});


function OFIwithLazyload() {
  objectFitImages('img:not(.lazyload)');

  const imgs = [...document.getElementsByTagName('img')];
  if (!imgs.length) return;

  imgs.forEach(img => {
    img.addEventListener('lazyloaded', () => objectFitImages('img.lazyloaded'));
  });
}
