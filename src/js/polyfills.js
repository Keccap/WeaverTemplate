// SVG-SPRITES
import 'vendor/_polyfills/svg-sprite/svgxuse.min';

// JS
import 'whatwg-fetch';
import 'vendor/_polyfills/js/Performance.now';
import 'vendor/_polyfills/js/requestAnimationFrame';
import 'vendor/_polyfills/js/Array.prototype.find';
import 'vendor/_polyfills/js/Array.prototype.includes';
import 'vendor/_polyfills/js/String.prototype.includes';


// DOM
import 'vendor/_polyfills/js/DOM/Element.matches';
import 'vendor/_polyfills/js/DOM/Element.closest'; // зависимость - Element.matches
import 'vendor/_polyfills/js/DOM/Node.remove';
import 'vendor/_polyfills/js/DOM/Node.after';
import 'vendor/_polyfills/js/DOM/Node.before';
import 'vendor/_polyfills/js/DOM/Node.replaceWith';
import 'vendor/_polyfills/js/DOM/ParentNode.append';
import 'vendor/_polyfills/js/DOM/ParentNode.prepend';

// customElements
// import 'vendor/_polyfills/customElements/document-register-element.max';

// WEBPACK
import Promise from 'babel-runtime/core-js/promise';
if (!('Promise' in window)) window.Promise = Promise;
