import { name } from '../../../package.json'

export const DB_NAME = `${name}/consent`
export const DB_VERSION = 1
export const DB_STORE_NAME = 'consent'

export const EVENT_TYPES = {
  CONSENT: 'bib:consent:consent'
}
export const PREFIX = 'bib-consent'
export const SERVER_MODE = {
  LOCAL: 'local',
  REMOTE: 'remote'
}
export const SERVER_REQUEST_DEFAULT_TIMEOUT = 500
export const DEFAULT_PREFERENCES = {
  performanceCookies: null,
  functionalityCookies: null,
  adsCookies: null
}