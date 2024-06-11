import { SERVER_MODE } from './constants.js'
import PreferencesStorage from './preferencesStorage.js'
import { getIframeServer, getServerMode, hasDebugParam } from './utils.js'

export default class PreferencesProxy extends EventTarget {
  #remoteServer
  #localServer
  #debugIsOn = false

  constructor(serverUrl, options) {
    super()
    this.serverUrl = new URL(serverUrl, location)
    this.#debugIsOn = hasDebugParam(this.serverUrl)
    this.init()
  }

  debug(src = 'PreferencesProxy', msg = '') {
    if (this.#debugIsOn) {
      console.log(`[${src}] ${msg}`)
    }
  }

  async init() {

    this.debug('init')

    this.serverMode = await getServerMode(this)

    this.debug('init', `server mode: ${this.serverMode}`)

    if (this.serverMode === SERVER_MODE.REMOTE) {
      const serverObject = getIframeServer(document.body, this.serverUrl.href)
      // { postMessage, listenMessage, destroy }
      const server = this.#remoteServer = await callServer(serverObject)

      server.listenMessage((method, detail) => {
        const event = new CustomEvent(`update`, { detail })
        this.dispatchEvent(event)
      })

      const preferences = await server.postMessage('getPreferences')
      console.log('Got response from server: ', preferences)

      const proxyReadyEvent = new CustomEvent('proxy-ready', { detail: preferences })
      this.dispatchEvent(proxyReadyEvent)

    } else {
      this.#localServer = new PreferencesStorage()
      this.#localServer.addEventListener(({ detail }) => {
        const event = new CustomEvent(`update`, { detail })
        this.dispatchEvent(event)
      })

      const preferences = await this.#localServer.getPreferences()
      const proxyReadyEvent = new CustomEvent('proxy-ready', { detail: preferences })
      this.dispatchEvent(proxyReadyEvent)
    }
  }

  async setPreferences(preferences) {
    if (this.serverMode === SERVER_MODE.LOCAL) {
      await this.#localServer.setPreferences(preferences)
    } else {
      await this.#remoteServer.postMessage('setPreferences', preferences)
    }
  }

  async getPreferences() {
    if (this.serverMode === SERVER_MODE.LOCAL) {
      await this.#localServer.getPreferences()
    } else {
      await this.#remoteServer.postMessage('getPreferences')
    }
  }
}