/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var e,t,s,r,n=Object.defineProperty,o=e=>{throw TypeError(e)},i=(e,t,s)=>((e,t,s)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s)(e,"symbol"!=typeof t?t+"":t,s),a=(e,t,s)=>t.has(e)||o("Cannot "+s),h=(e,t,s)=>(a(e,t,"read from private field"),s?s.call(e):t.get(e)),d=(e,t,s)=>t.has(e)?o("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),E=(e,t,s,r)=>(a(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s);const c=require("./constants-CpX72Nz6.cjs"),v=require("./logger-C1M6pIZ-.cjs"),l=require("./ConsentStorage.cjs"),g=require("./ConsentTokens.cjs");class u extends EventTarget{constructor(){super(),d(this,s),i(this,"_server"),i(this,"_storage"),d(this,e,!1),d(this,t),this.readyState="initial",this.hosts=[]}addHost({host:e,reflectEvents:t}){this.hosts.push({host:e,reflectEvents:t})}debug(){h(this,e)&&h(this,t).call(this,...arguments)}dispatchEvent(e){super.dispatchEvent(e),this.hosts.forEach((({host:t,reflectEvents:s})=>s&&t.dispatchEvent?.(e)))}addEventListener(e,t,n){if(e===c.EVENT_NAMES.READY&&"ready"===this.readyState)return this.debug("Firing ready event immediately since readyState is already ready"),void(o=this,i=s,h=r,a(o,i,"access private method"),h).call(this,t);var o,i,h;super.addEventListener(e,t,n)}async init({host:s,serverMode:r,serverUrl:n,serverRequestTimeout:o=c.SERVER_REQUEST_DEFAULT_TIMEOUT,reflectEvents:i=!0}){let a;if(this.serverRequestTimeout=o,s&&this.addHost({host:s,reflectEvents:i}),this.readyState="connecting",r&&r===c.SERVER_MODE.LOCAL||void 0===n||!c.stringIsUrl(n)?this.serverMode=c.SERVER_MODE.LOCAL:(this.serverUrl=new URL(n,location),s.debug&&this.serverUrl.searchParams.set("debug",""),this.serverMode=await c.getServerMode(this)),E(this,e,!!s.debug),h(this,e)&&E(this,t,v.loggerFactory("consentClient","purple")),this.debug("init",`server mode: ${this.serverMode}`),this.serverMode===c.SERVER_MODE.REMOTE){const e=c.getIframeServer(document.body,this.serverUrl.href);try{this._server=await c.callServer(e),this._server.listenMessage(((e,t)=>{this.debug("[remote] server.listenMessage method: ",e,"data: ",t);const s=g.ConsentTokens.from(t),r=new CustomEvent(c.EVENT_NAMES.UPDATE,{detail:s});this.dispatchEvent(r)}))}catch(d){throw console.error("[callServer] error: ",d),d}a=g.ConsentTokens.from(await this._server.postMessage("getConsentTokens")),this.debug("[remote] Got response from server: ",a)}else this._storage=await l(),a=await this._storage.getConsentTokens(),this.debug("[local] Got response from storage: ",a);this.debug("[local] consentTokens: ",a),void 0!==a&&(this.readyState="ready",this.debug("dispatchEvent",c.EVENT_NAMES.READY,a),this.dispatchEvent(new CustomEvent(c.EVENT_NAMES.READY,{detail:a})))}async getConsentTokens(){try{return this.serverMode===c.SERVER_MODE.LOCAL?await this._storage.getConsentTokens():g.ConsentTokens.from(await this._server.postMessage("getConsentTokens"))}catch(e){throw console.error("[#getConsentTokens]",e),e}}async setConsentTokens(e){try{let t;const s=g.ConsentTokens.from(e);if(t=this.serverMode===c.SERVER_MODE.LOCAL?await this._storage.setConsentTokens(s):await this._server.postMessage("setConsentTokens",s),t)return this.dispatchEvent(new CustomEvent(c.EVENT_NAMES.UPDATE,{detail:t})),t}catch(t){throw console.error("[#setConsentTokens]",t),t}}async resetTokens(){try{if(this.serverMode===c.SERVER_MODE.LOCAL)return await this._storage.resetTokens();await this._server.postMessage("resetTokens")}catch(e){throw console.error("[#resetTokens]",e),e}}}let T;e=new WeakMap,t=new WeakMap,s=new WeakSet,r=async function(e){const t=await this.getConsentTokens(),s=new CustomEvent(c.EVENT_NAMES.READY,{detail:t});this.debug("Firing ready event with preferences: ",t),e(s)},module.exports=async function(e){return T?(T.addHost(e),T):(T=new u,await T.init(e),T)};
//# sourceMappingURL=consentClient.cjs.map