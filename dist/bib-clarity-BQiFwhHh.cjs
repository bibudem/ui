/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const t={init(t){!function(t){try{return e=window,n=document,i="clarity",r="script",c=t,void(n.getElementById("clarity-script")||(e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},(a=n.createElement(r)).async=1,a.src="https://www.clarity.ms/tag/"+c+"?ref=npm",a.id="clarity-script",(o=n.getElementsByTagName(r)[0]).parentNode.insertBefore(a,o)))}catch(s){return}var e,n,i,r,c,a,o}(t)},setTag(t,e){window.clarity("set",t,e)},identify(t,e,n,i){window.clarity("identify",t,e,n,i)},consent(t=!0){window.clarity("consent",t)},upgrade(t){window.clarity("upgrade",t)},event(t){window.clarity("event",t)}};exports.Clarity=t,exports.styles="@layer component{:host(hidden){display:none}}";
//# sourceMappingURL=bib-clarity-BQiFwhHh.cjs.map
