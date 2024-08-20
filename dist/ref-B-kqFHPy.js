/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.17.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { T as t } from "./lit-element-Dj1nHH6C.js";
import { i as s, t as i, e } from "./directive-Ce1M5_Fy.js";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const h = (t2, s2) => {
  const i2 = t2._$AN;
  if (void 0 === i2) return false;
  for (const t3 of i2) t3._$AO?.(s2, false), h(t3, s2);
  return true;
}, o = (t2) => {
  let s2, i2;
  do {
    if (void 0 === (s2 = t2._$AM)) break;
    i2 = s2._$AN, i2.delete(t2), t2 = s2;
  } while (0 === i2?.size);
}, n = (t2) => {
  for (let s2; s2 = t2._$AM; t2 = s2) {
    let i2 = s2._$AN;
    if (void 0 === i2) s2._$AN = i2 = /* @__PURE__ */ new Set();
    else if (i2.has(t2)) break;
    i2.add(t2), d(s2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function c(t2) {
  void 0 !== this._$AN ? (o(this), this._$AM = t2, n(this)) : this._$AM = t2;
}
function r(t2, s2 = false, i2 = 0) {
  const e2 = this._$AH, n2 = this._$AN;
  if (void 0 !== n2 && 0 !== n2.size) if (s2) if (Array.isArray(e2)) for (let t3 = i2; t3 < e2.length; t3++) h(e2[t3], false), o(e2[t3]);
  else null != e2 && (h(e2, false), o(e2));
  else h(this, t2);
}
const d = (t2) => {
  t2.type == i.CHILD && (t2._$AP ??= r, t2._$AQ ??= c);
};
class l extends s {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t2, s2, i2) {
    super._$AT(t2, s2, i2), n(this), this.isConnected = t2._$AU;
  }
  _$AO(t2, s2 = true) {
    t2 !== this.isConnected && (this.isConnected = t2, t2 ? this.reconnected?.() : this.disconnected?.()), s2 && (h(this, t2), o(this));
  }
  setValue(t2) {
    if (((t3) => void 0 === this._$Ct.strings)()) this._$Ct._$AI(t2, this);
    else {
      const s2 = [...this._$Ct._$AH];
      s2[this._$Ci] = t2, this._$Ct._$AI(s2, this, 0);
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
const $ = () => new _();
class _ {
}
const A = /* @__PURE__ */ new WeakMap(), a = e(class extends l {
  render(s2) {
    return t;
  }
  update(s2, [i2]) {
    const e2 = i2 !== this.Y;
    return e2 && void 0 !== this.Y && this.rt(void 0), (e2 || this.lt !== this.ct) && (this.Y = i2, this.ht = s2.options?.host, this.rt(this.ct = s2.element)), t;
  }
  rt(t2) {
    if ("function" == typeof this.Y) {
      const s2 = this.ht ?? globalThis;
      let i2 = A.get(s2);
      void 0 === i2 && (i2 = /* @__PURE__ */ new WeakMap(), A.set(s2, i2)), void 0 !== i2.get(this.Y) && this.Y.call(this.ht, void 0), i2.set(this.Y, t2), void 0 !== t2 && this.Y.call(this.ht, t2);
    } else this.Y.value = t2;
  }
  get lt() {
    return "function" == typeof this.Y ? A.get(this.ht ?? globalThis)?.get(this.Y) : this.Y?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
export {
  $ as e,
  a as n
};
//# sourceMappingURL=ref-B-kqFHPy.js.map
