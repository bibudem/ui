/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.0.2
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
var _se_instances, e_fn;
import { o as e } from "./index-CRxQMTzC.js";
import { E as t, h as r, i as n, j as a } from "./constants-B2kRehTt.js";
import { ConsentTokens as o } from "./ConsentTokens.js";
import { g as s, o as c, i, a as u, b as f, c as l, t as b, M as h, d as v, e as p, U as d, f as w, S as j, h as y } from "./_Uint8Array-Cf-PTZCw.js";
import { r as g, b as m, S as _, i as k } from "./isObject-Dipzh7kZ.js";
var O = s(g, "WeakMap"), E = c(Object.keys, Object), S = Object.prototype.hasOwnProperty;
var T = Object.prototype.propertyIsEnumerable, C = Object.getOwnPropertySymbols, A = C ? function(e2) {
  return null == e2 ? [] : (e2 = Object(e2), function(t2, r2) {
    for (var n2 = -1, a2 = null == t2 ? 0 : t2.length, o2 = 0, s2 = []; ++n2 < a2; ) {
      var c2 = t2[n2];
      i2 = c2, T.call(e2, i2) && (s2[o2++] = c2);
    }
    var i2;
    return s2;
  }(C(e2)));
} : function() {
  return [];
};
function D(e2) {
  return function(e3, t2, r2) {
    var n2 = function(e4) {
      return u(e4) ? f(e4) : function(e5) {
        if (!i(e5)) return E(e5);
        var t3 = [];
        for (var r3 in Object(e5)) S.call(e5, r3) && "constructor" != r3 && t3.push(r3);
        return t3;
      }(e4);
    }(e3);
    return l(e3) ? n2 : function(e4, t3) {
      for (var r3 = -1, n3 = t3.length, a2 = e4.length; ++r3 < n3; ) e4[a2 + r3] = t3[r3];
      return e4;
    }(n2, r2(e3));
  }(e2, 0, A);
}
var P = s(g, "DataView"), x = s(g, "Promise"), B = s(g, "Set"), L = "[object Map]", M = "[object Promise]", z = "[object Set]", U = "[object WeakMap]", N = "[object DataView]", V = b(P), W = b(h), I = b(x), R = b(B), q = b(O), F = m;
function G(e2) {
  var t2 = -1, r2 = null == e2 ? 0 : e2.length;
  for (this.__data__ = new v(); ++t2 < r2; ) this.add(e2[t2]);
}
function H(e2, t2) {
  for (var r2 = -1, n2 = null == e2 ? 0 : e2.length; ++r2 < n2; ) if (t2(e2[r2], r2, e2)) return true;
  return false;
}
(P && F(new P(new ArrayBuffer(1))) != N || h && F(new h()) != L || x && F(x.resolve()) != M || B && F(new B()) != z || O && F(new O()) != U) && (F = function(e2) {
  var t2 = m(e2), r2 = "[object Object]" == t2 ? e2.constructor : void 0, n2 = r2 ? b(r2) : "";
  if (n2) switch (n2) {
    case V:
      return N;
    case W:
      return L;
    case I:
      return M;
    case R:
      return z;
    case q:
      return U;
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
var Z = _ ? _.prototype : void 0, $ = Z ? Z.valueOf : void 0, ee = Object.prototype.hasOwnProperty, te = "[object Arguments]", re = "[object Array]", ne = "[object Object]", ae = Object.prototype.hasOwnProperty;
function oe(e2, t2, r2, n2, a2) {
  return e2 === t2 || (null == e2 || null == t2 || !k(e2) && !k(t2) ? e2 != e2 && t2 != t2 : function(e3, t3, r3, n3, a3, o2) {
    var s2 = l(e3), c2 = l(t3), i2 = s2 ? re : F(e3), u2 = c2 ? re : F(t3), f2 = (i2 = i2 == te ? ne : i2) == ne, b2 = (u2 = u2 == te ? ne : u2) == ne, h2 = i2 == u2;
    if (h2 && w(e3)) {
      if (!w(t3)) return false;
      s2 = true, f2 = false;
    }
    if (h2 && !f2) return o2 || (o2 = new j()), s2 || y(e3) ? Q(e3, t3, r3, n3, a3, o2) : function(e4, t4, r4, n4, a4, o3, s3) {
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
          if ($) return $.call(e4) == $.call(t4);
      }
      return false;
    }(e3, t3, i2, r3, n3, a3, o2);
    if (!(1 & r3)) {
      var v2 = f2 && ae.call(e3, "__wrapped__"), g2 = b2 && ae.call(t3, "__wrapped__");
      if (v2 || g2) {
        var m2 = v2 ? e3.value() : e3, _2 = g2 ? t3.value() : t3;
        return o2 || (o2 = new j()), a3(m2, _2, r3, n3, o2);
      }
    }
    return !!h2 && (o2 || (o2 = new j()), function(e4, t4, r4, n4, a4, o3) {
      var s3 = 1 & r4, c3 = D(e4), i3 = c3.length;
      if (i3 != D(t4).length && !s3) return false;
      for (var u3 = i3; u3--; ) {
        var f3 = c3[u3];
        if (!(s3 ? f3 in t4 : ee.call(t4, f3))) return false;
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
        var j2 = e4.constructor, y2 = t4.constructor;
        j2 == y2 || !("constructor" in e4) || !("constructor" in t4) || "function" == typeof j2 && j2 instanceof j2 && "function" == typeof y2 && y2 instanceof y2 || (h3 = false);
      }
      return o3.delete(e4), o3.delete(t4), h3;
    }(e3, t3, r3, n3, a3, o2));
  }(e2, t2, r2, n2, oe, a2));
}
class se extends EventTarget {
  constructor() {
    super();
    __privateAdd(this, _se_instances);
    this.db = null;
  }
  listen(e2) {
    super.addEventListener(t.UPDATE, e2);
  }
  dispatchEvent({ detail: e2 }) {
    super.dispatchEvent(new CustomEvent(t.UPDATE, { detail: e2 }));
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
  async getConsentTokens() {
    const e2 = await this.db.get(a, "tokens");
    return o.from(e2);
  }
  async setConsentTokens(e2) {
    const t2 = o.from(e2);
    return await __privateMethod(this, _se_instances, e_fn).call(this, t2);
  }
  async resetTokens() {
    return await __privateMethod(this, _se_instances, e_fn).call(this);
  }
}
_se_instances = new WeakSet();
e_fn = async function(e2) {
  try {
    const t2 = await this.getConsentTokens(), r2 = new o(e2);
    return oe(t2, r2) ? (console.log("[setConsentTokens] No change in tokens. oldConsentTokens: ", t2, "newConsentTokens: ", r2), false) : (await this.db.put(a, r2, "tokens"), r2);
  } catch (e3) {
    throw new Error("Something went wrong with indexedDB:", e3);
  }
};
let ce;
async function ie() {
  return ce || (ce = new se(), await ce.init()), ce;
}
export {
  ie as default
};
//# sourceMappingURL=ConsentStorage.js.map
