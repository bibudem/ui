/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.18.0
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
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _i, _t, _e, _s, _m_instances, o_fn, n_fn;
import { s as e, i as t, r as i, x as s } from "./lit-element-Dj1nHH6C.js";
import { e as o, n } from "./ref-B-kqFHPy.js";
import { consentContext as a } from "./consent-context.js";
import { ConsentTokens as r } from "./ConsentTokens.js";
import { C as c } from "./constants-Cjm0Y2Sp.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let l = class extends Event {
  constructor(e2, t2, i2) {
    super("context-request", { bubbles: true, composed: true }), this.context = e2, this.callback = t2, this.subscribe = i2 ?? false;
  }
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class d {
  constructor(e2, t2, i2, s2) {
    if (this.subscribe = false, this.provided = false, this.value = void 0, this.t = (e3, t3) => {
      this.unsubscribe && (this.unsubscribe !== t3 && (this.provided = false, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = e3, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = true, this.callback && this.callback(e3, t3)), this.unsubscribe = t3;
    }, this.host = e2, void 0 !== t2.context) {
      const e3 = t2;
      this.context = e3.context, this.callback = e3.callback, this.subscribe = e3.subscribe ?? false;
    } else this.context = t2, this.callback = i2, this.subscribe = s2 ?? false;
    this.host.addController(this);
  }
  hostConnected() {
    this.dispatchRequest();
  }
  hostDisconnected() {
    this.unsubscribe && (this.unsubscribe(), this.unsubscribe = void 0);
  }
  dispatchRequest() {
    this.host.dispatchEvent(new l(this.context, this.t, this.subscribe));
  }
}
const h = "checked", p = "disabled";
const _u = class _u extends HTMLElement {
  constructor() {
    super();
    __publicField(this, "toggle", () => {
      this.disabled || (this.checked = !this.checked);
    });
    __privateAdd(this, _i, (e2) => {
      switch (e2.key) {
        case " ":
        case "Enter":
          e2.preventDefault(), this.toggle();
      }
    });
    __privateAdd(this, _t, (e2 = false) => {
      var t2;
      this.setAttribute("aria-checked", this.checked.toString()), e2 && this.dispatchEvent((t2 = this.checked, new CustomEvent("toggle-switch:change", { detail: { checked: t2 } })));
    });
    __privateAdd(this, _e, () => {
      const e2 = this.shadowRoot ?? this.attachShadow({ mode: "open" }), t2 = document.createElement("style");
      t2.innerHTML = _u.css;
      const i2 = document.createElement("template");
      return i2.innerHTML = _u.html, e2.appendChild(t2), e2.appendChild(i2.content), e2;
    });
    __privateGet(this, _e).call(this);
  }
  static get observedAttributes() {
    return [h];
  }
  get checked() {
    return this.hasAttribute(h);
  }
  set checked(e2) {
    this.toggleAttribute(h, e2);
  }
  get disabled() {
    return this.hasAttribute(p);
  }
  set disabled(e2) {
    this.toggleAttribute(p, e2);
  }
  connectedCallback() {
    this.hasAttribute("role") || this.setAttribute("role", "switch"), this.hasAttribute("tabindex") || this.setAttribute("tabindex", "0"), __privateGet(this, _t).call(this, false), this.addEventListener("click", this.toggle), this.addEventListener("keydown", __privateGet(this, _i));
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.toggle), this.removeEventListener("keydown", __privateGet(this, _i));
  }
  attributeChangedCallback(e2) {
    e2 === h && __privateGet(this, _t).call(this, true);
  }
};
_i = new WeakMap();
_t = new WeakMap();
_e = new WeakMap();
__publicField(_u, "defaultElementName", "toggle-switch");
__publicField(_u, "html", '\n        <span part="track">\n            <span part="slider"></span>\n        </span>\n    ');
__publicField(_u, "css", '\n        :host {\n            display: inline-block;\n            width: 2em;\n            height: 1em;\n            cursor: pointer;\n        }\n\n        span {\n            box-sizing: border-box;\n            display: inline-block;\n            line-height: 1;\n        }\n\n        [part="track"] {\n            width: 100%;\n            height: 100%;\n            background-color: #dddddd;\n            text-align: left;\n            transition: all 0.256s;\n        }\n\n        [part="slider"] {\n            width: 50%;\n            height: 100%;\n            background-color: #777777;\n            transition: all 0.256s;\n            vertical-align: text-top;\n        }\n\n        :host([checked]) [part="slider"] {\n            transform: translateX(100%);\n        }\n\n        :host([disabled]) {\n            cursor: not-allowed;\n            opacity: 0.5;\n        }\n    ');
__publicField(_u, "formAssociated", true);
let u = _u;
window.customElements.get(u.defaultElementName) || window.customElements.define(u.defaultElementName, u);
class m extends e {
  constructor() {
    super();
    __privateAdd(this, _m_instances);
    __publicField(this, "_consentConsumer");
    __privateAdd(this, _s);
    this.open = false, this._dialogRef = o(), __privateSet(this, _s, new r(false)), this._consentConsumer = new d(this, { context: a, subscribe: true, callback: (e2) => {
      try {
        const t2 = r.from(e2);
        if (t2.state() === c.INDETERMINATE) return void __privateGet(this, _s).setAll(false);
        __privateGet(this, _s).setAll(t2);
      } catch (e3) {
        throw console.error("[BibConsentPreferencesDialog] error: ", e3), e3;
      }
    } });
  }
  async savePreferences(e2) {
    try {
      void 0 !== e2 && __privateGet(this, _s).setAll(e2), this.dispatchEvent(new CustomEvent("update", { detail: __privateGet(this, _s) }));
    } catch (e3) {
      throw console.error("[savePreferences] error: ", e3), e3;
    }
  }
  show() {
    const e2 = this._consentConsumer.value?.state() === c.DETERMINATE && this._consentConsumer.value;
    console.log("tokens", e2), __privateGet(this, _s).setAll(e2), this._dialogRef.value?.showModal();
  }
  close(e2 = true) {
    this._dialogRef.value?.close(e2);
  }
  render() {
    return s`<bib-consent-dialog show-close class="preferences-dialog" ${n(this._dialogRef)}><div class="content-container"><div class="title">Personnaliser les témoins</div><div class="personalized-cookies-description"><p>Les témoins (aussi appelés « cookies ») sont de petits fichiers textes qui sont téléchargés lorsque vous consultez certaines pages d’un site et qui sont enregistrés dans la mémoire de l’appareil que vous utilisez. Ils permettent d’enregistrer certaines informations (type de navigateur, langue, pays, adresse IP, identifiant, etc.) afin d’être récupérées par le serveur lors de visites subséquentes. Ils sont utilisés pour mettre à jour et optimiser nos plateformes en fonction de l’utilisation que vous en faites et de vos besoins.</p><p>L’UdeM collecte des données sur les plateformes, afin d’analyser leur utilisation et d’améliorer l’expérience des visiteurs.</p><p>L’UdeM utilise également les services de <a href="https://vie-privee.umontreal.ca/ga" target="_blank">Google Analytics</a>, afin d'analyser le trafic Web et de recueillir des données de navigation à des fins statistiques et d’amélioration des Plateformes.</p><p>Parce que nous respectons votre droit à la vie privée, nous vous donnons la possibilité de ne pas autoriser certains types de témoins. Cliquez sur les différentes catégories pour obtenir plus de détails sur chacune d’entre elles et modifier les paramètres par défaut. Toutefois, si vous désactivez certains types de témoins, votre expérience de navigation et les services que nous sommes en mesure de vous offrir peuvent être impactés.</p></div><div class="accordion-container"><div class="accordion-list"><details class="accordion-item"><summary class="accordion-item__summary"><span class="accordion-item__summary-title">Témoins nécessaires</span> <span class="accordion-item__summary-icon"><span class="close">+</span> <span class="open">-</span><div class="toggle-container label">Toujours activés</div></span></summary><div class="accordion-item__content"><p>Ces témoins sont essentiels au bon fonctionnement et à la sécurité de nos sites Web et services en ligne. Ils ne peuvent pas être désactivés. Ils nous permettent notamment de sécuriser votre connexion en recueillant vos informations d’identification, personnaliser votre interface (ex. : choix de langue) et conserver vos préférences.</p><p class="list-title">Les renseignements suivants sont notamment recueillis :</p><ul class="list-disc"><li>le type et la version du navigateur;</li><li>le type et la version du système d’exploitation;</li><li>le type et le modèle d’appareil (téléphone, tablette ou ordinateur);</li><li>la résolution de l’écran de l’appareil que vous utilisez;</li><li>la langue utilisée par le navigateur.</li></ul></div></details><details class="accordion-item" @click="${{ handleEvent: __privateMethod(this, _m_instances, o_fn), capture: true }}"><summary class="accordion-item__summary"><div class="accordion-item__summary-title">Témoins de performance</div><div class="accordion-item__summary-icon"><span class="close">+</span> <span class="open">-</span><div class="toggle-container"><toggle-switch name="analytics_consent" class="switch" ?checked="${"granted" === __privateGet(this, _s).analytics_consent}" @toggle-switch:change="${__privateMethod(this, _m_instances, n_fn)}"></toggle-switch></div></div></summary><div class="accordion-item__content"><p>Ces témoins sont utilisés pour analyser la navigation sur nos sites (provenance des visiteurs, fréquence des visites, pages plus ou moins visitées, etc.) dans le but d’en améliorer le fonctionnement et d’offrir une meilleure expérience utilisateurs aux visiteurs. Toutes les informations collectées par ces témoins sont agrégées et donc anonymisées.</p></div></details><details class="accordion-item" @click="${{ handleEvent: __privateMethod(this, _m_instances, o_fn), capture: true }}"><summary class="accordion-item__summary"><span class="accordion-item__summary-title">Témoins de fonctionnalité</span> <span class="accordion-item__summary-icon"><span class="close">+</span> <span class="open">-</span><div class="toggle-container"><toggle-switch name="functionality_consent" class="switch" ?checked="${"granted" === __privateGet(this, _s).functionality_consent}" @toggle-switch:change="${__privateMethod(this, _m_instances, n_fn)}"></toggle-switch></div></span></summary><div class="accordion-item__content"><p>Ces témoins permettent d’améliorer les fonctionnalités et la personnalisation de nos sites. Par exemple, ils rendent possible l’utilisation de vidéos et de services de messagerie instantanée ou encore le partage de contenus de nos sites sur des plateformes de médias sociaux. Si vous désactivez ces témoins, votre expérience de navigation et les services que nous sommes en mesure de vous offrir peuvent être impactés.</p></div></details><details class="accordion-item" @click="${{ handleEvent: __privateMethod(this, _m_instances, o_fn), capture: true }}"><summary class="accordion-item__summary"><span class="accordion-item__summary-title">Témoins publicitaires</span><span class="accordion-item__summary-icon"><span class="close">+</span><span class="open">-</span><div class="toggle-container"><toggle-switch name="ad_consent" class="switch" ?checked="${"granted" === __privateGet(this, _s).ad_consent}" @toggle-switch:change="${__privateMethod(this, _m_instances, n_fn)}"></toggle-switch></div></span></summary><div class="accordion-item__content"><p>Ces témoins peuvent être activés sur nos sites web pour établir des profils sur vos intérêts. Ils nous aident à vous proposer des publicités et des contenus personnalisés. Si vous désactivez ces témoins, des publicités et des contenus moins ciblées sur vos intérêts vous seront proposés.</p></div></details></div><p class="update-information">Vous pouvez modifier en tout temps vos préférences en sélectionnant les paramètres appropriés dans votre navigateur pour accepter ou refuser les témoins.</p><div class="actions-container"><button class="btn--filled" type="button" @click="${() => this.savePreferences()}">Enregistrer mes préférences</button> <button class="btn--filled" type="button" @click="${() => this.savePreferences(false)}">Tout refuser</button> <button class="btn--filled" type="button" @click="${() => this.savePreferences(true)}">Tout accepter</button></div><div class="learn-more-container">Voir notre <a href="https://vie-privee.umontreal.ca/confidentialite">politique de confidentialité</a> et nos <a href="https://vie-privee.umontreal.ca/conditions-dutilisation">conditions d’utilisation</a>.</div></div></div></bib-consent-dialog>`;
  }
}
_s = new WeakMap();
_m_instances = new WeakSet();
o_fn = function(e2) {
  e2.composedPath().some((e3) => e3.matches?.("toggle-switch.switch")) && e2.preventDefault();
};
n_fn = function(e2) {
  const { target: t2, detail: i2 } = e2, { checked: s2 } = i2, o2 = t2.getAttribute("name");
  __privateGet(this, _s)[o2] = s2;
};
__publicField(m, "properties", { debug: { type: Boolean, reflect: true }, open: { type: Boolean, state: true } });
__publicField(m, "styles", [t`${i("@layer reset{:host,*{box-sizing:border-box}:host{-webkit-font-smoothing:antialiased}}@layer theme{a{text-decoration:underline;text-underline-offset:2px;color:inherit}}@layer component{p{font-size:var(--_consent-text-size);line-height:var(--_consent-text-line-height)}.title{font-size:var(--_consent-title-text-size);line-height:var(--_consent-title-text-line-height);padding-bottom:12.5px}.learn-more-container{margin:20px 0 0}@media screen and (min-width: 640px){.learn-more-container{margin:14px 0 0;padding-bottom:5px}}p{font-size:var(--_consent-text-size);line-height:var(--_consent-text-line-height);padding-bottom:20px}@media screen and (min-width: 640px){p{padding-bottom:5px}}.actions-container{display:flex;justify-content:center;margin:0 auto;flex-direction:column}@media screen and (min-width: 640px){.actions-container{flex-direction:row;justify-content:normal;margin:0}}@media screen and (min-width: 640px){.confirm-selection{margin-left:0}}.update-information{margin-top:20px}details>summary{list-style:none}details>summary::-webkit-details-marker{display:none}.toggle-container{display:inline-block;position:absolute;right:15px;top:15px}.toggle-container.label{color:#0b113a;font-size:var(--_consent-text-size);line-height:var(--_consent-text-line-height);right:10px;text-align:right;text-wrap:wrap;top:4px;white-space:normal;width:70px}@media screen and (min-width: 480px){.toggle-container.label{right:15px;top:15px;width:auto}}.toggle-container:focus{box-shadow:0 0 0 var(--toggle-ring-width, 3px) var(--toggle-ring-color, rgba(16, 185, 129, .188));outline:none}.toggle{align-items:center;border:var(--toggle-border, .125rem) solid;border-radius:999px;box-sizing:content-box;cursor:pointer;display:flex;font-size:var(--toggle-font-size, .75rem);height:var(--toggle-height, 1.25rem);line-height:1;position:relative;transition:all .3s;width:var(--toggle-width, 3rem)}.toggle-on{background:var(--toggle-bg-on, #52b782);border-color:var(--toggle-border-on, #52b782);color:var(--toggle-text-on, #fff);justify-content:flex-start}.toggle-off{background:var(--toggle-bg-off, #e5e7eb);border-color:var(--toggle-border-off, #e5e7eb);color:var(--toggle-text-off, #374151);justify-content:flex-end}.toggle-on-disabled{background:var(--toggle-bg-on-disabled, #d1d5db);border-color:var(--toggle-border-on-disabled, #d1d5db);color:var(--toggle-text-on-disabled, #9ca3af);cursor:not-allowed;justify-content:flex-start}.toggle-off-disabled{background:var(--toggle-bg-off-disabled, #e5e7eb);border-color:var(--toggle-border-off-disabled, #e5e7eb);color:var(--toggle-text-off-disabled, #9ca3af);cursor:not-allowed;justify-content:flex-end}.toggle-handle{background:var(--toggle-handle-enabled, #fff);border-radius:50%;display:inline-block;height:var(--toggle-height, 1.25rem);position:absolute;top:0;transition-duration:var(--toggle-duration, .15s);transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);width:var(--toggle-height, 1.25rem)}.toggle-handle-on{left:100%;transform:translate(-100%)}.toggle-handle-off{left:0}.toggle-handle-on-disabled{background:var(--toggle-handle-disabled, #f3f4f6);left:100%;transform:translate(-100%)}.toggle-handle-off-disabled{background:var(--toggle-handle-disabled, #f3f4f6);left:0}.toggle-label{box-sizing:border-box;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;white-space:nowrap;width:calc(var(--toggle-width, 3.25rem) - var(--toggle-height, 1.25rem))}}@layer component{sp-switch{--mod-switch-height: 40px;--highcontrast-switch-background-color: silver;--mod-switch-control-height: 18px}}.btn--outlined,.btn--filled{font-size:var(--_consent-text-size);line-height:var(--_consent-text-line-height);display:flex;justify-content:center;font-weight:500;margin:7.5px auto 0;padding:5px 15px;width:200px}@media screen and (min-width: 640px){.btn--outlined,.btn--filled{float:left;margin:7.5px 0 0 7.5px;width:auto}}.btn--outlined span,.btn--filled span{color:#0057ac;padding-left:6.25px}@layer component{.btn--filled{background-color:#0b113a;color:#fff}.btn--outlined{background-color:transparent;border:1px solid #0057ac;color:#0b113a}@media screen and (min-width: 640px){.btn--outlined{margin-left:0}}}@layer component{.accordion-container{margin:0 auto;width:100%}.accordion-container .close{color:#0057ac;font-size:22.5px;font-weight:400;line-height:27px;opacity:1;padding-right:8.75px}.accordion-container .open{color:#0057ac;font-size:39px;font-weight:300;line-height:20px;opacity:1;padding-right:8.75px}.accordion-container .list-title{padding-top:10px}.accordion-container ul li{font-size:var(--_consent-text-size);list-style-type:disc;margin:10px 0 0 15px}.accordion-container ul li::marker{color:#0057ac}.accordion-list{width:100%}.accordion-list .accordion-item{margin:0 0 -1px;--content-height: 0px;overflow:hidden;transition:height .3s ease-in-out;border:1px solid #9e9e9e}.accordion-list .accordion-item>.accordion-item__summary{padding:12px 60px 12px 12px;cursor:pointer;display:flex;font-weight:700;line-height:24px;transition:color .3s ease-in-out;position:relative}.accordion-list .accordion-item>.accordion-item__summary .accordion-item__summary-title{order:2;padding-top:2px}.accordion-list .accordion-item.accordion-item--open>.accordion-item__summary .accordion-item__summary-icon span.close,.accordion-list .accordion-item>.accordion-item__summary .accordion-item__summary-icon span.open{display:none}.accordion-list .accordion-item.accordion-item--open>.accordion-item__summary .accordion-item__summary-icon span.open{display:block}.accordion-list .accordion-item>.accordion-item__summary>.accordion-item__summary-icon{transition:transform .3s ease-in-out}.accordion-list .accordion-item>.accordion-item__summary>.accordion-item__summary-icon span{text-shadow:none}.accordion-list .accordion-item--open{height:calc(var(--summary-height) + var(--content-height) + 51px)}.accordion-list .accordion-item--disabled>.accordion-item__summary{cursor:default}.accordion-list .accordion-item>.accordion-item__content{border-top:none;padding:0;margin:0 25px 0 35px}}.switch{--switch-handle-color: #fff;--switch-handle-shape: 9999px;--switch-track-color: #9397b0;--switch-track-shape: 9999px;--switch-selected-handle-color: #fff;--switch-selected-track-color: #10b981;font-size:1.2em;height:1.2em}.switch::part(slider){border-radius:var(--switch-track-shape);background-color:var(--switch-handle-color);box-shadow:.0625em .0625em .125em #00000040;transition:all .3s cubic-bezier(.175,.885,.32,1.275)}.switch[checked]::part(slider){background-color:var(--switch-selected-handle-color);transition:all .3s cubic-bezier(.175,.885,.32,1.275)}.switch::part(track){padding:.125em;border-radius:var(--switch-handle-shape);background-color:var(--switch-track-color)}.switch[checked]::part(track){background-color:var(--switch-selected-track-color)}@layer reset,theme,component,states;@layer reset{button{border:unset;padding:0;background:none;font:inherit;border:none}button::-moz-focus-inner{border:none}button:focus{outline:none}button:not(:disabled),button [type=button]:not(:disabled),button [type=reset]:not(:disabled),button [type=submit]:not(:disabled),button [role=button]:not(:disabled){cursor:pointer}button:disabled{pointer-events:none}}@layer reset{dialog{margin:0;padding:0;border:unset;color:inherit;background-color:#fff;inset-block:0;max-width:unset;max-height:unset}}@layer reset{details summary{cursor:pointer}details summary>*{display:inline}}@layer reset{p{margin:0}}@layer component{.dialog-container--preferences{position:fixed;bottom:0;height:400px;display:block;width:100%}.personalized-cookies-description p{padding:0 15px 20px 0}.btn-consent{width:100%}@media screen and (min-width: 640px){.btn-consent{width:auto}}.actions-container{margin-top:20px}}")}`]);
window.customElements.get("bib-consent-preferences-dialog") || window.customElements.define("bib-consent-preferences-dialog", m);
export {
  m as B,
  d as a,
  l as s
};
//# sourceMappingURL=bib-consent-preferences-dialog-BDTQYRgb.js.map
