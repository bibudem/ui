import { css, html, LitElement, unsafeCSS } from 'lit'
import { startListening } from 'postmessage-promise'
import { createRef, ref } from 'lit/directives/ref.js'
import { patternMatchesOrigin } from '@/utils/url.js'
import { loggerFactory } from '@/utils/logger.js'
import getPreferenceStorage from './PreferenceStorage.js'
import styles from './bib-consent-server.scss?inline'

/**
 * @class BibConsentServer
 * @extends LitElement
 * @description A custom element that manages consent preferences for the BIB application.
 * It handles storage of preferences, listens for postMessage events, and provides methods
 * for setting, getting, and resetting user consent preferences.
 */
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
   * Creates an instance of BibConsentServer.
   * @constructor
   * @description Initializes the BibConsentServer with default values and starts the initialization process.
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
   * @async
   * @description Sets up preference storage, starts listening for storage updates,
   * and begins listening for postMessage events from allowed origins.
   */
  async init() {
    this.log('Initializing BibConsentServer...')
    this.#storage = await getPreferenceStorage()
    this.log('Connected to storage.')

    this.#storage.listen(event => {
      this.log('Storage updated with data', event.detail)
    })

    this.log('Start listening for storage updates...')
    this.startListening()
  }

  /**
   * Logs messages when in debug mode.
   * @description If debug attribute is set, logs messages to the console and updates the UI logger.
   * @param {...any} args - The messages or data to log.
   */
  log(...args) {
    if (this.hasAttribute('debug')) {
      this.#logger(...args)

      const msg = args.map(part => typeof part === 'string' ? part : JSON.stringify(part)).join(' ')
      if (this.loggerRef.value) {
        this.loggerRef.value.value += `${this.loggerRef.value.value === '' ? '' : '\r'}${msg}`
      }
    }
  }

  /**
   * Starts listening for postMessage events and handles consent-related requests.
   * @async
   * @description Sets up a message listener for allowed origins and handles the following methods:
   * - setPreferences: Sets the user's consent preferences in the storage.
   * - getPreferences: Retrieves the user's current consent preferences from storage.
   * - resetPreferences: Resets the user's consent preferences to default values.
   * - ping: Responds with "pong" to check if the server is responsive.
   * The method also logs all incoming requests and their responses when in debug mode.
   */
  async startListening() {
    this.log('startListening()')

    const { listenMessage } = await startListening({
      eventFilter: event => {
        const { origin } = event
        return this.allowedOrigins.length > 0 && this.allowedOrigins.some(originPattern => patternMatchesOrigin(originPattern, origin))
      }
    })

    this.log('Listening for postMessage events...')

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

  /**
   * Renders the BibConsentServer element.
   * @returns {TemplateResult} The HTML template for the BibConsentServer.
   * @description Renders a title and a textarea for logging when in debug mode.
   */
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
