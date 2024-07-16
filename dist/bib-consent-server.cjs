/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var e,t,r=Object.defineProperty,n=e=>{throw TypeError(e)},s=(e,t,n)=>((e,t,n)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n)(e,"symbol"!=typeof t?t+"":t,n),i=(e,t,r)=>t.has(e)||n("Cannot "+r),o=(e,t,r)=>(i(e,t,"read from private field"),r?r.call(e):t.get(e)),a=(e,t,r)=>t.has(e)?n("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("./lit-element-BHNMc-Kg.cjs"),c=require("./utils-CpyYfGsw.cjs"),g=require("./ref-mxufyLY8.cjs"),d=require("./logger-giWQC3ye.cjs"),h=require("./PreferenceStorage.cjs");class p extends l.s{constructor(){super(),a(this,e),a(this,t,d.loggerFactory("consent-server")),this.connected=!1,this.debug=this.debug||!1,this.loggerRef=g.e(),this.allowedOrigins=this.allowedOrigins||[],this.init()}async init(){var t,r,n,s;t=this,r=e,n=await h(),i(t,r,"write to private field"),s?s.call(t,n):r.set(t,n),o(this,e).listen((e=>{this.log("Storage updated with data",e.detail)})),this.startListening()}log(){if(this.debug){o(this,t).call(this,...arguments);const e=[...arguments].map((e=>"string"==typeof e?e:JSON.stringify(e))).join(" ");this.loggerRef.value.value+=`${""===this.loggerRef.value.value?"":"\r"}${e}`}}async startListening(){const{postMessage:t,listenMessage:r}=await c.startListening({eventFilter:e=>{const{origin:t}=e;return this.allowedOrigins.length>0&&this.allowedOrigins.some((e=>new RegExp(`${c.escapeStringRegexp(e)}`).test(t)))}});this.connected=!0,this.log("connected:",this.connected),r((async(t,r,n)=>{let s;switch(t){case"setPreferences":s=await o(this,e).setPreferences(r);break;case"getPreferences":s=await o(this,e).getPreferences();break;case"resetPreferences":s=await o(this,e).resetPreferences();break;case"ping":s="pong";break;default:throw this.log(`Unknown method: ${t}. Payload:`,r),new Error(`Unknown method: ${t}`)}r?this.log(`Method \`${t}\` called with payload:`,r,"response:",s):this.log(`Method \`${t}\` called.`,"response:",s),n(s)}))}render(){return l.x`<h1>I am bib-consent-server</h1><div class="log-container"><textarea class="log" ${g.n(this.loggerRef)}></textarea></div>`}}e=new WeakMap,t=new WeakMap,s(p,"properties",{connected:{type:Boolean},debug:{type:Boolean,reflect:!0},allowedOrigins:{type:String,attribute:"allowed-origins",converter:{fromAttribute:e=>e.split(/\s+/).map((e=>e.trim())),toAttribute:e=>e.join(" ")}}}),s(p,"styles",[l.i`${l.r(":host{display:none}:host([debug]){display:block;height:100vh}body{margin:0}h1{text-align:center;padding:.25em 0;margin:0;font:unset;font-variant:all-small-caps;background-color:#e5e5e5}.log-container{padding:.25rem .25rem 0;font-size:small;border:1px solid silver}.log{-webkit-text-size-adjust:100%;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace!important;font-size:small;margin:0;padding:.25rem 0 0;resize:none;width:100%;background-color:unset;box-sizing:border-box;border:none;tab-size:8;outline:none;height:100px;line-height:20px;overflow-wrap:normal;overscroll-behavior-x:none;white-space:pre;z-index:1}")}`]),window.customElements.get("bib-consent-server")||window.customElements.define("bib-consent-server",p),exports.BibConsentServer=p;
//# sourceMappingURL=bib-consent-server.cjs.map