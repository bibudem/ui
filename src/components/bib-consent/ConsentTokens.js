import { isBoolean, isObject } from 'lodash-es'
import { DEFAULT_PREFERENCES, STATES } from './constants.js'

const keys = Object.keys(DEFAULT_PREFERENCES)

function throwOnInvalidValue(value, { key, acceptNull = false } = {}) {

  if (
    (!isBoolean(value) && !['granted', 'denied'].includes(value))
    ||
    (!acceptNull && value === null)
  ) {
    const message = `Invalid value${key ? ` for field \`${key}\`` : ''}: ${value}. Must be either boolean or one of 'granted' or 'denied'.`
    throw new TypeError(message)
  }
}

function throwOnInvalidKey(key) {


  if (!keys.includes(key)) {
    const message = `Invalid key: ${key}. Must be one of ${keys.reduce((str, key, i) => i === keys.length ? `${str} or ${key}` : `${str}, ${key}`)}.`
    throw new TypeError(message)
  }
}

export class ConsentTokens {

  static from(tokens) {
    return new ConsentTokens(tokens)
  }

  #tokens = {
    ...DEFAULT_PREFERENCES
  }

  #setToken(key, value, acceptNull = false) {
    console.log('[#setToken]', key, value)
    throwOnInvalidKey(key)
    throwOnInvalidValue(value, { key, acceptNull })

    this.#tokens[key] = isBoolean(value) ? value ? 'granted' : 'denied' : value
    console.log(`this.#tokens.${key}:`, this.#tokens[key])
  }

  constructor(tokens) {
    console.log('[#constructor]', tokens)
    if (isObject(tokens)) {
      Object.keys(DEFAULT_PREFERENCES).forEach(key => {
        if (Reflect.has(tokens, key)) {
          this.#setToken(key, tokens[key], true)
        }
      })
    } else if (typeof tokens !== 'undefined' && tokens !== null) {
      this.setAll(tokens)
    }

    // Defining getters and setters on the constructor function
    // so they are enumerables

    Object.defineProperties(this, {
      analytics_consent: {
        enumerable: true,
        get: () => this.#tokens.analytics_consent,
        set: value => this.#setToken('analytics_consent', value)
      },
      functionality_consent: {
        enumerable: true,
        get: () => this.#tokens.functionality_consent,
        set: value => this.#setToken('functionality_consent', value)
      },
      ad_consent: {
        enumerable: true,
        get: () => this.#tokens.ad_consent,
        set: value => this.#setToken('ad_consent', value)
      }
    })
  }

  state() {
    return Object.values(this.#tokens).every(value => value !== null) ? STATES.DETERMINATE : STATES.INDETERMINATE
  }

  setAll(data) {
    if (isObject(data)) {
      Object.entries(data).forEach(([key, value]) => this.#setToken(key, value))
      return
    }

    throwOnInvalidValue(data)

    Object.keys(this.#tokens).forEach(key => this.#tokens[key] = data)
  }

  resetConsent() {
    Object.keys(this.#tokens).forEach(key => this.#tokens[key] = null)
  }

  toGTM(wait_for_update = 500) {
    if (this.state() === STATES.INDETERMINATE) {
      const nullEntries = Object.entries(this.#tokens).filter(token => token[1] === null)
      throw new Error(`All tokens must have an explicit value. Undefined token${nullEntries.length > 1 ? 's' : ''}: ${nullEntries.map(token => token[0]).join(', ')}`)
    }

    const { analytics_consent, ad_consent } = this.#tokens

    return {
      ad_user_data: ad_consent,
      ad_personalization: ad_consent,
      ad_consent: ad_consent,
      analytics_consent: analytics_consent,
      wait_for_update
    }

  }
}