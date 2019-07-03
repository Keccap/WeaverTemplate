import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';
import sitePreloader from './modules/sitePreloader';


documentReady(() => {
  sitePreloader.init();
});


documentLoaded(() => {

});
