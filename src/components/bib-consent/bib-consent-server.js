import { css, html, LitElement, unsafeCSS } from 'lit'
import { startListening } from 'postmessage-promise'
import { createRef, ref } from 'lit/directives/ref.js'
import { escapeStringRegexp } from '@/utils/url.js'
import { loggerFactory } from '@/utils/logger.js'
import PreferenceStorage from './PreferenceStorage.js'
import styles from './bib-consent-server.scss?inline'
import { EVENT_NAMES } from './constants.js'
import getPreferenceStorage from './PreferenceStorage.js'

export class BibConsentServer extends LitElement {
  #storage
  #logger = loggerFactory('consent-server')
  #preferences

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

  constructor() {
    super()
    this.connected = false
    this.debug = this.debug || false
    this.loggerRef = createRef()
    this.allowedOrigins = this.allowedOrigins || [] // Default: none
    this.init()
  }

  async init() {
    this.#storage = await getPreferenceStorage()
    this.#storage.listen(event => {
      this.log('Storage updated with data', event.detail)
      this.#preferences = event.detail
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

customElements.define('bib-consent-server', BibConsentServer)