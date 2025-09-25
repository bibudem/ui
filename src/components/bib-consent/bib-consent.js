import { html, LitElement } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import { ContextProvider, ContextConsumer } from '@lit/context'
import '@auroratide/toggle-switch/lib/define.js'
import { loggerFactory } from '@/utils/logger.js'
import { addToGlobalBib } from '@/utils/bib.js'
import { dispatchPublicEvent } from '@/utils/events.js'
import { ConsentTokens } from './ConsentTokens.js'
import createConsentClient from './consentClient.js'
import { consentContext } from './consent-context.js'
import '../bib-button/bib-button-close.js'
import './bib-consent-consent-dialog.js'
import './bib-consent-preferences-dialog.js'
import { CONSENT_STATES, EVENT_NAMES, SERVER_MODE, SERVER_REQUEST_DEFAULT_TIMEOUT, SERVER_DEFAULT_URL } from './constants.js'
import { c } from '../../../dist/_Uint8Array-Cf-PTZCw.js'

const debug = loggerFactory('bib-consent', '#cd5300')

/**
 * @typedef {'indeterminate' | 'determinate'} ConsentState
 */

/**
 * The `BibConsent` class is a custom web component that provides a user interface for managing consent preferences.
 *
 * It includes the following functionality:
 * - Fetching and displaying the user's consent preferences from a server
 * - Allowing the user to change their consent preferences
 * - Saving the changed consent preferences to the server
 * - Providing a consent dialog and a preferences dialog for the user to interact with
 *
 * The component can be configured with the following properties:
 * - `serverUrl`: the URL of the server where the consent preferences are stored
 * - `serverRequestTimeout`: the timeout for requests to the server
 * - `[SERVER_MODE.LOCAL]`: a boolean indicating whether the component is running in local mode
 * - `debug`: a boolean indicating whether debug logging should be enabled
 * - `open`: a boolean indicating whether the consent dialog or preferences dialog is currently open
 *
 * The component uses the `@lit/context` library to manage the consent preferences as a shared context, and the `createConsentClient` function to interact with the server.
 * 
 * @class BibConsent
 * @extends LitElement
 * @property {string} serverUrl - The URL of the server where the consent preferences are stored.
 * @property {number} serverRequestTimeout - The timeout for requests to the server.
 * @property {boolean} [SERVER_MODE.LOCAL] - A boolean indicating whether the component is running in local mode.
 * @property {boolean} debug - A boolean indicating whether debug logging should be enabled.
 * @property {boolean} open - A boolean indicating whether the consent dialog or preferences dialog is currently open.
 * @property {ConsentState} state - The current state of the BibConsent component, which can be one of the following values:
 *   - `indeterminate`: The user has not yet indicated their consent preferences.
 *   - `determinate`: The user has made their consent preferences.
 * @property {import('./ConsentTokens.js').ConsentTokens} consentTokens - The user's consent tokens.
 * @emits {CustomEvent} EVENT_NAMES.READY - Emitted when the consent client is ready.
 * @emits {CustomEvent} EVENT_NAMES.CHANGE - Emitted when the consent preferences are changed.
 * @emits {CustomEvent} context-request - Emitted when the context is requested.
 * @method connectedCallback - Initializes the component and sets up the necessary state and references.
 * @method close - Closes the current dialog and sets the `open` property to `false`.
 * @method show - Shows the consent dialog.
 * @method showPreferences - Shows the preferences dialog.
 * @method getTokens - Gets the user's consent tokens.
 * @method saveTokens - Saves the user's consent tokens to the server.
 * @method resetTokens - Resets the user's consent tokens to their default values.
 * @method render - Renders the component.
 */
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
    state: {
      type: String
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

  _consentClient
  #consentTokens
  #consentProvider
  #consentConsumer
  #state = CONSENT_STATES.INDETERMINATE
  #consentDialogRef
  #preferencesDialogRef

  /**
   * Initializes the `BibConsent` component, setting up the necessary state and references.
   * 
   * The constructor performs the following tasks:
   * - Calls the parent class constructor (`super()`)
   * - Initializes the `open` property to `false`, indicating that no dialog is currently open
   * - Sets the `currentDialog` property to `null`, as no dialog is currently open
   * - Creates references to the consent dialog and preferences dialog using `createRef()`
   * - Creates a `ContextProvider` instance for the consent context, with the component instance as the host and an initial value of `null`
   * - Creates a `ContextConsumer` instance for the consent context, with the component instance as the host and the `savePreferences` method as the callback
   */
  constructor() {
    super()
    this.open = false
    this.currentDialog = null
    this.#consentDialogRef = createRef()
    this.#preferencesDialogRef = createRef()
    this.#consentProvider = new ContextProvider(this, { context: consentContext, initialValue: new ConsentTokens() })
    this.#consentConsumer = new ContextConsumer(this, { context: consentContext, callback: this.savePreferences })
  }

  #dispatchPublicEvent(name, detail = null) {
    dispatchPublicEvent(this, name, { detail })
  }

  /**
   * Gets the current state of the BibConsent component.
   * The state is determined by the user's input. Initially `indeterminate`, it turns `determinate` when the user has indicated their consent preferences.
   * @readonly
   * @returns {import('./constants.js').consentStateTypes} The current state of the BibConsent component, which can be one of the following values:
   * - `indeterminate`: The user has not yet indicated their consent preferences.
   * - `determinate`: The user has made their consent preferences.
   */
  get state() {
    return this.#state
  }

  // /**
  //  * Gets the user's consent tokens.
  //  * @readonly
  //  * @returns {import('./ConsentTokens.js').ConsentTokens} The user's consent tokens.
  //  */
  // get consentTokens() {
  //   return this.#consentConsumer.value
  // }

  /**
   * Initializes the `BibConsent` component, sets up the necessary state and references, and handles events related to the consent client.
   * 
   * The `connectedCallback` method performs the following tasks:
   * - Calls the parent class's `connectedCallback` method
   * - Sets the `debug` property to `false` if it is not already defined
   * - Sets the `serverUrl` property to `'https://bib.umontreal.ca/consent/server/'` if it is not already defined
   * - Sets the `serverRequestTimeout` property to `SERVER_REQUEST_DEFAULT_TIMEOUT` if it is not already defined
   * - Creates a `ConsentClient` instance and assigns it to the `_consentClient` property
   * - Adds event listeners for the `EVENT_NAMES.READY` and `EVENT_NAMES.CHANGE` events on the `_consentClient` instance
   * - Adds an event listener for the `context-request` event on the component's shadow root, which responds with the current tokens
   */
  async connectedCallback() {
    super.connectedCallback()
    this.debug = this.debug || false
    this.serverUrl = this.serverUrl || SERVER_DEFAULT_URL
    this.serverRequestTimeout = this.serverRequestTimeout || SERVER_REQUEST_DEFAULT_TIMEOUT

    this._consentClient = await createConsentClient({ host: this, serverUrl: this.serverUrl, serverRequestTimeout: this.serverRequestTimeout, reflectEvents: true })

    this._consentClient.addEventListener(EVENT_NAMES.READY, event => {

      const { detail: consentData } = event

      if (consentData.getState() === CONSENT_STATES.DETERMINATE) {
        this.#setValue(consentData)
      } else {
        this.#show('consent')
      }

      this.#dispatchPublicEvent(EVENT_NAMES.READY, { ...consentData.toObject(), a: 'allo' })
    })
  }

  #setValue(value) {
    this.#consentProvider.setValue(value)
    this.#state = this.#consentProvider.value.getState()
  }

  #debug() {
    if (this.debug) {
      debug(...arguments)
    }
  }

  #close(emit = true) {
    this.open = false
    this.currentDialog?.close(emit)
    this.currentDialog = null

    if (emit) {
      this.#dispatchPublicEvent(EVENT_NAMES.CLOSE)
    }
  }

  /**
   * Closes the current dialog, if any, and sets the `open` property to `false`.
   */
  close() {
    this.#close()
  }

  #show(panel = 'consent') {

    const validPanels = ['consent', 'preferences']

    if (typeof panel !== 'string' && !validPanels.includes(panel)) {
      throw new TypeError(`The panel argument must be a string of either values \`${validPanels.join(` or `)}\`. You provided \`${panel}\``, panel)
    }

    this.open = true

    if (this.currentDialog) {
      this.#debug('[#show] this.currentDialog', this.currentDialog)
      this.currentDialog.close()
    }

    this.#debug('[show]', this.#consentDialogRef.value)
    this.#debug('[show]', this.#preferencesDialogRef.value)
    this.currentDialog = panel === 'consent' ? this.#consentDialogRef.value : this.#preferencesDialogRef.value
    this.currentDialog.show()
  }

  /**
   * Shows the consent dialog.
   */
  show() {
    this.#show('consent')
  }

  /**
   * Shows the preferences dialog.
   */
  showPreferences() {
    this.#show('preferences')
  }

  /**
   * Retrieves the user's consent tokens from the server.
   *
   * @returns {Promise<Object>} - A promise that resolves to the user's consent tokens.
   */
  async getTokens() {
    this.#consentTokens = await this._consentClient.getConsentTokens()
    return this.#consentTokens.toObject()
  }

  /**
   * Saves the user's consent tokens to the server.
   *
   * @param {Object} preferences - The user's consent preferences.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the preferences were saved successfully, or `false` if there was an error.
   */

  async saveTokens(tokens) {
    this.#debug('[save] tokens: ', tokens)
    const consentTokens = ConsentTokens.from(tokens)
    try {
      await this._consentClient.setConsentTokens(consentTokens)
      this.#setValue(consentTokens)
      return true
    } catch (error) {
      console.error('[savePreferences] error: ', error)
      throw error
    }
  }

  /**
   * Resets the user's consent preferences to their default values.
   *
   * @returns {Promise<Object>} - A promise that resolves to the user's reset consent preferences.
   */
  async resetTokens() {
    await this._consentClient.resetTokens()
    const tokens = await this._consentClient.getConsentTokens()
    this.#consentTokens = tokens
    this.#dispatchPublicEvent(EVENT_NAMES.CHANGE, tokens.toObject())
    return tokens
  }

  async #handleChangeEvent(event) {
    // this.#debug('[#handleChangeEvent]', event)
    const success = await this.saveTokens(event.detail)
    // this.#debug('[#handleChangeEvent] success: ', success)

    if (!success) {
      // TODO: show error message
      return
    }

    const tokens = await this.getTokens()
    this.#dispatchPublicEvent(EVENT_NAMES.CHANGE, tokens)
    this.#close()
  }

  #handleCloseEvent(event) {
    this.#close(false)
  }

  render() {
    return html`
        <bib-consent-consent-dialog @intern:change="${this.#handleChangeEvent}" @intern:show-preferences="${() => this.#show('preferences')}" ${ref(this.#consentDialogRef)} @intern:close="${this.#handleCloseEvent}"></bib-consent-consent-dialog>
        <bib-consent-preferences-dialog @intern:change="${this.#handleChangeEvent}" ${ref(this.#preferencesDialogRef)} @intern:close="${this.#handleCloseEvent}"></bib-consent-preferences-dialog>
    `
  }
}

if (!window.customElements.get('bib-consent')) {
  window.customElements.define('bib-consent', BibConsent)
}

addToGlobalBib('consent', {})