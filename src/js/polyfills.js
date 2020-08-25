// JS
import 'core-js/features/promise';
import 'core-js/features/array/find';
import 'core-js/features/string/starts-with';
import 'vendor/_polyfills/js/requestAnimationFrame';

// DOM
import 'vendor/_polyfills/js/DOM/Element.matches';
import 'vendor/_polyfills/js/DOM/Element.closest'; // зависимость - Element.matches
import 'vendor/_polyfills/js/DOM/Node.remove';
import 'vendor/_polyfills/js/DOM/Node.after';
import 'vendor/_polyfills/js/DOM/Node.before';
import 'vendor/_polyfills/js/DOM/Node.replaceWith';
import 'vendor/_polyfills/js/DOM/ParentNode.append';
import 'vendor/_polyfills/js/DOM/ParentNode.prepend';

if (!SVGElement.prototype.contains) {
  SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
}

// customElements
// import 'vendor/_polyfills/customElements/document-register-element.max';
