/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const e=require("./lit-element-ibXEACGN.cjs"),t=require("./directive-B_m8pQIJ.cjs");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */window.ShadyDOM?.inUse&&!0===window.ShadyDOM?.noPatch&&window.ShadyDOM.wrap;const i=(e,t)=>{const n=e._$disconnectableChildren;if(void 0===n)return!1;for(const s of n)s._$notifyDirectiveConnectionChanged?.(t,!1),i(s,t);return!0},n=e=>{let t,i;do{if(void 0===(t=e._$parent))break;i=t._$disconnectableChildren,i.delete(e),e=t}while(0===i?.size)},s=e=>{for(let t;t=e._$parent;e=t){let i=t._$disconnectableChildren;if(void 0===i)t._$disconnectableChildren=i=new Set;else if(i.has(e))break;i.add(e),h(t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function o(e){void 0!==this._$disconnectableChildren?(n(this),this._$parent=e,s(this)):this._$parent=e}function r(e,t=!1,s=0){const o=this._$committedValue,r=this._$disconnectableChildren;if(void 0!==r&&0!==r.size)if(t)if(Array.isArray(o))for(let h=s;h<o.length;h++)i(o[h],!1),n(o[h]);else null!=o&&(i(o,!1),n(o));else i(this,e)}const h=e=>{e.type==t.PartType.CHILD&&(e._$notifyConnectionChanged??=r,e._$reparentDisconnectables??=o)};class c extends t.Directive{constructor(){super(...arguments),this._$disconnectableChildren=void 0}_$initialize(e,t,i){super._$initialize(e,t,i),s(this),this.isConnected=e._$isConnected}_$notifyDirectiveConnectionChanged(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(i(this,e),n(this))}setValue(e){if(void 0===this.__part.strings)this.__part._$setValue(e,this);else{if(void 0===this.__attributeIndex)throw new Error("Expected this.__attributeIndex to be a number");const t=[...this.__part._$committedValue];t[this.__attributeIndex]=e,this.__part._$setValue(t,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class d{}const a=new WeakMap,l=t.directive(class extends c{render(t){return e.nothing}update(t,[i]){const n=i!==this._ref;return n&&void 0!==this._ref&&this._updateRefValue(void 0),(n||this._lastElementForRef!==this._element)&&(this._ref=i,this._context=t.options?.host,this._updateRefValue(this._element=t.element)),e.nothing}_updateRefValue(e){if("function"==typeof this._ref){const t=this._context??globalThis;let i=a.get(t);void 0===i&&(i=new WeakMap,a.set(t,i)),void 0!==i.get(this._ref)&&this._ref.call(this._context,void 0),i.set(this._ref,e),void 0!==e&&this._ref.call(this._context,e)}else this._ref.value=e}get _lastElementForRef(){return"function"==typeof this._ref?a.get(this._context??globalThis)?.get(this._ref):this._ref?.value}disconnected(){this._lastElementForRef===this._element&&this._updateRefValue(void 0)}reconnected(){this._updateRefValue(this._element)}});exports.createRef=()=>new d,exports.ref=l;
//# sourceMappingURL=ref-C8k6d1Nw.cjs.map
