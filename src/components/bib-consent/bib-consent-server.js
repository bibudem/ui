import { css, html, LitElement, unsafeCSS } from 'lit'
import { startListening } from 'postmessage-promise'
import { createRef, ref } from 'lit/directives/ref.js'
import PreferencesStorage from './preferencesStorage.js'
import { escapeStringRegexp } from '@/utils/url.js'
import styles from './bib-consent-server.scss?inline'
import logger from '@/utils/logger.js'

export class BibConsentServer extends LitElement {
  #storage = new PreferencesStorage()
  #logger = logger('bib-consent-server')

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
    this.debug = false
    this.loggerRef = createRef()
    this.allowedOrigins = this.allowedOrigins || [] // Default: none
    this.init()
  }

  async init() {
    await this.#storage.init()
    this.startListening()
  }

  log() {
    // console.log.apply(console, ['%c[bib-consent-server]', 'color: green; font-weight: bold;', ...arguments])
    this.#logger(arguments)
    const msg = [...arguments].map(part => typeof part === 'string' ? part : JSON.stringify(part)).join(' ')
    this.loggerRef.value.value += `${this.loggerRef.value.value === '' ? '' : '\r'}${msg}`
  }

  async startListening() {
    const { postMessage, listenMessage } = await startListening({
      eventFilter: event => {
        console.log('event:', event)
        console.log('this.allowedOrigins:', this.allowedOrigins)
        const originURL = new URL(event.origin)
        const originRegex = new RegExp(`${escapeStringRegexp(originURL.origin)}`)
        const originIsAllowed = this.allowedOrigins.length > 0 && this.allowedOrigins.every(origin => {
          return originRegex.test(origin)
        })
        console.log('originIsAllowed:', originIsAllowed)

        // return originIsAllowed
        return true
      }
    })
    this.connected = true

    this.log('connected: ', this.connected)

    listenMessage(async (method, payload, response) => {
      if (method === 'setPreferences') {
        this.log('#setPreferences:', payload)
        await this.#storage.setPreferences(payload)
        return
      }

      if (method === 'getPreferences') {
        const preferences = await this.#storage.getPreferences()
        this.log('#getPreferences:', preferences)
        response(preferences)
      }

      if (method === 'resetPreferences') {
        await this.#storage.resetPreferences()
        this.log('#resetPreferences')
        response(await this.#storage.getPreferences())
      }

      if (method === 'ping') {
        const responseData = {
          success: true,
          msg: "pong"
        }

        this.log('[ping]', responseData)

        response(responseData)
      }

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