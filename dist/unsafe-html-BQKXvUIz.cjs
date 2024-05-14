/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.8.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const t=require("./lit-element-ibXEACGN.cjs"),e={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},r=t=>(...e)=>({_$litDirective$:t,values:e})
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;class i{constructor(t){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(t,e,r){this.__part=t,this._$parent=e,this.__attributeIndex=r}_$resolve(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class s extends i{constructor(r){if(super(r),this._value=t.nothing,r.type!==e.CHILD)throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`)}render(e){if(e===t.nothing||null==e)return this._templateResult=void 0,this._value=e;if(e===t.noChange)return e;if("string"!=typeof e)throw new Error(`${this.constructor.directiveName}() called with a non-string value`);if(e===this._value)return this._templateResult;this._value=e;const r=[e];return r.raw=r,this._templateResult={_$litType$:this.constructor.resultType,strings:r,values:[]}}}s.directiveName="unsafeHTML",s.resultType=1;const n=r(s);exports.Directive=i,exports.PartType=e,exports.directive=r,exports.unsafeHTML=n;
//# sourceMappingURL=unsafe-html-BQKXvUIz.cjs.map
