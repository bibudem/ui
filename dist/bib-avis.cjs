"use strict";var _=Object.defineProperty;var g=(s,t,e)=>t in s?_(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var l=(s,t,e)=>(g(s,typeof t!="symbol"?t+"":t,e),e);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=require("./lit-element-OYhHDmBi.cjs");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const r={INITIAL:0,PENDING:1,COMPLETE:2,ERROR:3},m=Symbol();class b{get taskComplete(){return this._taskComplete?this._taskComplete:(this.status===r.PENDING?this._taskComplete=new Promise((t,e)=>{this._resolveTaskComplete=t,this._rejectTaskComplete=e}):this.status===r.ERROR?this._taskComplete=Promise.reject(this._error):this._taskComplete=Promise.resolve(this._value),this._taskComplete)}constructor(t,e,i){this._callId=0,this.status=r.INITIAL,(this._host=t).addController(this);const n=typeof e=="object"?e:{task:e,args:i};this._task=n.task,this._argsFn=n.args,this._argsEqual=n.argsEqual??f,this._onComplete=n.onComplete,this._onError=n.onError,this.autoRun=n.autoRun??!0,"initialValue"in n&&(this._value=n.initialValue,this.status=r.COMPLETE,this._previousArgs=this._getArgs?.())}hostUpdate(){this.autoRun===!0&&this._performTask()}hostUpdated(){this.autoRun==="afterUpdate"&&this._performTask()}_getArgs(){if(this._argsFn===void 0)return;const t=this._argsFn();if(!Array.isArray(t))throw new Error("The args function must return an array");return t}async _performTask(){const t=this._getArgs(),e=this._previousArgs;this._previousArgs=t,t!==e&&t!==void 0&&(e===void 0||!this._argsEqual(e,t))&&await this.run(t)}async run(t){t??=this._getArgs(),this._previousArgs=t,this.status===r.PENDING?this._abortController?.abort():(this._taskComplete=void 0,this._resolveTaskComplete=void 0,this._rejectTaskComplete=void 0),this.status=r.PENDING;let e,i;this.autoRun==="afterUpdate"?queueMicrotask(()=>this._host.requestUpdate()):this._host.requestUpdate();const n=++this._callId;this._abortController=new AbortController;let a=!1;try{e=await this._task(t,{signal:this._abortController.signal})}catch(h){a=!0,i=h}if(this._callId===n){if(e===m)this.status=r.INITIAL;else{if(a===!1){try{this._onComplete?.(e)}catch{}this.status=r.COMPLETE,this._resolveTaskComplete?.(e)}else{try{this._onError?.(i)}catch{}this.status=r.ERROR,this._rejectTaskComplete?.(i)}this._value=e,this._error=i}this._host.requestUpdate()}}abort(t){this.status===r.PENDING&&this._abortController?.abort(t)}get value(){return this._value}get error(){return this._error}render(t){switch(this.status){case r.INITIAL:return t.initial?.();case r.PENDING:return t.pending?.();case r.COMPLETE:return t.complete?.(this.value);case r.ERROR:return t.error?.(this.error);default:throw new Error(`Unexpected status: ${this.status}`)}}}const f=(s,t)=>s===t||s.length===t.length&&s.every((e,i)=>!o.notEqual(e,t[i]));/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},E=s=>(...t)=>({_$litDirective$:s,values:t});class T{constructor(t){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(t,e,i){this.__part=t,this._$parent=e,this.__attributeIndex=i}_$resolve(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=1;class u extends T{constructor(t){if(super(t),this._value=o.nothing,t.type!==v.CHILD)throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`)}render(t){if(t===o.nothing||t==null)return this._templateResult=void 0,this._value=t;if(t===o.noChange)return t;if(typeof t!="string")throw new Error(`${this.constructor.directiveName}() called with a non-string value`);if(t===this._value)return this._templateResult;this._value=t;const e=[t];return e.raw=e,this._templateResult={_$litType$:this.constructor.resultType,strings:e,values:[]}}}u.directiveName="unsafeHTML";u.resultType=k;const p=E(u),C='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>';function w(s){return s.textContent.trim()===""}class c extends o.LitElement{constructor(){super();l(this,"_avisTask",new b(this,{task:async([e,i,n],{signal:a})=>{const h=new URL(`${i}/${n}`,e),d=await fetch(h,{headers:{Accept:"application/json"},signal:a});if(!d.ok)throw new Error(reaponse.status);return d.json()},args:()=>[this.service,this.contexte,this.niveau]}));this.service="https://avis.bib.umontreal.ca",this.contexte="site-web-dev",this.niveau="important",this.boutonFermer=!1}_onBtnFermerClick(){alert("Fonction à venir!")}_renderBoutonFermer(){return this.boutonFermer?o.html`<button class="btn-close" aria-label="Fermer" @click="${this._onBtnFermerClick}">${p(C)}</button>`:null}_renderAvis(e){return e?o.html`<div class="container"><div class="inner"><div class="message">${p(e)}</div>${this._renderBoutonFermer()}</div></div>`:null}_renderRemote(){return this._avisTask.render({pending:()=>o.html``,complete:e=>this._renderAvis(e.message),error:e=>(console.log(e),null)})}_renderLocal(){return this._renderAvis("<slot />")}render(){return w(this)?this._renderRemote():this._renderLocal()}}l(c,"properties",{service:{type:String},contexte:{type:String,default:"site-web"},niveau:{type:String},boutonFermer:{type:Boolean}}),l(c,"styles",o.css`*,:host{box-sizing:border-box}:host{display:block;font-size:var(--bib-avis-size,var(--md-sys-typescale-title-medium-size,1rem));background:var(--bib-avis-container-color,var(--md-sys-color-warningContainer,#fffac6))}.inner{display:flex;align-items:center;max-width:1220px;margin:0 auto;padding:11px 19px;gap:1em}.message{flex-grow:1;min-height:24px}.btn-close{display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0;border:0;margin:0;cursor:pointer;user-select:none;vertical-align:middle;appearance:none;text-decoration:none;text-align:center;flex:0 0 auto;font-size:1.5rem;font-size:36px;font-weight:700;line-height:1;position:relative;padding:8px;padding:0;border-radius:50%;overflow:visible;color:var(--bib-btn-close-color,rgba(0,0,0,.4));transition:all 150ms cubic-bezier(.4,0,.2,1) 0s}.btn-close:hover{color:var(--bib-btn-close-hover-color,rgba(0,0,0,.8))}.btn-close::after{content:'';position:absolute;width:calc(100% + 16px);height:calc(100% + 16px);border-radius:50%;background-color:transparent;transition:background-color 150ms cubic-bezier(.4,0,.2,1) 0s}.btn-close:hover::after{background-color:rgba(0,0,0,.04)}.btn-close>svg{fill:currentColor}`);customElements.define("bib-avis",c);exports.BibAvis=c;
//# sourceMappingURL=bib-avis.cjs.map
