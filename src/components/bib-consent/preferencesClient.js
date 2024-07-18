import { callServer } from 'postmessage-promise'
import { stringIsUrl } from '@/utils/url.js'
import { loggerFactory } from '@/utils/logger.js'
import PreferenceStorage from './PreferenceStorage.js'
import { getIframeServer, getServerMode } from './utils.js'
import { EVENT_NAMES, SERVER_MODE, SERVER_REQUEST_DEFAULT_TIMEOUT } from './constants.js'

/**
 * Represents a client for managing user preferences, with the ability to interact with a remote server or local storage.
 *
 * The `PreferencesClient` class extends the `EventTarget` class, allowing it to dispatch events related to preference updates.
 *
 * Key features:
 * - Initialization with options for server mode (local or remote), server URL, and event reflection.
 * - Ability to add hosts that will receive preference update events.
 * - Debugging functionality with configurable debug mode.
 * - Methods to set, get, and reset user preferences, with different behavior based on server mode.
 *
 * @property {string} readyState - The current state of the PreferencesClient instance. Can be 'initial', 'connecting' or 'ready'.
 */
class PreferencesClient extends EventTarget {
  _server
  _storage
  #preferences
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
    this.hosts.forEach(({ host, reflectEvents }) => reflectEvents && host.dispatchEvent?.(event))
  }

  /**
   * Adds an event listener to the PreferencesClient instance.
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
      this.#debug('Firing ready event immediately since readyState is already ready')
      this.#fireReadyListener(listener)
      return
    }

    super.addEventListener(type, listener, options)
  }

  async #fireReadyListener(listener) {
    const preferences = await this.getPreferences()
    const readyEvent = new CustomEvent(EVENT_NAMES.READY, { detail: preferences })
    this.#debug('Firing ready event with preferences: ', preferences)
    listener(readyEvent)
  }

  /**
   * Initializes the PreferencesClient instance with the provided options.
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
   * @event EVENT_NAMES.UPDATE - Dispatched when the preferences are updated. The event detail contains the updated preferences object.
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

    this.#debugIsOn = Reflect.has(host, 'debug')

    if (this.#debugIsOn) {
      this.#debug = loggerFactory('preferencesClient', 'purple')
    }

    this.debug('init', `server mode: ${this.serverMode}`)

    let preferences

    if (this.serverMode === SERVER_MODE.REMOTE) {
      const serverObject = getIframeServer(document.body, this.serverUrl.href)

      this.#debug('[remote] callServer serverObject: ', serverObject)

      this._server = await callServer(serverObject)
        .catch(error => {
          console.error('[callServer] error: ', error)
          throw error
        })

      this._server.listenMessage((method, detail) => {
        this.#debug('[remote] server.listenMessage method: ', method, 'detail: ', detail)
        const event = new CustomEvent(EVENT_NAMES.UPDATE, { detail })
        this.dispatchEvent(event)
      })

      preferences = await this._server.postMessage('getPreferences')
      this.#debug('[remote] Got response from server: ', preferences)

    } else {
      this._storage = new PreferenceStorage()

      await this._storage.init()

      preferences = await this._storage.getPreferences()
      this.#debug('[local] Got response from storage: ', preferences)
    }

    this.#debug('[local] preferences: ', preferences)

    if (preferences !== undefined) {

      // Dispatch initial data with the ready state.
      this.readyState = 'ready'
      this.#preferences = preferences

      this.#debug('dispatchEvent', EVENT_NAMES.READY, preferences)
      this.dispatchEvent(new CustomEvent(EVENT_NAMES.READY, { detail: preferences }))
    }
  }

  /**
   * Gets the user's preferences from either the local storage or the remote server, depending on the configured server mode.
   *
   * @returns {Promise<Object>} - A promise that resolves with the user's preferences, or rejects with an error if the operation fails.
   */
  async getPreferences() {
    try {
      if (this.serverMode === SERVER_MODE.LOCAL) {
        return await this._storage.getPreferences()
      } else {
        return await this._server.postMessage('getPreferences')
      }
    } catch (error) {
      console.error('[#getPreferences]', error)
      throw error
    }
  }

  /**
  * Sets the user's preferences in either the local storage or the remote server, depending on the configured server mode.
  *
  * @param {Object|null} preferences - The preferences object to be set. If null, it will reset the user's preferences.
  * @returns {Promise} - A promise that resolves when the preferences have been set or reset, or rejects with an error if the operation fails.
  */
  async setPreferences(preferences) {
    try {
      let response

      // When there is no preferences object, this is a reset of the user's preferences, so set it to null.
      if (typeof preferences === 'undefined') {
        preferences = null
      }

      if (this.serverMode === SERVER_MODE.LOCAL) {
        response = await this._storage.setPreferences(preferences)
      } else {
        response = await this._server.postMessage('setPreferences', preferences)
      }

      if (response) {
        this.dispatchEvent(new CustomEvent(EVENT_NAMES.UPDATE, { detail: response }))
        return response
      }
    } catch (error) {
      console.error('[#setPreferences]', error)
      throw error
    }
  }

  /**
   * Resets the user's preferences by clearing the stored preferences data, either in the local storage or on the remote server, depending on the configured server mode.
   *
   * @returns {Promise} - A promise that resolves when the preferences have been reset, or rejects with an error if the reset operation fails.
   */
  async resetPreferences() {
    try {
      if (this.serverMode === SERVER_MODE.LOCAL) {
        return await this._storage.resetPreferences()
      } else {
        await this._server.postMessage('resetPreferences')
      }
    } catch (error) {
      console.error('[#resetPreferences]', error)
      throw error
    }
  }
}

let preferencesClient

/**
 * Creates a new PreferencesClient instance and initializes it with the provided options.
 *
 * If a PreferencesClient instance already exists, it will add the provided host to the existing instance and return it.
 *
 * @param {Object} options - The options to initialize the PreferencesClient with.
 * @returns {Promise<PreferencesClient>} - A Promise that resolves to the PreferencesClient instance.
 */
export default async function createPreferencesClient(options) {
  if (preferencesClient) {
    preferencesClient.addHost(options)

    return preferencesClient
  }

  preferencesClient = new PreferencesClient()
  await preferencesClient.init(options)

  return preferencesClient
}