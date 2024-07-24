/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.12.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var t={exports:{}},e=t.exports=n,r=/^\[object (.*)\]$/;
/*!
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Primary Exports
 */function n(t){var e=Object.prototype.toString.call(t).match(r)[1].toLowerCase();return"function"==typeof Promise&&t instanceof Promise?"promise":null===t?"null":void 0===t?"undefined":e}function o(){if(!(this instanceof o))return new o;this.tests={}}e.Library=o,o.prototype.of=n,o.prototype.define=function(t,e){return 1===arguments.length?this.tests[t]:(this.tests[t]=e,this)},o.prototype.test=function(t,e){if(e===n(t))return!0;var r=this.tests[e];if(r&&"regexp"===n(r))return r.test(t);if(r&&"function"===n(r))return r(t);throw new ReferenceError('Type test "'+e+'" not defined or invalid.')};var i=t.exports;exports.typeExports=i;
//# sourceMappingURL=type-KOUr406I.cjs.map
