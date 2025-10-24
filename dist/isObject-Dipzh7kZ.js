/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var t = "object" == typeof global && global && global.Object === Object && global, e = "object" == typeof self && self && self.Object === Object && self, o = t || e || Function("return this")(), n = o.Symbol, l = Object.prototype, r = l.hasOwnProperty, c = l.toString, a = n ? n.toStringTag : void 0, b = Object.prototype.toString, i = n ? n.toStringTag : void 0;
function u(t2) {
  return null == t2 ? void 0 === t2 ? "[object Undefined]" : "[object Null]" : i && i in Object(t2) ? function(t3) {
    var e2 = r.call(t3, a), o2 = t3[a];
    try {
      t3[a] = void 0;
      var n2 = true;
    } catch (t4) {
    }
    var l2 = c.call(t3);
    return n2 && (e2 ? t3[a] = o2 : delete t3[a]), l2;
  }(t2) : function(t3) {
    return b.call(t3);
  }(t2);
}
function f(t2) {
  return null != t2 && "object" == typeof t2;
}
function j(t2) {
  var e2 = typeof t2;
  return null != t2 && ("object" == e2 || "function" == e2);
}
export {
  n as S,
  j as a,
  u as b,
  t as f,
  f as i,
  o as r
};
//# sourceMappingURL=isObject-Dipzh7kZ.js.map
