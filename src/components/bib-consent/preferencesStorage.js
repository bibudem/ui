import { openDB } from 'idb'
import { EVENT_TYPES, DEFAULT_PREFERENCES, DB_NAME, DB_VERSION, DB_STORE_NAME } from './constants.js'
import { isEqual } from 'lodash-es'

// Wraps a localstorage for now, but it may evolve...
// Async methods, which make it easier to adapt to other storages
export default class PreferenceStorage extends EventTarget {

  constructor() {
    super()
    this.db = null
  }

  /*
   * @param {string} type
   * @param {function} listener
   * @return void
   */
  addEventListener(listener) {
    super.addEventListener(EVENT_TYPES.CONSENT, listener)
  }

  /*
   * @param {object} dispatchData
   * @return void
   */
  dispatchEvent(detail) {
    super.dispatchEvent(
      new CustomEvent(
        EVENT_TYPES.CONSENT,
        { detail }
      )
    )
  }

  async init() {
    try {
      console.log('init begins...')
      this.db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          console.log('db upgrade:', db)
          console.log('DB_STORE_NAME:', DB_STORE_NAME)
          console.log('db.objectStoreNames.contains(DB_STORE_NAME):', db.objectStoreNames.contains(DB_STORE_NAME))
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

  async getPreferences() {

    const preferences = await this.db.get(DB_STORE_NAME, 'preferences')


    // S'il n'y a pas de préférences dans la table, on retourne null pour "Tout doit être redemandé"
    if (preferences === undefined) {
      return null
    }

    return preferences
  }

  async #doSetPreferences(preferences) {

    // Check if there is a change is preferences.
    // If so, save it and dispatch an event
    const oldPreferences = await this.getPreferences()
    if (!isEqual(oldPreferences, preferences)) {
      await this.db.put(DB_STORE_NAME, preferences, 'preferences')
      this.dispatchEvent(preferences)
    }
  }

  /*
   * @param {object} preferences
   * @return void
   */
  async setPreferences(preferences) {

    // Data validation
    // We check if all props are present and have boolean values

    const requiredProps = Object.keys(DEFAULT_PREFERENCES)
    const sameProps = arraysHaveSameProps(requiredProps, Object.keys(preferences))

    if (!sameProps) {
      throw new TypeError(`Preferences requires all those fields: ${requiredProps, join(', ')}.`)
    }

    const containsOnlyBooleanValues = Object.values(preferences).every(value => typeof value === 'boolean')

    if (!containsOnlyBooleanValues) {
      throw new TypeError(`Preferences values must be a boolean.`)
    }

    await this.#doSetPreferences(preferences)

  }

  async resetPreferences() {
    await this.#doSetPreferences(null)
  }
}

function arraysHaveSameProps(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false
  }

  const sortedArr1 = [...arr1].sort()
  const sortedArr2 = [...arr2].sort()
  return sortedArr1.every((item, index) => item === sortedArr2[index])
}