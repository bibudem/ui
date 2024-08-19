import { name } from '../../../package.json'
import { createPrefixedEventName } from './utils.js'

const eventName = createPrefixedEventName('consent')

export const DB_NAME = `${name}/consent`
export const DB_VERSION = 1
export const DB_STORE_NAME = 'consent'

export const EVENT_NAMES = {
  READY: eventName('ready'),
  UPDATE: eventName('update'),
}
export const PREFIX = 'bib-consent'

export const SERVER_MODE = {
  LOCAL: 'local',
  REMOTE: 'remote'
}
export const SERVER_REQUEST_DEFAULT_TIMEOUT = 500

/**
 * @typedef {('analytics_consent'|'functionality_consent'|'ad_consent')} consentTypes
 */

/**
 * @typedef {('granted' | 'denied')} ConsentValues
 */

/**
 * @type {object} Tokens
 * @property {string} analytics_consent
 * @property {string} functionality_consent
 * @property {string} ad_consent
 */
export const DEFAULT_PREFERENCES = {
  analytics_consent: null,
  functionality_consent: null,
  ad_consent: null
}

/**
 * @typedef {('determinate'|'indeterminate')} consentStateTypes
 */

export const CONSENT_STATES = {
  INDETERMINATE: 'indeterminate',
  DETERMINATE: 'determinate'
}