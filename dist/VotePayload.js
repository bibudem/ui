/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.13.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
class t {
  constructor(t2) {
    this.formId = 43176, this.flags = 0, this.collectIP = false, this.collectBrowser = true, this.collectRefer = true, this.isPreview = false, this.guid = t2, this.data = [{ flags: 0, formId: 43176, fieldId: 1570387, hidden: false, type: "control_radio", data: "" }, { flags: 0, formId: 43176, fieldId: 1570390, hidden: false, type: "control_multi", data: "" }];
  }
  set vote(t2) {
    this.data.find((t3) => 1570387 === t3.fieldId).data = t2;
  }
  set comment(t2) {
    this.data.find((t3) => 1570390 === t3.fieldId).data = t2;
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
