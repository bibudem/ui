/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.4.1
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
var _t, _e, _s, s_fn, _r, r_fn, _i, i_fn, _n, n_fn, _o, o_fn;
import { n as t, a as e, b as s, L as r, c as i, u as n, h as o } from "./lit-element-BtQrDsEd.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const a = Symbol();
class c {
  get taskComplete() {
    return this._taskComplete || (1 === this.status ? this._taskComplete = new Promise((t2, e2) => {
      this._resolveTaskComplete = t2, this._rejectTaskComplete = e2;
    }) : 3 === this.status ? this._taskComplete = Promise.reject(this._error) : this._taskComplete = Promise.resolve(this._value)), this._taskComplete;
  }
  constructor(t2, e2, s2) {
    this._callId = 0, this.status = 0, (this._host = t2).addController(this);
    const r2 = "object" == typeof e2 ? e2 : { task: e2, args: s2 };
    this._task = r2.task, this._argsFn = r2.args, this._argsEqual = r2.argsEqual ?? l, this._onComplete = r2.onComplete, this._onError = r2.onError, this.autoRun = r2.autoRun ?? true, "initialValue" in r2 && (this._value = r2.initialValue, this.status = 2, this._previousArgs = this._getArgs?.());
  }
  hostUpdate() {
    true === this.autoRun && this._performTask();
  }
  hostUpdated() {
    "afterUpdate" === this.autoRun && this._performTask();
  }
  _getArgs() {
    if (void 0 === this._argsFn)
      return;
    const t2 = this._argsFn();
    if (!Array.isArray(t2))
      throw new Error("The args function must return an array");
    return t2;
  }
  async _performTask() {
    const t2 = this._getArgs(), e2 = this._previousArgs;
    this._previousArgs = t2, t2 === e2 || void 0 === t2 || void 0 !== e2 && this._argsEqual(e2, t2) || await this.run(t2);
  }
  async run(t2) {
    let e2, s2;
    t2 ??= this._getArgs(), this._previousArgs = t2, 1 === this.status ? this._abortController?.abort() : (this._taskComplete = void 0, this._resolveTaskComplete = void 0, this._rejectTaskComplete = void 0), this.status = 1, "afterUpdate" === this.autoRun ? queueMicrotask(() => this._host.requestUpdate()) : this._host.requestUpdate();
    const r2 = ++this._callId;
    this._abortController = new AbortController();
    let i2 = false;
    try {
      e2 = await this._task(t2, { signal: this._abortController.signal });
    } catch (t3) {
      i2 = true, s2 = t3;
    }
    if (this._callId === r2) {
      if (e2 === a)
        this.status = 0;
      else {
        if (false === i2) {
          try {
            this._onComplete?.(e2);
          } catch {
          }
          this.status = 2, this._resolveTaskComplete?.(e2);
        } else {
          try {
            this._onError?.(s2);
          } catch {
          }
          this.status = 3, this._rejectTaskComplete?.(s2);
        }
        this._value = e2, this._error = s2;
      }
      this._host.requestUpdate();
    }
  }
  abort(t2) {
    1 === this.status && this._abortController?.abort(t2);
  }
  get value() {
    return this._value;
  }
  get error() {
    return this._error;
  }
  render(t2) {
    switch (this.status) {
      case 0:
        return t2.initial?.();
      case 1:
        return t2.pending?.();
      case 2:
        return t2.complete?.(this.value);
      case 3:
        return t2.error?.(this.error);
      default:
        throw new Error(`Unexpected status: ${this.status}`);
    }
  }
}
const l = (e2, s2) => e2 === s2 || e2.length === s2.length && e2.every((e3, r2) => !t(e3, s2[r2]));
class u {
  constructor(t2) {
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$initialize(t2, e2, s2) {
    this.__part = t2, this._$parent = e2, this.__attributeIndex = s2;
  }
  _$resolve(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class h extends u {
  constructor(t2) {
    if (super(t2), this._value = e, 2 !== t2.type)
      throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`);
  }
  render(t2) {
    if (t2 === e || null == t2)
      return this._templateResult = void 0, this._value = t2;
    if (t2 === s)
      return t2;
    if ("string" != typeof t2)
      throw new Error(`${this.constructor.directiveName}() called with a non-string value`);
    if (t2 === this._value)
      return this._templateResult;
    this._value = t2;
    const r2 = [t2];
    return r2.raw = r2, this._templateResult = { _$litType$: this.constructor.resultType, strings: r2, values: [] };
  }
}
h.directiveName = "unsafeHTML", h.resultType = 1;
const d = (p = h, (...t2) => ({ _$litDirective$: p, values: t2 }));
var p;
const g = (t2, e2) => e2.some((e3) => t2 instanceof e3);
let v, b;
const m = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), w = /* @__PURE__ */ new WeakMap();
let _ = { get(t2, e2, s2) {
  if (t2 instanceof IDBTransaction) {
    if ("done" === e2)
      return m.get(t2);
    if ("store" === e2)
      return s2.objectStoreNames[1] ? void 0 : s2.objectStore(s2.objectStoreNames[0]);
  }
  return k(t2[e2]);
}, set: (t2, e2, s2) => (t2[e2] = s2, true), has: (t2, e2) => t2 instanceof IDBTransaction && ("done" === e2 || "store" === e2) || e2 in t2 };
function y(t2) {
  _ = t2(_);
}
function k(t2) {
  if (t2 instanceof IDBRequest)
    return function(t3) {
      const e3 = new Promise((e4, s2) => {
        const r2 = () => {
          t3.removeEventListener("success", i2), t3.removeEventListener("error", n2);
        }, i2 = () => {
          e4(k(t3.result)), r2();
        }, n2 = () => {
          s2(t3.error), r2();
        };
        t3.addEventListener("success", i2), t3.addEventListener("error", n2);
      });
      return w.set(e3, t3), e3;
    }(t2);
  if (f.has(t2))
    return f.get(t2);
  const e2 = function(t3) {
    return "function" == typeof t3 ? (e3 = t3, (b || (b = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])).includes(e3) ? function(...t4) {
      return e3.apply(x(this), t4), k(this.request);
    } : function(...t4) {
      return k(e3.apply(x(this), t4));
    }) : (t3 instanceof IDBTransaction && function(t4) {
      if (m.has(t4))
        return;
      const e4 = new Promise((e5, s2) => {
        const r2 = () => {
          t4.removeEventListener("complete", i2), t4.removeEventListener("error", n2), t4.removeEventListener("abort", n2);
        }, i2 = () => {
          e5(), r2();
        }, n2 = () => {
          s2(t4.error || new DOMException("AbortError", "AbortError")), r2();
        };
        t4.addEventListener("complete", i2), t4.addEventListener("error", n2), t4.addEventListener("abort", n2);
      });
      m.set(t4, e4);
    }(t3), g(t3, v || (v = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])) ? new Proxy(t3, _) : t3);
    var e3;
  }(t2);
  return e2 !== t2 && (f.set(t2, e2), w.set(e2, t2)), e2;
}
const x = (t2) => w.get(t2), C = ["get", "getKey", "getAll", "getAllKeys", "count"], E = ["put", "add", "delete", "clear"], I = /* @__PURE__ */ new Map();
function B(t2, e2) {
  if (!(t2 instanceof IDBDatabase) || e2 in t2 || "string" != typeof e2)
    return;
  if (I.get(e2))
    return I.get(e2);
  const s2 = e2.replace(/FromIndex$/, ""), r2 = e2 !== s2, i2 = E.includes(s2);
  if (!(s2 in (r2 ? IDBIndex : IDBObjectStore).prototype) || !i2 && !C.includes(s2))
    return;
  const n2 = async function(t3, ...e3) {
    const n3 = this.transaction(t3, i2 ? "readwrite" : "readonly");
    let o2 = n3.store;
    return r2 && (o2 = o2.index(e3.shift())), (await Promise.all([o2[s2](...e3), i2 && n3.done]))[0];
  };
  return I.set(e2, n2), n2;
}
y((t2) => ({ ...t2, get: (e2, s2, r2) => B(e2, s2) || t2.get(e2, s2, r2), has: (e2, s2) => !!B(e2, s2) || t2.has(e2, s2) }));
const A = ["continue", "continuePrimaryKey", "advance"], D = {}, $ = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), j = { get(t2, e2) {
  if (!A.includes(e2))
    return t2[e2];
  let s2 = D[e2];
  return s2 || (s2 = D[e2] = function(...t3) {
    $.set(this, L.get(this)[e2](...t3));
  }), s2;
} };
async function* T(...t2) {
  let e2 = this;
  if (e2 instanceof IDBCursor || (e2 = await e2.openCursor(...t2)), !e2)
    return;
  const s2 = new Proxy(e2, j);
  for (L.set(s2, e2), w.set(s2, x(e2)); e2; )
    yield s2, e2 = await ($.get(s2) || e2.continue()), $.delete(s2);
}
function S(t2, e2) {
  return e2 === Symbol.asyncIterator && g(t2, [IDBIndex, IDBObjectStore, IDBCursor]) || "iterate" === e2 && g(t2, [IDBIndex, IDBObjectStore]);
}
function q(t2) {
  return "" === t2.textContent.trim();
}
async function M(t2) {
  const e2 = new TextEncoder().encode(JSON.stringify(t2)), s2 = await crypto.subtle.digest("SHA-256", e2);
  return Array.from(new Uint8Array(s2)).map((t3) => t3.toString(16).padStart(2, "0")).join("");
}
y((t2) => ({ ...t2, get: (e2, s2, r2) => S(e2, s2) ? T : t2.get(e2, s2, r2), has: (e2, s2) => S(e2, s2) || t2.has(e2, s2) }));
class F extends r {
  constructor() {
    super();
    __privateAdd(this, _s);
    __privateAdd(this, _r);
    __privateAdd(this, _i);
    __privateAdd(this, _n);
    __privateAdd(this, _o);
    __privateAdd(this, _t, void 0);
    __privateAdd(this, _e, void 0);
    __publicField(this, "_avisTask", new c(this, { task: async ([t2, e2, s2], { signal: r2 }) => {
      const i2 = new URL(`${e2}/${s2}`, t2), n2 = await fetch(i2, { headers: { Accept: "application/json" }, signal: r2 });
      if (!n2.ok)
        throw new Error(n2.status);
      return n2.json();
    }, args: () => [this.service, this.contexte, this.niveau] }));
    __privateSet(this, _t, null), this.service = "https://avis.bib.umontreal.ca", this.contexte = "site-web-dev", this.niveau = "important", this.boutonFermer = false;
  }
  connectedCallback() {
    super.connectedCallback(), __privateMethod(this, _s, s_fn).call(this);
  }
  _renderBoutonFermer() {
    return this.boutonFermer ? o`<button class="btn-close" aria-label="Fermer" @click="${__privateMethod(this, _o, o_fn)}">${d('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>')}</button>` : null;
  }
  render() {
    return __privateGet(this, _t)?.message ? o`<aside class="container"><div class="inner"><div class="message">${d(__privateGet(this, _t).message)}</div>${this._renderBoutonFermer()}</div></aside>` : null;
  }
  setMessage(t2) {
    __privateSet(this, _t, "string" == typeof t2 ? { message: t2, isLocal: true } : t2);
  }
}
_t = new WeakMap();
_e = new WeakMap();
_s = new WeakSet();
s_fn = function() {
  return new c(this, { task: async ([t2, e2, s2], { signal: r2 }) => {
    console.log("[#getAvis] is empty? %o", q(this));
    const i2 = new Promise(async (i3, n2) => {
      if (!q(this))
        return i3({ isLocal: true, message: this.innerHTML.split(/<!--\?lit\$\d+\$-->/).join("") });
      const o2 = new URL(`${e2}/${s2}`, t2), a2 = await fetch(o2, { headers: { Accept: "application/json" }, signal: r2 });
      if (!a2.ok)
        return n2(new Error(a2.status));
      const { message: c2 } = await a2.json();
      i3({ isLocal: false, message: c2 });
    });
    try {
      const t3 = await i2;
      console.log("data: %o", t3), await __privateMethod(this, _r, r_fn).call(this, t3);
    } catch (t3) {
      console.error("[#getAvis] An error occured: %o", t3);
    }
    return data;
  }, args: () => [this.service, this.contexte, this.niveau] });
};
_r = new WeakSet();
r_fn = async function(t2) {
  if (!t2.message)
    return void this.setMessage(null);
  if (!("indexedDB" in window))
    return void this.setMessage(t2.message);
  const e2 = __privateSet(this, _e, await function(t3, e3, { blocked: s2, upgrade: r2, blocking: i2, terminated: n2 } = {}) {
    const o2 = indexedDB.open(t3, e3), a2 = k(o2);
    return r2 && o2.addEventListener("upgradeneeded", (t4) => {
      r2(k(o2.result), t4.oldVersion, t4.newVersion, k(o2.transaction), t4);
    }), s2 && o2.addEventListener("blocked", (t4) => s2(t4.oldVersion, t4.newVersion, t4)), a2.then((t4) => {
      n2 && t4.addEventListener("close", () => n2()), i2 && t4.addEventListener("versionchange", (t5) => i2(t5.oldVersion, t5.newVersion, t5));
    }).catch(() => {
    }), a2;
  }("@bibudem/ui", 1, { upgrade(t3) {
    t3.objectStoreNames.contains("avis") || t3.createObjectStore("avis", { keyPath: "id" });
  } }));
  try {
    const s2 = await M(t2), r2 = await e2.get("avis", s2);
    console.log("storedAvis: ", r2), r2 ? r2.hidden || (await e2.delete("avis", s2), __privateMethod(this, _i, i_fn).call(this, r2)) : __privateMethod(this, _i, i_fn).call(this, t2);
  } catch (e3) {
    console.error("Something went wrong with indexedDB: %o", e3), this.setMessage(t2.message);
  }
};
_i = new WeakSet();
i_fn = async function(t2) {
  if (this.setMessage(t2), __privateGet(this, _e)) {
    const e2 = await M(t2);
    await __privateGet(this, _e).add("avis", { ...t2, hidden: false }, e2);
  }
};
_n = new WeakSet();
n_fn = async function() {
  const t2 = await M(__privateGet(this, _t));
  await __privateGet(this, _e).put("avis", { ...__privateGet(this, _t), hidden: true }, t2), __privateSet(this, _t, null), this.requestUpdate();
};
_o = new WeakSet();
o_fn = function() {
  __privateMethod(this, _n, n_fn).call(this);
};
__publicField(F, "properties", { service: { type: String }, contexte: { type: String, default: "site-web" }, niveau: { type: String }, boutonFermer: { type: Boolean, attribute: "bouton-fermer" }, message: { state: true } });
__publicField(F, "styles", [i`${n(':host,*{box-sizing:border-box}:host{display:block;font-size:var(--bib-avis-size, var(--md-sys-typescale-title-medium-size, inherit));background:var(--bib-avis-container-color, var(--md-sys-color-warningContainer, #fffac6))}:host([hidden]){display:none}.inner{display:flex;align-items:center;max-width:1220px;margin:0 auto;padding:11px 19px;gap:1em}.message{flex-grow:1;min-height:24px}.btn-close{display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0px;border:0px;margin:0;cursor:pointer;user-select:none;vertical-align:middle;appearance:none;text-decoration:none;text-align:center;flex:0 0 auto;font-size:1.5rem;font-size:36px;font-weight:700;line-height:1;position:relative;padding:0;border-radius:50%;overflow:visible;color:var(--bib-btn-close-color, rgba(0, 0, 0, .4));transition:color .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}.btn-close:after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-height:44px;min-width:44px;width:100%;height:100%}.btn-close:focus:not([disabled]),.btn-close:focus-visible{outline:2px solid #bde4ff;outline-offset:3px}.btn-close:focus:not(:focus-visible){outline:0}.btn-close:hover{color:var(--bib-btn-close-hover-color, rgba(0, 0, 0, .8))}.btn-close:hover:after{background-color:#0000000a}.btn-close:after{width:calc(100% + 16px);height:calc(100% + 16px);border-radius:50%;background-color:transparent;transition:background-color .15s cubic-bezier(.4,0,.2,1) 0ms}.btn-close>svg{fill:currentColor}')}`, i``]);
customElements.define("bib-avis", F);
export {
  F as BibAvis
};
//# sourceMappingURL=bib-avis.js.map
