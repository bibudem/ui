/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var e,t,n=Object.defineProperty,o=e=>{throw TypeError(e)},s=(e,t,o)=>((e,t,o)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o)(e,"symbol"!=typeof t?t+"":t,o),a=(e,t,n)=>(((e,t,n)=>{t.has(e)||o("Cannot "+n)})(e,t,"access private method"),n);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const i=require("./lit-element-ibXEACGN.cjs"),r=require("./bib-B68CkYVv.cjs"),c=require("./ConsentTokens.cjs"),l=require("./constants.cjs");class d extends i.LitElement{constructor(){var n,s,i;super(),n=this,(s=e).has(n)?o("Cannot add the same private member more than once"):s instanceof WeakSet?s.add(n):s.set(n,i),this.hidden=!0,this.containerId=l.GTM_CONTAINER_ID,a(this,e,t).call(this)}}e=new WeakSet,t=function(){const e=this.containerId;setTimeout((()=>{const t=document.querySelector("bib-consent");if(t){let n=function(t){console.log(`[bib-consent] événement ${t.type}`,t.detail);const n=t.detail;if(null!==n){!function(e){const t="bib-GTM-script";if(!document.querySelector(`script#${t}`)){var n=document.createElement("script");n.id=t,n.async=!0,n.src=`https://www.googletagmanager.com/gtm.js?id=${e}`;var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(n,o)}}(e);const{analytics_consent:t,ad_consent:o}=n,a={ad_user_data:o,ad_personalization:o,ad_storage:o,analytics_storage:t};console.log("Updating GTM consent with",a),s("consent","update",a)}};console.warn("bib-consent element found"),globalThis.nogtm=!0;const o=globalThis.dataLayer=globalThis.dataLayer||[],s=globalThis.gtag=globalThis.gtag||function(){o.push(arguments)},a=new c.ConsentTokens(!1);console.log("defaultConsent: ",a),s("consent","default",a.toGTM()),o.push({"gtm.start":(new Date).getTime(),event:"gtm.js"}),t.addEventListener("bib:consent:ready",n),t.addEventListener("bib:consent:update",n)}else console.warn("No bib-consent element found")}))},s(d,"properties",{containerId:{type:String,attribute:"container-id"},hidden:{type:Boolean}}),s(d,"styles",[i.css`${i.unsafeCSS("@layer component{:host(hidden){display:none}}")}`]),window.customElements.get("bib-gtm")||window.customElements.define("bib-gtm",d),r.addToGlobalBib("gtm",{}),exports.BibGtm=d;
//# sourceMappingURL=bib-gtm.cjs.map
