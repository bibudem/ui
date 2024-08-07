import { isBoolean, isObject } from 'lodash-es'
import { DEFAULT_PREFERENCES } from './constants.js'

const keys = Object.keys(DEFAULT_PREFERENCES)

function throwOnInvalidValue(value, message) {
  message = message || `Invalid value: ${value}. Must be either boolean or one of 'granted' or 'denied'.`

  if (!isBoolean(value) && !['granted', 'denied'].includes(value)) {
    throw new TypeError(message)
  }
}

function throwOnInvalidKey(key, message) {

  message = message || `Invalid key: ${key}. Must be one of ${keys.reduce((str, key, i) => i === keys.length ? `${str} or ${key}` : `${str}, ${key}`)}.`

  if (!keys.includes(key)) {
    throw new TypeError(message)
  }
}

export class ConsentTokens {
  #tokens = {
    ...DEFAULT_PREFERENCES
  }

  #setToken(key, value) {
    console.log('[#setToken]', key, value)
    throwOnInvalidKey(key)
    throwOnInvalidValue(value)

    this.#tokens[key] = isBoolean(value) ? value ? 'granted' : 'denied' : value
    console.log(`this.#tokens.${key}:`, this.#tokens[key])
  }

  constructor(tokens) {
    if (isObject(tokens)) {
      Object.keys(DEFAULT_PREFERENCES).forEach(key => {
        if (Reflect.has(tokens, key)) {
          this.#setToken(key, tokens[key])
        }
      })
    } else if (typeof tokens !== 'undefined') {
      this.setAll(tokens)
    }
  }

  get analytics_consent() {
    return this.#tokens.analytics_consent
  }

  set analytics_consent(value) {
    this.#setToken('analytics_consent', value)
  }

  get functionality_consent() {
    return this.#tokens.functionality_consent
  }

  set functionality_consent(value) {
    this.#setToken('functionality_consent', value)
  }

  get ad_consent() {
    return this.#tokens.ad_consent
  }

  set ad_consent(value) {
    this.#setToken('ad_consent', value)
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

  toGTM() {
    const entries = Object.entries(this.#tokens)
    const nullEntries = entries.filter(entry => entry[1] === null)
    if (nullEntries.length > 0) {
      throw new Error(`All tokens must have an explicit value. Undefined tokens: ${nullEntries.join(', ')}`)
    }

    const { analytics_consent, ad_consent } = this.#tokens

    return {
      ad_user_data: ad_consent,
      ad_personalization: ad_consent,
      ad_consent: ad_consent,
      analytics_consent: analytics_consent
    }

  }
}