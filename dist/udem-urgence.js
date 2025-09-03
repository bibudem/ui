/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.0.2
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _e, _o_instances, t_fn, i_fn;
import { h as e } from "./task-BYUCPaT1.js";
import { s as t, i, r as n, x as a } from "./lit-element-Dj1nHH6C.js";
class o extends t {
  constructor() {
    super();
    __privateAdd(this, _o_instances);
    __privateAdd(this, _e, new e(this, { task: async ([e2], { signal: t2 }) => {
      const i2 = new URL(e2), n2 = await fetch(i2, { headers: { Accept: "application/json" }, signal: t2 });
      if (!n2.ok) throw new Error(n2.status);
      return n2.json();
    }, args: () => [this.service] }));
    this.big = false, this.service = "https://urgence.umontreal.ca/urgence-udem.json";
  }
  connectedCallback() {
    super.connectedCallback(), this.render();
  }
  render() {
    return __privateGet(this, _e).render({ pending: () => null, complete: ({ bannerType: e2, date: t2, fullDay: i2, headerLink: n2, hour: o2, title: r, url: s }) => (this.href = n2 ?? s, e2 && (this.big = "large" === e2), r && a`<aside class="wrapper${this.big ? " big" : ""}" tabindex="0" @click="${__privateMethod(this, _o_instances, i_fn)}" @keyup="${__privateMethod(this, _o_instances, i_fn)}"><div class="container"><div class="content"><a class="title" href="${this.href}" @click="${__privateMethod(this, _o_instances, t_fn)}" tabindex="-1"><div>${r}</div></a><time datetime="${t2}" class="datetime"><span class="hour">${o2}</span> <span>| </span><span classid="date">${i2}</span></time></div></div></aside>`) });
  }
}
_e = new WeakMap();
_o_instances = new WeakSet();
t_fn = function(e2) {
  e2.preventDefault(), e2.stopPropagation();
};
i_fn = function(e2) {
  (" " === e2.key || "Enter" === e2.key || "click" === e2.type) && window.open(this.href, "_blank");
};
__publicField(o, "properties", { service: { type: String }, big: { type: Boolean }, href: { type: String, attribute: false } });
__publicField(o, "styles", [i`${n(".wrapper{width:100%;height:55px;background-color:#37424d;border-bottom:#37424D solid 7px;cursor:pointer;color:#fff;font-size:13px;box-sizing:border-box}.wrapper.big{height:168px}.container{width:100%;height:48px;background-color:#b72600;position:relative;bottom:0}.big .container{height:161px}.content{margin-left:auto;margin-right:auto;display:flex;align-items:center;height:48px;width:auto}.big .content{height:113px}@media (min-width: 768px){.content{width:768px}}@media (min-width: 1200px){.content{width:1220px}}.title{margin-left:10rem!important;line-height:22px;padding:0 12px;font-size:17px;max-height:48px;overflow:hidden;color:#fff;text-decoration:none}.big .title{margin-left:0;position:static;max-height:101px;font-size:18px;line-height:unset}.datetime{height:48px;background-color:#37424d;position:absolute;top:0;min-width:107px;padding:7px 12px 0;font-size:15px;line-height:17px;text-align:center;margin:0;text-transform:uppercase}.big .datetime{top:113px;line-height:36px}.datetime span{position:relative;bottom:0}")}`]);
window.customElements.get("udem-urgence") || window.customElements.define("udem-urgence", o);
export {
  o as UdeMUrgence
};
//# sourceMappingURL=udem-urgence.js.map
