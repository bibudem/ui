/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
exports.Directive=class{constructor(t){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(t,e,r){this.__part=t,this._$parent=e,this.__attributeIndex=r}_$resolve(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}},exports.PartType={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},exports.directive=t=>(...e)=>({_$litDirective$:t,values:e});
//# sourceMappingURL=directive-B_m8pQIJ.cjs.map
