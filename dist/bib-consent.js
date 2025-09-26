/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.2.0
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
var _e, _t, _s, _o, _n, _r, _Z_instances, i_fn, c_fn, l_fn, h_fn, a_fn, u_fn, p_fn;
import { s as e, x as t } from "./lit-element-Dj1nHH6C.js";
import { e as s, n as o } from "./ref-B-kqFHPy.js";
import { s as n, a as r } from "./bib-consent-preferences-dialog-DVwg6XoV.js";
import { l as i } from "./logger-BMZPTtxW.js";
import { a as c } from "./bib-RFFKFfZN.js";
import { d as a } from "./events-BtF7lCmA.js";
import { ConsentTokens as l } from "./ConsentTokens.js";
import h from "./consentClient.js";
import { consentContext as u } from "./consent-context.js";
import "./bib-button-close.js";
import "./bib-consent-consent-dialog.js";
import { SERVER_MODE as p, CONSENT_STATES as d, SERVER_DEFAULT_URL as b, SERVER_REQUEST_DEFAULT_TIMEOUT as f, EVENT_NAMES as v } from "./constants2.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let g = class {
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
    const { disposer: o2 } = this.subscriptions.get(e2);
    e2(this.value, o2);
  }
  clearCallbacks() {
    this.subscriptions.clear();
  }
}, m = class extends Event {
  constructor(e2) {
    super("context-provider", { bubbles: true, composed: true }), this.context = e2;
  }
}, y = class extends g {
  constructor(e2, t2, s2) {
    super(void 0 !== t2.context ? t2.initialValue : s2), this.onContextRequest = (e3) => {
      const t3 = e3.composedPath()[0];
      e3.context === this.context && t3 !== this.host && (e3.stopPropagation(), this.addCallback(e3.callback, t3, e3.subscribe));
    }, this.onProviderRequest = (e3) => {
      const t3 = e3.composedPath()[0];
      if (e3.context !== this.context || t3 === this.host) return;
      const s3 = /* @__PURE__ */ new Set();
      for (const [e4, { consumerHost: t4 }] of this.subscriptions) s3.has(e4) || (s3.add(e4), t4.dispatchEvent(new n(this.context, e4, true)));
      e3.stopPropagation();
    }, this.host = e2, void 0 !== t2.context ? this.context = t2.context : this.context = t2, this.attachListeners(), this.host.addController?.(this);
  }
  attachListeners() {
    this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
  }
  hostConnected() {
    this.host.dispatchEvent(new m(this.context));
  }
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.1.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var j = "object" == typeof global && global && global.Object === Object && global, w = "object" == typeof self && self && self.Object === Object && self, x = j || w || Function("return this")(), E = x.Symbol, C = Object.prototype, T = C.hasOwnProperty, R = C.toString, k = E ? E.toStringTag : void 0, O = Object.prototype.toString, P = E ? E.toStringTag : void 0;
function D(e2) {
  return null == e2 ? void 0 === e2 ? "[object Undefined]" : "[object Null]" : P && P in Object(e2) ? function(e3) {
    var t3 = T.call(e3, k), s2 = e3[k];
    try {
      e3[k] = void 0;
      var o2 = true;
    } catch (e4) {
    }
    var n2 = R.call(e3);
    return o2 && (t3 ? e3[k] = s2 : delete e3[k]), n2;
  }(e2) : (t2 = e2, O.call(t2));
  var t2;
}
function $(e2) {
  var t2 = typeof e2;
  return null != e2 && ("object" == t2 || "function" == t2);
}
/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.1.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var S, _ = x["__core-js_shared__"], q = (S = /[^.]+$/.exec(_ && _.keys && _.keys.IE_PROTO || "")) ? "Symbol(src)_1." + S : "", A = Function.prototype.toString, L = /^\[object .+?Constructor\]$/, V = Function.prototype, N = Object.prototype, U = V.toString, F = N.hasOwnProperty, B = RegExp("^" + U.call(F).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function I(e2, t2) {
  var s2, o2, n2, r2 = null == (s2 = e2) ? void 0 : s2[t2];
  return $(o2 = r2) && (n2 = o2, !q || !(q in n2)) && (function(e3) {
    if (!$(e3)) return false;
    var t3 = D(e3);
    return "[object Function]" == t3 || "[object GeneratorFunction]" == t3 || "[object AsyncFunction]" == t3 || "[object Proxy]" == t3;
  }(o2) ? B : L).test(function(e3) {
    if (null != e3) {
      try {
        return A.call(e3);
      } catch (e4) {
      }
      try {
        return e3 + "";
      } catch (e4) {
      }
    }
    return "";
  }(o2)) ? r2 : void 0;
}
var H, M = Object.prototype;
M.hasOwnProperty, M.propertyIsEnumerable, function(e2) {
  return null != e2 && "object" == typeof e2;
}(H = /* @__PURE__ */ function() {
  return arguments;
}()) && D(H);
var G = "object" == typeof exports && exports && !exports.nodeType && exports, Y = G && "object" == typeof module && module && !module.nodeType && module, z = Y && Y.exports === G ? x.Buffer : void 0;
z && z.isBuffer;
var J = "object" == typeof exports && exports && !exports.nodeType && exports, K = J && "object" == typeof module && module && !module.nodeType && module, Q = K && K.exports === J && j.process, W = function() {
  try {
    return K && K.require && K.require("util").types || Q && Q.binding && Q.binding("util");
  } catch (e2) {
  }
}();
W && W.isTypedArray, I(Object, "create"), I(x, "Map"), x.Uint8Array;
const X = i("bib-consent", "#cd5300");
class Z extends e {
  constructor() {
    super();
    __privateAdd(this, _Z_instances);
    __publicField(this, "_consentClient");
    __privateAdd(this, _e);
    __privateAdd(this, _t);
    __privateAdd(this, _s);
    __privateAdd(this, _o, d.INDETERMINATE);
    __privateAdd(this, _n);
    __privateAdd(this, _r);
    this.open = false, this.currentDialog = null, __privateSet(this, _n, s()), __privateSet(this, _r, s()), __privateSet(this, _t, new y(this, { context: u, initialValue: new l() })), __privateSet(this, _s, new r(this, { context: u, callback: this.savePreferences }));
  }
  get state() {
    return __privateGet(this, _o);
  }
  async connectedCallback() {
    super.connectedCallback(), this.debug = this.debug || false, this.serverUrl = this.serverUrl || b, this.serverRequestTimeout = this.serverRequestTimeout || f, this._consentClient = await h({ host: this, serverUrl: this.serverUrl, serverRequestTimeout: this.serverRequestTimeout, reflectEvents: true }), this._consentClient.addEventListener(v.READY, (e2) => {
      const { detail: t2 } = e2;
      t2.getState() === d.DETERMINATE ? __privateMethod(this, _Z_instances, c_fn).call(this, t2) : __privateMethod(this, _Z_instances, a_fn).call(this, "consent"), __privateMethod(this, _Z_instances, i_fn).call(this, v.READY, { ...t2.toObject(), a: "allo" });
    });
  }
  close() {
    __privateMethod(this, _Z_instances, h_fn).call(this);
  }
  show() {
    __privateMethod(this, _Z_instances, a_fn).call(this, "consent");
  }
  showPreferences() {
    __privateMethod(this, _Z_instances, a_fn).call(this, "preferences");
  }
  async getTokens() {
    return __privateSet(this, _e, await this._consentClient.getConsentTokens()), __privateGet(this, _e).toObject();
  }
  async saveTokens(e2) {
    __privateMethod(this, _Z_instances, l_fn).call(this, "[save] tokens: ", e2);
    const t2 = l.from(e2);
    try {
      return await this._consentClient.setConsentTokens(t2), __privateMethod(this, _Z_instances, c_fn).call(this, t2), true;
    } catch (e3) {
      throw console.error("[savePreferences] error: ", e3), e3;
    }
  }
  async resetTokens() {
    await this._consentClient.resetTokens();
    const e2 = await this._consentClient.getConsentTokens();
    return __privateSet(this, _e, e2), __privateMethod(this, _Z_instances, i_fn).call(this, v.CHANGE, e2.toObject()), e2;
  }
  render() {
    return t`<bib-consent-consent-dialog @intern:change="${__privateMethod(this, _Z_instances, u_fn)}" @intern:show-preferences="${() => __privateMethod(this, _Z_instances, a_fn).call(this, "preferences")}" ${o(__privateGet(this, _n))} @intern:close="${__privateMethod(this, _Z_instances, p_fn)}"></bib-consent-consent-dialog><bib-consent-preferences-dialog @intern:change="${__privateMethod(this, _Z_instances, u_fn)}" ${o(__privateGet(this, _r))} @intern:close="${__privateMethod(this, _Z_instances, p_fn)}"></bib-consent-preferences-dialog>`;
  }
}
_e = new WeakMap();
_t = new WeakMap();
_s = new WeakMap();
_o = new WeakMap();
_n = new WeakMap();
_r = new WeakMap();
_Z_instances = new WeakSet();
i_fn = function(e2, t2 = null) {
  a(this, e2, { detail: t2 });
};
c_fn = function(e2) {
  __privateGet(this, _t).setValue(e2), __privateSet(this, _o, __privateGet(this, _t).value.getState());
};
l_fn = function() {
  this.debug && X(...arguments);
};
h_fn = function(e2 = true) {
  this.open = false, this.currentDialog?.close(e2), this.currentDialog = null, e2 && __privateMethod(this, _Z_instances, i_fn).call(this, v.CLOSE);
};
a_fn = function(e2 = "consent") {
  const t2 = ["consent", "preferences"];
  if ("string" != typeof e2 && !t2.includes(e2)) throw new TypeError(`The panel argument must be a string of either values \`${t2.join(" or ")}\`. You provided \`${e2}\``, e2);
  this.open = true, this.currentDialog && (__privateMethod(this, _Z_instances, l_fn).call(this, "[#show] this.currentDialog", this.currentDialog), this.currentDialog.close()), __privateMethod(this, _Z_instances, l_fn).call(this, "[show]", __privateGet(this, _n).value), __privateMethod(this, _Z_instances, l_fn).call(this, "[show]", __privateGet(this, _r).value), this.currentDialog = "consent" === e2 ? __privateGet(this, _n).value : __privateGet(this, _r).value, this.currentDialog.show();
};
u_fn = async function(e2) {
  if (!await this.saveTokens(e2.detail)) return;
  const t2 = await this.getTokens();
  __privateMethod(this, _Z_instances, i_fn).call(this, v.CHANGE, t2), __privateMethod(this, _Z_instances, h_fn).call(this);
};
p_fn = function(e2) {
  __privateMethod(this, _Z_instances, h_fn).call(this, false);
};
__publicField(Z, "properties", { serverUrl: { type: String, attribute: "server-url" }, serverRequestTimeout: { type: Number, attribute: "server-request-timeout" }, [p.LOCAL]: { type: Boolean }, state: { type: String }, debug: { type: Boolean, reflect: true }, open: { type: Boolean, reflect: true } });
window.customElements.get("bib-consent") || window.customElements.define("bib-consent", Z), c("consent", {});
export {
  Z as BibConsent
};
//# sourceMappingURL=bib-consent.js.map
