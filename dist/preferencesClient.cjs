/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.13.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var e,t,s,r,i,a=Object.defineProperty,n=e=>{throw TypeError(e)},o=(e,t,s)=>((e,t,s)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s)(e,"symbol"!=typeof t?t+"":t,s),h=(e,t,s)=>t.has(e)||n("Cannot "+s),c=(e,t,s)=>(h(e,t,"read from private field"),s?s.call(e):t.get(e)),d=(e,t,s)=>t.has(e)?n("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),E=(e,t,s,r)=>(h(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s);const l=require("./constants-C4rB-CcV.cjs"),v=require("./logger-CPFgczHL.cjs"),g=require("./PreferenceStorage.cjs");class u extends EventTarget{constructor(){super(),d(this,r),o(this,"_server"),o(this,"_storage"),d(this,e),d(this,t,!1),d(this,s),this.readyState="initial",this.hosts=[]}addHost({host:e,reflectEvents:t}){this.hosts.push({host:e,reflectEvents:t})}debug(){c(this,t)&&c(this,s).call(this,...arguments)}dispatchEvent(e){super.dispatchEvent(e),this.hosts.forEach((({host:t,reflectEvents:s})=>s&&t.dispatchEvent?.(e)))}addEventListener(e,t,s){if(e===l.EVENT_NAMES.READY&&"ready"===this.readyState)return this.debug("Firing ready event immediately since readyState is already ready"),void(a=this,n=r,o=i,h(a,n,"access private method"),o).call(this,t);var a,n,o;super.addEventListener(e,t,s)}async init({host:r,serverMode:i,serverUrl:a,serverRequestTimeout:n=l.SERVER_REQUEST_DEFAULT_TIMEOUT,reflectEvents:o=!0}){let h;if(this.serverRequestTimeout=n,r&&this.addHost({host:r,reflectEvents:o}),this.readyState="connecting",i&&i===l.SERVER_MODE.LOCAL||void 0===a||!l.stringIsUrl(a)?this.serverMode=l.SERVER_MODE.LOCAL:(this.serverUrl=new URL(a,location),r.debug&&this.serverUrl.searchParams.set("debug",""),this.serverMode=await l.getServerMode(this)),E(this,t,!!r.debug),c(this,t)&&E(this,s,v.loggerFactory("preferencesClient","purple")),this.debug("init",`server mode: ${this.serverMode}`),this.serverMode===l.SERVER_MODE.REMOTE){const e=l.getIframeServer(document.body,this.serverUrl.href);this.debug("[remote] callServer serverObject: ",e);try{this._server=await l.callServer(e),this._server.listenMessage(((e,t)=>{this.debug("[remote] server.listenMessage method: ",e,"detail: ",t);const s=new CustomEvent(l.EVENT_NAMES.UPDATE,{detail:t});this.dispatchEvent(s)}))}catch(d){throw console.error("[callServer] error: ",d),d}h=await this._server.postMessage("getPreferences"),this.debug("[remote] Got response from server: ",h)}else this._storage=new g,await this._storage.init(),h=await this._storage.getPreferences(),this.debug("[local] Got response from storage: ",h);this.debug("[local] preferences: ",h),void 0!==h&&(this.readyState="ready",E(this,e,h),this.debug("dispatchEvent",l.EVENT_NAMES.READY,h),this.dispatchEvent(new CustomEvent(l.EVENT_NAMES.READY,{detail:h})))}async getPreferences(){try{return this.serverMode===l.SERVER_MODE.LOCAL?await this._storage.getPreferences():await this._server.postMessage("getPreferences")}catch(e){throw console.error("[#getPreferences]",e),e}}async setPreferences(e){try{let t;if(void 0===e&&(e=null),t=this.serverMode===l.SERVER_MODE.LOCAL?await this._storage.setPreferences(e):await this._server.postMessage("setPreferences",e),t)return this.dispatchEvent(new CustomEvent(l.EVENT_NAMES.UPDATE,{detail:t})),t}catch(t){throw console.error("[#setPreferences]",t),t}}async resetPreferences(){try{if(this.serverMode===l.SERVER_MODE.LOCAL)return await this._storage.resetPreferences();await this._server.postMessage("resetPreferences")}catch(e){throw console.error("[#resetPreferences]",e),e}}}let f;e=new WeakMap,t=new WeakMap,s=new WeakMap,r=new WeakSet,i=async function(e){const t=await this.getPreferences(),s=new CustomEvent(l.EVENT_NAMES.READY,{detail:t});this.debug("Firing ready event with preferences: ",t),e(s)},module.exports=async function(e){return f?(f.addHost(e),f):(f=new u,await f.init(e),f)};
//# sourceMappingURL=preferencesClient.cjs.map
