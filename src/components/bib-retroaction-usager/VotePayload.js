export class VoteData {
  constructor(guid) {
    this.formId = 42971
    this.flags = 0
    // this.arrive = "2024-05-10 20:02:46"
    this.collectIP = false
    this.collectBrowser = true
    this.collectRefer = true
    this.isPreview = false
    // this.referrer = window.location.href
    this.guid = guid
    this.data = [
      {
        flags: 0,
        formId: 42971,
        fieldId: 1567166,
        hidden: false,
        type: "control_image_choice",
        data: ""
      },
      {
        flags: 0,
        formId: 42971,
        fieldId: 1566358,
        hidden: true,
        type: "control_multi",
        data: ""
      },
      {
        flags: 0,
        formId: 42971,
        fieldId: 1567098,
        hidden: true,
        type: "control_multi",
        data: ""
      }
    ]
  }

  /**
   * @param {string} value
   */
  set vote(value) {
    this.data.find(data => data.fieldId === 1567166).data = value
  }

  /**
   * @param {string} value
   */
  set comment(value) {
    this.data.find(data => data.fieldId === 1566358).data = value
  }

  toJSON() {
    const now = new Date()
    this.arrive = now.toISOString().substring(0, 19).replace('T', ' ')
    this.referrer = window.top.location.href

    return this
  }
}