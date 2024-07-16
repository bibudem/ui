/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { u as t, f as e, s as r, i, w as s, x as a, T as n } from "./lit-element-Dj1nHH6C.js";
import { e as o, i as l, t as d } from "./directive-Ce1M5_Fy.js";
function c(t2, e2, r2, i2) {
  var s2, a2 = arguments.length, n2 = a2 < 3 ? e2 : null === i2 ? i2 = Object.getOwnPropertyDescriptor(e2, r2) : i2;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n2 = Reflect.decorate(t2, e2, r2, i2);
  else for (var o2 = t2.length - 1; o2 >= 0; o2--) (s2 = t2[o2]) && (n2 = (a2 < 3 ? s2(n2) : a2 > 3 ? s2(e2, r2, n2) : s2(e2, r2)) || n2);
  return a2 > 3 && n2 && Object.defineProperty(e2, r2, n2), n2;
}
"function" == typeof SuppressedError && SuppressedError;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const h = (t2) => (e2, r2) => {
  void 0 !== r2 ? r2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
}, u = { attribute: true, type: String, converter: t, reflect: false, hasChanged: e }, p = (t2 = u, e2, r2) => {
  const { kind: i2, metadata: s2 } = r2;
  let a2 = globalThis.litPropertyMetadata.get(s2);
  if (void 0 === a2 && globalThis.litPropertyMetadata.set(s2, a2 = /* @__PURE__ */ new Map()), a2.set(r2.name, t2), "accessor" === i2) {
    const { name: i3 } = r2;
    return { set(r3) {
      const s3 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(i3, s3, t2);
    }, init(e3) {
      return void 0 !== e3 && this.P(i3, void 0, t2), e3;
    } };
  }
  if ("setter" === i2) {
    const { name: i3 } = r2;
    return function(r3) {
      const s3 = this[i3];
      e2.call(this, r3), this.requestUpdate(i3, s3, t2);
    };
  }
  throw Error("Unsupported decorator location: " + i2);
};
function f(t2) {
  return (e2, r2) => "object" == typeof r2 ? p(t2, e2, r2) : ((t3, e3, r3) => {
    const i2 = e3.hasOwnProperty(r3);
    return e3.constructor.createProperty(r3, i2 ? { ...t3, wrapped: true } : t3), i2 ? Object.getOwnPropertyDescriptor(e3, r3) : void 0;
  })(t2, e2, r2);
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
}
function m(t2) {
  return f({ ...t2, state: true, attribute: false });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = (t2, e2, r2) => (r2.configurable = true, r2.enumerable = true, Reflect.decorate && "object" != typeof e2 && Object.defineProperty(t2, e2, r2), r2);
function b(t2, e2) {
  return (e3, r2, i2) => v(e3, r2, { get() {
    return ((e4) => e4.renderRoot?.querySelector(t2) ?? null)(this);
  } });
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const g = Symbol("attachableController");
let y;
y = new MutationObserver((t2) => {
  for (const e2 of t2) e2.target[g]?.hostConnected();
});
class C {
  get htmlFor() {
    return this.host.getAttribute("for");
  }
  set htmlFor(t2) {
    null === t2 ? this.host.removeAttribute("for") : this.host.setAttribute("for", t2);
  }
  get control() {
    return this.host.hasAttribute("for") ? this.htmlFor && this.host.isConnected ? this.host.getRootNode().querySelector(`#${this.htmlFor}`) : null : this.currentControl || this.host.parentElement;
  }
  set control(t2) {
    t2 ? this.attach(t2) : this.detach();
  }
  constructor(t2, e2) {
    this.host = t2, this.onControlChange = e2, this.currentControl = null, t2.addController(this), t2[g] = this, y?.observe(t2, { attributeFilter: ["for"] });
  }
  attach(t2) {
    t2 !== this.currentControl && (this.setCurrentControl(t2), this.host.removeAttribute("for"));
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
  setCurrentControl(t2) {
    this.onControlChange(this.currentControl, t2), this.currentControl = t2;
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const w = ["focusin", "focusout", "pointerdown"];
class x extends r {
  constructor() {
    super(...arguments), this.visible = false, this.inward = false, this.attachableController = new C(this, this.onControlChange.bind(this));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(t2) {
    this.attachableController.htmlFor = t2;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(t2) {
    this.attachableController.control = t2;
  }
  attach(t2) {
    this.attachableController.attach(t2);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  handleEvent(t2) {
    if (!t2[I]) {
      switch (t2.type) {
        default:
          return;
        case "focusin":
          this.visible = this.control?.matches(":focus-visible") ?? false;
          break;
        case "focusout":
        case "pointerdown":
          this.visible = false;
      }
      t2[I] = true;
    }
  }
  onControlChange(t2, e2) {
    for (const r2 of w) t2?.removeEventListener(r2, this), e2?.addEventListener(r2, this);
  }
  update(t2) {
    t2.has("visible") && this.dispatchEvent(new Event("visibility-changed")), super.update(t2);
  }
}
c([f({ type: Boolean, reflect: true })], x.prototype, "visible", void 0), c([f({ type: Boolean, reflect: true })], x.prototype, "inward", void 0);
const I = Symbol("handledByFocusRing"), S = i`:host{animation-delay:0s,calc(var(--md-focus-ring-duration,600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration,600ms)*.25),calc(var(--md-focus-ring-duration,600ms)*.75);animation-timing-function:cubic-bezier(.2,0,0,1);box-sizing:border-box;color:var(--md-focus-ring-color,var(--md-sys-color-secondary,#625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) + var(--md-focus-ring-outward-offset,2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) + var(--md-focus-ring-outward-offset,2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) + var(--md-focus-ring-outward-offset,2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) + var(--md-focus-ring-outward-offset,2px));inset:calc(-1*var(--md-focus-ring-outward-offset,2px));outline:var(--md-focus-ring-width,3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) - var(--md-focus-ring-inward-offset,0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) - var(--md-focus-ring-inward-offset,0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) - var(--md-focus-ring-inward-offset,0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) - var(--md-focus-ring-inward-offset,0px));border:var(--md-focus-ring-width,3px) solid currentColor;inset:var(--md-focus-ring-inward-offset,0)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width,8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width,8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width,8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width,8px)}}@media(prefers-reduced-motion){:host{animation:none}}`;
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let E = class extends x {
};
E.styles = [S], E = c([h("md-focus-ring")], E);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = o(class extends l {
  constructor(t2) {
    if (super(t2), t2.type !== d.ATTRIBUTE || "class" !== t2.name || t2.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((e2) => t2[e2]).join(" ") + " ";
  }
  update(t2, [e2]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== t2.strings && (this.nt = new Set(t2.strings.join(" ").split(/\s/).filter((t3) => "" !== t3)));
      for (const t3 in e2) e2[t3] && !this.nt?.has(t3) && this.st.add(t3);
      return this.render(e2);
    }
    const r2 = t2.element.classList;
    for (const t3 of this.st) t3 in e2 || (r2.remove(t3), this.st.delete(t3));
    for (const t3 in e2) {
      const i2 = !!e2[t3];
      i2 === this.st.has(t3) || this.nt?.has(t3) || (i2 ? (r2.add(t3), this.st.add(t3)) : (r2.remove(t3), this.st.delete(t3)));
    }
    return s;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var A;
!function(t2) {
  t2[t2.INACTIVE = 0] = "INACTIVE", t2[t2.TOUCH_DELAY = 1] = "TOUCH_DELAY", t2[t2.HOLDING = 2] = "HOLDING", t2[t2.WAITING_FOR_CLICK = 3] = "WAITING_FOR_CLICK";
}(A || (A = {}));
const P = ["click", "contextmenu", "pointercancel", "pointerdown", "pointerenter", "pointerleave", "pointerup"], T = window.matchMedia("(forced-colors: active)");
class R extends r {
  constructor() {
    super(...arguments), this.disabled = false, this.hovered = false, this.pressed = false, this.rippleSize = "", this.rippleScale = "", this.initialSize = 0, this.state = A.INACTIVE, this.checkBoundsAfterContextMenu = false, this.attachableController = new C(this, this.onControlChange.bind(this));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(t2) {
    this.attachableController.htmlFor = t2;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(t2) {
    this.attachableController.control = t2;
  }
  attach(t2) {
    this.attachableController.attach(t2);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("aria-hidden", "true");
  }
  render() {
    const t2 = { hovered: this.hovered, pressed: this.pressed };
    return a`<div class="surface ${k(t2)}"></div>`;
  }
  update(t2) {
    t2.has("disabled") && this.disabled && (this.hovered = false, this.pressed = false), super.update(t2);
  }
  handlePointerenter(t2) {
    this.shouldReactToEvent(t2) && (this.hovered = true);
  }
  handlePointerleave(t2) {
    this.shouldReactToEvent(t2) && (this.hovered = false, this.state !== A.INACTIVE && this.endPressAnimation());
  }
  handlePointerup(t2) {
    if (this.shouldReactToEvent(t2)) {
      if (this.state !== A.HOLDING) return this.state === A.TOUCH_DELAY ? (this.state = A.WAITING_FOR_CLICK, void this.startPressAnimation(this.rippleStartEvent)) : void 0;
      this.state = A.WAITING_FOR_CLICK;
    }
  }
  async handlePointerdown(t2) {
    if (this.shouldReactToEvent(t2)) {
      if (this.rippleStartEvent = t2, !this.isTouch(t2)) return this.state = A.WAITING_FOR_CLICK, void this.startPressAnimation(t2);
      this.checkBoundsAfterContextMenu && !this.inBounds(t2) || (this.checkBoundsAfterContextMenu = false, this.state = A.TOUCH_DELAY, await new Promise((t3) => {
        setTimeout(t3, 150);
      }), this.state === A.TOUCH_DELAY && (this.state = A.HOLDING, this.startPressAnimation(t2)));
    }
  }
  handleClick() {
    this.disabled || (this.state !== A.WAITING_FOR_CLICK ? this.state === A.INACTIVE && (this.startPressAnimation(), this.endPressAnimation()) : this.endPressAnimation());
  }
  handlePointercancel(t2) {
    this.shouldReactToEvent(t2) && this.endPressAnimation();
  }
  handleContextmenu() {
    this.disabled || (this.checkBoundsAfterContextMenu = true, this.endPressAnimation());
  }
  determineRippleSize() {
    const { height: t2, width: e2 } = this.getBoundingClientRect(), r2 = Math.max(t2, e2), i2 = Math.max(0.35 * r2, 75), s2 = Math.floor(0.2 * r2), a2 = Math.sqrt(e2 ** 2 + t2 ** 2) + 10;
    this.initialSize = s2, this.rippleScale = "" + (a2 + i2) / s2, this.rippleSize = `${s2}px`;
  }
  getNormalizedPointerEventCoords(t2) {
    const { scrollX: e2, scrollY: r2 } = window, { left: i2, top: s2 } = this.getBoundingClientRect(), a2 = e2 + i2, n2 = r2 + s2, { pageX: o2, pageY: l2 } = t2;
    return { x: o2 - a2, y: l2 - n2 };
  }
  getTranslationCoordinates(t2) {
    const { height: e2, width: r2 } = this.getBoundingClientRect(), i2 = { x: (r2 - this.initialSize) / 2, y: (e2 - this.initialSize) / 2 };
    let s2;
    return s2 = t2 instanceof PointerEvent ? this.getNormalizedPointerEventCoords(t2) : { x: r2 / 2, y: e2 / 2 }, s2 = { x: s2.x - this.initialSize / 2, y: s2.y - this.initialSize / 2 }, { startPoint: s2, endPoint: i2 };
  }
  startPressAnimation(t2) {
    if (!this.mdRoot) return;
    this.pressed = true, this.growAnimation?.cancel(), this.determineRippleSize();
    const { startPoint: e2, endPoint: r2 } = this.getTranslationCoordinates(t2), i2 = `${e2.x}px, ${e2.y}px`, s2 = `${r2.x}px, ${r2.y}px`;
    this.growAnimation = this.mdRoot.animate({ top: [0, 0], left: [0, 0], height: [this.rippleSize, this.rippleSize], width: [this.rippleSize, this.rippleSize], transform: [`translate(${i2}) scale(1)`, `translate(${s2}) scale(${this.rippleScale})`] }, { pseudoElement: "::after", duration: 450, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "forwards" });
  }
  async endPressAnimation() {
    this.rippleStartEvent = void 0, this.state = A.INACTIVE;
    const t2 = this.growAnimation;
    let e2 = 1 / 0;
    "number" == typeof t2?.currentTime ? e2 = t2.currentTime : t2?.currentTime && (e2 = t2.currentTime.to("ms").value), e2 >= 225 ? this.pressed = false : (await new Promise((t3) => {
      setTimeout(t3, 225 - e2);
    }), this.growAnimation === t2 && (this.pressed = false));
  }
  shouldReactToEvent(t2) {
    if (this.disabled || !t2.isPrimary) return false;
    if (this.rippleStartEvent && this.rippleStartEvent.pointerId !== t2.pointerId) return false;
    if ("pointerenter" === t2.type || "pointerleave" === t2.type) return !this.isTouch(t2);
    const e2 = 1 === t2.buttons;
    return this.isTouch(t2) || e2;
  }
  inBounds({ x: t2, y: e2 }) {
    const { top: r2, left: i2, bottom: s2, right: a2 } = this.getBoundingClientRect();
    return t2 >= i2 && t2 <= a2 && e2 >= r2 && e2 <= s2;
  }
  isTouch({ pointerType: t2 }) {
    return "touch" === t2;
  }
  async handleEvent(t2) {
    if (!T?.matches) switch (t2.type) {
      case "click":
        this.handleClick();
        break;
      case "contextmenu":
        this.handleContextmenu();
        break;
      case "pointercancel":
        this.handlePointercancel(t2);
        break;
      case "pointerdown":
        await this.handlePointerdown(t2);
        break;
      case "pointerenter":
        this.handlePointerenter(t2);
        break;
      case "pointerleave":
        this.handlePointerleave(t2);
        break;
      case "pointerup":
        this.handlePointerup(t2);
    }
  }
  onControlChange(t2, e2) {
    for (const r2 of P) t2?.removeEventListener(r2, this), e2?.addEventListener(r2, this);
  }
}
c([f({ type: Boolean, reflect: true })], R.prototype, "disabled", void 0), c([m()], R.prototype, "hovered", void 0), c([m()], R.prototype, "pressed", void 0), c([b(".surface")], R.prototype, "mdRoot", void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const $ = i`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}.surface,:host{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:transparent}.surface::after,.surface::before{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color,var(--md-sys-color-on-surface,#1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side,var(--md-ripple-pressed-color,var(--md-sys-color-on-surface,#1d1b20)) max(100% - 70px,65%),transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color,var(--md-sys-color-on-surface,#1d1b20));opacity:var(--md-ripple-hover-opacity,.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity,.12);transition-duration:105ms}`;
let _ = class extends R {
};
_.styles = [$], _ = c([h("md-ripple")], _);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = Symbol.for(""), z = (t2) => {
  if (t2?.r === L) return t2?._$litStatic$;
}, O = (t2, ...e2) => ({ _$litStatic$: e2.reduce((e3, r2, i2) => e3 + ((t3) => {
  if (void 0 !== t3._$litStatic$) return t3._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t3}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(r2) + t2[i2 + 1], t2[0]), r: L }), F = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ ((t2) => (e2, ...r2) => {
  const i2 = r2.length;
  let s2, a2;
  const n2 = [], o2 = [];
  let l2, d2 = 0, c2 = false;
  for (; d2 < i2; ) {
    for (l2 = e2[d2]; d2 < i2 && void 0 !== (a2 = r2[d2], s2 = z(a2)); ) l2 += s2 + e2[++d2], c2 = true;
    d2 !== i2 && o2.push(a2), n2.push(l2), d2++;
  }
  if (d2 === i2 && n2.push(e2[i2]), c2) {
    const t3 = n2.join("$$lit$$");
    void 0 === (e2 = F.get(t3)) && (n2.raw = n2, F.set(t3, e2 = n2)), r2 = o2;
  }
  return t2(e2, ...r2);
})(a), M = ["ariaAtomic", "ariaAutoComplete", "ariaBusy", "ariaChecked", "ariaColCount", "ariaColIndex", "ariaColSpan", "ariaCurrent", "ariaDisabled", "ariaExpanded", "ariaHasPopup", "ariaHidden", "ariaInvalid", "ariaKeyShortcuts", "ariaLabel", "ariaLevel", "ariaLive", "ariaModal", "ariaMultiLine", "ariaMultiSelectable", "ariaOrientation", "ariaPlaceholder", "ariaPosInSet", "ariaPressed", "ariaReadOnly", "ariaRequired", "ariaRoleDescription", "ariaRowCount", "ariaRowIndex", "ariaRowSpan", "ariaSelected", "ariaSetSize", "ariaSort", "ariaValueMax", "ariaValueMin", "ariaValueNow", "ariaValueText"];
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function N(t2) {
  return t2.replace("aria", "aria-").replace(/Elements?/g, "").toLowerCase();
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function j(t2) {
  for (const e2 of M) t2.createProperty(e2, { attribute: N(e2), reflect: true });
  t2.addInitializer((t3) => {
    const e2 = { hostConnected() {
      t3.setAttribute("role", "presentation");
    } };
    t3.addController(e2);
  });
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
M.map(N);
const D = Symbol("internals"), V = Symbol("privateInternals");
function H(t2) {
  return class extends t2 {
    get [D]() {
      return this[V] || (this[V] = this.attachInternals()), this[V];
    }
  };
}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function U(t2) {
  t2.addInitializer((t3) => {
    const e2 = t3;
    e2.addEventListener("click", async (t4) => {
      const { type: r2, [D]: i2 } = e2, { form: s2 } = i2;
      s2 && "button" !== r2 && (await new Promise((t5) => {
        setTimeout(t5);
      }), t4.defaultPrevented || ("reset" !== r2 ? (s2.addEventListener("submit", (t5) => {
        Object.defineProperty(t5, "submitter", { configurable: true, enumerable: true, get: () => e2 });
      }, { capture: true, once: true }), i2.setFormValue(e2.value), s2.requestSubmit()) : s2.reset()));
    });
  });
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function G(t2, e2 = true) {
  return e2 && "rtl" === getComputedStyle(t2).getPropertyValue("direction").trim();
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const q = H(r);
class K extends q {
  constructor() {
    super(...arguments), this.disabled = false, this.flipIconInRtl = false, this.href = "", this.target = "", this.ariaLabelSelected = "", this.toggle = false, this.selected = false, this.type = "submit", this.value = "", this.flipIcon = G(this, this.flipIconInRtl);
  }
  get name() {
    return this.getAttribute("name") ?? "";
  }
  set name(t2) {
    this.setAttribute("name", t2);
  }
  get form() {
    return this[D].form;
  }
  get labels() {
    return this[D].labels;
  }
  willUpdate() {
    this.href && (this.disabled = false);
  }
  render() {
    const t2 = this.href ? O`div` : O`button`, { ariaLabel: e2, ariaHasPopup: r2, ariaExpanded: i2 } = this, s2 = e2 && this.ariaLabelSelected, a2 = this.toggle ? this.selected : n;
    let o2 = n;
    return this.href || (o2 = s2 && this.selected ? this.ariaLabelSelected : e2), B`<${t2}
        class="icon-button ${k(this.getRenderClasses())}"
        id="button"
        aria-label="${o2 || n}"
        aria-haspopup="${!this.href && r2 || n}"
        aria-expanded="${!this.href && i2 || n}"
        aria-pressed="${a2}"
        ?disabled="${!this.href && this.disabled}"
        @click="${this.handleClick}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected ? n : this.renderIcon()}
        ${this.selected ? this.renderSelectedIcon() : n}
        ${this.renderTouchTarget()}
        ${this.href && this.renderLink()}
  </${t2}>`;
  }
  renderLink() {
    const { ariaLabel: t2 } = this;
    return a`
      <a
        class="link"
        id="link"
        href="${this.href}"
        target="${this.target || n}"
        aria-label="${t2 || n}"></a>
    `;
  }
  getRenderClasses() {
    return { "flip-icon": this.flipIcon, selected: this.toggle && this.selected };
  }
  renderIcon() {
    return a`<span class="icon"><slot></slot></span>`;
  }
  renderSelectedIcon() {
    return a`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`;
  }
  renderTouchTarget() {
    return a`<span class="touch"></span>`;
  }
  renderFocusRing() {
    return a`<md-focus-ring
      part="focus-ring"
      for=${this.href ? "link" : "button"}></md-focus-ring>`;
  }
  renderRipple() {
    return a`<md-ripple
      for=${this.href ? "link" : n}
      ?disabled="${!this.href && this.disabled}"></md-ripple>`;
  }
  connectedCallback() {
    this.flipIcon = G(this, this.flipIconInRtl), super.connectedCallback();
  }
  async handleClick(t2) {
    await 0, !this.toggle || this.disabled || t2.defaultPrevented || (this.selected = !this.selected, this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true })), this.dispatchEvent(new Event("change", { bubbles: true })));
  }
}
j(K), U(K), K.formAssociated = true, K.shadowRootOptions = { mode: "open", delegatesFocus: true }, c([f({ type: Boolean, reflect: true })], K.prototype, "disabled", void 0), c([f({ type: Boolean, attribute: "flip-icon-in-rtl" })], K.prototype, "flipIconInRtl", void 0), c([f()], K.prototype, "href", void 0), c([f()], K.prototype, "target", void 0), c([f({ attribute: "aria-label-selected" })], K.prototype, "ariaLabelSelected", void 0), c([f({ type: Boolean })], K.prototype, "toggle", void 0), c([f({ type: Boolean, reflect: true })], K.prototype, "selected", void 0), c([f()], K.prototype, "type", void 0), c([f({ reflect: true })], K.prototype, "value", void 0), c([m()], K.prototype, "flipIcon", void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Y = i`:host{display:inline-flex;outline:0;-webkit-tap-highlight-color:transparent;height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0,(48px - var(--_container-height))/2) max(0,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start:var(--_container-shape-start-start);--md-focus-ring-shape-start-end:var(--_container-shape-start-end);--md-focus-ring-shape-end-end:var(--_container-shape-end-end);--md-focus-ring-shape-end-start:var(--_container-shape-end-start)}:host([disabled]){pointer-events:none}.icon-button{place-items:center;background:0 0;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:0;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{height:100%;outline:0;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors:active){:host([disabled]){--_disabled-icon-opacity:1}}`;
export {
  K as I,
  c as _,
  U as a,
  b,
  k as c,
  v as e,
  D as i,
  H as m,
  f as n,
  j as r,
  Y as s,
  h as t
};
//# sourceMappingURL=shared-styles-hMR2zzGE.js.map
