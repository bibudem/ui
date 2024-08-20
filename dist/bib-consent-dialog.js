/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.14.0
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
var _a_instances, o_fn, e_fn;
import { s as o, i as e, r, x as t, T as s } from "./lit-element-Dj1nHH6C.js";
import { e as n, n as i } from "./ref-B-kqFHPy.js";
import "./type-BPiIb9Kq.js";
class a extends o {
  constructor() {
    super();
    __privateAdd(this, _a_instances);
    this.open = false, this.showClose = this.showClose || false, this._dialogRef = n();
  }
  connectedCallback() {
    super.connectedCallback(), this._dialogRef.value?.addEventListener("close", () => this.close());
  }
  show() {
    __privateMethod(this, _a_instances, e_fn).call(this);
  }
  showModal() {
    __privateMethod(this, _a_instances, e_fn).call(this, "modal");
  }
  close(o2 = true) {
    this.open = false, this._dialogRef.value && this._dialogRef.value.open && this._dialogRef.value?.close(), o2 && this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
  }
  render() {
    return t`<dialog class="dialog" ${i(this._dialogRef)}>${__privateMethod(this, _a_instances, o_fn).call(this)}<div class="dialog-container"><div class="content-container"><slot></slot></div></div></dialog>`;
  }
}
_a_instances = new WeakSet();
o_fn = function() {
  return this.showClose ? t`<bib-button-close @click="${() => this.close()}" class="btn-close"></bib-button-close>` : s;
};
e_fn = function(o2 = "") {
  this._dialogRef.value && !this._dialogRef.value.open && ("modal" === o2 ? this._dialogRef.value?.showModal() : this._dialogRef.value?.show(), this.open = true);
};
__publicField(a, "properties", { debug: { type: Boolean, reflect: true }, open: { type: Boolean, reflect: true }, showClose: { type: Boolean, reflect: true, attribute: "show-close" } });
__publicField(a, "styles", [e`${r("@layer reset{:host,*{box-sizing:border-box}:host{-webkit-font-smoothing:antialiased}}:host{--md-sys-color-primary: rgb(64 95 144);--md-sys-color-surface-tint: rgb(64 95 144);--md-sys-color-on-primary: rgb(255 255 255);--md-sys-color-primary-container: rgb(214 227 255);--md-sys-color-on-primary-container: rgb(0 27 61);--md-sys-color-secondary: rgb(85 95 113);--md-sys-color-on-secondary: rgb(255 255 255);--md-sys-color-secondary-container: rgb(218 226 249);--md-sys-color-on-secondary-container: rgb(18 28 43);--md-sys-color-tertiary: rgb(144 74 69);--md-sys-color-on-tertiary: rgb(255 255 255);--md-sys-color-tertiary-container: rgb(255 218 214);--md-sys-color-on-tertiary-container: rgb(59 9 8);--md-sys-color-error: rgb(144 74 67);--md-sys-color-on-error: rgb(255 255 255);--md-sys-color-error-container: rgb(255 218 214);--md-sys-color-on-error-container: rgb(59 9 7);--md-sys-color-background: rgb(249 249 255);--md-sys-color-on-background: rgb(25 28 32);--md-sys-color-surface: rgb(249 249 255);--md-sys-color-on-surface: rgb(25 28 32);--md-sys-color-surface-variant: rgb(224 226 236);--md-sys-color-on-surface-variant: rgb(68 71 78);--md-sys-color-outline: rgb(116 119 127);--md-sys-color-outline-variant: rgb(196 198 207);--md-sys-color-shadow: rgb(0 0 0);--md-sys-color-scrim: rgb(0 0 0);--md-sys-color-inverse-surface: rgb(46 48 54);--md-sys-color-inverse-on-surface: rgb(240 240 247);--md-sys-color-inverse-primary: rgb(169 199 255);--md-sys-color-primary-fixed: rgb(214 227 255);--md-sys-color-on-primary-fixed: rgb(0 27 61);--md-sys-color-primary-fixed-dim: rgb(169 199 255);--md-sys-color-on-primary-fixed-variant: rgb(39 71 119);--md-sys-color-secondary-fixed: rgb(218 226 249);--md-sys-color-on-secondary-fixed: rgb(18 28 43);--md-sys-color-secondary-fixed-dim: rgb(189 199 220);--md-sys-color-on-secondary-fixed-variant: rgb(62 71 88);--md-sys-color-tertiary-fixed: rgb(255 218 214);--md-sys-color-on-tertiary-fixed: rgb(59 9 8);--md-sys-color-tertiary-fixed-dim: rgb(255 179 173);--md-sys-color-on-tertiary-fixed-variant: rgb(115 51 47);--md-sys-color-surface-dim: rgb(217 217 224);--md-sys-color-surface-bright: rgb(249 249 255);--md-sys-color-surface-container-lowest: rgb(255 255 255);--md-sys-color-surface-container-low: rgb(243 243 250);--md-sys-color-surface-container: rgb(237 237 244);--md-sys-color-surface-container-high: rgb(231 232 238);--md-sys-color-surface-container-highest: rgb(226 226 233);--md-extended-color-warning-color: rgb(100 97 22);--md-extended-color-warning-on-color: rgb(255 255 255);--md-extended-color-warning-color-container: rgb(236 230 141);--md-extended-color-warning-on-color-container: rgb(30 28 0)}@layer reset,theme,component,states;@layer reset{button{border:unset;padding:0;background:none;font:inherit;border:none}button::-moz-focus-inner{border:none}button:focus{outline:none}button:not(:disabled),button [type=button]:not(:disabled),button [type=reset]:not(:disabled),button [type=submit]:not(:disabled),button [role=button]:not(:disabled){cursor:pointer}button:disabled{pointer-events:none}}@layer reset{dialog{margin:0;padding:0;border:unset;color:inherit;background-color:#fff;inset-block:0;max-width:unset;max-height:unset}}@layer component{:host{--_consent-dialog-height: 450px;--_consent-dialog-max-height: 80%;--_consent-dialog-height-sm: auto;--_consent-content-height: 100%;--_consent-text-size: 14.62px;--_consent-text-line-height: 17.5px;--_consent-title-text-size: 18px;--_consent-title-text-line-height: 20px;font-size:var(--_consent-text-size);line-height:var(--_consent-text-line-height)}:host(.preferences-dialog){--_consent-dialog-height: 80%;--_consent-dialog-height-sm: 450px;--_consent-content-height: auto}.btn-close{position:absolute;right:15px;top:15px;z-index:10}.dialog{border-top:10px solid #0b113a;top:auto;bottom:0;color:#0b113a;background:#e5f0f8;height:var(--_consent-dialog-height);max-height:var(--_consent-dialog-max-height);text-align:left;overflow:hidden;position:fixed;width:100%;padding-top:50px;padding-bottom:10px;z-index:10000}@media screen and (min-width: 640px){.dialog{height:var(--_consent-dialog-height-sm)}}.dialog::backdrop{background-color:#00000080}.dialog-container{display:flex;height:100%;justify-content:center;overflow-y:auto}.dialog-container::-webkit-scrollbar{width:11px}.dialog-container::-webkit-scrollbar-track{border-radius:9999em}.dialog-container::-webkit-scrollbar-thumb{background-color:#aaa;border-radius:9999em;transition:background-color 5.2s linear,height .2s ease-in-out;height:6px}.dialog-container::-webkit-scrollbar-thumb:hover{background-color:#999}.content-container{height:var(--_consent-content-height);margin:0 auto;max-width:1200px;padding:0 35px 15px;z-index:0}@media screen and (min-width: 640px){.content-container{height:auto;padding:0 50px 20px}}}")}`]);
window.customElements.get("bib-consent-dialog") || window.customElements.define("bib-consent-dialog", a);
export {
  a as BibConsentDialog
};
//# sourceMappingURL=bib-consent-dialog.js.map
