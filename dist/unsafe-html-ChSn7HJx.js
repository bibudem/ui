/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.9.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { T as t, w as r } from "./lit-element-C-D0oZt5.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, i = (t2) => (...r2) => ({ _$litDirective$: t2, values: r2 });
class s {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, r2, e2) {
    this._$Ct = t2, this._$AM = r2, this._$Ci = e2;
  }
  _$AS(t2, r2) {
    return this.update(t2, r2);
  }
  update(t2, r2) {
    return this.render(...r2);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class n extends s {
  constructor(r2) {
    if (super(r2), this.it = t, r2.type !== e.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e2) {
    if (e2 === t || null == e2)
      return this._t = void 0, this.it = e2;
    if (e2 === r)
      return e2;
    if ("string" != typeof e2)
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e2 === this.it)
      return this._t;
    this.it = e2;
    const i2 = [e2];
    return i2.raw = i2, this._t = { _$litType$: this.constructor.resultType, strings: i2, values: [] };
  }
}
n.directiveName = "unsafeHTML", n.resultType = 1;
const o = i(n);
export {
  i as e,
  s as i,
  o,
  e as t
};
//# sourceMappingURL=unsafe-html-ChSn7HJx.js.map
