import { css, html, LitElement, unsafeCSS } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import PerfectScrollbar from 'perfect-scrollbar'
import '@auroratide/toggle-switch/lib/define.js'
import '../bib-button/bib-button-close.js'
import './bib-consent-consent-dialog.js'
import './bib-consent-preferences-dialog.js'
import PreferencesProxy from './PreferencesProxy.js'
import { SERVER_MODE, DEFAULT_PREFERENCES } from './constants.js'
import styles from './bib-consent.scss?inline'

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

  static styles = [
    css`${unsafeCSS(styles)}`
  ]

  #preferencesProxy
  #preferences

  constructor() {
    super()
    this.open = false
    this.preferencesDialogRef = createRef()
    this.consentDialogRef = createRef()
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
    console.log(preferences)
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

      // this.#initScrollbars()

      this.dispatchEvent(new CustomEvent('bib:consent:ready'))

      if (event.detail) {
        this.#preferences = event.detail
      } else {
        this.show('consent')
      }
    })

    this.#preferencesProxy.addEventListener.call(self, 'update', event => {
      console.log('[#preferencesProxy] update event: ', event)

      this.#preferences = event.detail
    })

    console.log('ici: ', this.consentDialogRef.value)
  }

  // #initScrollbars() {

  //   const scrollBarOptions = {
  //     maxScrollbarLength: 150,
  //     minScrollbarLength: 150,
  //     suppressScrollX: true
  //   }
  //   const consentPanel = this.renderRoot.querySelector('#consent-dialog .consent-container')

  //   const consentPanelScrollBar = new PerfectScrollbar(this.consentPanelRef.value, scrollBarOptions)
  //   const preferencesPanelScrollBar = new PerfectScrollbar(this.preferencesDialogRef.value, scrollBarOptions)

  //   console.log('preferencesPanelScrollBar: ', preferencesPanelScrollBar)
  // }

  show(panel = 'consent') {
    console.log('[show]', panel)
    if (typeof panel !== 'string' && !['consent', 'preferences'].includes(panel)) {
      throw new TypeError(`The panel argument must be a string of either values 'consent' or 'preferences'. `, panel)
    }

    this.open = true

    if (this.currentDialog) {
      this.currentDialog.close()
    }

    this.currentDialog = panel === 'consent' ? this.consentDialogRef.value : this.preferencesDialogRef.value
    this.preferencesDialogRef.value?.show()
    // this.currentDialog.show()
  }

  render() {
    return html`
        <bib-consent-consent-dialog @update="${(event) => this.savePreferences(event.detail)}" @show-preferences="${() => this.show('preferences')}" ${ref(this.consentDialogRef)}></bib-consent-consent-dialog>
        <bib-consent-preferences-dialog @update="${(event) => this.savePreferences(event.detail)}" ${ref(this.preferencesDialogRef)}></bib-consent-preferences-dialog>
    `
  }
}

customElements.define('bib-consent', BibConsent)