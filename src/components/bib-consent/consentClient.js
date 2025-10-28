import { callServer } from 'postmessage-promise'
import { stringIsUrl } from '@/utils/url.js'
import { loggerFactory } from '@/utils/logger.js'
import getConsentStorage from './ConsentStorage.js'
import { ConsentTokens } from './ConsentTokens.js'
import { getIframeServer, getServerMode } from './utils.js'
import { EVENT_NAMES, SERVER_MODE, SERVER_REQUEST_DEFAULT_TIMEOUT } from './constants.js'

/**
 * Represents a client for managing user consent tokens, with the ability to interact with a remote server or local storage.
 *
 * The `ConsentClient` class extends the `EventTarget` class, allowing it to dispatch events related to preference updates.
 *
 * Key features:
 * - Initialization with options for server mode (local or remote), server URL, and event reflection.
 * - Ability to add hosts that will receive preference update events.
 * - Debugging functionality with configurable debug mode.
 * - Methods to set, get, and reset user tokens, with different behavior based on server mode.
 *
 * @property {string} readyState - The current state of the ConsentClient instance. Can be 'initial', 'connecting' or 'ready'.
 */
class ConsentClient extends EventTarget {
  _server
  _storage
  #debugIsOn = false
  #debug

  constructor() {
    super()
    this.readyState = 'initial'
    this.hosts = []
  }

  addHost({ host, reflectEvents }) {
    this.hosts.push({ host, reflectEvents })
  }

  debug() {
    if (this.#debugIsOn) {
      this.#debug(...arguments)
    }
  }

  dispatchEvent(event) {
    super.dispatchEvent(event)
    // this.hosts.forEach(({ host, reflectEvents }) => reflectEvents && host.dispatchEvent?.(event))
  }

  /**
   * Adds an event listener to the ConsentClient instance.
   *
   * If the event type is `EVENT_NAMES.READY` and the `readyState` is already `'ready'`, the listener function is called immediately with the current preferences object as the event detail.
   *
   * Otherwise, the event listener is added using the standard `addEventListener` method.
   *
   * @param {string} type - The type of event to listen for.
   * @param {EventListener} listener - The function to call when the event is dispatched.
   * @param {EventListenerOptions} [options] - Options for the event listener.
   */
  addEventListener(type, listener, options) {
    if (type === EVENT_NAMES.READY && this.readyState === 'ready') {
      this.debug('Firing ready event immediately since readyState is already ready')
      this.#fireReadyListener(listener)
      return
    }

    super.addEventListener(type, listener, options)
  }

