/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.17.0
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
import { E as e, S as t, s, g as r, a as o, c as n, b as i } from "./constants-DwY9Xkx4.js";
import { l as a } from "./logger-C1cJseWj.js";
import h from "./ConsentStorage.js";
import { ConsentTokens as d } from "./ConsentTokens.js";
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
  addEventListener(t2, s2, r2) {
    if (t2 === e.READY && "ready" === this.readyState) return this.debug("Firing ready event immediately since readyState is already ready"), void __privateMethod(this, _c_instances, s_fn).call(this, s2);
    super.addEventListener(t2, s2, r2);
  }
  async init({ host: c2, serverMode: v2, serverUrl: g2, serverRequestTimeout: u = i, reflectEvents: l = true }) {
    let E;
    if (this.serverRequestTimeout = u, c2 && this.addHost({ host: c2, reflectEvents: l }), this.readyState = "connecting", v2 && v2 === t.LOCAL || void 0 === g2 || !s(g2) ? this.serverMode = t.LOCAL : (this.serverUrl = new URL(g2, location), c2.debug && this.serverUrl.searchParams.set("debug", ""), this.serverMode = await r(this)), __privateSet(this, _e, !!c2.debug), __privateGet(this, _e) && __privateSet(this, _t, a("consentClient", "purple")), this.debug("init", `server mode: ${this.serverMode}`), this.serverMode === t.REMOTE) {
      const t2 = o(document.body, this.serverUrl.href);
      try {
        this._server = await n(t2), this._server.listenMessage((t3, s2) => {
          this.debug("[remote] server.listenMessage method: ", t3, "data: ", s2);
          const r2 = d.from(s2), o2 = new CustomEvent(e.UPDATE, { detail: r2 });
          this.dispatchEvent(o2);
        });
      } catch (e2) {
        throw console.error("[callServer] error: ", e2), e2;
      }
      E = d.from(await this._server.postMessage("getConsentTokens")), this.debug("[remote] Got response from server: ", E);
    } else this._storage = await h(), E = await this._storage.getConsentTokens(), this.debug("[local] Got response from storage: ", E);
    this.debug("[local] consentTokens: ", E), void 0 !== E && (this.readyState = "ready", this.debug("dispatchEvent", e.READY, E), this.dispatchEvent(new CustomEvent(e.READY, { detail: E })));
  }
  async getConsentTokens() {
    try {
      return this.serverMode === t.LOCAL ? await this._storage.getConsentTokens() : d.from(await this._server.postMessage("getConsentTokens"));
    } catch (e2) {
      throw console.error("[#getConsentTokens]", e2), e2;
    }
  }
  async setConsentTokens(s2) {
    try {
      let r2;
      const o2 = d.from(s2);
      if (r2 = this.serverMode === t.LOCAL ? await this._storage.setConsentTokens(o2) : await this._server.postMessage("setConsentTokens", o2), r2) return this.dispatchEvent(new CustomEvent(e.UPDATE, { detail: r2 })), r2;
    } catch (e2) {
      throw console.error("[#setConsentTokens]", e2), e2;
    }
  }
  async resetTokens() {
    try {
      if (this.serverMode === t.LOCAL) return await this._storage.resetTokens();
      await this._server.postMessage("resetTokens");
    } catch (e2) {
      throw console.error("[#resetTokens]", e2), e2;
    }
  }
}
_e = new WeakMap();
_t = new WeakMap();
_c_instances = new WeakSet();
s_fn = async function(t2) {
  const s2 = await this.getConsentTokens(), r2 = new CustomEvent(e.READY, { detail: s2 });
  this.debug("Firing ready event with preferences: ", s2), t2(r2);
};
let v;
async function g(e2) {
  return v ? (v.addHost(e2), v) : (v = new c(), await v.init(e2), v);
}
export {
  g as default
};
//# sourceMappingURL=consentClient.js.map
