/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _n, _h_instances, e_fn, t_fn, _s;
import { D as e, C as t } from "./constants-B_DnKz1g.js";
import { i as n, b as s, a as o } from "./isObject-Dipzh7kZ.js";
var i = "[object Boolean]";
function a(e2) {
  return true === e2 || false === e2 || n(e2) && s(e2) == i;
}
const r = Object.keys(e);
function c(e2, { key: t2, acceptNull: n2 = false } = {}) {
  if (!a(e2) && !["granted", "denied"].includes(e2) && !n2 && null === e2) throw new TypeError(`Invalid value${t2 ? ` for field \`${t2}\`` : ""}: ${e2}. Must be either boolean or one of 'granted' or 'denied'.`);
}
function l(e2) {
  if (!r.includes(e2)) {
    const t2 = `Invalid key: ${e2}. Must be one of ${r.reduce((e3, t3, n2) => n2 === r.length ? `${e3} or ${t3}` : `${e3}, ${t3}`)}.`;
    throw new TypeError(t2);
  }
}
const _h = class _h {
  constructor(t2) {
    __privateAdd(this, _h_instances);
    __privateAdd(this, _n, { ...e });
    __privateAdd(this, _s);
    const n2 = new Error();
    __privateSet(this, _s, n2.stack.split("\n").map((e2) => e2.trim())), Object.defineProperties(this, { analytics_consent: { enumerable: true, get: () => __privateGet(this, _n).analytics_consent, set: (e2) => __privateMethod(this, _h_instances, e_fn).call(this, "analytics_consent", e2) }, functionality_consent: { enumerable: true, get: () => __privateGet(this, _n).functionality_consent, set: (e2) => __privateMethod(this, _h_instances, e_fn).call(this, "functionality_consent", e2) }, ad_consent: { enumerable: true, get: () => __privateGet(this, _n).ad_consent, set: (e2) => __privateMethod(this, _h_instances, e_fn).call(this, "ad_consent", e2) } }), void 0 !== t2 && (o(t2) ? Object.keys(e).forEach((e2) => {
      Reflect.has(t2, e2) && __privateMethod(this, _h_instances, e_fn).call(this, e2, t2[e2]);
    }) : __privateMethod(this, _h_instances, t_fn).call(this, t2));
  }
  static from(e2) {
    var _a;
    const t2 = new _h();
    return e2 && (o(e2) ? Object.keys(e2).forEach((n2) => {
      var _a2;
      __privateMethod(_a2 = t2, _h_instances, e_fn).call(_a2, n2, e2[n2], true);
    }) : __privateMethod(_a = t2, _h_instances, t_fn).call(_a, e2, true)), t2;
  }
  isGranted(e2) {
    return l(e2), __privateGet(this, _n)[e2] === t.GRANTED;
  }
  isDenied(e2) {
    return l(e2), __privateGet(this, _n)[e2] === t.DENIED;
  }
  state() {
    return Object.values(__privateGet(this, _n)).every((e2) => null !== e2) ? t.DETERMINATE : t.INDETERMINATE;
  }
  setAll(e2) {
    o(e2) ? Object.entries(e2).forEach(([e3, t2]) => __privateMethod(this, _h_instances, e_fn).call(this, e3, t2)) : __privateMethod(this, _h_instances, t_fn).call(this, e2);
  }
  resetConsent() {
    Object.keys(__privateGet(this, _n)).forEach((e2) => __privateGet(this, _n)[e2] = null);
  }
  toGTM(e2 = 500) {
    if (console.log(this), this.state() === t.INDETERMINATE) {
      const e3 = Object.entries(__privateGet(this, _n)).filter((e4) => null === e4[1]);
      throw new Error(`All tokens must have an explicit value. Undefined token${e3.length > 1 ? "s" : ""}: ${e3.map((e4) => e4[0]).join(", ")}`);
    }
    const { analytics_consent: n2, ad_consent: s2 } = __privateGet(this, _n);
    return { ad_user_data: s2, ad_personalization: s2, ad_consent: s2, analytics_consent: n2, wait_for_update: e2 };
  }
};
_n = new WeakMap();
_h_instances = new WeakSet();
e_fn = function(e2, t2, n2 = false) {
  l(e2), c(t2, { key: e2, acceptNull: n2 }), __privateGet(this, _n)[e2] = a(t2) ? t2 ? "granted" : "denied" : t2;
};
t_fn = function(e2, t2 = false) {
  c(e2, { acceptNull: t2 }), "string" != typeof e2 && (e2 = e2 ? "granted" : "denied"), Object.keys(__privateGet(this, _n)).forEach((t3) => __privateGet(this, _n)[t3] = e2);
};
_s = new WeakMap();
let h = _h;
export {
  h as ConsentTokens
};
//# sourceMappingURL=ConsentTokens.js.map
