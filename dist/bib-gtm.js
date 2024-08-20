/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
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
var _a_instances, t_fn;
import { L as t, c as e, u as n } from "./lit-element-DmnF17fR.js";
import { a as o } from "./bib-BW5s0xHx.js";
import { ConsentTokens as s } from "./ConsentTokens.js";
import { GTM_CONTAINER_ID as i } from "./constants.js";
class a extends t {
  constructor() {
    super();
    __privateAdd(this, _a_instances);
    this.hidden = true, this.containerId = i, __privateMethod(this, _a_instances, t_fn).call(this);
  }
}
_a_instances = new WeakSet();
t_fn = function() {
  const t2 = this.containerId;
  setTimeout(() => {
    const e2 = document.querySelector("bib-consent");
    if (e2) {
      let n2 = function(e3) {
        console.log(`[bib-consent] événement ${e3.type}`, e3.detail);
        const n3 = e3.detail;
        if (null !== n3) {
          !function(t3) {
            const e5 = "bib-GTM-script";
            if (!document.querySelector(`script#${e5}`)) {
              var n4 = document.createElement("script");
              n4.id = e5, n4.async = true, n4.src = `https://www.googletagmanager.com/gtm.js?id=${t3}`;
              var o4 = document.getElementsByTagName("script")[0];
              o4.parentNode.insertBefore(n4, o4);
            }
          }(t2);
          const { analytics_consent: e4, ad_consent: o3 } = n3, s2 = { ad_user_data: o3, ad_personalization: o3, ad_storage: o3, analytics_storage: e4 };
          console.log("Updating GTM consent with", s2), i2("consent", "update", s2);
        }
      };
      console.warn("bib-consent element found"), globalThis.nogtm = true;
      const o2 = globalThis.dataLayer = globalThis.dataLayer || [], i2 = globalThis.gtag = globalThis.gtag || function() {
        o2.push(arguments);
      }, a2 = new s(false);
      console.log("defaultConsent: ", a2), i2("consent", "default", a2.toGTM()), o2.push({ "gtm.start": (/* @__PURE__ */ new Date()).getTime(), event: "gtm.js" }), e2.addEventListener("bib:consent:ready", n2), e2.addEventListener("bib:consent:update", n2);
    } else console.warn("No bib-consent element found");
  });
};
__publicField(a, "properties", { containerId: { type: String, attribute: "container-id" }, hidden: { type: Boolean } });
__publicField(a, "styles", [e`${n("@layer component{:host(hidden){display:none}}")}`]);
window.customElements.get("bib-gtm") || window.customElements.define("bib-gtm", a), o("gtm", {});
export {
  a as BibGtm
};
//# sourceMappingURL=bib-gtm.js.map
