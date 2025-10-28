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
var _t, _e, _m_instances, n_fn, i_fn, s_fn;
import { s as t, i as e, r as n } from "./lit-element-Dj1nHH6C.js";
import { C as s, s as i } from "./bib-clarity-D4L6fT33.js";
import { a as o } from "./bib-CrTOU84w.js";
import { d as c } from "./events-BtF7lCmA.js";
import { l as r } from "./logger-BQOjDRpZ.js";
import a from "./ConsentTokenV2.js";
import { CLARITY_PROJECT_ID as l, READY_STATES as d } from "./constants3.js";
import { EVENT_NAMES as b } from "./constants2.js";
class m extends t {
  constructor() {
    super();
    __privateAdd(this, _m_instances);
    __privateAdd(this, _t, null);
    __privateAdd(this, _e, r("bib-clarity"));
    this.hidden = true, this.projectId = this.projectId || l, this.clarity = s, __privateMethod(this, _m_instances, n_fn).call(this);
  }
  setConsent(t2) {
    const e2 = new a(t2);
    JSON.stringify(__privateGet(this, _t)) !== JSON.stringify(e2) && (__privateMethod(this, _m_instances, s_fn).call(this, `[setConsent] Setting consent to %o (was ${null === __privateGet(this, _t) ? "not set" : __privateGet(this, _t)}).`, e2), __privateSet(this, _t, e2), this.clarity.consent("consentv2", e2), __privateMethod(this, _m_instances, i_fn).call(this, b.CHANGE, { detail: e2 }));
  }
}
_t = new WeakMap();
_e = new WeakMap();
_m_instances = new WeakSet();
n_fn = async function() {
  const t2 = this;
  async function e2(e3) {
    var _a;
    __privateMethod(_a = t2, _m_instances, s_fn).call(_a, "Recieved a `%s` event from <bib-consent>:", e3.type, e3.detail);
    const n2 = e3.detail;
    if (null === n2) return void t2.setConsent(false);
    const { analytics_consent: s2, ad_consent: i2 } = n2;
    t2.readyState === d.INDETERMINATE && (t2.readyState = d.CONNECTED), t2.setConsent({ analytics_consent: s2, ad_consent: i2 });
  }
  this.clarity.init(this.projectId), setTimeout(async () => {
    var _a;
    const n2 = document.querySelector("bib-consent");
    null === n2 ? (__privateMethod(_a = t2, _m_instances, s_fn).call(_a, "No <bib-consent /> element found. Turning off Clarity tracking."), t2.setConsent(false)) : (n2.addEventListener(b.READY, e2), n2.addEventListener(b.CHANGE, e2));
  });
};
i_fn = function(t2, e2 = null) {
  c(this, t2, { detail: e2 });
};
s_fn = function(...t2) {
  this.hasAttribute("debug") && (t2.map((t3) => "string" == typeof t3 ? t3.replace(/<\/?[^>]+(>|$)/g, "") : t3), __privateGet(this, _e).call(this, ...t2));
};
__publicField(m, "properties", { projectId: { type: String, attribute: "project-id" }, hidden: { type: Boolean }, debug: { type: Boolean, reflect: true } });
__publicField(m, "styles", [e`${n(i)}`]);
window.customElements.get("bib-clarity") || window.customElements.define("bib-clarity", m), o("clarity", {});
export {
  m as BibClarity
};
//# sourceMappingURL=bib-clarity.js.map