  async #fireReadyListener(listener) {
    const consentTokens = await this.getConsentTokens()
    const readyEvent = new CustomEvent(EVENT_NAMES.READY, { detail: consentTokens, bubbles: true, composed: true })
    this.debug('Firing ready event with preferences: ', consentTokens)
    listener(readyEvent)
  }

  /**
   * Initializes the ConsentClient instance with the provided options.
   *
   * @param {Object} options - The initialization options.
   * @param {Object} [options.host] - The host object that will receive preference update events.
   * @param {string} [options.serverMode] - The server mode, either 'LOCAL' or 'REMOTE'.
   * @param {string} [options.serverUrl] - The URL of the remote server.
   * @param {number} [options.serverRequestTimeout=SERVER_REQUEST_DEFAULT_TIMEOUT] - The timeout for server requests in milliseconds.
   * @param {boolean} [options.reflectEvents=true] - Whether to reflect preference update events to the host.
   * @returns {Promise<void>} - A promise that resolves when initialization is complete.
   *
   * @event EVENT_NAMES.READY - Dispatched when the initial preferences data is available. The event detail contains the preferences object.
   * @event EVENT_NAMES.CHANGE - Dispatched when the preferences are updated. The event detail contains the updated preferences object.
   */

  async init({ host, serverMode, serverUrl, serverRequestTimeout = SERVER_REQUEST_DEFAULT_TIMEOUT, reflectEvents = true }) {
    this.serverRequestTimeout = serverRequestTimeout

    if (host) {
      this.addHost({ host, reflectEvents })
    }

    this.readyState = 'connecting'

    if (
      (
        serverMode && serverMode === SERVER_MODE.LOCAL
      )
      ||
      typeof serverUrl === 'undefined'
      ||
      !stringIsUrl(serverUrl)
    ) {
      this.serverMode = SERVER_MODE.LOCAL
    } else {
      this.serverUrl = new URL(serverUrl, location)

      if (host.debug) {
        this.serverUrl.searchParams.set('debug', '')
      }

      this.serverMode = await getServerMode(this)

    }

    this.#debugIsOn = !!host.debug

    if (this.#debugIsOn) {
      this.#debug = loggerFactory('consentClient', 'purple')
    }

    this.debug('init', `server mode: ${this.serverMode}`)

    let consentTokens

    if (this.serverMode === SERVER_MODE.REMOTE) {
      const serverObject = getIframeServer(document.body, this.serverUrl.href)

      try {
        this._server = await callServer(serverObject)

        this._server.listenMessage((method, data) => {
          const consentTokens = ConsentTokens.from(data)
          const event = new CustomEvent(EVENT_NAMES.CHANGE, { detail: consentTokens, bubbles: true, composed: true })
          this.dispatchEvent(event)
        })
      } catch (error) {
        console.error('[callServer] error: ', error)
        throw error
      }

      console.log('[consentClient] Server mode: %s', this.serverMode)
      console.log('[consentClient] Remote consent server URL: %s', this.serverUrl.href)
      console.log('[consentClient] this._server:', this._server)

      consentTokens = ConsentTokens.from(await this._server.postMessage('getConsentTokens'))
      this.debug('[remote] Got response from server: ', consentTokens)

    } else {
      this._storage = await getConsentStorage()

      consentTokens = await this._storage.getConsentTokens()
      this.debug('[local] Got response from storage: ', consentTokens)
    }

    this.debug('[local] consentTokens: ', consentTokens)

    if (consentTokens !== undefined) {

      // Dispatch initial data with the ready state.
      this.readyState = 'ready'

      this.dispatchEvent(new CustomEvent(EVENT_NAMES.READY, { detail: consentTokens, bubbles: true, composed: true }))
    }
  }

  /**
   * Gets the user's preferences from either the local storage or the remote server, depending on the configured server mode.
   *
   * @returns {Promise<Object>} - A promise that resolves with the user's preferences, or rejects with an error if the operation fails.
   */
  async getConsentTokens() {
    try {
      if (this.serverMode === SERVER_MODE.LOCAL) {
        return await this._storage.getConsentTokens()
      } else {
        return ConsentTokens.from(await this._server.postMessage('getConsentTokens'))
      }
    } catch (error) {
      console.error('[#getConsentTokens]', error)
      throw error
    }
  }

  /**
  * Sets the user's tokens in either the local storage or the remote server, depending on the configured server mode.
  *
  * @param {Object} tokens - The tokens object to be set.
  * @returns {Promise} - A promise that resolves when the preferences have been set or reset, or rejects with an error if the operation fails.
  */
  async setConsentTokens(tokens) {
    try {
      let response

      const consentTokens = ConsentTokens.from(tokens)

      if (this.serverMode === SERVER_MODE.LOCAL) {
        response = await this._storage.setConsentTokens(consentTokens)
      } else {
        response = await this._server.postMessage('setConsentTokens', consentTokens)
      }

      if (response) {
        this.dispatchEvent(new CustomEvent(EVENT_NAMES.CHANGE, { detail: response, bubbles: true, composed: true }))
        return response
      }
    } catch (error) {
      console.error('[#setConsentTokens]', error)
      throw error
    }
  }

  /**
   * Resets the user's preferences by clearing the stored preferences data, either in the local storage or on the remote server, depending on the configured server mode.
   *
   * @returns {Promise} - A promise that resolves when the preferences have been reset, or rejects with an error if the reset operation fails.
   */
  async resetTokens() {
    try {
      if (this.serverMode === SERVER_MODE.LOCAL) {
        return await this._storage.resetTokens()
      } else {
        await this._server.postMessage('resetTokens')
      }
    } catch (error) {
      console.error('[#resetTokens]', error)
      throw error
    }
  }
}

let consentClient

/**
 * Creates a new ConsentClient instance and initializes it with the provided options.
 *
 * If a ConsentClient instance already exists, it will add the provided host to the existing instance and return it.
 *
 * @param {Object} options - The options to initialize the ConsentClient with.
 * @returns {Promise<ConsentClient>} - A Promise that resolves to the ConsentClient instance.
 */
export default async function createConsentClient(options) {
  if (consentClient) {
    consentClient.addHost(options)

    return consentClient
  }

  consentClient = new ConsentClient()
  await consentClient.init(options)

  return consentClient
}