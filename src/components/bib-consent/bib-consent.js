import { html, LitElement } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import { ContextProvider, ContextConsumer } from '@lit/context'
import '@auroratide/toggle-switch/lib/define.js'
import '../bib-button/bib-button-close.js'
import './bib-consent-consent-dialog.js'
import './bib-consent-preferences-dialog.js'
import createPreferencesClient from './preferencesClient.js'
import { consentContext } from './consent-context.js'
import { EVENT_NAMES, SERVER_MODE, SERVER_REQUEST_DEFAULT_TIMEOUT } from './constants.js'
import { loggerFactory } from '@/utils/logger.js'

const debug = loggerFactory('bib-consent', '#cd5300')

export class BibConsent extends LitElement {
  static properties = {
    serverUrl: {
      type: String,
      attribute: 'server-url',
      reflect: true
    },
    serverRequestTimeout: {
      type: Number,
      attribute: 'server-request-timeout',
      reflect: true
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

  #preferencesClient
  #preferences
  #consentDialogRef
  #preferencesDialogRef
  #consentProvider
  #consentConsumer
  #debug

  constructor() {
    super()
    this.open = false
    this.#consentDialogRef = createRef()
    this.#preferencesDialogRef = createRef()
    this.#consentProvider = new ContextProvider(this, { context: consentContext, initialValue: null })
    this.#consentConsumer = new ContextConsumer(this, { context: consentContext, callback: this.savePreferences })
    this.#debug = function () {
      if (this.debug) {
        debug(...arguments)
      }
    }
  }

  /**
   * Gets the user's consent preferences.
   * @returns {Object} The user's consent preferences.
   */
  get preferences() {
    return this.#consentConsumer.value
  }

  async connectedCallback() {
    super.connectedCallback()
    const self = this
    this.debug = this.debug || false
    this.serverUrl = this.serverUrl || 'https://bib.umontreal.ca/consent/server'
    this.serverRequestTimeout = this.serverRequestTimeout || SERVER_REQUEST_DEFAULT_TIMEOUT
    this.#preferencesClient = await createPreferencesClient({ host: this, serverUrl: this.serverUrl, reflectEvents: true })

    this.#preferencesClient.addEventListener(EVENT_NAMES.READY, event => {

      this.#debug(EVENT_NAMES.READY, 'event: ', event)

      if (event.detail) {
        // this.#preferences = event.detail
        // this.#consentProvider.setValue(event.detail)
      } else {
        this.#show('consent')
      }
    })

    this.#preferencesClient.addEventListener(EVENT_NAMES.UPDATE, event => {
      this.#debug(EVENT_NAMES.UPDATE, 'event:', event)
      // this.#consentProvider.setValue(event.detail)
    })

    this.addEventListener('bib:close', () => {
      this.#debug('[bib:close]')
      this.close()
    })

    this.shadowRoot.addEventListener('context-request', event => {
      event.stopPropagation()
      this.#debug('%c[context-request] event: ', 'color: red; font-weight: bold;', event)
      event.callback(this.preferences)
    })
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

  async getPreferences() {
    this.#preferences = await this.#preferencesClient.getPreferences()
    return this.#preferences
  }

  /**
   * Saves the user's consent preferences to the server.
   *
   * @param {Object} preferences - The user's consent preferences.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the preferences were saved successfully, or `false` if there was an error.
   */

  async savePreferences(preferences) {
    this.#debug('[savePreferences] preferences: ', preferences)
    try {
      await this.#preferencesClient.setPreferences(preferences)
      this.#consentProvider.setValue(preferences)
      return true
    } catch (error) {
      console.error('[savePreferences] error: ', error)
      throw error
    }
  }

  async resetPreferences() {
    this.#preferences = await this.#preferencesClient.resetPreferences()
    return this.#preferences
  }

  #show(panel = 'consent') {

    if (typeof panel !== 'string' && !['consent', 'preferences'].includes(panel)) {
      throw new TypeError(`The panel argument must be a string of either values 'consent' or 'preferences'. `, panel)
    }

    this.open = true

    if (this.currentDialog) {
      this.#debug('[#show] this.currentDialog', this.currentDialog)
      this.currentDialog.close()
    }

    this.#debug('[show]', this.#consentDialogRef.value)
    this.#debug('[show]', this.#preferencesDialogRef.value)
    this.currentDialog = panel === 'consent' ? this.#consentDialogRef.value : this.#preferencesDialogRef.value
    // this.#preferencesDialogRef.value?.show()
    this.currentDialog.show()
  }

  async _handleUpdateEvent(event) {
    this.#debug('[#handleUpdateEvent]', event)
    const success = await this.savePreferences(event.detail)
    this.#debug('[#handleUpdateEvent] success: ', success)
    // if (!success) {
    //   return
    // }
    // this.dispatchEvent(new CustomEvent(prefixedEventName('update'), { detail: event.detail }))
  }

  render() {
    return html`
        <bib-consent-consent-dialog @update="${this._handleUpdateEvent}" @show-preferences="${() => this.#show('preferences')}" ${ref(this.#consentDialogRef)} @bib:close="${() => this.#debug('--- bib:close')}" @close="${() => this.#debug('--- close')}"></bib-consent-consent-dialog>
        <bib-consent-preferences-dialog @update="${this._handleUpdateEvent}" ${ref(this.#preferencesDialogRef)} @bib:close="${() => this.#debug('--- bib:close')}" @close="${() => this.#debug('--- close')}"></bib-consent-preferences-dialog>
    `
  }
}

customElements.define('bib-consent', BibConsent)