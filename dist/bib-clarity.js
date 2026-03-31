/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.10
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
var _t, _n, _y_instances, e_fn, i_fn, s_fn;
import { s as t, i as n, r as e } from "./lit-element-Dj1nHH6C.js";
import { a as i } from "./bib-ZSbkneAs.js";
import { d as s } from "./events-BtF7lCmA.js";
import { l as o } from "./logger-DHPaUuvL.js";
import r from "./ConsentTokenV2.js";
import { CLARITY_PROJECT_ID as c, READY_STATES as a } from "./constants3.js";
import { EVENT_NAMES as l } from "./constants2.js";
const d = { init(t2) {
  !function(t3) {
    try {
      return void function(t4, n2, e2, i2, s2, o2, r2) {
        n2.getElementById("clarity-script") || (t4[e2] = t4[e2] || function() {
          (t4[e2].q = t4[e2].q || []).push(arguments);
        }, (o2 = n2.createElement(i2)).async = 1, o2.src = "https://www.clarity.ms/tag/" + s2 + "?ref=npm", o2.id = "clarity-script", (r2 = n2.getElementsByTagName(i2)[0]).parentNode.insertBefore(o2, r2));
      }(window, document, "clarity", "script", t3);
    } catch (t4) {
      return;
    }
  }(t2);
}, setTag(t2, n2) {
  window.clarity("set", t2, n2);
}, identify(t2, n2, e2, i2) {
  window.clarity("identify", t2, n2, e2, i2);
}, consent(t2 = true) {
  window.clarity("consent", t2);
}, upgrade(t2) {
  window.clarity("upgrade", t2);
}, event(t2) {
  window.clarity("event", t2);
} };
class y extends t {
  constructor() {
    super();
    __privateAdd(this, _y_instances);
    __privateAdd(this, _t, null);
    __privateAdd(this, _n, o("bib-clarity", "#a31515"));
    this.hidden = true, this.projectId = this.projectId || c, this.clarity = d, __privateMethod(this, _y_instances, e_fn).call(this);
  }
  setConsent(t2) {
    __privateGet(this, _n).call(this, "#setConsent called with data ", t2);
    const n2 = new r(t2);
    JSON.stringify(__privateGet(this, _t)) !== JSON.stringify(n2) ? (__privateGet(this, _n).call(this, `#setConsent: Setting consent to %o (was ${null === __privateGet(this, _t) ? "not set" : __privateGet(this, _t)}).`, n2), __privateSet(this, _t, n2), this.clarity.consent("consentv2", n2), __privateMethod(this, _y_instances, i_fn).call(this, l.CHANGE, { detail: n2 })) : __privateGet(this, _n).call(this, "#setConsent: No change in consent. oldConsent: ", __privateGet(this, _t), "newConsent: ", t2);
  }
}
_t = new WeakMap();
_n = new WeakMap();
_y_instances = new WeakSet();
e_fn = async function() {
  const t2 = this;
  async function n2(n3) {
    const e2 = n3.detail;
    if (null === e2) return void t2.setConsent(false);
    const { analytics_consent: i2, ad_consent: s2 } = e2;
    t2.readyState === a.INDETERMINATE && (t2.readyState = a.CONNECTED), t2.setConsent({ analytics_consent: i2, ad_consent: s2 });
  }
  this.clarity.init(this.projectId), setTimeout(async () => {
    var _a, _b;
    const e2 = document.querySelector("bib-consent");
    null === e2 ? (__privateGet(_a = t2, _n).call(_a, "No <bib-consent /> element found. Turning off Clarity tracking."), t2.setConsent(false)) : (__privateGet(_b = t2, _n).call(_b, "Found <bib-consent /> element. Turning on Clarity tracking."), e2.addEventListener(l.READY, n2), e2.addEventListener(l.CHANGE, n2));
  });
};
i_fn = function(t2, n2 = null) {
  s(this, t2, { detail: n2 });
};
s_fn = function(...t2) {
  this.hasAttribute("debug") && __privateGet(this, _n).call(this, ...t2);
};
__publicField(y, "properties", { projectId: { type: String, attribute: "project-id" }, hidden: { type: Boolean }, debug: { type: Boolean, reflect: true } });
__publicField(y, "styles", [n`${e("@layer component{:host(hidden){display:none}}")}`]);
window.customElements.get("bib-clarity") || window.customElements.define("bib-clarity", y), i("clarity", {});
export {
  y as BibClarity
};
//# sourceMappingURL=bib-clarity.js.map
