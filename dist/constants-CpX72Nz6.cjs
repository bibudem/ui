/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.16.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const e=require("./package-BAdJsmmO.cjs"),t=require("./type-KOUr406I.cjs");function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t,n){return Object.defineProperty(e,"prototype",{writable:!1}),e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s="client_response",i="server_response",a={server:{receive:s,post:i},client:{receive:i,post:s}},c=["hand-shake","wave-hand",s,i],l=r((function e(t,r,s){var i=this;o(this,e),n(this,"receiveMessage",(function(e,t,n){if(e===a[i.type].receive){if(t&&i.messageResponse[t]){var r=i.messageResponse[t];delete i.messageResponse[t],r(n)}}else i.listener?i.listener(e,n,(function(e){i.messageProxy.request(a[i.type].post,t,e)})):console.warn("no message listener: ",e,n)})),n(this,"doPost",(function(e,t,n){var r=e.resolve,o=e.reject,s=e.eventId;i.messageResponse[s]=r;try{i.messageProxy.request(t,s,n)}catch(a){throw delete i.messageResponse[s],o(),a}})),n(this,"listenMessage",(function(e){i.listener=e})),n(this,"postMessage",(function(e,t){return c.indexOf(e)>=0?Promise.reject(new Error("".concat(e," is a protected key-method."))):new Promise((function(n,r){if(i.destroyed)r(new Error("message-channel had been destroyed!"));else{var o=null,s=Math.random().toString().substr(3,10);i.doPost({resolve:function(e){clearTimeout(o),n(e)},reject:r,eventId:s},e,t),o=setTimeout((function(){i.messageResponse&&delete i.messageResponse[s],r(new Error("postMessage timeout"))}),i.timeout||2e4)}}))})),n(this,"destroy",(function(){i.destroyed=!0,i.unListen&&(i.unListen(),i.unListen=null),i.listener=null,i.messageResponse=null,i.messageProxy&&(i.messageProxy.destroy(),i.messageProxy=null)})),this.type=t,this.messageProxy=r,this.listener=null,this.messageResponse={},this.timeout=s,this.unListen=this.messageProxy.listen(this.receiveMessage)})),u="postmessage-promise_client",d="postmessage-promise_server",f="identity_key",p={server:{key:d,accept:u},client:{key:u,accept:d}},v=r((function e(t,r,s){var i=this;o(this,e),n(this,"listen",(function(e){var t=i,n=function(n){if(("*"===t.origin||n.origin===t.origin)&&n.source===t.source&&n.data&&n.data[f]===p[t.type].accept&&n.data.channelId===t.channelId&&t.eventFilter(n)&&n.data.method){var r=n.data,o=r.eventId,s=r.method,i=r.payload;e(s,o,i)}};return window.addEventListener("message",n),function(){window.removeEventListener("message",n)}})),n(this,"request",(function(e,t,r){i.source&&!i.source.closed?i.source.postMessage(n(n(n(n(n({},f,p[i.type].key),"channelId",i.channelId),"eventId",t),"method",e),"payload",r),i.origin):console.error("source closed.")})),n(this,"destroy",(function(){i.type="",i.origin="",i.source=null,i.channelId="",i.eventFilter=null})),this.type=t;var a=r.origin,c=r.source,l=r.channelId;this.origin=a,this.source=c,this.channelId=l,this.eventFilter=s}));function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var w="identity_key";function b(e){var t=document.createElement("a");t.href=e;var n=t.protocol.length>4?t.protocol:window.location.protocol,r=t.host.length?"80"===t.port||"443"===t.port?t.hostname:t.host:window.location.host;return t.origin||"".concat(n,"//").concat(r)}var E={resolveOrigin:b,getIframeServer:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=void 0!==e?e:document.body,s=b(t),i=document.createElement("iframe");return i.name=n||"",i.classList.add.apply(i.classList,r),o.appendChild(i),i.src=t,{server:i.contentWindow||i.contentDocument.parentWindow,origin:s,frame:i}},getOpenedServer:function(e){for(var t,n=b(e),r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return{server:(t=window).open.apply(t,[e].concat(o)),origin:n}}};var I=t.typeExports;const O=(P=function(e){if("string"!==I(e))return!!e;var t;switch(e.toLowerCase()){case"false":case"0":case"undefined":case"null":case"":case"n":case"no":case"off":t=!1;break;default:t=!0}return t})&&P.__esModule&&Object.prototype.hasOwnProperty.call(P,"default")?P.default:P;var P;function j(e){return function(t){return`bib:${e}:${t}`}}function M(e){return`${R}-${e}`}const x=j("consent"),S=`${e.name}/consent`,T={READY:x("ready"),UPDATE:x("update")},R="bib-consent",k={LOCAL:"local",REMOTE:"remote"};exports.CONSENT_STATES={INDETERMINATE:"indeterminate",DETERMINATE:"determinate"},exports.DB_NAME=S,exports.DB_STORE_NAME="consent",exports.DB_VERSION=1,exports.DEFAULT_PREFERENCES={analytics_consent:null,functionality_consent:null,ad_consent:null},exports.EVENT_NAMES=T,exports.PREFIX=R,exports.SERVER_MODE=k,exports.SERVER_REQUEST_DEFAULT_TIMEOUT=500,exports.callServer=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)throw new Error("serverObject is null");var n=e.server,r=e.origin,o=t.eventFilter,s=void 0===o?function(){return!0}:o,i=t.timeout,a=void 0===i?2e4:i,c=t.clientInfo,u=void 0===c?{}:c,d=t.onDestroy,f=Math.random().toString().substr(3,10),p={source:n,origin:r,channelId:f};return new Promise((function(e,t){if(n&&!n.closed){var r=new v("client",p,s);(o=p,i=r,c=a,f=u,new Promise((function(e,t){var n=o.source,r=o.origin,s=o.channelId,a=Number(Math.random().toString().substr(3,10)),l=null,u=new Date,d=null;d=i.listen((function(t,o){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("hand-shake"===t){var u=c||{},p=u.SYN,v=u.ACK,h=u.seqnumber,m=u.acknumber;1===p&&1===v&&m===a+1&&(clearInterval(l),d&&d(),i.request("hand-shake","hand-shake-event",{clientInfo:f,ACK:1,seqnumber:a+1,acknumber:h+1}),e({server:n,origin:r,channelId:s,serverInfo:c.serverInfo,clientInfo:f}))}})),l=setInterval((function(){if(!n||n.closed)throw clearInterval(l),d&&d(),t(new Error("server closed.")),new Error("server closed.");if(c&&new Date-u>c)throw clearInterval(l),d&&d(),t(new Error("connect timeout.")),new Error("connect timeout.");i.request("hand-shake","hand-shake-event",{clientInfo:f,SYN:1,ACK:0,seqnumber:a})}),100)}))).then((function(t){(function(e,t,n){var r=e.server,o=e.serverInfo,s=void 0===o?{}:o,i=e.channelId,a=new l("client",t,n),c=function(){a&&(a.destroy(),a=null),e.destroy&&e.destroy()},u=null;return u=setInterval((function(){r&&!r.closed||(console.info("server closed."),clearInterval(u),c())}),2e3),{run:function(e){e({channelId:i,serverInfo:s,postMessage:function(){var e;return a?(e=a).postMessage.apply(e,arguments):Promise.reject()},listenMessage:function(){var e;a&&(e=a).listenMessage.apply(e,arguments)},destroy:c})}}})(m(m({},t),{},{destroy:function(){r=null,d&&d(t.serverInfo,t)}}),r,a).run(e)})).catch((function(e){t(e)}))}else t(new Error("server closed"));var o,i,c,f}))},exports.createPrefixedEventName=j,exports.getIframeServer=function(e,t){const n=void 0!==e?e:document.body,r=E.resolveOrigin(t),o=M("iframe");let s;return document.querySelector(`#${o}`)?s=document.querySelector(`#${o}`):(s=document.createElement("iframe"),s.id=o,function(e,t){const n=(e="string"==typeof e?new URL(e,location):e).searchParams.get("debug");return null!==n&&(""===n||O(n))}(t)?s.style.cssText="width: 100%; height: 100%; border: 0;":(s.ariaHidden=!0,s.tabIndex=-1,s.hidden=!0,s.style.setProperty("display","none")),n.appendChild(s),s.src=t),{server:s.contentWindow||s.contentDocument.parentWindow,origin:r,iframe:s}},exports.getKeyName=M,exports.getServerMode=async function(e){const t=e.serverUrl,n=e.serverRequestTimeout||500;if(!t)return k.LOCAL;const r=new AbortController;let o,s;try{if(s=setTimeout((()=>{console.warn(`Request timed out after ${n}ms. Aborting request...`),r.abort()}),n),o=await fetch(t,{signal:r.signal}),o.ok)return k.REMOTE}catch(i){if(console.error(i),r.signal.aborted)throw new Error(`Unable to locate server page. The request timed out after ${n}ms. url: ${t.href}`);throw new Error(`Unable to locate server page : ${t.href}.`,i)}finally{clearTimeout(s)}throw new Error(`Unable to locate server page. The request failed with status code ${o.status}. url: ${t.href}`)},exports.patternMatchesOrigin=function(e,t){const n=e.replace(/[.]/g,"\\$&").replace(/-/g,"\\x2d").replace(/[*]/g,".*");return new RegExp(`^${n}$`,"u").test(t)},exports.startListening=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.eventFilter,r=void 0===t?function(){return!0}:t,o=e.timeout,s=void 0===o?2e4:o,i=e.serverInfo,a=void 0===i?{}:i,c=e.onDestroy;return new Promise((function(e){var t,o;(t=r,o=a,new Promise((function(e){var r="syn",s=Number(Math.random().toString().substr(3,10)),i=-1,a=null,c=5;window.addEventListener("message",(function l(u){if(u.data&&"postmessage-promise_client"===u.data[w]&&u.data.channelId&&u.data.method&&"hand-shake"===u.data.method&&t(u)){var d=u.data.payload||{},f=d.SYN,p=d.ACK,v=d.seqnumber,h=d.acknumber;if(1===f&&0===p){if("syn"!==r)return;i=v,r="ack";var m=function(){if(!u.source||u.source.closed)return console.info("client closed and reset to listening."),r="syn",clearTimeout(a),a=null,c=5,s=Number(Math.random().toString().substr(3,10)),i=-1,!1;try{u.source.postMessage(n(n(n(n({},w,"postmessage-promise_server"),"channelId",u.data.channelId),"method","hand-shake"),"payload",{serverInfo:o,acknumber:v+1,SYN:1,ACK:1,seqnumber:s}),u.origin)}catch(e){return console.error(e),!0}return!0};if(!m())return;a||(a=setTimeout((function e(){c>0?"ack"===r&&(c-=1,m()&&(a=setTimeout(e,1e3))):(console.info("server three-way hand shake timeout and reset to listening."),r="syn",clearTimeout(a),a=null,c=5,s=Number(Math.random().toString().substr(3,10)),i=-1)}),1e3))}else if("ack"===r&&1===p&&v===i+1&&h===s+1){r="finish",clearTimeout(a),a=null,window.removeEventListener("message",l);var g=u.data.payload,y=void 0===g?{}:g;e({client:u.source,origin:u.origin,channelId:u.data.channelId,serverInfo:o,clientInfo:y.clientInfo})}}}))}))).then((function(t){(function(e,t,n){var r=e.origin,o=e.client,s=e.channelId,i=e.clientInfo,a=void 0===i?{}:i,c=new v("server",{origin:r,source:o,channelId:s},t),u=new l("server",c,n),d=function(){u&&(u.destroy(),u=null),c=null,e.destroy&&e.destroy()},f=null;return f=setInterval((function(){o&&!o.closed||(console.info("client closed."),clearInterval(f),d())}),2e3),{run:function(e){e({channelId:s,clientInfo:a,postMessage:function(){var e;return u?(e=u).postMessage.apply(e,arguments):Promise.reject()},listenMessage:function(){var e;u&&(e=u).listenMessage.apply(e,arguments)},destroy:d})}}})(y(y({},t),{},{destroy:function(){c&&c(t.clientInfo,t)}}),r,s).run(e)}))}))},exports.stringIsUrl=function(e){try{return new URL(e,location),!0}catch{return!1}};
//# sourceMappingURL=constants-CpX72Nz6.cjs.map
