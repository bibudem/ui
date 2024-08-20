/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
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
var _e, _t, _s, _n, _o, _i, _w_instances, c_fn, r_fn, h_fn, a_fn, l_fn, u_fn;
import { L as e, h as t } from "./lit-element-DmnF17fR.js";
import { c as s, r as n } from "./ref-DX06OUxP.js";
import { C as o, a as i } from "./bib-consent-preferences-dialog-BZ3j11wE.js";
import { l as r } from "./logger-CMarO751.js";
import { a as c } from "./bib-BW5s0xHx.js";
import "./bib-button-close.js";
import "./bib-consent-consent-dialog.js";
import a from "./consentClient.js";
import { consentContext as h } from "./consent-context.js";
import { S as l, C as u, b as d, E as p } from "./constants-B_DnKz1g.js";
import { ConsentTokens as v } from "./ConsentTokens.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class b {
  get value() {
    return this._value;
  }
  set value(e2) {
    this.setValue(e2);
  }
  setValue(e2, t2 = false) {
    const s2 = t2 || !Object.is(e2, this._value);
    this._value = e2, s2 && this.updateObservers();
  }
  constructor(e2) {
    this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
      for (const [e3, { disposer: t2 }] of this.subscriptions) e3(this._value, t2);
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
class g extends Event {
  constructor(e2) {
    super("context-provider", { bubbles: true, composed: true }), this.context = e2;
  }
}
class f extends b {
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
    this.host.dispatchEvent(new g(this.context));
  }
}
const m = r("bib-consent", "#cd5300");
class w extends e {
  constructor() {
    super();
    __privateAdd(this, _w_instances);
    __publicField(this, "_consentClient");
    __privateAdd(this, _e);
    __privateAdd(this, _t);
    __privateAdd(this, _s);
    __privateAdd(this, _n, u.INDETERMINATE);
    __privateAdd(this, _o);
    __privateAdd(this, _i);
    this.open = false, this.currentDialog = null, __privateSet(this, _o, s()), __privateSet(this, _i, s()), __privateSet(this, _t, new f(this, { context: h, initialValue: new v() })), __privateSet(this, _s, new i(this, { context: h, callback: this.savePreferences }));
  }
  get state() {
    return __privateGet(this, _n);
  }
  get consentTokens() {
    return __privateGet(this, _s).value;
  }
  async connectedCallback() {
    super.connectedCallback(), this.debug = this.debug || false, this.serverUrl = this.serverUrl || "https://bib.umontreal.ca/consent/server", this.serverRequestTimeout = this.serverRequestTimeout || d, this._consentClient = await a({ host: this, serverUrl: this.serverUrl, serverRequestTimeout: this.serverRequestTimeout, reflectEvents: true }), this._consentClient.addEventListener(p.READY, (e2) => {
      const { detail: t2 } = e2;
      __privateMethod(this, _w_instances, r_fn).call(this, p.READY, "event: ", e2), t2.state() === u.DETERMINATE ? __privateMethod(this, _w_instances, c_fn).call(this, t2) : __privateMethod(this, _w_instances, a_fn).call(this, "consent");
    });
  }
  close() {
    __privateMethod(this, _w_instances, h_fn).call(this);
  }
  show() {
    __privateMethod(this, _w_instances, a_fn).call(this, "consent");
  }
  showPreferences() {
    __privateMethod(this, _w_instances, a_fn).call(this, "preferences");
  }
  async getTokens() {
    return __privateSet(this, _e, await this._consentClient.getConsentTokens()), __privateGet(this, _e);
  }
  async saveTokens(e2) {
    __privateMethod(this, _w_instances, r_fn).call(this, "[save] tokens: ", e2);
    const t2 = v.from(e2);
    try {
      return await this._consentClient.setConsentTokens(t2), __privateMethod(this, _w_instances, c_fn).call(this, t2), true;
    } catch (e3) {
      throw console.error("[savePreferences] error: ", e3), e3;
    }
  }
  async resetTokens() {
    return __privateSet(this, _e, await this._consentClient.resetTokens()), __privateGet(this, _e);
  }
  render() {
    return t`<bib-consent-consent-dialog @update="${__privateMethod(this, _w_instances, l_fn)}" @show-preferences="${() => __privateMethod(this, _w_instances, a_fn).call(this, "preferences")}" ${n(__privateGet(this, _o))} @close="${__privateMethod(this, _w_instances, u_fn)}"></bib-consent-consent-dialog><bib-consent-preferences-dialog @update="${__privateMethod(this, _w_instances, l_fn)}" ${n(__privateGet(this, _i))} @close="${__privateMethod(this, _w_instances, u_fn)}"></bib-consent-preferences-dialog>`;
  }
}
_e = new WeakMap();
_t = new WeakMap();
_s = new WeakMap();
_n = new WeakMap();
_o = new WeakMap();
_i = new WeakMap();
_w_instances = new WeakSet();
c_fn = function(e2) {
  __privateGet(this, _t).setValue(e2), __privateSet(this, _n, __privateGet(this, _t).value.state());
};
r_fn = function() {
  this.debug && m(...arguments);
};
h_fn = function(e2 = true) {
  this.open = false, this.currentDialog?.close(e2), this.currentDialog = null;
};
a_fn = function(e2 = "consent") {
  if ("string" != typeof e2 && !["consent", "preferences"].includes(e2)) throw new TypeError("The panel argument must be a string of either values 'consent' or 'preferences'. ", e2);
  this.open = true, this.currentDialog && (__privateMethod(this, _w_instances, r_fn).call(this, "[#show] this.currentDialog", this.currentDialog), this.currentDialog.close()), __privateMethod(this, _w_instances, r_fn).call(this, "[show]", __privateGet(this, _o).value), __privateMethod(this, _w_instances, r_fn).call(this, "[show]", __privateGet(this, _i).value), this.currentDialog = "consent" === e2 ? __privateGet(this, _o).value : __privateGet(this, _i).value, this.currentDialog.show();
};
l_fn = async function(e2) {
  __privateMethod(this, _w_instances, r_fn).call(this, "[#handleUpdateEvent]", e2);
  const t2 = await this.saveTokens(e2.detail);
  __privateMethod(this, _w_instances, r_fn).call(this, "[#handleUpdateEvent] success: ", t2), t2 && (this.dispatchEvent(new CustomEvent(p.UPDATE, { detail: this.consentTokens })), __privateMethod(this, _w_instances, h_fn).call(this));
};
u_fn = function(e2) {
  e2.stopPropagation(), __privateMethod(this, _w_instances, h_fn).call(this, false);
};
__publicField(w, "properties", { serverUrl: { type: String, attribute: "server-url", reflect: true }, serverRequestTimeout: { type: Number, attribute: "server-request-timeout", reflect: true }, [l.LOCAL]: { type: Boolean }, state: { type: String }, debug: { type: Boolean, reflect: true }, open: { type: Boolean, reflect: true } });
window.customElements.get("bib-consent") || window.customElements.define("bib-consent", w), c("consent", {});
export {
  w as BibConsent
};
//# sourceMappingURL=bib-consent.js.map
