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

/**
 * The `BibConsent` class is a custom web component that provides a user interface for managing consent preferences.
 *
 * It includes the following functionality:
 * - Fetching and displaying the user's consent preferences from a server
 * - Allowing the user to update their consent preferences
 * - Saving the updated consent preferences to the server
 * - Providing a consent dialog and a preferences dialog for the user to interact with
 *
 * The component can be configured with the following properties:
 * - `serverUrl`: the URL of the server where the consent preferences are stored
 * - `serverRequestTimeout`: the timeout for requests to the server
 * - `[SERVER_MODE.LOCAL]`: a boolean indicating whether the component is running in local mode
 * - `debug`: a boolean indicating whether debug logging should be enabled
 * - `open`: a boolean indicating whether the consent dialog or preferences dialog is currently open
 *
 * The component uses the `@lit/context` library to manage the consent preferences as a shared context, and the `createPreferencesClient` function to interact with the server.
 */
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
    this.#consentProvider = new ContextProvider(this, { context: consentContext, initialValue: null })
    this.#consentConsumer = new ContextConsumer(this, { context: consentContext, callback: this.savePreferences })
  }

  /**
   * Gets the user's consent preferences.
   * @returns {Object} The user's consent preferences.
   */
  get preferences() {
    return this.#consentConsumer.value
  }

  /**
   * Initializes the `BibConsent` component, sets up the necessary state and references, and handles events related to the preferences client.
   * 
   * The `connectedCallback` method performs the following tasks:
   * - Calls the parent class's `connectedCallback` method
   * - Sets the `debug` property to `false` if it is not already defined
   * - Sets the `serverUrl` property to `'https://bib.umontreal.ca/consent/server'` if it is not already defined
   * - Sets the `serverRequestTimeout` property to `SERVER_REQUEST_DEFAULT_TIMEOUT` if it is not already defined
   * - Creates a `PreferencesClient` instance and assigns it to the `#preferencesClient` property
   * - Adds event listeners for the `EVENT_NAMES.READY` and `EVENT_NAMES.UPDATE` events on the `#preferencesClient` instance
   * - Adds an event listener for the `context-request` event on the component's shadow root, which responds with the current preferences
   */
  async connectedCallback() {
    super.connectedCallback()

    this.debug = this.debug || false
    this.serverUrl = this.serverUrl || 'https://bib.umontreal.ca/consent/server'
    this.serverRequestTimeout = this.serverRequestTimeout || SERVER_REQUEST_DEFAULT_TIMEOUT
    this.#preferencesClient = await createPreferencesClient({ host: this, serverUrl: this.serverUrl, reflectEvents: true })

    this.#preferencesClient.addEventListener(EVENT_NAMES.READY, event => {

      this.#debug(EVENT_NAMES.READY, 'event: ', event)

      if (event.detail) {
        // this.#preferences = event.detail
        this.#consentProvider.setValue(event.detail)
      } else {
        this.#show('consent')
      }
    })
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
  }

  /**
   * Closes the current dialog, if any, and sets the `open` property to `false`.
   */
  close() {
    this.#close()
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
   * Retrieves the user's consent preferences from the server.
   *
   * @returns {Promise<Object>} - A promise that resolves to the user's consent preferences.
   */
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

  /**
   * Resets the user's consent preferences to their default values.
   *
   * @returns {Promise<Object>} - A promise that resolves to the user's reset consent preferences.
   */
  async resetPreferences() {
    this.#preferences = await this.#preferencesClient.resetPreferences()
    return this.#preferences
  }

  async #handleUpdateEvent(event) {
    this.#debug('[#handleUpdateEvent]', event)
    const success = await this.savePreferences(event.detail)
    this.#debug('[#handleUpdateEvent] success: ', success)
    if (!success) {
      // TODO: show error message
      return
    }
    this.dispatchEvent(new CustomEvent(EVENT_NAMES.UPDATE, { detail: event.detail }))
    this.#close()
  }

  #handleCloseEvent(event) {
    event.stopPropagation()
    this.#close(false)
  }

  render() {
    return html`
        <bib-consent-consent-dialog @update="${this.#handleUpdateEvent}" @show-preferences="${() => this.#show('preferences')}" ${ref(this.#consentDialogRef)} @close="${this.#handleCloseEvent}"></bib-consent-consent-dialog>
        <bib-consent-preferences-dialog @update="${this.#handleUpdateEvent}" ${ref(this.#preferencesDialogRef)} @close="${this.#handleCloseEvent}"></bib-consent-preferences-dialog>
    `
  }
}

if (!window.customElements.get('bib-consent')) {
  window.customElements.define('bib-consent', BibConsent)
}