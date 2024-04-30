var g = Object.defineProperty;
var b = (s, t, e) => t in s ? g(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var a = (s, t, e) => (b(s, typeof t != "symbol" ? t + "" : t, e), e);
import { n as m, a as d, b as f, L as v, c as E, h as c } from "./lit-element-Mznt8OUE.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const r = {
  INITIAL: 0,
  PENDING: 1,
  COMPLETE: 2,
  ERROR: 3
}, k = Symbol();
class T {
  /**
   * A Promise that resolve when the current task run is complete.
   *
   * If a new task run is started while a previous run is pending, the Promise
   * is kept and only resolved when the new run is completed.
   */
  get taskComplete() {
    return this._taskComplete ? this._taskComplete : (this.status === r.PENDING ? this._taskComplete = new Promise((t, e) => {
      this._resolveTaskComplete = t, this._rejectTaskComplete = e;
    }) : this.status === r.ERROR ? this._taskComplete = Promise.reject(this._error) : this._taskComplete = Promise.resolve(this._value), this._taskComplete);
  }
  constructor(t, e, i) {
    this._callId = 0, this.status = r.INITIAL, (this._host = t).addController(this);
    const n = typeof e == "object" ? e : { task: e, args: i };
    this._task = n.task, this._argsFn = n.args, this._argsEqual = n.argsEqual ?? C, this._onComplete = n.onComplete, this._onError = n.onError, this.autoRun = n.autoRun ?? !0, "initialValue" in n && (this._value = n.initialValue, this.status = r.COMPLETE, this._previousArgs = this._getArgs?.());
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
    t ??= this._getArgs(), this._previousArgs = t, this.status === r.PENDING ? this._abortController?.abort() : (this._taskComplete = void 0, this._resolveTaskComplete = void 0, this._rejectTaskComplete = void 0), this.status = r.PENDING;
    let e, i;
    this.autoRun === "afterUpdate" ? queueMicrotask(() => this._host.requestUpdate()) : this._host.requestUpdate();
    const n = ++this._callId;
    this._abortController = new AbortController();
    let o = !1;
    try {
      e = await this._task(t, { signal: this._abortController.signal });
    } catch (l) {
      o = !0, i = l;
    }
    if (this._callId === n) {
      if (e === k)
        this.status = r.INITIAL;
      else {
        if (o === !1) {
          try {
            this._onComplete?.(e);
          } catch {
          }
          this.status = r.COMPLETE, this._resolveTaskComplete?.(e);
        } else {
          try {
            this._onError?.(i);
          } catch {
          }
          this.status = r.ERROR, this._rejectTaskComplete?.(i);
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
    this.status === r.PENDING && this._abortController?.abort(t);
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
      case r.INITIAL:
        return t.initial?.();
      case r.PENDING:
        return t.pending?.();
      case r.COMPLETE:
        return t.complete?.(this.value);
      case r.ERROR:
        return t.error?.(this.error);
      default:
        throw new Error(`Unexpected status: ${this.status}`);
    }
  }
}
const C = (s, t) => s === t || s.length === t.length && s.every((e, i) => !m(e, t[i]));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
}, y = (s) => (...t) => ({
  // This property needs to remain unminified.
  _$litDirective$: s,
  values: t
});
class x {
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
const R = 1;
class u extends x {
  constructor(t) {
    if (super(t), this._value = d, t.type !== w.CHILD)
      throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`);
  }
  render(t) {
    if (t === d || t == null)
      return this._templateResult = void 0, this._value = t;
    if (t === f)
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
u.directiveName = "unsafeHTML";
u.resultType = R;
const _ = y(u), I = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>';
function L(s) {
  return s.textContent.trim() === "";
}
class h extends v {
  constructor() {
    super();
    a(this, "_avisTask", new T(this, {
      task: async ([e, i, n], { signal: o }) => {
        const l = new URL(`${i}/${n}`, e), p = await fetch(l, {
          headers: {
            Accept: "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          signal: o
        });
        if (!p.ok)
          throw new Error(reaponse.status);
        return p.json();
      },
      args: () => [this.service, this.contexte, this.niveau]
    }));
    this.service = "https://avis.bib.umontreal.ca", this.contexte = "site-web-dev", this.niveau = "important", this.boutonFermer = !1;
  }
  _onBtnFermerClick() {
    alert("Fonction à venir!");
  }
  _renderBoutonFermer() {
    return this.boutonFermer ? c`<button class="btn-close" aria-label="Fermer" @click="${this._onBtnFermerClick}">${_(I)}</button>` : null;
  }
  _renderAvis(e) {
    return e ? c`<aside class="container"><div class="inner"><div class="message">${_(e)}</div>${this._renderBoutonFermer()}</div></aside>` : null;
  }
  _renderRemote() {
    return this._avisTask.render({
      pending: () => c``,
      complete: (e) => this._renderAvis(e.message),
      error: (e) => (console.log(e), null)
    });
  }
  _renderLocal() {
    return this._renderAvis("<slot />");
  }
  render() {
    return L(this) ? this._renderRemote() : this._renderLocal();
  }
}
a(h, "properties", {
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
    type: Boolean,
    attribute: "bouton-fermer"
  }
}), a(h, "styles", E`*,:host{box-sizing:border-box}:host{display:block;font-size:var(--bib-avis-size,var(--md-sys-typescale-title-medium-size,inherit));background:var(--bib-avis-container-color,var(--md-sys-color-warningContainer,#fffac6))}.inner{display:flex;align-items:center;max-width:1220px;margin:0 auto;padding:11px 19px;gap:1em}.message{flex-grow:1;min-height:24px}.btn-close{display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0;border:0;margin:0;cursor:pointer;user-select:none;vertical-align:middle;appearance:none;text-decoration:none;text-align:center;flex:0 0 auto;font-size:1.5rem;font-size:36px;font-weight:700;line-height:1;position:relative;padding:8px;padding:0;border-radius:50%;overflow:visible;color:var(--bib-btn-close-color,rgba(0,0,0,.4));transition:all 150ms cubic-bezier(.4,0,.2,1)}.btn-close:hover{color:var(--bib-btn-close-hover-color,rgba(0,0,0,.8))}.btn-close::after{content:'';position:absolute;width:calc(100% + 16px);height:calc(100% + 16px);border-radius:50%;background-color:transparent;transition:background-color 150ms cubic-bezier(.4,0,.2,1) 0s}.btn-close:hover::after{background-color:rgba(0,0,0,.04)}.btn-close>svg{fill:currentColor}`);
customElements.define("bib-avis", h);
export {
  h as BibAvis
};
//# sourceMappingURL=bib-avis.js.map
