/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const t=require("./lit-element-BHNMc-Kg.cjs"),r={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...r)=>({_$litDirective$:t,values:r})
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,e){this._$Ct=t,this._$AM=r,this._$Ci=e}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class s extends i{constructor(e){if(super(e),this.it=t.T,e.type!==r.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===t.T||null==r)return this._t=void 0,this.it=r;if(r===t.w)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;const e=[r];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}s.directiveName="unsafeHTML",s.resultType=1;const n=e(s);exports.e=e,exports.i=i,exports.o=n,exports.t=r;
//# sourceMappingURL=unsafe-html-B2HbvLQ3.cjs.map
