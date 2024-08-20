/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.17.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var e,t,i,s,n,r,a,o,c=Object.defineProperty,l=e=>{throw TypeError(e)},h=(e,t,i)=>((e,t,i)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i)(e,"symbol"!=typeof t?t+"":t,i),d=(e,t,i)=>t.has(e)||l("Cannot "+i),b=(e,t,i)=>(d(e,t,"read from private field"),i?i.call(e):t.get(e)),u=(e,t,i)=>t.has(e)?l("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),g=(e,t,i,s)=>(d(e,t,"write to private field"),s?s.call(e,i):t.set(e,i),i),p=(e,t,i)=>(d(e,t,"access private method"),i);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const m=require("./task-YmD7yWl1.cjs"),w=require("./lit-element-BHNMc-Kg.cjs"),f=require("./unsafe-html-Dku8oD0s.cjs"),v=require("./index-9izUO_DB.cjs"),x=require("./bib-ChmLVv_V.cjs"),y=require("./package-CIT-l8TD.cjs"),k="avis";async function j(e){const t=(new TextEncoder).encode(JSON.stringify(e)),i=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(i)).map((e=>e.toString(16).padStart(2,"0"))).join("")}class q extends w.s{constructor(){super(),u(this,i),u(this,e),u(this,t),h(this,"_avisTask",new m.h(this,{task:async([e,t,i],{signal:s})=>{const n=new URL(`${t}/${i}`,e),r=await fetch(n,{headers:{Accept:"application/json"},signal:s});if(!r.ok)throw new Error(r.status);return r.json()},args:()=>[this.service,this.contexte,this.niveau]})),g(this,e,null),this.service="https://avis.bib.umontreal.ca",this.contexte="site-web-dev",this.niveau="important",this.boutonFermer=!1}connectedCallback(){super.connectedCallback(),p(this,i,s).call(this)}_renderBoutonFermer(){return this.boutonFermer?w.x`<button class="btn-close" aria-label="Fermer" @click="${p(this,i,o)}">${f.o('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>')}</button>`:null}render(){return b(this,e)?.message?w.x`<aside class="container"><div class="inner"><div class="message">${f.o(b(this,e).message)}</div>${this._renderBoutonFermer()}</div></aside>`:null}setMessage(t){g(this,e,"string"==typeof t?{message:t,isLocal:!0}:t)}}e=new WeakMap,t=new WeakMap,i=new WeakSet,s=function(){return new m.h(this,{task:async([e,t,s],{signal:r})=>{const a=new Promise((async(i,n)=>{if(""!==this.textContent.trim())return i({isLocal:!0,message:this.innerHTML.split(/<!--\?lit\$\d+\$-->/).join("")});const a=new URL(`${t}/${s}`,e),o=await fetch(a,{headers:{Accept:"application/json"},signal:r});if(!o.ok)return n(new Error(o.status));const{message:c}=await o.json();i({isLocal:!1,message:c})}));try{const e=await a;await p(this,i,n).call(this,e)}catch(o){console.error("[#getAvis] An error occured: %o",o)}return data},args:()=>[this.service,this.contexte,this.niveau]})},n=async function(e){if(!e.message)return void this.setMessage(null);if(!("indexedDB"in window))return void this.setMessage(e.message);const s=g(this,t,await v.openDB(y.name,1,{upgrade(e){e.objectStoreNames.contains(k)||e.createObjectStore(k)}}));try{const t=await j(e),n=await s.get(k,t);n?n.hidden||(await s.delete(k,t),p(this,i,r).call(this,n)):p(this,i,r).call(this,e)}catch(n){console.error("Something went wrong with indexedDB: %o",n),this.setMessage(e.message)}},r=async function(e){if(this.dispatchEvent(new CustomEvent("bib:show",{bubbles:!0,cancelable:!0}))&&(this.setMessage(e),b(this,t))){const i=await j(e);await b(this,t).put(k,{...e,hidden:!1},i)}},a=async function(){if(!this.dispatchEvent(new CustomEvent("bib:hide",{bubbles:!0,cancelable:!0})))return;const i=await j(b(this,e));await b(this,t).put(k,{...b(this,e),hidden:!0},i),g(this,e,null),this.requestUpdate()},o=function(){p(this,i,a).call(this)},h(q,"properties",{service:{type:String},contexte:{type:String,default:"site-web"},niveau:{type:String},boutonFermer:{type:Boolean,attribute:"bouton-fermer"},message:{state:!0}}),h(q,"styles",[w.i`${w.r(':host,*{box-sizing:border-box}:host{display:block;font-size:var(--bib-avis-size, var(--md-sys-typescale-title-medium-size, inherit));background:var(--bib-avis-container-color, var(--md-sys-color-warningContainer, #fffac6))}:host([hidden]){display:none}.inner{display:flex;align-items:center;margin:0 auto;padding:11px 19px;gap:1em}:host(:not([fluide])) .inner{max-width:1220px}.message{flex-grow:1;min-height:24px}.btn-close{display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0px;border:0px;margin:0;cursor:pointer;user-select:none;vertical-align:middle;appearance:none;text-decoration:none;text-align:center;flex:0 0 auto;font-size:1.5rem;font-size:36px;font-weight:700;line-height:1;position:relative;padding:0;border-radius:50%;overflow:visible;color:var(--bib-btn-close-color, rgba(0, 0, 0, .4));transition:color .15s cubic-bezier(.4,0,.2,1),background-color .15s cubic-bezier(.4,0,.2,1)}.btn-close:after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-height:44px;min-width:44px;width:100%;height:100%}.btn-close:focus:not([disabled]),.btn-close:focus-visible{outline:var(--md-focus-ring-width, 3px) solid currentColor;outline-offset:3px;border-radius:99999px}.btn-close:focus:not(:focus-visible){outline:0}.btn-close:hover{color:var(--bib-btn-close-hover-color, rgba(0, 0, 0, .8))}.btn-close:hover:after{background-color:#0000000a}.btn-close:after{width:calc(100% + 16px);height:calc(100% + 16px);border-radius:50%;background-color:transparent;transition:background-color .15s cubic-bezier(.4,0,.2,1) 0ms}.btn-close>svg{fill:currentColor}')}`,w.i``]),window.customElements.get("bib-avis")||window.customElements.define("bib-avis",q),x.addToGlobalBib("avis",{}),exports.BibAvis=q;
//# sourceMappingURL=bib-avis.cjs.map
