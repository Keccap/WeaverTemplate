// SVG-SPRITES
import 'vendor/_polyfills/svg-sprite/svgxuse/svgxuse.min.js';

// JS
import 'vendor/_polyfills/js/Performance.now.js';
import 'vendor/_polyfills/js/requestAnimationFrame.js';

// DOM
import 'vendor/_polyfills/js/DOM/Element.matches.js';
import 'vendor/_polyfills/js/DOM/Element.closest.js'; // зависимость - Element.matches
import 'vendor/_polyfills/js/DOM/Node.remove.js';
import 'vendor/_polyfills/js/DOM/Node.after.js';
import 'vendor/_polyfills/js/DOM/Node.before.js';
import 'vendor/_polyfills/js/DOM/Node.replaceWith.js';
import 'vendor/_polyfills/js/DOM/ParentNode.append.js';
import 'vendor/_polyfills/js/DOM/ParentNode.prepend.js';

// customElements
// import 'vendor/_polyfills/document-register-element.max.js';

// WEBPACK
import Promise from 'babel-runtime/core-js/promise';
if (!('Promise' in window)) window.Promise = Promise;
