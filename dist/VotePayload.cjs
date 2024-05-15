/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),exports.VoteData=class{constructor(t){this.formId=42971,this.flags=0,this.collectIP=!1,this.collectBrowser=!0,this.collectRefer=!0,this.isPreview=!1,this.guid=t,this.data=[{flags:0,formId:42971,fieldId:1567166,hidden:!1,type:"control_image_choice",data:""},{flags:0,formId:42971,fieldId:1566358,hidden:!0,type:"control_multi",data:""},{flags:0,formId:42971,fieldId:1567098,hidden:!0,type:"control_multi",data:""}]}set vote(t){this.data.find((t=>1567166===t.fieldId)).data=t}set comment(t){this.data.find((t=>1566358===t.fieldId)).data=t}toJSON(){const t=new Date;return this.arrive=t.toISOString().substring(0,19).replace("T"," "),this.referrer=window.top.location.href,this}};
//# sourceMappingURL=VotePayload.cjs.map
