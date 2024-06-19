import { callServer } from 'postmessage-promise'
import PreferencesStorage from './preferencesStorage.js'
import { getIframeServer, getServerMode } from './utils.js'
import { SERVER_MODE } from './constants.js'
import { stringIsUrl } from '@/utils/url.js'

export default class PreferencesProxy extends EventTarget {
  #remoteServer
  #localServer
  #debugIsOn = false

  constructor(client, { reflectEvents = true } = {}) {
    super()

    this.client = client
    this.reflectEvents = reflectEvents
    this.init()
  }

  debug(src = 'PreferencesProxy', msg = '') {
    if (this.#debugIsOn) {
      console.log(`[${src}] ${msg}`)
    }
  }

  dispatchEvent(event) {
    super.dispatchEvent(event)
    if (this.reflectEvents) {
      this.client.dispatchEvent(event)
    }
  }

  async init() {

    if (
      (
        Reflect.has(this.client, SERVER_MODE.LOCAL)
        &&
        this.client[SERVER_MODE.LOCAL] === true
      )
      ||
      !Reflect.has(this.client, 'serverUrl')
      ||
      !stringIsUrl(this.client.serverUrl)
    ) {
      this.serverMode = SERVER_MODE.LOCAL
    } else {

      this.serverUrl = new URL(this.client.serverUrl, location)

      if (this.client.debug) {
        this.serverUrl.searchParams.set('debug', '')
      }

      this.serverMode = await getServerMode(this)

    }
    this.#debugIsOn = Reflect.has(this.client, 'debug')

    this.debug('init')
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

      const proxyReadyEvent = new CustomEvent('ready', { detail: preferences })
      this.dispatchEvent(proxyReadyEvent)

    } else {
      this.#localServer = new PreferencesStorage()
      this.#localServer.addEventListener(({ detail }) => {
        const event = new CustomEvent(`update`, { detail })
        this.dispatchEvent(event)
      })

      const preferences = await this.#localServer.getPreferences()
      const proxyReadyEvent = new CustomEvent('ready', { detail: preferences })
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