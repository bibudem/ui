import { css, LitElement, unsafeCSS } from 'lit'
import { addToGlobalBib } from '@/utils/bib.js'
import { loggerFactory } from '@/utils/logger.js'
import { ConsentTokens } from '../bib-consent/ConsentTokens.js'
import styles from './bib-gtm.scss?inline'
import { GTM_CONTAINER_ID } from './constants.js'
import { EVENT_NAMES } from '../bib-consent/constants.js'

const logger = loggerFactory('bib-gtm', 'green')

let gtmScript = null

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
  }

  #init() {
    const self = this
    this.#logger.log('Initializing...')

    const containerId = this.containerId

    setTimeout(() => {
      const consentElem = document.querySelector('bib-consent')

      if (consentElem) {
        self.#logger.log('bib-consent element found.')

        function consentListener(event) {
          self.#logger.log(`<bib-consent> triggered event type ${event.type} with data:`, event.detail)

          const consentData = event.detail

          if (consentData !== null) {
            // console.log('[bib-consent] tokens:', Object.entries(consentData).map(entry => entry.join(': ')).join(', '))

            self.#logger.log(`Loading GTM script.`)
            loadGtm(containerId)

            const { analytics_consent, ad_consent } = consentData

            const gtmConsentData = {
              ad_user_data: ad_consent,
              ad_personalization: ad_consent,
              ad_storage: ad_consent,
              analytics_storage: analytics_consent
            }

            self.#logger.log('Updating GTM with consent data:', gtmConsentData)

            gtag('consent', 'update', gtmConsentData)
          }
        }

        const dataLayer = globalThis.dataLayer = globalThis.dataLayer || []
        const gtag = globalThis.gtag = globalThis.gtag || function gtag() { dataLayer.push(arguments) }

        const defaultConsent = new ConsentTokens(false)

        self.#logger.log('Pushing default consent to GTM with `defaultConsent`: ', defaultConsent)

        gtag('consent', 'default', defaultConsent.toGTM())
        dataLayer.push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' })

        self.#logger.log('Registering event listeners on <bib-consent> element.')
        consentElem.addEventListener(EVENT_NAMES.READY, consentListener)
        consentElem.addEventListener(EVENT_NAMES.CHANGE, consentListener)
      } else {
        self.#logger.warn('No bib-consent element found')
      }

      self.#logger.log('Initialization complete.')

    })
  }
}

if (!window.customElements.get('bib-gtm')) {
  window.customElements.define('bib-gtm', BibGtm)
}

addToGlobalBib('gtm', {})