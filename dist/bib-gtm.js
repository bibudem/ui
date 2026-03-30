/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.8
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
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _t, _l_instances, e_fn;
import { s as t, i as e, r as n } from "./lit-element-Dj1nHH6C.js";
import { a as o } from "./bib-C3HY5EBh.js";
import { l as i } from "./logger-DcXTZUsI.js";
import { ConsentTokens as s } from "./ConsentTokens.js";
import { GTM_CONTAINER_ID as a } from "./constants.js";
import { EVENT_NAMES as g } from "./constants3.js";
i("bib-gtm", "green");
let r = null;
class l extends t {
  constructor() {
    super();
    __privateAdd(this, _l_instances);
    __privateAdd(this, _t, i("bib-gtm", "#0a00ff"));
    this.hidden = true, this.containerId = a, __privateMethod(this, _l_instances, e_fn).call(this);
  }
}
_t = new WeakMap();
_l_instances = new WeakSet();
e_fn = function() {
  const t2 = this;
  __privateGet(this, _t).log("Initializing...");
  const e2 = this.containerId;
  setTimeout(() => {
    const n2 = document.querySelector("bib-consent");
    if (n2) {
      let o2 = function(n3) {
        __privateGet(t2, _t).log(`<bib-consent> triggered event type ${n3.type} with data:`, n3.detail);
        const o3 = n3.detail;
        if (null !== o3) {
          __privateGet(t2, _t).log("Loading GTM script."), function(t3) {
            if (!r) {
              r = document.createElement("script"), r.async = true, r.src = `https://www.googletagmanager.com/gtm.js?id=${t3}`;
              var e3 = document.getElementsByTagName("script")[0];
              e3.parentNode.insertBefore(r, e3);
            }
          }(e2);
          const { analytics_consent: n4, ad_consent: i3 } = o3, s2 = { ad_user_data: i3, ad_personalization: i3, ad_storage: i3, analytics_storage: n4 };
          __privateGet(t2, _t).log("Updating GTM with consent data:", s2), a2("consent", "update", s2);
        }
      };
      __privateGet(t2, _t).log("bib-consent element found.");
      const i2 = globalThis.dataLayer = globalThis.dataLayer || [], a2 = globalThis.gtag = globalThis.gtag || function() {
        i2.push(arguments);
      }, l2 = new s(false);
      __privateGet(t2, _t).log("Pushing default consent to GTM with `defaultConsent`: ", l2), a2("consent", "default", l2.toGTM()), i2.push({ "gtm.start": (/* @__PURE__ */ new Date()).getTime(), event: "gtm.js" }), __privateGet(t2, _t).log("Registering event listeners on <bib-consent> element."), n2.addEventListener(g.READY, o2), n2.addEventListener(g.CHANGE, o2);
    } else __privateGet(t2, _t).warn("No bib-consent element found");
    __privateGet(t2, _t).log("Initialization complete.");
  });
};
__publicField(l, "properties", { containerId: { type: String, attribute: "container-id" }, hidden: { type: Boolean } });
__publicField(l, "styles", [e`${n("@layer component{:host(hidden){display:none}}")}`]);
window.customElements.get("bib-gtm") || window.customElements.define("bib-gtm", l), o("gtm", {});
export {
  l as BibGtm
};
//# sourceMappingURL=bib-gtm.js.map
