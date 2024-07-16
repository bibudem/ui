/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var e,t,s,r,a,i=Object.defineProperty,n=e=>{throw TypeError(e)},o=(e,t,s)=>((e,t,s)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s)(e,"symbol"!=typeof t?t+"":t,s),h=(e,t,s)=>t.has(e)||n("Cannot "+s),c=(e,t,s)=>(h(e,t,"read from private field"),s?s.call(e):t.get(e)),l=(e,t,s)=>t.has(e)?n("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),d=(e,t,s,r)=>(h(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s);const E=require("./utils-CpyYfGsw.cjs"),v=require("./logger-giWQC3ye.cjs"),f=require("./PreferenceStorage.cjs");class g extends EventTarget{constructor(){super(),l(this,r),o(this,"_server"),o(this,"_storage"),l(this,e),l(this,t,!1),l(this,s),this.readyState="created",this.hosts=[]}addHost({host:e,reflectEvents:t}){this.hosts.push({host:e,reflectEvents:t})}debug(){c(this,t)&&c(this,s).call(this,...arguments)}dispatchEvent(e){super.dispatchEvent(e),this.hosts.forEach((({host:t,reflectEvents:s})=>s&&t.dispatchEvent?.(e)))}addEventListener(e,t,i){if(e===E.EVENT_NAMES.READY&&"ready"===this.readyState)return c(this,s).call(this,"Firing ready event immediately since readyState is already ready"),void(n=this,o=r,l=a,h(n,o,"access private method"),l).call(this,t);var n,o,l;super.addEventListener(e,t,i)}async init({host:r,serverMode:a,serverUrl:i,reflectEvents:n=!0}){let o;if(this.readyState="connecting",r&&this.addHost({host:r,reflectEvents:n}),a&&a===E.SERVER_MODE.LOCAL||void 0===i||!E.stringIsUrl(i)?this.serverMode=E.SERVER_MODE.LOCAL:(this.serverUrl=new URL(i,location),r.debug&&this.serverUrl.searchParams.set("debug",""),this.serverMode=await E.getServerMode(this)),d(this,t,Reflect.has(r,"debug")),c(this,t)&&d(this,s,v.loggerFactory("preferencesClient","purple")),this.debug("init",`server mode: ${this.serverMode}`),this.serverMode===E.SERVER_MODE.REMOTE){const e=E.getIframeServer(document.body,this.serverUrl.href);c(this,s).call(this,"[remote] callServer serverObject: ",e),this._server=await E.callServer(e).catch((e=>{throw console.error("[callServer] error: ",e),e})),this._server.listenMessage(((e,t)=>{c(this,s).call(this,"[remote] server.listenMessage method: ",e,"detail: ",t);const r=new CustomEvent(E.EVENT_NAMES.UPDATE,{detail:t});this.dispatchEvent(r)})),o=await this._server.postMessage("getPreferences"),c(this,s).call(this,"[remote] Got response from server: ",o)}else this._storage=new f,await this._storage.init(),o=await this._storage.getPreferences(),c(this,s).call(this,"[local] Got response from storage: ",o);c(this,s).call(this,"[local] preferences: ",o),void 0!==o&&(this.readyState="ready",d(this,e,o),c(this,s).call(this,"dispatchEvent",E.EVENT_NAMES.READY,o),this.dispatchEvent(new CustomEvent(E.EVENT_NAMES.READY,{detail:o})))}async getPreferences(){try{return this.serverMode===E.SERVER_MODE.LOCAL?await this._storage.getPreferences():await this._server.postMessage("getPreferences")}catch(e){throw console.error("[#getPreferences]",e),e}}async setPreferences(e){try{let t;if(void 0===e&&(e=null),t=this.serverMode===E.SERVER_MODE.LOCAL?await this._storage.setPreferences(e):await this._server.postMessage("setPreferences",e),t)return this.dispatchEvent(new CustomEvent(E.EVENT_NAMES.UPDATE,{detail:t})),t}catch(t){throw console.error("[#setPreferences]",t),t}}async resetPreferences(){try{if(this.serverMode===E.SERVER_MODE.LOCAL)return await this._storage.resetPreferences();await this._server.postMessage("resetPreferences")}catch(e){throw console.error("[#resetPreferences]",e),e}}}let p;e=new WeakMap,t=new WeakMap,s=new WeakMap,r=new WeakSet,a=async function(e){const t=await this.getPreferences(),r=new CustomEvent(E.EVENT_NAMES.READY,{detail:t});c(this,s).call(this,"Firing ready event with preferences: ",t),e(r)},module.exports=async function(e){return p?(p.addHost(e),p):(p=new g,await p.init(e),p)};
//# sourceMappingURL=preferencesClient.cjs.map
