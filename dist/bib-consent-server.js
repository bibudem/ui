/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.1
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
var _e, _t, _d_instances, o_fn;
import { s as e, i as t, r as o, x as s } from "./lit-element-Dj1nHH6C.js";
import { a as i, p as n } from "./url-B0JPXU6k.js";
import { e as r, n as a } from "./ref-B-kqFHPy.js";
import { l } from "./logger-BQOjDRpZ.js";
import g from "./ConsentStorage.js";
class d extends e {
  constructor() {
    super();
    __privateAdd(this, _d_instances);
    __privateAdd(this, _e);
    __privateAdd(this, _t, l("bib-consent-server"));
    this.connected = false, this.debug = this.debug || false, this.loggerRef = r(), this.allowedOrigins = this.allowedOrigins || [], this.init();
  }
  async init() {
    __privateMethod(this, _d_instances, o_fn).call(this, "Initializing BibConsentServer..."), __privateSet(this, _e, await g()), __privateGet(this, _e).listen((e2) => {
      __privateMethod(this, _d_instances, o_fn).call(this, "Storage updated with data", e2.detail);
    }), __privateMethod(this, _d_instances, o_fn).call(this, "Start listening for storage updates..."), await this.startListening(), __privateMethod(this, _d_instances, o_fn).call(this, "Initialization complete.");
  }
  async startListening() {
    const { listenMessage: e2 } = await i({ eventFilter: (e3) => {
      const { origin: t2 } = e3;
      return this.allowedOrigins.length > 0 && this.allowedOrigins.some((e4) => n(e4, t2));
    } });
    this.connected = true, __privateMethod(this, _d_instances, o_fn).call(this, "Connected:", `<code class="value">${this.connected}</code>`), __privateMethod(this, _d_instances, o_fn).call(this, "Listening for postMessage events..."), e2(async (e3, t2, o2) => {
      let s2;
      switch (e3) {
        case "setConsentTokens":
          s2 = await __privateGet(this, _e).setConsentTokens(t2);
          break;
        case "getConsentTokens":
          s2 = await __privateGet(this, _e).getConsentTokens();
          break;
        case "resetTokens":
          s2 = await __privateGet(this, _e).resetTokens();
          break;
        case "ping":
          s2 = "pong";
          break;
        default:
          throw __privateMethod(this, _d_instances, o_fn).call(this, `Unknown method: <code class="method">${e3}</code>. Payload:`, t2), new Error(`Unknown method: ${e3}`);
      }
      t2 ? __privateMethod(this, _d_instances, o_fn).call(this, `Method <code class="method">${e3}</code> called with payload:`, t2, "response:", s2) : __privateMethod(this, _d_instances, o_fn).call(this, `Method <code class="method">${e3}</code> called.`, "response:", s2), o2(s2);
    });
  }
  render() {
    return s`<h1>I am bib-consent-server</h1><div class="log-container"><div class="log" ${a(this.loggerRef)}></div></div>`;
  }
}
_e = new WeakMap();
_t = new WeakMap();
_d_instances = new WeakSet();
o_fn = function(...e2) {
  if (this.hasAttribute("debug")) {
    const t2 = e2.map((e3) => "string" == typeof e3 ? e3.replace(/<\/?[^>]+(>|$)/g, "") : e3);
    __privateGet(this, _t).call(this, ...t2);
    const o2 = e2.map((e3) => "string" == typeof e3 ? e3 : `<code class="value">${JSON.stringify(e3)}</code>`).join(" ");
    if (this.loggerRef.value) {
      const e3 = this.loggerRef.value;
      e3.innerHTML += `${"" === e3.innerHTML ? "" : "<br />"}${o2}`, e3.scrollTop = e3.scrollHeight;
    }
  }
};
__publicField(d, "properties", { connected: { type: Boolean }, debug: { type: Boolean, reflect: true }, allowedOrigins: { type: String, attribute: "allowed-origins", converter: { fromAttribute: (e2) => e2.split(/\s+/).map((e3) => e3.trim()), toAttribute: (e2) => e2.join(" ") } } });
__publicField(d, "styles", [t`${o(":host{display:none}:host([debug]){display:block;height:100vh}body{margin:0}h1{text-align:center;padding:.25em 0;margin:0;font:unset;font-variant:all-small-caps;background-color:#e5e5e5}.log-container{padding:0;font-size:13px;border:1px solid silver}.log{box-sizing:border-box;-webkit-text-size-adjust:100%;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace!important;font-size:small;margin:0;padding:.35rem;width:100%;background-color:unset;border:none;tab-size:8;outline:none;overflow-y:auto;height:100px;line-height:20px;overflow-wrap:normal;overscroll-behavior-x:none;z-index:1}.log code{font-size:13px}.log .function,.log .method{color:#881280}.log .property{color:#994500}.log .value{color:#1a1aa6}")}`]);
window.customElements.get("bib-consent-server") || window.customElements.define("bib-consent-server", d);
export {
  d as BibConsentServer
};
//# sourceMappingURL=bib-consent-server.js.map
