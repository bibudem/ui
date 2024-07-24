/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var e,t,s,i,n,r,o,c,a,h,l,u=Object.defineProperty,p=e=>{throw TypeError(e)},d=(e,t,s)=>((e,t,s)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s)(e,"symbol"!=typeof t?t+"":t,s),b=(e,t,s)=>t.has(e)||p("Cannot "+s),f=(e,t,s)=>(b(e,t,"read from private field"),s?s.call(e):t.get(e)),v=(e,t,s)=>t.has(e)?p("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),g=(e,t,s,i)=>(b(e,t,"write to private field"),i?i.call(e,s):t.set(e,s),s),w=(e,t,s)=>(b(e,t,"access private method"),s);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const E=require("./lit-element-BHNMc-Kg.cjs"),m=require("./ref-mxufyLY8.cjs"),x=require("./bib-consent-preferences-dialog-Dq5-OJzv.cjs");require("./bib-button-close.cjs"),require("./bib-consent-consent-dialog.cjs");const C=require("./preferencesClient.cjs"),P=require("./consent-context.cjs"),q=require("./constants-CCyyIJHD.cjs"),y=require("./logger-giWQC3ye.cjs");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class T{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){const s=t||!Object.is(e,this.o);this.o=e,s&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[e,{disposer:t}]of this.subscriptions)e(this.o,t)},void 0!==e&&(this.value=e)}addCallback(e,t,s){if(!s)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});const{disposer:i}=this.subscriptions.get(e);e(this.value,i)}clearCallbacks(){this.subscriptions.clear()}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class R extends Event{constructor(e){super("context-provider",{bubbles:!0,composed:!0}),this.context=e}}class k extends T{constructor(e,t,s){super(void 0!==t.context?t.initialValue:s),this.onContextRequest=e=>{const t=e.composedPath()[0];e.context===this.context&&t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{const t=e.composedPath()[0];if(e.context!==this.context||t===this.host)return;const s=new Set;for(const[i,{consumerHost:n}]of this.subscriptions)s.has(i)||(s.add(i),n.dispatchEvent(new x.s(this.context,i,!0)));e.stopPropagation()},this.host=e,void 0!==t.context?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new R(this.context))}}const D=y.loggerFactory("bib-consent","#cd5300");class _ extends E.s{constructor(){super(),v(this,r),d(this,"_preferencesClient"),v(this,e),v(this,t),v(this,s),v(this,i),v(this,n),this.open=!1,this.currentDialog=null,g(this,t,m.e()),g(this,s,m.e()),g(this,i,new k(this,{context:P.consentContext,initialValue:null})),g(this,n,new x.s$1(this,{context:P.consentContext,callback:this.savePreferences}))}get preferences(){return f(this,n).value}async connectedCallback(){super.connectedCallback(),this.debug=this.debug||!1,this.serverUrl=this.serverUrl||"https://bib.umontreal.ca/consent/server",this.serverRequestTimeout=this.serverRequestTimeout||q.SERVER_REQUEST_DEFAULT_TIMEOUT,this._preferencesClient=await C({host:this,serverUrl:this.serverUrl,serverRequestTimeout:this.serverRequestTimeout,reflectEvents:!0}),this._preferencesClient.addEventListener(q.EVENT_NAMES.READY,(e=>{w(this,r,o).call(this,q.EVENT_NAMES.READY,"event: ",e),e.detail?f(this,i).setValue(e.detail):w(this,r,a).call(this,"consent")}))}close(){w(this,r,c).call(this)}show(){w(this,r,a).call(this,"consent")}showPreferences(){w(this,r,o).call(this,"[showPreferences]"),w(this,r,a).call(this,"preferences")}async getPreferences(){return g(this,e,await this._preferencesClient.getPreferences()),f(this,e)}async savePreferences(e){w(this,r,o).call(this,"[savePreferences] preferences: ",e);try{return await this._preferencesClient.setPreferences(e),f(this,i).setValue(e),!0}catch(t){throw console.error("[savePreferences] error: ",t),t}}async resetPreferences(){return g(this,e,await this._preferencesClient.resetPreferences()),f(this,e)}render(){return E.x`<bib-consent-consent-dialog @update="${w(this,r,h)}" @show-preferences="${()=>w(this,r,a).call(this,"preferences")}" ${m.n(f(this,t))} @close="${w(this,r,l)}"></bib-consent-consent-dialog><bib-consent-preferences-dialog @update="${w(this,r,h)}" ${m.n(f(this,s))} @close="${w(this,r,l)}"></bib-consent-preferences-dialog>`}}e=new WeakMap,t=new WeakMap,s=new WeakMap,i=new WeakMap,n=new WeakMap,r=new WeakSet,o=function(){this.debug&&D(...arguments)},c=function(e=!0){this.open=!1,this.currentDialog?.close(e),this.currentDialog=null},a=function(e="consent"){if("string"!=typeof e&&!["consent","preferences"].includes(e))throw new TypeError("The panel argument must be a string of either values 'consent' or 'preferences'. ",e);this.open=!0,this.currentDialog&&(w(this,r,o).call(this,"[#show] this.currentDialog",this.currentDialog),this.currentDialog.close()),w(this,r,o).call(this,"[show]",f(this,t).value),w(this,r,o).call(this,"[show]",f(this,s).value),this.currentDialog="consent"===e?f(this,t).value:f(this,s).value,this.currentDialog.show()},h=async function(e){w(this,r,o).call(this,"[#handleUpdateEvent]",e);const t=await this.savePreferences(e.detail);w(this,r,o).call(this,"[#handleUpdateEvent] success: ",t),t&&(this.dispatchEvent(new CustomEvent(q.EVENT_NAMES.UPDATE,{detail:e.detail})),w(this,r,c).call(this))},l=function(e){e.stopPropagation(),w(this,r,c).call(this,!1)},d(_,"properties",{serverUrl:{type:String,attribute:"server-url",reflect:!0},serverRequestTimeout:{type:Number,attribute:"server-request-timeout",reflect:!0},[q.SERVER_MODE.LOCAL]:{type:Boolean},debug:{type:Boolean,reflect:!0},open:{type:Boolean,reflect:!0}}),window.customElements.get("bib-consent")||window.customElements.define("bib-consent",_),exports.BibConsent=_;
//# sourceMappingURL=bib-consent.cjs.map
