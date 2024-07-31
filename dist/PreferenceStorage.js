/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.13.0
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
var _ce_instances, e_fn;
import { o as e } from "./index-CRxQMTzC.js";
import { E as t, f as r, h as n, i as a, D as o } from "./constants-DMzZzv_T.js";
import { g as s, o as c, i, a as u, b as f, c as l, t as b, M as h, d as v, e as p, U as d, f as w, S as y, h as j, j as g } from "./_Uint8Array-DzlTzPS7.js";
import { r as _, b as m, S as O, i as P } from "./isObjectLike-DmmXH0U-.js";
var E = s(_, "WeakMap"), S = c(Object.keys, Object), D = Object.prototype.hasOwnProperty;
var k = Object.prototype.propertyIsEnumerable, A = Object.getOwnPropertySymbols, T = A ? function(e2) {
  return null == e2 ? [] : (e2 = Object(e2), function(t2, r2) {
    for (var n2 = -1, a2 = null == t2 ? 0 : t2.length, o2 = 0, s2 = []; ++n2 < a2; ) {
      var c2 = t2[n2];
      i2 = c2, k.call(e2, i2) && (s2[o2++] = c2);
    }
    var i2;
    return s2;
  }(A(e2)));
} : function() {
  return [];
};
function x(e2) {
  return function(e3, t2, r2) {
    var n2 = function(e4) {
      return u(e4) ? f(e4) : function(e5) {
        if (!i(e5)) return S(e5);
        var t3 = [];
        for (var r3 in Object(e5)) D.call(e5, r3) && "constructor" != r3 && t3.push(r3);
        return t3;
      }(e4);
    }(e3);
    return l(e3) ? n2 : function(e4, t3) {
      for (var r3 = -1, n3 = t3.length, a2 = e4.length; ++r3 < n3; ) e4[a2 + r3] = t3[r3];
      return e4;
    }(n2, r2(e3));
  }(e2, 0, T);
}
var L = s(_, "DataView"), B = s(_, "Promise"), M = s(_, "Set"), U = "[object Map]", z = "[object Promise]", V = "[object Set]", N = "[object WeakMap]", W = "[object DataView]", $ = b(L), q = b(h), C = b(B), I = b(M), R = b(E), F = m;
function G(e2) {
  var t2 = -1, r2 = null == e2 ? 0 : e2.length;
  for (this.__data__ = new v(); ++t2 < r2; ) this.add(e2[t2]);
}
function H(e2, t2) {
  for (var r2 = -1, n2 = null == e2 ? 0 : e2.length; ++r2 < n2; ) if (t2(e2[r2], r2, e2)) return true;
  return false;
}
(L && F(new L(new ArrayBuffer(1))) != W || h && F(new h()) != U || B && F(B.resolve()) != z || M && F(new M()) != V || E && F(new E()) != N) && (F = function(e2) {
  var t2 = m(e2), r2 = "[object Object]" == t2 ? e2.constructor : void 0, n2 = r2 ? b(r2) : "";
  if (n2) switch (n2) {
    case $:
      return W;
    case q:
      return U;
    case C:
      return z;
    case I:
      return V;
    case R:
      return N;
  }
  return t2;
}), G.prototype.add = G.prototype.push = function(e2) {
  return this.__data__.set(e2, "__lodash_hash_undefined__"), this;
}, G.prototype.has = function(e2) {
  return this.__data__.has(e2);
};
var J = 1, K = 2;
function Q(e2, t2, r2, n2, a2, o2) {
  var s2 = r2 & J, c2 = e2.length, i2 = t2.length;
  if (c2 != i2 && !(s2 && i2 > c2)) return false;
  var u2 = o2.get(e2), f2 = o2.get(t2);
  if (u2 && f2) return u2 == t2 && f2 == e2;
  var l2 = -1, b2 = true, h2 = r2 & K ? new G() : void 0;
  for (o2.set(e2, t2), o2.set(t2, e2); ++l2 < c2; ) {
    var v2 = e2[l2], p2 = t2[l2];
    if (n2) var d2 = s2 ? n2(p2, v2, l2, t2, e2, o2) : n2(v2, p2, l2, e2, t2, o2);
    if (void 0 !== d2) {
      if (d2) continue;
      b2 = false;
      break;
    }
    if (h2) {
      if (!H(t2, function(e3, t3) {
        if (s3 = t3, !h2.has(s3) && (v2 === e3 || a2(v2, e3, r2, n2, o2))) return h2.push(t3);
        var s3;
      })) {
        b2 = false;
        break;
      }
    } else if (v2 !== p2 && !a2(v2, p2, r2, n2, o2)) {
      b2 = false;
      break;
    }
  }
  return o2.delete(e2), o2.delete(t2), b2;
}
function X(e2) {
  var t2 = -1, r2 = Array(e2.size);
  return e2.forEach(function(e3, n2) {
    r2[++t2] = [n2, e3];
  }), r2;
}
function Y(e2) {
  var t2 = -1, r2 = Array(e2.size);
  return e2.forEach(function(e3) {
    r2[++t2] = e3;
  }), r2;
}
var Z = O ? O.prototype : void 0, ee = Z ? Z.valueOf : void 0, te = Object.prototype.hasOwnProperty, re = "[object Arguments]", ne = "[object Array]", ae = "[object Object]", oe = Object.prototype.hasOwnProperty;
function se(e2, t2, r2, n2, a2) {
  return e2 === t2 || (null == e2 || null == t2 || !P(e2) && !P(t2) ? e2 != e2 && t2 != t2 : function(e3, t3, r3, n3, a3, o2) {
    var s2 = l(e3), c2 = l(t3), i2 = s2 ? ne : F(e3), u2 = c2 ? ne : F(t3), f2 = (i2 = i2 == re ? ae : i2) == ae, b2 = (u2 = u2 == re ? ae : u2) == ae, h2 = i2 == u2;
    if (h2 && w(e3)) {
      if (!w(t3)) return false;
      s2 = true, f2 = false;
    }
    if (h2 && !f2) return o2 || (o2 = new y()), s2 || j(e3) ? Q(e3, t3, r3, n3, a3, o2) : function(e4, t4, r4, n4, a4, o3, s3) {
      switch (r4) {
        case "[object DataView]":
          if (e4.byteLength != t4.byteLength || e4.byteOffset != t4.byteOffset) return false;
          e4 = e4.buffer, t4 = t4.buffer;
        case "[object ArrayBuffer]":
          return !(e4.byteLength != t4.byteLength || !o3(new d(e4), new d(t4)));
        case "[object Boolean]":
        case "[object Date]":
        case "[object Number]":
          return p(+e4, +t4);
        case "[object Error]":
          return e4.name == t4.name && e4.message == t4.message;
        case "[object RegExp]":
        case "[object String]":
          return e4 == t4 + "";
        case "[object Map]":
          var c3 = X;
        case "[object Set]":
          var i3 = 1 & n4;
          if (c3 || (c3 = Y), e4.size != t4.size && !i3) return false;
          var u3 = s3.get(e4);
          if (u3) return u3 == t4;
          n4 |= 2, s3.set(e4, t4);
          var f3 = Q(c3(e4), c3(t4), n4, a4, o3, s3);
          return s3.delete(e4), f3;
        case "[object Symbol]":
          if (ee) return ee.call(e4) == ee.call(t4);
      }
      return false;
    }(e3, t3, i2, r3, n3, a3, o2);
    if (!(1 & r3)) {
      var v2 = f2 && oe.call(e3, "__wrapped__"), g2 = b2 && oe.call(t3, "__wrapped__");
      if (v2 || g2) {
        var _2 = v2 ? e3.value() : e3, m2 = g2 ? t3.value() : t3;
        return o2 || (o2 = new y()), a3(_2, m2, r3, n3, o2);
      }
    }
    return !!h2 && (o2 || (o2 = new y()), function(e4, t4, r4, n4, a4, o3) {
      var s3 = 1 & r4, c3 = x(e4), i3 = c3.length;
      if (i3 != x(t4).length && !s3) return false;
      for (var u3 = i3; u3--; ) {
        var f3 = c3[u3];
        if (!(s3 ? f3 in t4 : te.call(t4, f3))) return false;
      }
      var l2 = o3.get(e4), b3 = o3.get(t4);
      if (l2 && b3) return l2 == t4 && b3 == e4;
      var h3 = true;
      o3.set(e4, t4), o3.set(t4, e4);
      for (var v3 = s3; ++u3 < i3; ) {
        var p2 = e4[f3 = c3[u3]], d2 = t4[f3];
        if (n4) var w2 = s3 ? n4(d2, p2, f3, t4, e4, o3) : n4(p2, d2, f3, e4, t4, o3);
        if (!(void 0 === w2 ? p2 === d2 || a4(p2, d2, r4, n4, o3) : w2)) {
          h3 = false;
          break;
        }
        v3 || (v3 = "constructor" == f3);
      }
      if (h3 && !v3) {
        var y2 = e4.constructor, j2 = t4.constructor;
        y2 == j2 || !("constructor" in e4) || !("constructor" in t4) || "function" == typeof y2 && y2 instanceof y2 && "function" == typeof j2 && j2 instanceof j2 || (h3 = false);
      }
      return o3.delete(e4), o3.delete(t4), h3;
    }(e3, t3, r3, n3, a3, o2));
  }(e2, t2, r2, n2, se, a2));
}
class ce extends EventTarget {
  constructor() {
    super();
    __privateAdd(this, _ce_instances);
    this.db = null;
  }
  listen(e2) {
    super.addEventListener(t.UPDATE, e2);
  }
  dispatchEvent({ detail: e2 }) {
    console.log(`Dispatching ${t.UPDATE} event with data:`, e2), super.dispatchEvent(new CustomEvent(t.UPDATE, { detail: e2 }));
  }
  async init() {
    try {
      this.db = await e(r, n, { upgrade(e2) {
        e2.objectStoreNames.contains(a) || e2.createObjectStore(a);
      } });
    } catch (e2) {
      throw new Error("Something went wrong with indexedDB:", e2);
    }
  }
  async getPreferences() {
    const e2 = await this.db.get(a, "preferences");
    return void 0 === e2 ? null : e2;
  }
  async setPreferences(e2) {
    if (!g(e2)) throw new TypeError("Preferences must be an object.");
    const t2 = Object.keys(o);
    if (!function(e3, t3) {
      if (e3.length !== t3.length) return false;
      const r2 = [...e3].sort(), n2 = [...t3].sort();
      return r2.every((e4, t4) => e4 === n2[t4]);
    }(t2, Object.keys(e2))) throw new TypeError(`Preferences requires all those fields: ${t2.join(", ")}.`);
    if (!Object.values(e2).every((e3) => "boolean" == typeof e3)) throw new TypeError("Preferences values must be a boolean.");
    return await __privateMethod(this, _ce_instances, e_fn).call(this, e2);
  }
  async resetPreferences() {
    return await __privateMethod(this, _ce_instances, e_fn).call(this, null);
  }
}
_ce_instances = new WeakSet();
e_fn = async function(e2) {
  try {
    return se(await this.getPreferences(), e2) ? (console.log("[setPreferences] preferences not updated: ", e2), false) : (await this.db.put(a, e2, "preferences"), console.log("[setPreferences] preferences updated: ", e2), e2);
  } catch (e3) {
    throw new Error("Something went wrong with indexedDB:", e3);
  }
};
let ie;
async function ue() {
  return ie || (ie = new ce(), await ie.init()), ie;
}
export {
  ue as default
};
//# sourceMappingURL=PreferenceStorage.js.map
