/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.13.2
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var t="object"==typeof global&&global&&global.Object===Object&&global,e="object"==typeof self&&self&&self.Object===Object&&self,o=t||e||Function("return this")(),l=o.Symbol,r=Object.prototype,c=r.hasOwnProperty,n=r.toString,b=l?l.toStringTag:void 0,a=Object.prototype.toString,i=l?l.toStringTag:void 0;exports.Symbol=l,exports.baseGetTag=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":i&&i in Object(t)?function(t){var e=c.call(t,b),o=t[b];try{t[b]=void 0;var l=!0}catch(a){}var r=n.call(t);return l&&(e?t[b]=o:delete t[b]),r}(t):(e=t,a.call(e));var e},exports.freeGlobal=t,exports.isObjectLike=function(t){return null!=t&&"object"==typeof t},exports.root=o;
//# sourceMappingURL=isObjectLike-DLI4XyQI.cjs.map
