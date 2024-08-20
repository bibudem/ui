/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class r {
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
export {
  r as D,
  t as P,
  e as d
};
//# sourceMappingURL=directive-BFTiGTun.js.map
