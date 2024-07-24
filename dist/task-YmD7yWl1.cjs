/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.12.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const t=require("./lit-element-BHNMc-Kg.cjs"),s=Symbol(),i=(s,i)=>s===i||s.length===i.length&&s.every(((s,h)=>!t.f(s,i[h])))
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;exports.h=class{get taskComplete(){return this.t||(1===this.status?this.t=new Promise(((t,s)=>{this.i=t,this.o=s})):3===this.status?this.t=Promise.reject(this.h):this.t=Promise.resolve(this.l)),this.t}constructor(t,s,h){this.u=0,this.status=0,(this.p=t).addController(this);const e="object"==typeof s?s:{task:s,args:h};this._=e.task,this.v=e.args,this.j=e.argsEqual??i,this.m=e.onComplete,this.g=e.onError,this.autoRun=e.autoRun??!0,"initialValue"in e&&(this.l=e.initialValue,this.status=2,this.k=this.A?.())}hostUpdate(){!0===this.autoRun&&this.O()}hostUpdated(){"afterUpdate"===this.autoRun&&this.O()}A(){if(void 0===this.v)return;const t=this.v();if(!Array.isArray(t))throw Error("The args function must return an array");return t}async O(){const t=this.A(),s=this.k;this.k=t,t===s||void 0===t||void 0!==s&&this.j(s,t)||await this.run(t)}async run(t){let i,h;t??=this.A(),this.k=t,1===this.status?this.T?.abort():(this.t=void 0,this.i=void 0,this.o=void 0),this.status=1,"afterUpdate"===this.autoRun?queueMicrotask((()=>this.p.requestUpdate())):this.p.requestUpdate();const e=++this.u;this.T=new AbortController;let r=!1;try{i=await this._(t,{signal:this.T.signal})}catch(a){r=!0,h=a}if(this.u===e){if(i===s)this.status=0;else{if(!1===r){try{this.m?.(i)}catch{}this.status=2,this.i?.(i)}else{try{this.g?.(h)}catch{}this.status=3,this.o?.(h)}this.l=i,this.h=h}this.p.requestUpdate()}}abort(t){1===this.status&&this.T?.abort(t)}get value(){return this.l}get error(){return this.h}render(t){switch(this.status){case 0:return t.initial?.();case 1:return t.pending?.();case 2:return t.complete?.(this.value);case 3:return t.error?.(this.error);default:throw Error("Unexpected status: "+this.status)}}};
//# sourceMappingURL=task-YmD7yWl1.cjs.map
