import { css, LitElement, unsafeCSS } from 'lit'
import Clarity from '@microsoft/clarity'
import { addToGlobalBib } from '@/utils/bib.js'
import { ConsentTokens } from '../bib-consent/ConsentTokens.js'
import styles from './bib-clarity.scss?inline'
import { CLARITY_PROJECT_ID } from './constants.js'

function loadClarity(projectId) {
  const gtmScriptId = 'bib-clarity-script'
  if (document.querySelector(`script#${gtmScriptId}`)) {
    return
  }

  var gtmScript = document.createElement('script')
  gtmScript.id = gtmScriptId
  gtmScript.async = true
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${projectId}`

  var firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(gtmScript, firstScript)
}

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
    this.projectId = CLARITY_PROJECT_ID
    this.#init()
  }

  #init() {
    const projectId = this.projectId

    setTimeout(() => {
      const consentElem = document.querySelector('bib-consent')

      if (consentElem) {
        // console.warn('bib-consent element found')

        function consentListener(event) {
          // console.log(`[bib-consent] événement ${event.type}`, event.detail)

          const consentData = event.detail

          if (consentData !== null) {
            // console.log('[bib-consent] tokens:', Object.entries(consentData).map(entry => entry.join(': ')).join(', '))

            loadClarity(projectId)

            const { analytics_consent, ad_consent } = consentData

            const gtmConsentData = {
              ad_user_data: ad_consent,
              ad_personalization: ad_consent,
              ad_storage: ad_consent,
              analytics_storage: analytics_consent
            }

            // console.log('Updating GTM consent with', gtmConsentData)

            gtag('consent', 'update', gtmConsentData)
          }
        }

        const dataLayer = globalThis.dataLayer = globalThis.dataLayer || []
        const gtag = globalThis.gtag = globalThis.gtag || function gtag() { dataLayer.push(arguments) }

        const defaultConsent = new ConsentTokens(false)
        // console.log('defaultConsent: ', defaultConsent)

        gtag('consent', 'default', defaultConsent.toGTM())
        dataLayer.push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' })

        consentElem.addEventListener('bib:consent:ready', consentListener)
        consentElem.addEventListener('bib:consent:update', consentListener)
      } else {
        console.warn('No bib-consent element found')
      }

    })
  }
}

if (!window.customElements.get('bib-clarity')) {
  window.customElements.define('bib-clarity', BibClarity)
}

addToGlobalBib('clarity', {})