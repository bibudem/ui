/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.13.2
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
var _e, _t;
import { s as e, i as t, r as s, x as o } from "./lit-element-Dj1nHH6C.js";
import { d as i, p as n } from "./constants-B2Plycc7.js";
import { e as r, n as a } from "./ref-B-kqFHPy.js";
import { l } from "./logger-DYU_e6ny.js";
import g from "./PreferenceStorage.js";
class c extends e {
  constructor() {
    super();
    __privateAdd(this, _e);
    __privateAdd(this, _t, l("consent-server"));
    this.connected = false, this.debug = this.debug || false, this.loggerRef = r(), this.allowedOrigins = this.allowedOrigins || [], this.init();
  }
  async init() {
    this.log("Initializing BibConsentServer..."), __privateSet(this, _e, await g()), this.log("Connected to storage."), __privateGet(this, _e).listen((e2) => {
      this.log("Storage updated with data", e2.detail);
    }), this.log("Start listening for storage updates..."), this.startListening();
  }
  log(...e2) {
    if (this.hasAttribute("debug")) {
      __privateGet(this, _t).call(this, ...e2);
      const t2 = e2.map((e3) => "string" == typeof e3 ? e3 : JSON.stringify(e3)).join(" ");
      this.loggerRef.value && (this.loggerRef.value.value += `${"" === this.loggerRef.value.value ? "" : "\r"}${t2}`);
    }
  }
  async startListening() {
    this.log("startListening()");
    const { listenMessage: e2 } = await i({ eventFilter: (e3) => {
      const { origin: t2 } = e3;
      return this.allowedOrigins.length > 0 && this.allowedOrigins.some((e4) => n(e4, t2));
    } });
    this.log("Listening for postMessage events..."), this.connected = true, this.log("connected:", this.connected), e2(async (e3, t2, s2) => {
      let o2;
      switch (e3) {
        case "setPreferences":
          o2 = await __privateGet(this, _e).setPreferences(t2);
          break;
        case "getPreferences":
          o2 = await __privateGet(this, _e).getPreferences();
          break;
        case "resetPreferences":
          o2 = await __privateGet(this, _e).resetPreferences();
          break;
        case "ping":
          o2 = "pong";
          break;
        default:
          throw this.log(`Unknown method: ${e3}. Payload:`, t2), new Error(`Unknown method: ${e3}`);
      }
      t2 ? this.log(`Method \`${e3}\` called with payload:`, t2, "response:", o2) : this.log(`Method \`${e3}\` called.`, "response:", o2), s2(o2);
    });
  }
  render() {
    return o`<h1>I am bib-consent-server</h1><div class="log-container"><textarea class="log" ${a(this.loggerRef)}></textarea></div>`;
  }
}
_e = new WeakMap();
_t = new WeakMap();
__publicField(c, "properties", { connected: { type: Boolean }, debug: { type: Boolean, reflect: true }, allowedOrigins: { type: String, attribute: "allowed-origins", converter: { fromAttribute: (e2) => e2.split(/\s+/).map((e3) => e3.trim()), toAttribute: (e2) => e2.join(" ") } } });
__publicField(c, "styles", [t`${s(":host{display:none}:host([debug]){display:block;height:100vh}body{margin:0}h1{text-align:center;padding:.25em 0;margin:0;font:unset;font-variant:all-small-caps;background-color:#e5e5e5}.log-container{padding:.25rem .25rem 0;font-size:small;border:1px solid silver}.log{-webkit-text-size-adjust:100%;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace!important;font-size:small;margin:0;padding:.25rem 0 0;resize:none;width:100%;background-color:unset;box-sizing:border-box;border:none;tab-size:8;outline:none;height:100px;line-height:20px;overflow-wrap:normal;overscroll-behavior-x:none;white-space:pre;z-index:1}")}`]);
window.customElements.get("bib-consent-server") || window.customElements.define("bib-consent-server", c);
export {
  c as BibConsentServer
};
//# sourceMappingURL=bib-consent-server.js.map
