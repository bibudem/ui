import { html, LitElement } from 'lit'
import { startListening } from 'postmessage-promise'
import PreferencesStorage from './preferencesStorage.js'

export class BibGestionTemoinsServer extends LitElement {
  #storage = new PreferencesStorage()

  static properties = {
    connected: {
      type: Boolean,
    }
  }

  constructor() {
    super()
    this.connected = false
    this.startListening()
  }

  async startListening() {
    const { postMessage, listenMessage } = await startListening()
    this.connected = true

    this.#storage.addEventListener(preferences => {
      console.log('event preference: ', preferences)
    })

    listenMessage(async (method, payload, response) => {
      if (method === 'setPreferences') {
        await this.#storage.setPreferences(payload)
        return
      }
      if (method === 'getPreferences') {
        const preferences = await this.#storage.getPreferences()
        response(preferences)
      }

      if (method === 'ping') {
        setTimeout(() => {
          // response to server
          response({
            success: true,
            msg: "pong"
          })
        }, 200)
      }

    })
  }

  render() {
    return html`I am server<br  />connected: <var>${this.connected}</var>`
  }
}

customElements.define('bib-gestion-temoins-server', BibGestionTemoinsServer)