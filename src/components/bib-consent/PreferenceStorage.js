import { openDB } from 'idb'
import { EVENT_NAMES, DEFAULT_PREFERENCES, DB_NAME, DB_VERSION, DB_STORE_NAME } from './constants.js'
import { isEqual, isObject } from 'lodash-es'


/**
 * Manages the storage and retrieval of user preferences in an IndexedDB database.
 *
 * This class extends the `EventTarget` class and provides methods to add event listeners,
 * dispatch events, initialize the IndexedDB database, retrieve stored preferences,
 * and set new preferences. It also includes data validation to ensure the preferences
 * object has the expected structure and values.
 *
 * The class uses the `idb` library to interact with IndexedDB, and the `lodash-es`
 * library for utility functions.
 */
class PreferenceStorage extends EventTarget {

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
    console.log(`Dispatching ${EVENT_NAMES.UPDATE} event with data:`, detail)
    super.dispatchEvent(
      new CustomEvent(
        EVENT_NAMES.UPDATE,
        { detail }
      )
    )
  }

  /**
   * Initializes the IndexedDB database for storing user preferences.
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
   * Retrieves the user preferences from the IndexedDB database.
   *
   * This method checks if the preferences are stored in the database, and if so, returns them.
   * If the preferences are not found in the database, it returns `null`.
   *
   * @returns {object|null} The user preferences, or `null` if not found.
   */
  async getPreferences() {

    const preferences = await this.db.get(DB_STORE_NAME, 'preferences')

    // If preferences is undefined, return null
    if (preferences === undefined) {
      return null
    }

    return preferences
  }

  async #doSetPreferences(preferences) {

    try {
      // Check if there is a change is preferences.
      // If so, save it and dispatch an event
      const oldPreferences = await this.getPreferences()
      if (!isEqual(oldPreferences, preferences)) {
        await this.db.put(DB_STORE_NAME, preferences, 'preferences')
        // this.dispatchEvent(new CustomEvent(EVENT_NAMES.UPDATE, { detail: preferences }))
        console.log(`[setPreferences] preferences updated: `, preferences)
        // return
        return preferences
      }

      // No change in preferences, return false
      console.log(`[setPreferences] preferences not updated: `, preferences)
      return false
    } catch (error) {
      throw new Error('Something went wrong with indexedDB:', error)
    }
  }

  /*
   * @param {object} preferences
   * @return void
   */
  async setPreferences(preferences) {

    //
    // Data validation
    // We check if:
    // - argument is an object
    // - all props are present
    // - all props have boolean values

    if (!isObject(preferences)) {
      throw new TypeError('Preferences must be an object.')
    }

    const requiredProps = Object.keys(DEFAULT_PREFERENCES)
    const sameProps = arraysHaveSameItems(requiredProps, Object.keys(preferences))

    if (!sameProps) {
      throw new TypeError(`Preferences requires all those fields: ${requiredProps.join(', ')}.`)
    }

    const containsOnlyBooleanValues = Object.values(preferences).every(value => typeof value === 'boolean')

    if (!containsOnlyBooleanValues) {
      throw new TypeError(`Preferences values must be a boolean.`)
    }

    return await this.#doSetPreferences(preferences)

  }

  /**
   * Resets the user's preferences to their default values.
   * @returns {Promise<void>} A promise that resolves when the preferences have been reset.
   */
  async resetPreferences() {
    return await this.#doSetPreferences(null)
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

let preferenceStorage

export default async function getPreferenceStorage() {
  if (!preferenceStorage) {
    preferenceStorage = new PreferenceStorage()
    await preferenceStorage.init()
  }
  return preferenceStorage
}