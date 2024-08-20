/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { a as e } from "./lit-element-DmnF17fR.js";
import { D as t, P as i, d as n } from "./directive-BFTiGTun.js";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
window.ShadyDOM?.inUse && true === window.ShadyDOM?.noPatch && window.ShadyDOM.wrap;
const s = (e2, t2) => {
  const i2 = e2._$disconnectableChildren;
  if (void 0 === i2) return false;
  for (const e3 of i2) e3._$notifyDirectiveConnectionChanged?.(t2, false), s(e3, t2);
  return true;
}, o = (e2) => {
  let t2, i2;
  do {
    if (void 0 === (t2 = e2._$parent)) break;
    i2 = t2._$disconnectableChildren, i2.delete(e2), e2 = t2;
  } while (0 === i2?.size);
}, r = (e2) => {
  for (let t2; t2 = e2._$parent; e2 = t2) {
    let i2 = t2._$disconnectableChildren;
    if (void 0 === i2) t2._$disconnectableChildren = i2 = /* @__PURE__ */ new Set();
    else if (i2.has(e2)) break;
    i2.add(e2), d(t2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function a(e2) {
  void 0 !== this._$disconnectableChildren ? (o(this), this._$parent = e2, r(this)) : this._$parent = e2;
}
function h(e2, t2 = false, i2 = 0) {
  const n2 = this._$committedValue, r2 = this._$disconnectableChildren;
  if (void 0 !== r2 && 0 !== r2.size) if (t2) if (Array.isArray(n2)) for (let e3 = i2; e3 < n2.length; e3++) s(n2[e3], false), o(n2[e3]);
  else null != n2 && (s(n2, false), o(n2));
  else s(this, e2);
}
const d = (e2) => {
  e2.type == i.CHILD && (e2._$notifyConnectionChanged ??= h, e2._$reparentDisconnectables ??= a);
};
class c extends t {
  constructor() {
    super(...arguments), this._$disconnectableChildren = void 0;
  }
  _$initialize(e2, t2, i2) {
    super._$initialize(e2, t2, i2), r(this), this.isConnected = e2._$isConnected;
  }
  _$notifyDirectiveConnectionChanged(e2, t2 = true) {
    e2 !== this.isConnected && (this.isConnected = e2, e2 ? this.reconnected?.() : this.disconnected?.()), t2 && (s(this, e2), o(this));
  }
  setValue(e2) {
    if (void 0 === this.__part.strings) this.__part._$setValue(e2, this);
    else {
      if (void 0 === this.__attributeIndex) throw new Error("Expected this.__attributeIndex to be a number");
      const t2 = [...this.__part._$committedValue];
      t2[this.__attributeIndex] = e2, this.__part._$setValue(t2, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l = () => new _();
class _ {
}
const f = /* @__PURE__ */ new WeakMap(), u = n(class extends c {
  render(t2) {
    return e;
  }
  update(t2, [i2]) {
    const n2 = i2 !== this._ref;
    return n2 && void 0 !== this._ref && this._updateRefValue(void 0), (n2 || this._lastElementForRef !== this._element) && (this._ref = i2, this._context = t2.options?.host, this._updateRefValue(this._element = t2.element)), e;
  }
  _updateRefValue(e2) {
    if ("function" == typeof this._ref) {
      const t2 = this._context ?? globalThis;
      let i2 = f.get(t2);
      void 0 === i2 && (i2 = /* @__PURE__ */ new WeakMap(), f.set(t2, i2)), void 0 !== i2.get(this._ref) && this._ref.call(this._context, void 0), i2.set(this._ref, e2), void 0 !== e2 && this._ref.call(this._context, e2);
    } else this._ref.value = e2;
  }
  get _lastElementForRef() {
    return "function" == typeof this._ref ? f.get(this._context ?? globalThis)?.get(this._ref) : this._ref?.value;
  }
  disconnected() {
    this._lastElementForRef === this._element && this._updateRefValue(void 0);
  }
  reconnected() {
    this._updateRefValue(this._element);
  }
});
export {
  l as c,
  u as r
};
//# sourceMappingURL=ref-DX06OUxP.js.map
