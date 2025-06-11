/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.23.0
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
var _e, _o;
import { s as e, i as o, r as t, x as s } from "./lit-element-Dj1nHH6C.js";
import { d as n, p as i } from "./constants-_xXdWr9_.js";
import { e as r, n as a } from "./ref-B-kqFHPy.js";
import { l } from "./logger-B9hbOSiP.js";
import g from "./ConsentStorage.js";
class c extends e {
  constructor() {
    super();
    __privateAdd(this, _e);
    __privateAdd(this, _o, l("consent-server"));
    this.connected = false, this.debug = this.debug || false, this.loggerRef = r(), this.allowedOrigins = this.allowedOrigins || [], this.init();
  }
  async init() {
    this.log("Initializing BibConsentServer..."), __privateSet(this, _e, await g()), this.log("Connected to storage."), __privateGet(this, _e).listen((e2) => {
      this.log("Storage updated with data", e2.detail);
    }), this.log("Start listening for storage updates..."), this.startListening();
  }
  log(...e2) {
    if (this.hasAttribute("debug")) {
      const o2 = e2.map((e3) => "string" == typeof e3 ? e3.replace(/<\/?[^>]+(>|$)/g, "") : e3);
      __privateGet(this, _o).call(this, ...o2);
      const t2 = e2.map((e3) => "string" == typeof e3 ? e3 : `<code class="value">${JSON.stringify(e3)}</code>`).join(" ");
      if (this.loggerRef.value) {
        const e3 = this.loggerRef.value;
        e3.innerHTML += `${"" === e3.innerHTML ? "" : "<br />"}${t2}`, e3.scrollTop = e3.scrollHeight;
      }
    }
  }
  async startListening() {
    const { listenMessage: e2 } = await n({ eventFilter: (e3) => {
      const { origin: o2 } = e3;
      return this.allowedOrigins.length > 0 && this.allowedOrigins.some((e4) => i(e4, o2));
    } });
    this.connected = true, this.log("Connected:", `<code class="value">${this.connected}</code>`), this.log("Listening for postMessage events..."), e2(async (e3, o2, t2) => {
      let s2;
      switch (e3) {
        case "setConsentTokens":
          s2 = await __privateGet(this, _e).setConsentTokens(o2);
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
          throw this.log(`Unknown method: <code class="method">${e3}</code>. Payload:`, o2), new Error(`Unknown method: ${e3}`);
      }
      o2 ? this.log(`Method <code class="method">${e3}</code> called with payload:`, o2, "response:", s2) : this.log(`Method <code class="method">${e3}</code> called.`, "response:", s2), t2(s2);
    });
  }
  render() {
    return s`<h1>I am bib-consent-server</h1><div class="log-container"><div class="log" ${a(this.loggerRef)}></div></div>`;
  }
}
_e = new WeakMap();
_o = new WeakMap();
__publicField(c, "properties", { connected: { type: Boolean }, debug: { type: Boolean, reflect: true }, allowedOrigins: { type: String, attribute: "allowed-origins", converter: { fromAttribute: (e2) => e2.split(/\s+/).map((e3) => e3.trim()), toAttribute: (e2) => e2.join(" ") } } });
__publicField(c, "styles", [o`${t(":host{display:none}:host([debug]){display:block;height:100vh}body{margin:0}h1{text-align:center;padding:.25em 0;margin:0;font:unset;font-variant:all-small-caps;background-color:#e5e5e5}.log-container{padding:0;font-size:13px;border:1px solid silver}.log{box-sizing:border-box;-webkit-text-size-adjust:100%;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace!important;font-size:small;margin:0;padding:.35rem;width:100%;background-color:unset;border:none;tab-size:8;outline:none;overflow-y:auto;height:100px;line-height:20px;overflow-wrap:normal;overscroll-behavior-x:none;z-index:1}.log code{font-size:13px}.log .function,.log .method{color:#881280}.log .property{color:#994500}.log .value{color:#1a1aa6}")}`]);
window.customElements.get("bib-consent-server") || window.customElements.define("bib-consent-server", c);
export {
  c as BibConsentServer
};
//# sourceMappingURL=bib-consent-server.js.map
