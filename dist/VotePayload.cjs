/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.20.2
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),exports.VoteData=class{constructor(t){this.formId=43176,this.flags=0,this.collectIP=!1,this.collectBrowser=!0,this.collectRefer=!0,this.isPreview=!1,this.guid=t,this.data=[{flags:0,formId:43176,fieldId:1570387,hidden:!1,type:"control_radio",data:""},{flags:0,formId:43176,fieldId:1570390,hidden:!1,type:"control_multi",data:""}]}set vote(t){this.data.find((t=>1570387===t.fieldId)).data=t}set comment(t){this.data.find((t=>1570390===t.fieldId)).data=t}toJSON(){const t=new Date;return this.arrive=t.toISOString().substring(0,19).replace("T"," "),this.referrer=window.top.location.href,this}};
//# sourceMappingURL=VotePayload.cjs.map
