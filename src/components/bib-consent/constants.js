import { name as PKG_NAME } from '../../../package.json'

/**
* Constants used by the BibConsent component.
*
* @module BibConsent/constants
*/

/**
 * The name of the database.
 *
 * @type {string}
 * @constant
 */
export const DB_NAME = `${PKG_NAME}/consent`

/**
 * The version of the database.
 *
 * @type {number}
 * @constant
 */
export const DB_VERSION = 1

/**
 * The name of the database store.
 *
 * @type {string}
 * @constant
 */
export const DB_STORE_NAME = 'consent'

/**
 * The names of events that can be dispatched by the BibConsent component.
 *
 * @type {Object.<string,string>}
 * @constant
 */
export const EVENT_NAMES = {
  READY: 'bib:ready',
  CHANGE: 'bib:change',
  CLOSE: 'bib:close',
}

export const PREFIX = 'bib-consent'

/**
 * The default URL for the server.
 *
 * @type {string}
 * @constant
 */
export const SERVER_DEFAULT_URL = 'https://bib.umontreal.ca/consent/server/'

/**
 * The modes for the server.
 *
 * @type {Object.<string,string>}
 * @constant
 */
export const SERVER_MODE = {
  LOCAL: 'local',
  REMOTE: 'remote'
}

/**
 * The default timeout for server requests.
 *
 * @type {number}
 * @constant
 */
export const SERVER_REQUEST_DEFAULT_TIMEOUT = 500

/**
 * The types of consent that can be granted or denied.
 * 
 * @typedef {('analytics_consent'|'functionality_consent'|'ad_consent')} consentTypes
 */

/**
 * The possible values for consent.
 *
 * @typedef {('granted' | 'denied')} ConsentValues
 */

/**
 * The default consent preferences.
 *
 * @type {Object.<consentTypes,ConsentValues>} Tokens
 * @constant
 */
export const DEFAULT_PREFERENCES = {
  analytics_consent: null,
  functionality_consent: null,
  ad_consent: null
}

/**
 * The possible states of consent.
 *
 * @typedef {('determinate'|'indeterminate')} ConsentStateTypes
 */

/**
 * The possible consent states.
 *
 * @type {Object.<ConsentStateTypes,string>}
 * @constant
 */
export const CONSENT_STATES = {
  INDETERMINATE: 'indeterminate',
  DETERMINATE: 'determinate'
}