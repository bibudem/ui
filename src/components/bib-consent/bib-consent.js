import { css, html, LitElement, unsafeCSS } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import '@auroratide/toggle-switch/lib/define.js'
import '../bib-button/bib-button-close.js'
import './bib-consent-consent-dialog.js'
import './bib-consent-preferences-dialog.js'
import PreferencesProxy from './PreferencesProxy.js'
import { SERVER_MODE, DEFAULT_PREFERENCES } from './constants.js'

export class BibConsent extends LitElement {
  static properties = {
    serverUrl: {
      type: String,
      attribute: 'server-url'
    },
    serverRequestTimeout: {
      type: Number,
      attribute: 'server-request-timeout'
    },
    [SERVER_MODE.LOCAL]: {
      type: Boolean
    },
    debug: {
      type: Boolean,
      reflect: true
    },
    open: {
      type: Boolean,
      reflect: true
    },
  }

  #preferencesProxy
  #preferences
  #consentDialogRef
  #preferencesDialogRef

  constructor() {
    super()
    this.open = false
    this.#consentDialogRef = createRef()
    this.#preferencesDialogRef = createRef()
    this.#preferences = Object.keys(DEFAULT_PREFERENCES).reduce((obj, key) => ({ ...obj, [key]: false }), {})
  }

  get preferences() {
    return this.#preferences
  }

  setPreference(key, value) {
    if (!Object.keys(DEFAULT_PREFERENCES).includes(key)) {
      throw new Error(`${key} is not a valid key.`)
    }

    this.#preferences[key] = value
  }

  async savePreferences(preferences) {
    await this.#preferencesProxy.setPreferences(preferences)
  }

  async loadPreferences() {
    this.#preferences = await this.#preferencesProxy.getPreferences()
  }

  connectedCallback() {
    super.connectedCallback()
    const self = this
    this.debug = this.debug || false
    this.serverUrl = this.serverUrl || 'https://bib.umontreal.ca/consent/server'
    this.serverRequestTimeout = this.serverRequestTimeout || 500
    this.#preferencesProxy = new PreferencesProxy(this)
    this.#preferencesProxy.addEventListener.call(self, 'ready', event => {

      this.dispatchEvent(new CustomEvent('bib:consent:ready'))
      console.log('[#preferencesProxy] ready event: ', event)
      if (event.detail) {
        this.#preferences = event.detail
      } else {
        this.#show('consent')
      }
    })

    this.#preferencesProxy.addEventListener.call(self, 'update', event => {
      console.log('[#preferencesProxy] update event: ', event)

      this.#preferences = event.detail
    })

    this.addEventListener('bib:close', () => {
      console.log('[bib:close]')
      this.close()
    })

    console.log('[bib-consent] update: ', this.#preferences)
  }

  #show(panel = 'consent') {

    if (typeof panel !== 'string' && !['consent', 'preferences'].includes(panel)) {
      throw new TypeError(`The panel argument must be a string of either values 'consent' or 'preferences'. `, panel)
    }

    this.open = true

    if (this.currentDialog) {
      console.log('[#show] this.currentDialog', this.currentDialog)
      this.currentDialog.close()
    }

    console.log('[show]', this.#consentDialogRef.value)
    console.log('[show]', this.#preferencesDialogRef.value)
    this.currentDialog = panel === 'consent' ? this.#consentDialogRef.value : this.#preferencesDialogRef.value
    // this.#preferencesDialogRef.value?.show()
    this.currentDialog.show()
  }

  close() {
    this.open = false
    this.currentDialog?.close()
    this.currentDialog = null
  }

  show() {
    this.#show('consent')
  }

  showPreferences() {
    this.#show('preferences')
  }

  render() {
    return html`
        <bib-consent-consent-dialog .preferences=${this.#preferences} @update="${(event) => this.savePreferences(event.detail)}" @show-preferences="${() => this.#show('preferences')}" ${ref(this.#consentDialogRef)} @bib:close="${() => console.log('--- bib:close')}" @close="${() => console.log('--- close')}"></bib-consent-consent-dialog>
        <bib-consent-preferences-dialog .preferences=${this.#preferences} @update="${(event) => this.savePreferences(event.detail)}" ${ref(this.#preferencesDialogRef)} @bib:close="${() => console.log('--- bib:close')}" @close="${() => console.log('--- close')}"></bib-consent-preferences-dialog>
    `
  }
}

customElements.define('bib-consent', BibConsent)