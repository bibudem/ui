/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.1.1
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
var _e, _t, _c_instances, s_fn;
import { s as e, c as t } from "./url-B0JPXU6k.js";
import { l as s } from "./logger-CqwzzWaI.js";
import r from "./ConsentStorage.js";
import { ConsentTokens as o } from "./ConsentTokens.js";
import { getServerMode as n, getIframeServer as i } from "./utils.js";
import { EVENT_NAMES as a, SERVER_MODE as h, SERVER_REQUEST_DEFAULT_TIMEOUT as d } from "./constants2.js";
class c extends EventTarget {
  constructor() {
    super();
    __privateAdd(this, _c_instances);
    __publicField(this, "_server");
    __publicField(this, "_storage");
    __privateAdd(this, _e, false);
    __privateAdd(this, _t);
    this.readyState = "initial", this.hosts = [];
  }
  addHost({ host: e2, reflectEvents: t2 }) {
    this.hosts.push({ host: e2, reflectEvents: t2 });
  }
  debug() {
    __privateGet(this, _e) && __privateGet(this, _t).call(this, ...arguments);
  }
  dispatchEvent(e2) {
    super.dispatchEvent(e2), this.hosts.forEach(({ host: t2, reflectEvents: s2 }) => s2 && t2.dispatchEvent?.(e2));
  }
  addEventListener(e2, t2, s2) {
    if (e2 === a.READY && "ready" === this.readyState) return this.debug("Firing ready event immediately since readyState is already ready"), void __privateMethod(this, _c_instances, s_fn).call(this, t2);
    super.addEventListener(e2, t2, s2);
  }
  async init({ host: c2, serverMode: v2, serverUrl: g2, serverRequestTimeout: u = d, reflectEvents: l = true }) {
    let m;
    if (this.serverRequestTimeout = u, c2 && this.addHost({ host: c2, reflectEvents: l }), this.readyState = "connecting", v2 && v2 === h.LOCAL || void 0 === g2 || !e(g2) ? this.serverMode = h.LOCAL : (this.serverUrl = new URL(g2, location), c2.debug && this.serverUrl.searchParams.set("debug", ""), this.serverMode = await n(this)), __privateSet(this, _e, !!c2.debug), __privateGet(this, _e) && __privateSet(this, _t, s("consentClient", "purple")), this.debug("init", `server mode: ${this.serverMode}`), this.serverMode === h.REMOTE) {
      const e2 = i(document.body, this.serverUrl.href);
      try {
        this._server = await t(e2), this._server.listenMessage((e3, t2) => {
          this.debug("[remote] server.listenMessage method: ", e3, "data: ", t2);
          const s2 = o.from(t2), r2 = new CustomEvent(a.UPDATE, { detail: s2 });
          this.dispatchEvent(r2);
        });
      } catch (e3) {
        throw console.error("[callServer] error: ", e3), e3;
      }
      m = o.from(await this._server.postMessage("getConsentTokens")), this.debug("[remote] Got response from server: ", m);
    } else this._storage = await r(), m = await this._storage.getConsentTokens(), this.debug("[local] Got response from storage: ", m);
    this.debug("[local] consentTokens: ", m), void 0 !== m && (this.readyState = "ready", this.debug("dispatchEvent", a.READY, m), this.dispatchEvent(new CustomEvent(a.READY, { detail: m })));
  }
  async getConsentTokens() {
    try {
      return this.serverMode === h.LOCAL ? await this._storage.getConsentTokens() : o.from(await this._server.postMessage("getConsentTokens"));
    } catch (e2) {
      throw console.error("[#getConsentTokens]", e2), e2;
    }
  }
  async setConsentTokens(e2) {
    try {
      let t2;
      const s2 = o.from(e2);
      if (t2 = this.serverMode === h.LOCAL ? await this._storage.setConsentTokens(s2) : await this._server.postMessage("setConsentTokens", s2), t2) return this.dispatchEvent(new CustomEvent(a.UPDATE, { detail: t2 })), t2;
    } catch (e3) {
      throw console.error("[#setConsentTokens]", e3), e3;
    }
  }
  async resetTokens() {
    try {
      if (this.serverMode === h.LOCAL) return await this._storage.resetTokens();
      await this._server.postMessage("resetTokens");
    } catch (e2) {
      throw console.error("[#resetTokens]", e2), e2;
    }
  }
}
_e = new WeakMap();
_t = new WeakMap();
_c_instances = new WeakSet();
s_fn = async function(e2) {
  const t2 = await this.getConsentTokens(), s2 = new CustomEvent(a.READY, { detail: t2 });
  this.debug("Firing ready event with preferences: ", t2), e2(s2);
};
let v;
async function g(e2) {
  return v ? (v.addHost(e2), v) : (v = new c(), await v.init(e2), v);
}
export {
  g as default
};
//# sourceMappingURL=consentClient.js.map
