import { documentReady, documentLoaded, throttle } from './helpers/functions';
import globals from './modules/globals';
import sitePreloader from './modules/site-preloader';



documentReady(() => {
  sitePreloader.init();
});


function onResize() {
  if ($(window).width() !== globals.windowWidth) {
    globals.windowWidth = $(window).width();
  }
}

window.addEventListener('resize', throttle(onResize, 200));


documentLoaded(() => {

});
