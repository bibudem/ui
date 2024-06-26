/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _t, _e, e_fn, _i, i_fn;
import { h as t } from "./task-C8D8UDHH.js";
import { s as e, i, r as n, x as a } from "./lit-element-C-D0oZt5.js";
class o extends e {
  constructor() {
    super();
    __privateAdd(this, _e);
    __privateAdd(this, _i);
    __privateAdd(this, _t, new t(this, { task: async ([t2], { signal: e2 }) => {
      const i2 = new URL(t2), n2 = await fetch(i2, { headers: { Accept: "application/json" }, signal: e2 });
      if (!n2.ok)
        throw new Error(n2.status);
      return n2.json();
    }, args: () => [this.service] }));
    this.big = false, this.service = "https://urgence.umontreal.ca/urgence-udem.json";
  }
  connectedCallback() {
    super.connectedCallback(), this.render();
  }
  render() {
    return __privateGet(this, _t).render({ pending: () => null, complete: ({ bannerType: t2, date: e2, fullDay: i2, headerLink: n2, hour: o2, title: r, url: s }) => (this.href = n2 ?? s, t2 && (this.big = "large" === t2), r && a`<aside class="wrapper${this.big ? " big" : ""}" tabindex="0" @click="${__privateMethod(this, _i, i_fn)}" @keyup="${__privateMethod(this, _i, i_fn)}"><div class="container"><div class="content"><a class="title" href="${this.href}" @click="${__privateMethod(this, _e, e_fn)}" tabindex="-1"><div>${r}</div></a><time datetime="${e2}" class="datetime"><span class="hour">${o2}</span> <span>| </span><span classid="date">${i2}</span></time></div></div></aside>`) });
  }
}
_t = new WeakMap();
_e = new WeakSet();
e_fn = function(t2) {
  t2.preventDefault(), t2.stopPropagation();
};
_i = new WeakSet();
i_fn = function(t2) {
  (" " === t2.key || "Enter" === t2.key || "click" === t2.type) && window.open(this.href, "_blank");
};
__publicField(o, "properties", { service: { type: String }, big: { type: Boolean }, href: { type: String, attribute: false } });
__publicField(o, "styles", [i`${n(".wrapper{width:100%;height:55px;background-color:#282828;border-bottom:#40474f solid 7px;cursor:pointer;color:#fff;font-size:13px;box-sizing:border-box}.wrapper.big{height:168px}.container{width:100%;height:48px;background-color:#b60000;position:relative;bottom:0}.big .container{height:161px}.content{margin-left:auto;margin-right:auto;display:flex;align-items:center;height:48px;width:auto}.big .content{height:113px}@media (min-width: 768px){.content{width:768px}}@media (min-width: 1200px){.content{width:1220px}}.title{margin:0 0 0 132px;line-height:22px;padding:0 12px;font-size:17px;max-height:48px;overflow:hidden;color:#fff;text-decoration:none}.big .title{margin-left:0;position:static;max-height:101px;font-size:18px;line-height:unset}.datetime{height:48px;background-color:#40474f;position:absolute;top:0;min-width:107px;padding:7px 12px 0;font-size:15px;line-height:17px;text-align:center;margin:0;text-transform:uppercase}.big .datetime{top:113px;line-height:36px}.datetime span{position:relative;bottom:0}")}`]);
customElements.define("udem-urgence", o);
export {
  o as UdeMUrgence
};
//# sourceMappingURL=udem-urgence.js.map
