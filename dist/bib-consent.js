/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.21.0
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
var _e, _t, _s, _n, _o, _i, _E_instances, c_fn, r_fn, h_fn, a_fn, l_fn, u_fn;
import { s as e, x as t } from "./lit-element-Dj1nHH6C.js";
import { e as s, n } from "./ref-B-kqFHPy.js";
import { s as o, a as i } from "./bib-consent-preferences-dialog-DizgF75h.js";
import { l as r } from "./logger-DUD5CkCC.js";
import { a as c } from "./bib-DQcZq7c_.js";
import { ConsentTokens as a } from "./ConsentTokens.js";
import h from "./consentClient.js";
import { consentContext as l } from "./consent-context.js";
import "./bib-button-close.js";
import "./bib-consent-consent-dialog.js";
import { S as u, C as d, f as p, b, E as v } from "./constants-BzVDdA62.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class g {
  get value() {
    return this.o;
  }
  set value(e2) {
    this.setValue(e2);
  }
  setValue(e2, t2 = false) {
    const s2 = t2 || !Object.is(e2, this.o);
    this.o = e2, s2 && this.updateObservers();
  }
  constructor(e2) {
    this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
      for (const [e3, { disposer: t2 }] of this.subscriptions) e3(this.o, t2);
    }, void 0 !== e2 && (this.value = e2);
  }
  addCallback(e2, t2, s2) {
    if (!s2) return void e2(this.value);
    this.subscriptions.has(e2) || this.subscriptions.set(e2, { disposer: () => {
      this.subscriptions.delete(e2);
    }, consumerHost: t2 });
    const { disposer: n2 } = this.subscriptions.get(e2);
    e2(this.value, n2);
  }
  clearCallbacks() {
    this.subscriptions.clear();
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class f extends Event {
  constructor(e2) {
    super("context-provider", { bubbles: true, composed: true }), this.context = e2;
  }
}
class m extends g {
  constructor(e2, t2, s2) {
    super(void 0 !== t2.context ? t2.initialValue : s2), this.onContextRequest = (e3) => {
      const t3 = e3.composedPath()[0];
      e3.context === this.context && t3 !== this.host && (e3.stopPropagation(), this.addCallback(e3.callback, t3, e3.subscribe));
    }, this.onProviderRequest = (e3) => {
      const t3 = e3.composedPath()[0];
      if (e3.context !== this.context || t3 === this.host) return;
      const s3 = /* @__PURE__ */ new Set();
      for (const [e4, { consumerHost: t4 }] of this.subscriptions) s3.has(e4) || (s3.add(e4), t4.dispatchEvent(new o(this.context, e4, true)));
      e3.stopPropagation();
    }, this.host = e2, void 0 !== t2.context ? this.context = t2.context : this.context = t2, this.attachListeners(), this.host.addController?.(this);
  }
  attachListeners() {
    this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
  }
  hostConnected() {
    this.host.dispatchEvent(new f(this.context));
  }
}
const w = r("bib-consent", "#cd5300");
class E extends e {
  constructor() {
    super();
    __privateAdd(this, _E_instances);
    __publicField(this, "_consentClient");
    __privateAdd(this, _e);
    __privateAdd(this, _t);
    __privateAdd(this, _s);
    __privateAdd(this, _n, d.INDETERMINATE);
    __privateAdd(this, _o);
    __privateAdd(this, _i);
    this.open = false, this.currentDialog = null, __privateSet(this, _o, s()), __privateSet(this, _i, s()), __privateSet(this, _t, new m(this, { context: l, initialValue: new a() })), __privateSet(this, _s, new i(this, { context: l, callback: this.savePreferences }));
  }
  get state() {
    return __privateGet(this, _n);
  }
  get consentTokens() {
    return __privateGet(this, _s).value;
  }
  async connectedCallback() {
    super.connectedCallback(), this.debug = this.debug || false, this.serverUrl = this.serverUrl || p, this.serverRequestTimeout = this.serverRequestTimeout || b, this._consentClient = await h({ host: this, serverUrl: this.serverUrl, serverRequestTimeout: this.serverRequestTimeout, reflectEvents: true }), this._consentClient.addEventListener(v.READY, (e2) => {
      const { detail: t2 } = e2;
      __privateMethod(this, _E_instances, r_fn).call(this, v.READY, "event: ", e2), t2.state() === d.DETERMINATE ? __privateMethod(this, _E_instances, c_fn).call(this, t2) : __privateMethod(this, _E_instances, a_fn).call(this, "consent");
    });
  }
  close() {
    __privateMethod(this, _E_instances, h_fn).call(this);
  }
  show() {
    __privateMethod(this, _E_instances, a_fn).call(this, "consent");
  }
  showPreferences() {
    __privateMethod(this, _E_instances, a_fn).call(this, "preferences");
  }
  async getTokens() {
    return __privateSet(this, _e, await this._consentClient.getConsentTokens()), __privateGet(this, _e);
  }
  async saveTokens(e2) {
    __privateMethod(this, _E_instances, r_fn).call(this, "[save] tokens: ", e2);
    const t2 = a.from(e2);
    try {
      return await this._consentClient.setConsentTokens(t2), __privateMethod(this, _E_instances, c_fn).call(this, t2), true;
    } catch (e3) {
      throw console.error("[savePreferences] error: ", e3), e3;
    }
  }
  async resetTokens() {
    return __privateSet(this, _e, await this._consentClient.resetTokens()), __privateGet(this, _e);
  }
  render() {
    return t`<bib-consent-consent-dialog @update="${__privateMethod(this, _E_instances, l_fn)}" @show-preferences="${() => __privateMethod(this, _E_instances, a_fn).call(this, "preferences")}" ${n(__privateGet(this, _o))} @close="${__privateMethod(this, _E_instances, u_fn)}"></bib-consent-consent-dialog><bib-consent-preferences-dialog @update="${__privateMethod(this, _E_instances, l_fn)}" ${n(__privateGet(this, _i))} @close="${__privateMethod(this, _E_instances, u_fn)}"></bib-consent-preferences-dialog>`;
  }
}
_e = new WeakMap();
_t = new WeakMap();
_s = new WeakMap();
_n = new WeakMap();
_o = new WeakMap();
_i = new WeakMap();
_E_instances = new WeakSet();
c_fn = function(e2) {
  __privateGet(this, _t).setValue(e2), __privateSet(this, _n, __privateGet(this, _t).value.state());
};
r_fn = function() {
  this.debug && w(...arguments);
};
h_fn = function(e2 = true) {
  this.open = false, this.currentDialog?.close(e2), this.currentDialog = null;
};
a_fn = function(e2 = "consent") {
  if ("string" != typeof e2 && !["consent", "preferences"].includes(e2)) throw new TypeError("The panel argument must be a string of either values 'consent' or 'preferences'. ", e2);
  this.open = true, this.currentDialog && (__privateMethod(this, _E_instances, r_fn).call(this, "[#show] this.currentDialog", this.currentDialog), this.currentDialog.close()), __privateMethod(this, _E_instances, r_fn).call(this, "[show]", __privateGet(this, _o).value), __privateMethod(this, _E_instances, r_fn).call(this, "[show]", __privateGet(this, _i).value), this.currentDialog = "consent" === e2 ? __privateGet(this, _o).value : __privateGet(this, _i).value, this.currentDialog.show();
};
l_fn = async function(e2) {
  __privateMethod(this, _E_instances, r_fn).call(this, "[#handleUpdateEvent]", e2);
  const t2 = await this.saveTokens(e2.detail);
  __privateMethod(this, _E_instances, r_fn).call(this, "[#handleUpdateEvent] success: ", t2), t2 && (this.dispatchEvent(new CustomEvent(v.UPDATE, { detail: this.consentTokens })), __privateMethod(this, _E_instances, h_fn).call(this));
};
u_fn = function(e2) {
  e2.stopPropagation(), __privateMethod(this, _E_instances, h_fn).call(this, false);
};
__publicField(E, "properties", { serverUrl: { type: String, attribute: "server-url" }, serverRequestTimeout: { type: Number, attribute: "server-request-timeout" }, [u.LOCAL]: { type: Boolean }, state: { type: String }, debug: { type: Boolean, reflect: true }, open: { type: Boolean, reflect: true } });
window.customElements.get("bib-consent") || window.customElements.define("bib-consent", E), c("consent", {});
export {
  E as BibConsent
};
//# sourceMappingURL=bib-consent.js.map
