/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.11.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var t = "object" == typeof global && global && global.Object === Object && global, e = "object" == typeof self && self && self.Object === Object && self, o = t || e || Function("return this")(), l = o.Symbol, n = Object.prototype, r = n.hasOwnProperty, c = n.toString, a = l ? l.toStringTag : void 0, b = Object.prototype.toString, i = l ? l.toStringTag : void 0;
function f(t2) {
  return null == t2 ? void 0 === t2 ? "[object Undefined]" : "[object Null]" : i && i in Object(t2) ? function(t3) {
    var e2 = r.call(t3, a), o2 = t3[a];
    try {
      t3[a] = void 0;
      var l2 = true;
    } catch (t4) {
    }
    var n2 = c.call(t3);
    return l2 && (e2 ? t3[a] = o2 : delete t3[a]), n2;
  }(t2) : function(t3) {
    return b.call(t3);
  }(t2);
}
function u(t2) {
  return null != t2 && "object" == typeof t2;
}
export {
  l as S,
  f as b,
  t as f,
  u as i,
  o as r
};
//# sourceMappingURL=isObjectLike-DmmXH0U-.js.map
