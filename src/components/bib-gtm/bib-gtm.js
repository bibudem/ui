import { css, LitElement, unsafeCSS } from 'lit'
import { addToGlobalBib } from '@/utils/bib.js'
import { loggerFactory } from '@/utils/logger.js'
import { ConsentTokens } from '../bib-consent/ConsentTokens.js'
import styles from './bib-gtm.scss?inline'
import { GTM_CONTAINER_ID } from './constants.js'
import { EVENT_NAMES } from '../bib-consent/constants.js'

let gtmScript = null

/**
 * Load the Google Tag Manager (GTM) script.
 * The script is only loaded once, subsequent calls are ignored.
 * @param {string} containerId - The ID of the GTM container.
 */
function loadGtm(containerId) {

  if (gtmScript) {
    return
  }

  gtmScript = document.createElement('script')
  gtmScript.async = true
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`

  var firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(gtmScript, firstScript)
}

export class BibGtm extends LitElement {
  #logger = loggerFactory('bib-gtm', '#0a00ff')

  static properties = {
    containerId: {
      type: String,
      attribute: 'container-id'
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
    this.containerId = GTM_CONTAINER_ID
    this.#init()

    this.#logger('Component class initialized.')
  }

  #init() {
    const self = this
    this.#logger('Initializing...')

    const containerId = this.containerId

    setTimeout(() => {
      const consentElem = document.querySelector('bib-consent')

      if (consentElem) {
        self.#logger('bib-consent element found.')

        function consentListener(event) {
          self.#logger('<bib-consent> triggered event type ${event.type} with data:', event.detail)

          const consentData = event.detail

          if (consentData !== null) {

            self.#logger('Loading GTM script.')
            loadGtm(containerId)

            const { analytics_consent, ad_consent } = consentData

            const gtmConsentData = {
              ad_user_data: ad_consent,
              ad_personalization: ad_consent,
              ad_storage: ad_consent,
              analytics_storage: analytics_consent
            }

            self.#logger('Updating GTM with consent data:', gtmConsentData)

            gtag('consent', 'update', gtmConsentData)

            // Get the correct page location (parent page if in iframe)
            let pageLocation, pagePath
            try {
              pageLocation = window.top.location.href
              pagePath = window.top.location.pathname
            } catch (e) {
              // Fallback if cross-origin
              pageLocation = window.location.href
              pagePath = window.location.pathname
            }

            self.#logger('Sending page_view with location:', pageLocation, 'path:', pagePath, 'title:', document.title)

            gtag('event', 'page_view', {
              page_path: pagePath,
              page_location: pageLocation,
              page_title: document.title
            })
          }
        }

        const dataLayer = globalThis.dataLayer = globalThis.dataLayer || []
        const gtag = globalThis.gtag = globalThis.gtag || function gtag() { dataLayer.push(arguments) }

        const defaultConsent = new ConsentTokens(false)

        this.#logger('Pushing default consent to GTM with `defaultConsent`: ', defaultConsent)

        gtag('consent', 'default', defaultConsent.toGTM())
        dataLayer.push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' })

        this.#logger('Registering event listeners on <bib-consent> element.')
        consentElem.addEventListener(EVENT_NAMES.READY, consentListener)
        consentElem.addEventListener(EVENT_NAMES.CHANGE, consentListener)
      } else {
        this.#logger('No bib-consent element found')
      }

      this.#logger('Initialization complete.')

    })
  }
}

if (!window.customElements.get('bib-gtm')) {
  window.customElements.define('bib-gtm', BibGtm)
}

addToGlobalBib('gtm', {})