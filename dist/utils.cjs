/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.1.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("./url-y47v7naU.cjs"),r=require("./constants2.cjs");function t(e){return`${r.PREFIX}-${e}`}exports.getIframeServer=function(r,o){const n=void 0!==r?r:document.body,s=e.utils.resolveOrigin(o),a=t("iframe");let i;return document.querySelector(`#${a}`)?i=document.querySelector(`#${a}`):(i=document.createElement("iframe"),i.id=a,e.hasBooleanParam(o,"debug")?i.style.cssText="width: 100%; height: 100%; border: 0;":(i.ariaHidden=!0,i.tabIndex=-1,i.hidden=!0,i.style.setProperty("display","none")),n.appendChild(i),i.src=o),{server:i.contentWindow||i.contentDocument.parentWindow,origin:s,iframe:i}},exports.getKeyName=t,exports.getServerMode=async function(e){const t=e.serverUrl,o=e.serverRequestTimeout||r.SERVER_REQUEST_DEFAULT_TIMEOUT;if(!t)return r.SERVER_MODE.LOCAL;const n=new AbortController;let s,a;try{if(a=setTimeout((()=>{console.warn(`Request timed out after ${o}ms. Aborting request...`),n.abort()}),o),s=await fetch(t,{signal:n.signal}),s.ok)return r.SERVER_MODE.REMOTE}catch(i){return console.error(i),n.signal.aborted?(console.error(`Unable to locate server page. The request timed out after ${o}ms. url: ${t.href}`),r.SERVER_MODE.LOCAL):(console.error(`Unable to locate server page : ${t.href}.`,i),r.SERVER_MODE.LOCAL)}finally{clearTimeout(a)}throw new Error(`Unable to locate server page. The request failed with status code ${s.status}. url: ${t.href}`)};
//# sourceMappingURL=utils.cjs.map
