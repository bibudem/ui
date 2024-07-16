/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { i as e, s as o, x as r } from "./lit-element-Dj1nHH6C.js";
import { o as t } from "./unsafe-html-hzUS4Xy_.js";
import { s as a, _ as s, I as c, t as l } from "./shared-styles-hMR2zzGE.js";
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const d = e`:host{--_disabled-icon-color:var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity:var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size:var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color:var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color:var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color:var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity:var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color:var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color:var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color:var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity:var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height:var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape:var(--md-icon-button-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));--_state-layer-width:var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color:var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color:var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color:var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity:var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color:var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color:var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color:var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity:var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start:0;--_container-shape-start-end:0;--_container-shape-end-end:0;--_container-shape-end-start:0;--_container-height:0;--_container-width:0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0,(48px - var(--_state-layer-height))/2) max(0,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start:var(--_state-layer-shape);--md-focus-ring-shape-start-end:var(--_state-layer-shape);--md-focus-ring-shape-end-end:var(--_state-layer-shape);--md-focus-ring-shape-end-start:var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color:var(--_hover-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-pressed-color:var(--_pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:disabled{color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:disabled .icon{opacity:var(--_disabled-icon-opacity)}.selected{--md-ripple-hover-color:var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity:var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color:var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_selected-pressed-state-layer-opacity)}.selected:not(:disabled){color:var(--_selected-icon-color)}.selected:not(:disabled):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled):active{color:var(--_selected-pressed-icon-color)}`;
let i = class extends c {
  getRenderClasses() {
    return { ...super.getRenderClasses(), standard: true };
  }
};
i.styles = [a, d], i = s([l("md-icon-button")], i);
class n extends o {
  constructor() {
    super(), this.addEventListener("click", this.handleClick);
  }
  handleClick() {
    const e2 = new MouseEvent("bib:close", { bubbles: true });
    this.dispatchEvent(e2);
  }
  render() {
    return r`<md-icon-button aria-label="fermer">${t('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>')}</md-icon-button>`;
  }
}
window.customElements.get("bib-button-close") || window.customElements.define("bib-button-close", n);
export {
  n as BibButtonClose
};
//# sourceMappingURL=bib-button-close.js.map
