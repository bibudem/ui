/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.13.2
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var e,t,i=Object.defineProperty,s=e=>{throw TypeError(e)},n=(e,t,s)=>((e,t,s)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s)(e,"symbol"!=typeof t?t+"":t,s),r=(e,t,i)=>t.has(e)||s("Cannot "+i),o=(e,t,i)=>(r(e,t,"read from private field"),i?i.call(e):t.get(e)),a=(e,t,i)=>t.has(e)?s("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("./lit-element-BHNMc-Kg.cjs"),g=require("./constants-BxiUuqDD.cjs"),c=require("./ref-mxufyLY8.cjs"),h=require("./logger-sjSKHypP.cjs"),d=require("./PreferenceStorage.cjs");class p extends l.s{constructor(){super(),a(this,e),a(this,t,h.loggerFactory("consent-server")),this.connected=!1,this.debug=this.debug||!1,this.loggerRef=c.e(),this.allowedOrigins=this.allowedOrigins||[],this.init()}async init(){var t,i,s,n;this.log("Initializing BibConsentServer..."),t=this,i=e,s=await d(),r(t,i,"write to private field"),n?n.call(t,s):i.set(t,s),this.log("Connected to storage."),o(this,e).listen((e=>{this.log("Storage updated with data",e.detail)})),this.log("Start listening for storage updates..."),this.startListening()}log(...e){if(this.hasAttribute("debug")){o(this,t).call(this,...e);const i=e.map((e=>"string"==typeof e?e:JSON.stringify(e))).join(" ");this.loggerRef.value&&(this.loggerRef.value.value+=`${""===this.loggerRef.value.value?"":"\r"}${i}`)}}async startListening(){this.log("startListening()");const{listenMessage:t}=await g.startListening({eventFilter:e=>{const{origin:t}=e;return this.allowedOrigins.length>0&&this.allowedOrigins.some((e=>g.patternMatchesOrigin(e,t)))}});this.log("Listening for postMessage events..."),this.connected=!0,this.log("connected:",this.connected),t((async(t,i,s)=>{let n;switch(t){case"setPreferences":n=await o(this,e).setPreferences(i);break;case"getPreferences":n=await o(this,e).getPreferences();break;case"resetPreferences":n=await o(this,e).resetPreferences();break;case"ping":n="pong";break;default:throw this.log(`Unknown method: ${t}. Payload:`,i),new Error(`Unknown method: ${t}`)}i?this.log(`Method \`${t}\` called with payload:`,i,"response:",n):this.log(`Method \`${t}\` called.`,"response:",n),s(n)}))}render(){return l.x`<h1>I am bib-consent-server</h1><div class="log-container"><textarea class="log" ${c.n(this.loggerRef)}></textarea></div>`}}e=new WeakMap,t=new WeakMap,n(p,"properties",{connected:{type:Boolean},debug:{type:Boolean,reflect:!0},allowedOrigins:{type:String,attribute:"allowed-origins",converter:{fromAttribute:e=>e.split(/\s+/).map((e=>e.trim())),toAttribute:e=>e.join(" ")}}}),n(p,"styles",[l.i`${l.r(":host{display:none}:host([debug]){display:block;height:100vh}body{margin:0}h1{text-align:center;padding:.25em 0;margin:0;font:unset;font-variant:all-small-caps;background-color:#e5e5e5}.log-container{padding:.25rem .25rem 0;font-size:small;border:1px solid silver}.log{-webkit-text-size-adjust:100%;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace!important;font-size:small;margin:0;padding:.25rem 0 0;resize:none;width:100%;background-color:unset;box-sizing:border-box;border:none;tab-size:8;outline:none;height:100px;line-height:20px;overflow-wrap:normal;overscroll-behavior-x:none;white-space:pre;z-index:1}")}`]),window.customElements.get("bib-consent-server")||window.customElements.define("bib-consent-server",p),exports.BibConsentServer=p;
//# sourceMappingURL=bib-consent-server.cjs.map
