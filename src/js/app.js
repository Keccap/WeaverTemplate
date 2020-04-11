import './modules/sitePreloader';
import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';

import cssVars from './modules/cssVars';
import resize from './modules/resize';
import lazyload from './modules/lazyload';

documentReady(() => {
  cssVars.init();
  resize.init();
  lazyload.init();
});

documentLoaded(() => {

});
