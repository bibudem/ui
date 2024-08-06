/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.13.2
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { p as r } from "./package-eM4icSas.js";
import { j as t, g as n, e, a as o, k as i, i as a, b as u, o as c, U as f, f as s, h as l, c as v, l as p, m as b, S as y } from "./_Uint8Array-DzlTzPS7.js";
import { i as d, b as h, r as g } from "./isObjectLike-DmmXH0U-.js";
function j(r2) {
  return r2;
}
var O, m, w, _ = Object.create, x = /* @__PURE__ */ function() {
  function r2() {
  }
  return function(n2) {
    if (!t(n2)) return {};
    if (_) return _(n2);
    r2.prototype = n2;
    var e2 = new r2();
    return r2.prototype = void 0, e2;
  };
}(), P = Date.now, k = function() {
  try {
    var r2 = n(Object, "defineProperty");
    return r2({}, "", {}), r2;
  } catch (r3) {
  }
}(), A = k ? function(r2, t2) {
  return k(r2, "toString", { configurable: true, enumerable: false, value: (n2 = t2, function() {
    return n2;
  }), writable: true });
  var n2;
} : j, T = (O = A, m = 0, w = 0, function() {
  var r2 = P(), t2 = 16 - (r2 - w);
  if (w = r2, t2 > 0) {
    if (++m >= 800) return arguments[0];
  } else m = 0;
  return O.apply(void 0, arguments);
});
function S(r2, t2, n2) {
  "__proto__" == t2 && k ? k(r2, t2, { configurable: true, enumerable: true, value: n2, writable: true }) : r2[t2] = n2;
}
var U = Object.prototype.hasOwnProperty;
function L(r2, t2, n2) {
  var o2 = r2[t2];
  U.call(r2, t2) && e(o2, n2) && (void 0 !== n2 || t2 in r2) || S(r2, t2, n2);
}
var B = Math.max, D = Object.prototype.hasOwnProperty;
function F(r2) {
  return o(r2) ? u(r2, true) : function(r3) {
    if (!t(r3)) return function(r4) {
      var t2 = [];
      if (null != r4) for (var n3 in Object(r4)) t2.push(n3);
      return t2;
    }(r3);
    var n2 = a(r3), e2 = [];
    for (var o2 in r3) ("constructor" != o2 || !n2 && D.call(r3, o2)) && e2.push(o2);
    return e2;
  }(r2);
}
var M = c(Object.getPrototypeOf, Object), q = "[object Object]", z = Function.prototype, C = Object.prototype, E = z.toString, G = C.hasOwnProperty, H = E.call(Object), I = "object" == typeof exports && exports && !exports.nodeType && exports, J = I && "object" == typeof module && module && !module.nodeType && module, K = J && J.exports === I ? g.Buffer : void 0;
function N(r2, t2, n2) {
  (void 0 !== n2 && !e(r2[t2], n2) || void 0 === n2 && !(t2 in r2)) && S(r2, t2, n2);
}
function Q(r2, t2) {
  if (("constructor" !== t2 || "function" != typeof r2[t2]) && "__proto__" != t2) return r2[t2];
}
function R(r2, n2, e2, i2, u2) {
  r2 !== n2 && function(r3, t2, n3) {
    for (var e3 = -1, o2 = Object(r3), i3 = n3(r3), a2 = i3.length; a2--; ) {
      var u3 = i3[++e3];
      if (false === t2(o2[u3], u3)) break;
    }
  }(n2, function(c2, g2) {
    if (u2 || (u2 = new y()), t(c2)) !function(r3, n3, e3, i3, u3, c3, y2) {
      var g3, j3, O2, m2, w2 = Q(r3, e3), _2 = Q(n3, e3), P2 = y2.get(_2);
      if (P2) N(r3, e3, P2);
      else {
        var k2, A2 = c3 ? c3(w2, _2, e3 + "", r3, n3, y2) : void 0, T2 = void 0 === A2;
        if (T2) {
          var U2 = v(_2), B2 = !U2 && s(_2), D2 = !U2 && !B2 && l(_2);
          A2 = _2, U2 || B2 || D2 ? v(w2) ? A2 = w2 : d(k2 = w2) && o(k2) ? A2 = function(r4, t2) {
            var n4 = -1, e4 = r4.length;
            for (t2 || (t2 = Array(e4)); ++n4 < e4; ) t2[n4] = r4[n4];
            return t2;
          }(w2) : B2 ? (T2 = false, A2 = _2.slice()) : D2 ? (T2 = false, O2 = new (j3 = (g3 = _2).buffer).constructor(j3.byteLength), new f(O2).set(new f(j3)), m2 = O2, A2 = new g3.constructor(m2, g3.byteOffset, g3.length)) : A2 = [] : function(r4) {
            if (!d(r4) || h(r4) != q) return false;
            var t2 = M(r4);
            if (null === t2) return true;
            var n4 = G.call(t2, "constructor") && t2.constructor;
            return "function" == typeof n4 && n4 instanceof n4 && E.call(n4) == H;
          }(_2) || p(_2) ? (A2 = w2, p(w2) ? A2 = function(r4) {
            return function(r5, t2, n4, e4) {
              var o2 = !n4;
              n4 || (n4 = {});
              for (var i4 = -1, a2 = t2.length; ++i4 < a2; ) {
                var u4 = t2[i4], c4 = void 0;
                void 0 === c4 && (c4 = r5[u4]), o2 ? S(n4, u4, c4) : L(n4, u4, c4);
              }
              return n4;
            }(r4, F(r4));
          }(w2) : t(w2) && !b(w2) || (A2 = function(r4) {
            return "function" != typeof r4.constructor || a(r4) ? {} : x(M(r4));
          }(_2))) : T2 = false;
        }
        T2 && (y2.set(_2, A2), u3(A2, _2, i3, c3, y2), y2.delete(_2)), N(r3, e3, A2);
      }
    }(r2, n2, g2, e2, R, i2, u2);
    else {
      var j2 = i2 ? i2(Q(r2, g2), c2, g2 + "", r2, n2, u2) : void 0;
      void 0 === j2 && (j2 = c2), N(r2, g2, j2);
    }
  }, F);
}
K && K.allocUnsafe;
var V, W = (V = function(r2, t2, n2) {
  R(r2, t2, n2);
}, function(r2, t2) {
  return T(function(r3, t3, n2) {
    return t3 = B(void 0 === t3 ? r3.length - 1 : t3, 0), function() {
      for (var e2 = arguments, o2 = -1, i2 = B(e2.length - t3, 0), a2 = Array(i2); ++o2 < i2; ) a2[o2] = e2[t3 + o2];
      o2 = -1;
      for (var u2 = Array(t3 + 1); ++o2 < t3; ) u2[o2] = e2[o2];
      return u2[t3] = n2(a2), function(r4, t4, n3) {
        switch (n3.length) {
          case 0:
            return r4.call(t4);
          case 1:
            return r4.call(t4, n3[0]);
          case 2:
            return r4.call(t4, n3[0], n3[1]);
          case 3:
            return r4.call(t4, n3[0], n3[1], n3[2]);
        }
        return r4.apply(t4, n3);
      }(r3, this, u2);
    };
  }(r2, void 0, j), r2 + "");
}(function(r2, n2) {
  var a2 = -1, u2 = n2.length, c2 = u2 > 1 ? n2[u2 - 1] : void 0, f2 = u2 > 2 ? n2[2] : void 0;
  for (c2 = V.length > 3 && "function" == typeof c2 ? (u2--, c2) : void 0, f2 && function(r3, n3, a3) {
    if (!t(a3)) return false;
    var u3 = typeof n3;
    return !!("number" == u3 ? o(a3) && i(n3, a3.length) : "string" == u3 && n3 in a3) && e(a3[n3], r3);
  }(n2[0], n2[1], f2) && (c2 = u2 < 3 ? void 0 : c2, u2 = 1), r2 = Object(r2); ++a2 < u2; ) {
    var s2 = n2[a2];
    s2 && V(r2, s2, a2);
  }
  return r2;
}));
function X(n2, e2) {
  const o2 = globalThis.bib ?? (globalThis.bib = {});
  void 0 === o2[n2] && (t(e2) ? o2[n2] = W({}, o2[n2], e2, { version: r.version }) : o2[n2] = e2);
}
export {
  X as a
};
//# sourceMappingURL=bib-D91rP2yd.js.map
