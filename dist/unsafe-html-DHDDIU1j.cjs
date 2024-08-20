/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const e=require("./lit-element-ibXEACGN.cjs"),t=require("./directive-B_m8pQIJ.cjs");class r extends t.Directive{constructor(r){if(super(r),this._value=e.nothing,r.type!==t.PartType.CHILD)throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`)}render(t){if(t===e.nothing||null==t)return this._templateResult=void 0,this._value=t;if(t===e.noChange)return t;if("string"!=typeof t)throw new Error(`${this.constructor.directiveName}() called with a non-string value`);if(t===this._value)return this._templateResult;this._value=t;const r=[t];return r.raw=r,this._templateResult={_$litType$:this.constructor.resultType,strings:r,values:[]}}}r.directiveName="unsafeHTML",r.resultType=1;const i=t.directive(r);exports.unsafeHTML=i;
//# sourceMappingURL=unsafe-html-DHDDIU1j.cjs.map
