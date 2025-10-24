/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.0
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
var _t, _y_instances, n_fn, e_fn;
import { s as t, i as n, r as e } from "./lit-element-Dj1nHH6C.js";
import { C as s, s as i } from "./bib-clarity-D4L6fT33.js";
import { a as o } from "./bib-D0cwtjek.js";
import { d as c } from "./events-BtF7lCmA.js";
import r from "./ConsentTokenV2.js";
import { CLARITY_PROJECT_ID as a, READY_STATES as l } from "./constants3.js";
import { EVENT_NAMES as d } from "./constants2.js";
class y extends t {
  constructor() {
    super();
    __privateAdd(this, _y_instances);
    __privateAdd(this, _t, null);
    this.hidden = true, this.projectId = this.projectId || a, this.clarity = s, __privateMethod(this, _y_instances, n_fn).call(this);
  }
  setConsent(t2) {
    const n2 = new r(t2);
    JSON.stringify(__privateGet(this, _t)) !== JSON.stringify(n2) && (console.log(`[bib-clarity] Setting consent to %o (was ${null === __privateGet(this, _t) ? "not set" : __privateGet(this, _t)}).`, n2), __privateSet(this, _t, n2), this.clarity.consent("consentv2", n2), __privateMethod(this, _y_instances, e_fn).call(this, d.CHANGE, { detail: n2 }));
  }
}
_t = new WeakMap();
_y_instances = new WeakSet();
n_fn = async function() {
  const t2 = this;
  async function n2(n3) {
    console.log(`<bib-clarity> recieved an event from <bib-consent>: ${n3.type}`, n3.detail);
    const e2 = n3.detail;
    if (null === e2) return void t2.setConsent(false);
    const { analytics_consent: s2, ad_consent: i2 } = e2;
    t2.readyState === l.INDETERMINATE && (t2.readyState = l.CONNECTED), t2.setConsent({ analytics_consent: s2, ad_consent: i2 });
  }
  this.clarity.init(this.projectId), setTimeout(async () => {
    const e2 = document.querySelector("bib-consent");
    null === e2 ? (console.info("No <bib-consent /> element found. Turning off Clarity tracking."), t2.setConsent(false)) : (e2.addEventListener(d.READY, n2), e2.addEventListener(d.CHANGE, n2));
  });
};
e_fn = function(t2, n2 = null) {
  c(this, t2, { detail: n2 });
};
__publicField(y, "properties", { projectId: { type: String, attribute: "project-id" }, hidden: { type: Boolean } });
__publicField(y, "styles", [n`${e(i)}`]);
window.customElements.get("bib-clarity") || window.customElements.define("bib-clarity", y), o("clarity", {});
export {
  y as BibClarity
};
//# sourceMappingURL=bib-clarity.js.map
