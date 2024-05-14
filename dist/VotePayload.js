/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.8.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
class t {
  constructor(t2) {
    this.formId = 42971, this.flags = 0, this.collectIP = false, this.collectBrowser = true, this.collectRefer = true, this.isPreview = false, this.guid = t2, this.data = [{ flags: 0, formId: 42971, fieldId: 1567166, hidden: false, type: "control_image_choice", data: "" }, { flags: 0, formId: 42971, fieldId: 1566358, hidden: true, type: "control_multi", data: "" }, { flags: 0, formId: 42971, fieldId: 1567098, hidden: true, type: "control_multi", data: "" }, { flags: 0, formId: 42971, fieldId: 1567099, hidden: true, type: "control_sub_email", data: "" }];
  }
  set vote(t2) {
    this.data.find((t3) => 1567166 === t3.fieldId).data = t2;
  }
  set comment(t2) {
    this.data.find((t3) => 1566358 === t3.fieldId).data = t2;
  }
  set email(t2) {
    this.data.find((t3) => 1567099 === t3.fieldId).data = t2;
  }
  toJSON() {
    const t2 = /* @__PURE__ */ new Date();
    return this.arrive = t2.toISOString().substring(0, 19).replace("T", " "), this.referrer = window.top.location.href, this;
  }
}
export {
  t as VoteData
};
//# sourceMappingURL=VotePayload.js.map
