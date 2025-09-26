/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.2.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var t="object"==typeof global&&global&&global.Object===Object&&global,e="object"==typeof self&&self&&self.Object===Object&&self,o=t||e||Function("return this")(),r=o.Symbol,l=Object.prototype,n=l.hasOwnProperty,c=l.toString,b=r?r.toStringTag:void 0,a=Object.prototype.toString,i=r?r.toStringTag:void 0;exports.Symbol=r,exports.baseGetTag=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":i&&i in Object(t)?function(t){var e=n.call(t,b),o=t[b];try{t[b]=void 0;var r=!0}catch(a){}var l=c.call(t);return r&&(e?t[b]=o:delete t[b]),l}(t):(e=t,a.call(e));var e},exports.freeGlobal=t,exports.isObject=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)},exports.isObjectLike=function(t){return null!=t&&"object"==typeof t},exports.root=o;
//# sourceMappingURL=isObject-D1wTAyjh.cjs.map
