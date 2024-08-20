/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
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
var _e2, _Te_instances, t_fn, r_fn, o_fn, a_fn, i_fn;
import { d as e, n as t, L as r, h as o, c as a, b as i, a as n, u as s } from "./lit-element-DmnF17fR.js";
import { u as l } from "./unsafe-html-tpiIXNZn.js";
import { d as c, D as d, P as h } from "./directive-BFTiGTun.js";
import { VoteData as u } from "./VotePayload.js";
import { a as p } from "./bib-BW5s0xHx.js";
function v(e2, t2, r2, o2) {
  var a2, i2 = arguments.length, n2 = i2 < 3 ? t2 : null === o2 ? o2 = Object.getOwnPropertyDescriptor(t2, r2) : o2;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n2 = Reflect.decorate(e2, t2, r2, o2);
  else for (var s2 = e2.length - 1; s2 >= 0; s2--) (a2 = e2[s2]) && (n2 = (i2 < 3 ? a2(n2) : i2 > 3 ? a2(t2, r2, n2) : a2(t2, r2)) || n2);
  return i2 > 3 && n2 && Object.defineProperty(t2, r2, n2), n2;
}
"function" == typeof SuppressedError && SuppressedError;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const m = (e2) => (t2, r2) => {
  void 0 !== r2 ? r2.addInitializer(() => {
    customElements.define(e2, t2);
  }) : customElements.define(e2, t2);
};
let b;
{
  const e2 = globalThis.litIssuedWarnings ??= /* @__PURE__ */ new Set();
  b = (t2, r2) => {
    r2 += ` See https://lit.dev/msg/${t2} for more information.`, e2.has(r2) || (console.warn(r2), e2.add(r2));
  };
}
const f = (e2, t2, r2) => {
  const o2 = t2.hasOwnProperty(r2);
  return t2.constructor.createProperty(r2, o2 ? { ...e2, wrapped: true } : e2), o2 ? Object.getOwnPropertyDescriptor(t2, r2) : void 0;
}, g = { attribute: true, type: String, converter: e, reflect: false, hasChanged: t }, y = (e2 = g, t2, r2) => {
  const { kind: o2, metadata: a2 } = r2;
  null == a2 && b("missing-class-metadata", `The class ${t2} is missing decorator metadata. This could mean that you're using a compiler that supports decorators but doesn't support decorator metadata, such as TypeScript 5.1. Please update your compiler.`);
  let i2 = globalThis.litPropertyMetadata.get(a2);
  if (void 0 === i2 && globalThis.litPropertyMetadata.set(a2, i2 = /* @__PURE__ */ new Map()), i2.set(r2.name, e2), "accessor" === o2) {
    const { name: o3 } = r2;
    return { set(r3) {
      const a3 = t2.get.call(this);
      t2.set.call(this, r3), this.requestUpdate(o3, a3, e2);
    }, init(t3) {
      return void 0 !== t3 && this._$changeProperty(o3, void 0, e2), t3;
    } };
  }
  if ("setter" === o2) {
    const { name: o3 } = r2;
    return function(r3) {
      const a3 = this[o3];
      t2.call(this, r3), this.requestUpdate(o3, a3, e2);
    };
  }
  throw new Error(`Unsupported decorator location: ${o2}`);
};
function x(e2) {
  return (t2, r2) => "object" == typeof r2 ? y(e2, t2, r2) : f(e2, t2, r2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _(e2) {
  return x({ ...e2, state: true, attribute: false });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = (e2, t2, r2) => (r2.configurable = true, r2.enumerable = true, Reflect.decorate && "object" != typeof t2 && Object.defineProperty(e2, t2, r2), r2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let C;
{
  const e2 = globalThis.litIssuedWarnings ??= /* @__PURE__ */ new Set();
  C = (t2, r2) => {
    r2 += t2 ? ` See https://lit.dev/msg/${t2} for more information.` : "", e2.has(r2) || (console.warn(r2), e2.add(r2));
  };
}
function k(e2, t2) {
  return (r2, o2, a2) => w(r2, o2, { get() {
    return ((r3) => {
      const a3 = r3.renderRoot?.querySelector(e2) ?? null;
      if (null === a3 && t2 && !r3.hasUpdated) {
        const t3 = "object" == typeof o2 ? o2.name : o2;
        C("", `@query'd field ${JSON.stringify(String(t3))} with the 'cache' flag set for selector '${e2}' has been accessed before the first update and returned null. This is expected if the renderRoot tree has not been provided beforehand (e.g. via Declarative Shadow DOM). Therefore the value hasn't been cached.`);
      }
      return a3;
    })(this);
  } });
}
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
class I extends r {
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
const S = a`.shadow,.shadow::after,.shadow::before,:host{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::after,.shadow::before{content:"";transition-property:box-shadow,opacity;--_level:var(--md-elevation-level, 0);--_shadow-color:var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0 calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0 var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0 calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}`;
let T = class extends I {
};
T.styles = [S], T = v([m("md-elevation")], T);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const z = Symbol("attachableController");
let $;
$ = new MutationObserver((e2) => {
  for (const t2 of e2) t2.target[z]?.hostConnected();
});
class E {
  get htmlFor() {
    return this.host.getAttribute("for");
  }
  set htmlFor(e2) {
    null === e2 ? this.host.removeAttribute("for") : this.host.setAttribute("for", e2);
  }
  get control() {
    return this.host.hasAttribute("for") ? this.htmlFor && this.host.isConnected ? this.host.getRootNode().querySelector(`#${this.htmlFor}`) : null : this.currentControl || this.host.parentElement;
  }
  set control(e2) {
    e2 ? this.attach(e2) : this.detach();
  }
  constructor(e2, t2) {
    this.host = e2, this.onControlChange = t2, this.currentControl = null, e2.addController(this), e2[z] = this, $?.observe(e2, { attributeFilter: ["for"] });
  }
  attach(e2) {
    e2 !== this.currentControl && (this.setCurrentControl(e2), this.host.removeAttribute("for"));
  }
  detach() {
    this.setCurrentControl(null), this.host.setAttribute("for", "");
  }
  hostConnected() {
    this.setCurrentControl(this.control);
  }
  hostDisconnected() {
    this.setCurrentControl(null);
  }
  setCurrentControl(e2) {
    this.onControlChange(this.currentControl, e2), this.currentControl = e2;
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const A = ["focusin", "focusout", "pointerdown"];
class R extends r {
  constructor() {
    super(...arguments), this.visible = false, this.inward = false, this.attachableController = new E(this, this.onControlChange.bind(this));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(e2) {
    this.attachableController.htmlFor = e2;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(e2) {
    this.attachableController.control = e2;
  }
  attach(e2) {
    this.attachableController.attach(e2);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  handleEvent(e2) {
    if (!e2[P]) {
      switch (e2.type) {
        default:
          return;
        case "focusin":
          this.visible = this.control?.matches(":focus-visible") ?? false;
          break;
        case "focusout":
        case "pointerdown":
          this.visible = false;
      }
      e2[P] = true;
    }
  }
  onControlChange(e2, t2) {
    for (const r2 of A) e2?.removeEventListener(r2, this), t2?.addEventListener(r2, this);
  }
  update(e2) {
    e2.has("visible") && this.dispatchEvent(new Event("visibility-changed")), super.update(e2);
  }
}
v([x({ type: Boolean, reflect: true })], R.prototype, "visible", void 0), v([x({ type: Boolean, reflect: true })], R.prototype, "inward", void 0);
const P = Symbol("handledByFocusRing"), L = a`:host{animation-delay:0s,calc(var(--md-focus-ring-duration,600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration,600ms)*.25),calc(var(--md-focus-ring-duration,600ms)*.75);animation-timing-function:cubic-bezier(.2,0,0,1);box-sizing:border-box;color:var(--md-focus-ring-color,var(--md-sys-color-secondary,#625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) + var(--md-focus-ring-outward-offset,2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) + var(--md-focus-ring-outward-offset,2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) + var(--md-focus-ring-outward-offset,2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) + var(--md-focus-ring-outward-offset,2px));inset:calc(-1*var(--md-focus-ring-outward-offset,2px));outline:var(--md-focus-ring-width,3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) - var(--md-focus-ring-inward-offset,0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) - var(--md-focus-ring-inward-offset,0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) - var(--md-focus-ring-inward-offset,0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) - var(--md-focus-ring-inward-offset,0px));border:var(--md-focus-ring-width,3px) solid currentColor;inset:var(--md-focus-ring-inward-offset,0)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width,8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width,8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width,8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width,8px)}}@media(prefers-reduced-motion){:host{animation:none}}`;
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let O = class extends R {
};
O.styles = [L], O = v([m("md-focus-ring")], O);
const B = c(
  /**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  class extends d {
    constructor(e2) {
      if (super(e2), e2.type !== h.ATTRIBUTE || "class" !== e2.name || e2.strings?.length > 2) throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(e2) {
      return " " + Object.keys(e2).filter((t2) => e2[t2]).join(" ") + " ";
    }
    update(e2, [t2]) {
      if (void 0 === this._previousClasses) {
        this._previousClasses = /* @__PURE__ */ new Set(), void 0 !== e2.strings && (this._staticClasses = new Set(e2.strings.join(" ").split(/\s/).filter((e3) => "" !== e3)));
        for (const e3 in t2) t2[e3] && !this._staticClasses?.has(e3) && this._previousClasses.add(e3);
        return this.render(t2);
      }
      const r2 = e2.element.classList;
      for (const e3 of this._previousClasses) e3 in t2 || (r2.remove(e3), this._previousClasses.delete(e3));
      for (const e3 in t2) {
        const o2 = !!t2[e3];
        o2 === this._previousClasses.has(e3) || this._staticClasses?.has(e3) || (o2 ? (r2.add(e3), this._previousClasses.add(e3)) : (r2.remove(e3), this._previousClasses.delete(e3)));
      }
      return i;
    }
  }
);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var F;
!function(e2) {
  e2[e2.INACTIVE = 0] = "INACTIVE", e2[e2.TOUCH_DELAY = 1] = "TOUCH_DELAY", e2[e2.HOLDING = 2] = "HOLDING", e2[e2.WAITING_FOR_CLICK = 3] = "WAITING_FOR_CLICK";
}(F || (F = {}));
const M = ["click", "contextmenu", "pointercancel", "pointerdown", "pointerenter", "pointerleave", "pointerup"], N = window.matchMedia("(forced-colors: active)");
class q extends r {
  constructor() {
    super(...arguments), this.disabled = false, this.hovered = false, this.pressed = false, this.rippleSize = "", this.rippleScale = "", this.initialSize = 0, this.state = F.INACTIVE, this.checkBoundsAfterContextMenu = false, this.attachableController = new E(this, this.onControlChange.bind(this));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(e2) {
    this.attachableController.htmlFor = e2;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(e2) {
    this.attachableController.control = e2;
  }
  attach(e2) {
    this.attachableController.attach(e2);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  render() {
    const e2 = { hovered: this.hovered, pressed: this.pressed };
    return o`<div class="surface ${B(e2)}"></div>`;
  }
  update(e2) {
    e2.has("disabled") && this.disabled && (this.hovered = false, this.pressed = false), super.update(e2);
  }
  handlePointerenter(e2) {
    this.shouldReactToEvent(e2) && (this.hovered = true);
  }
  handlePointerleave(e2) {
    this.shouldReactToEvent(e2) && (this.hovered = false, this.state !== F.INACTIVE && this.endPressAnimation());
  }
  handlePointerup(e2) {
    if (this.shouldReactToEvent(e2)) {
      if (this.state !== F.HOLDING) return this.state === F.TOUCH_DELAY ? (this.state = F.WAITING_FOR_CLICK, void this.startPressAnimation(this.rippleStartEvent)) : void 0;
      this.state = F.WAITING_FOR_CLICK;
    }
  }
  async handlePointerdown(e2) {
    if (this.shouldReactToEvent(e2)) {
      if (this.rippleStartEvent = e2, !this.isTouch(e2)) return this.state = F.WAITING_FOR_CLICK, void this.startPressAnimation(e2);
      this.checkBoundsAfterContextMenu && !this.inBounds(e2) || (this.checkBoundsAfterContextMenu = false, this.state = F.TOUCH_DELAY, await new Promise((e3) => {
        setTimeout(e3, 150);
      }), this.state === F.TOUCH_DELAY && (this.state = F.HOLDING, this.startPressAnimation(e2)));
    }
  }
  handleClick() {
    this.disabled || (this.state !== F.WAITING_FOR_CLICK ? this.state === F.INACTIVE && (this.startPressAnimation(), this.endPressAnimation()) : this.endPressAnimation());
  }
  handlePointercancel(e2) {
    this.shouldReactToEvent(e2) && this.endPressAnimation();
  }
  handleContextmenu() {
    this.disabled || (this.checkBoundsAfterContextMenu = true, this.endPressAnimation());
  }
  determineRippleSize() {
    const { height: e2, width: t2 } = this.getBoundingClientRect(), r2 = Math.max(e2, t2), o2 = Math.max(0.35 * r2, 75), a2 = Math.floor(0.2 * r2), i2 = Math.sqrt(t2 ** 2 + e2 ** 2) + 10;
    this.initialSize = a2, this.rippleScale = "" + (i2 + o2) / a2, this.rippleSize = `${a2}px`;
  }
  getNormalizedPointerEventCoords(e2) {
    const { scrollX: t2, scrollY: r2 } = window, { left: o2, top: a2 } = this.getBoundingClientRect(), i2 = t2 + o2, n2 = r2 + a2, { pageX: s2, pageY: l2 } = e2;
    return { x: s2 - i2, y: l2 - n2 };
  }
  getTranslationCoordinates(e2) {
    const { height: t2, width: r2 } = this.getBoundingClientRect(), o2 = { x: (r2 - this.initialSize) / 2, y: (t2 - this.initialSize) / 2 };
    let a2;
    return a2 = e2 instanceof PointerEvent ? this.getNormalizedPointerEventCoords(e2) : { x: r2 / 2, y: t2 / 2 }, a2 = { x: a2.x - this.initialSize / 2, y: a2.y - this.initialSize / 2 }, { startPoint: a2, endPoint: o2 };
  }
  startPressAnimation(e2) {
    if (!this.mdRoot) return;
    this.pressed = true, this.growAnimation?.cancel(), this.determineRippleSize();
    const { startPoint: t2, endPoint: r2 } = this.getTranslationCoordinates(e2), o2 = `${t2.x}px, ${t2.y}px`, a2 = `${r2.x}px, ${r2.y}px`;
    this.growAnimation = this.mdRoot.animate({ top: [0, 0], left: [0, 0], height: [this.rippleSize, this.rippleSize], width: [this.rippleSize, this.rippleSize], transform: [`translate(${o2}) scale(1)`, `translate(${a2}) scale(${this.rippleScale})`] }, { pseudoElement: "::after", duration: 450, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "forwards" });
  }
  async endPressAnimation() {
    this.rippleStartEvent = void 0, this.state = F.INACTIVE;
    const e2 = this.growAnimation;
    let t2 = 1 / 0;
    "number" == typeof e2?.currentTime ? t2 = e2.currentTime : e2?.currentTime && (t2 = e2.currentTime.to("ms").value), t2 >= 225 ? this.pressed = false : (await new Promise((e3) => {
      setTimeout(e3, 225 - t2);
    }), this.growAnimation === e2 && (this.pressed = false));
  }
  shouldReactToEvent(e2) {
    if (this.disabled || !e2.isPrimary) return false;
    if (this.rippleStartEvent && this.rippleStartEvent.pointerId !== e2.pointerId) return false;
    if ("pointerenter" === e2.type || "pointerleave" === e2.type) return !this.isTouch(e2);
    const t2 = 1 === e2.buttons;
    return this.isTouch(e2) || t2;
  }
  inBounds({ x: e2, y: t2 }) {
    const { top: r2, left: o2, bottom: a2, right: i2 } = this.getBoundingClientRect();
    return e2 >= o2 && e2 <= i2 && t2 >= r2 && t2 <= a2;
  }
  isTouch({ pointerType: e2 }) {
    return "touch" === e2;
  }
  async handleEvent(e2) {
    if (!N?.matches) switch (e2.type) {
      case "click":
        this.handleClick();
        break;
      case "contextmenu":
        this.handleContextmenu();
        break;
      case "pointercancel":
        this.handlePointercancel(e2);
        break;
      case "pointerdown":
        await this.handlePointerdown(e2);
        break;
      case "pointerenter":
        this.handlePointerenter(e2);
        break;
      case "pointerleave":
        this.handlePointerleave(e2);
        break;
      case "pointerup":
        this.handlePointerup(e2);
    }
  }
  onControlChange(e2, t2) {
    for (const r2 of M) e2?.removeEventListener(r2, this), t2?.addEventListener(r2, this);
  }
}
v([x({ type: Boolean, reflect: true })], q.prototype, "disabled", void 0), v([_()], q.prototype, "hovered", void 0), v([_()], q.prototype, "pressed", void 0), v([k(".surface")], q.prototype, "mdRoot", void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const j = a`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}.surface,:host{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:transparent}.surface::after,.surface::before{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color,var(--md-sys-color-on-surface,#1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side,var(--md-ripple-pressed-color,var(--md-sys-color-on-surface,#1d1b20)) max(100% - 70px,65%),transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color,var(--md-sys-color-on-surface,#1d1b20));opacity:var(--md-ripple-hover-opacity,.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity,.12);transition-duration:105ms}`;
let D = class extends q {
};
D.styles = [j], D = v([m("md-ripple")], D);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const H = ["ariaAtomic", "ariaAutoComplete", "ariaBusy", "ariaChecked", "ariaColCount", "ariaColIndex", "ariaColSpan", "ariaCurrent", "ariaDisabled", "ariaExpanded", "ariaHasPopup", "ariaHidden", "ariaInvalid", "ariaKeyShortcuts", "ariaLabel", "ariaLevel", "ariaLive", "ariaModal", "ariaMultiLine", "ariaMultiSelectable", "ariaOrientation", "ariaPlaceholder", "ariaPosInSet", "ariaPressed", "ariaReadOnly", "ariaRequired", "ariaRoleDescription", "ariaRowCount", "ariaRowIndex", "ariaRowSpan", "ariaSelected", "ariaSetSize", "ariaSort", "ariaValueMax", "ariaValueMin", "ariaValueNow", "ariaValueText"];
function U(e2) {
  return e2.replace("aria", "aria-").replace(/Elements?/g, "").toLowerCase();
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function G(e2) {
  for (const t2 of H) e2.createProperty(t2, { attribute: U(t2), reflect: true });
  e2.addInitializer((e3) => {
    const t2 = { hostConnected() {
      e3.setAttribute("role", "presentation");
    } };
    e3.addController(t2);
  });
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
H.map(U);
const V = Symbol("internals"), W = Symbol("privateInternals");
function Y(e2) {
  return class extends e2 {
    get [V]() {
      return this[W] || (this[W] = this.attachInternals()), this[W];
    }
  };
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function Z(e2) {
  e2.addInitializer((e3) => {
    const t2 = e3;
    t2.addEventListener("click", async (e4) => {
      const { type: r2, [V]: o2 } = t2, { form: a2 } = o2;
      a2 && "button" !== r2 && (await new Promise((e5) => {
        setTimeout(e5);
      }), e4.defaultPrevented || ("reset" !== r2 ? (a2.addEventListener("submit", (e5) => {
        Object.defineProperty(e5, "submitter", { configurable: true, enumerable: true, get: () => t2 });
      }, { capture: true, once: true }), o2.setFormValue(t2.value), a2.requestSubmit()) : a2.reset()));
    });
  });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let K = false;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const X = Y(r);
class J extends X {
  get name() {
    return this.getAttribute("name") ?? "";
  }
  set name(e2) {
    this.setAttribute("name", e2);
  }
  get form() {
    return this[V].form;
  }
  constructor() {
    super(), this.disabled = false, this.href = "", this.target = "", this.trailingIcon = false, this.hasIcon = false, this.type = "submit", this.value = "", this.handleActivationClick = (e2) => {
      (function(e3) {
        return e3.currentTarget === e3.target && e3.composedPath()[0] === e3.target && !e3.target.disabled && !function(e4) {
          const t2 = K;
          return t2 && (e4.preventDefault(), e4.stopImmediatePropagation()), async function() {
            K = true, await null, K = false;
          }(), t2;
        }(e3);
      })(e2) && this.buttonElement && (this.focus(), function(e3) {
        const t2 = new MouseEvent("click", { bubbles: true });
        e3.dispatchEvent(t2);
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
    const { ariaLabel: e2, ariaHasPopup: t2, ariaExpanded: r2 } = this;
    return o`<button id="button" class="button" ?disabled="${this.disabled}" aria-label="${e2 || n}" aria-haspopup="${t2 || n}" aria-expanded="${r2 || n}">${this.renderContent()}</button>`;
  }
  renderLink() {
    const { ariaLabel: e2, ariaHasPopup: t2, ariaExpanded: r2 } = this;
    return o`<a id="link" class="button" aria-label="${e2 || n}" aria-haspopup="${t2 || n}" aria-expanded="${r2 || n}" href="${this.href}" target="${this.target || n}">${this.renderContent()}</a>`;
  }
  renderContent() {
    const e2 = o`<slot name="icon" @slotchange="${this.handleSlotChange}"></slot>`;
    return o`<span class="touch"></span> ${this.trailingIcon ? n : e2} <span class="label"><slot></slot></span>${this.trailingIcon ? e2 : n}`;
  }
  handleSlotChange() {
    this.hasIcon = this.assignedIcons.length > 0;
  }
}
var Q;
G(J), Z(J), J.formAssociated = true, J.shadowRootOptions = { mode: "open", delegatesFocus: true }, v([x({ type: Boolean, reflect: true })], J.prototype, "disabled", void 0), v([x()], J.prototype, "href", void 0), v([x()], J.prototype, "target", void 0), v([x({ type: Boolean, attribute: "trailing-icon", reflect: true })], J.prototype, "trailingIcon", void 0), v([x({ type: Boolean, attribute: "has-icon", reflect: true })], J.prototype, "hasIcon", void 0), v([x()], J.prototype, "type", void 0), v([x({ reflect: true })], J.prototype, "value", void 0), v([k(".button")], J.prototype, "buttonElement", void 0), v([(Q = { slot: "icon", flatten: true }, (e2, t2) => {
  const { slot: r2, selector: o2 } = Q ?? {}, a2 = "slot" + (r2 ? `[name=${r2}]` : ":not([name])");
  return w(e2, t2, { get() {
    const e3 = this.renderRoot?.querySelector(a2), t3 = e3?.assignedElements(Q) ?? [];
    return void 0 === o2 ? t3 : t3.filter((e4) => e4.matches(o2));
  } });
})], J.prototype, "assignedIcons", void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class ee extends J {
  renderElevationOrOutline() {
    return o`<md-elevation part="elevation"></md-elevation>`;
  }
}
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const te = a`:host{--_container-color:var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation:var(--md-filled-button-container-elevation, 0);--_container-height:var(--md-filled-button-container-height, 40px);--_container-shadow-color:var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color:var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation:var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity:var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color:var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity:var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation:var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color:var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation:var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color:var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color:var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity:var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color:var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font:var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height:var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size:var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight:var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation:var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color:var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color:var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity:var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color:var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity:var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color:var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color:var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color:var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size:var(--md-filled-button-icon-size, 18px);--_pressed-icon-color:var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start:var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end:var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end:var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start:var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space:var(--md-filled-button-leading-space, 24px);--_trailing-space:var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space:var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space:var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space:var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space:var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}`, re = a`md-elevation{transition-duration:280ms}:host([disabled]) md-elevation{transition:none}md-elevation{--md-elevation-level:var(--_container-elevation);--md-elevation-shadow-color:var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level:var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level:var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level:var(--_pressed-container-elevation)}:host([disabled]) md-elevation{--md-elevation-level:var(--_disabled-container-elevation)}`, oe = a`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:0;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/ 2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:transparent;vertical-align:top;--md-ripple-hover-color:var(--_hover-state-layer-color);--md-ripple-pressed-color:var(--_pressed-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start:var(--_container-shape-start-start);--md-focus-ring-shape-start-end:var(--_container-shape-start-end);--md-focus-ring-shape-end-end:var(--_container-shape-end-end);--md-focus-ring-shape-end-start:var(--_container-shape-end-start)}:host([disabled]){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:0;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background-color:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}.label ::slotted(*),:is(.button,.label,.labelslot){text-overflow:inherit}:host([disabled]) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host([disabled]) .background{background-color:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors:active){.background{border:1px solid CanvasText}:host([disabled]){--_disabled-icon-color:GrayText;--_disabled-icon-opacity:1;--_disabled-container-opacity:1;--_disabled-label-text-color:GrayText;--_disabled-label-text-opacity:1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([disabled]) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}`;
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let ae = class extends ee {
};
ae.styles = [oe, re, te], ae = v([m("md-filled-button")], ae);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class ie extends J {
}
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const ne = a`:host{--_container-height:var(--md-text-button-container-height, 40px);--_disabled-label-text-color:var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity:var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color:var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color:var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color:var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity:var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color:var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font:var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height:var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size:var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight:var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color:var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color:var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity:var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color:var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity:var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color:var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color:var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color:var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size:var(--md-text-button-icon-size, 18px);--_pressed-icon-color:var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start:var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end:var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end:var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start:var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space:var(--md-text-button-leading-space, 12px);--_trailing-space:var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space:var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space:var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space:var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space:var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color:none;--_disabled-container-color:none;--_disabled-container-opacity:0}`;
let se = class extends ie {
};
se.styles = [oe, ne], se = v([m("md-text-button")], se);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = Symbol.for(""), ce = (e2) => {
  if (e2?.r === le) return e2?._$litStatic$;
}, de = (e2, ...t2) => ({ _$litStatic$: t2.reduce((t3, r2, o2) => t3 + ((e3) => {
  if (void 0 !== e3._$litStatic$) return e3._$litStatic$;
  throw new Error(`Value passed to 'literal' function must be a 'literal' result: ${e3}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(r2) + e2[o2 + 1], e2[0]), r: le }), he = /* @__PURE__ */ new Map(), ue = (pe = o, (e2, ...t2) => {
  const r2 = t2.length;
  let o2, a2;
  const i2 = [], n2 = [];
  let s2, l2 = 0, c2 = false;
  for (; l2 < r2; ) {
    for (s2 = e2[l2]; l2 < r2 && void 0 !== (a2 = t2[l2], o2 = ce(a2)); ) s2 += o2 + e2[++l2], c2 = true;
    l2 !== r2 && n2.push(a2), i2.push(s2), l2++;
  }
  if (l2 === r2 && i2.push(e2[r2]), c2) {
    const r3 = i2.join("$$lit$$");
    void 0 === (e2 = he.get(r3)) && (i2.raw = i2, he.set(r3, e2 = i2)), t2 = n2;
  }
  return pe(e2, ...t2);
});
var pe;
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function ve(e2, t2 = true) {
  return t2 && "rtl" === getComputedStyle(e2).getPropertyValue("direction").trim();
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const me = Y(r);
class be extends me {
  constructor() {
    super(...arguments), this.disabled = false, this.flipIconInRtl = false, this.href = "", this.target = "", this.ariaLabelSelected = "", this.toggle = false, this.selected = false, this.type = "submit", this.value = "", this.flipIcon = ve(this, this.flipIconInRtl);
  }
  get name() {
    return this.getAttribute("name") ?? "";
  }
  set name(e2) {
    this.setAttribute("name", e2);
  }
  get form() {
    return this[V].form;
  }
  get labels() {
    return this[V].labels;
  }
  willUpdate() {
    this.href && (this.disabled = false);
  }
  render() {
    const e2 = this.href ? de`div` : de`button`, { ariaLabel: t2, ariaHasPopup: r2, ariaExpanded: o2 } = this, a2 = t2 && this.ariaLabelSelected, i2 = this.toggle ? this.selected : n;
    let s2 = n;
    return this.href || (s2 = a2 && this.selected ? this.ariaLabelSelected : t2), ue`<${e2}
        class="icon-button ${B(this.getRenderClasses())}"
        id="button"
        aria-label="${s2 || n}"
        aria-haspopup="${!this.href && r2 || n}"
        aria-expanded="${!this.href && o2 || n}"
        aria-pressed="${i2}"
        ?disabled="${!this.href && this.disabled}"
        @click="${this.handleClick}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected ? n : this.renderIcon()}
        ${this.selected ? this.renderSelectedIcon() : n}
        ${this.renderTouchTarget()}
        ${this.href && this.renderLink()}
  </${e2}>`;
  }
  renderLink() {
    const { ariaLabel: e2 } = this;
    return o`
      <a
        class="link"
        id="link"
        href="${this.href}"
        target="${this.target || n}"
        aria-label="${e2 || n}"></a>
    `;
  }
  getRenderClasses() {
    return { "flip-icon": this.flipIcon, selected: this.toggle && this.selected };
  }
  renderIcon() {
    return o`<span class="icon"><slot></slot></span>`;
  }
  renderSelectedIcon() {
    return o`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`;
  }
  renderTouchTarget() {
    return o`<span class="touch"></span>`;
  }
  renderFocusRing() {
    return o`<md-focus-ring
      part="focus-ring"
      for=${this.href ? "link" : "button"}></md-focus-ring>`;
  }
  renderRipple() {
    return o`<md-ripple
      for=${this.href ? "link" : n}
      ?disabled="${!this.href && this.disabled}"></md-ripple>`;
  }
  connectedCallback() {
    this.flipIcon = ve(this, this.flipIconInRtl), super.connectedCallback();
  }
  async handleClick(e2) {
    await 0, !this.toggle || this.disabled || e2.defaultPrevented || (this.selected = !this.selected, this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true })), this.dispatchEvent(new Event("change", { bubbles: true })));
  }
}
G(be), Z(be), be.formAssociated = true, be.shadowRootOptions = { mode: "open", delegatesFocus: true }, v([x({ type: Boolean, reflect: true })], be.prototype, "disabled", void 0), v([x({ type: Boolean, attribute: "flip-icon-in-rtl" })], be.prototype, "flipIconInRtl", void 0), v([x()], be.prototype, "href", void 0), v([x()], be.prototype, "target", void 0), v([x({ attribute: "aria-label-selected" })], be.prototype, "ariaLabelSelected", void 0), v([x({ type: Boolean })], be.prototype, "toggle", void 0), v([x({ type: Boolean, reflect: true })], be.prototype, "selected", void 0), v([x()], be.prototype, "type", void 0), v([x({ reflect: true })], be.prototype, "value", void 0), v([_()], be.prototype, "flipIcon", void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const fe = a`:host{--_container-height:var(--md-outlined-icon-button-container-height, 40px);--_container-width:var(--md-outlined-icon-button-container-width, 40px);--_disabled-icon-color:var(--md-outlined-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity:var(--md-outlined-icon-button-disabled-icon-opacity, 0.38);--_disabled-selected-container-color:var(--md-outlined-icon-button-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity:var(--md-outlined-icon-button-disabled-selected-container-opacity, 0.12);--_hover-state-layer-opacity:var(--md-outlined-icon-button-hover-state-layer-opacity, 0.08);--_icon-size:var(--md-outlined-icon-button-icon-size, 24px);--_pressed-state-layer-opacity:var(--md-outlined-icon-button-pressed-state-layer-opacity, 0.12);--_selected-container-color:var(--md-outlined-icon-button-selected-container-color, var(--md-sys-color-inverse-surface, #322f35));--_selected-focus-icon-color:var(--md-outlined-icon-button-selected-focus-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-hover-icon-color:var(--md-outlined-icon-button-selected-hover-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-hover-state-layer-color:var(--md-outlined-icon-button-selected-hover-state-layer-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-icon-color:var(--md-outlined-icon-button-selected-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-pressed-icon-color:var(--md-outlined-icon-button-selected-pressed-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-pressed-state-layer-color:var(--md-outlined-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_disabled-outline-color:var(--md-outlined-icon-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity:var(--md-outlined-icon-button-disabled-outline-opacity, 0.12);--_focus-icon-color:var(--md-outlined-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color:var(--md-outlined-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color:var(--md-outlined-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_icon-color:var(--md-outlined-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color:var(--md-outlined-icon-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width:var(--md-outlined-icon-button-outline-width, 1px);--_pressed-icon-color:var(--md-outlined-icon-button-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-color:var(--md-outlined-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start:var(--md-outlined-icon-button-container-shape-start-start, var(--md-outlined-icon-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end:var(--md-outlined-icon-button-container-shape-start-end, var(--md-outlined-icon-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end:var(--md-outlined-icon-button-container-shape-end-end, var(--md-outlined-icon-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start:var(--md-outlined-icon-button-container-shape-end-start, var(--md-outlined-icon-button-container-shape, var(--md-sys-shape-corner-full, 9999px)))}.outlined{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color:var(--_hover-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-pressed-color:var(--_pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}.outlined::before{border-color:var(--_outline-color);border-width:var(--_outline-width)}.outlined:hover{color:var(--_hover-icon-color)}.outlined:focus{color:var(--_focus-icon-color)}.outlined:active{color:var(--_pressed-icon-color)}.outlined:disabled{color:var(--_disabled-icon-color)}.outlined:disabled::before{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}.outlined:disabled .icon{opacity:var(--_disabled-icon-opacity)}.outlined::before{block-size:100%;border-style:solid;border-radius:inherit;box-sizing:border-box;content:"";inline-size:100%;inset:0;pointer-events:none;position:absolute;z-index:-1}.outlined.selected::before{border-width:0}.selected{--md-ripple-hover-color:var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity:var(--_hover-state-layer-opacity);--md-ripple-pressed-color:var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity:var(--_pressed-state-layer-opacity)}.selected:not(:disabled){color:var(--_selected-icon-color)}.selected:not(:disabled):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled):active{color:var(--_selected-pressed-icon-color)}.selected:not(:disabled)::before{background-color:var(--_selected-container-color)}.selected:disabled::before{background-color:var(--_disabled-selected-container-color);opacity:var(--_disabled-selected-container-opacity)}@media(forced-colors:active){:host([disabled]){--_disabled-outline-opacity:1}.selected::before{border-color:CanvasText;border-width:var(--_outline-width)}.selected:disabled::before{border-color:GrayText;opacity:1}}`, ge = a`:host{display:inline-flex;outline:0;-webkit-tap-highlight-color:transparent;height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0,(48px - var(--_container-height))/2) max(0,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start:var(--_container-shape-start-start);--md-focus-ring-shape-start-end:var(--_container-shape-start-end);--md-focus-ring-shape-end-end:var(--_container-shape-end-end);--md-focus-ring-shape-end-start:var(--_container-shape-end-start)}:host([disabled]){pointer-events:none}.icon-button{place-items:center;background:0 0;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:0;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{height:100%;outline:0;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors:active){:host([disabled]){--_disabled-icon-opacity:1}}`;
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let ye = class extends be {
  getRenderClasses() {
    return { ...super.getRenderClasses(), outlined: true };
  }
};
ye.styles = [ge, fe], ye = v([m("md-outlined-icon-button")], ye);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class xe extends r {
  constructor() {
    super(...arguments), this.value = 0, this.max = 1, this.indeterminate = false, this.fourColor = false;
  }
  render() {
    const { ariaLabel: e2 } = this;
    return o`<div class="progress ${B(this.getRenderClasses())}" role="progressbar" aria-label="${e2 || n}" aria-valuemin="0" aria-valuemax="${this.max}" aria-valuenow="${this.indeterminate ? n : this.value}">${this.renderIndicator()}</div>`;
  }
  getRenderClasses() {
    return { indeterminate: this.indeterminate, "four-color": this.fourColor };
  }
}
G(xe), v([x({ type: Number })], xe.prototype, "value", void 0), v([x({ type: Number })], xe.prototype, "max", void 0), v([x({ type: Boolean })], xe.prototype, "indeterminate", void 0), v([x({ type: Boolean, attribute: "four-color" })], xe.prototype, "fourColor", void 0);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class _e extends xe {
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
const we = a`:host{--_active-indicator-color:var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width:var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color:var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color:var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color:var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color:var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size:var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.active-track,.circle,.left,.progress,.right,.spinner,.track,svg{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:transparent}.active-track{transition:stroke-dashoffset .5s cubic-bezier(0,0,.2,1);stroke:var(--_active-indicator-color)}.track{stroke:transparent}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1.568s}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(.4,0,.2,1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/ 100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) transparent transparent;animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(.4,0,.2,1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-.666s,0s}@media(forced-colors:active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}`;
let Ce = class extends _e {
};
Ce.styles = [we], Ce = v([m("md-circular-progress")], Ce);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class ke extends r {
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
const Ie = a`:host{font-size:var(--md-icon-size,24px);width:var(--md-icon-size,24px);height:var(--md-icon-size,24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font,Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}`;
let Se = class extends ke {
};
Se.styles = [Ie], Se = v([m("md-icon")], Se);
const _Te = class _Te extends r {
  constructor() {
    super();
    __privateAdd(this, _Te_instances);
    __privateAdd(this, _e2);
    __privateSet(this, _e2, "https://umontreal.libwizard.com/api/v1/submission"), this._vote = null, this.state = "loaded";
  }
  _onIconClick(e2) {
    this._vote = e2.target.selected ? e2.target.value : null;
  }
  render() {
    return o`<p id="survey-title" class="survey-title">Cette page vous a été utile?</p>${__privateMethod(this, _Te_instances, a_fn).call(this)} ${__privateMethod(this, _Te_instances, o_fn).call(this)}`;
  }
};
_e2 = new WeakMap();
_Te_instances = new WeakSet();
t_fn = async function(e2) {
  e2.preventDefault();
  const t2 = e2.submitter, r2 = new FormData(e2.currentTarget), o2 = this.renderRoot.querySelector(".btn-vote[selected]").value;
  return new Promise(async (e3, r3) => {
    this.state = _Te.STATES.SUBMITTING, t2.disabled = true, fetch(`${__privateGet(this, _e2)}/getguid`).then(async (t3) => {
      if (!t3.ok) return r3(new Error("Could not fetch service. response: ", t3));
      e3(await t3.json());
    }).catch((e4) => r3(`Could not GET /guid. Returned status: ${e4}`));
  }).then(async (e3) => {
    const t3 = new u(e3);
    t3.vote = o2, t3.comment = r2.get("comment"), await fetch(`${__privateGet(this, _e2)}/insertSubmission`, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(t3) }).catch((e4) => {
      throw new Error("Could not POST vote: ", e4);
    });
  }).then(() => {
    this.state = _Te.STATES.SUBMITTED;
  }).catch((e3) => {
    this.state = _Te.STATES.ERROR, console.error("Vote submission failed. ", e3);
  }).finally(() => {
    t2.disabled = false;
  });
};
r_fn = function() {
  this._vote = null, this.state = _Te.STATES.INITIAL;
};
o_fn = function() {
  return "submitted" === this.state ? o`<p>Merci! Nous avons reçu vos commentaires.</p>` : "error" === this.state ? o`<p>Mmm, quelque chose s'est mal passé. Nous tâcherons de réparer le problème.</p>` : void 0;
};
a_fn = function() {
  if ("loaded" === this.state) return o`<form aria-live="polite" @submit="${__privateMethod(this, _Te_instances, t_fn)}" @reset="${__privateMethod(this, _Te_instances, r_fn)}"><div role="radiogroup" aria-labelledby="survey-title" class="radio-group"><md-outlined-icon-button id="btn-vote-y" class="btn-vote" value="oui" name="vote" type="button" toggle aria-label="oui" @click="${this._onIconClick}" ?selected="${"oui" === this._vote}"><md-icon>${l('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M840-640q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14H280v-520l240-238q15-15 35.5-17.5T595-888q19 10 28 28t4 37l-45 183h258Zm-480 34v406h360l120-280v-80H480l54-220-174 174ZM160-120q-33 0-56.5-23.5T80-200v-360q0-33 23.5-56.5T160-640h120v80H160v360h120v80H160Zm200-80v-406 406Z"/></svg>')}</md-icon></md-outlined-icon-button><md-outlined-icon-button id="btn-vote-n" class="btn-vote" value="non" name="vote" type="button" toggle aria-label="non" @click="${this._onIconClick}" ?selected="${"non" === this._vote}"><md-icon>${l('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-320q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14h440v520L440-82q-15 15-35.5 17.5T365-72q-19-10-28-28t-4-37l45-183H120Zm480-34v-406H240L120-480v80h360l-54 220 174-174Zm200-486q33 0 56.5 23.5T880-760v360q0 33-23.5 56.5T800-320H680v-80h120v-360H680v-80h120Zm-200 80v406-406Z"/></svg>')}</md-icon></md-outlined-icon-button></div>${__privateMethod(this, _Te_instances, i_fn).call(this)} <a rel="" class="privacy-link" target="_blank" href="https://vie-privee.umontreal.ca/confidentialite/">Politique de confidentialité</a></form>`;
};
i_fn = function() {
  if (this._vote) return o`<p class="form-group"><label class="label width-full" for="survey-comment"><span>${"oui" === this._vote ? "Faites-nous savoir ce que nous faisons bien" : "Faites-nous savoir ce que nous pouvons faire mieux"}</span></label> <textarea class="form-control input-sm width-full" name="comment" id="survey-comment"></textarea></p><p class="write-us f6 color-fg-muted">Si vous avez besoin d'une réponse, <a href="https://bib.umontreal.ca/nous-joindre" target="_blank">veuillez plutôt nous écrire</a>.</p><div class="form-group-submit d-flex flex-justify-end flex-items-center mt-3"><md-text-button class="btn" type="reset">Annuler</md-text-button><md-filled-button class="btn btn-submit"><span>Envoyer<md-circular-progress class="progress" indeterminate></md-circular-progress></span></md-filled-button></div>`;
};
__publicField(_Te, "STATES", { INITIAL: "initial", SUBMITTING: "submitting", SUBMITTED: "submitted", ERROR: "error" });
__publicField(_Te, "properties", { state: { state: true }, _vote: { state: true } });
__publicField(_Te, "styles", [a`${s(":host{--md-sys-color-primary: rgb(64 95 144);--md-sys-color-surface-tint: rgb(64 95 144);--md-sys-color-on-primary: rgb(255 255 255);--md-sys-color-primary-container: rgb(214 227 255);--md-sys-color-on-primary-container: rgb(0 27 61);--md-sys-color-secondary: rgb(85 95 113);--md-sys-color-on-secondary: rgb(255 255 255);--md-sys-color-secondary-container: rgb(218 226 249);--md-sys-color-on-secondary-container: rgb(18 28 43);--md-sys-color-tertiary: rgb(144 74 69);--md-sys-color-on-tertiary: rgb(255 255 255);--md-sys-color-tertiary-container: rgb(255 218 214);--md-sys-color-on-tertiary-container: rgb(59 9 8);--md-sys-color-error: rgb(144 74 67);--md-sys-color-on-error: rgb(255 255 255);--md-sys-color-error-container: rgb(255 218 214);--md-sys-color-on-error-container: rgb(59 9 7);--md-sys-color-background: rgb(249 249 255);--md-sys-color-on-background: rgb(25 28 32);--md-sys-color-surface: rgb(249 249 255);--md-sys-color-on-surface: rgb(25 28 32);--md-sys-color-surface-variant: rgb(224 226 236);--md-sys-color-on-surface-variant: rgb(68 71 78);--md-sys-color-outline: rgb(116 119 127);--md-sys-color-outline-variant: rgb(196 198 207);--md-sys-color-shadow: rgb(0 0 0);--md-sys-color-scrim: rgb(0 0 0);--md-sys-color-inverse-surface: rgb(46 48 54);--md-sys-color-inverse-on-surface: rgb(240 240 247);--md-sys-color-inverse-primary: rgb(169 199 255);--md-sys-color-primary-fixed: rgb(214 227 255);--md-sys-color-on-primary-fixed: rgb(0 27 61);--md-sys-color-primary-fixed-dim: rgb(169 199 255);--md-sys-color-on-primary-fixed-variant: rgb(39 71 119);--md-sys-color-secondary-fixed: rgb(218 226 249);--md-sys-color-on-secondary-fixed: rgb(18 28 43);--md-sys-color-secondary-fixed-dim: rgb(189 199 220);--md-sys-color-on-secondary-fixed-variant: rgb(62 71 88);--md-sys-color-tertiary-fixed: rgb(255 218 214);--md-sys-color-on-tertiary-fixed: rgb(59 9 8);--md-sys-color-tertiary-fixed-dim: rgb(255 179 173);--md-sys-color-on-tertiary-fixed-variant: rgb(115 51 47);--md-sys-color-surface-dim: rgb(217 217 224);--md-sys-color-surface-bright: rgb(249 249 255);--md-sys-color-surface-container-lowest: rgb(255 255 255);--md-sys-color-surface-container-low: rgb(243 243 250);--md-sys-color-surface-container: rgb(237 237 244);--md-sys-color-surface-container-high: rgb(231 232 238);--md-sys-color-surface-container-highest: rgb(226 226 233);--md-extended-color-warning-color: rgb(100 97 22);--md-extended-color-warning-on-color: rgb(255 255 255);--md-extended-color-warning-color-container: rgb(236 230 141);--md-extended-color-warning-on-color-container: rgb(30 28 0)}:host,*{box-sizing:border-box}:host{--_size-large: calc(16 / 14 * 1em);--_size-small: .8125em ;--_leading-space: .5em;--bib-comp-retroaction-usager-size: var(--md-sys-typescale-body-small-size, inherit);display:inline-block;font-size:var(--bib-comp-retroaction-usager-size)}p{margin:0}textarea,input{font-family:inherit;font-size:inherit;line-height:inherit;padding:var(--_leading-space) var(--_leading-space)}.survey-title{margin-bottom:var(--_size-large);font-weight:var(--bib-comp-retroaction-usager-title-weight, var(--md-sys-typescale-title-medium-weight, 450))}.radio-group{display:flex;gap:.25em;margin-bottom:.5em}.btn-vote{--md-outlined-icon-button-container-height: var(--_icon-btn-size);--md-outlined-icon-button-container-width: var(--_icon-btn-size);--md-outlined-icon-button-selected-container-color: var(--md-sys-color-surface-tint);--md-outlined-icon-button-outline-width: 0}.form-group{margin:1em 0 .5em}.form-group .label{display:flex;margin-bottom:.325em}.form-group .label :first-child{flex-grow:1}.form-group-submit{margin-block-start:1em;display:flex;align-items:center;justify-content:flex-end;gap:.5em}.privacy-link{text-decoration:underline;font-size:var(--_size-small)}.width-full{width:100%}.write-us{color:#3d4248;font-size:var(--_size-small)}.btn{font-family:inherit}.btn-submit:not(disabled) .progress{display:none}.btn-submit span{display:inline-flex;gap:.5em;align-items:center}.progress{--md-circular-progress-size: 20px;--md-circular-progress-active-indicator-width: 16}")}`]);
let Te = _Te;
window.customElements.get("bib-retroaction-usager") || window.customElements.define("bib-retroaction-usager", Te), p("retroactionUsager", {});
export {
  Te as BibRetroactionUsager
};
//# sourceMappingURL=bib-retroaction-usager.js.map
