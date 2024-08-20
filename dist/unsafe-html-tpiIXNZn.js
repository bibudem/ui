/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { a as t, b as e } from "./lit-element-DmnF17fR.js";
import { d as r, D as s, P as i } from "./directive-BFTiGTun.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class n extends s {
  constructor(e2) {
    if (super(e2), this._value = t, e2.type !== i.CHILD) throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`);
  }
  render(r2) {
    if (r2 === t || null == r2) return this._templateResult = void 0, this._value = r2;
    if (r2 === e) return r2;
    if ("string" != typeof r2) throw new Error(`${this.constructor.directiveName}() called with a non-string value`);
    if (r2 === this._value) return this._templateResult;
    this._value = r2;
    const s2 = [r2];
    return s2.raw = s2, this._templateResult = { _$litType$: this.constructor.resultType, strings: s2, values: [] };
  }
}
n.directiveName = "unsafeHTML", n.resultType = 1;
const a = r(n);
export {
  a as u
};
//# sourceMappingURL=unsafe-html-tpiIXNZn.js.map
