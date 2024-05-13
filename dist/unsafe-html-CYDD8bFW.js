/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.7.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { a as t, b as e } from "./lit-element-DgcYs_ed.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const r = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, s = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i {
  constructor(t2) {
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$initialize(t2, e2, r2) {
    this.__part = t2, this._$parent = e2, this.__attributeIndex = r2;
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
class n extends i {
  constructor(e2) {
    if (super(e2), this._value = t, e2.type !== r.CHILD)
      throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`);
  }
  render(r2) {
    if (r2 === t || null == r2)
      return this._templateResult = void 0, this._value = r2;
    if (r2 === e)
      return r2;
    if ("string" != typeof r2)
      throw new Error(`${this.constructor.directiveName}() called with a non-string value`);
    if (r2 === this._value)
      return this._templateResult;
    this._value = r2;
    const s2 = [r2];
    return s2.raw = s2, this._templateResult = { _$litType$: this.constructor.resultType, strings: s2, values: [] };
  }
}
n.directiveName = "unsafeHTML", n.resultType = 1;
const a = s(n);
export {
  i as D,
  r as P,
  s as d,
  a as u
};
//# sourceMappingURL=unsafe-html-CYDD8bFW.js.map
