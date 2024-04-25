var St = Object.defineProperty;
var xt = (n, t, e) => t in n ? St(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var M = (n, t, e) => (xt(n, typeof t != "symbol" ? t + "" : t, e), e);
import { LitElement as Ct, css as vt, html as F } from "lit";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = !1, I = globalThis, Z = I.ShadowRoot && (I.ShadyCSS === void 0 || I.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, gt = Symbol(), it = /* @__PURE__ */ new WeakMap();
class kt {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== gt)
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this._strings = e;
  }
  // This is a getter so that it's lazy. In practice, this means stylesheets
  // are not created until the first element instance is made.
  get styleSheet() {
    let t = this._styleSheet;
    const e = this._strings;
    if (Z && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = it.get(e)), t === void 0 && ((this._styleSheet = t = new CSSStyleSheet()).replaceSync(this.cssText), i && it.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const At = (n) => new kt(typeof n == "string" ? n : String(n), void 0, gt), Rt = (n, t) => {
  if (Z)
    n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const i = document.createElement("style"), s = I.litNonce;
      s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
    }
}, Ut = (n) => {
  let t = "";
  for (const e of n.cssRules)
    t += e.cssText;
  return At(t);
}, st = Z || Nt ? (n) => n : (n) => n instanceof CSSStyleSheet ? Ut(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Mt, defineProperty: It, getOwnPropertyDescriptor: nt, getOwnPropertyNames: Ot, getOwnPropertySymbols: Vt, getPrototypeOf: rt } = Object, w = globalThis;
let b;
const ot = w.trustedTypes, Lt = ot ? ot.emptyScript : "", yt = w.reactiveElementPolyfillSupportDevMode;
{
  const n = w.litIssuedWarnings ??= /* @__PURE__ */ new Set();
  b = (t, e) => {
    e += ` See https://lit.dev/msg/${t} for more information.`, n.has(e) || (console.warn(e), n.add(e));
  }, b("dev-mode", "Lit is in dev mode. Not recommended for production!"), w.ShadyDOM?.inUse && yt === void 0 && b("polyfill-support-missing", "Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.");
}
const zt = (n) => {
  w.emitLitDebugLogEvents && w.dispatchEvent(new CustomEvent("lit-debug", {
    detail: n
  }));
}, x = (n, t) => n, J = {
  toAttribute(n, t) {
    switch (t) {
      case Boolean:
        n = n ? Lt : null;
        break;
      case Object:
      case Array:
        n = n == null ? n : JSON.stringify(n);
        break;
    }
    return n;
  },
  fromAttribute(n, t) {
    let e = n;
    switch (t) {
      case Boolean:
        e = n !== null;
        break;
      case Number:
        e = n === null ? null : Number(n);
        break;
      case Object:
      case Array:
        try {
          e = JSON.parse(n);
        } catch {
          e = null;
        }
        break;
    }
    return e;
  }
}, K = (n, t) => !Mt(n, t), at = {
  attribute: !0,
  type: String,
  converter: J,
  reflect: !1,
  hasChanged: K
};
Symbol.metadata ??= Symbol("metadata");
w.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class P extends HTMLElement {
  /**
   * Adds an initializer function to the class that is called during instance
   * construction.
   *
   * This is useful for code that runs against a `ReactiveElement`
   * subclass, such as a decorator, that needs to do work for each
   * instance, such as setting up a `ReactiveController`.
   *
   * ```ts
   * const myDecorator = (target: typeof ReactiveElement, key: string) => {
   *   target.addInitializer((instance: ReactiveElement) => {
   *     // This is run during construction of the element
   *     new MyController(instance);
   *   });
   * }
   * ```
   *
   * Decorating a field will then cause each instance to run an initializer
   * that adds a controller:
   *
   * ```ts
   * class MyElement extends LitElement {
   *   @myDecorator foo;
   * }
   * ```
   *
   * Initializers are stored per-constructor. Adding an initializer to a
   * subclass does not add it to a superclass. Since initializers are run in
   * constructors, initializers will run in order of the class hierarchy,
   * starting with superclasses and progressing to the instance's class.
   *
   * @nocollapse
   */
  static addInitializer(t) {
    this.__prepare(), (this._initializers ??= []).push(t);
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   * @category attributes
   */
  static get observedAttributes() {
    return this.finalize(), this.__attributeToPropertyMap && [...this.__attributeToPropertyMap.keys()];
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist
   * and stores a {@linkcode PropertyDeclaration} for the property with the
   * given options. The property setter calls the property's `hasChanged`
   * property option or uses a strict identity check to determine whether or not
   * to request an update.
   *
   * This method may be overridden to customize properties; however,
   * when doing so, it's important to call `super.createProperty` to ensure
   * the property is setup correctly. This method calls
   * `getPropertyDescriptor` internally to get a descriptor to install.
   * To customize what properties do when they are get or set, override
   * `getPropertyDescriptor`. To customize the options for a property,
   * implement `createProperty` like this:
   *
   * ```ts
   * static createProperty(name, options) {
   *   options = Object.assign(options, {myOption: true});
   *   super.createProperty(name, options);
   * }
   * ```
   *
   * @nocollapse
   * @category properties
   */
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this.__prepare(), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = (
        // Use Symbol.for in dev mode to make it easier to maintain state
        // when doing HMR.
        Symbol.for(`${String(t)} (@property() cache)`)
      ), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && It(this.prototype, t, s);
    }
  }
  /**
   * Returns a property descriptor to be defined on the given named property.
   * If no descriptor is returned, the property will not become an accessor.
   * For example,
   *
   * ```ts
   * class MyElement extends LitElement {
   *   static getPropertyDescriptor(name, key, options) {
   *     const defaultDescriptor =
   *         super.getPropertyDescriptor(name, key, options);
   *     const setter = defaultDescriptor.set;
   *     return {
   *       get: defaultDescriptor.get,
   *       set(value) {
   *         setter.call(this, value);
   *         // custom action.
   *       },
   *       configurable: true,
   *       enumerable: true
   *     }
   *   }
   * }
   * ```
   *
   * @nocollapse
   * @category properties
   */
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = nt(this.prototype, t) ?? {
      get() {
        return this[e];
      },
      set(o) {
        this[e] = o;
      }
    };
    if (s == null) {
      if ("value" in (nt(this.prototype, t) ?? {}))
        throw new Error(`Field ${JSON.stringify(String(t))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);
      b("reactive-property-without-getter", `Field ${JSON.stringify(String(t))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`);
    }
    return {
      get() {
        return s?.call(this);
      },
      set(o) {
        const u = s?.call(this);
        r.call(this, o), this.requestUpdate(t, u, i);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  /**
   * Returns the property options associated with the given property.
   * These options are defined with a `PropertyDeclaration` via the `properties`
   * object or the `@property` decorator and are registered in
   * `createProperty(...)`.
   *
   * Note, this method should be considered "final" and not overridden. To
   * customize the options for a given property, override
   * {@linkcode createProperty}.
   *
   * @nocollapse
   * @final
   * @category properties
   */
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? at;
  }
  /**
   * Initializes static own properties of the class used in bookkeeping
   * for element properties, initializers, etc.
   *
   * Can be called multiple times by code that needs to ensure these
   * properties exist before using them.
   *
   * This method ensures the superclass is finalized so that inherited
   * property metadata can be copied down.
   * @nocollapse
   */
  static __prepare() {
    if (this.hasOwnProperty(x("elementProperties")))
      return;
    const t = rt(this);
    t.finalize(), t._initializers !== void 0 && (this._initializers = [...t._initializers]), this.elementProperties = new Map(t.elementProperties);
  }
  /**
   * Finishes setting up the class so that it's ready to be registered
   * as a custom element and instantiated.
   *
   * This method is called by the ReactiveElement.observedAttributes getter.
   * If you override the observedAttributes getter, you must either call
   * super.observedAttributes to trigger finalization, or call finalize()
   * yourself.
   *
   * @nocollapse
   */
  static finalize() {
    if (this.hasOwnProperty(x("finalized")))
      return;
    if (this.finalized = !0, this.__prepare(), this.hasOwnProperty(x("properties"))) {
      const e = this.properties, i = [
        ...Ot(e),
        ...Vt(e)
      ];
      for (const s of i)
        this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [i, s] of e)
          this.elementProperties.set(i, s);
    }
    this.__attributeToPropertyMap = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this.__attributeNameForProperty(e, i);
      s !== void 0 && this.__attributeToPropertyMap.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles), this.hasOwnProperty("createProperty") && b("no-override-create-property", "Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators"), this.hasOwnProperty("getPropertyDescriptor") && b("no-override-get-property-descriptor", "Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators");
  }
  /**
   * Takes the styles the user supplied via the `static styles` property and
   * returns the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * Styles are deduplicated preserving the _last_ instance in the list. This
   * is a performance optimization to avoid duplicated styles that can occur
   * especially when composing via subclassing. The last item is kept to try
   * to preserve the cascade order with the assumption that it's most important
   * that last added styles override previous styles.
   *
   * @nocollapse
   * @category styles
   */
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i)
        e.unshift(st(s));
    } else
      t !== void 0 && e.push(st(t));
    return e;
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */
  static __attributeNameForProperty(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this.__instanceProperties = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this.__reflectingProperty = null, this.__initialize();
  }
  /**
   * Internal only override point for customizing work done when elements
   * are constructed.
   */
  __initialize() {
    this.__updatePromise = new Promise((t) => this.enableUpdating = t), this._$changedProperties = /* @__PURE__ */ new Map(), this.__saveInstanceProperties(), this.requestUpdate(), this.constructor._initializers?.forEach((t) => t(this));
  }
  /**
   * Registers a `ReactiveController` to participate in the element's reactive
   * update cycle. The element automatically calls into any registered
   * controllers during its lifecycle callbacks.
   *
   * If the element is connected when `addController()` is called, the
   * controller's `hostConnected()` callback will be immediately called.
   * @category controllers
   */
  addController(t) {
    (this.__controllers ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  /**
   * Removes a `ReactiveController` from the element.
   * @category controllers
   */
  removeController(t) {
    this.__controllers?.delete(t);
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */
  __saveInstanceProperties() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys())
      this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this.__instanceProperties = t);
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   *
   * @return Returns a node into which to render.
   * @category rendering
   */
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Rt(t, this.constructor.elementStyles), t;
  }
  /**
   * On first connection, creates the element's renderRoot, sets up
   * element styling, and enables updating.
   * @category lifecycle
   */
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this.__controllers?.forEach((t) => t.hostConnected?.());
  }
  /**
   * Note, this method should be considered final and not overridden. It is
   * overridden on the element instance with a function that triggers the first
   * update.
   * @category updates
   */
  enableUpdating(t) {
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   * @category lifecycle
   */
  disconnectedCallback() {
    this.__controllers?.forEach((t) => t.hostDisconnected?.());
  }
  /**
   * Synchronizes property values when attributes change.
   *
   * Specifically, when an attribute is set, the corresponding property is set.
   * You should rarely need to implement this callback. If this method is
   * overridden, `super.attributeChangedCallback(name, _old, value)` must be
   * called.
   *
   * See [using the lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks)
   * on MDN for more information about the `attributeChangedCallback`.
   * @category attributes
   */
  attributeChangedCallback(t, e, i) {
    this._$attributeToProperty(t, i);
  }
  __propertyToAttribute(t, e) {
    const s = this.constructor.elementProperties.get(t), r = this.constructor.__attributeNameForProperty(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const u = (s.converter?.toAttribute !== void 0 ? s.converter : J).toAttribute(e, s.type);
      this.constructor.enabledWarnings.includes("migration") && u === void 0 && b("undefined-attribute-value", `The attribute value for the ${t} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`), this.__reflectingProperty = t, u == null ? this.removeAttribute(r) : this.setAttribute(r, u), this.__reflectingProperty = null;
    }
  }
  /** @internal */
  _$attributeToProperty(t, e) {
    const i = this.constructor, s = i.__attributeToPropertyMap.get(t);
    if (s !== void 0 && this.__reflectingProperty !== s) {
      const r = i.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : J;
      this.__reflectingProperty = s, this[s] = o.fromAttribute(
        e,
        r.type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ), this.__reflectingProperty = null;
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should be called
   * when an element should update based on some state not triggered by setting
   * a reactive property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored.
   *
   * @param name name of requesting property
   * @param oldValue old value of requesting property
   * @param options property options to use instead of the previously
   *     configured options
   * @category updates
   */
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      t instanceof Event && b("", "The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()"), i ??= this.constructor.getPropertyOptions(t);
      const s = i.hasChanged ?? K, r = this[t];
      if (s(r, e))
        this._$changeProperty(t, e, i);
      else
        return;
    }
    this.isUpdatePending === !1 && (this.__updatePromise = this.__enqueueUpdate());
  }
  /**
   * @internal
   */
  _$changeProperty(t, e, i) {
    this._$changedProperties.has(t) || this._$changedProperties.set(t, e), i.reflect === !0 && this.__reflectingProperty !== t && (this.__reflectingProperties ??= /* @__PURE__ */ new Set()).add(t);
  }
  /**
   * Sets up the element to asynchronously update.
   */
  async __enqueueUpdate() {
    this.isUpdatePending = !0;
    try {
      await this.__updatePromise;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  /**
   * Schedules an element update. You can override this method to change the
   * timing of updates by returning a Promise. The update will await the
   * returned Promise, and you should resolve the Promise to allow the update
   * to proceed. If this method is overridden, `super.scheduleUpdate()`
   * must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```ts
   * override protected async scheduleUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.scheduleUpdate();
   * }
   * ```
   * @category updates
   */
  scheduleUpdate() {
    const t = this.performUpdate();
    return this.constructor.enabledWarnings.includes("async-perform-update") && typeof t?.then == "function" && b("async-perform-update", `Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`), t;
  }
  /**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * Call `performUpdate()` to immediately process a pending update. This should
   * generally not be needed, but it can be done in rare cases when you need to
   * update synchronously.
   *
   * @category updates
   */
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    if (zt?.({ kind: "update" }), !this.hasUpdated) {
      this.renderRoot ??= this.createRenderRoot();
      {
        const r = [...this.constructor.elementProperties.keys()].filter((o) => this.hasOwnProperty(o) && o in rt(this));
        if (r.length)
          throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${r.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`);
      }
      if (this.__instanceProperties) {
        for (const [s, r] of this.__instanceProperties)
          this[s] = r;
        this.__instanceProperties = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [s, r] of i)
          r.wrapped === !0 && !this._$changedProperties.has(s) && this[s] !== void 0 && this._$changeProperty(s, this[s], r);
    }
    let t = !1;
    const e = this._$changedProperties;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this.__controllers?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this.__markUpdated();
    } catch (i) {
      throw t = !1, this.__markUpdated(), i;
    }
    t && this._$didUpdate(e);
  }
  /**
   * Invoked before `update()` to compute values needed during the update.
   *
   * Implement `willUpdate` to compute property values that depend on other
   * properties and are used in the rest of the update process.
   *
   * ```ts
   * willUpdate(changedProperties) {
   *   // only need to check changed properties for an expensive computation.
   *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
   *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
   *   }
   * }
   *
   * render() {
   *   return html`SHA: ${this.sha}`;
   * }
   * ```
   *
   * @category updates
   */
  willUpdate(t) {
  }
  // Note, this is an override point for polyfill-support.
  // @internal
  _$didUpdate(t) {
    this.__controllers?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t), this.isUpdatePending && this.constructor.enabledWarnings.includes("change-in-update") && b("change-in-update", `Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`);
  }
  __markUpdated() {
    this._$changedProperties = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update.
   *
   * To await additional asynchronous work, override the `getUpdateComplete`
   * method. For example, it is sometimes useful to await a rendered element
   * before fulfilling this Promise. To do this, first await
   * `super.getUpdateComplete()`, then any subsequent state.
   *
   * @return A promise of a boolean that resolves to true if the update completed
   *     without triggering another update.
   * @category updates
   */
  get updateComplete() {
    return this.getUpdateComplete();
  }
  /**
   * Override point for the `updateComplete` promise.
   *
   * It is not safe to override the `updateComplete` getter directly due to a
   * limitation in TypeScript which means it is not possible to call a
   * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
   * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
   * This method should be overridden instead. For example:
   *
   * ```ts
   * class MyElement extends LitElement {
   *   override async getUpdateComplete() {
   *     const result = await super.getUpdateComplete();
   *     await this._myChild.updateComplete;
   *     return result;
   *   }
   * }
   * ```
   *
   * @return A promise of a boolean that resolves to true if the update completed
   *     without triggering another update.
   * @category updates
   */
  getUpdateComplete() {
    return this.__updatePromise;
  }
  /**
   * Controls whether or not `update()` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  shouldUpdate(t) {
    return !0;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  update(t) {
    this.__reflectingProperties &&= this.__reflectingProperties.forEach((e) => this.__propertyToAttribute(e, this[e])), this.__markUpdated();
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  updated(t) {
  }
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * ```ts
   * firstUpdated() {
   *   this.renderRoot.getElementById('my-text-area').focus();
   * }
   * ```
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  firstUpdated(t) {
  }
}
P.elementStyles = [];
P.shadowRootOptions = { mode: "open" };
P[x("elementProperties")] = /* @__PURE__ */ new Map();
P[x("finalized")] = /* @__PURE__ */ new Map();
yt?.({ ReactiveElement: P });
{
  P.enabledWarnings = [
    "change-in-update",
    "async-perform-update"
  ];
  const n = function(t) {
    t.hasOwnProperty(x("enabledWarnings")) || (t.enabledWarnings = t.enabledWarnings.slice());
  };
  P.enableWarning = function(t) {
    n(this), this.enabledWarnings.includes(t) || this.enabledWarnings.push(t);
  }, P.disableWarning = function(t) {
    n(this);
    const e = this.enabledWarnings.indexOf(t);
    e >= 0 && this.enabledWarnings.splice(e, 1);
  };
}
(w.reactiveElementVersions ??= []).push("2.0.4");
w.reactiveElementVersions.length > 1 && b("multiple-versions", "Multiple versions of Lit loaded. Loading multiple versions is not recommended.");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const f = {
  INITIAL: 0,
  PENDING: 1,
  COMPLETE: 2,
  ERROR: 3
}, Dt = Symbol();
class Wt {
  /**
   * A Promise that resolve when the current task run is complete.
   *
   * If a new task run is started while a previous run is pending, the Promise
   * is kept and only resolved when the new run is completed.
   */
  get taskComplete() {
    return this._taskComplete ? this._taskComplete : (this.status === f.PENDING ? this._taskComplete = new Promise((t, e) => {
      this._resolveTaskComplete = t, this._rejectTaskComplete = e;
    }) : this.status === f.ERROR ? this._taskComplete = Promise.reject(this._error) : this._taskComplete = Promise.resolve(this._value), this._taskComplete);
  }
  constructor(t, e, i) {
    this._callId = 0, this.status = f.INITIAL, (this._host = t).addController(this);
    const s = typeof e == "object" ? e : { task: e, args: i };
    this._task = s.task, this._argsFn = s.args, this._argsEqual = s.argsEqual ?? qt, this._onComplete = s.onComplete, this._onError = s.onError, this.autoRun = s.autoRun ?? !0, "initialValue" in s && (this._value = s.initialValue, this.status = f.COMPLETE, this._previousArgs = this._getArgs?.());
  }
  hostUpdate() {
    this.autoRun === !0 && this._performTask();
  }
  hostUpdated() {
    this.autoRun === "afterUpdate" && this._performTask();
  }
  _getArgs() {
    if (this._argsFn === void 0)
      return;
    const t = this._argsFn();
    if (!Array.isArray(t))
      throw new Error("The args function must return an array");
    return t;
  }
  /**
   * Determines if the task should run when it's triggered because of a
   * host update, and runs the task if it should.
   *
   * A task should run when its arguments change from the previous run, based on
   * the args equality function.
   *
   * This method is side-effectful: it stores the new args as the previous args.
   */
  async _performTask() {
    const t = this._getArgs(), e = this._previousArgs;
    this._previousArgs = t, t !== e && t !== void 0 && (e === void 0 || !this._argsEqual(e, t)) && await this.run(t);
  }
  /**
   * Runs a task manually.
   *
   * This can be useful for running tasks in response to events as opposed to
   * automatically running when host element state changes.
   *
   * @param args an optional set of arguments to use for this task run. If args
   *     is not given, the args function is called to get the arguments for
   *     this run.
   */
  async run(t) {
    t ??= this._getArgs(), this._previousArgs = t, this.status === f.PENDING ? this._abortController?.abort() : (this._taskComplete = void 0, this._resolveTaskComplete = void 0, this._rejectTaskComplete = void 0), this.status = f.PENDING;
    let e, i;
    this.autoRun === "afterUpdate" ? queueMicrotask(() => this._host.requestUpdate()) : this._host.requestUpdate();
    const s = ++this._callId;
    this._abortController = new AbortController();
    let r = !1;
    try {
      e = await this._task(t, { signal: this._abortController.signal });
    } catch (o) {
      r = !0, i = o;
    }
    if (this._callId === s) {
      if (e === Dt)
        this.status = f.INITIAL;
      else {
        if (r === !1) {
          try {
            this._onComplete?.(e);
          } catch {
          }
          this.status = f.COMPLETE, this._resolveTaskComplete?.(e);
        } else {
          try {
            this._onError?.(i);
          } catch {
          }
          this.status = f.ERROR, this._rejectTaskComplete?.(i);
        }
        this._value = e, this._error = i;
      }
      this._host.requestUpdate();
    }
  }
  /**
   * Aborts the currently pending task run by aborting the AbortSignal
   * passed to the task function.
   *
   * Aborting a task does nothing if the task is not running: ie, in the
   * complete, error, or initial states.
   *
   * Aborting a task does not automatically cancel the task function. The task
   * function must be written to accept the AbortSignal and either forward it
   * to other APIs like `fetch()`, or handle cancellation manually by using
   * [`signal.throwIfAborted()`]{@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/throwIfAborted}
   * or the
   * [`abort`]{@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/abort_event}
   * event.
   *
   * @param reason The reason for aborting. Passed to
   *     `AbortController.abort()`.
   */
  abort(t) {
    this.status === f.PENDING && this._abortController?.abort(t);
  }
  /**
   * The result of the previous task run, if it resolved.
   *
   * Is `undefined` if the task has not run yet, or if the previous run errored.
   */
  get value() {
    return this._value;
  }
  /**
   * The error from the previous task run, if it rejected.
   *
   * Is `undefined` if the task has not run yet, or if the previous run
   * completed successfully.
   */
  get error() {
    return this._error;
  }
  render(t) {
    switch (this.status) {
      case f.INITIAL:
        return t.initial?.();
      case f.PENDING:
        return t.pending?.();
      case f.COMPLETE:
        return t.complete?.(this.value);
      case f.ERROR:
        return t.error?.(this.error);
      default:
        throw new Error(`Unexpected status: ${this.status}`);
    }
  }
}
const qt = (n, t) => n === t || n.length === t.length && n.every((e, i) => !K(e, t[i]));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _ = globalThis, l = (n) => {
  _.emitLitDebugLogEvents && _.dispatchEvent(new CustomEvent("lit-debug", {
    detail: n
  }));
};
let O;
_.litIssuedWarnings ??= /* @__PURE__ */ new Set(), O = (n, t) => {
  t += n ? ` See https://lit.dev/msg/${n} for more information.` : "", _.litIssuedWarnings.has(t) || (console.warn(t), _.litIssuedWarnings.add(t));
}, O("dev-mode", "Lit is in dev mode. Not recommended for production!");
const y = _.ShadyDOM?.inUse && _.ShadyDOM?.noPatch === !0 ? _.ShadyDOM.wrap : (n) => n, V = _.trustedTypes, lt = V ? V.createPolicy("lit-html", {
  createHTML: (n) => n
}) : void 0, Ft = (n) => n, bt = (n, t, e) => Ft, dt = (n, t, e) => D(), $t = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, wt = "?" + $, Ht = `<${wt}>`, S = document, L = () => S.createComment(""), k = (n) => n === null || typeof n != "object" && typeof n != "function", Pt = Array.isArray, jt = (n) => Pt(n) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
typeof n?.[Symbol.iterator] == "function", H = `[ 	
\f\r]`, Bt = `[^ 	
\f\r"'\`<>=]`, Gt = `[^\\s"'>=/]`, N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = 1, j = 2, Jt = 3, ht = /-->/g, pt = />/g, T = new RegExp(`>|${H}(?:(${Gt}+)(${H}*=${H}*(?:${Bt}|("|')|))|$)`, "g"), Yt = 0, ut = 1, Qt = 2, mt = 3, B = /'/g, G = /"/g, Tt = /^(?:script|style|textarea|title)$/i, Y = 2, X = 1, z = 2, Zt = 3, Kt = 4, Xt = 5, tt = 6, te = 7, C = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), E = S.createTreeWalker(
  S,
  129
  /* NodeFilter.SHOW_{ELEMENT|COMMENT} */
);
let D = bt;
function Et(n, t) {
  if (!Array.isArray(n) || !n.hasOwnProperty("raw")) {
    let e = "invalid template strings array";
    throw e = `
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g, `
`), new Error(e);
  }
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const ee = (n, t) => {
  const e = n.length - 1, i = [];
  let s = t === Y ? "<svg>" : "", r, o = N;
  for (let a = 0; a < e; a++) {
    const d = n[a];
    let g = -1, c, m = 0, p;
    for (; m < d.length && (o.lastIndex = m, p = o.exec(d), p !== null); )
      if (m = o.lastIndex, o === N) {
        if (p[ct] === "!--")
          o = ht;
        else if (p[ct] !== void 0)
          o = pt;
        else if (p[j] !== void 0)
          Tt.test(p[j]) && (r = new RegExp(`</${p[j]}`, "g")), o = T;
        else if (p[Jt] !== void 0)
          throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions");
      } else
        o === T ? p[Yt] === ">" ? (o = r ?? N, g = -1) : p[ut] === void 0 ? g = -2 : (g = o.lastIndex - p[Qt].length, c = p[ut], o = p[mt] === void 0 ? T : p[mt] === '"' ? G : B) : o === G || o === B ? o = T : o === ht || o === pt ? o = N : (o = T, r = void 0);
    console.assert(g === -1 || o === T || o === B || o === G, "unexpected parse state B");
    const R = o === T && n[a + 1].startsWith("/>") ? " " : "";
    s += o === N ? d + Ht : g >= 0 ? (i.push(c), d.slice(0, g) + $t + d.slice(g) + $ + R) : d + $ + (g === -2 ? a : R);
  }
  const u = s + (n[e] || "<?>") + (t === Y ? "</svg>" : "");
  return [Et(n, u), i];
};
class A {
  constructor({ strings: t, ["_$litType$"]: e }, i) {
    this.parts = [];
    let s, r = 0, o = 0;
    const u = t.length - 1, a = this.parts, [d, g] = ee(t, e);
    if (this.el = A.createElement(d, i), E.currentNode = this.el.content, e === Y) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = E.nextNode()) !== null && a.length < u; ) {
      if (s.nodeType === 1) {
        {
          const c = s.localName;
          if (/^(?:textarea|template)$/i.test(c) && s.innerHTML.includes($)) {
            const m = `Expressions are not supported inside \`${c}\` elements. See https://lit.dev/msg/expression-in-${c} for more information.`;
            if (c === "template")
              throw new Error(m);
            O("", m);
          }
        }
        if (s.hasAttributes())
          for (const c of s.getAttributeNames())
            if (c.endsWith($t)) {
              const m = g[o++], R = s.getAttribute(c).split($), U = /([.?@])?(.*)/.exec(m);
              a.push({
                type: X,
                index: r,
                name: U[2],
                strings: R,
                ctor: U[1] === "." ? se : U[1] === "?" ? ne : U[1] === "@" ? re : q
              }), s.removeAttribute(c);
            } else
              c.startsWith($) && (a.push({
                type: tt,
                index: r
              }), s.removeAttribute(c));
        if (Tt.test(s.tagName)) {
          const c = s.textContent.split($), m = c.length - 1;
          if (m > 0) {
            s.textContent = V ? V.emptyScript : "";
            for (let p = 0; p < m; p++)
              s.append(c[p], L()), E.nextNode(), a.push({ type: z, index: ++r });
            s.append(c[m], L());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === wt)
          a.push({ type: z, index: r });
        else {
          let m = -1;
          for (; (m = s.data.indexOf($, m + 1)) !== -1; )
            a.push({ type: te, index: r }), m += $.length - 1;
        }
      r++;
    }
    if (g.length !== o)
      throw new Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`' + t.join("${...}") + "`");
    l && l({
      kind: "template prep",
      template: this,
      clonableTemplate: this.el,
      parts: this.parts,
      strings: t
    });
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @nocollapse */
  static createElement(t, e) {
    const i = S.createElement("template");
    return i.innerHTML = t, i;
  }
}
function v(n, t, e = n, i) {
  if (t === C)
    return t;
  let s = i !== void 0 ? e.__directives?.[i] : e.__directive;
  const r = k(t) ? void 0 : (
    // This property needs to remain unminified.
    t._$litDirective$
  );
  return s?.constructor !== r && (s?._$notifyDirectiveConnectionChanged?.(!1), r === void 0 ? s = void 0 : (s = new r(n), s._$initialize(n, e, i)), i !== void 0 ? (e.__directives ??= [])[i] = s : e.__directive = s), s !== void 0 && (t = v(n, s._$resolve(n, t.values), s, i)), t;
}
class ie {
  constructor(t, e) {
    this._$parts = [], this._$disconnectableChildren = void 0, this._$template = t, this._$parent = e;
  }
  // Called by ChildPart parentNode getter
  get parentNode() {
    return this._$parent.parentNode;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  // This method is separate from the constructor because we need to return a
  // DocumentFragment and we don't want to hold onto it with an instance field.
  _clone(t) {
    const { el: { content: e }, parts: i } = this._$template, s = (t?.creationScope ?? S).importNode(e, !0);
    E.currentNode = s;
    let r = E.nextNode(), o = 0, u = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === z ? d = new W(r, r.nextSibling, this, t) : a.type === X ? d = new a.ctor(r, a.name, a.strings, this, t) : a.type === tt && (d = new oe(r, this, t)), this._$parts.push(d), a = i[++u];
      }
      o !== a?.index && (r = E.nextNode(), o++);
    }
    return E.currentNode = S, s;
  }
  _update(t) {
    let e = 0;
    for (const i of this._$parts)
      i !== void 0 && (l && l({
        kind: "set part",
        part: i,
        value: t[e],
        valueIndex: e,
        values: t,
        templateInstance: this
      }), i.strings !== void 0 ? (i._$setValue(t, i, e), e += i.strings.length - 2) : i._$setValue(t[e])), e++;
  }
}
class W {
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent?._$isConnected ?? this.__isConnected;
  }
  constructor(t, e, i, s) {
    this.type = z, this._$committedValue = h, this._$disconnectableChildren = void 0, this._$startNode = t, this._$endNode = e, this._$parent = i, this.options = s, this.__isConnected = s?.isConnected ?? !0, this._textSanitizer = void 0;
  }
  /**
   * The parent node into which the part renders its content.
   *
   * A ChildPart's content consists of a range of adjacent child nodes of
   * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
   * `.endNode`).
   *
   * - If both `.startNode` and `.endNode` are non-null, then the part's content
   * consists of all siblings between `.startNode` and `.endNode`, exclusively.
   *
   * - If `.startNode` is non-null but `.endNode` is null, then the part's
   * content consists of all siblings following `.startNode`, up to and
   * including the last child of `.parentNode`. If `.endNode` is non-null, then
   * `.startNode` will always be non-null.
   *
   * - If both `.endNode` and `.startNode` are null, then the part's content
   * consists of all child nodes of `.parentNode`.
   */
  get parentNode() {
    let t = y(this._$startNode).parentNode;
    const e = this._$parent;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  /**
   * The part's leading marker node, if any. See `.parentNode` for more
   * information.
   */
  get startNode() {
    return this._$startNode;
  }
  /**
   * The part's trailing marker node, if any. See `.parentNode` for more
   * information.
   */
  get endNode() {
    return this._$endNode;
  }
  _$setValue(t, e = this) {
    if (this.parentNode === null)
      throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");
    if (t = v(this, t, e), k(t))
      t === h || t == null || t === "" ? (this._$committedValue !== h && (l && l({
        kind: "commit nothing to child",
        start: this._$startNode,
        end: this._$endNode,
        parent: this._$parent,
        options: this.options
      }), this._$clear()), this._$committedValue = h) : t !== this._$committedValue && t !== C && this._commitText(t);
    else if (t._$litType$ !== void 0)
      this._commitTemplateResult(t);
    else if (t.nodeType !== void 0) {
      if (this.options?.host === t) {
        this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"), console.warn("Attempted to render the template host", t, "inside itself. This is almost always a mistake, and in dev mode ", "we render some warning text. In production however, we'll ", "render it, which will usually result in an error, and sometimes ", "in the element disappearing from the DOM.");
        return;
      }
      this._commitNode(t);
    } else
      jt(t) ? this._commitIterable(t) : this._commitText(t);
  }
  _insert(t) {
    return y(y(this._$startNode).parentNode).insertBefore(t, this._$endNode);
  }
  _commitNode(t) {
    if (this._$committedValue !== t) {
      if (this._$clear(), D !== bt) {
        const e = this._$startNode.parentNode?.nodeName;
        if (e === "STYLE" || e === "SCRIPT") {
          let i = "Forbidden";
          throw e === "STYLE" ? i = "Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets." : i = "Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.", new Error(i);
        }
      }
      l && l({
        kind: "commit node",
        start: this._$startNode,
        parent: this._$parent,
        value: t,
        options: this.options
      }), this._$committedValue = this._insert(t);
    }
  }
  _commitText(t) {
    if (this._$committedValue !== h && k(this._$committedValue)) {
      const e = y(this._$startNode).nextSibling;
      this._textSanitizer === void 0 && (this._textSanitizer = dt()), t = this._textSanitizer(t), l && l({
        kind: "commit text",
        node: e,
        value: t,
        options: this.options
      }), e.data = t;
    } else {
      const e = S.createTextNode("");
      this._commitNode(e), this._textSanitizer === void 0 && (this._textSanitizer = dt()), t = this._textSanitizer(t), l && l({
        kind: "commit text",
        node: e,
        value: t,
        options: this.options
      }), e.data = t;
    }
    this._$committedValue = t;
  }
  _commitTemplateResult(t) {
    const { values: e, ["_$litType$"]: i } = t, s = typeof i == "number" ? this._$getTemplate(t) : (i.el === void 0 && (i.el = A.createElement(Et(i.h, i.h[0]), this.options)), i);
    if (this._$committedValue?._$template === s)
      l && l({
        kind: "template updating",
        template: s,
        instance: this._$committedValue,
        parts: this._$committedValue._$parts,
        options: this.options,
        values: e
      }), this._$committedValue._update(e);
    else {
      const r = new ie(s, this), o = r._clone(this.options);
      l && l({
        kind: "template instantiated",
        template: s,
        instance: r,
        parts: r._$parts,
        options: this.options,
        fragment: o,
        values: e
      }), r._update(e), l && l({
        kind: "template instantiated and updated",
        template: s,
        instance: r,
        parts: r._$parts,
        options: this.options,
        fragment: o,
        values: e
      }), this._commitNode(o), this._$committedValue = r;
    }
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @internal */
  _$getTemplate(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new A(t)), e;
  }
  _commitIterable(t) {
    Pt(this._$committedValue) || (this._$committedValue = [], this._$clear());
    const e = this._$committedValue;
    let i = 0, s;
    for (const r of t)
      i === e.length ? e.push(s = new W(this._insert(L()), this._insert(L()), this, this.options)) : s = e[i], s._$setValue(r), i++;
    i < e.length && (this._$clear(s && y(s._$endNode).nextSibling, i), e.length = i);
  }
  /**
   * Removes the nodes contained within this Part from the DOM.
   *
   * @param start Start node to clear from, for clearing a subset of the part's
   *     DOM (used when truncating iterables)
   * @param from  When `start` is specified, the index within the iterable from
   *     which ChildParts are being removed, used for disconnecting directives in
   *     those Parts.
   *
   * @internal
   */
  _$clear(t = y(this._$startNode).nextSibling, e) {
    for (this._$notifyConnectionChanged?.(!1, !0, e); t && t !== this._$endNode; ) {
      const i = y(t).nextSibling;
      y(t).remove(), t = i;
    }
  }
  /**
   * Implementation of RootPart's `isConnected`. Note that this metod
   * should only be called on `RootPart`s (the `ChildPart` returned from a
   * top-level `render()` call). It has no effect on non-root ChildParts.
   * @param isConnected Whether to set
   * @internal
   */
  setConnected(t) {
    if (this._$parent === void 0)
      this.__isConnected = t, this._$notifyConnectionChanged?.(t);
    else
      throw new Error("part.setConnected() may only be called on a RootPart returned from render().");
  }
}
class q {
  get tagName() {
    return this.element.tagName;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  constructor(t, e, i, s, r) {
    this.type = X, this._$committedValue = h, this._$disconnectableChildren = void 0, this.element = t, this.name = e, this._$parent = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$committedValue = new Array(i.length - 1).fill(new String()), this.strings = i) : this._$committedValue = h, this._sanitizer = void 0;
  }
  /**
   * Sets the value of this part by resolving the value from possibly multiple
   * values and static strings and committing it to the DOM.
   * If this part is single-valued, `this._strings` will be undefined, and the
   * method will be called with a single value argument. If this part is
   * multi-value, `this._strings` will be defined, and the method is called
   * with the value array of the part's owning TemplateInstance, and an offset
   * into the value array from which the values should be read.
   * This method is overloaded this way to eliminate short-lived array slices
   * of the template instance values, and allow a fast-path for single-valued
   * parts.
   *
   * @param value The part value, or an array of values for multi-valued parts
   * @param valueIndex the index to start reading values from. `undefined` for
   *   single-valued parts
   * @param noCommit causes the part to not commit its value to the DOM. Used
   *   in hydration to prime attribute parts with their first-rendered value,
   *   but not set the attribute, and in SSR to no-op the DOM operation and
   *   capture the value for serialization.
   *
   * @internal
   */
  _$setValue(t, e = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = v(this, t, e, 0), o = !k(t) || t !== this._$committedValue && t !== C, o && (this._$committedValue = t);
    else {
      const u = t;
      t = r[0];
      let a, d;
      for (a = 0; a < r.length - 1; a++)
        d = v(this, u[i + a], e, a), d === C && (d = this._$committedValue[a]), o ||= !k(d) || d !== this._$committedValue[a], d === h ? t = h : t !== h && (t += (d ?? "") + r[a + 1]), this._$committedValue[a] = d;
    }
    o && !s && this._commitValue(t);
  }
  /** @internal */
  _commitValue(t) {
    t === h ? y(this.element).removeAttribute(this.name) : (this._sanitizer === void 0 && (this._sanitizer = D(this.element, this.name)), t = this._sanitizer(t ?? ""), l && l({
      kind: "commit attribute",
      element: this.element,
      name: this.name,
      value: t,
      options: this.options
    }), y(this.element).setAttribute(this.name, t ?? ""));
  }
}
class se extends q {
  constructor() {
    super(...arguments), this.type = Zt;
  }
  /** @internal */
  _commitValue(t) {
    this._sanitizer === void 0 && (this._sanitizer = D(this.element, this.name)), t = this._sanitizer(t), l && l({
      kind: "commit property",
      element: this.element,
      name: this.name,
      value: t,
      options: this.options
    }), this.element[this.name] = t === h ? void 0 : t;
  }
}
class ne extends q {
  constructor() {
    super(...arguments), this.type = Kt;
  }
  /** @internal */
  _commitValue(t) {
    l && l({
      kind: "commit boolean attribute",
      element: this.element,
      name: this.name,
      value: !!(t && t !== h),
      options: this.options
    }), y(this.element).toggleAttribute(this.name, !!t && t !== h);
  }
}
class re extends q {
  constructor(t, e, i, s, r) {
    if (super(t, e, i, s, r), this.type = Xt, this.strings !== void 0)
      throw new Error(`A \`<${t.localName}>\` has a \`@${e}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`);
  }
  // EventPart does not use the base _$setValue/_resolveValue implementation
  // since the dirty checking is more complex
  /** @internal */
  _$setValue(t, e = this) {
    if (t = v(this, t, e, 0) ?? h, t === C)
      return;
    const i = this._$committedValue, s = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== h && (i === h || s);
    l && l({
      kind: "commit event listener",
      element: this.element,
      name: this.name,
      value: t,
      options: this.options,
      removeListener: s,
      addListener: r,
      oldListener: i
    }), s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$committedValue = t;
  }
  handleEvent(t) {
    typeof this._$committedValue == "function" ? this._$committedValue.call(this.options?.host ?? this.element, t) : this._$committedValue.handleEvent(t);
  }
}
class oe {
  constructor(t, e, i) {
    this.element = t, this.type = tt, this._$disconnectableChildren = void 0, this._$parent = e, this.options = i;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(t) {
    l && l({
      kind: "commit to element binding",
      element: this.element,
      value: t,
      options: this.options
    }), v(this, t);
  }
}
const ae = _.litHtmlPolyfillSupportDevMode;
ae?.(A, W);
(_.litHtmlVersions ??= []).push("3.1.3");
_.litHtmlVersions.length > 1 && O("multiple-versions", "Multiple versions of Lit loaded. Loading multiple versions is not recommended.");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
}, de = (n) => (...t) => ({
  // This property needs to remain unminified.
  _$litDirective$: n,
  values: t
});
class ce {
  constructor(t) {
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  /** @internal */
  _$initialize(t, e, i) {
    this.__part = t, this._$parent = e, this.__attributeIndex = i;
  }
  /** @internal */
  _$resolve(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he = 1;
class et extends ce {
  constructor(t) {
    if (super(t), this._value = h, t.type !== le.CHILD)
      throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`);
  }
  render(t) {
    if (t === h || t == null)
      return this._templateResult = void 0, this._value = t;
    if (t === C)
      return t;
    if (typeof t != "string")
      throw new Error(`${this.constructor.directiveName}() called with a non-string value`);
    if (t === this._value)
      return this._templateResult;
    this._value = t;
    const e = [t];
    return e.raw = e, this._templateResult = {
      // Cast to a known set of integers that satisfy ResultType so that we
      // don't have to export ResultType and possibly encourage this pattern.
      // This property needs to remain unminified.
      _$litType$: this.constructor.resultType,
      strings: e,
      values: []
    };
  }
}
et.directiveName = "unsafeHTML";
et.resultType = he;
const _t = de(et), pe = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>';
function ue(n) {
  return n.textContent.trim() === "";
}
class Q extends Ct {
  constructor() {
    super();
    M(this, "_avisTask", new Wt(this, {
      task: async ([e, i, s], { signal: r }) => {
        const o = new URL(`${i}/${s}`, e), u = await fetch(o, {
          headers: {
            Accept: "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          signal: r
        });
        if (!u.ok)
          throw new Error(reaponse.status);
        return u.json();
      },
      args: () => [this.service, this.contexte, this.niveau]
    }));
    this.service = "https://avis.bib.umontreal.ca", this.contexte = "site-web-dev", this.niveau = "important", this.boutonFermer = !1;
  }
  _onBtnFermerClick() {
    alert("Fonction à venir!");
  }
  _renderBoutonFermer() {
    return this.boutonFermer ? F`<button class="btn-close" aria-label="Fermer" @click="${this._onBtnFermerClick}">${_t(pe)}</button>` : null;
  }
  _renderAvis(e) {
    return e ? F`<div class="container"><div class="inner"><div class="message">${_t(e)}</div>${this._renderBoutonFermer()}</div></div>` : null;
  }
  _renderRemote() {
    return this._avisTask.render({
      pending: () => F``,
      complete: (e) => this._renderAvis(e.message),
      error: (e) => (console.log(e), null)
    });
  }
  _renderLocal() {
    return this._renderAvis("<slot />");
  }
  render() {
    return ue(this) ? this._renderRemote() : this._renderLocal();
  }
}
M(Q, "properties", {
  service: {
    type: String
  },
  contexte: {
    type: String,
    default: "site-web"
  },
  niveau: {
    type: String
  },
  boutonFermer: {
    type: Boolean
  }
}), M(Q, "styles", vt`*,:host{box-sizing:border-box}:host{display:block;background:var(--bib-avis-bg-color,#fffac6)}.inner{display:flex;align-items:center;max-width:1220px;margin:0 auto;padding:11px 19px}.message{flex-grow:1;min-height:24px}.btn-close{display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0;border:0;margin:0;cursor:pointer;user-select:none;vertical-align:middle;appearance:none;text-decoration:none;text-align:center;flex:0 0 auto;font-size:1.5rem;font-size:36px;font-weight:700;line-height:1;position:relative;padding:8px;padding:0;border-radius:50%;overflow:visible;color:var(--bib-btn-close-color,rgba(0,0,0,.4));transition:all 150ms cubic-bezier(.4,0,.2,1) 0s}.btn-close:hover{color:var(--bib-btn-close-hover-color,rgba(0,0,0,.8))}.btn-close::after{content:'';position:absolute;width:calc(100% + 16px);height:calc(100% + 16px);border-radius:50%;background-color:transparent;transition:background-color 150ms cubic-bezier(.4,0,.2,1) 0s}.btn-close:hover::after{background-color:rgba(0,0,0,.04)}.btn-close>svg{fill:currentColor}`);
customElements.define("bib-avis", Q);
export {
  Q as BibAvis
};
//# sourceMappingURL=bib-avis.js.map
