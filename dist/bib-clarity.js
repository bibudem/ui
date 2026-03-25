/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.6
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
var _t, _e, _y_instances, n_fn, s_fn, i_fn;
import { s as t, i as e, r as n } from "./lit-element-Dj1nHH6C.js";
import { a as i } from "./bib-D-evzUC9.js";
import { d as s } from "./events-BtF7lCmA.js";
import { l as o } from "./logger-WoB4TZCW.js";
import r from "./ConsentTokenV2.js";
import { CLARITY_PROJECT_ID as c, READY_STATES as a } from "./constants3.js";
import { EVENT_NAMES as d } from "./constants2.js";
const l = { init(t2) {
  !function(t3) {
    try {
      return void function(t4, e2, n2, i2, s2, o2, r2) {
        e2.getElementById("clarity-script") || (t4[n2] = t4[n2] || function() {
          (t4[n2].q = t4[n2].q || []).push(arguments);
        }, (o2 = e2.createElement(i2)).async = 1, o2.src = "https://www.clarity.ms/tag/" + s2 + "?ref=npm", o2.id = "clarity-script", (r2 = e2.getElementsByTagName(i2)[0]).parentNode.insertBefore(o2, r2));
      }(window, document, "clarity", "script", t3);
    } catch (t4) {
      return;
    }
  }(t2);
}, setTag(t2, e2) {
  window.clarity("set", t2, e2);
}, identify(t2, e2, n2, i2) {
  window.clarity("identify", t2, e2, n2, i2);
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
    __privateAdd(this, _e, o("bib-clarity"));
    this.hidden = true, this.projectId = this.projectId || c, this.clarity = l, __privateMethod(this, _y_instances, n_fn).call(this);
  }
  setConsent(t2) {
    const e2 = new r(t2);
    JSON.stringify(__privateGet(this, _t)) !== JSON.stringify(e2) && (__privateSet(this, _t, e2), this.clarity.consent("consentv2", e2), __privateMethod(this, _y_instances, s_fn).call(this, d.CHANGE, { detail: e2 }));
  }
}
_t = new WeakMap();
_e = new WeakMap();
_y_instances = new WeakSet();
n_fn = async function() {
  const t2 = this;
  async function e2(e3) {
    const n2 = e3.detail;
    if (null === n2) return void t2.setConsent(false);
    const { analytics_consent: i2, ad_consent: s2 } = n2;
    t2.readyState === a.INDETERMINATE && (t2.readyState = a.CONNECTED), t2.setConsent({ analytics_consent: i2, ad_consent: s2 });
  }
  this.clarity.init(this.projectId), setTimeout(async () => {
    var _a;
    const n2 = document.querySelector("bib-consent");
    null === n2 ? (__privateMethod(_a = t2, _y_instances, i_fn).call(_a, "No <bib-consent /> element found. Turning off Clarity tracking."), t2.setConsent(false)) : (n2.addEventListener(d.READY, e2), n2.addEventListener(d.CHANGE, e2));
  });
};
s_fn = function(t2, e2 = null) {
  s(this, t2, { detail: e2 });
};
i_fn = function(...t2) {
  this.hasAttribute("debug") && __privateGet(this, _e).call(this, ...t2);
};
__publicField(y, "properties", { projectId: { type: String, attribute: "project-id" }, hidden: { type: Boolean }, debug: { type: Boolean, reflect: true } });
__publicField(y, "styles", [e`${n("@layer component{:host(hidden){display:none}}")}`]);
window.customElements.get("bib-clarity") || window.customElements.define("bib-clarity", y), i("clarity", {});
export {
  y as BibClarity
};
//# sourceMappingURL=bib-clarity.js.map
