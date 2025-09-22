import { openDB } from 'idb'
import { EVENT_NAMES, DB_NAME, DB_VERSION, DB_STORE_NAME } from './constants.js'
import { isEqual } from 'lodash-es'
import { ConsentTokens } from './ConsentTokens.js'


/**
 * Manages the storage and retrieval of user consent tokens in an IndexedDB database.
 *
 * This class extends the `EventTarget` class and provides methods to add event listeners,
 * dispatch events, initialize the IndexedDB database, retrieve stored consent tokens,
 * and set new consent tokens. It also includes data validation to ensure the consent tokens
 * object has the expected structure and values.
 *
 * The class uses the `idb` library to interact with IndexedDB, and the `lodash-es`
 * library for utility functions.
 */
class ConsentStorage extends EventTarget {

  constructor() {
    super()
    this.db = null
  }

  /*
   * @param {string} type
   * @param {function} listener
   * @return void
   */
  listen(listener) {
    super.addEventListener(EVENT_NAMES.CHANGE, listener)
  }

  /*
   * @param {object} dispatchData
   * @return void
   */
  dispatchEvent({ detail }) {
    super.dispatchEvent(
      new CustomEvent(
        EVENT_NAMES.CHANGE,
        { detail }
      )
    )
  }

  /**
   * Initializes the IndexedDB database for storing user consent tokens.
   *
   * This method is responsible for creating the IndexedDB database and the object store
   * if it doesn't already exist. It uses the `openDB` function from the `idb` library
   * to interact with IndexedDB.
   *
   * If there is an error while initializing the database, it throws an error with the
   * message "Something went wrong with indexedDB:".
   */
  async init() {
    try {
      this.db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          // Checks if the object store exists:
          if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
            db.createObjectStore(DB_STORE_NAME)
          }
        }
      })

    } catch (error) {
      throw new Error('Something went wrong with indexedDB:', error)
    }
  }

  /**
   * Retrieves the user consent tokens from the IndexedDB database.
   *
   * This method checks if the consent tokens are stored in the database, and if so, returns them.
   * If the consent tokens are not found in the database, it returns `null`.
   *
   * @returns {object|null} The user consent tokens, or `null` if not found.
   */
  async getConsentTokens() {

    const tokens = await this.db.get(DB_STORE_NAME, 'tokens')

    // Rehydrate the consentTokens object
    return ConsentTokens.from(tokens)
  }

  async #doSetConsentTokens(tokens) {

    try {
      // Check if there is a change is tokens.
      // If so, save it and dispatch an event
      const oldConsentTokens = await this.getConsentTokens()
      const newConsentTokens = new ConsentTokens(tokens)
      if (!isEqual(oldConsentTokens, newConsentTokens)) {
        await this.db.put(DB_STORE_NAME, newConsentTokens, 'tokens')
        return newConsentTokens
      } else {
        console.log('[setConsentTokens] No change in tokens. oldConsentTokens: ', oldConsentTokens, 'newConsentTokens: ', newConsentTokens)
      }

      // No change in tokens, return false
      return false
    } catch (error) {
      throw new Error('Something went wrong with indexedDB:', error)
    }
  }

  /*
   * @param {object} tokens
   * @return void
   */
  async setConsentTokens(tokens) {

    //
    // Data validation
    const consentTokens = ConsentTokens.from(tokens)
    return await this.#doSetConsentTokens(consentTokens)

  }

  /**
   * Resets the user's consent tokens to their default values.
   * @returns {Promise<void>} A promise that resolves when the consent tokens have been reset.
   */
  async resetTokens() {
    return await this.#doSetConsentTokens()
  }
}

let consentStorage

/**
 * Gets the singleton instance of the ConsentStorage class, initializing it if necessary.
 * @returns {Promise<ConsentStorage>} The singleton instance of ConsentStorage.
 */
export default async function getConsentStorage() {
  if (!consentStorage) {
    consentStorage = new ConsentStorage()
    await consentStorage.init()
  }
  return consentStorage
}