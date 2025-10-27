/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.1
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
var _e, _s, _c_instances, t_fn;
import { s as e, c as s } from "./url-B0JPXU6k.js";
import { l as t } from "./logger-BQOjDRpZ.js";
import r from "./ConsentStorage.js";
import { ConsentTokens as o } from "./ConsentTokens.js";
import { getServerMode as n, getIframeServer as i } from "./utils.js";
import { EVENT_NAMES as a, SERVER_MODE as d, SERVER_REQUEST_DEFAULT_TIMEOUT as h } from "./constants2.js";
class c extends EventTarget {
  constructor() {
    super();
    __privateAdd(this, _c_instances);
    __publicField(this, "_server");
    __publicField(this, "_storage");
    __privateAdd(this, _e, false);
    __privateAdd(this, _s);
    this.readyState = "initial", this.hosts = [];
  }
  addHost({ host: e2, reflectEvents: s2 }) {
    this.hosts.push({ host: e2, reflectEvents: s2 });
  }
  debug() {
    __privateGet(this, _e) && __privateGet(this, _s).call(this, ...arguments);
  }
  dispatchEvent(e2) {
    super.dispatchEvent(e2);
  }
  addEventListener(e2, s2, t2) {
    if (e2 === a.READY && "ready" === this.readyState) return this.debug("Firing ready event immediately since readyState is already ready"), void __privateMethod(this, _c_instances, t_fn).call(this, s2);
    super.addEventListener(e2, s2, t2);
  }
  async init({ host: c2, serverMode: u2, serverUrl: v2, serverRequestTimeout: g = h, reflectEvents: l = true }) {
    let m;
    if (this.serverRequestTimeout = g, c2 && this.addHost({ host: c2, reflectEvents: l }), this.readyState = "connecting", u2 && u2 === d.LOCAL || void 0 === v2 || !e(v2) ? this.serverMode = d.LOCAL : (this.serverUrl = new URL(v2, location), c2.debug && this.serverUrl.searchParams.set("debug", ""), this.serverMode = await n(this)), __privateSet(this, _e, !!c2.debug), __privateGet(this, _e) && __privateSet(this, _s, t("consentClient", "purple")), this.debug("init", `server mode: ${this.serverMode}`), this.serverMode === d.REMOTE) {
      const e2 = i(document.body, this.serverUrl.href);
      try {
        this._server = await s(e2), this._server.listenMessage((e3, s2) => {
          const t2 = o.from(s2), r2 = new CustomEvent(a.CHANGE, { detail: t2, bubbles: true, composed: true });
          this.dispatchEvent(r2);
        });
      } catch (e3) {
        throw console.error("[callServer] error: ", e3), e3;
      }
      m = o.from(await this._server.postMessage("getConsentTokens")), this.debug("[remote] Got response from server: ", m);
    } else this._storage = await r(), m = await this._storage.getConsentTokens(), this.debug("[local] Got response from storage: ", m);
    this.debug("[local] consentTokens: ", m), void 0 !== m && (this.readyState = "ready", this.dispatchEvent(new CustomEvent(a.READY, { detail: m, bubbles: true, composed: true })));
  }
  async getConsentTokens() {
    try {
      return this.serverMode === d.LOCAL ? await this._storage.getConsentTokens() : o.from(await this._server.postMessage("getConsentTokens"));
    } catch (e2) {
      throw console.error("[#getConsentTokens]", e2), e2;
    }
  }
  async setConsentTokens(e2) {
    try {
      let s2;
      const t2 = o.from(e2);
      if (s2 = this.serverMode === d.LOCAL ? await this._storage.setConsentTokens(t2) : await this._server.postMessage("setConsentTokens", t2), s2) return this.dispatchEvent(new CustomEvent(a.CHANGE, { detail: s2, bubbles: true, composed: true })), s2;
    } catch (e3) {
      throw console.error("[#setConsentTokens]", e3), e3;
    }
  }
  async resetTokens() {
    try {
      if (this.serverMode === d.LOCAL) return await this._storage.resetTokens();
      await this._server.postMessage("resetTokens");
    } catch (e2) {
      throw console.error("[#resetTokens]", e2), e2;
    }
  }
}
_e = new WeakMap();
_s = new WeakMap();
_c_instances = new WeakSet();
t_fn = async function(e2) {
  const s2 = await this.getConsentTokens(), t2 = new CustomEvent(a.READY, { detail: s2, bubbles: true, composed: true });
  this.debug("Firing ready event with preferences: ", s2), e2(t2);
};
let u;
async function v(e2) {
  return u ? (u.addHost(e2), u) : (u = new c(), await u.init(e2), u);
}
export {
  v as default
};
//# sourceMappingURL=consentClient.js.map
