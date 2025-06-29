/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.0.2
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { s as e, i as t, r as o, x as n } from "./lit-element-Dj1nHH6C.js";
import { e as i, n as r } from "./ref-B-kqFHPy.js";
import "./bib-consent-dialog.js";
import "./type-BPiIb9Kq.js";
class a extends e {
  constructor() {
    super(), this.open = false, this.dialogRef = i();
  }
  setConsentTokens(e2) {
    this.dispatchEvent(new CustomEvent("update", { detail: e2 }));
  }
  show() {
    this.dialogRef.value && !this.dialogRef.value.open && this.dialogRef.value?.show();
  }
  close() {
    this.dialogRef.value && this.dialogRef.value.open && this.dialogRef.value?.close();
  }
  showPreferences() {
    this.dispatchEvent(new CustomEvent("show-preferences"));
  }
  render() {
    return n`<bib-consent-dialog class="consent-dialog" ${r(this.dialogRef)}><div class="title" autofocus>L’UdeM reconnaît l’importance de respecter la vie privée</div><p>L’utilisation de témoins nous permet d’améliorer et de personnaliser votre expérience Web. Certains témoins sont obligatoires pour assurer le fonctionnement et la sécurité du site Web, alors que d’autres enregistrent vos préférences. En acceptant tout, vous consentez à notre utilisation de témoins pour mieux répondre à vos besoins.</p><div class="actions-container"><button class="btn--outlined" type="button" @click="${() => this.showPreferences()}">Personnaliser les témoins <span>></span></button> <button class="btn--filled" type="button" @click="${() => this.setConsentTokens(false)}">Tout refuser</button> <button class="btn--filled" type="button" @click="${() => this.setConsentTokens(true)}">Tout accepter</button></div><p class="learn-more-container">Voir notre <a href="https://vie-privee.umontreal.ca/confidentialite">politique de confidentialité</a> et nos <a href="https://vie-privee.umontreal.ca/conditions-dutilisation">conditions d’utilisation</a>.</p></bib-consent-dialog>`;
  }
}
__publicField(a, "properties", { debug: { type: Boolean, reflect: true }, open: { type: Boolean, state: true } });
__publicField(a, "styles", [t`${o("@layer reset{:host,*{box-sizing:border-box}:host{-webkit-font-smoothing:antialiased}}@layer theme{a{text-decoration:underline;text-underline-offset:2px;color:inherit}}@layer component{p{font-size:var(--_consent-text-size);line-height:var(--_consent-text-line-height)}.title{font-size:var(--_consent-title-text-size);line-height:var(--_consent-title-text-line-height);padding-bottom:12.5px}.learn-more-container{margin:20px 0 0}@media screen and (min-width: 640px){.learn-more-container{margin:14px 0 0;padding-bottom:5px}}p{font-size:var(--_consent-text-size);line-height:var(--_consent-text-line-height);padding-bottom:20px}@media screen and (min-width: 640px){p{padding-bottom:5px}}.actions-container{display:flex;justify-content:center;margin:0 auto;flex-direction:column;gap:.5rem}@media screen and (min-width: 640px){.actions-container{flex-direction:row;justify-content:normal;margin:0;gap:0}}@media screen and (min-width: 640px){.confirm-selection{margin-left:0}}.update-information{margin-top:20px}details>summary{list-style:none}details>summary::-webkit-details-marker{display:none}.toggle-container{display:inline-block;position:absolute;right:15px;top:15px}.toggle-container.label{color:#0b113a;font-size:var(--_consent-text-size);line-height:var(--_consent-text-line-height);right:10px;text-align:right;text-wrap:wrap;top:4px;white-space:normal;width:70px}@media screen and (min-width: 480px){.toggle-container.label{right:15px;top:15px;width:auto}}.toggle-container:focus{box-shadow:0 0 0 var(--toggle-ring-width, 3px) var(--toggle-ring-color, rgba(16, 185, 129, .188));outline:none}.toggle{align-items:center;border:var(--toggle-border, .125rem) solid;border-radius:999px;box-sizing:content-box;cursor:pointer;display:flex;font-size:var(--toggle-font-size, .75rem);height:var(--toggle-height, 1.25rem);line-height:1;position:relative;transition:all .3s;width:var(--toggle-width, 3rem)}.toggle-on{background:var(--toggle-bg-on, #52b782);border-color:var(--toggle-border-on, #52b782);color:var(--toggle-text-on, #fff);justify-content:flex-start}.toggle-off{background:var(--toggle-bg-off, #e5e7eb);border-color:var(--toggle-border-off, #e5e7eb);color:var(--toggle-text-off, #374151);justify-content:flex-end}.toggle-on-disabled{background:var(--toggle-bg-on-disabled, #d1d5db);border-color:var(--toggle-border-on-disabled, #d1d5db);color:var(--toggle-text-on-disabled, #9ca3af);cursor:not-allowed;justify-content:flex-start}.toggle-off-disabled{background:var(--toggle-bg-off-disabled, #e5e7eb);border-color:var(--toggle-border-off-disabled, #e5e7eb);color:var(--toggle-text-off-disabled, #9ca3af);cursor:not-allowed;justify-content:flex-end}.toggle-handle{background:var(--toggle-handle-enabled, #fff);border-radius:50%;display:inline-block;height:var(--toggle-height, 1.25rem);position:absolute;top:0;transition-duration:var(--toggle-duration, .15s);transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);width:var(--toggle-height, 1.25rem)}.toggle-handle-on{left:100%;transform:translate(-100%)}.toggle-handle-off{left:0}.toggle-handle-on-disabled{background:var(--toggle-handle-disabled, #f3f4f6);left:100%;transform:translate(-100%)}.toggle-handle-off-disabled{background:var(--toggle-handle-disabled, #f3f4f6);left:0}.toggle-label{box-sizing:border-box;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;white-space:nowrap;width:calc(var(--toggle-width, 3.25rem) - var(--toggle-height, 1.25rem))}}@layer component{sp-switch{--mod-switch-height: 40px;--highcontrast-switch-background-color: silver;--mod-switch-control-height: 18px}}.btn--outlined,.btn--filled{font-size:var(--_consent-text-size);line-height:var(--_consent-text-line-height);display:flex;justify-content:center;align-items:center;font-weight:500;margin:7.5px auto 0;padding:5px 15px;width:200px}@media screen and (min-width: 640px){.btn--outlined,.btn--filled{float:left;margin:7.5px 0 0 7.5px;width:auto}}@media (max-width: 899px){.btn--outlined,.btn--filled{height:40px}}.btn--outlined span,.btn--filled span{color:#0057ac;padding-left:6.25px}@layer component{.btn--filled{background-color:#0b113a;color:#fff}.btn--outlined{background-color:transparent;border:1px solid #0057ac;color:#0b113a}@media screen and (min-width: 640px){.btn--outlined{margin-left:0}}}@layer reset,theme,component,states;@layer reset{button{border:unset;padding:0;background:none;font:inherit;border:none}button::-moz-focus-inner{border:none}button:focus{outline:none}button:not(:disabled),button [type=button]:not(:disabled),button [type=reset]:not(:disabled),button [type=submit]:not(:disabled),button [role=button]:not(:disabled){cursor:pointer}button:disabled{pointer-events:none}}@layer reset{p{margin:0}}")}`]);
window.customElements.get("bib-consent-consent-dialog") || window.customElements.define("bib-consent-consent-dialog", a);
export {
  a as BibConsentConsentDialog
};
//# sourceMappingURL=bib-consent-consent-dialog.js.map
