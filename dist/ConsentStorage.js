/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.2.1
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
import { EVENT_NAMES as t, DB_NAME as r, DB_VERSION as n, DB_STORE_NAME as o } from "./constants2.js";
import { ConsentTokens as a } from "./ConsentTokens.js";
import { g as s, o as c, i, a as u, b as f, c as l, t as b, M as v, d as h, e as p, U as d, f as w, S as j, h as y } from "./_Uint8Array-Cf-PTZCw.js";
import { r as g, b as m, S as _, i as k } from "./isObject-Dipzh7kZ.js";
var O = s(g, "WeakMap"), S = c(Object.keys, Object), E = Object.prototype.hasOwnProperty;
var C = Object.prototype.propertyIsEnumerable, T = Object.getOwnPropertySymbols, A = T ? function(e2) {
  return null == e2 ? [] : (e2 = Object(e2), function(t2, r2) {
    for (var n2 = -1, o2 = null == t2 ? 0 : t2.length, a2 = 0, s2 = []; ++n2 < o2; ) {
      var c2 = t2[n2];
      i2 = c2, C.call(e2, i2) && (s2[a2++] = c2);
    }
    var i2;
    return s2;
  }(T(e2)));
} : function() {
  return [];
};
function x(e2) {
  return function(e3, t2, r2) {
    var n2 = function(e4) {
      return u(e4) ? f(e4) : function(e5) {
        if (!i(e5)) return S(e5);
        var t3 = [];
        for (var r3 in Object(e5)) E.call(e5, r3) && "constructor" != r3 && t3.push(r3);
        return t3;
      }(e4);
    }(e3);
    return l(e3) ? n2 : function(e4, t3) {
      for (var r3 = -1, n3 = t3.length, o2 = e4.length; ++r3 < n3; ) e4[o2 + r3] = t3[r3];
      return e4;
    }(n2, r2(e3));
  }(e2, 0, A);
}
var D = s(g, "DataView"), P = s(g, "Promise"), B = s(g, "Set"), L = "[object Map]", M = "[object Promise]", N = "[object Set]", z = "[object WeakMap]", V = "[object DataView]", G = b(D), H = b(v), U = b(P), W = b(B), I = b(O), R = m;
function q(e2) {
  var t2 = -1, r2 = null == e2 ? 0 : e2.length;
  for (this.__data__ = new h(); ++t2 < r2; ) this.add(e2[t2]);
}
function F(e2, t2) {
  for (var r2 = -1, n2 = null == e2 ? 0 : e2.length; ++r2 < n2; ) if (t2(e2[r2], r2, e2)) return true;
  return false;
}
(D && R(new D(new ArrayBuffer(1))) != V || v && R(new v()) != L || P && R(P.resolve()) != M || B && R(new B()) != N || O && R(new O()) != z) && (R = function(e2) {
  var t2 = m(e2), r2 = "[object Object]" == t2 ? e2.constructor : void 0, n2 = r2 ? b(r2) : "";
  if (n2) switch (n2) {
    case G:
      return V;
    case H:
      return L;
    case U:
      return M;
    case W:
      return N;
    case I:
      return z;
  }
  return t2;
}), q.prototype.add = q.prototype.push = function(e2) {
  return this.__data__.set(e2, "__lodash_hash_undefined__"), this;
}, q.prototype.has = function(e2) {
  return this.__data__.has(e2);
};
var J = 1, K = 2;
function Q(e2, t2, r2, n2, o2, a2) {
  var s2 = r2 & J, c2 = e2.length, i2 = t2.length;
  if (c2 != i2 && !(s2 && i2 > c2)) return false;
  var u2 = a2.get(e2), f2 = a2.get(t2);
  if (u2 && f2) return u2 == t2 && f2 == e2;
  var l2 = -1, b2 = true, v2 = r2 & K ? new q() : void 0;
  for (a2.set(e2, t2), a2.set(t2, e2); ++l2 < c2; ) {
    var h2 = e2[l2], p2 = t2[l2];
    if (n2) var d2 = s2 ? n2(p2, h2, l2, t2, e2, a2) : n2(h2, p2, l2, e2, t2, a2);
    if (void 0 !== d2) {
      if (d2) continue;
      b2 = false;
      break;
    }
    if (v2) {
      if (!F(t2, function(e3, t3) {
        if (s3 = t3, !v2.has(s3) && (h2 === e3 || o2(h2, e3, r2, n2, a2))) return v2.push(t3);
        var s3;
      })) {
        b2 = false;
        break;
      }
    } else if (h2 !== p2 && !o2(h2, p2, r2, n2, a2)) {
      b2 = false;
      break;
    }
  }
  return a2.delete(e2), a2.delete(t2), b2;
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
var Z = _ ? _.prototype : void 0, $ = Z ? Z.valueOf : void 0, ee = Object.prototype.hasOwnProperty, te = "[object Arguments]", re = "[object Array]", ne = "[object Object]", oe = Object.prototype.hasOwnProperty;
function ae(e2, t2, r2, n2, o2) {
  return e2 === t2 || (null == e2 || null == t2 || !k(e2) && !k(t2) ? e2 != e2 && t2 != t2 : function(e3, t3, r3, n3, o3, a2) {
    var s2 = l(e3), c2 = l(t3), i2 = s2 ? re : R(e3), u2 = c2 ? re : R(t3), f2 = (i2 = i2 == te ? ne : i2) == ne, b2 = (u2 = u2 == te ? ne : u2) == ne, v2 = i2 == u2;
    if (v2 && w(e3)) {
      if (!w(t3)) return false;
      s2 = true, f2 = false;
    }
    if (v2 && !f2) return a2 || (a2 = new j()), s2 || y(e3) ? Q(e3, t3, r3, n3, o3, a2) : function(e4, t4, r4, n4, o4, a3, s3) {
      switch (r4) {
        case "[object DataView]":
          if (e4.byteLength != t4.byteLength || e4.byteOffset != t4.byteOffset) return false;
          e4 = e4.buffer, t4 = t4.buffer;
        case "[object ArrayBuffer]":
          return !(e4.byteLength != t4.byteLength || !a3(new d(e4), new d(t4)));
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
          var f3 = Q(c3(e4), c3(t4), n4, o4, a3, s3);
          return s3.delete(e4), f3;
        case "[object Symbol]":
          if ($) return $.call(e4) == $.call(t4);
      }
      return false;
    }(e3, t3, i2, r3, n3, o3, a2);
    if (!(1 & r3)) {
      var h2 = f2 && oe.call(e3, "__wrapped__"), g2 = b2 && oe.call(t3, "__wrapped__");
      if (h2 || g2) {
        var m2 = h2 ? e3.value() : e3, _2 = g2 ? t3.value() : t3;
        return a2 || (a2 = new j()), o3(m2, _2, r3, n3, a2);
      }
    }
    return !!v2 && (a2 || (a2 = new j()), function(e4, t4, r4, n4, o4, a3) {
      var s3 = 1 & r4, c3 = x(e4), i3 = c3.length;
      if (i3 != x(t4).length && !s3) return false;
      for (var u3 = i3; u3--; ) {
        var f3 = c3[u3];
        if (!(s3 ? f3 in t4 : ee.call(t4, f3))) return false;
      }
      var l2 = a3.get(e4), b3 = a3.get(t4);
      if (l2 && b3) return l2 == t4 && b3 == e4;
      var v3 = true;
      a3.set(e4, t4), a3.set(t4, e4);
      for (var h3 = s3; ++u3 < i3; ) {
        var p2 = e4[f3 = c3[u3]], d2 = t4[f3];
        if (n4) var w2 = s3 ? n4(d2, p2, f3, t4, e4, a3) : n4(p2, d2, f3, e4, t4, a3);
        if (!(void 0 === w2 ? p2 === d2 || o4(p2, d2, r4, n4, a3) : w2)) {
          v3 = false;
          break;
        }
        h3 || (h3 = "constructor" == f3);
      }
      if (v3 && !h3) {
        var j2 = e4.constructor, y2 = t4.constructor;
        j2 == y2 || !("constructor" in e4) || !("constructor" in t4) || "function" == typeof j2 && j2 instanceof j2 && "function" == typeof y2 && y2 instanceof y2 || (v3 = false);
      }
      return a3.delete(e4), a3.delete(t4), v3;
    }(e3, t3, r3, n3, o3, a2));
  }(e2, t2, r2, n2, ae, o2));
}
class se extends EventTarget {
  constructor() {
    super();
    __privateAdd(this, _se_instances);
    this.db = null;
  }
  listen(e2) {
    super.addEventListener(t.CHANGE, e2);
  }
  dispatchEvent({ detail: e2 }) {
    super.dispatchEvent(new CustomEvent(t.CHANGE, { detail: e2 }));
  }
  async init() {
    try {
      this.db = await e(r, n, { upgrade(e2) {
        e2.objectStoreNames.contains(o) || e2.createObjectStore(o);
      } });
    } catch (e2) {
      throw new Error("Something went wrong with indexedDB:", e2);
    }
  }
  async getConsentTokens() {
    const e2 = await this.db.get(o, "tokens");
    return a.from(e2);
  }
  async setConsentTokens(e2) {
    const t2 = a.from(e2);
    return await __privateMethod(this, _se_instances, e_fn).call(this, t2);
  }
  async resetTokens() {
    return await __privateMethod(this, _se_instances, e_fn).call(this);
  }
}
_se_instances = new WeakSet();
e_fn = async function(e2) {
  try {
    const t2 = await this.getConsentTokens(), r2 = new a(e2);
    return ae(t2, r2) ? (console.log("[setConsentTokens] No change in tokens. oldConsentTokens: ", t2, "newConsentTokens: ", r2), false) : (await this.db.put(o, r2, "tokens"), r2);
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
