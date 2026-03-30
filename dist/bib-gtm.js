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
var _c_instances, t_fn;
import { s as t, i as e, r as n } from "./lit-element-Dj1nHH6C.js";
import { a as o } from "./bib-C3HY5EBh.js";
import { ConsentTokens as i } from "./ConsentTokens.js";
import { GTM_CONTAINER_ID as s } from "./constants.js";
import { EVENT_NAMES as a } from "./constants2.js";
let l = null;
class c extends t {
  constructor() {
    super();
    __privateAdd(this, _c_instances);
    this.hidden = true, this.containerId = s, __privateMethod(this, _c_instances, t_fn).call(this), console.log("[bib-gtm] Component class initialized.");
  }
}
_c_instances = new WeakSet();
t_fn = function() {
  console.log("[bib-gtm] Initializing...");
  const t2 = this.containerId;
  setTimeout(() => {
    const e2 = document.querySelector("bib-consent");
    if (e2) {
      let n2 = function(e3) {
        console.log(`[bib-gtm] <bib-consent> triggered event type ${e3.type} with data:`, e3.detail);
        const n3 = e3.detail;
        if (null !== n3) {
          console.log("[bib-gtm] Loading GTM script."), function(t3) {
            if (!l) {
              l = document.createElement("script"), l.async = true, l.src = `https://www.googletagmanager.com/gtm.js?id=${t3}`;
              var e5 = document.getElementsByTagName("script")[0];
              e5.parentNode.insertBefore(l, e5);
            }
          }(t2);
          const { analytics_consent: e4, ad_consent: o3 } = n3, i2 = { ad_user_data: o3, ad_personalization: o3, ad_storage: o3, analytics_storage: e4 };
          let a2, c3;
          console.log("[bib-gtm] Updating GTM with consent data:", i2), s2("consent", "update", i2);
          try {
            a2 = window.top.location.href, c3 = window.top.location.pathname;
          } catch (t3) {
            a2 = window.location.href, c3 = window.location.pathname;
          }
          console.log("[bib-gtm] Sending page_view with location:", a2, "path:", c3, "title:", document.title), s2("event", "page_view", { page_path: c3, page_location: a2, page_title: document.title });
        }
      };
      console.log("[bib-gtm] bib-consent element found.");
      const o2 = globalThis.dataLayer = globalThis.dataLayer || [], s2 = globalThis.gtag = globalThis.gtag || function() {
        o2.push(arguments);
      }, c2 = new i(false);
      console.log("[bib-gtm] Pushing default consent to GTM with `defaultConsent`: ", c2), s2("consent", "default", c2.toGTM()), o2.push({ "gtm.start": (/* @__PURE__ */ new Date()).getTime(), event: "gtm.js" }), console.log("[bib-gtm] Registering event listeners on <bib-consent> element."), e2.addEventListener(a.READY, n2), e2.addEventListener(a.CHANGE, n2);
    } else console.log("[bib-gtm] No bib-consent element found");
    console.log("[bib-gtm] Initialization complete.");
  });
};
__publicField(c, "properties", { containerId: { type: String, attribute: "container-id" }, hidden: { type: Boolean } });
__publicField(c, "styles", [e`${n("@layer component{:host(hidden){display:none}}")}`]);
window.customElements.get("bib-gtm") || window.customElements.define("bib-gtm", c), o("gtm", {});
export {
  c as BibGtm
};
//# sourceMappingURL=bib-gtm.js.map
