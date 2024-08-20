/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.15.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { s as t, i as o, r as e, x as n } from "./lit-element-Dj1nHH6C.js";
import { o as i } from "./unsafe-html-hzUS4Xy_.js";
class r extends t {
  constructor() {
    super(), this.addEventListener("click", this.handleClick);
  }
  handleClick() {
    const t2 = new MouseEvent("bib:close", { bubbles: true });
    this.dispatchEvent(t2);
  }
  render() {
    return n`<button aria-label="fermer">${i('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>')}</button>`;
  }
}
__publicField(r, "styles", [o`${e('@layer reset{:host,*{box-sizing:border-box}:host{-webkit-font-smoothing:antialiased}}@layer reset{button{border:unset;padding:0;background:none;font:inherit;border:none}button::-moz-focus-inner{border:none}button:focus{outline:none}button:not(:disabled),button [type=button]:not(:disabled),button [type=reset]:not(:disabled),button [type=submit]:not(:disabled),button [role=button]:not(:disabled){cursor:pointer}button:disabled{pointer-events:none}}@layer component{:host{--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, rgb(68, 71, 78)));color:var(--_icon-color);display:inline-flex;justify-content:center;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}button{display:inline-flex;justify-content:center;align-items:center;height:40px;width:40px;color:var(--_icon-color);position:relative}button:after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-height:44px;min-width:44px;width:100%;height:100%}button:focus:not([disabled]),button:focus-visible{outline:var(--md-focus-ring-width, 3px) solid currentColor;outline-offset:3px;border-radius:99999px}button:focus:not(:focus-visible){outline:0}button:before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;border-radius:50%;opacity:0;background-color:var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f))}button:hover:before{opacity:.08}button:active:before{opacity:.12}}')}`]);
window.customElements.get("bib-button-close") || window.customElements.define("bib-button-close", r);
export {
  r as BibButtonClose
};
//# sourceMappingURL=bib-button-close.js.map
