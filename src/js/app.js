import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';
import sitePreloader from './modules/site-preloader';


documentReady(() => {
  sitePreloader.init();
});


documentLoaded(() => {

});
