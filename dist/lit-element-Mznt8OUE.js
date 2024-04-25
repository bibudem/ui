/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, Z = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = Symbol(), te = /* @__PURE__ */ new WeakMap();
class me {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== K)
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this._strings = t;
  }
  // This is a getter so that it's lazy. In practice, this means stylesheets
  // are not created until the first element instance is made.
  get styleSheet() {
    let e = this._styleSheet;
    const t = this._strings;
    if (Z && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = te.get(t)), e === void 0 && ((this._styleSheet = e = new CSSStyleSheet()).replaceSync(this.cssText), i && te.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}
const we = (s) => {
  if (s._$cssResult$ === !0)
    return s.cssText;
  if (typeof s == "number")
    return s;
  throw new Error(`Value passed to 'css' function must be a 'css' function result: ${s}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`);
}, Te = (s) => new me(typeof s == "string" ? s : String(s), void 0, K), rt = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, n, r) => i + we(n) + s[r + 1], s[0]);
  return new me(t, s, K);
}, Ee = (s, e) => {
  if (Z)
    s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else
    for (const t of e) {
      const i = document.createElement("style"), n = z.litNonce;
      n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, s.appendChild(i);
    }
}, xe = (s) => {
  let e = "";
  for (const t of s.cssRules)
    e += t.cssText;
  return Te(e);
}, ie = Z ? (s) => s : (s) => s instanceof CSSStyleSheet ? xe(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ce, defineProperty: Ne, getOwnPropertyDescriptor: se, getOwnPropertyNames: Ae, getOwnPropertySymbols: Re, getPrototypeOf: ne } = Object, S = globalThis;
let y;
const re = S.trustedTypes, ve = re ? re.emptyScript : "", fe = S.reactiveElementPolyfillSupportDevMode;
{
  const s = S.litIssuedWarnings ??= /* @__PURE__ */ new Set();
  y = (e, t) => {
    t += ` See https://lit.dev/msg/${e} for more information.`, s.has(t) || (console.warn(t), s.add(t));
  }, y("dev-mode", "Lit is in dev mode. Not recommended for production!"), S.ShadyDOM?.inUse && fe === void 0 && y("polyfill-support-missing", "Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.");
}
const ke = (s) => {
  S.emitLitDebugLogEvents && S.dispatchEvent(new CustomEvent("lit-debug", {
    detail: s
  }));
}, x = (s, e) => s, Q = {
  toAttribute(s, e) {
    switch (e) {
      case Boolean:
        s = s ? ve : null;
        break;
      case Object:
      case Array:
        s = s == null ? s : JSON.stringify(s);
        break;
    }
    return s;
  },
  fromAttribute(s, e) {
    let t = s;
    switch (e) {
      case Boolean:
        t = s !== null;
        break;
      case Number:
        t = s === null ? null : Number(s);
        break;
      case Object:
      case Array:
        try {
          t = JSON.parse(s);
        } catch {
          t = null;
        }
        break;
    }
    return t;
  }
}, _e = (s, e) => !Ce(s, e), oe = {
  attribute: !0,
  type: String,
  converter: Q,
  reflect: !1,
  hasChanged: _e
};
Symbol.metadata ??= Symbol("metadata");
S.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class $ extends HTMLElement {
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
  static addInitializer(e) {
    this.__prepare(), (this._initializers ??= []).push(e);
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
  static createProperty(e, t = oe) {
    if (t.state && (t.attribute = !1), this.__prepare(), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = (
        // Use Symbol.for in dev mode to make it easier to maintain state
        // when doing HMR.
        Symbol.for(`${String(e)} (@property() cache)`)
      ), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && Ne(this.prototype, e, n);
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
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: r } = se(this.prototype, e) ?? {
      get() {
        return this[t];
      },
      set(o) {
        this[t] = o;
      }
    };
    if (n == null) {
      if ("value" in (se(this.prototype, e) ?? {}))
        throw new Error(`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);
      y("reactive-property-without-getter", `Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`);
    }
    return {
      get() {
        return n?.call(this);
      },
      set(o) {
        const m = n?.call(this);
        r.call(this, o), this.requestUpdate(e, m, i);
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
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? oe;
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
    const e = ne(this);
    e.finalize(), e._initializers !== void 0 && (this._initializers = [...e._initializers]), this.elementProperties = new Map(e.elementProperties);
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
      const t = this.properties, i = [
        ...Ae(t),
        ...Re(t)
      ];
      for (const n of i)
        this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0)
        for (const [i, n] of t)
          this.elementProperties.set(i, n);
    }
    this.__attributeToPropertyMap = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const n = this.__attributeNameForProperty(t, i);
      n !== void 0 && this.__attributeToPropertyMap.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles), this.hasOwnProperty("createProperty") && y("no-override-create-property", "Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators"), this.hasOwnProperty("getPropertyDescriptor") && y("no-override-get-property-descriptor", "Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators");
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
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i)
        t.unshift(ie(n));
    } else
      e !== void 0 && t.push(ie(e));
    return t;
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */
  static __attributeNameForProperty(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this.__instanceProperties = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this.__reflectingProperty = null, this.__initialize();
  }
  /**
   * Internal only override point for customizing work done when elements
   * are constructed.
   */
  __initialize() {
    this.__updatePromise = new Promise((e) => this.enableUpdating = e), this._$changedProperties = /* @__PURE__ */ new Map(), this.__saveInstanceProperties(), this.requestUpdate(), this.constructor._initializers?.forEach((e) => e(this));
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
  addController(e) {
    (this.__controllers ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  /**
   * Removes a `ReactiveController` from the element.
   * @category controllers
   */
  removeController(e) {
    this.__controllers?.delete(e);
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
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys())
      this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this.__instanceProperties = e);
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
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ee(e, this.constructor.elementStyles), e;
  }
  /**
   * On first connection, creates the element's renderRoot, sets up
   * element styling, and enables updating.
   * @category lifecycle
   */
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this.__controllers?.forEach((e) => e.hostConnected?.());
  }
  /**
   * Note, this method should be considered final and not overridden. It is
   * overridden on the element instance with a function that triggers the first
   * update.
   * @category updates
   */
  enableUpdating(e) {
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   * @category lifecycle
   */
  disconnectedCallback() {
    this.__controllers?.forEach((e) => e.hostDisconnected?.());
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
  attributeChangedCallback(e, t, i) {
    this._$attributeToProperty(e, i);
  }
  __propertyToAttribute(e, t) {
    const n = this.constructor.elementProperties.get(e), r = this.constructor.__attributeNameForProperty(e, n);
    if (r !== void 0 && n.reflect === !0) {
      const m = (n.converter?.toAttribute !== void 0 ? n.converter : Q).toAttribute(t, n.type);
      this.constructor.enabledWarnings.includes("migration") && m === void 0 && y("undefined-attribute-value", `The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`), this.__reflectingProperty = e, m == null ? this.removeAttribute(r) : this.setAttribute(r, m), this.__reflectingProperty = null;
    }
  }
  /** @internal */
  _$attributeToProperty(e, t) {
    const i = this.constructor, n = i.__attributeToPropertyMap.get(e);
    if (n !== void 0 && this.__reflectingProperty !== n) {
      const r = i.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Q;
      this.__reflectingProperty = n, this[n] = o.fromAttribute(
        t,
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
  requestUpdate(e, t, i) {
    if (e !== void 0) {
      e instanceof Event && y("", "The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()"), i ??= this.constructor.getPropertyOptions(e);
      const n = i.hasChanged ?? _e, r = this[e];
      if (n(r, t))
        this._$changeProperty(e, t, i);
      else
        return;
    }
    this.isUpdatePending === !1 && (this.__updatePromise = this.__enqueueUpdate());
  }
  /**
   * @internal
   */
  _$changeProperty(e, t, i) {
    this._$changedProperties.has(e) || this._$changedProperties.set(e, t), i.reflect === !0 && this.__reflectingProperty !== e && (this.__reflectingProperties ??= /* @__PURE__ */ new Set()).add(e);
  }
  /**
   * Sets up the element to asynchronously update.
   */
  async __enqueueUpdate() {
    this.isUpdatePending = !0;
    try {
      await this.__updatePromise;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
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
    const e = this.performUpdate();
    return this.constructor.enabledWarnings.includes("async-perform-update") && typeof e?.then == "function" && y("async-perform-update", `Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`), e;
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
    if (ke?.({ kind: "update" }), !this.hasUpdated) {
      this.renderRoot ??= this.createRenderRoot();
      {
        const r = [...this.constructor.elementProperties.keys()].filter((o) => this.hasOwnProperty(o) && o in ne(this));
        if (r.length)
          throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${r.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`);
      }
      if (this.__instanceProperties) {
        for (const [n, r] of this.__instanceProperties)
          this[n] = r;
        this.__instanceProperties = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [n, r] of i)
          r.wrapped === !0 && !this._$changedProperties.has(n) && this[n] !== void 0 && this._$changeProperty(n, this[n], r);
    }
    let e = !1;
    const t = this._$changedProperties;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this.__controllers?.forEach((i) => i.hostUpdate?.()), this.update(t)) : this.__markUpdated();
    } catch (i) {
      throw e = !1, this.__markUpdated(), i;
    }
    e && this._$didUpdate(t);
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
  willUpdate(e) {
  }
  // Note, this is an override point for polyfill-support.
  // @internal
  _$didUpdate(e) {
    this.__controllers?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e), this.isUpdatePending && this.constructor.enabledWarnings.includes("change-in-update") && y("change-in-update", `Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`);
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
  shouldUpdate(e) {
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
  update(e) {
    this.__reflectingProperties &&= this.__reflectingProperties.forEach((t) => this.__propertyToAttribute(t, this[t])), this.__markUpdated();
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
  updated(e) {
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
  firstUpdated(e) {
  }
}
$.elementStyles = [];
$.shadowRootOptions = { mode: "open" };
$[x("elementProperties")] = /* @__PURE__ */ new Map();
$[x("finalized")] = /* @__PURE__ */ new Map();
fe?.({ ReactiveElement: $ });
{
  $.enabledWarnings = [
    "change-in-update",
    "async-perform-update"
  ];
  const s = function(e) {
    e.hasOwnProperty(x("enabledWarnings")) || (e.enabledWarnings = e.enabledWarnings.slice());
  };
  $.enableWarning = function(e) {
    s(this), this.enabledWarnings.includes(e) || this.enabledWarnings.push(e);
  }, $.disableWarning = function(e) {
    s(this);
    const t = this.enabledWarnings.indexOf(e);
    t >= 0 && this.enabledWarnings.splice(t, 1);
  };
}
(S.reactiveElementVersions ??= []).push("2.0.4");
S.reactiveElementVersions.length > 1 && y("multiple-versions", "Multiple versions of Lit loaded. Loading multiple versions is not recommended.");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const f = globalThis, d = (s) => {
  f.emitLitDebugLogEvents && f.dispatchEvent(new CustomEvent("lit-debug", {
    detail: s
  }));
};
let Ue = 0, R;
f.litIssuedWarnings ??= /* @__PURE__ */ new Set(), R = (s, e) => {
  e += s ? ` See https://lit.dev/msg/${s} for more information.` : "", f.litIssuedWarnings.has(e) || (console.warn(e), f.litIssuedWarnings.add(e));
}, R("dev-mode", "Lit is in dev mode. Not recommended for production!");
const g = f.ShadyDOM?.inUse && f.ShadyDOM?.noPatch === !0 ? f.ShadyDOM.wrap : (s) => s, I = f.trustedTypes, ae = I ? I.createPolicy("lit-html", {
  createHTML: (s) => s
}) : void 0, Oe = (s) => s, W = (s, e, t) => Oe, Me = (s) => {
  if (E !== W)
    throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");
  E = s;
}, Ve = () => {
  E = W;
}, Y = (s, e, t) => E(s, e, t), ge = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, ye = "?" + b, ze = `<${ye}>`, T = document, v = () => T.createComment(""), k = (s) => s === null || typeof s != "object" && typeof s != "function", be = Array.isArray, De = (s) => be(s) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
typeof s?.[Symbol.iterator] == "function", B = `[ 	
\f\r]`, Ie = `[^ 	
\f\r"'\`<>=]`, Le = `[^\\s"'>=/]`, A = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, de = 1, j = 2, We = 3, le = /-->/g, ce = />/g, P = new RegExp(`>|${B}(?:(${Le}+)(${B}*=${B}*(?:${Ie}|("|')|))|$)`, "g"), He = 0, he = 1, Fe = 2, pe = 3, q = /'/g, J = /"/g, $e = /^(?:script|style|textarea|title)$/i, Be = 1, G = 2, X = 1, L = 2, je = 3, qe = 4, Je = 5, ee = 6, Qe = 7, Ye = (s) => (e, ...t) => (e.some((i) => i === void 0) && console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`), t.some((i) => i?._$litStatic$) && R("", `Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`), {
  // This property needs to remain unminified.
  _$litType$: s,
  strings: e,
  values: t
}), ot = Ye(Be), C = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ue = /* @__PURE__ */ new WeakMap(), w = T.createTreeWalker(
  T,
  129
  /* NodeFilter.SHOW_{ELEMENT|COMMENT} */
);
let E = W;
function Se(s, e) {
  if (!Array.isArray(s) || !s.hasOwnProperty("raw")) {
    let t = "invalid template strings array";
    throw t = `
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
`), new Error(t);
  }
  return ae !== void 0 ? ae.createHTML(e) : e;
}
const Ge = (s, e) => {
  const t = s.length - 1, i = [];
  let n = e === G ? "<svg>" : "", r, o = A;
  for (let a = 0; a < t; a++) {
    const l = s[a];
    let _ = -1, c, u = 0, h;
    for (; u < l.length && (o.lastIndex = u, h = o.exec(l), h !== null); )
      if (u = o.lastIndex, o === A) {
        if (h[de] === "!--")
          o = le;
        else if (h[de] !== void 0)
          o = ce;
        else if (h[j] !== void 0)
          $e.test(h[j]) && (r = new RegExp(`</${h[j]}`, "g")), o = P;
        else if (h[We] !== void 0)
          throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions");
      } else
        o === P ? h[He] === ">" ? (o = r ?? A, _ = -1) : h[he] === void 0 ? _ = -2 : (_ = o.lastIndex - h[Fe].length, c = h[he], o = h[pe] === void 0 ? P : h[pe] === '"' ? J : q) : o === J || o === q ? o = P : o === le || o === ce ? o = A : (o = P, r = void 0);
    console.assert(_ === -1 || o === P || o === q || o === J, "unexpected parse state B");
    const M = o === P && s[a + 1].startsWith("/>") ? " " : "";
    n += o === A ? l + ze : _ >= 0 ? (i.push(c), l.slice(0, _) + ge + l.slice(_) + b + M) : l + b + (_ === -2 ? a : M);
  }
  const m = n + (s[t] || "<?>") + (e === G ? "</svg>" : "");
  return [Se(s, m), i];
};
class U {
  constructor({ strings: e, ["_$litType$"]: t }, i) {
    this.parts = [];
    let n, r = 0, o = 0;
    const m = e.length - 1, a = this.parts, [l, _] = Ge(e, t);
    if (this.el = U.createElement(l, i), w.currentNode = this.el.content, t === G) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = w.nextNode()) !== null && a.length < m; ) {
      if (n.nodeType === 1) {
        {
          const c = n.localName;
          if (/^(?:textarea|template)$/i.test(c) && n.innerHTML.includes(b)) {
            const u = `Expressions are not supported inside \`${c}\` elements. See https://lit.dev/msg/expression-in-${c} for more information.`;
            if (c === "template")
              throw new Error(u);
            R("", u);
          }
        }
        if (n.hasAttributes())
          for (const c of n.getAttributeNames())
            if (c.endsWith(ge)) {
              const u = _[o++], M = n.getAttribute(c).split(b), V = /([.?@])?(.*)/.exec(u);
              a.push({
                type: X,
                index: r,
                name: V[2],
                strings: M,
                ctor: V[1] === "." ? Ke : V[1] === "?" ? Xe : V[1] === "@" ? et : H
              }), n.removeAttribute(c);
            } else
              c.startsWith(b) && (a.push({
                type: ee,
                index: r
              }), n.removeAttribute(c));
        if ($e.test(n.tagName)) {
          const c = n.textContent.split(b), u = c.length - 1;
          if (u > 0) {
            n.textContent = I ? I.emptyScript : "";
            for (let h = 0; h < u; h++)
              n.append(c[h], v()), w.nextNode(), a.push({ type: L, index: ++r });
            n.append(c[u], v());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === ye)
          a.push({ type: L, index: r });
        else {
          let u = -1;
          for (; (u = n.data.indexOf(b, u + 1)) !== -1; )
            a.push({ type: Qe, index: r }), u += b.length - 1;
        }
      r++;
    }
    if (_.length !== o)
      throw new Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`' + e.join("${...}") + "`");
    d && d({
      kind: "template prep",
      template: this,
      clonableTemplate: this.el,
      parts: this.parts,
      strings: e
    });
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @nocollapse */
  static createElement(e, t) {
    const i = T.createElement("template");
    return i.innerHTML = e, i;
  }
}
function N(s, e, t = s, i) {
  if (e === C)
    return e;
  let n = i !== void 0 ? t.__directives?.[i] : t.__directive;
  const r = k(e) ? void 0 : (
    // This property needs to remain unminified.
    e._$litDirective$
  );
  return n?.constructor !== r && (n?._$notifyDirectiveConnectionChanged?.(!1), r === void 0 ? n = void 0 : (n = new r(s), n._$initialize(s, t, i)), i !== void 0 ? (t.__directives ??= [])[i] = n : t.__directive = n), n !== void 0 && (e = N(s, n._$resolve(s, e.values), n, i)), e;
}
class Ze {
  constructor(e, t) {
    this._$parts = [], this._$disconnectableChildren = void 0, this._$template = e, this._$parent = t;
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
  _clone(e) {
    const { el: { content: t }, parts: i } = this._$template, n = (e?.creationScope ?? T).importNode(t, !0);
    w.currentNode = n;
    let r = w.nextNode(), o = 0, m = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === L ? l = new O(r, r.nextSibling, this, e) : a.type === X ? l = new a.ctor(r, a.name, a.strings, this, e) : a.type === ee && (l = new tt(r, this, e)), this._$parts.push(l), a = i[++m];
      }
      o !== a?.index && (r = w.nextNode(), o++);
    }
    return w.currentNode = T, n;
  }
  _update(e) {
    let t = 0;
    for (const i of this._$parts)
      i !== void 0 && (d && d({
        kind: "set part",
        part: i,
        value: e[t],
        valueIndex: t,
        values: e,
        templateInstance: this
      }), i.strings !== void 0 ? (i._$setValue(e, i, t), t += i.strings.length - 2) : i._$setValue(e[t])), t++;
  }
}
class O {
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent?._$isConnected ?? this.__isConnected;
  }
  constructor(e, t, i, n) {
    this.type = L, this._$committedValue = p, this._$disconnectableChildren = void 0, this._$startNode = e, this._$endNode = t, this._$parent = i, this.options = n, this.__isConnected = n?.isConnected ?? !0, this._textSanitizer = void 0;
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
    let e = g(this._$startNode).parentNode;
    const t = this._$parent;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
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
  _$setValue(e, t = this) {
    if (this.parentNode === null)
      throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");
    if (e = N(this, e, t), k(e))
      e === p || e == null || e === "" ? (this._$committedValue !== p && (d && d({
        kind: "commit nothing to child",
        start: this._$startNode,
        end: this._$endNode,
        parent: this._$parent,
        options: this.options
      }), this._$clear()), this._$committedValue = p) : e !== this._$committedValue && e !== C && this._commitText(e);
    else if (e._$litType$ !== void 0)
      this._commitTemplateResult(e);
    else if (e.nodeType !== void 0) {
      if (this.options?.host === e) {
        this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"), console.warn("Attempted to render the template host", e, "inside itself. This is almost always a mistake, and in dev mode ", "we render some warning text. In production however, we'll ", "render it, which will usually result in an error, and sometimes ", "in the element disappearing from the DOM.");
        return;
      }
      this._commitNode(e);
    } else
      De(e) ? this._commitIterable(e) : this._commitText(e);
  }
  _insert(e) {
    return g(g(this._$startNode).parentNode).insertBefore(e, this._$endNode);
  }
  _commitNode(e) {
    if (this._$committedValue !== e) {
      if (this._$clear(), E !== W) {
        const t = this._$startNode.parentNode?.nodeName;
        if (t === "STYLE" || t === "SCRIPT") {
          let i = "Forbidden";
          throw t === "STYLE" ? i = "Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets." : i = "Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.", new Error(i);
        }
      }
      d && d({
        kind: "commit node",
        start: this._$startNode,
        parent: this._$parent,
        value: e,
        options: this.options
      }), this._$committedValue = this._insert(e);
    }
  }
  _commitText(e) {
    if (this._$committedValue !== p && k(this._$committedValue)) {
      const t = g(this._$startNode).nextSibling;
      this._textSanitizer === void 0 && (this._textSanitizer = Y(t, "data", "property")), e = this._textSanitizer(e), d && d({
        kind: "commit text",
        node: t,
        value: e,
        options: this.options
      }), t.data = e;
    } else {
      const t = T.createTextNode("");
      this._commitNode(t), this._textSanitizer === void 0 && (this._textSanitizer = Y(t, "data", "property")), e = this._textSanitizer(e), d && d({
        kind: "commit text",
        node: t,
        value: e,
        options: this.options
      }), t.data = e;
    }
    this._$committedValue = e;
  }
  _commitTemplateResult(e) {
    const { values: t, ["_$litType$"]: i } = e, n = typeof i == "number" ? this._$getTemplate(e) : (i.el === void 0 && (i.el = U.createElement(Se(i.h, i.h[0]), this.options)), i);
    if (this._$committedValue?._$template === n)
      d && d({
        kind: "template updating",
        template: n,
        instance: this._$committedValue,
        parts: this._$committedValue._$parts,
        options: this.options,
        values: t
      }), this._$committedValue._update(t);
    else {
      const r = new Ze(n, this), o = r._clone(this.options);
      d && d({
        kind: "template instantiated",
        template: n,
        instance: r,
        parts: r._$parts,
        options: this.options,
        fragment: o,
        values: t
      }), r._update(t), d && d({
        kind: "template instantiated and updated",
        template: n,
        instance: r,
        parts: r._$parts,
        options: this.options,
        fragment: o,
        values: t
      }), this._commitNode(o), this._$committedValue = r;
    }
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @internal */
  _$getTemplate(e) {
    let t = ue.get(e.strings);
    return t === void 0 && ue.set(e.strings, t = new U(e)), t;
  }
  _commitIterable(e) {
    be(this._$committedValue) || (this._$committedValue = [], this._$clear());
    const t = this._$committedValue;
    let i = 0, n;
    for (const r of e)
      i === t.length ? t.push(n = new O(this._insert(v()), this._insert(v()), this, this.options)) : n = t[i], n._$setValue(r), i++;
    i < t.length && (this._$clear(n && g(n._$endNode).nextSibling, i), t.length = i);
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
  _$clear(e = g(this._$startNode).nextSibling, t) {
    for (this._$notifyConnectionChanged?.(!1, !0, t); e && e !== this._$endNode; ) {
      const i = g(e).nextSibling;
      g(e).remove(), e = i;
    }
  }
  /**
   * Implementation of RootPart's `isConnected`. Note that this metod
   * should only be called on `RootPart`s (the `ChildPart` returned from a
   * top-level `render()` call). It has no effect on non-root ChildParts.
   * @param isConnected Whether to set
   * @internal
   */
  setConnected(e) {
    if (this._$parent === void 0)
      this.__isConnected = e, this._$notifyConnectionChanged?.(e);
    else
      throw new Error("part.setConnected() may only be called on a RootPart returned from render().");
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  constructor(e, t, i, n, r) {
    this.type = X, this._$committedValue = p, this._$disconnectableChildren = void 0, this.element = e, this.name = t, this._$parent = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$committedValue = new Array(i.length - 1).fill(new String()), this.strings = i) : this._$committedValue = p, this._sanitizer = void 0;
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
  _$setValue(e, t = this, i, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      e = N(this, e, t, 0), o = !k(e) || e !== this._$committedValue && e !== C, o && (this._$committedValue = e);
    else {
      const m = e;
      e = r[0];
      let a, l;
      for (a = 0; a < r.length - 1; a++)
        l = N(this, m[i + a], t, a), l === C && (l = this._$committedValue[a]), o ||= !k(l) || l !== this._$committedValue[a], l === p ? e = p : e !== p && (e += (l ?? "") + r[a + 1]), this._$committedValue[a] = l;
    }
    o && !n && this._commitValue(e);
  }
  /** @internal */
  _commitValue(e) {
    e === p ? g(this.element).removeAttribute(this.name) : (this._sanitizer === void 0 && (this._sanitizer = E(this.element, this.name, "attribute")), e = this._sanitizer(e ?? ""), d && d({
      kind: "commit attribute",
      element: this.element,
      name: this.name,
      value: e,
      options: this.options
    }), g(this.element).setAttribute(this.name, e ?? ""));
  }
}
class Ke extends H {
  constructor() {
    super(...arguments), this.type = je;
  }
  /** @internal */
  _commitValue(e) {
    this._sanitizer === void 0 && (this._sanitizer = E(this.element, this.name, "property")), e = this._sanitizer(e), d && d({
      kind: "commit property",
      element: this.element,
      name: this.name,
      value: e,
      options: this.options
    }), this.element[this.name] = e === p ? void 0 : e;
  }
}
class Xe extends H {
  constructor() {
    super(...arguments), this.type = qe;
  }
  /** @internal */
  _commitValue(e) {
    d && d({
      kind: "commit boolean attribute",
      element: this.element,
      name: this.name,
      value: !!(e && e !== p),
      options: this.options
    }), g(this.element).toggleAttribute(this.name, !!e && e !== p);
  }
}
class et extends H {
  constructor(e, t, i, n, r) {
    if (super(e, t, i, n, r), this.type = Je, this.strings !== void 0)
      throw new Error(`A \`<${e.localName}>\` has a \`@${t}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`);
  }
  // EventPart does not use the base _$setValue/_resolveValue implementation
  // since the dirty checking is more complex
  /** @internal */
  _$setValue(e, t = this) {
    if (e = N(this, e, t, 0) ?? p, e === C)
      return;
    const i = this._$committedValue, n = e === p && i !== p || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== p && (i === p || n);
    d && d({
      kind: "commit event listener",
      element: this.element,
      name: this.name,
      value: e,
      options: this.options,
      removeListener: n,
      addListener: r,
      oldListener: i
    }), n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$committedValue = e;
  }
  handleEvent(e) {
    typeof this._$committedValue == "function" ? this._$committedValue.call(this.options?.host ?? this.element, e) : this._$committedValue.handleEvent(e);
  }
}
class tt {
  constructor(e, t, i) {
    this.element = e, this.type = ee, this._$disconnectableChildren = void 0, this._$parent = t, this.options = i;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(e) {
    d && d({
      kind: "commit to element binding",
      element: this.element,
      value: e,
      options: this.options
    }), N(this, e);
  }
}
const it = f.litHtmlPolyfillSupportDevMode;
it?.(U, O);
(f.litHtmlVersions ??= []).push("3.1.3");
f.litHtmlVersions.length > 1 && R("multiple-versions", "Multiple versions of Lit loaded. Loading multiple versions is not recommended.");
const D = (s, e, t) => {
  if (e == null)
    throw new TypeError(`The container to render into may not be ${e}`);
  const i = Ue++, n = t?.renderBefore ?? e;
  let r = n._$litPart$;
  if (d && d({
    kind: "begin render",
    id: i,
    value: s,
    container: e,
    options: t,
    part: r
  }), r === void 0) {
    const o = t?.renderBefore ?? null;
    n._$litPart$ = r = new O(e.insertBefore(v(), o), o, void 0, t ?? {});
  }
  return r._$setValue(s), d && d({
    kind: "end render",
    id: i,
    value: s,
    container: e,
    options: t,
    part: r
  }), r;
};
D.setSanitizer = Me, D.createSanitizer = Y, D._testOnlyClearSanitizerFactoryDoNotCallOrElse = Ve;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = (s, e) => s;
let Pe;
{
  const s = globalThis.litIssuedWarnings ??= /* @__PURE__ */ new Set();
  Pe = (e, t) => {
    t += ` See https://lit.dev/msg/${e} for more information.`, s.has(t) || (console.warn(t), s.add(t));
  };
}
class F extends $ {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.__childPart = void 0;
  }
  /**
   * @category rendering
   */
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * @param changedProperties Map of changed properties with old values
   * @category updates
   */
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this.__childPart = D(t, this.renderRoot, this.renderOptions);
  }
  /**
   * Invoked when the component is added to the document's DOM.
   *
   * In `connectedCallback()` you should setup tasks that should only occur when
   * the element is connected to the document. The most common of these is
   * adding event listeners to nodes external to the element, like a keydown
   * event handler added to the window.
   *
   * ```ts
   * connectedCallback() {
   *   super.connectedCallback();
   *   addEventListener('keydown', this._handleKeydown);
   * }
   * ```
   *
   * Typically, anything done in `connectedCallback()` should be undone when the
   * element is disconnected, in `disconnectedCallback()`.
   *
   * @category lifecycle
   */
  connectedCallback() {
    super.connectedCallback(), this.__childPart?.setConnected(!0);
  }
  /**
   * Invoked when the component is removed from the document's DOM.
   *
   * This callback is the main signal to the element that it may no longer be
   * used. `disconnectedCallback()` should ensure that nothing is holding a
   * reference to the element (such as event listeners added to nodes external
   * to the element), so that it is free to be garbage collected.
   *
   * ```ts
   * disconnectedCallback() {
   *   super.disconnectedCallback();
   *   window.removeEventListener('keydown', this._handleKeydown);
   * }
   * ```
   *
   * An element may be re-connected after being disconnected.
   *
   * @category lifecycle
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.__childPart?.setConnected(!1);
  }
  /**
   * Invoked on each update to perform rendering tasks. This method may return
   * any value renderable by lit-html's `ChildPart` - typically a
   * `TemplateResult`. Setting properties inside this method will *not* trigger
   * the element to update.
   * @category rendering
   */
  render() {
    return C;
  }
}
F._$litElement$ = !0;
F[st("finalized")] = !0;
globalThis.litElementHydrateSupport?.({ LitElement: F });
const nt = globalThis.litElementPolyfillSupportDevMode;
nt?.({ LitElement: F });
(globalThis.litElementVersions ??= []).push("4.0.5");
globalThis.litElementVersions.length > 1 && Pe("multiple-versions", "Multiple versions of Lit loaded. Loading multiple versions is not recommended.");
export {
  F as L,
  p as a,
  C as b,
  rt as c,
  ot as h,
  _e as n
};
//# sourceMappingURL=lit-element-Mznt8OUE.js.map
