/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.23.0
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
var _e, _t, _b_instances, s_fn, i_fn, o_fn, r_fn, n_fn;
import { h as e } from "./task-BYUCPaT1.js";
import { s as t, i as s, r as i, x as o } from "./lit-element-Dj1nHH6C.js";
import { o as r } from "./unsafe-html-hzUS4Xy_.js";
import { o as n } from "./index-CRxQMTzC.js";
import { a } from "./bib-DW2nTpT-.js";
import { DB_STORE_NAME as c, DB_VERSION as l, DB_NAME as d } from "./constants2.js";
class b extends t {
  constructor() {
    super();
    __privateAdd(this, _b_instances);
    __privateAdd(this, _e);
    __privateAdd(this, _t);
    __privateSet(this, _e, null), this.service = "https://avis.bib.umontreal.ca/api/avis", this.boutonFermer = false;
  }
  connectedCallback() {
    super.connectedCallback(), __privateMethod(this, _b_instances, s_fn).call(this);
  }
  _renderBoutonFermer() {
    return this.boutonFermer ? o`<button class="btn-close" aria-label="Fermer" @click="${__privateMethod(this, _b_instances, n_fn)}">${r('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>')}</button>` : null;
  }
  render() {
    return __privateGet(this, _e)?.message ? o`<aside class="container"><div class="inner"><div class="message">${r(__privateGet(this, _e).message)}</div>${this._renderBoutonFermer()}</div></aside>` : null;
  }
  setMessage(e2) {
    __privateSet(this, _e, "string" == typeof e2 ? { message: e2, isLocal: true } : e2);
  }
}
_e = new WeakMap();
_t = new WeakMap();
_b_instances = new WeakSet();
s_fn = function() {
  return new e(this, { task: async ([e2], { signal: t2 }) => {
    const s2 = new Promise(async (s3, i2) => {
      if ("" !== this.textContent.trim()) return s3({ isLocal: true, message: this.innerHTML.split(/<!--\?lit\$\d+\$-->/).join("") });
      const o2 = new URL(e2), r2 = await fetch(o2, { headers: { Accept: "application/json" }, signal: t2 }).catch(console.error);
      if (!r2.ok) return i2(new Error(r2.status));
      const { success: n2, data: a2 } = await r2.json();
      if (n2) {
        const { id: e3, message: t3 } = a2;
        return s3({ isLocal: false, id: e3, message: t3 });
      }
      i2(new Error("The service responded with a message with a prop succes at", n2));
    });
    try {
      const e3 = await s2;
      await __privateMethod(this, _b_instances, i_fn).call(this, e3);
    } catch (e3) {
      console.error("[#getAvis] An error occured: %o", e3);
    }
    return data;
  }, args: () => [this.service] });
};
i_fn = async function(e2) {
  const { id: t2, message: s2 } = e2;
  if (!s2) return void this.setMessage(null);
  if (!("indexedDB" in window)) return void this.setMessage(s2);
  const i2 = __privateSet(this, _t, await n(d, l, { upgrade(e3) {
    e3.objectStoreNames.contains(c) || e3.createObjectStore(c);
  } }));
  try {
    const s3 = await i2.get(c, t2);
    s3 ? s3.hidden || (await i2.delete(c, t2), __privateMethod(this, _b_instances, o_fn).call(this, s3)) : __privateMethod(this, _b_instances, o_fn).call(this, e2);
  } catch (t3) {
    console.error("Something went wrong with indexedDB: %o", t3), this.setMessage(e2.message);
  }
};
o_fn = async function(e2) {
  !this.dispatchEvent(new CustomEvent("bib:show", { bubbles: true, cancelable: true })) || (this.setMessage(e2), __privateGet(this, _t) && await __privateGet(this, _t).put(c, { ...e2, hidden: false }, e2.id));
};
r_fn = async function() {
  if (!this.dispatchEvent(new CustomEvent("bib:hide", { bubbles: true, cancelable: true }))) return;
  const { id: e2 } = __privateGet(this, _e);
  await __privateGet(this, _t).put(c, { ...__privateGet(this, _e), hidden: true }, e2), __privateSet(this, _e, null), this.requestUpdate();
};
n_fn = function() {
  __privateMethod(this, _b_instances, r_fn).call(this);
};
__publicField(b, "properties", { service: { type: String }, boutonFermer: { type: Boolean, attribute: "bouton-fermer" }, message: { state: true } });
__publicField(b, "styles", [s`${i(':host,*,*:after,*:before{box-sizing:border-box}:host{display:block;font-size:var(--bib-avis-size, var(--md-sys-typescale-title-medium-size, inherit));background:var(--bib-avis-container-color, var(--md-sys-color-warningContainer, #ffe8ac))}:host([hidden]){display:none}.inner{display:flex;align-items:center;margin:0 auto;padding:16px;gap:1em}:host(:not([fluide])) .inner{max-width:1536px;padding:16px 64px}.message{flex-grow:1;min-height:24px}.btn-close{display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0px;border:0px;margin:0;cursor:pointer;user-select:none;vertical-align:middle;appearance:none;text-decoration:none;text-align:center;flex:0 0 auto;font-size:1.5rem;font-size:36px;font-weight:700;line-height:1;position:relative;padding:0;border-radius:50%;overflow:visible;color:var(--bib-btn-close-color, rgba(0, 0, 0, .4));transition:color .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}.btn-close:after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-height:44px;min-width:44px;width:100%;height:100%}.btn-close:focus:not([disabled]),.btn-close:focus-visible{outline:var(--md-focus-ring-width, 3px) solid currentColor;outline-offset:3px;border-radius:99999px}.btn-close:focus:not(:focus-visible){outline:0}.btn-close:hover{color:var(--bib-btn-close-hover-color, rgba(0, 0, 0, .8))}.btn-close:hover:after{background-color:#0000000a}.btn-close:after{width:calc(100% + 16px);height:calc(100% + 16px);border-radius:50%;background-color:transparent;transition:background-color .15s cubic-bezier(.4,0,.2,1) 0ms}.btn-close>svg{fill:currentColor}')}`, s``]);
window.customElements.get("bib-avis") || window.customElements.define("bib-avis", b), a("avis", {});
export {
  b as BibAvis
};
//# sourceMappingURL=bib-avis.js.map
