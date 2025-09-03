/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.1.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { p as r } from "./package-CNeP-lpQ.js";
import { a as t, i as n, b as e, r as o } from "./isObject-Dipzh7kZ.js";
import { g as i, e as a, a as u, j as c, i as f, b as s, o as l, U as v, f as p, h as b, c as y, k as d, l as h, S as g } from "./_Uint8Array-Cf-PTZCw.js";
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
}(), P = Date.now, A = function() {
  try {
    var r2 = i(Object, "defineProperty");
    return r2({}, "", {}), r2;
  } catch (r3) {
  }
}(), T = A ? function(r2, t2) {
  return A(r2, "toString", { configurable: true, enumerable: false, value: (n2 = t2, function() {
    return n2;
  }), writable: true });
  var n2;
} : j, k = (O = T, m = 0, w = 0, function() {
  var r2 = P(), t2 = 16 - (r2 - w);
  if (w = r2, t2 > 0) {
    if (++m >= 800) return arguments[0];
  } else m = 0;
  return O.apply(void 0, arguments);
});
function S(r2, t2, n2) {
  "__proto__" == t2 && A ? A(r2, t2, { configurable: true, enumerable: true, value: n2, writable: true }) : r2[t2] = n2;
}
var U = Object.prototype.hasOwnProperty;
function B(r2, t2, n2) {
  var e2 = r2[t2];
  U.call(r2, t2) && a(e2, n2) && (void 0 !== n2 || t2 in r2) || S(r2, t2, n2);
}
var D = Math.max, F = Object.prototype.hasOwnProperty;
function L(r2) {
  return u(r2) ? s(r2, true) : function(r3) {
    if (!t(r3)) return function(r4) {
      var t2 = [];
      if (null != r4) for (var n3 in Object(r4)) t2.push(n3);
      return t2;
    }(r3);
    var n2 = f(r3), e2 = [];
    for (var o2 in r3) ("constructor" != o2 || !n2 && F.call(r3, o2)) && e2.push(o2);
    return e2;
  }(r2);
}
var M = l(Object.getPrototypeOf, Object), q = "[object Object]", z = Function.prototype, C = Object.prototype, E = z.toString, G = C.hasOwnProperty, H = E.call(Object), I = "object" == typeof exports && exports && !exports.nodeType && exports, J = I && "object" == typeof module && module && !module.nodeType && module, K = J && J.exports === I ? o.Buffer : void 0;
function N(r2, t2, n2) {
  (void 0 !== n2 && !a(r2[t2], n2) || void 0 === n2 && !(t2 in r2)) && S(r2, t2, n2);
}
function Q(r2, t2) {
  if (("constructor" !== t2 || "function" != typeof r2[t2]) && "__proto__" != t2) return r2[t2];
}
function R(r2, o2, i2, a2, c2) {
  r2 !== o2 && function(r3, t2, n2) {
    for (var e2 = -1, o3 = Object(r3), i3 = n2(r3), a3 = i3.length; a3--; ) {
      var u2 = i3[++e2];
      if (false === t2(o3[u2], u2)) break;
    }
  }(o2, function(s2, l2) {
    if (c2 || (c2 = new g()), t(s2)) !function(r3, o3, i3, a3, c3, s3, l3) {
      var g2, j3, O2, m2, w2 = Q(r3, i3), _2 = Q(o3, i3), P2 = l3.get(_2);
      if (P2) N(r3, i3, P2);
      else {
        var A2, T2 = s3 ? s3(w2, _2, i3 + "", r3, o3, l3) : void 0, k2 = void 0 === T2;
        if (k2) {
          var U2 = y(_2), D2 = !U2 && p(_2), F2 = !U2 && !D2 && b(_2);
          T2 = _2, U2 || D2 || F2 ? y(w2) ? T2 = w2 : n(A2 = w2) && u(A2) ? T2 = function(r4, t2) {
            var n2 = -1, e2 = r4.length;
            for (t2 || (t2 = Array(e2)); ++n2 < e2; ) t2[n2] = r4[n2];
            return t2;
          }(w2) : D2 ? (k2 = false, T2 = _2.slice()) : F2 ? (k2 = false, O2 = new (j3 = (g2 = _2).buffer).constructor(j3.byteLength), new v(O2).set(new v(j3)), m2 = O2, T2 = new g2.constructor(m2, g2.byteOffset, g2.length)) : T2 = [] : function(r4) {
            if (!n(r4) || e(r4) != q) return false;
            var t2 = M(r4);
            if (null === t2) return true;
            var o4 = G.call(t2, "constructor") && t2.constructor;
            return "function" == typeof o4 && o4 instanceof o4 && E.call(o4) == H;
          }(_2) || d(_2) ? (T2 = w2, d(w2) ? T2 = function(r4) {
            return function(r5, t2, n2, e2) {
              var o4 = !n2;
              n2 || (n2 = {});
              for (var i4 = -1, a4 = t2.length; ++i4 < a4; ) {
                var u2 = t2[i4], c4 = void 0;
                void 0 === c4 && (c4 = r5[u2]), o4 ? S(n2, u2, c4) : B(n2, u2, c4);
              }
              return n2;
            }(r4, L(r4));
          }(w2) : t(w2) && !h(w2) || (T2 = function(r4) {
            return "function" != typeof r4.constructor || f(r4) ? {} : x(M(r4));
          }(_2))) : k2 = false;
        }
        k2 && (l3.set(_2, T2), c3(T2, _2, a3, s3, l3), l3.delete(_2)), N(r3, i3, T2);
      }
    }(r2, o2, l2, i2, R, a2, c2);
    else {
      var j2 = a2 ? a2(Q(r2, l2), s2, l2 + "", r2, o2, c2) : void 0;
      void 0 === j2 && (j2 = s2), N(r2, l2, j2);
    }
  }, L);
}
K && K.allocUnsafe;
var V, W = (V = function(r2, t2, n2) {
  R(r2, t2, n2);
}, function(r2, t2) {
  return k(function(r3, t3, n2) {
    return t3 = D(void 0 === t3 ? r3.length - 1 : t3, 0), function() {
      for (var e2 = arguments, o2 = -1, i2 = D(e2.length - t3, 0), a2 = Array(i2); ++o2 < i2; ) a2[o2] = e2[t3 + o2];
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
  var e2 = -1, o2 = n2.length, i2 = o2 > 1 ? n2[o2 - 1] : void 0, f2 = o2 > 2 ? n2[2] : void 0;
  for (i2 = V.length > 3 && "function" == typeof i2 ? (o2--, i2) : void 0, f2 && function(r3, n3, e3) {
    if (!t(e3)) return false;
    var o3 = typeof n3;
    return !!("number" == o3 ? u(e3) && c(n3, e3.length) : "string" == o3 && n3 in e3) && a(e3[n3], r3);
  }(n2[0], n2[1], f2) && (i2 = o2 < 3 ? void 0 : i2, o2 = 1), r2 = Object(r2); ++e2 < o2; ) {
    var s2 = n2[e2];
    s2 && V(r2, s2, e2);
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
//# sourceMappingURL=bib-r1FrnwIF.js.map
