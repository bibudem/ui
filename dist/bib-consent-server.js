/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.1
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
import { b as i, e as r } from "./utils-CIJ6S_fL.js";
import { e as n, n as a } from "./ref-B-kqFHPy.js";
import { l } from "./logger-2PyXT5Qg.js";
import g from "./PreferenceStorage.js";
class c extends e {
  constructor() {
    super();
    __privateAdd(this, _e);
    __privateAdd(this, _t, l("consent-server"));
    this.connected = false, this.debug = this.debug || false, this.loggerRef = n(), this.allowedOrigins = this.allowedOrigins || [], this.init();
  }
  async init() {
    __privateSet(this, _e, await g()), __privateGet(this, _e).listen((e2) => {
      this.log("Storage updated with data", e2.detail);
    }), this.startListening();
  }
  log() {
    if (this.debug) {
      __privateGet(this, _t).call(this, ...arguments);
      const e2 = [...arguments].map((e3) => "string" == typeof e3 ? e3 : JSON.stringify(e3)).join(" ");
      this.loggerRef.value.value += `${"" === this.loggerRef.value.value ? "" : "\r"}${e2}`;
    }
  }
  async startListening() {
    const { postMessage: e2, listenMessage: t2 } = await i({ eventFilter: (e3) => {
      const { origin: t3 } = e3;
      return this.allowedOrigins.length > 0 && this.allowedOrigins.some((e4) => new RegExp(`${r(e4)}`).test(t3));
    } });
    this.connected = true, this.log("connected:", this.connected), t2(async (e3, t3, s2) => {
      let o2;
      switch (e3) {
        case "setPreferences":
          o2 = await __privateGet(this, _e).setPreferences(t3);
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
          throw this.log(`Unknown method: ${e3}. Payload:`, t3), new Error(`Unknown method: ${e3}`);
      }
      t3 ? this.log(`Method \`${e3}\` called with payload:`, t3, "response:", o2) : this.log(`Method \`${e3}\` called.`, "response:", o2), s2(o2);
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
