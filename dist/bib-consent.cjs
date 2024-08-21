/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.18.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var e,t,s,n,i,o,r,c,a,h,l,u,d,p=Object.defineProperty,b=e=>{throw TypeError(e)},v=(e,t,s)=>((e,t,s)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s)(e,"symbol"!=typeof t?t+"":t,s),E=(e,t,s)=>t.has(e)||b("Cannot "+s),f=(e,t,s)=>(E(e,t,"read from private field"),s?s.call(e):t.get(e)),g=(e,t,s)=>t.has(e)?b("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),T=(e,t,s,n)=>(E(e,t,"write to private field"),n?n.call(e,s):t.set(e,s),s),w=(e,t,s)=>(E(e,t,"access private method"),s);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const m=require("./lit-element-BHNMc-Kg.cjs"),C=require("./ref-mxufyLY8.cjs"),k=require("./bib-consent-preferences-dialog-CxRzxDFx.cjs"),x=require("./logger-7czOFXys.cjs"),q=require("./bib-BaYNl0jl.cjs");require("./bib-button-close.cjs"),require("./bib-consent-consent-dialog.cjs");const y=require("./consentClient.cjs"),S=require("./consent-context.cjs"),R=require("./constants-CK6XJvuv.cjs"),D=require("./ConsentTokens.cjs");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class M{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){const s=t||!Object.is(e,this.o);this.o=e,s&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[e,{disposer:t}]of this.subscriptions)e(this.o,t)},void 0!==e&&(this.value=e)}addCallback(e,t,s){if(!s)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});const{disposer:n}=this.subscriptions.get(e);e(this.value,n)}clearCallbacks(){this.subscriptions.clear()}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class _ extends Event{constructor(e){super("context-provider",{bubbles:!0,composed:!0}),this.context=e}}class j extends M{constructor(e,t,s){super(void 0!==t.context?t.initialValue:s),this.onContextRequest=e=>{const t=e.composedPath()[0];e.context===this.context&&t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{const t=e.composedPath()[0];if(e.context!==this.context||t===this.host)return;const s=new Set;for(const[n,{consumerHost:i}]of this.subscriptions)s.has(n)||(s.add(n),i.dispatchEvent(new k.s(this.context,n,!0)));e.stopPropagation()},this.host=e,void 0!==t.context?this.context=t.context:this.context=t,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new _(this.context))}}const N=x.loggerFactory("bib-consent","#cd5300");class P extends m.s{constructor(){super(),g(this,r),v(this,"_consentClient"),g(this,e),g(this,t),g(this,s),g(this,n,R.CONSENT_STATES.INDETERMINATE),g(this,i),g(this,o),this.open=!1,this.currentDialog=null,T(this,i,C.e()),T(this,o,C.e()),T(this,t,new j(this,{context:S.consentContext,initialValue:new D.ConsentTokens})),T(this,s,new k.s$1(this,{context:S.consentContext,callback:this.savePreferences}))}get state(){return f(this,n)}get consentTokens(){return f(this,s).value}async connectedCallback(){super.connectedCallback(),this.debug=this.debug||!1,this.serverUrl=this.serverUrl||"https://bib.umontreal.ca/consent/server",this.serverRequestTimeout=this.serverRequestTimeout||R.SERVER_REQUEST_DEFAULT_TIMEOUT,this._consentClient=await y({host:this,serverUrl:this.serverUrl,serverRequestTimeout:this.serverRequestTimeout,reflectEvents:!0}),this._consentClient.addEventListener(R.EVENT_NAMES.READY,(e=>{const{detail:t}=e;w(this,r,a).call(this,R.EVENT_NAMES.READY,"event: ",e),t.state()===R.CONSENT_STATES.DETERMINATE?w(this,r,c).call(this,t):w(this,r,l).call(this,"consent")}))}close(){w(this,r,h).call(this)}show(){w(this,r,l).call(this,"consent")}showPreferences(){w(this,r,l).call(this,"preferences")}async getTokens(){return T(this,e,await this._consentClient.getConsentTokens()),f(this,e)}async saveTokens(e){w(this,r,a).call(this,"[save] tokens: ",e);const t=D.ConsentTokens.from(e);try{return await this._consentClient.setConsentTokens(t),w(this,r,c).call(this,t),!0}catch(s){throw console.error("[savePreferences] error: ",s),s}}async resetTokens(){return T(this,e,await this._consentClient.resetTokens()),f(this,e)}render(){return m.x`<bib-consent-consent-dialog @update="${w(this,r,u)}" @show-preferences="${()=>w(this,r,l).call(this,"preferences")}" ${C.n(f(this,i))} @close="${w(this,r,d)}"></bib-consent-consent-dialog><bib-consent-preferences-dialog @update="${w(this,r,u)}" ${C.n(f(this,o))} @close="${w(this,r,d)}"></bib-consent-preferences-dialog>`}}e=new WeakMap,t=new WeakMap,s=new WeakMap,n=new WeakMap,i=new WeakMap,o=new WeakMap,r=new WeakSet,c=function(e){f(this,t).setValue(e),T(this,n,f(this,t).value.state())},a=function(){this.debug&&N(...arguments)},h=function(e=!0){this.open=!1,this.currentDialog?.close(e),this.currentDialog=null},l=function(e="consent"){if("string"!=typeof e&&!["consent","preferences"].includes(e))throw new TypeError("The panel argument must be a string of either values 'consent' or 'preferences'. ",e);this.open=!0,this.currentDialog&&(w(this,r,a).call(this,"[#show] this.currentDialog",this.currentDialog),this.currentDialog.close()),w(this,r,a).call(this,"[show]",f(this,i).value),w(this,r,a).call(this,"[show]",f(this,o).value),this.currentDialog="consent"===e?f(this,i).value:f(this,o).value,this.currentDialog.show()},u=async function(e){w(this,r,a).call(this,"[#handleUpdateEvent]",e);const t=await this.saveTokens(e.detail);w(this,r,a).call(this,"[#handleUpdateEvent] success: ",t),t&&(this.dispatchEvent(new CustomEvent(R.EVENT_NAMES.UPDATE,{detail:this.consentTokens})),w(this,r,h).call(this))},d=function(e){e.stopPropagation(),w(this,r,h).call(this,!1)},v(P,"properties",{serverUrl:{type:String,attribute:"server-url",reflect:!0},serverRequestTimeout:{type:Number,attribute:"server-request-timeout",reflect:!0},[R.SERVER_MODE.LOCAL]:{type:Boolean},state:{type:String},debug:{type:Boolean,reflect:!0},open:{type:Boolean,reflect:!0}}),window.customElements.get("bib-consent")||window.customElements.define("bib-consent",P),q.addToGlobalBib("consent",{}),exports.BibConsent=P;
//# sourceMappingURL=bib-consent.cjs.map
