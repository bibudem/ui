/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _e, _t, _n, n_fn, _s, s_fn, _r, r_fn, _i, i_fn, _o, o_fn;
import { h as e } from "./task-C8D8UDHH.js";
import { s as t, i as n, r as s, x as r } from "./lit-element-C-D0oZt5.js";
import { o as i } from "./unsafe-html-ChSn7HJx.js";
const o = (e2, t2) => t2.some((t3) => e2 instanceof t3);
let a, c;
const l = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap();
let h = { get(e2, t2, n2) {
  if (e2 instanceof IDBTransaction) {
    if ("done" === t2)
      return l.get(e2);
    if ("store" === t2)
      return n2.objectStoreNames[1] ? void 0 : n2.objectStore(n2.objectStoreNames[0]);
  }
  return p(e2[t2]);
}, set: (e2, t2, n2) => (e2[t2] = n2, true), has: (e2, t2) => e2 instanceof IDBTransaction && ("done" === t2 || "store" === t2) || t2 in e2 };
function b(e2) {
  h = e2(h);
}
function p(e2) {
  if (e2 instanceof IDBRequest)
    return function(e3) {
      const t3 = new Promise((t4, n2) => {
        const s2 = () => {
          e3.removeEventListener("success", r2), e3.removeEventListener("error", i2);
        }, r2 = () => {
          t4(p(e3.result)), s2();
        }, i2 = () => {
          n2(e3.error), s2();
        };
        e3.addEventListener("success", r2), e3.addEventListener("error", i2);
      });
      return u.set(t3, e3), t3;
    }(e2);
  if (d.has(e2))
    return d.get(e2);
  const t2 = function(e3) {
    return "function" == typeof e3 ? (t3 = e3, (c || (c = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])).includes(t3) ? function(...e4) {
      return t3.apply(g(this), e4), p(this.request);
    } : function(...e4) {
      return p(t3.apply(g(this), e4));
    }) : (e3 instanceof IDBTransaction && function(e4) {
      if (l.has(e4))
        return;
      const t4 = new Promise((t5, n2) => {
        const s2 = () => {
          e4.removeEventListener("complete", r2), e4.removeEventListener("error", i2), e4.removeEventListener("abort", i2);
        }, r2 = () => {
          t5(), s2();
        }, i2 = () => {
          n2(e4.error || new DOMException("AbortError", "AbortError")), s2();
        };
        e4.addEventListener("complete", r2), e4.addEventListener("error", i2), e4.addEventListener("abort", i2);
      });
      l.set(e4, t4);
    }(e3), o(e3, a || (a = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])) ? new Proxy(e3, h) : e3);
    var t3;
  }(e2);
  return t2 !== e2 && (d.set(e2, t2), u.set(t2, e2)), t2;
}
const g = (e2) => u.get(e2), f = ["get", "getKey", "getAll", "getAllKeys", "count"], v = ["put", "add", "delete", "clear"], m = /* @__PURE__ */ new Map();
function w(e2, t2) {
  if (!(e2 instanceof IDBDatabase) || t2 in e2 || "string" != typeof t2)
    return;
  if (m.get(t2))
    return m.get(t2);
  const n2 = t2.replace(/FromIndex$/, ""), s2 = t2 !== n2, r2 = v.includes(n2);
  if (!(n2 in (s2 ? IDBIndex : IDBObjectStore).prototype) || !r2 && !f.includes(n2))
    return;
  const i2 = async function(e3, ...t3) {
    const i3 = this.transaction(e3, r2 ? "readwrite" : "readonly");
    let o2 = i3.store;
    return s2 && (o2 = o2.index(t3.shift())), (await Promise.all([o2[n2](...t3), r2 && i3.done]))[0];
  };
  return m.set(t2, i2), i2;
}
b((e2) => ({ ...e2, get: (t2, n2, s2) => w(t2, n2) || e2.get(t2, n2, s2), has: (t2, n2) => !!w(t2, n2) || e2.has(t2, n2) }));
const y = ["continue", "continuePrimaryKey", "advance"], x = {}, k = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), D = { get(e2, t2) {
  if (!y.includes(t2))
    return e2[t2];
  let n2 = x[t2];
  return n2 || (n2 = x[t2] = function(...e3) {
    k.set(this, B.get(this)[t2](...e3));
  }), n2;
} };
async function* I(...e2) {
  let t2 = this;
  if (t2 instanceof IDBCursor || (t2 = await t2.openCursor(...e2)), !t2)
    return;
  const n2 = new Proxy(t2, D);
  for (B.set(n2, t2), u.set(n2, g(t2)); t2; )
    yield n2, t2 = await (k.get(n2) || t2.continue()), k.delete(n2);
}
function E(e2, t2) {
  return t2 === Symbol.asyncIterator && o(e2, [IDBIndex, IDBObjectStore, IDBCursor]) || "iterate" === t2 && o(e2, [IDBIndex, IDBObjectStore]);
}
b((e2) => ({ ...e2, get: (t2, n2, s2) => E(t2, n2) ? I : e2.get(t2, n2, s2), has: (t2, n2) => E(t2, n2) || e2.has(t2, n2) }));
const L = "avis";
async function j(e2) {
  const t2 = new TextEncoder().encode(JSON.stringify(e2)), n2 = await crypto.subtle.digest("SHA-256", t2);
  return Array.from(new Uint8Array(n2)).map((e3) => e3.toString(16).padStart(2, "0")).join("");
}
class S extends t {
  constructor() {
    super();
    __privateAdd(this, _n);
    __privateAdd(this, _s);
    __privateAdd(this, _r);
    __privateAdd(this, _i);
    __privateAdd(this, _o);
    __privateAdd(this, _e, void 0);
    __privateAdd(this, _t, void 0);
    __publicField(this, "_avisTask", new e(this, { task: async ([e2, t2, n2], { signal: s2 }) => {
      const r2 = new URL(`${t2}/${n2}`, e2), i2 = await fetch(r2, { headers: { Accept: "application/json" }, signal: s2 });
      if (!i2.ok)
        throw new Error(i2.status);
      return i2.json();
    }, args: () => [this.service, this.contexte, this.niveau] }));
    __privateSet(this, _e, null), this.service = "https://avis.bib.umontreal.ca", this.contexte = "site-web-dev", this.niveau = "important", this.boutonFermer = false;
  }
  connectedCallback() {
    super.connectedCallback(), __privateMethod(this, _n, n_fn).call(this);
  }
  _renderBoutonFermer() {
    return this.boutonFermer ? r`<button class="btn-close" aria-label="Fermer" @click="${__privateMethod(this, _o, o_fn)}">${i('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>')}</button>` : null;
  }
  render() {
    return __privateGet(this, _e)?.message ? r`<aside class="container"><div class="inner"><div class="message">${i(__privateGet(this, _e).message)}</div>${this._renderBoutonFermer()}</div></aside>` : null;
  }
  setMessage(e2) {
    __privateSet(this, _e, "string" == typeof e2 ? { message: e2, isLocal: true } : e2);
  }
}
_e = new WeakMap();
_t = new WeakMap();
_n = new WeakSet();
n_fn = function() {
  return new e(this, { task: async ([e2, t2, n2], { signal: s2 }) => {
    const r2 = new Promise(async (r3, i2) => {
      if ("" !== this.textContent.trim())
        return r3({ isLocal: true, message: this.innerHTML.split(/<!--\?lit\$\d+\$-->/).join("") });
      const o2 = new URL(`${t2}/${n2}`, e2), a2 = await fetch(o2, { headers: { Accept: "application/json" }, signal: s2 });
      if (!a2.ok)
        return i2(new Error(a2.status));
      const { message: c2 } = await a2.json();
      r3({ isLocal: false, message: c2 });
    });
    try {
      const e3 = await r2;
      await __privateMethod(this, _s, s_fn).call(this, e3);
    } catch (e3) {
      console.error("[#getAvis] An error occured: %o", e3);
    }
    return data;
  }, args: () => [this.service, this.contexte, this.niveau] });
};
_s = new WeakSet();
s_fn = async function(e2) {
  if (!e2.message)
    return void this.setMessage(null);
  if (!("indexedDB" in window))
    return void this.setMessage(e2.message);
  const t2 = __privateSet(this, _t, await function(e3, t3, { blocked: n2, upgrade: s2, blocking: r2, terminated: i2 } = {}) {
    const o2 = indexedDB.open(e3, t3), a2 = p(o2);
    return s2 && o2.addEventListener("upgradeneeded", (e4) => {
      s2(p(o2.result), e4.oldVersion, e4.newVersion, p(o2.transaction), e4);
    }), n2 && o2.addEventListener("blocked", (e4) => n2(e4.oldVersion, e4.newVersion, e4)), a2.then((e4) => {
      i2 && e4.addEventListener("close", () => i2()), r2 && e4.addEventListener("versionchange", (e5) => r2(e5.oldVersion, e5.newVersion, e5));
    }).catch(() => {
    }), a2;
  }("@bibudem/ui", 1, { upgrade(e3) {
    e3.objectStoreNames.contains(L) || e3.createObjectStore(L);
  } }));
  try {
    const n2 = await j(e2), s2 = await t2.get(L, n2);
    s2 ? s2.hidden || (await t2.delete(L, n2), __privateMethod(this, _r, r_fn).call(this, s2)) : __privateMethod(this, _r, r_fn).call(this, e2);
  } catch (t3) {
    console.error("Something went wrong with indexedDB: %o", t3), this.setMessage(e2.message);
  }
};
_r = new WeakSet();
r_fn = async function(e2) {
  if (this.dispatchEvent(new CustomEvent("bib:show", { bubbles: true, cancelable: true })) && (this.setMessage(e2), __privateGet(this, _t))) {
    const t2 = await j(e2);
    await __privateGet(this, _t).put(L, { ...e2, hidden: false }, t2);
  }
};
_i = new WeakSet();
i_fn = async function() {
  if (!this.dispatchEvent(new CustomEvent("bib:hide", { bubbles: true, cancelable: true })))
    return;
  const e2 = await j(__privateGet(this, _e));
  await __privateGet(this, _t).put(L, { ...__privateGet(this, _e), hidden: true }, e2), __privateSet(this, _e, null), this.requestUpdate();
};
_o = new WeakSet();
o_fn = function() {
  __privateMethod(this, _i, i_fn).call(this);
};
__publicField(S, "properties", { service: { type: String }, contexte: { type: String, default: "site-web" }, niveau: { type: String }, boutonFermer: { type: Boolean, attribute: "bouton-fermer" }, message: { state: true } });
__publicField(S, "styles", [n`${s(':host,*{box-sizing:border-box}:host{display:block;font-size:var(--bib-avis-size, var(--md-sys-typescale-title-medium-size, inherit));background:var(--bib-avis-container-color, var(--md-sys-color-warningContainer, #fffac6))}:host([hidden]){display:none}.inner{display:flex;align-items:center;margin:0 auto;padding:11px 19px;gap:1em}:host(:not([fluide])) .inner{max-width:1220px}.message{flex-grow:1;min-height:24px}.btn-close{display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0px;border:0px;margin:0;cursor:pointer;user-select:none;vertical-align:middle;appearance:none;text-decoration:none;text-align:center;flex:0 0 auto;font-size:1.5rem;font-size:36px;font-weight:700;line-height:1;position:relative;padding:0;border-radius:50%;overflow:visible;color:var(--bib-btn-close-color, rgba(0, 0, 0, .4));transition:color .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}.btn-close:after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-height:44px;min-width:44px;width:100%;height:100%}.btn-close:focus:not([disabled]),.btn-close:focus-visible{outline:2px solid #bde4ff;outline-offset:3px}.btn-close:focus:not(:focus-visible){outline:0}.btn-close:hover{color:var(--bib-btn-close-hover-color, rgba(0, 0, 0, .8))}.btn-close:hover:after{background-color:#0000000a}.btn-close:after{width:calc(100% + 16px);height:calc(100% + 16px);border-radius:50%;background-color:transparent;transition:background-color .15s cubic-bezier(.4,0,.2,1) 0ms}.btn-close>svg{fill:currentColor}')}`, n``]);
customElements.define("bib-avis", S);
export {
  S as BibAvis
};
//# sourceMappingURL=bib-avis.js.map
