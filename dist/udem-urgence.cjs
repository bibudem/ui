/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.13.2
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var e,t,i,n,a=Object.defineProperty,r=e=>{throw TypeError(e)},o=(e,t,i)=>((e,t,i)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i)(e,"symbol"!=typeof t?t+"":t,i),s=(e,t,i)=>t.has(e)||r("Cannot "+i),p=(e,t,i)=>t.has(e)?r("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),c=(e,t,i)=>(s(e,t,"access private method"),i);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const h=require("./task-YmD7yWl1.cjs"),d=require("./lit-element-BHNMc-Kg.cjs");class l extends d.s{constructor(){super(),p(this,t),p(this,e,new h.h(this,{task:async([e],{signal:t})=>{const i=new URL(e),n=await fetch(i,{headers:{Accept:"application/json"},signal:t});if(!n.ok)throw new Error(n.status);return n.json()},args:()=>[this.service]})),this.big=!1,this.service="https://urgence.umontreal.ca/urgence-udem.json"}connectedCallback(){super.connectedCallback(),this.render()}render(){return(a=this,r=e,s(a,r,"read from private field"),o?o.call(a):r.get(a)).render({pending:()=>null,complete:({bannerType:e,date:a,fullDay:r,headerLink:o,hour:s,title:p,url:h})=>(this.href=o??h,e&&(this.big="large"===e),p&&d.x`<aside class="wrapper${this.big?" big":""}" tabindex="0" @click="${c(this,t,n)}" @keyup="${c(this,t,n)}"><div class="container"><div class="content"><a class="title" href="${this.href}" @click="${c(this,t,i)}" tabindex="-1"><div>${p}</div></a><time datetime="${a}" class="datetime"><span class="hour">${s}</span> <span>| </span><span classid="date">${r}</span></time></div></div></aside>`)});var a,r,o}}e=new WeakMap,t=new WeakSet,i=function(e){e.preventDefault(),e.stopPropagation()},n=function(e){(" "===e.key||"Enter"===e.key||"click"===e.type)&&window.open(this.href,"_blank")},o(l,"properties",{service:{type:String},big:{type:Boolean},href:{type:String,attribute:!1}}),o(l,"styles",[d.i`${d.r(".wrapper{width:100%;height:55px;background-color:#282828;border-bottom:#40474f solid 7px;cursor:pointer;color:#fff;font-size:13px;box-sizing:border-box}.wrapper.big{height:168px}.container{width:100%;height:48px;background-color:#b60000;position:relative;bottom:0}.big .container{height:161px}.content{margin-left:auto;margin-right:auto;display:flex;align-items:center;height:48px;width:auto}.big .content{height:113px}@media (min-width: 768px){.content{width:768px}}@media (min-width: 1200px){.content{width:1220px}}.title{margin:0 0 0 132px;line-height:22px;padding:0 12px;font-size:17px;max-height:48px;overflow:hidden;color:#fff;text-decoration:none}.big .title{margin-left:0;position:static;max-height:101px;font-size:18px;line-height:unset}.datetime{height:48px;background-color:#40474f;position:absolute;top:0;min-width:107px;padding:7px 12px 0;font-size:15px;line-height:17px;text-align:center;margin:0;text-transform:uppercase}.big .datetime{top:113px;line-height:36px}.datetime span{position:relative;bottom:0}")}`]),window.customElements.get("udem-urgence")||window.customElements.define("udem-urgence",l),exports.UdeMUrgence=l;
//# sourceMappingURL=udem-urgence.cjs.map
