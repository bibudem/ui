/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.11
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
import { a as o } from "./bib-BaerflTk.js";
import { ConsentTokens as i } from "./ConsentTokens.js";
import { GTM_CONTAINER_ID as s } from "./constants.js";
import { EVENT_NAMES as a } from "./constants2.js";
let l = null;
class g extends t {
  constructor() {
    super();
    __privateAdd(this, _g_instances);
    __privateAdd(this, _t, function() {
    });
    this.hidden = true, this.containerId = s, __privateMethod(this, _g_instances, e_fn).call(this), __privateGet(this, _t).call(this, "Component class initialized.");
  }
}
_t = new WeakMap();
_g_instances = new WeakSet();
e_fn = function() {
  const t2 = this;
  __privateGet(this, _t).call(this, "Initializing...");
  const e2 = this.containerId;
  setTimeout(() => {
    var _a;
    const n2 = document.querySelector("bib-consent");
    if (n2) {
      let o2 = function(n3) {
        var _a2, _b, _c, _d;
        __privateGet(_a2 = t2, _t).call(_a2, "<bib-consent> triggered event type ${event.type} with data:", n3.detail);
        const o3 = n3.detail;
        if (null !== o3) {
          __privateGet(_b = t2, _t).call(_b, "Loading GTM script."), function(t3) {
            if (!l) {
              l = document.createElement("script"), l.async = true, l.src = `https://www.googletagmanager.com/gtm.js?id=${t3}`;
              var e3 = document.getElementsByTagName("script")[0];
              e3.parentNode.insertBefore(l, e3);
            }
          }(e2);
          const { analytics_consent: n4, ad_consent: i2 } = o3, s3 = { ad_user_data: i2, ad_personalization: i2, ad_storage: i2, analytics_storage: n4 };
          let a2, r2;
          __privateGet(_c = t2, _t).call(_c, "Updating GTM with consent data:", s3), g2("consent", "update", s3);
          try {
            a2 = window.top.location.href, r2 = window.top.location.pathname;
          } catch (t3) {
            a2 = window.location.href, r2 = window.location.pathname;
          }
          __privateGet(_d = t2, _t).call(_d, "Sending page_view with location:", a2, "path:", r2, "title:", document.title), g2("event", "page_view", { page_path: r2, page_location: a2, page_title: document.title });
        }
      };
      __privateGet(_a = t2, _t).call(_a, "bib-consent element found.");
      const s2 = globalThis.dataLayer = globalThis.dataLayer || [], g2 = globalThis.gtag = globalThis.gtag || function() {
        s2.push(arguments);
      }, r = new i(false);
      __privateGet(this, _t).call(this, "Pushing default consent to GTM with `defaultConsent`: ", r), g2("consent", "default", r.toGTM()), s2.push({ "gtm.start": (/* @__PURE__ */ new Date()).getTime(), event: "gtm.js" }), __privateGet(this, _t).call(this, "Registering event listeners on <bib-consent> element."), n2.addEventListener(a.READY, o2), n2.addEventListener(a.CHANGE, o2);
    } else __privateGet(this, _t).call(this, "No bib-consent element found");
    __privateGet(this, _t).call(this, "Initialization complete.");
  });
};
__publicField(g, "properties", { containerId: { type: String, attribute: "container-id" }, hidden: { type: Boolean } });
__publicField(g, "styles", [e`${n("@layer component{:host(hidden){display:none}}")}`]);
window.customElements.get("bib-gtm") || window.customElements.define("bib-gtm", g), o("gtm", {});
export {
  g as BibGtm
};
//# sourceMappingURL=bib-gtm.js.map
