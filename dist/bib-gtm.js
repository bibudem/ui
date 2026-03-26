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
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _g_instances, t_fn;
import { s as t, i as e, r as n } from "./lit-element-Dj1nHH6C.js";
import { a as o } from "./bib-C3HY5EBh.js";
import { l as i } from "./logger-DcXTZUsI.js";
import { ConsentTokens as s } from "./ConsentTokens.js";
import { GTM_CONTAINER_ID as a } from "./constants.js";
import { EVENT_NAMES as r } from "./constants2.js";
const l = i("bib-gtm", "green");
let c = null;
class g extends t {
  constructor() {
    super();
    __privateAdd(this, _g_instances);
    this.hidden = true, this.containerId = a, __privateMethod(this, _g_instances, t_fn).call(this);
  }
}
_g_instances = new WeakSet();
t_fn = function() {
  l.log("Initializing...");
  const t2 = this.containerId;
  setTimeout(() => {
    const e2 = document.querySelector("bib-consent");
    if (e2) {
      let n2 = function(e3) {
        l.log(`<bib-consent> triggered event type ${e3.type} with data:`, e3.detail);
        const n3 = e3.detail;
        if (null !== n3) {
          l.log("Loading GTM script."), function(t3) {
            if (!c) {
              c = document.createElement("script"), c.async = true, c.src = `https://www.googletagmanager.com/gtm.js?id=${t3}`;
              var e5 = document.getElementsByTagName("script")[0];
              e5.parentNode.insertBefore(c, e5);
            }
          }(t2);
          const { analytics_consent: e4, ad_consent: o3 } = n3, s2 = { ad_user_data: o3, ad_personalization: o3, ad_storage: o3, analytics_storage: e4 };
          l.log("Updating GTM with consent data:", s2), i2("consent", "update", s2);
        }
      };
      l.log("bib-consent element found.");
      const o2 = globalThis.dataLayer = globalThis.dataLayer || [], i2 = globalThis.gtag = globalThis.gtag || function() {
        o2.push(arguments);
      }, a2 = new s(false);
      l.log("Pushing default consent to GTM with `defaultConsent`: ", a2), i2("consent", "default", a2.toGTM()), o2.push({ "gtm.start": (/* @__PURE__ */ new Date()).getTime(), event: "gtm.js" }), l.log("Registering event listeners on <bib-consent> element."), e2.addEventListener(r.READY, n2), e2.addEventListener(r.CHANGE, n2);
    } else l.warn("No bib-consent element found");
    l.log("Initialization complete.");
  });
};
__publicField(g, "properties", { containerId: { type: String, attribute: "container-id" }, hidden: { type: Boolean } });
__publicField(g, "styles", [e`${n("@layer component{:host(hidden){display:none}}")}`]);
window.customElements.get("bib-gtm") || window.customElements.define("bib-gtm", g), o("gtm", {});
export {
  g as BibGtm
};
//# sourceMappingURL=bib-gtm.js.map
