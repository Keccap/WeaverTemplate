// GRID
import './grid/Element.classList.js';
import './grid/checkSupports.js';


// SVG-SPRITES
import './svg-sprite/svgxuse/svgxuse.min.js';


// JS
import './js/Performance.now.js';
import './js/requestAnimationFrame.js';


// DOM
import './js/DOM/Element.matches.js';
import './js/DOM/Element.closest.js'; // зависимость - Element.matches
import './js/DOM/Node.remove.js';
import './js/DOM/Node.after.js';
import './js/DOM/Node.before.js';
import './js/DOM/Node.replaceWith.js';
import './js/DOM/ParentNode.append.js';
import './js/DOM/ParentNode.prepend.js';


// CSS
import './css/object-fit-images/my-lazySizes-version/OFLwithLazyload.js';


// WEBPACK
import Promise from 'babel-runtime/core-js/promise';
if (!('Promise' in window)) window.Promise = Promise;
