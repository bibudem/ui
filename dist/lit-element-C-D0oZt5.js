/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis, e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s = Symbol(), i = /* @__PURE__ */ new WeakMap();
let r = class {
  constructor(t2, e2, i2) {
    if (this._$cssResult$ = true, i2 !== s)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = i.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && i.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const n = (t2) => new r("string" == typeof t2 ? t2 : t2 + "", void 0, s), o = (t2, ...e2) => {
  const i2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, i3) => e3 + ((t3) => {
    if (true === t3._$cssResult$)
      return t3.cssText;
    if ("number" == typeof t3)
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[i3 + 1], t2[0]);
  return new r(i2, t2, s);
}, h = e ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return n(e2);
})(t2) : t2, { is: a, defineProperty: l, getOwnPropertyDescriptor: c, getOwnPropertyNames: d, getOwnPropertySymbols: p, getPrototypeOf: u } = Object, $ = globalThis, _ = $.trustedTypes, f = _ ? _.emptyScript : "", A = $.reactiveElementPolyfillSupport, y = (t2, e2) => t2, m = { toAttribute(t2, e2) {
  switch (e2) {
    case Boolean:
      t2 = t2 ? f : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, e2) {
  let s2 = t2;
  switch (e2) {
    case Boolean:
      s2 = null !== t2;
      break;
    case Number:
      s2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, g = (t2, e2) => !a(t2, e2), v = { attribute: true, type: String, converter: m, reflect: false, hasChanged: g };
Symbol.metadata ??= Symbol("metadata"), $.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class E extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ??= []).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, e2 = v) {
    if (e2.state && (e2.attribute = false), this._$Ei(), this.elementProperties.set(t2, e2), !e2.noAccessor) {
      const s2 = Symbol(), i2 = this.getPropertyDescriptor(t2, s2, e2);
      void 0 !== i2 && l(this.prototype, t2, i2);
    }
  }
  static getPropertyDescriptor(t2, e2, s2) {
    const { get: i2, set: r2 } = c(this.prototype, t2) ?? { get() {
      return this[e2];
    }, set(t3) {
      this[e2] = t3;
    } };
    return { get() {
      return i2?.call(this);
    }, set(e3) {
      const n2 = i2?.call(this);
      r2.call(this, e3), this.requestUpdate(t2, n2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? v;
  }
  static _$Ei() {
    if (this.hasOwnProperty(y("elementProperties")))
      return;
    const t2 = u(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(y("finalized")))
      return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(y("properties"))) {
      const t3 = this.properties, e2 = [...d(t3), ...p(t3)];
      for (const s2 of e2)
        this.createProperty(s2, t3[s2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const e2 = litPropertyMetadata.get(t2);
      if (void 0 !== e2)
        for (const [t3, s2] of e2)
          this.elementProperties.set(t3, s2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, e2] of this.elementProperties) {
      const s2 = this._$Eu(t3, e2);
      void 0 !== s2 && this._$Eh.set(s2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t2) {
    const e2 = [];
    if (Array.isArray(t2)) {
      const s2 = new Set(t2.flat(1 / 0).reverse());
      for (const t3 of s2)
        e2.unshift(h(t3));
    } else
      void 0 !== t2 && e2.push(h(t2));
    return e2;
  }
  static _$Eu(t2, e2) {
    const s2 = e2.attribute;
    return false === s2 ? void 0 : "string" == typeof s2 ? s2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t2) => t2(this));
  }
  addController(t2) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t2), void 0 !== this.renderRoot && this.isConnected && t2.hostConnected?.();
  }
  removeController(t2) {
    this._$EO?.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), e2 = this.constructor.elementProperties;
    for (const s2 of e2.keys())
      this.hasOwnProperty(s2) && (t2.set(s2, this[s2]), delete this[s2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const s2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ((s3, i2) => {
      if (e)
        s3.adoptedStyleSheets = i2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
      else
        for (const e2 of i2) {
          const i3 = document.createElement("style"), r2 = t.litNonce;
          void 0 !== r2 && i3.setAttribute("nonce", r2), i3.textContent = e2.cssText, s3.appendChild(i3);
        }
    })(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t2) => t2.hostConnected?.());
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t2) => t2.hostDisconnected?.());
  }
  attributeChangedCallback(t2, e2, s2) {
    this._$AK(t2, s2);
  }
  _$EC(t2, e2) {
    const s2 = this.constructor.elementProperties.get(t2), i2 = this.constructor._$Eu(t2, s2);
    if (void 0 !== i2 && true === s2.reflect) {
      const r2 = (void 0 !== s2.converter?.toAttribute ? s2.converter : m).toAttribute(e2, s2.type);
      this._$Em = t2, null == r2 ? this.removeAttribute(i2) : this.setAttribute(i2, r2), this._$Em = null;
    }
  }
  _$AK(t2, e2) {
    const s2 = this.constructor, i2 = s2._$Eh.get(t2);
    if (void 0 !== i2 && this._$Em !== i2) {
      const t3 = s2.getPropertyOptions(i2), r2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== t3.converter?.fromAttribute ? t3.converter : m;
      this._$Em = i2, this[i2] = r2.fromAttribute(e2, t3.type), this._$Em = null;
    }
  }
  requestUpdate(t2, e2, s2) {
    if (void 0 !== t2) {
      if (s2 ??= this.constructor.getPropertyOptions(t2), !(s2.hasChanged ?? g)(this[t2], e2))
        return;
      this.P(t2, e2, s2);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t2, e2, s2) {
    this._$AL.has(t2) || this._$AL.set(t2, e2), true === s2.reflect && this._$Em !== t2 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t2);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t4, e3] of this._$Ep)
          this[t4] = e3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0)
        for (const [e3, s2] of t3)
          true !== s2.wrapped || this._$AL.has(e3) || void 0 === this[e3] || this.P(e3, this[e3], s2);
    }
    let t2 = false;
    const e2 = this._$AL;
    try {
      t2 = this.shouldUpdate(e2), t2 ? (this.willUpdate(e2), this._$EO?.forEach((t3) => t3.hostUpdate?.()), this.update(e2)) : this._$EU();
    } catch (e3) {
      throw t2 = false, this._$EU(), e3;
    }
    t2 && this._$AE(e2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    this._$EO?.forEach((t3) => t3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Ej &&= this._$Ej.forEach((t3) => this._$EC(t3, this[t3])), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[y("elementProperties")] = /* @__PURE__ */ new Map(), E[y("finalized")] = /* @__PURE__ */ new Map(), A?.({ ReactiveElement: E }), ($.reactiveElementVersions ??= []).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S = globalThis, b = S.trustedTypes, w = b ? b.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, C = "$lit$", P = `lit$${Math.random().toFixed(9).slice(2)}$`, U = "?" + P, x = `<${U}>`, H = document, T = () => H.createComment(""), N = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, O = Array.isArray, R = "[ 	\n\f\r]", M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, k = /-->/g, L = />/g, z = RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), D = /'/g, j = /"/g, B = /^(?:script|style|textarea|title)$/i, I = (t2, ...e2) => ({ _$litType$: 1, strings: t2, values: e2 }), W = Symbol.for("lit-noChange"), V = Symbol.for("lit-nothing"), q = /* @__PURE__ */ new WeakMap(), J = H.createTreeWalker(H, 129);
function K(t2, e2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== w ? w.createHTML(e2) : e2;
}
const Z = (t2, e2) => {
  const s2 = t2.length - 1, i2 = [];
  let r2, n2 = 2 === e2 ? "<svg>" : "", o2 = M;
  for (let e3 = 0; e3 < s2; e3++) {
    const s3 = t2[e3];
    let h2, a2, l2 = -1, c2 = 0;
    for (; c2 < s3.length && (o2.lastIndex = c2, a2 = o2.exec(s3), null !== a2); )
      c2 = o2.lastIndex, o2 === M ? "!--" === a2[1] ? o2 = k : void 0 !== a2[1] ? o2 = L : void 0 !== a2[2] ? (B.test(a2[2]) && (r2 = RegExp("</" + a2[2], "g")), o2 = z) : void 0 !== a2[3] && (o2 = z) : o2 === z ? ">" === a2[0] ? (o2 = r2 ?? M, l2 = -1) : void 0 === a2[1] ? l2 = -2 : (l2 = o2.lastIndex - a2[2].length, h2 = a2[1], o2 = void 0 === a2[3] ? z : '"' === a2[3] ? j : D) : o2 === j || o2 === D ? o2 = z : o2 === k || o2 === L ? o2 = M : (o2 = z, r2 = void 0);
    const d2 = o2 === z && t2[e3 + 1].startsWith("/>") ? " " : "";
    n2 += o2 === M ? s3 + x : l2 >= 0 ? (i2.push(h2), s3.slice(0, l2) + C + s3.slice(l2) + P + d2) : s3 + P + (-2 === l2 ? e3 : d2);
  }
  return [K(t2, n2 + (t2[s2] || "<?>") + (2 === e2 ? "</svg>" : "")), i2];
};
class F {
  constructor({ strings: t2, _$litType$: e2 }, s2) {
    let i2;
    this.parts = [];
    let r2 = 0, n2 = 0;
    const o2 = t2.length - 1, h2 = this.parts, [a2, l2] = Z(t2, e2);
    if (this.el = F.createElement(a2, s2), J.currentNode = this.el.content, 2 === e2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (i2 = J.nextNode()) && h2.length < o2; ) {
      if (1 === i2.nodeType) {
        if (i2.hasAttributes())
          for (const t3 of i2.getAttributeNames())
            if (t3.endsWith(C)) {
              const e3 = l2[n2++], s3 = i2.getAttribute(t3).split(P), o3 = /([.?@])?(.*)/.exec(e3);
              h2.push({ type: 1, index: r2, name: o3[2], strings: s3, ctor: "." === o3[1] ? tt : "?" === o3[1] ? et : "@" === o3[1] ? st : Y }), i2.removeAttribute(t3);
            } else
              t3.startsWith(P) && (h2.push({ type: 6, index: r2 }), i2.removeAttribute(t3));
        if (B.test(i2.tagName)) {
          const t3 = i2.textContent.split(P), e3 = t3.length - 1;
          if (e3 > 0) {
            i2.textContent = b ? b.emptyScript : "";
            for (let s3 = 0; s3 < e3; s3++)
              i2.append(t3[s3], T()), J.nextNode(), h2.push({ type: 2, index: ++r2 });
            i2.append(t3[e3], T());
          }
        }
      } else if (8 === i2.nodeType)
        if (i2.data === U)
          h2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = i2.data.indexOf(P, t3 + 1)); )
            h2.push({ type: 7, index: r2 }), t3 += P.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, e2) {
    const s2 = H.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function G(t2, e2, s2 = t2, i2) {
  if (e2 === W)
    return e2;
  let r2 = void 0 !== i2 ? s2._$Co?.[i2] : s2._$Cl;
  const n2 = N(e2) ? void 0 : e2._$litDirective$;
  return r2?.constructor !== n2 && (r2?._$AO?.(false), void 0 === n2 ? r2 = void 0 : (r2 = new n2(t2), r2._$AT(t2, s2, i2)), void 0 !== i2 ? (s2._$Co ??= [])[i2] = r2 : s2._$Cl = r2), void 0 !== r2 && (e2 = G(t2, r2._$AS(t2, e2.values), r2, i2)), e2;
}
class Q {
  constructor(t2, e2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = e2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: e2 }, parts: s2 } = this._$AD, i2 = (t2?.creationScope ?? H).importNode(e2, true);
    J.currentNode = i2;
    let r2 = J.nextNode(), n2 = 0, o2 = 0, h2 = s2[0];
    for (; void 0 !== h2; ) {
      if (n2 === h2.index) {
        let e3;
        2 === h2.type ? e3 = new X(r2, r2.nextSibling, this, t2) : 1 === h2.type ? e3 = new h2.ctor(r2, h2.name, h2.strings, this, t2) : 6 === h2.type && (e3 = new it(r2, this, t2)), this._$AV.push(e3), h2 = s2[++o2];
      }
      n2 !== h2?.index && (r2 = J.nextNode(), n2++);
    }
    return J.currentNode = H, i2;
  }
  p(t2) {
    let e2 = 0;
    for (const s2 of this._$AV)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, e2), e2 += s2.strings.length - 2) : s2._$AI(t2[e2])), e2++;
  }
}
class X {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, e2, s2, i2) {
    this.type = 2, this._$AH = V, this._$AN = void 0, this._$AA = t2, this._$AB = e2, this._$AM = s2, this.options = i2, this._$Cv = i2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const e2 = this._$AM;
    return void 0 !== e2 && 11 === t2?.nodeType && (t2 = e2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, e2 = this) {
    t2 = G(this, t2, e2), N(t2) ? t2 === V || null == t2 || "" === t2 ? (this._$AH !== V && this._$AR(), this._$AH = V) : t2 !== this._$AH && t2 !== W && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : ((t3) => O(t3) || "function" == typeof t3?.[Symbol.iterator])(t2) ? this.k(t2) : this._(t2);
  }
  S(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.S(t2));
  }
  _(t2) {
    this._$AH !== V && N(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(H.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const { values: e2, _$litType$: s2 } = t2, i2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = F.createElement(K(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === i2)
      this._$AH.p(e2);
    else {
      const t3 = new Q(i2, this), s3 = t3.u(this.options);
      t3.p(e2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let e2 = q.get(t2.strings);
    return void 0 === e2 && q.set(t2.strings, e2 = new F(t2)), e2;
  }
  k(t2) {
    O(this._$AH) || (this._$AH = [], this._$AR());
    const e2 = this._$AH;
    let s2, i2 = 0;
    for (const r2 of t2)
      i2 === e2.length ? e2.push(s2 = new X(this.S(T()), this.S(T()), this, this.options)) : s2 = e2[i2], s2._$AI(r2), i2++;
    i2 < e2.length && (this._$AR(s2 && s2._$AB.nextSibling, i2), e2.length = i2);
  }
  _$AR(t2 = this._$AA.nextSibling, e2) {
    for (this._$AP?.(false, true, e2); t2 && t2 !== this._$AB; ) {
      const e3 = t2.nextSibling;
      t2.remove(), t2 = e3;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
}
class Y {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, e2, s2, i2, r2) {
    this.type = 1, this._$AH = V, this._$AN = void 0, this.element = t2, this.name = e2, this._$AM = i2, this.options = r2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = V;
  }
  _$AI(t2, e2 = this, s2, i2) {
    const r2 = this.strings;
    let n2 = false;
    if (void 0 === r2)
      t2 = G(this, t2, e2, 0), n2 = !N(t2) || t2 !== this._$AH && t2 !== W, n2 && (this._$AH = t2);
    else {
      const i3 = t2;
      let o2, h2;
      for (t2 = r2[0], o2 = 0; o2 < r2.length - 1; o2++)
        h2 = G(this, i3[s2 + o2], e2, o2), h2 === W && (h2 = this._$AH[o2]), n2 ||= !N(h2) || h2 !== this._$AH[o2], h2 === V ? t2 = V : t2 !== V && (t2 += (h2 ?? "") + r2[o2 + 1]), this._$AH[o2] = h2;
    }
    n2 && !i2 && this.j(t2);
  }
  j(t2) {
    t2 === V ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class tt extends Y {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === V ? void 0 : t2;
  }
}
class et extends Y {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== V);
  }
}
class st extends Y {
  constructor(t2, e2, s2, i2, r2) {
    super(t2, e2, s2, i2, r2), this.type = 5;
  }
  _$AI(t2, e2 = this) {
    if ((t2 = G(this, t2, e2, 0) ?? V) === W)
      return;
    const s2 = this._$AH, i2 = t2 === V && s2 !== V || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, r2 = t2 !== V && (s2 === V || i2);
    i2 && this.element.removeEventListener(this.name, this, s2), r2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class it {
  constructor(t2, e2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = e2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    G(this, t2);
  }
}
const rt = S.litHtmlPolyfillSupport;
rt?.(F, X), (S.litHtmlVersions ??= []).push("3.1.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class nt extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t2 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t2.firstChild, t2;
  }
  update(t2) {
    const e2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = ((t3, e3, s2) => {
      const i2 = s2?.renderBefore ?? e3;
      let r2 = i2._$litPart$;
      if (void 0 === r2) {
        const t4 = s2?.renderBefore ?? null;
        i2._$litPart$ = r2 = new X(e3.insertBefore(T(), t4), t4, void 0, s2 ?? {});
      }
      return r2._$AI(t3), r2;
    })(e2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return W;
  }
}
nt._$litElement$ = true, nt.finalized = true, globalThis.litElementHydrateSupport?.({ LitElement: nt });
const ot = globalThis.litElementPolyfillSupport;
ot?.({ LitElement: nt }), (globalThis.litElementVersions ??= []).push("4.0.5");
export {
  V as T,
  g as f,
  o as i,
  n as r,
  nt as s,
  m as u,
  W as w,
  I as x
};
//# sourceMappingURL=lit-element-C-D0oZt5.js.map
