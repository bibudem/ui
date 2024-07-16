import { css, html, LitElement, unsafeCSS } from 'lit'
import { startListening } from 'postmessage-promise'
import { createRef, ref } from 'lit/directives/ref.js'
import { escapeStringRegexp } from '@/utils/url.js'
import { loggerFactory } from '@/utils/logger.js'
import getPreferenceStorage from './PreferenceStorage.js'
import styles from './bib-consent-server.scss?inline'

export class BibConsentServer extends LitElement {
  #storage
  #logger = loggerFactory('consent-server')

  static properties = {
    connected: {
      type: Boolean,
    },
    debug: {
      type: Boolean,
      reflect: true
    },
    allowedOrigins: {
      type: String,
      attribute: 'allowed-origins',
      converter: {
        fromAttribute: (value) => value.split(/\s+/).map(origin => origin.trim()),
        toAttribute: (value) => value.join(' ')
      }
    }
  }

  static styles = [
    css`${unsafeCSS(styles)}`
  ]

  /**
   * Constructs a new `BibConsentServer` instance.
   * 
   * The `BibConsentServer` is responsible for managing the consent preferences for the BIB application. It initializes the preference storage, starts listening for postMessage events, and provides methods for setting, getting, and resetting the user's consent preferences.
   * 
   * The constructor sets the initial state of the `BibConsentServer` instance, including whether it is connected, the debug mode, a reference to a logger, and the allowed origins for postMessage events.
   * 
   * @constructor
   * @param {boolean} [connected=false] - Indicates whether the `BibConsentServer` is currently connected and listening for postMessage events.
   * @param {boolean} [debug=false] - Enables debug logging if set to `true`.
   * @param {string[]} [allowedOrigins=[]] - An array of allowed origin patterns for postMessage events.
   */
  constructor() {
    super()
    this.connected = false
    this.debug = this.debug || false
    this.loggerRef = createRef()
    this.allowedOrigins = this.allowedOrigins || [] // Default: none
    this.init()
  }

  /**
   * Initializes the BibConsentServer instance.
   * 
   * This method sets up the preference storage, starts listening for storage update events, and begins listening for postMessage events from allowed origins.
   * 
   * The preference storage is initialized using the `getPreferenceStorage()` function, and a listener is added to the storage to log any updates to the preferences.
   * 
   * The `startListening()` method is then called to begin listening for postMessage events and handle requests to set, get, and reset the user's consent preferences.
   */
  async init() {
    this.#storage = await getPreferenceStorage()
    this.#storage.listen(event => {
      this.log('Storage updated with data', event.detail)
    })
    this.startListening()
  }

  log() {
    if (this.debug) {
      this.#logger(...arguments)
      const msg = [...arguments].map(part => typeof part === 'string' ? part : JSON.stringify(part)).join(' ')
      this.loggerRef.value.value += `${this.loggerRef.value.value === '' ? '' : '\r'}${msg}`
    }
  }

  /**
   * Starts listening for postMessage events from allowed origins and handles requests to set, get, and reset the user's consent preferences.
   * 
   * This method sets up a message listener that filters incoming messages based on the allowed origins specified in the `allowedOrigins` property. It then handles the following methods:
   * 
   * - `setPreferences`: Sets the user's consent preferences in the preference storage.
   * - `getPreferences`: Retrieves the user's consent preferences from the preference storage.
   * - `resetPreferences`: Resets the user's consent preferences in the preference storage.
   * - `ping`: Responds with "pong" to a ping request.
   * 
   * The method logs the method call and the response data, if any, to the debug logger.
   */
  async startListening() {
    const { postMessage, listenMessage } = await startListening({
      eventFilter: event => {
        const { origin } = event
        const originIsAllowed = this.allowedOrigins.length > 0 && this.allowedOrigins.some(originPattern => {
          const originRegex = new RegExp(`${escapeStringRegexp(originPattern)}`)
          return originRegex.test(origin)
        })

        return originIsAllowed
      }
    })

    this.connected = true
    this.log('connected:', this.connected)

    listenMessage(async (method, payload, response) => {

      let responseData

      switch (method) {
        case 'setPreferences':
          responseData = await this.#storage.setPreferences(payload)
          break

        case 'getPreferences':
          responseData = await this.#storage.getPreferences()
          break

        case 'resetPreferences':
          responseData = await this.#storage.resetPreferences()
          break

        case 'ping':
          responseData = "pong"
          break

        default:
          this.log(`Unknown method: ${method}. Payload:`, payload)
          throw new Error(`Unknown method: ${method}`)
      }

      if (payload) {
        this.log(`Method \`${method}\` called with payload:`, payload, 'response:', responseData)
      } else {
        this.log(`Method \`${method}\` called.`, 'response:', responseData)
      }

      response(responseData)

    })
  }

  render() {
    return html`
      <h1>I am bib-consent-server</h1>
      <div class="log-container">
        <textarea class="log" ${ref(this.loggerRef)}></textarea>
      </div>`
  }
}

if (!window.customElements.get('bib-consent-server')) {
  window.customElements.define('bib-consent-server', BibConsentServer)
}