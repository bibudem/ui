/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.20.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _e, _t, _b_instances, s_fn, i_fn, n_fn, o_fn, r_fn;
import { h as e } from "./task-BYUCPaT1.js";
import { s as t, i as s, r as i, x as n } from "./lit-element-Dj1nHH6C.js";
import { o } from "./unsafe-html-hzUS4Xy_.js";
import { o as r } from "./index-CRxQMTzC.js";
import { a } from "./bib-CuS-VlYr.js";
import { DB_STORE_NAME as c, DB_VERSION as l, DB_NAME as h } from "./constants2.js";
async function d(e2) {
  const t2 = new TextEncoder().encode(JSON.stringify(e2)), s2 = await crypto.subtle.digest("SHA-256", t2);
  return Array.from(new Uint8Array(s2)).map((e3) => e3.toString(16).padStart(2, "0")).join("");
}
class b extends t {
  constructor() {
    super();
    __privateAdd(this, _b_instances);
    __privateAdd(this, _e);
    __privateAdd(this, _t);
    __publicField(this, "_avisTask", new e(this, { task: async ([e2, t2, s2], { signal: i2 }) => {
      const n2 = new URL(`${t2}/${s2}`, e2), o2 = await fetch(n2, { headers: { Accept: "application/json" }, signal: i2 });
      if (!o2.ok) throw new Error(o2.status);
      return o2.json();
    }, args: () => [this.service, this.contexte, this.niveau] }));
    __privateSet(this, _e, null), this.service = "https://avis.bib.umontreal.ca", this.contexte = "site-web-dev", this.niveau = "important", this.boutonFermer = false;
  }
  connectedCallback() {
    super.connectedCallback(), __privateMethod(this, _b_instances, s_fn).call(this);
  }
  _renderBoutonFermer() {
    return this.boutonFermer ? n`<button class="btn-close" aria-label="Fermer" @click="${__privateMethod(this, _b_instances, r_fn)}">${o('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>')}</button>` : null;
  }
  render() {
    return __privateGet(this, _e)?.message ? n`<aside class="container"><div class="inner"><div class="message">${o(__privateGet(this, _e).message)}</div>${this._renderBoutonFermer()}</div></aside>` : null;
  }
  setMessage(e2) {
    __privateSet(this, _e, "string" == typeof e2 ? { message: e2, isLocal: true } : e2);
  }
}
_e = new WeakMap();
_t = new WeakMap();
_b_instances = new WeakSet();
s_fn = function() {
  return new e(this, { task: async ([e2, t2, s2], { signal: i2 }) => {
    const n2 = new Promise(async (n3, o2) => {
      if ("" !== this.textContent.trim()) return n3({ isLocal: true, message: this.innerHTML.split(/<!--\?lit\$\d+\$-->/).join("") });
      const r2 = new URL(`${t2}/${s2}`, e2), a2 = await fetch(r2, { headers: { Accept: "application/json" }, signal: i2 }).catch(console.error);
      if (!a2.ok) return o2(new Error(a2.status));
      const { message: c2 } = await a2.json();
      n3({ isLocal: false, message: c2 });
    });
    try {
      const e3 = await n2;
      await __privateMethod(this, _b_instances, i_fn).call(this, e3);
    } catch (e3) {
      console.error("[#getAvis] An error occured: %o", e3);
    }
    return data;
  }, args: () => [this.service, this.contexte, this.niveau] });
};
i_fn = async function(e2) {
  if (!e2.message) return void this.setMessage(null);
  if (!("indexedDB" in window)) return void this.setMessage(e2.message);
  const t2 = __privateSet(this, _t, await r(h, l, { upgrade(e3) {
    e3.objectStoreNames.contains(c) || e3.createObjectStore(c);
  } }));
  try {
    const s2 = await d(e2), i2 = await t2.get(c, s2);
    i2 ? i2.hidden || (await t2.delete(c, s2), __privateMethod(this, _b_instances, n_fn).call(this, i2)) : __privateMethod(this, _b_instances, n_fn).call(this, e2);
  } catch (t3) {
    console.error("Something went wrong with indexedDB: %o", t3), this.setMessage(e2.message);
  }
};
n_fn = async function(e2) {
  if (this.dispatchEvent(new CustomEvent("bib:show", { bubbles: true, cancelable: true })) && (this.setMessage(e2), __privateGet(this, _t))) {
    const t2 = await d(e2);
    await __privateGet(this, _t).put(c, { ...e2, hidden: false }, t2);
  }
};
o_fn = async function() {
  if (!this.dispatchEvent(new CustomEvent("bib:hide", { bubbles: true, cancelable: true }))) return;
  const e2 = await d(__privateGet(this, _e));
  await __privateGet(this, _t).put(c, { ...__privateGet(this, _e), hidden: true }, e2), __privateSet(this, _e, null), this.requestUpdate();
};
r_fn = function() {
  __privateMethod(this, _b_instances, o_fn).call(this);
};
__publicField(b, "properties", { service: { type: String }, contexte: { type: String, default: "site-web" }, niveau: { type: String }, boutonFermer: { type: Boolean, attribute: "bouton-fermer" }, message: { state: true } });
__publicField(b, "styles", [s`${i(':host,*{box-sizing:border-box}:host{display:block;font-size:var(--bib-avis-size, var(--md-sys-typescale-title-medium-size, inherit));background:var(--bib-avis-container-color, var(--md-sys-color-warningContainer, #fffac6))}:host([hidden]){display:none}.inner{display:flex;align-items:center;margin:0 auto;padding:11px 19px;gap:1em}:host(:not([fluide])) .inner{max-width:1220px}.message{flex-grow:1;min-height:24px}.btn-close{display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0px;border:0px;margin:0;cursor:pointer;user-select:none;vertical-align:middle;appearance:none;text-decoration:none;text-align:center;flex:0 0 auto;font-size:1.5rem;font-size:36px;font-weight:700;line-height:1;position:relative;padding:0;border-radius:50%;overflow:visible;color:var(--bib-btn-close-color, rgba(0, 0, 0, .4));transition:color .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}.btn-close:after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-height:44px;min-width:44px;width:100%;height:100%}.btn-close:focus:not([disabled]),.btn-close:focus-visible{outline:var(--md-focus-ring-width, 3px) solid currentColor;outline-offset:3px;border-radius:99999px}.btn-close:focus:not(:focus-visible){outline:0}.btn-close:hover{color:var(--bib-btn-close-hover-color, rgba(0, 0, 0, .8))}.btn-close:hover:after{background-color:#0000000a}.btn-close:after{width:calc(100% + 16px);height:calc(100% + 16px);border-radius:50%;background-color:transparent;transition:background-color .15s cubic-bezier(.4,0,.2,1) 0ms}.btn-close>svg{fill:currentColor}')}`, s``]);
window.customElements.get("bib-avis") || window.customElements.define("bib-avis", b), a("avis", {});
export {
  b as BibAvis
};
//# sourceMappingURL=bib-avis.js.map
