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
var _e, _t, _s, _n, _o, _i, _r, _C_instances, c_fn, h_fn, l_fn, u_fn, a_fn, d_fn, p_fn;
import { s as e, x as t } from "./lit-element-Dj1nHH6C.js";
import { e as s, n } from "./ref-B-kqFHPy.js";
import { s as o, a as i } from "./bib-consent-preferences-dialog-DVwg6XoV.js";
import { l as r } from "./logger-BQOjDRpZ.js";
import { a as c } from "./bib-CrTOU84w.js";
import { d as h } from "./events-BtF7lCmA.js";
import { ConsentTokens as a } from "./ConsentTokens.js";
import l from "./consentClient.js";
import { consentContext as u } from "./consent-context.js";
import "./bib-button-close.js";
import "./bib-consent-consent-dialog.js";
import { SERVER_MODE as d, CONSENT_STATES as p, SERVER_DEFAULT_URL as b, SERVER_REQUEST_DEFAULT_TIMEOUT as g, EVENT_NAMES as v } from "./constants2.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class f {
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
class m extends Event {
  constructor(e2) {
    super("context-provider", { bubbles: true, composed: true }), this.context = e2;
  }
}
class w extends f {
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
    this.host.dispatchEvent(new m(this.context));
  }
}
class C extends e {
  constructor() {
    super();
    __privateAdd(this, _C_instances);
    __privateAdd(this, _e, r("bib-consent", "#cd5300"));
    __publicField(this, "_consentClient");
    __privateAdd(this, _t);
    __privateAdd(this, _s);
    __privateAdd(this, _n);
    __privateAdd(this, _o, p.INDETERMINATE);
    __privateAdd(this, _i);
    __privateAdd(this, _r);
    this.open = false, this.currentDialog = null, __privateSet(this, _i, s()), __privateSet(this, _r, s()), __privateSet(this, _s, new w(this, { context: u, initialValue: new a() })), __privateSet(this, _n, new i(this, { context: u, callback: this.savePreferences }));
  }
  get state() {
    return __privateGet(this, _o);
  }
  async connectedCallback() {
    super.connectedCallback(), this.debug = this.debug || false, this.serverUrl = this.serverUrl || b, this.serverRequestTimeout = this.serverRequestTimeout || g, this._consentClient = await l({ host: this, serverUrl: this.serverUrl, serverRequestTimeout: this.serverRequestTimeout, reflectEvents: true }), this._consentClient.addEventListener(v.READY, (e2) => {
      const { detail: t2 } = e2;
      t2.getState() === p.DETERMINATE ? __privateMethod(this, _C_instances, h_fn).call(this, t2) : __privateMethod(this, _C_instances, a_fn).call(this, "consent"), __privateMethod(this, _C_instances, c_fn).call(this, v.READY, t2.toObject());
    });
  }
  close() {
    __privateMethod(this, _C_instances, u_fn).call(this);
  }
  show() {
    __privateMethod(this, _C_instances, a_fn).call(this, "consent");
  }
  showPreferences() {
    __privateMethod(this, _C_instances, a_fn).call(this, "preferences");
  }
  async getTokens() {
    return __privateSet(this, _t, await this._consentClient.getConsentTokens()), __privateGet(this, _t).toObject();
  }
  async saveTokens(e2) {
    __privateMethod(this, _C_instances, l_fn).call(this, "[save] tokens: ", e2);
    const t2 = a.from(e2);
    try {
      return await this._consentClient.setConsentTokens(t2), __privateMethod(this, _C_instances, h_fn).call(this, t2), true;
    } catch (e3) {
      throw console.error("[savePreferences] error: ", e3), e3;
    }
  }
  async resetTokens() {
    await this._consentClient.resetTokens();
    const e2 = await this._consentClient.getConsentTokens();
    return __privateSet(this, _t, e2), __privateMethod(this, _C_instances, c_fn).call(this, v.CHANGE, e2.toObject()), e2;
  }
  render() {
    return t`<bib-consent-consent-dialog @intern:change="${__privateMethod(this, _C_instances, d_fn)}" @intern:show-preferences="${() => __privateMethod(this, _C_instances, a_fn).call(this, "preferences")}" ${n(__privateGet(this, _i))} @intern:close="${__privateMethod(this, _C_instances, p_fn)}"></bib-consent-consent-dialog><bib-consent-preferences-dialog @intern:change="${__privateMethod(this, _C_instances, d_fn)}" ${n(__privateGet(this, _r))} @intern:close="${__privateMethod(this, _C_instances, p_fn)}"></bib-consent-preferences-dialog>`;
  }
}
_e = new WeakMap();
_t = new WeakMap();
_s = new WeakMap();
_n = new WeakMap();
_o = new WeakMap();
_i = new WeakMap();
_r = new WeakMap();
_C_instances = new WeakSet();
c_fn = function(e2, t2 = null) {
  h(this, e2, { detail: t2 });
};
h_fn = function(e2) {
  __privateGet(this, _s).setValue(e2), __privateSet(this, _o, __privateGet(this, _s).value.getState());
};
l_fn = function() {
  this.debug && __privateGet(this, _e).call(this, ...arguments);
};
u_fn = function(e2 = true) {
  this.open = false, this.currentDialog?.close(e2), this.currentDialog = null, e2 && __privateMethod(this, _C_instances, c_fn).call(this, v.CLOSE);
};
a_fn = function(e2 = "consent") {
  const t2 = ["consent", "preferences"];
  if ("string" != typeof e2 && !t2.includes(e2)) throw new TypeError(`The panel argument must be a string of either values \`${t2.join(" or ")}\`. You provided \`${e2}\``, e2);
  this.open = true, this.currentDialog && (__privateMethod(this, _C_instances, l_fn).call(this, "[#show] this.currentDialog", this.currentDialog), this.currentDialog.close()), __privateMethod(this, _C_instances, l_fn).call(this, "[show]", __privateGet(this, _i).value), __privateMethod(this, _C_instances, l_fn).call(this, "[show]", __privateGet(this, _r).value), this.currentDialog = "consent" === e2 ? __privateGet(this, _i).value : __privateGet(this, _r).value, this.currentDialog.show();
};
d_fn = async function(e2) {
  if (!await this.saveTokens(e2.detail)) return;
  const t2 = await this.getTokens();
  __privateMethod(this, _C_instances, c_fn).call(this, v.CHANGE, t2), __privateMethod(this, _C_instances, u_fn).call(this);
};
p_fn = function(e2) {
  __privateMethod(this, _C_instances, u_fn).call(this, false);
};
__publicField(C, "properties", { serverUrl: { type: String, attribute: "server-url" }, serverRequestTimeout: { type: Number, attribute: "server-request-timeout" }, [d.LOCAL]: { type: Boolean }, state: { type: String }, debug: { type: Boolean, reflect: true }, open: { type: Boolean, reflect: true } });
window.customElements.get("bib-consent") || window.customElements.define("bib-consent", C), c("consent", {});
export {
  C as BibConsent
};
//# sourceMappingURL=bib-consent.js.map
