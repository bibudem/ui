/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.13.1
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
var _e, _t, _s, _d_instances, r_fn;
import { E as e, S as t, s, g as r, a as i, c as a, b as n } from "./constants-C4fSqP7Z.js";
import { l as o } from "./logger-BEdk5hAI.js";
import h from "./PreferenceStorage.js";
class d extends EventTarget {
  constructor() {
    super();
    __privateAdd(this, _d_instances);
    __publicField(this, "_server");
    __publicField(this, "_storage");
    __privateAdd(this, _e);
    __privateAdd(this, _t, false);
    __privateAdd(this, _s);
    this.readyState = "initial", this.hosts = [];
  }
  addHost({ host: e2, reflectEvents: t2 }) {
    this.hosts.push({ host: e2, reflectEvents: t2 });
  }
  debug() {
    __privateGet(this, _t) && __privateGet(this, _s).call(this, ...arguments);
  }
  dispatchEvent(e2) {
    super.dispatchEvent(e2), this.hosts.forEach(({ host: t2, reflectEvents: s2 }) => s2 && t2.dispatchEvent?.(e2));
  }
  addEventListener(t2, s2, r2) {
    if (t2 === e.READY && "ready" === this.readyState) return this.debug("Firing ready event immediately since readyState is already ready"), void __privateMethod(this, _d_instances, r_fn).call(this, s2);
    super.addEventListener(t2, s2, r2);
  }
  async init({ host: d2, serverMode: c2, serverUrl: v2, serverRequestTimeout: g = n, reflectEvents: l = true }) {
    let u;
    if (this.serverRequestTimeout = g, d2 && this.addHost({ host: d2, reflectEvents: l }), this.readyState = "connecting", c2 && c2 === t.LOCAL || void 0 === v2 || !s(v2) ? this.serverMode = t.LOCAL : (this.serverUrl = new URL(v2, location), d2.debug && this.serverUrl.searchParams.set("debug", ""), this.serverMode = await r(this)), __privateSet(this, _t, !!d2.debug), __privateGet(this, _t) && __privateSet(this, _s, o("preferencesClient", "purple")), this.debug("init", `server mode: ${this.serverMode}`), this.serverMode === t.REMOTE) {
      const t2 = i(document.body, this.serverUrl.href);
      this.debug("[remote] callServer serverObject: ", t2);
      try {
        this._server = await a(t2), this._server.listenMessage((t3, s2) => {
          this.debug("[remote] server.listenMessage method: ", t3, "detail: ", s2);
          const r2 = new CustomEvent(e.UPDATE, { detail: s2 });
          this.dispatchEvent(r2);
        });
      } catch (e2) {
        throw console.error("[callServer] error: ", e2), e2;
      }
      u = await this._server.postMessage("getPreferences"), this.debug("[remote] Got response from server: ", u);
    } else this._storage = new h(), await this._storage.init(), u = await this._storage.getPreferences(), this.debug("[local] Got response from storage: ", u);
    this.debug("[local] preferences: ", u), void 0 !== u && (this.readyState = "ready", __privateSet(this, _e, u), this.debug("dispatchEvent", e.READY, u), this.dispatchEvent(new CustomEvent(e.READY, { detail: u })));
  }
  async getPreferences() {
    try {
      return this.serverMode === t.LOCAL ? await this._storage.getPreferences() : await this._server.postMessage("getPreferences");
    } catch (e2) {
      throw console.error("[#getPreferences]", e2), e2;
    }
  }
  async setPreferences(s2) {
    try {
      let r2;
      if (void 0 === s2 && (s2 = null), r2 = this.serverMode === t.LOCAL ? await this._storage.setPreferences(s2) : await this._server.postMessage("setPreferences", s2), r2) return this.dispatchEvent(new CustomEvent(e.UPDATE, { detail: r2 })), r2;
    } catch (e2) {
      throw console.error("[#setPreferences]", e2), e2;
    }
  }
  async resetPreferences() {
    try {
      if (this.serverMode === t.LOCAL) return await this._storage.resetPreferences();
      await this._server.postMessage("resetPreferences");
    } catch (e2) {
      throw console.error("[#resetPreferences]", e2), e2;
    }
  }
}
_e = new WeakMap();
_t = new WeakMap();
_s = new WeakMap();
_d_instances = new WeakSet();
r_fn = async function(t2) {
  const s2 = await this.getPreferences(), r2 = new CustomEvent(e.READY, { detail: s2 });
  this.debug("Firing ready event with preferences: ", s2), t2(r2);
};
let c;
async function v(e2) {
  return c ? (c.addHost(e2), c) : (c = new d(), await c.init(e2), c);
}
export {
  v as default
};
//# sourceMappingURL=preferencesClient.js.map
