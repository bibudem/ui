/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.0.2
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { s as r, i as o, r as s, x as e } from "./lit-element-Dj1nHH6C.js";
class n extends r {
  onBtnClick() {
    document.querySelector("bib-consent")?.showPreferences();
  }
  render() {
    return e`<button @click="${this.onBtnClick}" aria-label="Paramètres des témoins">Paramètres des témoins</button>`;
  }
}
__publicField(n, "styles", [o`${s("@layer reset{:host,*{box-sizing:border-box}:host{-webkit-font-smoothing:antialiased}}:host{--md-sys-color-primary: rgb(64 95 144);--md-sys-color-surface-tint: rgb(64 95 144);--md-sys-color-on-primary: rgb(255 255 255);--md-sys-color-primary-container: rgb(214 227 255);--md-sys-color-on-primary-container: rgb(0 27 61);--md-sys-color-secondary: rgb(85 95 113);--md-sys-color-on-secondary: rgb(255 255 255);--md-sys-color-secondary-container: rgb(218 226 249);--md-sys-color-on-secondary-container: rgb(18 28 43);--md-sys-color-tertiary: rgb(144 74 69);--md-sys-color-on-tertiary: rgb(255 255 255);--md-sys-color-tertiary-container: rgb(255 218 214);--md-sys-color-on-tertiary-container: rgb(59 9 8);--md-sys-color-error: rgb(144 74 67);--md-sys-color-on-error: rgb(255 255 255);--md-sys-color-error-container: rgb(255 218 214);--md-sys-color-on-error-container: rgb(59 9 7);--md-sys-color-background: rgb(249 249 255);--md-sys-color-on-background: rgb(25 28 32);--md-sys-color-surface: rgb(249 249 255);--md-sys-color-on-surface: rgb(25 28 32);--md-sys-color-surface-variant: rgb(224 226 236);--md-sys-color-on-surface-variant: rgb(68 71 78);--md-sys-color-outline: rgb(116 119 127);--md-sys-color-outline-variant: rgb(196 198 207);--md-sys-color-shadow: rgb(0 0 0);--md-sys-color-scrim: rgb(0 0 0);--md-sys-color-inverse-surface: rgb(46 48 54);--md-sys-color-inverse-on-surface: rgb(240 240 247);--md-sys-color-inverse-primary: rgb(169 199 255);--md-sys-color-primary-fixed: rgb(214 227 255);--md-sys-color-on-primary-fixed: rgb(0 27 61);--md-sys-color-primary-fixed-dim: rgb(169 199 255);--md-sys-color-on-primary-fixed-variant: rgb(39 71 119);--md-sys-color-secondary-fixed: rgb(218 226 249);--md-sys-color-on-secondary-fixed: rgb(18 28 43);--md-sys-color-secondary-fixed-dim: rgb(189 199 220);--md-sys-color-on-secondary-fixed-variant: rgb(62 71 88);--md-sys-color-tertiary-fixed: rgb(255 218 214);--md-sys-color-on-tertiary-fixed: rgb(59 9 8);--md-sys-color-tertiary-fixed-dim: rgb(255 179 173);--md-sys-color-on-tertiary-fixed-variant: rgb(115 51 47);--md-sys-color-surface-dim: rgb(217 217 224);--md-sys-color-surface-bright: rgb(249 249 255);--md-sys-color-surface-container-lowest: rgb(255 255 255);--md-sys-color-surface-container-low: rgb(243 243 250);--md-sys-color-surface-container: rgb(237 237 244);--md-sys-color-surface-container-high: rgb(231 232 238);--md-sys-color-surface-container-highest: rgb(226 226 233);--md-extended-color-warning-color: rgb(100 97 22);--md-extended-color-warning-on-color: rgb(255 255 255);--md-extended-color-warning-color-container: rgb(236 230 141);--md-extended-color-warning-on-color-container: rgb(30 28 0)}@layer reset,theme,component,states;@layer reset{button{border:unset;padding:0;background:none;font:inherit;border:none}button::-moz-focus-inner{border:none}button:focus{outline:none}button:not(:disabled),button [type=button]:not(:disabled),button [type=reset]:not(:disabled),button [type=submit]:not(:disabled),button [role=button]:not(:disabled){cursor:pointer}button:disabled{pointer-events:none}}@layer reset{button{all:unset}}")}`]);
window.customElements.get("bib-consent-preferences-btn") || window.customElements.define("bib-consent-preferences-btn", n);
export {
  n as BibConsentPreferencesBtn
};
//# sourceMappingURL=bib-consent-preferences-btn.js.map
