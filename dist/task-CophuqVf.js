/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.6.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { n as t } from "./lit-element-BtQrDsEd.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = Symbol();
class e {
  get taskComplete() {
    return this._taskComplete || (1 === this.status ? this._taskComplete = new Promise((t2, s2) => {
      this._resolveTaskComplete = t2, this._rejectTaskComplete = s2;
    }) : 3 === this.status ? this._taskComplete = Promise.reject(this._error) : this._taskComplete = Promise.resolve(this._value)), this._taskComplete;
  }
  constructor(t2, s2, e2) {
    this._callId = 0, this.status = 0, (this._host = t2).addController(this);
    const i = "object" == typeof s2 ? s2 : { task: s2, args: e2 };
    this._task = i.task, this._argsFn = i.args, this._argsEqual = i.argsEqual ?? r, this._onComplete = i.onComplete, this._onError = i.onError, this.autoRun = i.autoRun ?? true, "initialValue" in i && (this._value = i.initialValue, this.status = 2, this._previousArgs = this._getArgs?.());
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
    const t2 = this._getArgs(), s2 = this._previousArgs;
    this._previousArgs = t2, t2 === s2 || void 0 === t2 || void 0 !== s2 && this._argsEqual(s2, t2) || await this.run(t2);
  }
  async run(t2) {
    let e2, r2;
    t2 ??= this._getArgs(), this._previousArgs = t2, 1 === this.status ? this._abortController?.abort() : (this._taskComplete = void 0, this._resolveTaskComplete = void 0, this._rejectTaskComplete = void 0), this.status = 1, "afterUpdate" === this.autoRun ? queueMicrotask(() => this._host.requestUpdate()) : this._host.requestUpdate();
    const i = ++this._callId;
    this._abortController = new AbortController();
    let a = false;
    try {
      e2 = await this._task(t2, { signal: this._abortController.signal });
    } catch (t3) {
      a = true, r2 = t3;
    }
    if (this._callId === i) {
      if (e2 === s)
        this.status = 0;
      else {
        if (false === a) {
          try {
            this._onComplete?.(e2);
          } catch {
          }
          this.status = 2, this._resolveTaskComplete?.(e2);
        } else {
          try {
            this._onError?.(r2);
          } catch {
          }
          this.status = 3, this._rejectTaskComplete?.(r2);
        }
        this._value = e2, this._error = r2;
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
const r = (s2, e2) => s2 === e2 || s2.length === e2.length && s2.every((s3, r2) => !t(s3, e2[r2]));
export {
  e as T
};
//# sourceMappingURL=task-CophuqVf.js.map
