/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.2.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { n as t, a as e, b as s, L as r, c as i, u as o, h as n } from "./lit-element-BtQrDsEd.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const a = Symbol();
class l {
  get taskComplete() {
    return this._taskComplete || (1 === this.status ? this._taskComplete = new Promise((t2, e2) => {
      this._resolveTaskComplete = t2, this._rejectTaskComplete = e2;
    }) : 3 === this.status ? this._taskComplete = Promise.reject(this._error) : this._taskComplete = Promise.resolve(this._value)), this._taskComplete;
  }
  constructor(t2, e2, s2) {
    this._callId = 0, this.status = 0, (this._host = t2).addController(this);
    const r2 = "object" == typeof e2 ? e2 : { task: e2, args: s2 };
    this._task = r2.task, this._argsFn = r2.args, this._argsEqual = r2.argsEqual ?? h, this._onComplete = r2.onComplete, this._onError = r2.onError, this.autoRun = r2.autoRun ?? true, "initialValue" in r2 && (this._value = r2.initialValue, this.status = 2, this._previousArgs = this._getArgs?.());
  }
  hostUpdate() {
    true === this.autoRun && this._performTask();
  }
  hostUpdated() {
    "afterUpdate" === this.autoRun && this._performTask();
  }
  _getArgs() {
    if (void 0 === this._argsFn)
      return;
    const t2 = this._argsFn();
    if (!Array.isArray(t2))
      throw new Error("The args function must return an array");
    return t2;
  }
  async _performTask() {
    const t2 = this._getArgs(), e2 = this._previousArgs;
    this._previousArgs = t2, t2 === e2 || void 0 === t2 || void 0 !== e2 && this._argsEqual(e2, t2) || await this.run(t2);
  }
  async run(t2) {
    let e2, s2;
    t2 ??= this._getArgs(), this._previousArgs = t2, 1 === this.status ? this._abortController?.abort() : (this._taskComplete = void 0, this._resolveTaskComplete = void 0, this._rejectTaskComplete = void 0), this.status = 1, "afterUpdate" === this.autoRun ? queueMicrotask(() => this._host.requestUpdate()) : this._host.requestUpdate();
    const r2 = ++this._callId;
    this._abortController = new AbortController();
    let i2 = false;
    try {
      e2 = await this._task(t2, { signal: this._abortController.signal });
    } catch (t3) {
      i2 = true, s2 = t3;
    }
    if (this._callId === r2) {
      if (e2 === a)
        this.status = 0;
      else {
        if (false === i2) {
          try {
            this._onComplete?.(e2);
          } catch {
          }
          this.status = 2, this._resolveTaskComplete?.(e2);
        } else {
          try {
            this._onError?.(s2);
          } catch {
          }
          this.status = 3, this._rejectTaskComplete?.(s2);
        }
        this._value = e2, this._error = s2;
      }
      this._host.requestUpdate();
    }
  }
  abort(t2) {
    1 === this.status && this._abortController?.abort(t2);
  }
  get value() {
    return this._value;
  }
  get error() {
    return this._error;
  }
  render(t2) {
    switch (this.status) {
      case 0:
        return t2.initial?.();
      case 1:
        return t2.pending?.();
      case 2:
        return t2.complete?.(this.value);
      case 3:
        return t2.error?.(this.error);
      default:
        throw new Error(`Unexpected status: ${this.status}`);
    }
  }
}
const h = (e2, s2) => e2 === s2 || e2.length === s2.length && e2.every((e3, r2) => !t(e3, s2[r2]));
class c {
  constructor(t2) {
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$initialize(t2, e2, s2) {
    this.__part = t2, this._$parent = e2, this.__attributeIndex = s2;
  }
  _$resolve(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class u extends c {
  constructor(t2) {
    if (super(t2), this._value = e, 2 !== t2.type)
      throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`);
  }
  render(t2) {
    if (t2 === e || null == t2)
      return this._templateResult = void 0, this._value = t2;
    if (t2 === s)
      return t2;
    if ("string" != typeof t2)
      throw new Error(`${this.constructor.directiveName}() called with a non-string value`);
    if (t2 === this._value)
      return this._templateResult;
    this._value = t2;
    const r2 = [t2];
    return r2.raw = r2, this._templateResult = { _$litType$: this.constructor.resultType, strings: r2, values: [] };
  }
}
u.directiveName = "unsafeHTML", u.resultType = 1;
const d = (p = u, (...t2) => ({ _$litDirective$: p, values: t2 }));
var p;
const b = ':host,*{box-sizing:border-box}:host{display:block;font-size:var(--bib-avis-size, var(--md-sys-typescale-title-medium-size, inherit));background:var(--bib-avis-container-color, var(--md-sys-color-warningContainer, #fffac6))}:host([hidden]){display:none}.inner{display:flex;align-items:center;max-width:1220px;margin:0 auto;padding:11px 19px;gap:1em}.message{flex-grow:1;min-height:24px}.btn-close{display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0px;border:0px;margin:0;cursor:pointer;user-select:none;vertical-align:middle;appearance:none;text-decoration:none;text-align:center;flex:0 0 auto;font-size:1.5rem;font-size:36px;font-weight:700;line-height:1;position:relative;padding:0;border-radius:50%;overflow:visible;color:var(--bib-btn-close-color, rgba(0, 0, 0, .4));transition:color .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}.btn-close:after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-height:44px;min-width:44px;width:100%;height:100%}.btn-close:focus:not([disabled]),.btn-close:focus-visible{outline:2px solid #bde4ff;outline-offset:3px}.btn-close:focus:not(:focus-visible){outline:0}.btn-close:hover{color:var(--bib-btn-close-hover-color, rgba(0, 0, 0, .8))}.btn-close:hover:after{background-color:#0000000a}.btn-close:after{width:calc(100% + 16px);height:calc(100% + 16px);border-radius:50%;background-color:transparent;transition:background-color .15s cubic-bezier(.4,0,.2,1) 0ms}.btn-close>svg{fill:currentColor}';
console.log("bibAvisStyles: ", b);
class _ extends r {
  constructor() {
    super();
    __publicField(this, "_avisTask", new l(this, { task: async ([t2, e2, s2], { signal: r2 }) => {
      const i2 = new URL(`${e2}/${s2}`, t2), o2 = await fetch(i2, { headers: { Accept: "application/json" }, signal: r2 });
      if (!o2.ok)
        throw new Error(reaponse.status);
      return o2.json();
    }, args: () => [this.service, this.contexte, this.niveau] }));
    this.service = "https://avis.bib.umontreal.ca", this.contexte = "site-web-dev", this.niveau = "important", this.boutonFermer = false;
  }
  _onBtnFermerClick() {
    alert("Fonction à venir!");
  }
  _renderBoutonFermer() {
    return this.boutonFermer ? n`<button class="btn-close" aria-label="Fermer" @click="${this._onBtnFermerClick}">${d('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>')}</button>` : null;
  }
  _renderAvis(t2) {
    return t2 ? n`<aside class="container"><div class="inner"><div class="message">${d(t2)}</div>${this._renderBoutonFermer()}</div></aside>` : null;
  }
  _renderRemote() {
    return this._avisTask.render({ pending: () => n``, complete: (t2) => this._renderAvis(t2.message), error: (t2) => (console.log(t2), null) });
  }
  _renderLocal() {
    return this._renderAvis("<slot />");
  }
  render() {
    return "" === this.textContent.trim() ? this._renderRemote() : this._renderLocal();
  }
}
__publicField(_, "properties", { service: { type: String }, contexte: { type: String, default: "site-web" }, niveau: { type: String }, boutonFermer: { type: Boolean, attribute: "bouton-fermer" } });
__publicField(_, "styles", [i`${o(b)}`, i``]);
customElements.define("bib-avis", _);
export {
  _ as BibAvis
};
//# sourceMappingURL=bib-avis.js.map
