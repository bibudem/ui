/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.2.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = globalThis, t = e.ShadowRoot && (void 0 === e.ShadyCSS || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, i = Symbol(), s = /* @__PURE__ */ new WeakMap();
class n {
  constructor(e2, t2, s2) {
    if (this._$cssResult$ = true, s2 !== i)
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e2, this._strings = t2;
  }
  get styleSheet() {
    let e2 = this._styleSheet;
    const i2 = this._strings;
    if (t && void 0 === e2) {
      const t2 = void 0 !== i2 && 1 === i2.length;
      t2 && (e2 = s.get(i2)), void 0 === e2 && ((this._styleSheet = e2 = new CSSStyleSheet()).replaceSync(this.cssText), t2 && s.set(i2, e2));
    }
    return e2;
  }
  toString() {
    return this.cssText;
  }
}
const r = (e2) => new n("string" == typeof e2 ? e2 : String(e2), void 0, i), o = (e2, ...t2) => {
  const s2 = 1 === e2.length ? e2[0] : t2.reduce((t3, i2, s3) => t3 + ((e3) => {
    if (true === e3._$cssResult$)
      return e3.cssText;
    if ("number" == typeof e3)
      return e3;
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e3}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`);
  })(i2) + e2[s3 + 1], e2[0]);
  return new n(s2, e2, i);
}, a = t ? (e2) => e2 : (e2) => e2 instanceof CSSStyleSheet ? ((e3) => {
  let t2 = "";
  for (const i2 of e3.cssRules)
    t2 += i2.cssText;
  return r(t2);
})(e2) : e2, { is: l, defineProperty: d, getOwnPropertyDescriptor: h, getOwnPropertyNames: c, getOwnPropertySymbols: p, getPrototypeOf: u } = Object, m = globalThis;
let _;
const f = m.trustedTypes, g = f ? f.emptyScript : "", y = m.reactiveElementPolyfillSupportDevMode;
{
  const e2 = m.litIssuedWarnings ??= /* @__PURE__ */ new Set();
  _ = (t2, i2) => {
    i2 += ` See https://lit.dev/msg/${t2} for more information.`, e2.has(i2) || (console.warn(i2), e2.add(i2));
  }, _("dev-mode", "Lit is in dev mode. Not recommended for production!"), m.ShadyDOM?.inUse && void 0 === y && _("polyfill-support-missing", "Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.");
}
const v = (e2, t2) => e2, $ = { toAttribute(e2, t2) {
  switch (t2) {
    case Boolean:
      e2 = e2 ? g : null;
      break;
    case Object:
    case Array:
      e2 = null == e2 ? e2 : JSON.stringify(e2);
  }
  return e2;
}, fromAttribute(e2, t2) {
  let i2 = e2;
  switch (t2) {
    case Boolean:
      i2 = null !== e2;
      break;
    case Number:
      i2 = null === e2 ? null : Number(e2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(e2);
      } catch (e3) {
        i2 = null;
      }
  }
  return i2;
} }, b = (e2, t2) => !l(e2, t2), w = { attribute: true, type: String, converter: $, reflect: false, hasChanged: b };
Symbol.metadata ??= Symbol("metadata"), m.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class S extends HTMLElement {
  static addInitializer(e2) {
    this.__prepare(), (this._initializers ??= []).push(e2);
  }
  static get observedAttributes() {
    return this.finalize(), this.__attributeToPropertyMap && [...this.__attributeToPropertyMap.keys()];
  }
  static createProperty(e2, t2 = w) {
    if (t2.state && (t2.attribute = false), this.__prepare(), this.elementProperties.set(e2, t2), !t2.noAccessor) {
      const i2 = Symbol.for(`${String(e2)} (@property() cache)`), s2 = this.getPropertyDescriptor(e2, i2, t2);
      void 0 !== s2 && d(this.prototype, e2, s2);
    }
  }
  static getPropertyDescriptor(e2, t2, i2) {
    const { get: s2, set: n2 } = h(this.prototype, e2) ?? { get() {
      return this[t2];
    }, set(e3) {
      this[t2] = e3;
    } };
    if (null == s2) {
      if ("value" in (h(this.prototype, e2) ?? {}))
        throw new Error(`Field ${JSON.stringify(String(e2))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);
      _("reactive-property-without-getter", `Field ${JSON.stringify(String(e2))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`);
    }
    return { get() {
      return s2?.call(this);
    }, set(t3) {
      const r2 = s2?.call(this);
      n2.call(this, t3), this.requestUpdate(e2, r2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(e2) {
    return this.elementProperties.get(e2) ?? w;
  }
  static __prepare() {
    if (this.hasOwnProperty(v("elementProperties")))
      return;
    const e2 = u(this);
    e2.finalize(), void 0 !== e2._initializers && (this._initializers = [...e2._initializers]), this.elementProperties = new Map(e2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(v("finalized")))
      return;
    if (this.finalized = true, this.__prepare(), this.hasOwnProperty(v("properties"))) {
      const e3 = this.properties, t2 = [...c(e3), ...p(e3)];
      for (const i2 of t2)
        this.createProperty(i2, e3[i2]);
    }
    const e2 = this[Symbol.metadata];
    if (null !== e2) {
      const t2 = litPropertyMetadata.get(e2);
      if (void 0 !== t2)
        for (const [e3, i2] of t2)
          this.elementProperties.set(e3, i2);
    }
    this.__attributeToPropertyMap = /* @__PURE__ */ new Map();
    for (const [e3, t2] of this.elementProperties) {
      const i2 = this.__attributeNameForProperty(e3, t2);
      void 0 !== i2 && this.__attributeToPropertyMap.set(i2, e3);
    }
    this.elementStyles = this.finalizeStyles(this.styles), this.hasOwnProperty("createProperty") && _("no-override-create-property", "Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators"), this.hasOwnProperty("getPropertyDescriptor") && _("no-override-get-property-descriptor", "Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators");
  }
  static finalizeStyles(e2) {
    const t2 = [];
    if (Array.isArray(e2)) {
      const i2 = new Set(e2.flat(1 / 0).reverse());
      for (const e3 of i2)
        t2.unshift(a(e3));
    } else
      void 0 !== e2 && t2.push(a(e2));
    return t2;
  }
  static __attributeNameForProperty(e2, t2) {
    const i2 = t2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof e2 ? e2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this.__instanceProperties = void 0, this.isUpdatePending = false, this.hasUpdated = false, this.__reflectingProperty = null, this.__initialize();
  }
  __initialize() {
    this.__updatePromise = new Promise((e2) => this.enableUpdating = e2), this._$changedProperties = /* @__PURE__ */ new Map(), this.__saveInstanceProperties(), this.requestUpdate(), this.constructor._initializers?.forEach((e2) => e2(this));
  }
  addController(e2) {
    (this.__controllers ??= /* @__PURE__ */ new Set()).add(e2), void 0 !== this.renderRoot && this.isConnected && e2.hostConnected?.();
  }
  removeController(e2) {
    this.__controllers?.delete(e2);
  }
  __saveInstanceProperties() {
    const e2 = /* @__PURE__ */ new Map(), t2 = this.constructor.elementProperties;
    for (const i2 of t2.keys())
      this.hasOwnProperty(i2) && (e2.set(i2, this[i2]), delete this[i2]);
    e2.size > 0 && (this.__instanceProperties = e2);
  }
  createRenderRoot() {
    const i2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ((i3, s2) => {
      if (t)
        i3.adoptedStyleSheets = s2.map((e2) => e2 instanceof CSSStyleSheet ? e2 : e2.styleSheet);
      else
        for (const t2 of s2) {
          const s3 = document.createElement("style"), n2 = e.litNonce;
          void 0 !== n2 && s3.setAttribute("nonce", n2), s3.textContent = t2.cssText, i3.appendChild(s3);
        }
    })(i2, this.constructor.elementStyles), i2;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this.__controllers?.forEach((e2) => e2.hostConnected?.());
  }
  enableUpdating(e2) {
  }
  disconnectedCallback() {
    this.__controllers?.forEach((e2) => e2.hostDisconnected?.());
  }
  attributeChangedCallback(e2, t2, i2) {
    this._$attributeToProperty(e2, i2);
  }
  __propertyToAttribute(e2, t2) {
    const i2 = this.constructor.elementProperties.get(e2), s2 = this.constructor.__attributeNameForProperty(e2, i2);
    if (void 0 !== s2 && true === i2.reflect) {
      const n2 = (void 0 !== i2.converter?.toAttribute ? i2.converter : $).toAttribute(t2, i2.type);
      this.constructor.enabledWarnings.includes("migration") && void 0 === n2 && _("undefined-attribute-value", `The attribute value for the ${e2} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`), this.__reflectingProperty = e2, null == n2 ? this.removeAttribute(s2) : this.setAttribute(s2, n2), this.__reflectingProperty = null;
    }
  }
  _$attributeToProperty(e2, t2) {
    const i2 = this.constructor, s2 = i2.__attributeToPropertyMap.get(e2);
    if (void 0 !== s2 && this.__reflectingProperty !== s2) {
      const e3 = i2.getPropertyOptions(s2), n2 = "function" == typeof e3.converter ? { fromAttribute: e3.converter } : void 0 !== e3.converter?.fromAttribute ? e3.converter : $;
      this.__reflectingProperty = s2, this[s2] = n2.fromAttribute(t2, e3.type), this.__reflectingProperty = null;
    }
  }
  requestUpdate(e2, t2, i2) {
    if (void 0 !== e2) {
      if (e2 instanceof Event && _("", "The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()"), i2 ??= this.constructor.getPropertyOptions(e2), !(i2.hasChanged ?? b)(this[e2], t2))
        return;
      this._$changeProperty(e2, t2, i2);
    }
    false === this.isUpdatePending && (this.__updatePromise = this.__enqueueUpdate());
  }
  _$changeProperty(e2, t2, i2) {
    this._$changedProperties.has(e2) || this._$changedProperties.set(e2, t2), true === i2.reflect && this.__reflectingProperty !== e2 && (this.__reflectingProperties ??= /* @__PURE__ */ new Set()).add(e2);
  }
  async __enqueueUpdate() {
    this.isUpdatePending = true;
    try {
      await this.__updatePromise;
    } catch (e3) {
      Promise.reject(e3);
    }
    const e2 = this.scheduleUpdate();
    return null != e2 && await e2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    const e2 = this.performUpdate();
    return this.constructor.enabledWarnings.includes("async-perform-update") && "function" == typeof e2?.then && _("async-perform-update", `Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`), e2;
  }
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    var e2;
    if (e2 = { kind: "update" }, m.emitLitDebugLogEvents && m.dispatchEvent(new CustomEvent("lit-debug", { detail: e2 })), !this.hasUpdated) {
      this.renderRoot ??= this.createRenderRoot();
      {
        const e4 = [...this.constructor.elementProperties.keys()].filter((e5) => this.hasOwnProperty(e5) && e5 in u(this));
        if (e4.length)
          throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${e4.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`);
      }
      if (this.__instanceProperties) {
        for (const [e4, t3] of this.__instanceProperties)
          this[e4] = t3;
        this.__instanceProperties = void 0;
      }
      const e3 = this.constructor.elementProperties;
      if (e3.size > 0)
        for (const [t3, i3] of e3)
          true !== i3.wrapped || this._$changedProperties.has(t3) || void 0 === this[t3] || this._$changeProperty(t3, this[t3], i3);
    }
    let t2 = false;
    const i2 = this._$changedProperties;
    try {
      t2 = this.shouldUpdate(i2), t2 ? (this.willUpdate(i2), this.__controllers?.forEach((e3) => e3.hostUpdate?.()), this.update(i2)) : this.__markUpdated();
    } catch (e3) {
      throw t2 = false, this.__markUpdated(), e3;
    }
    t2 && this._$didUpdate(i2);
  }
  willUpdate(e2) {
  }
  _$didUpdate(e2) {
    this.__controllers?.forEach((e3) => e3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(e2)), this.updated(e2), this.isUpdatePending && this.constructor.enabledWarnings.includes("change-in-update") && _("change-in-update", `Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`);
  }
  __markUpdated() {
    this._$changedProperties = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this.__updatePromise;
  }
  shouldUpdate(e2) {
    return true;
  }
  update(e2) {
    this.__reflectingProperties &&= this.__reflectingProperties.forEach((e3) => this.__propertyToAttribute(e3, this[e3])), this.__markUpdated();
  }
  updated(e2) {
  }
  firstUpdated(e2) {
  }
}
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[v("elementProperties")] = /* @__PURE__ */ new Map(), S[v("finalized")] = /* @__PURE__ */ new Map(), y?.({ ReactiveElement: S });
{
  S.enabledWarnings = ["change-in-update", "async-perform-update"];
  const e2 = function(e3) {
    e3.hasOwnProperty(v("enabledWarnings")) || (e3.enabledWarnings = e3.enabledWarnings.slice());
  };
  S.enableWarning = function(t2) {
    e2(this), this.enabledWarnings.includes(t2) || this.enabledWarnings.push(t2);
  }, S.disableWarning = function(t2) {
    e2(this);
    const i2 = this.enabledWarnings.indexOf(t2);
    i2 >= 0 && this.enabledWarnings.splice(i2, 1);
  };
}
(m.reactiveElementVersions ??= []).push("2.0.4"), m.reactiveElementVersions.length > 1 && _("multiple-versions", "Multiple versions of Lit loaded. Loading multiple versions is not recommended.");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, x = (e2) => {
  P.emitLitDebugLogEvents && P.dispatchEvent(new CustomEvent("lit-debug", { detail: e2 }));
};
let T, C = 0;
P.litIssuedWarnings ??= /* @__PURE__ */ new Set(), T = (e2, t2) => {
  t2 += e2 ? ` See https://lit.dev/msg/${e2} for more information.` : "", P.litIssuedWarnings.has(t2) || (console.warn(t2), P.litIssuedWarnings.add(t2));
}, T("dev-mode", "Lit is in dev mode. Not recommended for production!");
const N = P.ShadyDOM?.inUse && true === P.ShadyDOM?.noPatch ? P.ShadyDOM.wrap : (e2) => e2, E = P.trustedTypes, k = E ? E.createPolicy("lit-html", { createHTML: (e2) => e2 }) : void 0, U = (e2) => e2, V = (e2, t2, i2) => U, O = (e2, t2, i2) => te(e2, t2, i2), z = "$lit$", M = `lit$${Math.random().toFixed(9).slice(2)}$`, A = "?" + M, L = `<${A}>`, R = document, D = () => R.createComment(""), W = (e2) => null === e2 || "object" != typeof e2 && "function" != typeof e2, I = Array.isArray, F = "[ 	\n\f\r]", H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, j = /-->/g, q = />/g, B = new RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), J = /'/g, Y = /"/g, Z = /^(?:script|style|textarea|title)$/i, X = (e2, ...t2) => (e2.some((e3) => void 0 === e3) && console.warn("Some template strings are undefined.\nThis is probably caused by illegal octal escape sequences."), t2.some((e3) => e3?._$litStatic$) && T("", "Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.\nPlease use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions"), { _$litType$: 1, strings: e2, values: t2 }), G = Symbol.for("lit-noChange"), K = Symbol.for("lit-nothing"), Q = /* @__PURE__ */ new WeakMap(), ee = R.createTreeWalker(R, 129);
let te = V;
function ie(e2, t2) {
  if (!Array.isArray(e2) || !e2.hasOwnProperty("raw")) {
    let e3 = "invalid template strings array";
    throw e3 = "\n          Internal Error: expected template strings to be an array\n          with a 'raw' field. Faking a template strings array by\n          calling html or svg like an ordinary function is effectively\n          the same as calling unsafeHtml and can lead to major security\n          issues, e.g. opening your code up to XSS attacks.\n          If you're using the html or svg tagged template functions normally\n          and still seeing this error, please file a bug at\n          https://github.com/lit/lit/issues/new?template=bug_report.md\n          and include information about your build tooling, if any.\n        ".trim().replace(/\n */g, "\n"), new Error(e3);
  }
  return void 0 !== k ? k.createHTML(t2) : t2;
}
class se {
  constructor({ strings: e2, _$litType$: t2 }, i2) {
    let s2;
    this.parts = [];
    let n2 = 0, r2 = 0;
    const o2 = e2.length - 1, a2 = this.parts, [l2, d2] = ((e3, t3) => {
      const i3 = e3.length - 1, s3 = [];
      let n3, r3 = 2 === t3 ? "<svg>" : "", o3 = H;
      for (let t4 = 0; t4 < i3; t4++) {
        const i4 = e3[t4];
        let a3, l3, d3 = -1, h2 = 0;
        for (; h2 < i4.length && (o3.lastIndex = h2, l3 = o3.exec(i4), null !== l3); )
          if (h2 = o3.lastIndex, o3 === H) {
            if ("!--" === l3[1])
              o3 = j;
            else if (void 0 !== l3[1])
              o3 = q;
            else if (void 0 !== l3[2])
              Z.test(l3[2]) && (n3 = new RegExp(`</${l3[2]}`, "g")), o3 = B;
            else if (void 0 !== l3[3])
              throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions");
          } else
            o3 === B ? ">" === l3[0] ? (o3 = n3 ?? H, d3 = -1) : void 0 === l3[1] ? d3 = -2 : (d3 = o3.lastIndex - l3[2].length, a3 = l3[1], o3 = void 0 === l3[3] ? B : '"' === l3[3] ? Y : J) : o3 === Y || o3 === J ? o3 = B : o3 === j || o3 === q ? o3 = H : (o3 = B, n3 = void 0);
        console.assert(-1 === d3 || o3 === B || o3 === J || o3 === Y, "unexpected parse state B");
        const c2 = o3 === B && e3[t4 + 1].startsWith("/>") ? " " : "";
        r3 += o3 === H ? i4 + L : d3 >= 0 ? (s3.push(a3), i4.slice(0, d3) + z + i4.slice(d3) + M + c2) : i4 + M + (-2 === d3 ? t4 : c2);
      }
      return [ie(e3, r3 + (e3[i3] || "<?>") + (2 === t3 ? "</svg>" : "")), s3];
    })(e2, t2);
    if (this.el = se.createElement(l2, i2), ee.currentNode = this.el.content, 2 === t2) {
      const e3 = this.el.content.firstChild;
      e3.replaceWith(...e3.childNodes);
    }
    for (; null !== (s2 = ee.nextNode()) && a2.length < o2; ) {
      if (1 === s2.nodeType) {
        {
          const e3 = s2.localName;
          if (/^(?:textarea|template)$/i.test(e3) && s2.innerHTML.includes(M)) {
            const t3 = `Expressions are not supported inside \`${e3}\` elements. See https://lit.dev/msg/expression-in-${e3} for more information.`;
            if ("template" === e3)
              throw new Error(t3);
            T("", t3);
          }
        }
        if (s2.hasAttributes())
          for (const e3 of s2.getAttributeNames())
            if (e3.endsWith(z)) {
              const t3 = d2[r2++], i3 = s2.getAttribute(e3).split(M), o3 = /([.?@])?(.*)/.exec(t3);
              a2.push({ type: 1, index: n2, name: o3[2], strings: i3, ctor: "." === o3[1] ? le : "?" === o3[1] ? de : "@" === o3[1] ? he : ae }), s2.removeAttribute(e3);
            } else
              e3.startsWith(M) && (a2.push({ type: 6, index: n2 }), s2.removeAttribute(e3));
        if (Z.test(s2.tagName)) {
          const e3 = s2.textContent.split(M), t3 = e3.length - 1;
          if (t3 > 0) {
            s2.textContent = E ? E.emptyScript : "";
            for (let i3 = 0; i3 < t3; i3++)
              s2.append(e3[i3], D()), ee.nextNode(), a2.push({ type: 2, index: ++n2 });
            s2.append(e3[t3], D());
          }
        }
      } else if (8 === s2.nodeType)
        if (s2.data === A)
          a2.push({ type: 2, index: n2 });
        else {
          let e3 = -1;
          for (; -1 !== (e3 = s2.data.indexOf(M, e3 + 1)); )
            a2.push({ type: 7, index: n2 }), e3 += M.length - 1;
        }
      n2++;
    }
    if (d2.length !== r2)
      throw new Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`' + e2.join("${...}") + "`");
    x && x({ kind: "template prep", template: this, clonableTemplate: this.el, parts: this.parts, strings: e2 });
  }
  static createElement(e2, t2) {
    const i2 = R.createElement("template");
    return i2.innerHTML = e2, i2;
  }
}
function ne(e2, t2, i2 = e2, s2) {
  if (t2 === G)
    return t2;
  let n2 = void 0 !== s2 ? i2.__directives?.[s2] : i2.__directive;
  const r2 = W(t2) ? void 0 : t2._$litDirective$;
  return n2?.constructor !== r2 && (n2?._$notifyDirectiveConnectionChanged?.(false), void 0 === r2 ? n2 = void 0 : (n2 = new r2(e2), n2._$initialize(e2, i2, s2)), void 0 !== s2 ? (i2.__directives ??= [])[s2] = n2 : i2.__directive = n2), void 0 !== n2 && (t2 = ne(e2, n2._$resolve(e2, t2.values), n2, s2)), t2;
}
class re {
  constructor(e2, t2) {
    this._$parts = [], this._$disconnectableChildren = void 0, this._$template = e2, this._$parent = t2;
  }
  get parentNode() {
    return this._$parent.parentNode;
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _clone(e2) {
    const { el: { content: t2 }, parts: i2 } = this._$template, s2 = (e2?.creationScope ?? R).importNode(t2, true);
    ee.currentNode = s2;
    let n2 = ee.nextNode(), r2 = 0, o2 = 0, a2 = i2[0];
    for (; void 0 !== a2; ) {
      if (r2 === a2.index) {
        let t3;
        2 === a2.type ? t3 = new oe(n2, n2.nextSibling, this, e2) : 1 === a2.type ? t3 = new a2.ctor(n2, a2.name, a2.strings, this, e2) : 6 === a2.type && (t3 = new ce(n2, this, e2)), this._$parts.push(t3), a2 = i2[++o2];
      }
      r2 !== a2?.index && (n2 = ee.nextNode(), r2++);
    }
    return ee.currentNode = R, s2;
  }
  _update(e2) {
    let t2 = 0;
    for (const i2 of this._$parts)
      void 0 !== i2 && (x && x({ kind: "set part", part: i2, value: e2[t2], valueIndex: t2, values: e2, templateInstance: this }), void 0 !== i2.strings ? (i2._$setValue(e2, i2, t2), t2 += i2.strings.length - 2) : i2._$setValue(e2[t2])), t2++;
  }
}
class oe {
  get _$isConnected() {
    return this._$parent?._$isConnected ?? this.__isConnected;
  }
  constructor(e2, t2, i2, s2) {
    this.type = 2, this._$committedValue = K, this._$disconnectableChildren = void 0, this._$startNode = e2, this._$endNode = t2, this._$parent = i2, this.options = s2, this.__isConnected = s2?.isConnected ?? true, this._textSanitizer = void 0;
  }
  get parentNode() {
    let e2 = N(this._$startNode).parentNode;
    const t2 = this._$parent;
    return void 0 !== t2 && 11 === e2?.nodeType && (e2 = t2.parentNode), e2;
  }
  get startNode() {
    return this._$startNode;
  }
  get endNode() {
    return this._$endNode;
  }
  _$setValue(e2, t2 = this) {
    if (null === this.parentNode)
      throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");
    if (e2 = ne(this, e2, t2), W(e2))
      e2 === K || null == e2 || "" === e2 ? (this._$committedValue !== K && (x && x({ kind: "commit nothing to child", start: this._$startNode, end: this._$endNode, parent: this._$parent, options: this.options }), this._$clear()), this._$committedValue = K) : e2 !== this._$committedValue && e2 !== G && this._commitText(e2);
    else if (void 0 !== e2._$litType$)
      this._commitTemplateResult(e2);
    else if (void 0 !== e2.nodeType) {
      if (this.options?.host === e2)
        return this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"), void console.warn("Attempted to render the template host", e2, "inside itself. This is almost always a mistake, and in dev mode ", "we render some warning text. In production however, we'll ", "render it, which will usually result in an error, and sometimes ", "in the element disappearing from the DOM.");
      this._commitNode(e2);
    } else
      ((e3) => I(e3) || "function" == typeof e3?.[Symbol.iterator])(e2) ? this._commitIterable(e2) : this._commitText(e2);
  }
  _insert(e2) {
    return N(N(this._$startNode).parentNode).insertBefore(e2, this._$endNode);
  }
  _commitNode(e2) {
    if (this._$committedValue !== e2) {
      if (this._$clear(), te !== V) {
        const e3 = this._$startNode.parentNode?.nodeName;
        if ("STYLE" === e3 || "SCRIPT" === e3) {
          let t2 = "Forbidden";
          throw t2 = "STYLE" === e3 ? "Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets." : "Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.", new Error(t2);
        }
      }
      x && x({ kind: "commit node", start: this._$startNode, parent: this._$parent, value: e2, options: this.options }), this._$committedValue = this._insert(e2);
    }
  }
  _commitText(e2) {
    if (this._$committedValue !== K && W(this._$committedValue)) {
      const t2 = N(this._$startNode).nextSibling;
      void 0 === this._textSanitizer && (this._textSanitizer = O(t2, "data", "property")), e2 = this._textSanitizer(e2), x && x({ kind: "commit text", node: t2, value: e2, options: this.options }), t2.data = e2;
    } else {
      const t2 = R.createTextNode("");
      this._commitNode(t2), void 0 === this._textSanitizer && (this._textSanitizer = O(t2, "data", "property")), e2 = this._textSanitizer(e2), x && x({ kind: "commit text", node: t2, value: e2, options: this.options }), t2.data = e2;
    }
    this._$committedValue = e2;
  }
  _commitTemplateResult(e2) {
    const { values: t2, _$litType$: i2 } = e2, s2 = "number" == typeof i2 ? this._$getTemplate(e2) : (void 0 === i2.el && (i2.el = se.createElement(ie(i2.h, i2.h[0]), this.options)), i2);
    if (this._$committedValue?._$template === s2)
      x && x({ kind: "template updating", template: s2, instance: this._$committedValue, parts: this._$committedValue._$parts, options: this.options, values: t2 }), this._$committedValue._update(t2);
    else {
      const e3 = new re(s2, this), i3 = e3._clone(this.options);
      x && x({ kind: "template instantiated", template: s2, instance: e3, parts: e3._$parts, options: this.options, fragment: i3, values: t2 }), e3._update(t2), x && x({ kind: "template instantiated and updated", template: s2, instance: e3, parts: e3._$parts, options: this.options, fragment: i3, values: t2 }), this._commitNode(i3), this._$committedValue = e3;
    }
  }
  _$getTemplate(e2) {
    let t2 = Q.get(e2.strings);
    return void 0 === t2 && Q.set(e2.strings, t2 = new se(e2)), t2;
  }
  _commitIterable(e2) {
    I(this._$committedValue) || (this._$committedValue = [], this._$clear());
    const t2 = this._$committedValue;
    let i2, s2 = 0;
    for (const n2 of e2)
      s2 === t2.length ? t2.push(i2 = new oe(this._insert(D()), this._insert(D()), this, this.options)) : i2 = t2[s2], i2._$setValue(n2), s2++;
    s2 < t2.length && (this._$clear(i2 && N(i2._$endNode).nextSibling, s2), t2.length = s2);
  }
  _$clear(e2 = N(this._$startNode).nextSibling, t2) {
    for (this._$notifyConnectionChanged?.(false, true, t2); e2 && e2 !== this._$endNode; ) {
      const t3 = N(e2).nextSibling;
      N(e2).remove(), e2 = t3;
    }
  }
  setConnected(e2) {
    if (void 0 !== this._$parent)
      throw new Error("part.setConnected() may only be called on a RootPart returned from render().");
    this.__isConnected = e2, this._$notifyConnectionChanged?.(e2);
  }
}
class ae {
  get tagName() {
    return this.element.tagName;
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  constructor(e2, t2, i2, s2, n2) {
    this.type = 1, this._$committedValue = K, this._$disconnectableChildren = void 0, this.element = e2, this.name = t2, this._$parent = s2, this.options = n2, i2.length > 2 || "" !== i2[0] || "" !== i2[1] ? (this._$committedValue = new Array(i2.length - 1).fill(new String()), this.strings = i2) : this._$committedValue = K, this._sanitizer = void 0;
  }
  _$setValue(e2, t2 = this, i2, s2) {
    const n2 = this.strings;
    let r2 = false;
    if (void 0 === n2)
      e2 = ne(this, e2, t2, 0), r2 = !W(e2) || e2 !== this._$committedValue && e2 !== G, r2 && (this._$committedValue = e2);
    else {
      const s3 = e2;
      let o2, a2;
      for (e2 = n2[0], o2 = 0; o2 < n2.length - 1; o2++)
        a2 = ne(this, s3[i2 + o2], t2, o2), a2 === G && (a2 = this._$committedValue[o2]), r2 ||= !W(a2) || a2 !== this._$committedValue[o2], a2 === K ? e2 = K : e2 !== K && (e2 += (a2 ?? "") + n2[o2 + 1]), this._$committedValue[o2] = a2;
    }
    r2 && !s2 && this._commitValue(e2);
  }
  _commitValue(e2) {
    e2 === K ? N(this.element).removeAttribute(this.name) : (void 0 === this._sanitizer && (this._sanitizer = te(this.element, this.name, "attribute")), e2 = this._sanitizer(e2 ?? ""), x && x({ kind: "commit attribute", element: this.element, name: this.name, value: e2, options: this.options }), N(this.element).setAttribute(this.name, e2 ?? ""));
  }
}
class le extends ae {
  constructor() {
    super(...arguments), this.type = 3;
  }
  _commitValue(e2) {
    void 0 === this._sanitizer && (this._sanitizer = te(this.element, this.name, "property")), e2 = this._sanitizer(e2), x && x({ kind: "commit property", element: this.element, name: this.name, value: e2, options: this.options }), this.element[this.name] = e2 === K ? void 0 : e2;
  }
}
class de extends ae {
  constructor() {
    super(...arguments), this.type = 4;
  }
  _commitValue(e2) {
    x && x({ kind: "commit boolean attribute", element: this.element, name: this.name, value: !(!e2 || e2 === K), options: this.options }), N(this.element).toggleAttribute(this.name, !!e2 && e2 !== K);
  }
}
class he extends ae {
  constructor(e2, t2, i2, s2, n2) {
    if (super(e2, t2, i2, s2, n2), this.type = 5, void 0 !== this.strings)
      throw new Error(`A \`<${e2.localName}>\` has a \`@${t2}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`);
  }
  _$setValue(e2, t2 = this) {
    if ((e2 = ne(this, e2, t2, 0) ?? K) === G)
      return;
    const i2 = this._$committedValue, s2 = e2 === K && i2 !== K || e2.capture !== i2.capture || e2.once !== i2.once || e2.passive !== i2.passive, n2 = e2 !== K && (i2 === K || s2);
    x && x({ kind: "commit event listener", element: this.element, name: this.name, value: e2, options: this.options, removeListener: s2, addListener: n2, oldListener: i2 }), s2 && this.element.removeEventListener(this.name, this, i2), n2 && this.element.addEventListener(this.name, this, e2), this._$committedValue = e2;
  }
  handleEvent(e2) {
    "function" == typeof this._$committedValue ? this._$committedValue.call(this.options?.host ?? this.element, e2) : this._$committedValue.handleEvent(e2);
  }
}
class ce {
  constructor(e2, t2, i2) {
    this.element = e2, this.type = 6, this._$disconnectableChildren = void 0, this._$parent = t2, this.options = i2;
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(e2) {
    x && x({ kind: "commit to element binding", element: this.element, value: e2, options: this.options }), ne(this, e2);
  }
}
const pe = P.litHtmlPolyfillSupportDevMode;
pe?.(se, oe), (P.litHtmlVersions ??= []).push("3.1.3"), P.litHtmlVersions.length > 1 && T("multiple-versions", "Multiple versions of Lit loaded. Loading multiple versions is not recommended.");
const ue = (e2, t2, i2) => {
  if (null == t2)
    throw new TypeError(`The container to render into may not be ${t2}`);
  const s2 = C++, n2 = i2?.renderBefore ?? t2;
  let r2 = n2._$litPart$;
  if (x && x({ kind: "begin render", id: s2, value: e2, container: t2, options: i2, part: r2 }), void 0 === r2) {
    const e3 = i2?.renderBefore ?? null;
    n2._$litPart$ = r2 = new oe(t2.insertBefore(D(), e3), e3, void 0, i2 ?? {});
  }
  return r2._$setValue(e2), x && x({ kind: "end render", id: s2, value: e2, container: t2, options: i2, part: r2 }), r2;
};
let me;
ue.setSanitizer = (e2) => {
  if (te !== V)
    throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");
  te = e2;
}, ue.createSanitizer = O, ue._testOnlyClearSanitizerFactoryDoNotCallOrElse = () => {
  te = V;
};
{
  const e2 = globalThis.litIssuedWarnings ??= /* @__PURE__ */ new Set();
  me = (t2, i2) => {
    i2 += ` See https://lit.dev/msg/${t2} for more information.`, e2.has(i2) || (console.warn(i2), e2.add(i2));
  };
}
class _e extends S {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.__childPart = void 0;
  }
  createRenderRoot() {
    const e2 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e2.firstChild, e2;
  }
  update(e2) {
    const t2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e2), this.__childPart = ue(t2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this.__childPart?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.__childPart?.setConnected(false);
  }
  render() {
    return G;
  }
}
_e._$litElement$ = true, _e.finalized = true, globalThis.litElementHydrateSupport?.({ LitElement: _e });
const fe = globalThis.litElementPolyfillSupportDevMode;
fe?.({ LitElement: _e }), (globalThis.litElementVersions ??= []).push("4.0.5"), globalThis.litElementVersions.length > 1 && me("multiple-versions", "Multiple versions of Lit loaded. Loading multiple versions is not recommended.");
export {
  _e as L,
  K as a,
  G as b,
  o as c,
  X as h,
  b as n,
  r as u
};
//# sourceMappingURL=lit-element-BtQrDsEd.js.map
