/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.17.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { a as t, b as e, r, i as o, f as n } from "./isObject-Dipzh7kZ.js";
var a = Array.isArray, i = "[object AsyncFunction]", s = "[object Function]", u = "[object GeneratorFunction]", c = "[object Proxy]";
function p(r2) {
  if (!t(r2)) return false;
  var o2 = e(r2);
  return o2 == s || o2 == u || o2 == i || o2 == c;
}
var _, h = r["__core-js_shared__"], f = (_ = /[^.]+$/.exec(h && h.keys && h.keys.IE_PROTO || "")) ? "Symbol(src)_1." + _ : "", l = Function.prototype.toString;
function y(t2) {
  if (null != t2) {
    try {
      return l.call(t2);
    } catch (t3) {
    }
    try {
      return t2 + "";
    } catch (t3) {
    }
  }
  return "";
}
var d = /^\[object .+?Constructor\]$/, b = Function.prototype, v = Object.prototype, j = b.toString, g = v.hasOwnProperty, m = RegExp("^" + j.call(g).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function z(e2, r2) {
  var o2 = function(t2, e3) {
    return null == t2 ? void 0 : t2[e3];
  }(e2, r2);
  return function(e3) {
    return !(!t(e3) || (r3 = e3, f && f in r3)) && (p(e3) ? m : d).test(y(e3));
    var r3;
  }(o2) ? o2 : void 0;
}
var A = 9007199254740991, O = /^(?:0|[1-9]\d*)$/;
function x(t2, e2) {
  var r2 = typeof t2;
  return !!(e2 = null == e2 ? A : e2) && ("number" == r2 || "symbol" != r2 && O.test(t2)) && t2 > -1 && t2 % 1 == 0 && t2 < e2;
}
function w(t2, e2) {
  return t2 === e2 || t2 != t2 && e2 != e2;
}
var F = 9007199254740991;
function P(t2) {
  return "number" == typeof t2 && t2 > -1 && t2 % 1 == 0 && t2 <= F;
}
function S(t2) {
  return null != t2 && P(t2.length) && !p(t2);
}
var $ = Object.prototype;
function T(t2) {
  var e2 = t2 && t2.constructor;
  return t2 === ("function" == typeof e2 && e2.prototype || $);
}
function U(t2) {
  return o(t2) && "[object Arguments]" == e(t2);
}
var E = Object.prototype, I = E.hasOwnProperty, k = E.propertyIsEnumerable, B = U(/* @__PURE__ */ function() {
  return arguments;
}()) ? U : function(t2) {
  return o(t2) && I.call(t2, "callee") && !k.call(t2, "callee");
}, M = "object" == typeof exports && exports && !exports.nodeType && exports, R = M && "object" == typeof module && module && !module.nodeType && module, q = R && R.exports === M ? r.Buffer : void 0, C = (q ? q.isBuffer : void 0) || function() {
  return false;
}, D = {};
D["[object Float32Array]"] = D["[object Float64Array]"] = D["[object Int8Array]"] = D["[object Int16Array]"] = D["[object Int32Array]"] = D["[object Uint8Array]"] = D["[object Uint8ClampedArray]"] = D["[object Uint16Array]"] = D["[object Uint32Array]"] = true, D["[object Arguments]"] = D["[object Array]"] = D["[object ArrayBuffer]"] = D["[object Boolean]"] = D["[object DataView]"] = D["[object Date]"] = D["[object Error]"] = D["[object Function]"] = D["[object Map]"] = D["[object Number]"] = D["[object Object]"] = D["[object RegExp]"] = D["[object Set]"] = D["[object String]"] = D["[object WeakMap]"] = false;
var G, L = "object" == typeof exports && exports && !exports.nodeType && exports, N = L && "object" == typeof module && module && !module.nodeType && module, V = N && N.exports === L && n.process, W = function() {
  try {
    return N && N.require && N.require("util").types || V && V.binding && V.binding("util");
  } catch (t2) {
  }
}(), H = W && W.isTypedArray, J = H ? (G = H, function(t2) {
  return G(t2);
}) : function(t2) {
  return o(t2) && P(t2.length) && !!D[e(t2)];
}, K = Object.prototype.hasOwnProperty;
function Q(t2, e2) {
  var r2 = a(t2), o2 = !r2 && B(t2), n2 = !r2 && !o2 && C(t2), i2 = !r2 && !o2 && !n2 && J(t2), s2 = r2 || o2 || n2 || i2, u2 = s2 ? function(t3, e3) {
    for (var r3 = -1, o3 = Array(t3); ++r3 < t3; ) o3[r3] = e3(r3);
    return o3;
  }(t2.length, String) : [], c2 = u2.length;
  for (var p2 in t2) !e2 && !K.call(t2, p2) || s2 && ("length" == p2 || n2 && ("offset" == p2 || "parent" == p2) || i2 && ("buffer" == p2 || "byteLength" == p2 || "byteOffset" == p2) || x(p2, c2)) || u2.push(p2);
  return u2;
}
function X(t2, e2) {
  return function(r2) {
    return t2(e2(r2));
  };
}
var Y = z(Object, "create"), Z = Object.prototype.hasOwnProperty, tt = Object.prototype.hasOwnProperty;
function et(t2) {
  var e2 = -1, r2 = null == t2 ? 0 : t2.length;
  for (this.clear(); ++e2 < r2; ) {
    var o2 = t2[e2];
    this.set(o2[0], o2[1]);
  }
}
function rt(t2, e2) {
  for (var r2 = t2.length; r2--; ) if (w(t2[r2][0], e2)) return r2;
  return -1;
}
et.prototype.clear = function() {
  this.__data__ = Y ? Y(null) : {}, this.size = 0;
}, et.prototype.delete = function(t2) {
  var e2 = this.has(t2) && delete this.__data__[t2];
  return this.size -= e2 ? 1 : 0, e2;
}, et.prototype.get = function(t2) {
  var e2 = this.__data__;
  if (Y) {
    var r2 = e2[t2];
    return "__lodash_hash_undefined__" === r2 ? void 0 : r2;
  }
  return Z.call(e2, t2) ? e2[t2] : void 0;
}, et.prototype.has = function(t2) {
  var e2 = this.__data__;
  return Y ? void 0 !== e2[t2] : tt.call(e2, t2);
}, et.prototype.set = function(t2, e2) {
  var r2 = this.__data__;
  return this.size += this.has(t2) ? 0 : 1, r2[t2] = Y && void 0 === e2 ? "__lodash_hash_undefined__" : e2, this;
};
var ot = Array.prototype.splice;
function nt(t2) {
  var e2 = -1, r2 = null == t2 ? 0 : t2.length;
  for (this.clear(); ++e2 < r2; ) {
    var o2 = t2[e2];
    this.set(o2[0], o2[1]);
  }
}
nt.prototype.clear = function() {
  this.__data__ = [], this.size = 0;
}, nt.prototype.delete = function(t2) {
  var e2 = this.__data__, r2 = rt(e2, t2);
  return !(r2 < 0 || (r2 == e2.length - 1 ? e2.pop() : ot.call(e2, r2, 1), --this.size, 0));
}, nt.prototype.get = function(t2) {
  var e2 = this.__data__, r2 = rt(e2, t2);
  return r2 < 0 ? void 0 : e2[r2][1];
}, nt.prototype.has = function(t2) {
  return rt(this.__data__, t2) > -1;
}, nt.prototype.set = function(t2, e2) {
  var r2 = this.__data__, o2 = rt(r2, t2);
  return o2 < 0 ? (++this.size, r2.push([t2, e2])) : r2[o2][1] = e2, this;
};
var at = z(r, "Map");
function it(t2, e2) {
  var r2, o2, n2 = t2.__data__;
  return ("string" == (o2 = typeof (r2 = e2)) || "number" == o2 || "symbol" == o2 || "boolean" == o2 ? "__proto__" !== r2 : null === r2) ? n2["string" == typeof e2 ? "string" : "hash"] : n2.map;
}
function st(t2) {
  var e2 = -1, r2 = null == t2 ? 0 : t2.length;
  for (this.clear(); ++e2 < r2; ) {
    var o2 = t2[e2];
    this.set(o2[0], o2[1]);
  }
}
function ut(t2) {
  var e2 = this.__data__ = new nt(t2);
  this.size = e2.size;
}
st.prototype.clear = function() {
  this.size = 0, this.__data__ = { hash: new et(), map: new (at || nt)(), string: new et() };
}, st.prototype.delete = function(t2) {
  var e2 = it(this, t2).delete(t2);
  return this.size -= e2 ? 1 : 0, e2;
}, st.prototype.get = function(t2) {
  return it(this, t2).get(t2);
}, st.prototype.has = function(t2) {
  return it(this, t2).has(t2);
}, st.prototype.set = function(t2, e2) {
  var r2 = it(this, t2), o2 = r2.size;
  return r2.set(t2, e2), this.size += r2.size == o2 ? 0 : 1, this;
}, ut.prototype.clear = function() {
  this.__data__ = new nt(), this.size = 0;
}, ut.prototype.delete = function(t2) {
  var e2 = this.__data__, r2 = e2.delete(t2);
  return this.size = e2.size, r2;
}, ut.prototype.get = function(t2) {
  return this.__data__.get(t2);
}, ut.prototype.has = function(t2) {
  return this.__data__.has(t2);
}, ut.prototype.set = function(t2, e2) {
  var r2 = this.__data__;
  if (r2 instanceof nt) {
    var o2 = r2.__data__;
    if (!at || o2.length < 199) return o2.push([t2, e2]), this.size = ++r2.size, this;
    r2 = this.__data__ = new st(o2);
  }
  return r2.set(t2, e2), this.size = r2.size, this;
};
var ct = r.Uint8Array;
export {
  at as M,
  ut as S,
  ct as U,
  S as a,
  Q as b,
  a as c,
  st as d,
  w as e,
  C as f,
  z as g,
  J as h,
  T as i,
  x as j,
  B as k,
  p as l,
  X as o,
  y as t
};
//# sourceMappingURL=_Uint8Array-Cf-PTZCw.js.map
