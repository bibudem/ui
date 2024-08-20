/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.14.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { f as t } from "./lit-element-Dj1nHH6C.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = Symbol();
class i {
  get taskComplete() {
    return this.t || (1 === this.status ? this.t = new Promise((t2, s2) => {
      this.i = t2, this.o = s2;
    }) : 3 === this.status ? this.t = Promise.reject(this.h) : this.t = Promise.resolve(this.l)), this.t;
  }
  constructor(t2, s2, i2) {
    this.u = 0, this.status = 0, (this.p = t2).addController(this);
    const e = "object" == typeof s2 ? s2 : { task: s2, args: i2 };
    this._ = e.task, this.v = e.args, this.j = e.argsEqual ?? h, this.m = e.onComplete, this.g = e.onError, this.autoRun = e.autoRun ?? true, "initialValue" in e && (this.l = e.initialValue, this.status = 2, this.k = this.A?.());
  }
  hostUpdate() {
    true === this.autoRun && this.O();
  }
  hostUpdated() {
    "afterUpdate" === this.autoRun && this.O();
  }
  A() {
    if (void 0 === this.v) return;
    const t2 = this.v();
    if (!Array.isArray(t2)) throw Error("The args function must return an array");
    return t2;
  }
  async O() {
    const t2 = this.A(), s2 = this.k;
    this.k = t2, t2 === s2 || void 0 === t2 || void 0 !== s2 && this.j(s2, t2) || await this.run(t2);
  }
  async run(t2) {
    let i2, h2;
    t2 ??= this.A(), this.k = t2, 1 === this.status ? this.T?.abort() : (this.t = void 0, this.i = void 0, this.o = void 0), this.status = 1, "afterUpdate" === this.autoRun ? queueMicrotask(() => this.p.requestUpdate()) : this.p.requestUpdate();
    const e = ++this.u;
    this.T = new AbortController();
    let r = false;
    try {
      i2 = await this._(t2, { signal: this.T.signal });
    } catch (t3) {
      r = true, h2 = t3;
    }
    if (this.u === e) {
      if (i2 === s) this.status = 0;
      else {
        if (false === r) {
          try {
            this.m?.(i2);
          } catch {
          }
          this.status = 2, this.i?.(i2);
        } else {
          try {
            this.g?.(h2);
          } catch {
          }
          this.status = 3, this.o?.(h2);
        }
        this.l = i2, this.h = h2;
      }
      this.p.requestUpdate();
    }
  }
  abort(t2) {
    1 === this.status && this.T?.abort(t2);
  }
  get value() {
    return this.l;
  }
  get error() {
    return this.h;
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
        throw Error("Unexpected status: " + this.status);
    }
  }
}
const h = (s2, i2) => s2 === i2 || s2.length === i2.length && s2.every((s3, h2) => !t(s3, i2[h2]));
export {
  i as h
};
//# sourceMappingURL=task-BYUCPaT1.js.map
