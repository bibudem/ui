import { css, LitElement, unsafeCSS } from 'lit'
import Clarity from '@microsoft/clarity'
import { addToGlobalBib } from '@/utils/bib.js'
import { dispatchPublicEvent } from '@/utils/events.js'
import styles from './bib-clarity.scss?inline'
import { CLARITY_PROJECT_ID } from './constants.js'
import { EVENT_NAMES } from '../bib-consent/constants.js'

function toClarityConsent(granted) {
  if (granted === null) {
    return null
  }

  return granted === 'granted'
}

/**
 * Custom element that manages the loading and updating of Microsoft Clarity tracking code on a web page.
 *
 * @class BibClarity
 * @extends LitElement
 */
export class BibClarity extends LitElement {
  #consent = null

  static properties = {
    projectId: {
      type: String,
      attribute: 'project-id'
    },
    hidden: {
      type: Boolean
    }
  }

  static styles = [
    css`${unsafeCSS(styles)}`
  ]

  constructor() {
    super()

    this.hidden = true
    this.projectId = this.projectId || CLARITY_PROJECT_ID
    this.clarity = Clarity
    this.#init()
  }

  async #init() {
    const self = this

    async function consentListener(event) {
      console.log(`<bib-clarity> recieved an event from <bib-consent>: ${event.type}`, event.detail)

      const consentData = event.detail

      if (consentData === null) {
        self.setConsent(false)
        return
      }

      const { analytics_consent } = consentData

      self.setConsent(analytics_consent === 'granted')
    }

    this.clarity.init(this.projectId)

    // Push the rest to the next tick
    // Clarity should have been initialized by then
    setTimeout(async () => {
      const bibConsentElem = document.querySelector('bib-consent')

      if (bibConsentElem === null) {
        // Aborting
        console.info('No <bib-consent /> element found. Turning off Clarity tracking.')

        // Turn off Clarity in case it was initially on
        self.setConsent(false)

      } else {

        bibConsentElem.addEventListener(EVENT_NAMES.READY, consentListener)
        bibConsentElem.addEventListener(EVENT_NAMES.CHANGE, consentListener)
      }

      this.#dispatchPublicEvent(EVENT_NAMES.READY)

    })
  }

  #dispatchPublicEvent(name, detail = null) {
    dispatchPublicEvent(this, name, { detail })
  }

  setConsent(granted) {
    if (typeof granted !== 'boolean') {
      throw new TypeError('The "granted" parameter must be a boolean. Got', typeof granted)
    }

    if (this.#consent === granted) {
      // No change, so no need to do anything or dispatch an event
      return
    }

    console.log(`[bib-clarity] Setting consent to ${granted} (was ${this.#consent === null ? 'not set' : this.#consent}).`)

    this.#consent = granted
    // Using v1 API for now.
    //See: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v1
    this.clarity.consent('consent', granted)
    this.#dispatchPublicEvent(EVENT_NAMES.CHANGE, { detail: granted })
  }
}

if (!window.customElements.get('bib-clarity')) {
  window.customElements.define('bib-clarity', BibClarity)
}

addToGlobalBib('clarity', {})