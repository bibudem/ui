/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _Kt_instances, t_fn;
import { o as t } from "./index-CRxQMTzC.js";
import { E as e, h as r, i as n, j as o, D as a } from "./utils-CIJ6S_fL.js";
import { b as i, r as s, i as c, f as u, S as f } from "./isObjectLike-DmmXH0U-.js";
var p = Array.isArray;
function l(t2) {
  var e2 = typeof t2;
  return null != t2 && ("object" == e2 || "function" == e2);
}
var h = "[object AsyncFunction]", _ = "[object Function]", y = "[object GeneratorFunction]", b = "[object Proxy]";
function v(t2) {
  if (!l(t2)) return false;
  var e2 = i(t2);
  return e2 == _ || e2 == y || e2 == h || e2 == b;
}
var d, j = s["__core-js_shared__"], g = (d = /[^.]+$/.exec(j && j.keys && j.keys.IE_PROTO || "")) ? "Symbol(src)_1." + d : "", w = Function.prototype.toString;
function m(t2) {
  if (null != t2) {
    try {
      return w.call(t2);
    } catch (t3) {
    }
    try {
      return t2 + "";
    } catch (t3) {
    }
  }
  return "";
}
var O = /^\[object .+?Constructor\]$/, A = Function.prototype, P = Object.prototype, z = A.toString, E = P.hasOwnProperty, x = RegExp("^" + z.call(E).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function S(t2, e2) {
  var r2 = function(t3, e3) {
    return null == t3 ? void 0 : t3[e3];
  }(t2, e2);
  return function(t3) {
    return !(!l(t3) || (e3 = t3, g && g in e3)) && (v(t3) ? x : O).test(m(t3));
    var e3;
  }(r2) ? r2 : void 0;
}
var k = S(s, "WeakMap"), D = 9007199254740991, T = /^(?:0|[1-9]\d*)$/;
function B(t2, e2) {
  var r2 = typeof t2;
  return !!(e2 = null == e2 ? D : e2) && ("number" == r2 || "symbol" != r2 && T.test(t2)) && t2 > -1 && t2 % 1 == 0 && t2 < e2;
}
function $(t2, e2) {
  return t2 === e2 || t2 != t2 && e2 != e2;
}
var F = 9007199254740991;
function U(t2) {
  return "number" == typeof t2 && t2 > -1 && t2 % 1 == 0 && t2 <= F;
}
var L = Object.prototype;
function M(t2) {
  return c(t2) && "[object Arguments]" == i(t2);
}
var I = Object.prototype, R = I.hasOwnProperty, V = I.propertyIsEnumerable, q = M(/* @__PURE__ */ function() {
  return arguments;
}()) ? M : function(t2) {
  return c(t2) && R.call(t2, "callee") && !V.call(t2, "callee");
}, C = "object" == typeof exports && exports && !exports.nodeType && exports, N = C && "object" == typeof module && module && !module.nodeType && module, W = N && N.exports === C ? s.Buffer : void 0, G = (W ? W.isBuffer : void 0) || function() {
  return false;
}, H = {};
H["[object Float32Array]"] = H["[object Float64Array]"] = H["[object Int8Array]"] = H["[object Int16Array]"] = H["[object Int32Array]"] = H["[object Uint8Array]"] = H["[object Uint8ClampedArray]"] = H["[object Uint16Array]"] = H["[object Uint32Array]"] = true, H["[object Arguments]"] = H["[object Array]"] = H["[object ArrayBuffer]"] = H["[object Boolean]"] = H["[object DataView]"] = H["[object Date]"] = H["[object Error]"] = H["[object Function]"] = H["[object Map]"] = H["[object Number]"] = H["[object Object]"] = H["[object RegExp]"] = H["[object Set]"] = H["[object String]"] = H["[object WeakMap]"] = false;
var J, K = "object" == typeof exports && exports && !exports.nodeType && exports, Q = K && "object" == typeof module && module && !module.nodeType && module, X = Q && Q.exports === K && u.process, Y = function() {
  try {
    return Q && Q.require && Q.require("util").types || X && X.binding && X.binding("util");
  } catch (t2) {
  }
}(), Z = Y && Y.isTypedArray, tt = Z ? (J = Z, function(t2) {
  return J(t2);
}) : function(t2) {
  return c(t2) && U(t2.length) && !!H[i(t2)];
}, et = Object.prototype.hasOwnProperty, rt = /* @__PURE__ */ function(t2, e2) {
  return function(r2) {
    return t2(e2(r2));
  };
}(Object.keys, Object), nt = Object.prototype.hasOwnProperty;
var ot = S(Object, "create"), at = Object.prototype.hasOwnProperty, it = Object.prototype.hasOwnProperty;
function st(t2) {
  var e2 = -1, r2 = null == t2 ? 0 : t2.length;
  for (this.clear(); ++e2 < r2; ) {
    var n2 = t2[e2];
    this.set(n2[0], n2[1]);
  }
}
function ct(t2, e2) {
  for (var r2 = t2.length; r2--; ) if ($(t2[r2][0], e2)) return r2;
  return -1;
}
st.prototype.clear = function() {
  this.__data__ = ot ? ot(null) : {}, this.size = 0;
}, st.prototype.delete = function(t2) {
  var e2 = this.has(t2) && delete this.__data__[t2];
  return this.size -= e2 ? 1 : 0, e2;
}, st.prototype.get = function(t2) {
  var e2 = this.__data__;
  if (ot) {
    var r2 = e2[t2];
    return "__lodash_hash_undefined__" === r2 ? void 0 : r2;
  }
  return at.call(e2, t2) ? e2[t2] : void 0;
}, st.prototype.has = function(t2) {
  var e2 = this.__data__;
  return ot ? void 0 !== e2[t2] : it.call(e2, t2);
}, st.prototype.set = function(t2, e2) {
  var r2 = this.__data__;
  return this.size += this.has(t2) ? 0 : 1, r2[t2] = ot && void 0 === e2 ? "__lodash_hash_undefined__" : e2, this;
};
var ut = Array.prototype.splice;
function ft(t2) {
  var e2 = -1, r2 = null == t2 ? 0 : t2.length;
  for (this.clear(); ++e2 < r2; ) {
    var n2 = t2[e2];
    this.set(n2[0], n2[1]);
  }
}
ft.prototype.clear = function() {
  this.__data__ = [], this.size = 0;
}, ft.prototype.delete = function(t2) {
  var e2 = this.__data__, r2 = ct(e2, t2);
  return !(r2 < 0 || (r2 == e2.length - 1 ? e2.pop() : ut.call(e2, r2, 1), --this.size, 0));
}, ft.prototype.get = function(t2) {
  var e2 = this.__data__, r2 = ct(e2, t2);
  return r2 < 0 ? void 0 : e2[r2][1];
}, ft.prototype.has = function(t2) {
  return ct(this.__data__, t2) > -1;
}, ft.prototype.set = function(t2, e2) {
  var r2 = this.__data__, n2 = ct(r2, t2);
  return n2 < 0 ? (++this.size, r2.push([t2, e2])) : r2[n2][1] = e2, this;
};
var pt = S(s, "Map");
function lt(t2, e2) {
  var r2, n2, o2 = t2.__data__;
  return ("string" == (n2 = typeof (r2 = e2)) || "number" == n2 || "symbol" == n2 || "boolean" == n2 ? "__proto__" !== r2 : null === r2) ? o2["string" == typeof e2 ? "string" : "hash"] : o2.map;
}
function ht(t2) {
  var e2 = -1, r2 = null == t2 ? 0 : t2.length;
  for (this.clear(); ++e2 < r2; ) {
    var n2 = t2[e2];
    this.set(n2[0], n2[1]);
  }
}
function _t(t2) {
  var e2 = this.__data__ = new ft(t2);
  this.size = e2.size;
}
ht.prototype.clear = function() {
  this.size = 0, this.__data__ = { hash: new st(), map: new (pt || ft)(), string: new st() };
}, ht.prototype.delete = function(t2) {
  var e2 = lt(this, t2).delete(t2);
  return this.size -= e2 ? 1 : 0, e2;
}, ht.prototype.get = function(t2) {
  return lt(this, t2).get(t2);
}, ht.prototype.has = function(t2) {
  return lt(this, t2).has(t2);
}, ht.prototype.set = function(t2, e2) {
  var r2 = lt(this, t2), n2 = r2.size;
  return r2.set(t2, e2), this.size += r2.size == n2 ? 0 : 1, this;
}, _t.prototype.clear = function() {
  this.__data__ = new ft(), this.size = 0;
}, _t.prototype.delete = function(t2) {
  var e2 = this.__data__, r2 = e2.delete(t2);
  return this.size = e2.size, r2;
}, _t.prototype.get = function(t2) {
  return this.__data__.get(t2);
}, _t.prototype.has = function(t2) {
  return this.__data__.has(t2);
}, _t.prototype.set = function(t2, e2) {
  var r2 = this.__data__;
  if (r2 instanceof ft) {
    var n2 = r2.__data__;
    if (!pt || n2.length < 199) return n2.push([t2, e2]), this.size = ++r2.size, this;
    r2 = this.__data__ = new ht(n2);
  }
  return r2.set(t2, e2), this.size = r2.size, this;
};
var yt = Object.prototype.propertyIsEnumerable, bt = Object.getOwnPropertySymbols, vt = bt ? function(t2) {
  return null == t2 ? [] : (t2 = Object(t2), function(e2, r2) {
    for (var n2 = -1, o2 = null == e2 ? 0 : e2.length, a2 = 0, i2 = []; ++n2 < o2; ) {
      var s2 = e2[n2];
      c2 = s2, yt.call(t2, c2) && (i2[a2++] = s2);
    }
    var c2;
    return i2;
  }(bt(t2)));
} : function() {
  return [];
};
function dt(t2) {
  return function(t3, e2, r2) {
    var n2 = function(t4) {
      return null != (e3 = t4) && U(e3.length) && !v(e3) ? function(t5, e4) {
        var r3 = p(t5), n3 = !r3 && q(t5), o2 = !r3 && !n3 && G(t5), a2 = !r3 && !n3 && !o2 && tt(t5), i2 = r3 || n3 || o2 || a2, s2 = i2 ? function(t6, e5) {
          for (var r4 = -1, n4 = Array(t6); ++r4 < t6; ) n4[r4] = e5(r4);
          return n4;
        }(t5.length, String) : [], c2 = s2.length;
        for (var u2 in t5) !et.call(t5, u2) || i2 && ("length" == u2 || o2 && ("offset" == u2 || "parent" == u2) || a2 && ("buffer" == u2 || "byteLength" == u2 || "byteOffset" == u2) || B(u2, c2)) || s2.push(u2);
        return s2;
      }(t4) : function(t5) {
        if (r3 = (e4 = t5) && e4.constructor, e4 !== ("function" == typeof r3 && r3.prototype || L)) return rt(t5);
        var e4, r3, n3 = [];
        for (var o2 in Object(t5)) nt.call(t5, o2) && "constructor" != o2 && n3.push(o2);
        return n3;
      }(t4);
      var e3;
    }(t3);
    return p(t3) ? n2 : function(t4, e3) {
      for (var r3 = -1, n3 = e3.length, o2 = t4.length; ++r3 < n3; ) t4[o2 + r3] = e3[r3];
      return t4;
    }(n2, r2(t3));
  }(t2, 0, vt);
}
var jt = S(s, "DataView"), gt = S(s, "Promise"), wt = S(s, "Set"), mt = "[object Map]", Ot = "[object Promise]", At = "[object Set]", Pt = "[object WeakMap]", zt = "[object DataView]", Et = m(jt), xt = m(pt), St = m(gt), kt = m(wt), Dt = m(k), Tt = i;
(jt && Tt(new jt(new ArrayBuffer(1))) != zt || pt && Tt(new pt()) != mt || gt && Tt(gt.resolve()) != Ot || wt && Tt(new wt()) != At || k && Tt(new k()) != Pt) && (Tt = function(t2) {
  var e2 = i(t2), r2 = "[object Object]" == e2 ? t2.constructor : void 0, n2 = r2 ? m(r2) : "";
  if (n2) switch (n2) {
    case Et:
      return zt;
    case xt:
      return mt;
    case St:
      return Ot;
    case kt:
      return At;
    case Dt:
      return Pt;
  }
  return e2;
});
var Bt = s.Uint8Array;
function $t(t2) {
  var e2 = -1, r2 = null == t2 ? 0 : t2.length;
  for (this.__data__ = new ht(); ++e2 < r2; ) this.add(t2[e2]);
}
function Ft(t2, e2) {
  for (var r2 = -1, n2 = null == t2 ? 0 : t2.length; ++r2 < n2; ) if (e2(t2[r2], r2, t2)) return true;
  return false;
}
$t.prototype.add = $t.prototype.push = function(t2) {
  return this.__data__.set(t2, "__lodash_hash_undefined__"), this;
}, $t.prototype.has = function(t2) {
  return this.__data__.has(t2);
};
var Ut = 1, Lt = 2;
function Mt(t2, e2, r2, n2, o2, a2) {
  var i2 = r2 & Ut, s2 = t2.length, c2 = e2.length;
  if (s2 != c2 && !(i2 && c2 > s2)) return false;
  var u2 = a2.get(t2), f2 = a2.get(e2);
  if (u2 && f2) return u2 == e2 && f2 == t2;
  var p2 = -1, l2 = true, h2 = r2 & Lt ? new $t() : void 0;
  for (a2.set(t2, e2), a2.set(e2, t2); ++p2 < s2; ) {
    var _2 = t2[p2], y2 = e2[p2];
    if (n2) var b2 = i2 ? n2(y2, _2, p2, e2, t2, a2) : n2(_2, y2, p2, t2, e2, a2);
    if (void 0 !== b2) {
      if (b2) continue;
      l2 = false;
      break;
    }
    if (h2) {
      if (!Ft(e2, function(t3, e3) {
        if (i3 = e3, !h2.has(i3) && (_2 === t3 || o2(_2, t3, r2, n2, a2))) return h2.push(e3);
        var i3;
      })) {
        l2 = false;
        break;
      }
    } else if (_2 !== y2 && !o2(_2, y2, r2, n2, a2)) {
      l2 = false;
      break;
    }
  }
  return a2.delete(t2), a2.delete(e2), l2;
}
function It(t2) {
  var e2 = -1, r2 = Array(t2.size);
  return t2.forEach(function(t3, n2) {
    r2[++e2] = [n2, t3];
  }), r2;
}
function Rt(t2) {
  var e2 = -1, r2 = Array(t2.size);
  return t2.forEach(function(t3) {
    r2[++e2] = t3;
  }), r2;
}
var Vt = f ? f.prototype : void 0, qt = Vt ? Vt.valueOf : void 0, Ct = Object.prototype.hasOwnProperty, Nt = "[object Arguments]", Wt = "[object Array]", Gt = "[object Object]", Ht = Object.prototype.hasOwnProperty;
function Jt(t2, e2, r2, n2, o2) {
  return t2 === e2 || (null == t2 || null == e2 || !c(t2) && !c(e2) ? t2 != t2 && e2 != e2 : function(t3, e3, r3, n3, o3, a2) {
    var i2 = p(t3), s2 = p(e3), c2 = i2 ? Wt : Tt(t3), u2 = s2 ? Wt : Tt(e3), f2 = (c2 = c2 == Nt ? Gt : c2) == Gt, l2 = (u2 = u2 == Nt ? Gt : u2) == Gt, h2 = c2 == u2;
    if (h2 && G(t3)) {
      if (!G(e3)) return false;
      i2 = true, f2 = false;
    }
    if (h2 && !f2) return a2 || (a2 = new _t()), i2 || tt(t3) ? Mt(t3, e3, r3, n3, o3, a2) : function(t4, e4, r4, n4, o4, a3, i3) {
      switch (r4) {
        case "[object DataView]":
          if (t4.byteLength != e4.byteLength || t4.byteOffset != e4.byteOffset) return false;
          t4 = t4.buffer, e4 = e4.buffer;
        case "[object ArrayBuffer]":
          return !(t4.byteLength != e4.byteLength || !a3(new Bt(t4), new Bt(e4)));
        case "[object Boolean]":
        case "[object Date]":
        case "[object Number]":
          return $(+t4, +e4);
        case "[object Error]":
          return t4.name == e4.name && t4.message == e4.message;
        case "[object RegExp]":
        case "[object String]":
          return t4 == e4 + "";
        case "[object Map]":
          var s3 = It;
        case "[object Set]":
          var c3 = 1 & n4;
          if (s3 || (s3 = Rt), t4.size != e4.size && !c3) return false;
          var u3 = i3.get(t4);
          if (u3) return u3 == e4;
          n4 |= 2, i3.set(t4, e4);
          var f3 = Mt(s3(t4), s3(e4), n4, o4, a3, i3);
          return i3.delete(t4), f3;
        case "[object Symbol]":
          if (qt) return qt.call(t4) == qt.call(e4);
      }
      return false;
    }(t3, e3, c2, r3, n3, o3, a2);
    if (!(1 & r3)) {
      var _2 = f2 && Ht.call(t3, "__wrapped__"), y2 = l2 && Ht.call(e3, "__wrapped__");
      if (_2 || y2) {
        var b2 = _2 ? t3.value() : t3, v2 = y2 ? e3.value() : e3;
        return a2 || (a2 = new _t()), o3(b2, v2, r3, n3, a2);
      }
    }
    return !!h2 && (a2 || (a2 = new _t()), function(t4, e4, r4, n4, o4, a3) {
      var i3 = 1 & r4, s3 = dt(t4), c3 = s3.length;
      if (c3 != dt(e4).length && !i3) return false;
      for (var u3 = c3; u3--; ) {
        var f3 = s3[u3];
        if (!(i3 ? f3 in e4 : Ct.call(e4, f3))) return false;
      }
      var p2 = a3.get(t4), l3 = a3.get(e4);
      if (p2 && l3) return p2 == e4 && l3 == t4;
      var h3 = true;
      a3.set(t4, e4), a3.set(e4, t4);
      for (var _3 = i3; ++u3 < c3; ) {
        var y3 = t4[f3 = s3[u3]], b3 = e4[f3];
        if (n4) var v3 = i3 ? n4(b3, y3, f3, e4, t4, a3) : n4(y3, b3, f3, t4, e4, a3);
        if (!(void 0 === v3 ? y3 === b3 || o4(y3, b3, r4, n4, a3) : v3)) {
          h3 = false;
          break;
        }
        _3 || (_3 = "constructor" == f3);
      }
      if (h3 && !_3) {
        var d2 = t4.constructor, j2 = e4.constructor;
        d2 == j2 || !("constructor" in t4) || !("constructor" in e4) || "function" == typeof d2 && d2 instanceof d2 && "function" == typeof j2 && j2 instanceof j2 || (h3 = false);
      }
      return a3.delete(t4), a3.delete(e4), h3;
    }(t3, e3, r3, n3, o3, a2));
  }(t2, e2, r2, n2, Jt, o2));
}
class Kt extends EventTarget {
  constructor() {
    super();
    __privateAdd(this, _Kt_instances);
    this.db = null;
  }
  listen(t2) {
    super.addEventListener(e.UPDATE, t2);
  }
  dispatchEvent({ detail: t2 }) {
    console.log(`Dispatching ${e.UPDATE} event with data:`, t2), super.dispatchEvent(new CustomEvent(e.UPDATE, { detail: t2 }));
  }
  async init() {
    try {
      this.db = await t(r, n, { upgrade(t2) {
        t2.objectStoreNames.contains(o) || t2.createObjectStore(o);
      } });
    } catch (t2) {
      throw new Error("Something went wrong with indexedDB:", t2);
    }
  }
  async getPreferences() {
    const t2 = await this.db.get(o, "preferences");
    return void 0 === t2 ? null : t2;
  }
  async setPreferences(t2) {
    if (!l(t2)) throw new TypeError("Preferences must be an object.");
    const e2 = Object.keys(a);
    if (!function(t3, e3) {
      if (t3.length !== e3.length) return false;
      const r2 = [...t3].sort(), n2 = [...e3].sort();
      return r2.every((t4, e4) => t4 === n2[e4]);
    }(e2, Object.keys(t2))) throw new TypeError(`Preferences requires all those fields: ${e2.join(", ")}.`);
    if (!Object.values(t2).every((t3) => "boolean" == typeof t3)) throw new TypeError("Preferences values must be a boolean.");
    return await __privateMethod(this, _Kt_instances, t_fn).call(this, t2);
  }
  async resetPreferences() {
    return await __privateMethod(this, _Kt_instances, t_fn).call(this, null);
  }
}
_Kt_instances = new WeakSet();
t_fn = async function(t2) {
  try {
    return Jt(await this.getPreferences(), t2) ? (console.log("[setPreferences] preferences not updated: ", t2), false) : (await this.db.put(o, t2, "preferences"), console.log("[setPreferences] preferences updated: ", t2), t2);
  } catch (t3) {
    throw new Error("Something went wrong with indexedDB:", t3);
  }
};
let Qt;
async function Xt() {
  return Qt || (Qt = new Kt(), await Qt.init()), Qt;
}
export {
  Xt as default
};
//# sourceMappingURL=PreferenceStorage.js.map
