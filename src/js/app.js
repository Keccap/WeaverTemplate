import { documentReady, documentLoaded, throttle } from './general/functions';
import globals from './modules/globals';
import sitePreloader from './modules/site-preloader';



documentReady(() => {
  sitePreloader.init();
});


function onResize() {
  const windowWidth = $(window).width();
  if (windowWidth !== globals.windowWidth) {
    globals.windowWidth = windowWidth;
  }
}
window.addEventListener('resize', throttle(onResize, 200));


documentLoaded(() => {

});
