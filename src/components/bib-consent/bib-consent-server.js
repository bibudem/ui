import { css, html, LitElement, unsafeCSS } from 'lit'
import { startListening } from 'postmessage-promise'
import { createRef, ref } from 'lit/directives/ref.js'
import PreferencesStorage from './preferencesStorage.js'
import styles from './bib-consent-server.scss?inline'

export class BibConsentServer extends LitElement {
  #storage = new PreferencesStorage()

  static properties = {
    connected: {
      type: Boolean,
    },
    debug: {
      type: Boolean,
      reflect: true
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
    this.init()
  }

  async init() {
    console.log('[this.#storage.init()] start')
    await this.#storage.init()
    console.log('[this.#storage.init()] end')
    this.startListening()
  }

  log() {
    const msg = [...arguments].map(part => typeof part === 'string' ? part : JSON.stringify(part)).join(' ')
    console.log.apply(console, ['%c[bib-consent-server]', 'color: green; font-weight: bold;', ...arguments])
    this.loggerRef.value.value += `${this.loggerRef.value.value === '' ? '' : '\r'}${msg}`
  }

  async startListening() {
    const { postMessage, listenMessage } = await startListening()
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