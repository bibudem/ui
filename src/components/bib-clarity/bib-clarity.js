import { css, LitElement, unsafeCSS } from 'lit'
import Clarity from '@microsoft/clarity'
import { addToGlobalBib } from '@/utils/bib.js'
import { dispatchPublicEvent } from '@/utils/events.js'
import styles from './bib-clarity.scss?inline'
import { CLARITY_PROJECT_ID } from './constants.js'
import { EVENT_NAMES } from '../bib-consent/constants.js'



/**
 * Custom element that manages the loading and updating of Microsoft Clarity tracking code on a web page.
 *
 * @class BibClarity
 * @extends LitElement
 */
export class BibClarity extends LitElement {

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
    const projectId = this.projectId

    function consentListener(event) {
      console.log(`[bib-clarity] événement de bib-consent ${event.type}`, event.detail)

      const consentData = event.detail

      if (consentData === null) {
        self.consent(false)
        return
      }
      // console.log('[bib-consent] tokens:', Object.entries(consentData).map(entry => entry.join(': ')).join(', '))

      const { analytics_consent } = consentData

      self.consent(analytics_consent === 'granted')
    }

    this.clarity.init(projectId)

    // Push the rest to the next tick
    // Clarity should have been initialized by then
    setTimeout(() => {
      const consentElem = document.querySelector('bib-consent')

      if (consentElem === null) {
        // Aborting
        console.info('No <bib-consent /> element found. Turning off Clarity tracking.')

        this.#dispatchPublicEvent(EVENT_NAMES.READY, { detail: this.clarity })

        // Turn off Clarity in case it was initially on
        self.consent(false)

      } else {

        consentElem.addEventListener(EVENT_NAMES.READY, consentListener)
        consentElem.addEventListener(EVENT_NAMES.CHANGE, consentListener)
      }

      this.#dispatchPublicEvent(EVENT_NAMES.READY, { detail: this.clarity })

    })
  }

  #dispatchPublicEvent(name, detail = null) {
    dispatchPublicEvent(this, name, { detail })
  }

  consent(granted) {
    if (typeof granted !== 'boolean') {
      throw new TypeError('The "granted" parameter must be a boolean')
    }

    this.clarity.consent(granted)
  }
}

if (!window.customElements.get('bib-clarity')) {
  window.customElements.define('bib-clarity', BibClarity)
}

addToGlobalBib('clarity', {})