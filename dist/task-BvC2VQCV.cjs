/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.6.2
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const t=require("./lit-element-B9Hck3Na.cjs"),s=Symbol(),e=(s,e)=>s===e||s.length===e.length&&s.every(((s,r)=>!t.notEqual(s,e[r])))
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;exports.Task=class{get taskComplete(){return this._taskComplete||(1===this.status?this._taskComplete=new Promise(((t,s)=>{this._resolveTaskComplete=t,this._rejectTaskComplete=s})):3===this.status?this._taskComplete=Promise.reject(this._error):this._taskComplete=Promise.resolve(this._value)),this._taskComplete}constructor(t,s,r){this._callId=0,this.status=0,(this._host=t).addController(this);const i="object"==typeof s?s:{task:s,args:r};this._task=i.task,this._argsFn=i.args,this._argsEqual=i.argsEqual??e,this._onComplete=i.onComplete,this._onError=i.onError,this.autoRun=i.autoRun??!0,"initialValue"in i&&(this._value=i.initialValue,this.status=2,this._previousArgs=this._getArgs?.())}hostUpdate(){!0===this.autoRun&&this._performTask()}hostUpdated(){"afterUpdate"===this.autoRun&&this._performTask()}_getArgs(){if(void 0===this._argsFn)return;const t=this._argsFn();if(!Array.isArray(t))throw new Error("The args function must return an array");return t}async _performTask(){const t=this._getArgs(),s=this._previousArgs;this._previousArgs=t,t===s||void 0===t||void 0!==s&&this._argsEqual(s,t)||await this.run(t)}async run(t){let e,r;t??=this._getArgs(),this._previousArgs=t,1===this.status?this._abortController?.abort():(this._taskComplete=void 0,this._resolveTaskComplete=void 0,this._rejectTaskComplete=void 0),this.status=1,"afterUpdate"===this.autoRun?queueMicrotask((()=>this._host.requestUpdate())):this._host.requestUpdate();const i=++this._callId;this._abortController=new AbortController;let a=!1;try{e=await this._task(t,{signal:this._abortController.signal})}catch(o){a=!0,r=o}if(this._callId===i){if(e===s)this.status=0;else{if(!1===a){try{this._onComplete?.(e)}catch{}this.status=2,this._resolveTaskComplete?.(e)}else{try{this._onError?.(r)}catch{}this.status=3,this._rejectTaskComplete?.(r)}this._value=e,this._error=r}this._host.requestUpdate()}}abort(t){1===this.status&&this._abortController?.abort(t)}get value(){return this._value}get error(){return this._error}render(t){switch(this.status){case 0:return t.initial?.();case 1:return t.pending?.();case 2:return t.complete?.(this.value);case 3:return t.error?.(this.error);default:throw new Error(`Unexpected status: ${this.status}`)}}};
//# sourceMappingURL=task-BvC2VQCV.cjs.map
