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
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _e, _Z_instances, o_fn, t_fn, r_fn, a_fn, i_fn;
import { s as e, x as o, i as t, T as r, r as a } from "./lit-element-Dj1nHH6C.js";
import { o as i } from "./unsafe-html-hzUS4Xy_.js";
import { e as n, _ as s, t as l, r as c, a as d, n as v, b as m, i as u, m as p, s as b, I as h, c as f } from "./shared-styles-hMR2zzGE.js";
import { VoteData as y } from "./VotePayload.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class g extends e {
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  render() {
    return o`<span class="shadow"></span>`;
  }
}
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const _ = t`.shadow,.shadow::after,.shadow::before,:host{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::after,.shadow::before{content:"";transition-property:box-shadow,opacity;--_level:var(--md-elevation-level, 0);--_shadow-color:var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0 calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0 var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0 calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}`;
let x = class extends g {
};
x.styles = [_], x = s([l("md-elevation")], x);
let w = false;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const z = p(e);
class k extends z {
  get name() {
    return this.getAttribute("name") ?? "";
  }
  set name(e2) {
    this.setAttribute("name", e2);
  }
  get form() {
    return this[u].form;
  }
  constructor() {
    super(), this.disabled = false, this.href = "", this.target = "", this.trailingIcon = false, this.hasIcon = false, this.type = "submit", this.value = "", this.handleActivationClick = (e2) => {
      (function(e3) {
        return e3.currentTarget === e3.target && e3.composedPath()[0] === e3.target && !e3.target.disabled && !function(e4) {
          const o2 = w;
          return o2 && (e4.preventDefault(), e4.stopImmediatePropagation()), async function() {
            w = true, await null, w = false;
          }(), o2;
        }(e3);
      })(e2) && this.buttonElement && (this.focus(), /**
       * @license
       * Copyright 2021 Google LLC
       * SPDX-License-Identifier: Apache-2.0
       */
      function(e3) {
        const o2 = new MouseEvent("click", { bubbles: true });
        e3.dispatchEvent(o2);
      }(this.buttonElement));
    }, this.addEventListener("click", this.handleActivationClick);
  }
  focus() {
    this.buttonElement?.focus();
  }
  blur() {
    this.buttonElement?.blur();
  }
  render() {
    const e2 = this.disabled && !this.href, t2 = this.href ? this.renderLink() : this.renderButton(), r2 = this.href ? "link" : "button";
    return o`${this.renderElevationOrOutline?.()}<div class="background"></div><md-focus-ring part="focus-ring" for="${r2}"></md-focus-ring><md-ripple for="${r2}" ?disabled="${e2}"></md-ripple>${t2}`;
  }
  renderButton() {
    const { ariaLabel: e2, ariaHasPopup: t2, ariaExpanded: a2 } = this;
    return o`<button id="button" class="button" ?disabled="${this.disabled}" aria-label="${e2 || r}" aria-haspopup="${t2 || r}" aria-expanded="${a2 || r}">${this.renderContent()}</button>`;
  }
  renderLink() {
    const { ariaLabel: e2, ariaHasPopup: t2, ariaExpanded: a2 } = this;
    return o`<a id="link" class="button" aria-label="${e2 || r}" aria-haspopup="${t2 || r}" aria-expanded="${a2 || r}" href="${this.href}" target="${this.target || r}">${this.renderContent()}</a>`;
  }
  renderContent() {
    const e2 = o`<slot name="icon" @slotchange="${this.handleSlotChange}"></slot>`;
    return o`<span class="touch"></span> ${this.trailingIcon ? r : e2} <span class="label"><slot></slot></span>${this.trailingIcon ? e2 : r}`;
  }
  handleSlotChange() {
    this.hasIcon = this.assignedIcons.length > 0;
  }
}
var C;
c(k), d(k), k.formAssociated = true, k.shadowRootOptions = { mode: "open", delegatesFocus: true }, s([v({ type: Boolean, reflect: true })], k.prototype, "disabled", void 0), s([v()], k.prototype, "href", void 0), s([v()], k.prototype, "target", void 0), s([v({ type: Boolean, attribute: "trailing-icon", reflect: true })], k.prototype, "trailingIcon", void 0), s([v({ type: Boolean, attribute: "has-icon", reflect: true })], k.prototype, "hasIcon", void 0), s([v()], k.prototype, "type", void 0), s([v({ reflect: true })], k.prototype, "value", void 0), s([m(".button")], k.prototype, "buttonElement", void 0), s([(C = { slot: "icon", flatten: true }, (e2, o2) => {
  const { slot: t2, selector: r2 } = C ?? {}, a2 = "slot" + (t2 ? `[name=${t2}]` : ":not([name])");
  return n(e2, o2, { get() {
    const e3 = this.renderRoot?.querySelector(a2), o3 = e3?.assignedElements(C) ?? [];
    return void 0 === r2 ? o3 : o3.filter((e4) => e4.matches(r2));
  } });
})], k.prototype, "assignedIcons", void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class $ extends k {
  renderElevationOrOutline() {
    return o`<md-elevation part="elevation"></md-elevation>`;
  }
}
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const T = t`:host{--_container-color:var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation:var(--md-filled-button-container-elevation, 0);--_container-height:var(--md-filled-button-container-height, 40px);--_container-shadow-color:var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color:var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation:var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity:var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color:var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity:var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation:var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color:var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation:var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color:var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color:var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity:var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color:var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font:var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height:var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size:var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight:var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation:var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color:var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color:var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity:var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color:var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity:var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color:var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color:var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color:var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size:var(--md-filled-button-icon-size, 18px);--_pressed-icon-color:var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start:var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end:var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end:var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start:var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space:var(--md-filled-button-leading-space, 24px);--_trailing-space:var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space:var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space:var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space:var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space:var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}`, I = t`md-elevation{transition-duration:280ms}:host([disabled]) md-elevation{transition:none}md-elevation{--md-elevation-level:var(--_container-elevation);--md-elevation-shadow-color:var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level:var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level:var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level:var(--_pressed-container-elevation)}:host([disabled]) md-elevation{--md-elevation-level:var(--_disabled-container-elevation)}`, S = t`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:0;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/ 2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:transparent;vertical-align:top;--md-ripple-hover-color:var(--_hover-state-layer-color);--md-ripple-pressed-color:var(--_pressed-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start:var(--_container-shape-start-start);--md-focus-ring-shape-start-end:var(--_container-shape-start-end);--md-focus-ring-shape-end-end:var(--_container-shape-end-end);--md-focus-ring-shape-end-start:var(--_container-shape-end-start)}:host([disabled]){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:0;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background-color:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}.label ::slotted(*),:is(.button,.label,.labelslot){text-overflow:inherit}:host([disabled]) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host([disabled]) .background{background-color:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors:active){.background{border:1px solid CanvasText}:host([disabled]){--_disabled-icon-color:GrayText;--_disabled-icon-opacity:1;--_disabled-container-opacity:1;--_disabled-label-text-color:GrayText;--_disabled-label-text-opacity:1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([disabled]) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}`;
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let E = class extends $ {
};
E.styles = [S, I, T], E = s([l("md-filled-button")], E);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class q extends k {
}
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const A = t`:host{--_container-height:var(--md-text-button-container-height, 40px);--_disabled-label-text-color:var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity:var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color:var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color:var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color:var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity:var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color:var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font:var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height:var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size:var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight:var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color:var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color:var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity:var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color:var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity:var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color:var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color:var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color:var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size:var(--md-text-button-icon-size, 18px);--_pressed-icon-color:var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start:var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end:var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end:var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start:var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space:var(--md-text-button-leading-space, 12px);--_trailing-space:var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space:var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space:var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space:var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space:var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color:none;--_disabled-container-color:none;--_disabled-container-opacity:0}`;
let R = class extends q {
};
R.styles = [S, A], R = s([l("md-text-button")], R);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const B = t`:host{--_container-height:var(--md-outlined-icon-button-container-height, 40px);--_container-width:var(--md-outlined-icon-button-container-width, 40px);--_disabled-icon-color:var(--md-outlined-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity:var(--md-outlined-icon-button-disabled-icon-opacity, 0.38);--_disabled-selected-container-color:var(--md-outlined-icon-button-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity:var(--md-outlined-icon-button-disabled-selected-container-opacity, 0.12);--_hover-state-layer-opacity:var(--md-outlined-icon-button-hover-state-layer-opacity, 0.08);--_icon-size:var(--md-outlined-icon-button-icon-size, 24px);--_pressed-state-layer-opacity:var(--md-outlined-icon-button-pressed-state-layer-opacity, 0.12);--_selected-container-color:var(--md-outlined-icon-button-selected-container-color, var(--md-sys-color-inverse-surface, #322f35));--_selected-focus-icon-color:var(--md-outlined-icon-button-selected-focus-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-hover-icon-color:var(--md-outlined-icon-button-selected-hover-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-hover-state-layer-color:var(--md-outlined-icon-button-selected-hover-state-layer-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-icon-color:var(--md-outlined-icon-button-selected-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-pressed-icon-color:var(--md-outlined-icon-button-selected-pressed-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-pressed-state-layer-color:var(--md-outlined-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_disabled-outline-color:var(--md-outlined-icon-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity:var(--md-outlined-icon-button-disabled-outline-opacity, 0.12);--_focus-icon-color:var(--md-outlined-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color:var(--md-outlined-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color:var(--md-outlined-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_icon-color:var(--md-outlined-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color:var(--md-outlined-icon-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width:var(--md-outlined-icon-button-outline-width, 1px);--_pressed-icon-color:var(--md-outlined-icon-button-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-color:var(--md-outlined-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start:var(--md-outlined-icon-button-container-shape-start-start, var(--md-outlined-icon-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end:var(--md-outlined-icon-button-container-shape-start-end, var(--md-outlined-icon-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end:var(--md-outlined-icon-button-container-shape-end-end, var(--md-outlined-icon-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start:var(--md-outlined-icon-button-container-shape-end-start, var(--md-outlined-icon-button-container-shape, var(--md-sys-shape-corner-full, 9999px)))}.outlined{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color:var(--_hover-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-pressed-color:var(--_pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}.outlined::before{border-color:var(--_outline-color);border-width:var(--_outline-width)}.outlined:hover{color:var(--_hover-icon-color)}.outlined:focus{color:var(--_focus-icon-color)}.outlined:active{color:var(--_pressed-icon-color)}.outlined:disabled{color:var(--_disabled-icon-color)}.outlined:disabled::before{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}.outlined:disabled .icon{opacity:var(--_disabled-icon-opacity)}.outlined::before{block-size:100%;border-style:solid;border-radius:inherit;box-sizing:border-box;content:"";inline-size:100%;inset:0;pointer-events:none;position:absolute;z-index:-1}.outlined.selected::before{border-width:0}.selected{--md-ripple-hover-color:var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-pressed-color:var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}.selected:not(:disabled){color:var(--_selected-icon-color)}.selected:not(:disabled):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled):active{color:var(--_selected-pressed-icon-color)}.selected:not(:disabled)::before{background-color:var(--_selected-container-color)}.selected:disabled::before{background-color:var(--_disabled-selected-container-color);opacity:var(--_disabled-selected-container-opacity)}@media(forced-colors:active){:host([disabled]){--_disabled-outline-opacity:1}.selected::before{border-color:CanvasText;border-width:var(--_outline-width)}.selected:disabled::before{border-color:GrayText;opacity:1}}`;
let L = class extends h {
  getRenderClasses() {
    return { ...super.getRenderClasses(), outlined: true };
  }
};
L.styles = [b, B], L = s([l("md-outlined-icon-button")], L);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class j extends e {
  constructor() {
    super(...arguments), this.value = 0, this.max = 1, this.indeterminate = false, this.fourColor = false;
  }
  render() {
    const { ariaLabel: e2 } = this;
    return o`<div class="progress ${f(this.getRenderClasses())}" role="progressbar" aria-label="${e2 || r}" aria-valuemin="0" aria-valuemax="${this.max}" aria-valuenow="${this.indeterminate ? r : this.value}">${this.renderIndicator()}</div>`;
  }
  getRenderClasses() {
    return { indeterminate: this.indeterminate, "four-color": this.fourColor };
  }
}
c(j), s([v({ type: Number })], j.prototype, "value", void 0), s([v({ type: Number })], j.prototype, "max", void 0), s([v({ type: Boolean })], j.prototype, "indeterminate", void 0), s([v({ type: Boolean, attribute: "four-color" })], j.prototype, "fourColor", void 0);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class M extends j {
  renderIndicator() {
    return this.indeterminate ? this.renderIndeterminateContainer() : this.renderDeterminateContainer();
  }
  renderDeterminateContainer() {
    const e2 = 100 * (1 - this.value / this.max);
    return o`<svg viewBox="0 0 4800 4800"><circle class="track" pathLength="100"></circle><circle class="active-track" pathLength="100" stroke-dashoffset="${e2}"></circle></svg>`;
  }
  renderIndeterminateContainer() {
    return o`<div class="spinner"><div class="left"><div class="circle"></div></div><div class="right"><div class="circle"></div></div></div>`;
  }
}
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const O = t`:host{--_active-indicator-color:var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width:var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color:var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color:var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color:var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color:var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size:var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.active-track,.circle,.left,.progress,.right,.spinner,.track,svg{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:transparent}.active-track{transition:stroke-dashoffset .5s cubic-bezier(0,0,.2,1);stroke:var(--_active-indicator-color)}.track{stroke:transparent}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1.568s}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(.4,0,.2,1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/ 100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) transparent transparent;animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(.4,0,.2,1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-.666s,0s}@media(forced-colors:active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}`;
let H = class extends M {
};
H.styles = [O], H = s([l("md-circular-progress")], H);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class N extends e {
  render() {
    return o`<slot></slot>`;
  }
  connectedCallback() {
    super.connectedCallback(), "false" !== this.getAttribute("aria-hidden") ? this.setAttribute("aria-hidden", "true") : this.removeAttribute("aria-hidden");
  }
}
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const P = t`:host{font-size:var(--md-icon-size,24px);width:var(--md-icon-size,24px);height:var(--md-icon-size,24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font,Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}`;
let F = class extends N {
};
F.styles = [P], F = s([l("md-icon")], F);
const _Z = class _Z extends e {
  constructor() {
    super();
    __privateAdd(this, _Z_instances);
    __privateAdd(this, _e);
    __privateSet(this, _e, "https://umontreal.libwizard.com/api/v1/submission"), this._vote = null, this.state = "loaded";
  }
  _onIconClick(e2) {
    this._vote = e2.target.selected ? e2.target.value : null;
  }
  render() {
    return o`<p id="survey-title" class="survey-title">Cette page vous a été utile?</p>${__privateMethod(this, _Z_instances, a_fn).call(this)} ${__privateMethod(this, _Z_instances, r_fn).call(this)}`;
  }
};
_e = new WeakMap();
_Z_instances = new WeakSet();
o_fn = async function(e2) {
  e2.preventDefault();
  const o2 = e2.submitter, t2 = new FormData(e2.currentTarget), r2 = this.renderRoot.querySelector(".btn-vote[selected]").value;
  return new Promise(async (e3, t3) => {
    this.state = _Z.STATES.SUBMITTING, o2.disabled = true, fetch(`${__privateGet(this, _e)}/getguid`).then(async (o3) => {
      if (!o3.ok) return t3(new Error("Could not fetch service. response: ", o3));
      e3(await o3.json());
    }).catch((e4) => t3(`Could not GET /guid. Returned status: ${e4}`));
  }).then(async (e3) => {
    const o3 = new y(e3);
    o3.vote = r2, o3.comment = t2.get("comment"), await fetch(`${__privateGet(this, _e)}/insertSubmission`, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(o3) }).catch((e4) => {
      throw new Error("Could not POST vote: ", e4);
    });
  }).then(() => {
    this.state = _Z.STATES.SUBMITTED;
  }).catch((e3) => {
    this.state = _Z.STATES.ERROR, console.error("Vote submission failed. ", e3);
  }).finally(() => {
    o2.disabled = false;
  });
};
t_fn = function() {
  this._vote = null, this.state = _Z.STATES.INITIAL;
};
r_fn = function() {
  return "submitted" === this.state ? o`<p>Merci! Nous avons reçu vos commentaires.</p>` : "error" === this.state ? o`<p>Mmm, quelque chose s'est mal passé. Nous tâcherons de réparer le problème.</p>` : void 0;
};
a_fn = function() {
  if ("loaded" === this.state) return o`<form aria-live="polite" @submit="${__privateMethod(this, _Z_instances, o_fn)}" @reset="${__privateMethod(this, _Z_instances, t_fn)}"><div role="radiogroup" aria-labelledby="survey-title" class="radio-group"><md-outlined-icon-button id="btn-vote-y" class="btn-vote" value="oui" name="vote" type="button" toggle aria-label="oui" @click="${this._onIconClick}" ?selected="${"oui" === this._vote}"><md-icon>${i('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M840-640q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14H280v-520l240-238q15-15 35.5-17.5T595-888q19 10 28 28t4 37l-45 183h258Zm-480 34v406h360l120-280v-80H480l54-220-174 174ZM160-120q-33 0-56.5-23.5T80-200v-360q0-33 23.5-56.5T160-640h120v80H160v360h120v80H160Zm200-80v-406 406Z"/></svg>')}</md-icon></md-outlined-icon-button><md-outlined-icon-button id="btn-vote-n" class="btn-vote" value="non" name="vote" type="button" toggle aria-label="non" @click="${this._onIconClick}" ?selected="${"non" === this._vote}"><md-icon>${i('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-320q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14h440v520L440-82q-15 15-35.5 17.5T365-72q-19-10-28-28t-4-37l45-183H120Zm480-34v-406H240L120-480v80h360l-54 220 174-174Zm200-486q33 0 56.5 23.5T880-760v360q0 33-23.5 56.5T800-320H680v-80h120v-360H680v-80h120Zm-200 80v406-406Z"/></svg>')}</md-icon></md-outlined-icon-button></div>${__privateMethod(this, _Z_instances, i_fn).call(this)} <a rel="" class="privacy-link" target="_blank" href="https://vie-privee.umontreal.ca/confidentialite/">Politique de confidentialité</a></form>`;
};
i_fn = function() {
  if (this._vote) return o`<p class="form-group"><label class="label width-full" for="survey-comment"><span>${"oui" === this._vote ? "Faites-nous savoir ce que nous faisons bien" : "Faites-nous savoir ce que nous pouvons faire mieux"}</span></label> <textarea class="form-control input-sm width-full" name="comment" id="survey-comment"></textarea></p><p class="write-us f6 color-fg-muted">Si vous avez besoin d'une réponse, <a href="https://bib.umontreal.ca/nous-joindre" target="_blank">veuillez plutôt nous écrire</a>.</p><div class="form-group-submit d-flex flex-justify-end flex-items-center mt-3"><md-text-button class="btn" type="reset">Annuler</md-text-button><md-filled-button class="btn btn-submit"><span>Envoyer<md-circular-progress class="progress" indeterminate></md-circular-progress></span></md-filled-button></div>`;
};
__publicField(_Z, "STATES", { INITIAL: "initial", SUBMITTING: "submitting", SUBMITTED: "submitted", ERROR: "error" });
__publicField(_Z, "properties", { state: { state: true }, _vote: { state: true } });
__publicField(_Z, "styles", [t`${a(":host{--md-sys-color-primary: rgb(64 95 144);--md-sys-color-surface-tint: rgb(64 95 144);--md-sys-color-on-primary: rgb(255 255 255);--md-sys-color-primary-container: rgb(214 227 255);--md-sys-color-on-primary-container: rgb(0 27 61);--md-sys-color-secondary: rgb(85 95 113);--md-sys-color-on-secondary: rgb(255 255 255);--md-sys-color-secondary-container: rgb(218 226 249);--md-sys-color-on-secondary-container: rgb(18 28 43);--md-sys-color-tertiary: rgb(144 74 69);--md-sys-color-on-tertiary: rgb(255 255 255);--md-sys-color-tertiary-container: rgb(255 218 214);--md-sys-color-on-tertiary-container: rgb(59 9 8);--md-sys-color-error: rgb(144 74 67);--md-sys-color-on-error: rgb(255 255 255);--md-sys-color-error-container: rgb(255 218 214);--md-sys-color-on-error-container: rgb(59 9 7);--md-sys-color-background: rgb(249 249 255);--md-sys-color-on-background: rgb(25 28 32);--md-sys-color-surface: rgb(249 249 255);--md-sys-color-on-surface: rgb(25 28 32);--md-sys-color-surface-variant: rgb(224 226 236);--md-sys-color-on-surface-variant: rgb(68 71 78);--md-sys-color-outline: rgb(116 119 127);--md-sys-color-outline-variant: rgb(196 198 207);--md-sys-color-shadow: rgb(0 0 0);--md-sys-color-scrim: rgb(0 0 0);--md-sys-color-inverse-surface: rgb(46 48 54);--md-sys-color-inverse-on-surface: rgb(240 240 247);--md-sys-color-inverse-primary: rgb(169 199 255);--md-sys-color-primary-fixed: rgb(214 227 255);--md-sys-color-on-primary-fixed: rgb(0 27 61);--md-sys-color-primary-fixed-dim: rgb(169 199 255);--md-sys-color-on-primary-fixed-variant: rgb(39 71 119);--md-sys-color-secondary-fixed: rgb(218 226 249);--md-sys-color-on-secondary-fixed: rgb(18 28 43);--md-sys-color-secondary-fixed-dim: rgb(189 199 220);--md-sys-color-on-secondary-fixed-variant: rgb(62 71 88);--md-sys-color-tertiary-fixed: rgb(255 218 214);--md-sys-color-on-tertiary-fixed: rgb(59 9 8);--md-sys-color-tertiary-fixed-dim: rgb(255 179 173);--md-sys-color-on-tertiary-fixed-variant: rgb(115 51 47);--md-sys-color-surface-dim: rgb(217 217 224);--md-sys-color-surface-bright: rgb(249 249 255);--md-sys-color-surface-container-lowest: rgb(255 255 255);--md-sys-color-surface-container-low: rgb(243 243 250);--md-sys-color-surface-container: rgb(237 237 244);--md-sys-color-surface-container-high: rgb(231 232 238);--md-sys-color-surface-container-highest: rgb(226 226 233);--md-extended-color-warning-color: rgb(100 97 22);--md-extended-color-warning-on-color: rgb(255 255 255);--md-extended-color-warning-color-container: rgb(236 230 141);--md-extended-color-warning-on-color-container: rgb(30 28 0)}:host,*{box-sizing:border-box}:host{--_size-large: calc(16 / 14 * 1em);--_size-small: .8125em ;--_leading-space: .5em;--bib-comp-retroaction-usager-size: var(--md-sys-typescale-body-small-size, inherit);display:inline-block;font-size:var(--bib-comp-retroaction-usager-size)}p{margin:0}textarea,input{font-family:inherit;font-size:inherit;line-height:inherit;padding:var(--_leading-space) var(--_leading-space)}.survey-title{margin-bottom:var(--_size-large);font-weight:var(--bib-comp-retroaction-usager-title-weight, var(--md-sys-typescale-title-medium-weight, 450))}.radio-group{display:flex;gap:.25em;margin-bottom:.5em}.btn-vote{--md-outlined-icon-button-container-height: var(--_icon-btn-size);--md-outlined-icon-button-container-width: var(--_icon-btn-size);--md-outlined-icon-button-selected-container-color: var(--md-sys-color-surface-tint);--md-outlined-icon-button-outline-width: 0}.form-group{margin:1em 0 .5em}.form-group .label{display:flex;margin-bottom:.325em}.form-group .label :first-child{flex-grow:1}.form-group-submit{margin-block-start:1em;display:flex;align-items:center;justify-content:flex-end;gap:.5em}.privacy-link{text-decoration:underline;font-size:var(--_size-small)}.width-full{width:100%}.write-us{color:#3d4248;font-size:var(--_size-small)}.btn{font-family:inherit}.btn-submit:not(disabled) .progress{display:none}.btn-submit span{display:inline-flex;gap:.5em;align-items:center}.progress{--md-circular-progress-size: 20px;--md-circular-progress-active-indicator-width: 16}")}`]);
let Z = _Z;
window.customElements.get("bib-retroaction-usager") || window.customElements.define("bib-retroaction-usager", Z);
export {
  Z as BibRetroactionUsager
};
//# sourceMappingURL=bib-retroaction-usager.js.map
