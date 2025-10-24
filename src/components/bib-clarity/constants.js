export const CLARITY_PROJECT_ID = 't10hsivmt0'

/**
 * The names of events that can be dispatched by the BibClarity component.
 *
 * @type {Object.<string,string>}
 * @constant
 */
export const EVENT_NAMES = {
  READY: 'bib:ready',
  CHANGE: 'bib:change',
}

/**
 * The possible bib-clarity states.
 *
 * @type {Object.<BibClarityStateTypes,string>}
 * @constant
 */
export const READY_STATES = {
  INDETERMINATE: 'indeterminate',
  INITIALIZING: 'initializing',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
}