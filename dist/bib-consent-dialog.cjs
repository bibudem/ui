/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.15.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var o,e,r,t=Object.defineProperty,n=o=>{throw TypeError(o)},s=(o,e,r)=>((o,e,r)=>e in o?t(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r)(o,"symbol"!=typeof e?e+"":e,r),i=(o,e,r)=>(((o,e,r)=>{e.has(o)||n("Cannot "+r)})(o,e,"access private method"),r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("./lit-element-BHNMc-Kg.cjs"),c=require("./ref-mxufyLY8.cjs");require("./type-KOUr406I.cjs");class d extends a.s{constructor(){var e,r,t;super(),e=this,(r=o).has(e)?n("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(e):r.set(e,t),this.open=!1,this.showClose=this.showClose||!1,this._dialogRef=c.e()}connectedCallback(){super.connectedCallback(),this._dialogRef.value?.addEventListener("close",(()=>this.close()))}show(){i(this,o,r).call(this)}showModal(){i(this,o,r).call(this,"modal")}close(o=!0){this.open=!1,this._dialogRef.value&&this._dialogRef.value.open&&this._dialogRef.value?.close(),o&&this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return a.x`<dialog class="dialog" ${c.n(this._dialogRef)}>${i(this,o,e).call(this)}<div class="dialog-container"><div class="content-container"><slot></slot></div></div></dialog>`}}o=new WeakSet,e=function(){return this.showClose?a.x`<bib-button-close @click="${()=>this.close()}" class="btn-close"></bib-button-close>`:a.T},r=function(o=""){this._dialogRef.value&&!this._dialogRef.value.open&&("modal"===o?this._dialogRef.value?.showModal():this._dialogRef.value?.show(),this.open=!0)},s(d,"properties",{debug:{type:Boolean,reflect:!0},open:{type:Boolean,reflect:!0},showClose:{type:Boolean,reflect:!0,attribute:"show-close"}}),s(d,"styles",[a.i`${a.r("@layer reset{:host,*{box-sizing:border-box}:host{-webkit-font-smoothing:antialiased}}:host{--md-sys-color-primary: rgb(64 95 144);--md-sys-color-surface-tint: rgb(64 95 144);--md-sys-color-on-primary: rgb(255 255 255);--md-sys-color-primary-container: rgb(214 227 255);--md-sys-color-on-primary-container: rgb(0 27 61);--md-sys-color-secondary: rgb(85 95 113);--md-sys-color-on-secondary: rgb(255 255 255);--md-sys-color-secondary-container: rgb(218 226 249);--md-sys-color-on-secondary-container: rgb(18 28 43);--md-sys-color-tertiary: rgb(144 74 69);--md-sys-color-on-tertiary: rgb(255 255 255);--md-sys-color-tertiary-container: rgb(255 218 214);--md-sys-color-on-tertiary-container: rgb(59 9 8);--md-sys-color-error: rgb(144 74 67);--md-sys-color-on-error: rgb(255 255 255);--md-sys-color-error-container: rgb(255 218 214);--md-sys-color-on-error-container: rgb(59 9 7);--md-sys-color-background: rgb(249 249 255);--md-sys-color-on-background: rgb(25 28 32);--md-sys-color-surface: rgb(249 249 255);--md-sys-color-on-surface: rgb(25 28 32);--md-sys-color-surface-variant: rgb(224 226 236);--md-sys-color-on-surface-variant: rgb(68 71 78);--md-sys-color-outline: rgb(116 119 127);--md-sys-color-outline-variant: rgb(196 198 207);--md-sys-color-shadow: rgb(0 0 0);--md-sys-color-scrim: rgb(0 0 0);--md-sys-color-inverse-surface: rgb(46 48 54);--md-sys-color-inverse-on-surface: rgb(240 240 247);--md-sys-color-inverse-primary: rgb(169 199 255);--md-sys-color-primary-fixed: rgb(214 227 255);--md-sys-color-on-primary-fixed: rgb(0 27 61);--md-sys-color-primary-fixed-dim: rgb(169 199 255);--md-sys-color-on-primary-fixed-variant: rgb(39 71 119);--md-sys-color-secondary-fixed: rgb(218 226 249);--md-sys-color-on-secondary-fixed: rgb(18 28 43);--md-sys-color-secondary-fixed-dim: rgb(189 199 220);--md-sys-color-on-secondary-fixed-variant: rgb(62 71 88);--md-sys-color-tertiary-fixed: rgb(255 218 214);--md-sys-color-on-tertiary-fixed: rgb(59 9 8);--md-sys-color-tertiary-fixed-dim: rgb(255 179 173);--md-sys-color-on-tertiary-fixed-variant: rgb(115 51 47);--md-sys-color-surface-dim: rgb(217 217 224);--md-sys-color-surface-bright: rgb(249 249 255);--md-sys-color-surface-container-lowest: rgb(255 255 255);--md-sys-color-surface-container-low: rgb(243 243 250);--md-sys-color-surface-container: rgb(237 237 244);--md-sys-color-surface-container-high: rgb(231 232 238);--md-sys-color-surface-container-highest: rgb(226 226 233);--md-extended-color-warning-color: rgb(100 97 22);--md-extended-color-warning-on-color: rgb(255 255 255);--md-extended-color-warning-color-container: rgb(236 230 141);--md-extended-color-warning-on-color-container: rgb(30 28 0)}@layer reset,theme,component,states;@layer reset{button{border:unset;padding:0;background:none;font:inherit;border:none}button::-moz-focus-inner{border:none}button:focus{outline:none}button:not(:disabled),button [type=button]:not(:disabled),button [type=reset]:not(:disabled),button [type=submit]:not(:disabled),button [role=button]:not(:disabled){cursor:pointer}button:disabled{pointer-events:none}}@layer reset{dialog{margin:0;padding:0;border:unset;color:inherit;background-color:#fff;inset-block:0;max-width:unset;max-height:unset}}@layer component{:host{--_consent-dialog-height: 450px;--_consent-dialog-max-height: 80%;--_consent-dialog-height-sm: auto;--_consent-content-height: 100%;--_consent-text-size: 14.62px;--_consent-text-line-height: 17.5px;--_consent-title-text-size: 18px;--_consent-title-text-line-height: 20px;font-size:var(--_consent-text-size);line-height:var(--_consent-text-line-height)}:host(.preferences-dialog){--_consent-dialog-height: 80%;--_consent-dialog-height-sm: 450px;--_consent-content-height: auto}.btn-close{position:absolute;right:15px;top:15px;z-index:10}.dialog{border-top:10px solid #0b113a;top:auto;bottom:0;color:#0b113a;background:#e5f0f8;height:var(--_consent-dialog-height);max-height:var(--_consent-dialog-max-height);text-align:left;overflow:hidden;position:fixed;width:100%;padding-top:50px;padding-bottom:10px;z-index:10000}@media screen and (min-width: 640px){.dialog{height:var(--_consent-dialog-height-sm)}}.dialog::backdrop{background-color:#00000080}.dialog-container{display:flex;height:100%;justify-content:center;overflow-y:auto}.dialog-container::-webkit-scrollbar{width:11px}.dialog-container::-webkit-scrollbar-track{border-radius:9999em}.dialog-container::-webkit-scrollbar-thumb{background-color:#aaa;border-radius:9999em;transition:background-color 5.2s linear,height .2s ease-in-out;height:6px}.dialog-container::-webkit-scrollbar-thumb:hover{background-color:#999}.content-container{height:var(--_consent-content-height);margin:0 auto;max-width:1200px;padding:0 35px 15px;z-index:0}@media screen and (min-width: 640px){.content-container{height:auto;padding:0 50px 20px}}}")}`]),window.customElements.get("bib-consent-dialog")||window.customElements.define("bib-consent-dialog",d),exports.BibConsentDialog=d;
//# sourceMappingURL=bib-consent-dialog.cjs.map
