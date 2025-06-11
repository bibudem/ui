/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.23.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const t=require("./lit-element-BHNMc-Kg.cjs"),i=require("./directive-DpiRyOsV.cjs"),s=(t,i)=>{const e=t._$AN;if(void 0===e)return!1;for(const h of e)h._$AO?.(i,!1),s(h,i);return!0},e=t=>{let i,s;do{if(void 0===(i=t._$AM))break;s=i._$AN,s.delete(t),t=i}while(0===s?.size)},h=t=>{for(let i;i=t._$AM;t=i){let s=i._$AN;if(void 0===s)i._$AN=s=new Set;else if(s.has(t))break;s.add(t),c(i)}};function n(t){void 0!==this._$AN?(e(this),this._$AM=t,h(this)):this._$AM=t}function o(t,i=!1,h=0){const n=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(i)if(Array.isArray(n))for(let c=h;c<n.length;c++)s(n[c],!1),e(n[c]);else null!=n&&(s(n,!1),e(n));else s(this,t)}const c=t=>{t.type==i.t.CHILD&&(t._$AP??=o,t._$AQ??=n)};class r extends i.i{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,s){super._$AT(t,i,s),h(this),this.isConnected=t._$AU}_$AO(t,i=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),i&&(s(this,t),e(this))}setValue(t){if((t=>void 0===this._$Ct.strings)())this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class d{}const l=new WeakMap,$=i.e(class extends r{render(i){return t.T}update(i,[s]){const e=s!==this.Y;return e&&void 0!==this.Y&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.Y=s,this.ht=i.options?.host,this.rt(this.ct=i.element)),t.T}rt(t){if("function"==typeof this.Y){const i=this.ht??globalThis;let s=l.get(i);void 0===s&&(s=new WeakMap,l.set(i,s)),void 0!==s.get(this.Y)&&this.Y.call(this.ht,void 0),s.set(this.Y,t),void 0!==t&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){return"function"==typeof this.Y?l.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});exports.e=()=>new d,exports.n=$;
//# sourceMappingURL=ref-mxufyLY8.cjs.map
