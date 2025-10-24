import { css, LitElement, unsafeCSS } from 'lit'
import Clarity from '@microsoft/clarity'
import { addToGlobalBib } from '@/utils/bib.js'
import { dispatchPublicEvent } from '@/utils/events.js'
import ConsentTokenV2 from './ConsentTokenV2.js'
import { CLARITY_PROJECT_ID, READY_STATES } from './constants.js'
import { EVENT_NAMES } from '../bib-consent/constants.js'
import styles from './bib-clarity.scss?inline'

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
 * @property {String} projectId - The ID of the Microsoft Clarity project.
 * @property {Boolean} hidden - Indicates whether the component is hidden.
 * @property {Boolean} #consent - Indicates whether Microsoft Clarity tracking is enabled.
 * @property {String} readyState - The current state of the BibClarity component, which can be one of the following values:
 *   - `indeterminate`: The user has not yet indicated their consent preferences.
 *   - `determinate`: The user has made their consent preferences.
 *   - `connected`: The user has granted consent and the component is connected.
 *   - `disconnected`: The user has not granted consent and the component is disconnected.
 * @property {Clarity} clarity - The Microsoft Clarity instance.
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

  /**
   * Initializes the component.
   *
   * @private
   */
  async #init() {
    const self = this

    async function consentListener(event) {
      console.log(`<bib-clarity> recieved an event from <bib-consent>: ${event.type}`, event.detail)

      const consentData = event.detail

      if (consentData === null) {
        self.setConsent(false)
        return
      }

      const { analytics_consent, ad_consent } = consentData

      if (self.readyState === READY_STATES.INDETERMINATE) {
        self.readyState = READY_STATES.CONNECTED
      }

      self.setConsent({ analytics_consent, ad_consent })
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

    })
  }

  #dispatchPublicEvent(name, detail = null) {
    dispatchPublicEvent(this, name, { detail })
  }

  setConsent(consent) {
    const consentToken = new ConsentTokenV2(consent)

    if (JSON.stringify(this.#consent) === JSON.stringify(consentToken)) {
      // No change, so no need to do anything or dispatch an event
      return
    }

    console.log(`[bib-clarity] Setting consent to %o (was ${this.#consent === null ? 'not set' : this.#consent}).`, consentToken)

    this.#consent = consentToken
    // Using v2 API for now.
    //See: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2
    // this.clarity.consent('consent', granted)
    this.clarity.consent('consentv2', consentToken)
    this.#dispatchPublicEvent(EVENT_NAMES.CHANGE, { detail: consentToken })
  }
}

if (!window.customElements.get('bib-clarity')) {
  window.customElements.define('bib-clarity', BibClarity)
}

addToGlobalBib('clarity', {})