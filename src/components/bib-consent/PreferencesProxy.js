import { callServer } from 'postmessage-promise'
import PreferencesStorage from './preferencesStorage.js'
import { getIframeServer, getServerMode } from './utils.js'
import { SERVER_MODE } from './constants.js'
import { stringIsUrl } from '@/utils/url.js'

export default class PreferencesProxy extends EventTarget {
  _server
  _storage
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

    this.debug('init', `server mode: ${this.serverMode}`)

    let preferences

    if (this.serverMode === SERVER_MODE.REMOTE) {
      const serverObject = getIframeServer(document.body, this.serverUrl.href)
      // { postMessage, listenMessage, destroy }

      console.log('[callServer] serverObject: ', serverObject)

      this._server = await callServer(serverObject)
        .then(serverObject => {
          console.log('[callServer] !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! serverObject: ', serverObject)
          return serverObject
        })
        .catch(error => {
          console.error('[callServer] error: ', error)
          throw error
        })

      this._server.listenMessage((method, detail) => {
        console.log('[server.listenMessage] method: ', method, 'detail: ', detail)
        const event = new CustomEvent(`update`, { detail })
        this.dispatchEvent(event)
      })

      console.log('[ici] this._server: ', this._server)
      preferences = await this._server.postMessage('getPreferences')
      console.log('[remote] Got response from server: ', preferences)

    } else {
      this._storage = new PreferencesStorage()

      await this._storage.init()

      this._storage.addEventListener(({ detail }) => {
        const event = new CustomEvent(`update`, { detail })
        this.dispatchEvent(event)
      })

      preferences = await this._storage.getPreferences()
      console.log('[local] Got response from storage: ', preferences)
    }

    if (preferences !== undefined) {

      const proxyReadyEvent = new CustomEvent('ready', { detail: preferences })

      // Dispatch inital data
      this.dispatchEvent(proxyReadyEvent)
    }
  }

  async setPreferences(preferences) {
    if (this.serverMode === SERVER_MODE.LOCAL) {
      await this._storage.setPreferences(preferences)
    } else {
      console.log('[#setPreferences] this._server:', this.server)
      await this._server.postMessage('setPreferences', preferences)
    }
  }

  async getPreferences() {
    if (this.serverMode === SERVER_MODE.LOCAL) {
      await this._storage.getPreferences()
    } else {
      await this._server.postMessage('getPreferences')
    }
  }

  async resetPreferences() {
    if (this.serverMode === SERVER_MODE.LOCAL) {
      await this._storage.resetPreferences()
    } else {
      await this._server.postMessage('resetPreferences')
    }
  }
}