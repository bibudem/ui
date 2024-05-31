export class VoteData {
  constructor(guid) {
    this.formId = 43176
    this.flags = 0
    this.collectIP = false
    this.collectBrowser = true
    this.collectRefer = true
    this.isPreview = false
    this.guid = guid
    this.data = [
      //Vote
      {
        flags: 0,
        formId: 43176,
        fieldId: 1570387,
        hidden: false,
        type: "control_radio",
        data: ""
      },
      // Commentaire
      {
        flags: 0,
        formId: 43176,
        fieldId: 1570390,
        hidden: false,
        type: "control_multi",
        data: ""
      }
    ]
  }

  /**
   * @param {string} value
   */
  set vote(value) {
    this.data.find(data => data.fieldId === 1570387).data = value
  }

  /**
   * @param {string} value
   */
  set comment(value) {
    this.data.find(data => data.fieldId === 1570390).data = value
  }

  toJSON() {
    const now = new Date()
    this.arrive = now.toISOString().substring(0, 19).replace('T', ' ')
    this.referrer = window.top.location.href

    return this
  }
}