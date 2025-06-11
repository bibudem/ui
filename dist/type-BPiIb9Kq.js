/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.22.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var t = { exports: {} }, e = t.exports = n, r = /^\[object (.*)\]$/;
/*!
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Primary Exports
 */
function n(t2) {
  var e2 = Object.prototype.toString.call(t2).match(r)[1].toLowerCase();
  return "function" == typeof Promise && t2 instanceof Promise ? "promise" : null === t2 ? "null" : void 0 === t2 ? "undefined" : e2;
}
function o() {
  if (!(this instanceof o)) return new o();
  this.tests = {};
}
e.Library = o, o.prototype.of = n, o.prototype.define = function(t2, e2) {
  return 1 === arguments.length ? this.tests[t2] : (this.tests[t2] = e2, this);
}, o.prototype.test = function(t2, e2) {
  if (e2 === n(t2)) return true;
  var r2 = this.tests[e2];
  if (r2 && "regexp" === n(r2)) return r2.test(t2);
  if (r2 && "function" === n(r2)) return r2(t2);
  throw new ReferenceError('Type test "' + e2 + '" not defined or invalid.');
};
var i = t.exports;
export {
  i as t
};
//# sourceMappingURL=type-BPiIb9Kq.js.map
