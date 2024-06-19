import { EVENT_TYPES, DEFAULT_PREFERENCES } from './constants.js'
import { getKeyName } from './utils.js'

// Wraps a localstorage for now, but it may evolve...
// Async methods, which make it easier to adapt to other storages
export default class PreferenceStorage extends EventTarget {

  constructor() {
    super()
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

  async getPreferences() {
    await Promise.resolve()

    const preferences = Object.assign({}, DEFAULT_PREFERENCES)

    for (const key of Object.keys(preferences)) {
      // Si une clé n'est pas définie, on retourne null pour "Tout doit être redemandé"
      if (localStorage.getItem(getKeyName(key)) === null) {
        return null
      } else {
        preferences[key] = localStorage.getItem(getKeyName(key)) === 'true'
      }
    }

    return preferences
  }

  /*
   * @param {object} preferences
   * @return void
   */
  async setPreferences(preferences) {
    await Promise.resolve()

    const oldValue = await this.getPreferences()
    let update = false

    for (const [key, value] of Object.entries(preferences)) {
      if (typeof value === 'undefined') {
        console.log('WARNING setPreferences() was called with an undefined value!')
        return
      }

      if ((oldValue !== null && value !== oldValue[key]) || oldValue === null) {
        //localStorage always stores strings, be to be clear, let's write explicit 'true' / 'false'
        localStorage.setItem(getKeyName(key), value ? 'true' : 'false')

        update = true
        preferences[key] = value
      }
    }

    // Dispatches { update: Boolean, ...preferences }
    preferences.update = update

    this.dispatchEvent(preferences)
  }
}
