/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.11.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const e = (e2, t2) => t2.some((t3) => e2 instanceof t3);
let t, n;
const r = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap();
let i = { get(e2, t2, n2) {
  if (e2 instanceof IDBTransaction) {
    if ("done" === t2) return r.get(e2);
    if ("store" === t2) return n2.objectStoreNames[1] ? void 0 : n2.objectStore(n2.objectStoreNames[0]);
  }
  return c(e2[t2]);
}, set: (e2, t2, n2) => (e2[t2] = n2, true), has: (e2, t2) => e2 instanceof IDBTransaction && ("done" === t2 || "store" === t2) || t2 in e2 };
function a(e2) {
  i = e2(i);
}
function c(a2) {
  if (a2 instanceof IDBRequest) return function(e2) {
    const t2 = new Promise((t3, n2) => {
      const r2 = () => {
        e2.removeEventListener("success", o2), e2.removeEventListener("error", s2);
      }, o2 = () => {
        t3(c(e2.result)), r2();
      }, s2 = () => {
        n2(e2.error), r2();
      };
      e2.addEventListener("success", o2), e2.addEventListener("error", s2);
    });
    return s.set(t2, e2), t2;
  }(a2);
  if (o.has(a2)) return o.get(a2);
  const d2 = function(o2) {
    return "function" == typeof o2 ? (s2 = o2, (n || (n = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])).includes(s2) ? function(...e2) {
      return s2.apply(u(this), e2), c(this.request);
    } : function(...e2) {
      return c(s2.apply(u(this), e2));
    }) : (o2 instanceof IDBTransaction && function(e2) {
      if (r.has(e2)) return;
      const t2 = new Promise((t3, n2) => {
        const r2 = () => {
          e2.removeEventListener("complete", o3), e2.removeEventListener("error", s3), e2.removeEventListener("abort", s3);
        }, o3 = () => {
          t3(), r2();
        }, s3 = () => {
          n2(e2.error || new DOMException("AbortError", "AbortError")), r2();
        };
        e2.addEventListener("complete", o3), e2.addEventListener("error", s3), e2.addEventListener("abort", s3);
      });
      r.set(e2, t2);
    }(o2), e(o2, t || (t = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])) ? new Proxy(o2, i) : o2);
    var s2;
  }(a2);
  return d2 !== a2 && (o.set(a2, d2), s.set(d2, a2)), d2;
}
const u = (e2) => s.get(e2);
function d(e2, t2, { blocked: n2, upgrade: r2, blocking: o2, terminated: s2 } = {}) {
  const i2 = indexedDB.open(e2, t2), a2 = c(i2);
  return r2 && i2.addEventListener("upgradeneeded", (e3) => {
    r2(c(i2.result), e3.oldVersion, e3.newVersion, c(i2.transaction), e3);
  }), n2 && i2.addEventListener("blocked", (e3) => n2(e3.oldVersion, e3.newVersion, e3)), a2.then((e3) => {
    s2 && e3.addEventListener("close", () => s2()), o2 && e3.addEventListener("versionchange", (e4) => o2(e4.oldVersion, e4.newVersion, e4));
  }).catch(() => {
  }), a2;
}
const f = ["get", "getKey", "getAll", "getAllKeys", "count"], l = ["put", "add", "delete", "clear"], p = /* @__PURE__ */ new Map();
function I(e2, t2) {
  if (!(e2 instanceof IDBDatabase) || t2 in e2 || "string" != typeof t2) return;
  if (p.get(t2)) return p.get(t2);
  const n2 = t2.replace(/FromIndex$/, ""), r2 = t2 !== n2, o2 = l.includes(n2);
  if (!(n2 in (r2 ? IDBIndex : IDBObjectStore).prototype) || !o2 && !f.includes(n2)) return;
  const s2 = async function(e3, ...t3) {
    const s3 = this.transaction(e3, o2 ? "readwrite" : "readonly");
    let i2 = s3.store;
    return r2 && (i2 = i2.index(t3.shift())), (await Promise.all([i2[n2](...t3), o2 && s3.done]))[0];
  };
  return p.set(t2, s2), s2;
}
a((e2) => ({ ...e2, get: (t2, n2, r2) => I(t2, n2) || e2.get(t2, n2, r2), has: (t2, n2) => !!I(t2, n2) || e2.has(t2, n2) }));
const D = ["continue", "continuePrimaryKey", "advance"], v = {}, g = /* @__PURE__ */ new WeakMap(), y = /* @__PURE__ */ new WeakMap(), B = { get(e2, t2) {
  if (!D.includes(t2)) return e2[t2];
  let n2 = v[t2];
  return n2 || (n2 = v[t2] = function(...e3) {
    g.set(this, y.get(this)[t2](...e3));
  }), n2;
} };
async function* h(...e2) {
  let t2 = this;
  if (t2 instanceof IDBCursor || (t2 = await t2.openCursor(...e2)), !t2) return;
  const n2 = new Proxy(t2, B);
  for (y.set(n2, t2), s.set(n2, u(t2)); t2; ) yield n2, t2 = await (g.get(n2) || t2.continue()), g.delete(n2);
}
function m(t2, n2) {
  return n2 === Symbol.asyncIterator && e(t2, [IDBIndex, IDBObjectStore, IDBCursor]) || "iterate" === n2 && e(t2, [IDBIndex, IDBObjectStore]);
}
a((e2) => ({ ...e2, get: (t2, n2, r2) => m(t2, n2) ? h : e2.get(t2, n2, r2), has: (t2, n2) => m(t2, n2) || e2.has(t2, n2) }));
export {
  d as o
};
//# sourceMappingURL=index-CRxQMTzC.js.map
