/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.14.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { T as t, w as r } from "./lit-element-Dj1nHH6C.js";
import { e as i, i as e, t as s } from "./directive-Ce1M5_Fy.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class n extends e {
  constructor(r2) {
    if (super(r2), this.it = t, r2.type !== s.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(i2) {
    if (i2 === t || null == i2) return this._t = void 0, this.it = i2;
    if (i2 === r) return i2;
    if ("string" != typeof i2) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (i2 === this.it) return this._t;
    this.it = i2;
    const e2 = [i2];
    return e2.raw = e2, this._t = { _$litType$: this.constructor.resultType, strings: e2, values: [] };
  }
}
n.directiveName = "unsafeHTML", n.resultType = 1;
const o = i(n);
export {
  o
};
//# sourceMappingURL=unsafe-html-hzUS4Xy_.js.map
