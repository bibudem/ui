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
var _t, _a_instances, e_fn, n_fn;
import { s as t, i as e, r as n } from "./lit-element-Dj1nHH6C.js";
import { a as i } from "./bib-RFFKFfZN.js";
import { d as s } from "./events-BtF7lCmA.js";
import { CLARITY_PROJECT_ID as o } from "./constants3.js";
import { EVENT_NAMES as c } from "./constants2.js";
const r = { init(t2) {
  !function(t3) {
    try {
      return void function(t4, e2, n2, i2, s2, o2, c2) {
        e2.getElementById("clarity-script") || (t4[n2] = t4[n2] || function() {
          (t4[n2].q = t4[n2].q || []).push(arguments);
        }, (o2 = e2.createElement(i2)).async = 1, o2.src = "https://www.clarity.ms/tag/" + s2 + "?ref=npm", o2.id = "clarity-script", (c2 = e2.getElementsByTagName(i2)[0]).parentNode.insertBefore(o2, c2));
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
class a extends t {
  constructor() {
    super();
    __privateAdd(this, _a_instances);
    __privateAdd(this, _t, null);
    this.hidden = true, this.projectId = this.projectId || o, this.clarity = r, __privateMethod(this, _a_instances, e_fn).call(this);
  }
  setConsent(t2) {
    if ("boolean" != typeof t2) throw new TypeError('The "granted" parameter must be a boolean');
    __privateGet(this, _t) !== t2 && (console.log(`[bib-clarity] Setting consent to ${t2} (was: ${__privateGet(this, _t)})`), __privateSet(this, _t, t2), this.clarity.consent(t2), __privateMethod(this, _a_instances, n_fn).call(this, c.CHANGE, { detail: t2 }));
  }
}
_t = new WeakMap();
_a_instances = new WeakSet();
e_fn = async function() {
  const t2 = this, e2 = this.projectId;
  async function n2(e3) {
    console.log(`<bib-clarity> recieved an event from <bib-consent>: ${e3.type}`, e3.detail);
    const n3 = e3.detail;
    if (null === n3) return void t2.consent(false);
    const { analytics_consent: i2 } = n3;
    t2.setConsent("granted" === i2);
  }
  this.clarity.init(e2), setTimeout(async () => {
    const e3 = document.querySelector("bib-consent");
    null === e3 ? (console.info("No <bib-consent /> element found. Turning off Clarity tracking."), t2.setConsent(false)) : (e3.addEventListener(c.READY, n2), e3.addEventListener(c.CHANGE, n2)), __privateMethod(this, _a_instances, n_fn).call(this, c.READY);
  });
};
n_fn = function(t2, e2 = null) {
  s(this, t2, { detail: e2 });
};
__publicField(a, "properties", { projectId: { type: String, attribute: "project-id" }, hidden: { type: Boolean } });
__publicField(a, "styles", [e`${n("@layer component{:host(hidden){display:none}}")}`]);
window.customElements.get("bib-clarity") || window.customElements.define("bib-clarity", a), i("clarity", {});
export {
  a as BibClarity
};
//# sourceMappingURL=bib-clarity.js.map
