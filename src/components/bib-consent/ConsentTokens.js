import { isBoolean, isObject } from 'lodash-es'
import { DEFAULT_PREFERENCES, STATES } from './constants.js'

const keys = Object.keys(DEFAULT_PREFERENCES)

function throwOnInvalidValue(value, { key, acceptNull = false } = {}) {

  if (
    !isBoolean(value)
    && !['granted', 'denied'].includes(value)
    &&
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
    const consentTokens = new ConsentTokens()

    if (tokens) {
      if (isObject(tokens)) {
        Object.keys(tokens).forEach(key => {
          consentTokens.#setToken(key, tokens[key], true)
        })
      } else {
        consentTokens.#setAll(tokens, true)
      }
    }

    return consentTokens
  }

  #tokens = {
    ...DEFAULT_PREFERENCES
  }

  #setToken(key, value, acceptNull = false) {
    throwOnInvalidKey(key)
    throwOnInvalidValue(value, { key, acceptNull })

    this.#tokens[key] = isBoolean(value) ? value ? 'granted' : 'denied' : value
  }

  #setAll(value, acceptNull = false) {

    throwOnInvalidValue(value, { acceptNull })

    Object.keys(this.#tokens).forEach(key => this.#tokens[key] = value)
  }

  constructor(tokens) {

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

    if (tokens) {
      if (isObject(tokens)) {
        Object.keys(DEFAULT_PREFERENCES).forEach(key => {
          if (Reflect.has(tokens, key)) {
            this.#setToken(key, tokens[key])
          }
        })

      } else {

        this.#setAll(tokens)
      }
    }
  }

  state() {
    return Object.values(this.#tokens).every(value => value !== null) ? STATES.DETERMINATE : STATES.INDETERMINATE
  }

  setAll(data) {
    if (isObject(data)) {
      Object.entries(data).forEach(([key, value]) => this.#setToken(key, value))
      return
    }

    this.#setAll(data)
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