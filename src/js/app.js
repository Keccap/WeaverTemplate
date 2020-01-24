import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';
import sitePreloader from './modules/sitePreloader';
import cssVars from './modules/cssVars';
import resize from './modules/resize';

documentReady(() => {
  sitePreloader.init();
  cssVars.init();
  resize.init();
});


documentLoaded(() => {

});
