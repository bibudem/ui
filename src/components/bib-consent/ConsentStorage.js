import { openDB } from 'idb'
import { EVENT_NAMES, DEFAULT_PREFERENCES, DB_NAME, DB_VERSION, DB_STORE_NAME } from './constants.js'
import { isEqual, isObject } from 'lodash-es'
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
    super.addEventListener(EVENT_NAMES.UPDATE, listener)
  }

  /*
   * @param {object} dispatchData
   * @return void
   */
  dispatchEvent({ detail }) {
    super.dispatchEvent(
      new CustomEvent(
        EVENT_NAMES.UPDATE,
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

    console.log('tokens', tokens)

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
        console.log('[setConsentTokens] oldConsentTokens: ', oldConsentTokens, 'newConsentTokens: ', newConsentTokens)
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
    // We check if:
    // - argument is an object
    // - all props are present
    // - all props have boolean values

    if (!isObject(tokens)) {
      throw new TypeError('ConsentTokens must be an object.')
    }

    const requiredProps = Object.keys(DEFAULT_PREFERENCES)
    const sameProps = arraysHaveSameItems(requiredProps, Object.keys(tokens))

    if (!sameProps) {
      throw new TypeError(`ConsentTokens requires all those fields: ${requiredProps.join(', ')}.`)
    }

    const containsOnlyBooleanValues = Object.values(tokens).every(value => typeof value === 'boolean')

    if (!containsOnlyBooleanValues) {
      throw new TypeError(`ConsentTokens values must be a boolean.`)
    }

    return await this.#doSetConsentTokens(tokens)

  }

  /**
   * Resets the user's consent tokens to their default values.
   * @returns {Promise<void>} A promise that resolves when the consent tokens have been reset.
   */
  async resetConsentTokens() {
    return await this.#doSetConsentTokens()
  }
}

/**
 * Checks if two arrays have the same items, regardless of order.
 * @param {Array} arr1 - The first array to compare.
 * @param {Array} arr2 - The second array to compare.
 * @returns {boolean} - True if the arrays have the same items, false otherwise.
 */
function arraysHaveSameItems(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false
  }

  const sortedArr1 = [...arr1].sort()
  const sortedArr2 = [...arr2].sort()
  return sortedArr1.every((item, index) => item === sortedArr2[index])
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