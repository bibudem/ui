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
var _t, _g_instances, e_fn;
import { s as t, i as e, r as n } from "./lit-element-Dj1nHH6C.js";
import { a as o } from "./bib-C3HY5EBh.js";
import { l as i } from "./logger-DcXTZUsI.js";
import { ConsentTokens as s } from "./ConsentTokens.js";
import { GTM_CONTAINER_ID as a } from "./constants.js";
import { EVENT_NAMES as l } from "./constants2.js";
let c = null;
class g extends t {
  constructor() {
    super();
    __privateAdd(this, _g_instances);
    __privateAdd(this, _t, i("bib-gtm", "#0a00ff"));
    this.hidden = true, this.containerId = a, __privateMethod(this, _g_instances, e_fn).call(this);
  }
}
_t = new WeakMap();
_g_instances = new WeakSet();
e_fn = function() {
  const t2 = this;
  console.log("[bib-gtm] Initializing...");
  const e2 = this.containerId;
  setTimeout(() => {
    const n2 = document.querySelector("bib-consent");
    if (n2) {
      let o2 = function(t3) {
        console.log(`[bib-gtm] <bib-consent> triggered event type ${t3.type} with data:`, t3.detail);
        const n3 = t3.detail;
        if (null !== n3) {
          console.log("[bib-gtm] Loading GTM script."), function(t5) {
            if (!c) {
              c = document.createElement("script"), c.async = true, c.src = `https://www.googletagmanager.com/gtm.js?id=${t5}`;
              var e3 = document.getElementsByTagName("script")[0];
              e3.parentNode.insertBefore(c, e3);
            }
          }(e2);
          const { analytics_consent: t4, ad_consent: o3 } = n3, i3 = { ad_user_data: o3, ad_personalization: o3, ad_storage: o3, analytics_storage: t4 };
          let s2, l2;
          console.log("[bib-gtm] Updating GTM with consent data:", i3), a2("consent", "update", i3);
          try {
            s2 = window.top.location.href, l2 = window.top.location.pathname;
          } catch (t5) {
            s2 = window.location.href, l2 = window.location.pathname;
          }
          console.log("[bib-gtm] Sending page_view with location:", s2, "path:", l2, "title:", document.title), a2("event", "page_view", { page_path: l2, page_location: s2, page_title: document.title });
        }
      };
      console.log("[bib-gtm] bib-consent element found.");
      const i2 = globalThis.dataLayer = globalThis.dataLayer || [], a2 = globalThis.gtag = globalThis.gtag || function() {
        i2.push(arguments);
      }, g2 = new s(false);
      console.log("[bib-gtm] Pushing default consent to GTM with `defaultConsent`: ", g2), a2("consent", "default", g2.toGTM()), i2.push({ "gtm.start": (/* @__PURE__ */ new Date()).getTime(), event: "gtm.js" }), console.log("[bib-gtm] Registering event listeners on <bib-consent> element."), n2.addEventListener(l.READY, o2), n2.addEventListener(l.CHANGE, o2);
    } else __privateGet(t2, _t).warn("No bib-consent element found");
    console.log("[bib-gtm] Initialization complete.");
  });
};
__publicField(g, "properties", { containerId: { type: String, attribute: "container-id" }, hidden: { type: Boolean } });
__publicField(g, "styles", [e`${n("@layer component{:host(hidden){display:none}}")}`]);
window.customElements.get("bib-gtm") || window.customElements.define("bib-gtm", g), o("gtm", {});
export {
  g as BibGtm
};
//# sourceMappingURL=bib-gtm.js.map
