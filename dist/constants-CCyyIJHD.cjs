/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.11.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const e=require("./package-rdB_0wNv.cjs"),n=require("./type-KOUr406I.cjs");function t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n,t){return Object.defineProperty(e,"prototype",{writable:!1}),e}function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var s="client_response",i="server_response",a={server:{receive:s,post:i},client:{receive:i,post:s}},c=["hand-shake","wave-hand",s,i],l=r((function e(n,r,s){var i=this;o(this,e),t(this,"receiveMessage",(function(e,n,t){if(e===a[i.type].receive){if(n&&i.messageResponse[n]){var r=i.messageResponse[n];delete i.messageResponse[n],r(t)}}else i.listener?i.listener(e,t,(function(e){i.messageProxy.request(a[i.type].post,n,e)})):console.warn("no message listener: ",e,t)})),t(this,"doPost",(function(e,n,t){var r=e.resolve,o=e.reject,s=e.eventId;i.messageResponse[s]=r;try{i.messageProxy.request(n,s,t)}catch(a){throw delete i.messageResponse[s],o(),a}})),t(this,"listenMessage",(function(e){i.listener=e})),t(this,"postMessage",(function(e,n){return c.indexOf(e)>=0?Promise.reject(new Error("".concat(e," is a protected key-method."))):new Promise((function(t,r){if(i.destroyed)r(new Error("message-channel had been destroyed!"));else{var o=null,s=Math.random().toString().substr(3,10);i.doPost({resolve:function(e){clearTimeout(o),t(e)},reject:r,eventId:s},e,n),o=setTimeout((function(){i.messageResponse&&delete i.messageResponse[s],r(new Error("postMessage timeout"))}),i.timeout||2e4)}}))})),t(this,"destroy",(function(){i.destroyed=!0,i.unListen&&(i.unListen(),i.unListen=null),i.listener=null,i.messageResponse=null,i.messageProxy&&(i.messageProxy.destroy(),i.messageProxy=null)})),this.type=n,this.messageProxy=r,this.listener=null,this.messageResponse={},this.timeout=s,this.unListen=this.messageProxy.listen(this.receiveMessage)})),u="postmessage-promise_client",d="postmessage-promise_server",f="identity_key",p={server:{key:d,accept:u},client:{key:u,accept:d}},v=r((function e(n,r,s){var i=this;o(this,e),t(this,"listen",(function(e){var n=i,t=function(t){if(("*"===n.origin||t.origin===n.origin)&&t.source===n.source&&t.data&&t.data[f]===p[n.type].accept&&t.data.channelId===n.channelId&&n.eventFilter(t)&&t.data.method){var r=t.data,o=r.eventId,s=r.method,i=r.payload;e(s,o,i)}};return window.addEventListener("message",t),function(){window.removeEventListener("message",t)}})),t(this,"request",(function(e,n,r){i.source&&!i.source.closed?i.source.postMessage(t(t(t(t(t({},f,p[i.type].key),"channelId",i.channelId),"eventId",n),"method",e),"payload",r),i.origin):console.error("source closed.")})),t(this,"destroy",(function(){i.type="",i.origin="",i.source=null,i.channelId="",i.eventFilter=null})),this.type=n;var a=r.origin,c=r.source,l=r.channelId;this.origin=a,this.source=c,this.channelId=l,this.eventFilter=s}));function h(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function m(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?h(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function g(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function y(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?g(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}var w="identity_key";function b(e){var n=document.createElement("a");n.href=e;var t=n.protocol.length>4?n.protocol:window.location.protocol,r=n.host.length?"80"===n.port||"443"===n.port?n.hostname:n.host:window.location.host;return n.origin||"".concat(t,"//").concat(r)}var E={resolveOrigin:b,getIframeServer:function(e,n,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=void 0!==e?e:document.body,s=b(n),i=document.createElement("iframe");return i.name=t||"",i.classList.add.apply(i.classList,r),o.appendChild(i),i.src=n,{server:i.contentWindow||i.contentDocument.parentWindow,origin:s,frame:i}},getOpenedServer:function(e){for(var n,t=b(e),r=arguments.length,o=new Array(r>1?r-1:0),s=1;s<r;s++)o[s-1]=arguments[s];return{server:(n=window).open.apply(n,[e].concat(o)),origin:t}}};var I=n.typeExports;const O=(P=function(e){if("string"!==I(e))return!!e;var n;switch(e.toLowerCase()){case"false":case"0":case"undefined":case"null":case"":case"n":case"no":case"off":n=!1;break;default:n=!0}return n})&&P.__esModule&&Object.prototype.hasOwnProperty.call(P,"default")?P.default:P;var P;function j(e){return function(n){return`bib:${e}:${n}`}}function M(e){return`${R}-${e}`}const k=j("consent"),x=`${e.name}/consent`,S={CONSENT:k("consent"),READY:k("ready"),UPDATE:k("update")},R="bib-consent",T={LOCAL:"local",REMOTE:"remote"};exports.DB_NAME=x,exports.DB_STORE_NAME="consent",exports.DB_VERSION=1,exports.DEFAULT_PREFERENCES={performanceCookies:null,functionalityCookies:null,adsCookies:null},exports.EVENT_NAMES=S,exports.PREFIX=R,exports.SERVER_MODE=T,exports.SERVER_REQUEST_DEFAULT_TIMEOUT=500,exports.callServer=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)throw new Error("serverObject is null");var t=e.server,r=e.origin,o=n.eventFilter,s=void 0===o?function(){return!0}:o,i=n.timeout,a=void 0===i?2e4:i,c=n.clientInfo,u=void 0===c?{}:c,d=n.onDestroy,f=Math.random().toString().substr(3,10),p={source:t,origin:r,channelId:f};return new Promise((function(e,n){if(t&&!t.closed){var r=new v("client",p,s);(o=p,i=r,c=a,f=u,new Promise((function(e,n){var t=o.source,r=o.origin,s=o.channelId,a=Number(Math.random().toString().substr(3,10)),l=null,u=new Date,d=null;d=i.listen((function(n,o){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("hand-shake"===n){var u=c||{},p=u.SYN,v=u.ACK,h=u.seqnumber,m=u.acknumber;1===p&&1===v&&m===a+1&&(clearInterval(l),d&&d(),i.request("hand-shake","hand-shake-event",{clientInfo:f,ACK:1,seqnumber:a+1,acknumber:h+1}),e({server:t,origin:r,channelId:s,serverInfo:c.serverInfo,clientInfo:f}))}})),l=setInterval((function(){if(!t||t.closed)throw clearInterval(l),d&&d(),n(new Error("server closed.")),new Error("server closed.");if(c&&new Date-u>c)throw clearInterval(l),d&&d(),n(new Error("connect timeout.")),new Error("connect timeout.");i.request("hand-shake","hand-shake-event",{clientInfo:f,SYN:1,ACK:0,seqnumber:a})}),100)}))).then((function(n){(function(e,n,t){var r=e.server,o=e.serverInfo,s=void 0===o?{}:o,i=e.channelId,a=new l("client",n,t),c=function(){a&&(a.destroy(),a=null),e.destroy&&e.destroy()},u=null;return u=setInterval((function(){r&&!r.closed||(console.info("server closed."),clearInterval(u),c())}),2e3),{run:function(e){e({channelId:i,serverInfo:s,postMessage:function(){var e;return a?(e=a).postMessage.apply(e,arguments):Promise.reject()},listenMessage:function(){var e;a&&(e=a).listenMessage.apply(e,arguments)},destroy:c})}}})(m(m({},n),{},{destroy:function(){r=null,d&&d(n.serverInfo,n)}}),r,a).run(e)})).catch((function(e){n(e)}))}else n(new Error("server closed"));var o,i,c,f}))},exports.createPrefixedEventName=j,exports.getIframeServer=function(e,n){const t=void 0!==e?e:document.body,r=E.resolveOrigin(n),o=M("iframe");let s;return document.querySelector(`#${o}`)?s=document.querySelector(`#${o}`):(s=document.createElement("iframe"),s.id=o,function(e,n){const t=(e="string"==typeof e?new URL(e,location):e).searchParams.get("debug");return null!==t&&(""===t||O(t))}(n)?s.style.cssText="width: 100%; height: 100%; border: 0;":(s.ariaHidden=!0,s.tabIndex=-1,s.hidden=!0,s.style.setProperty("display","none")),t.appendChild(s),s.src=n),{server:s.contentWindow||s.contentDocument.parentWindow,origin:r,iframe:s}},exports.getKeyName=M,exports.getServerMode=async function(e){const n=e.serverUrl,t=e.serverRequestTimeout||500;if(!n)return T.LOCAL;const r=new AbortController;let o,s;try{if(s=setTimeout((()=>{console.warn(`Request timed out after ${t}ms. Aborting request...`),r.abort()}),t),o=await fetch(n,{signal:r.signal}),o.ok)return T.REMOTE}catch(i){if(console.error(i),r.signal.aborted)throw new Error(`Unable to locate server page. The request timed out after ${t}ms. url: ${n.href}`);throw new Error(`Unable to locate server page : ${n.href}.`,i)}finally{clearTimeout(s)}throw new Error(`Unable to locate server page. The request failed with status code ${o.status}. url: ${n.href}`)},exports.patternMatchesOrigin=function(e,n){const t=e.replace(/[.]/g,"\\$&").replace(/-/g,"\\x2d").replace(/[*]/g,".*");return new RegExp(`^${t}$`,"u").test(n)},exports.startListening=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.eventFilter,r=void 0===n?function(){return!0}:n,o=e.timeout,s=void 0===o?2e4:o,i=e.serverInfo,a=void 0===i?{}:i,c=e.onDestroy;return new Promise((function(e){var n,o;(n=r,o=a,new Promise((function(e){var r="syn",s=Number(Math.random().toString().substr(3,10)),i=-1,a=null,c=5;window.addEventListener("message",(function l(u){if(u.data&&"postmessage-promise_client"===u.data[w]&&u.data.channelId&&u.data.method&&"hand-shake"===u.data.method&&n(u)){var d=u.data.payload||{},f=d.SYN,p=d.ACK,v=d.seqnumber,h=d.acknumber;if(1===f&&0===p){if("syn"!==r)return;i=v,r="ack";var m=function(){if(!u.source||u.source.closed)return console.info("client closed and reset to listening."),r="syn",clearTimeout(a),a=null,c=5,s=Number(Math.random().toString().substr(3,10)),i=-1,!1;try{u.source.postMessage(t(t(t(t({},w,"postmessage-promise_server"),"channelId",u.data.channelId),"method","hand-shake"),"payload",{serverInfo:o,acknumber:v+1,SYN:1,ACK:1,seqnumber:s}),u.origin)}catch(e){return console.error(e),!0}return!0};if(!m())return;a||(a=setTimeout((function e(){c>0?"ack"===r&&(c-=1,m()&&(a=setTimeout(e,1e3))):(console.info("server three-way hand shake timeout and reset to listening."),r="syn",clearTimeout(a),a=null,c=5,s=Number(Math.random().toString().substr(3,10)),i=-1)}),1e3))}else if("ack"===r&&1===p&&v===i+1&&h===s+1){r="finish",clearTimeout(a),a=null,window.removeEventListener("message",l);var g=u.data.payload,y=void 0===g?{}:g;e({client:u.source,origin:u.origin,channelId:u.data.channelId,serverInfo:o,clientInfo:y.clientInfo})}}}))}))).then((function(n){(function(e,n,t){var r=e.origin,o=e.client,s=e.channelId,i=e.clientInfo,a=void 0===i?{}:i,c=new v("server",{origin:r,source:o,channelId:s},n),u=new l("server",c,t),d=function(){u&&(u.destroy(),u=null),c=null,e.destroy&&e.destroy()},f=null;return f=setInterval((function(){o&&!o.closed||(console.info("client closed."),clearInterval(f),d())}),2e3),{run:function(e){e({channelId:s,clientInfo:a,postMessage:function(){var e;return u?(e=u).postMessage.apply(e,arguments):Promise.reject()},listenMessage:function(){var e;u&&(e=u).listenMessage.apply(e,arguments)},destroy:d})}}})(y(y({},n),{},{destroy:function(){c&&c(n.clientInfo,n)}}),r,s).run(e)}))}))},exports.stringIsUrl=function(e){try{return new URL(e,location),!0}catch{return!1}};
//# sourceMappingURL=constants-CCyyIJHD.cjs.map
