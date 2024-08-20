/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.15.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const e=(e,t)=>t.some((t=>e instanceof t));let t,n;const r=new WeakMap,o=new WeakMap,s=new WeakMap;let i={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return r.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return c(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function a(e){i=e(i)}function c(a){if(a instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{t(c(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",o),e.addEventListener("error",s)}));return s.set(t,e),t}(a);if(o.has(a))return o.get(a);const d="function"==typeof(f=a)?(l=f,(n||(n=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(l)?function(...e){return l.apply(u(this),e),c(this.request)}:function(...e){return c(l.apply(u(this),e))}):(f instanceof IDBTransaction&&function(e){if(r.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)}));r.set(e,t)}(f),e(f,t||(t=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(f,i):f);var f,l;return d!==a&&(o.set(a,d),s.set(d,a)),d}const u=e=>s.get(e),d=["get","getKey","getAll","getAllKeys","count"],f=["put","add","delete","clear"],l=new Map;function p(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(l.get(t))return l.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=f.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!d.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,o?"readwrite":"readonly");let i=s.store;return r&&(i=i.index(t.shift())),(await Promise.all([i[n](...t),o&&s.done]))[0]};return l.set(t,s),s}a((e=>({...e,get:(t,n,r)=>p(t,n)||e.get(t,n,r),has:(t,n)=>!!p(t,n)||e.has(t,n)})));const I=["continue","continuePrimaryKey","advance"],D={},v=new WeakMap,B=new WeakMap,g={get(e,t){if(!I.includes(t))return e[t];let n=D[t];return n||(n=D[t]=function(...e){v.set(this,B.get(this)[t](...e))}),n}};async function*y(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;const n=new Proxy(t,g);for(B.set(n,t),s.set(n,u(t));t;)yield n,t=await(v.get(n)||t.continue()),v.delete(n)}function h(t,n){return n===Symbol.asyncIterator&&e(t,[IDBIndex,IDBObjectStore,IDBCursor])||"iterate"===n&&e(t,[IDBIndex,IDBObjectStore])}a((e=>({...e,get:(t,n,r)=>h(t,n)?y:e.get(t,n,r),has:(t,n)=>h(t,n)||e.has(t,n)}))),exports.openDB=function(e,t,{blocked:n,upgrade:r,blocking:o,terminated:s}={}){const i=indexedDB.open(e,t),a=c(i);return r&&i.addEventListener("upgradeneeded",(e=>{r(c(i.result),e.oldVersion,e.newVersion,c(i.transaction),e)})),n&&i.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),a.then((e=>{s&&e.addEventListener("close",(()=>s())),o&&e.addEventListener("versionchange",(e=>o(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),a};
//# sourceMappingURL=index-9izUO_DB.cjs.map
