import { LitElement } from 'lit'
import { addToGlobalBib } from '@/utils/bib.js'
import { ConsentTokens } from '../bib-consent/ConsentTokens.js'

function loadGtm() {
  const gtmScriptId = 'bib-GTM-script'
  if (document.querySelector(`script#${gtmScriptId}`)) {
    return
  }

  var gtmScript = document.createElement('script')
  gtmScript.id = gtmScriptId
  gtmScript.async = true
  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-K8BQPC'

  var firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(gtmScript, firstScript)
}

export class BibAnalytics extends LitElement {

  constructor() {
    super()

    this.hidden = true
    this.#init()
  }

  #init() {

    const consentElem = document.querySelector('bib-consent')

    if (consentElem) {

      // TEMP
      globalThis.nogtm = true

      function consentListener(event) {
        console.log(`[bib-consent] événement ${event.type}`, event.detail)

        const consentData = event.detail

        if (consentData !== null) {
          loadGtm()

          const adConsent = consentData.ad_storage ? 'granted' : 'denied'
          const analyticsConsent = consentData.analytics_storage ? 'granted' : 'denied'
          const gtmConsentData = {
            ad_user_data: adConsent,
            ad_personalization: adConsent,
            ad_storage: adConsent,
            analytics_storage: analyticsConsent
          }

          console.log('Updating GTM consent with', gtmConsentData)

          gtag('consent', 'update', gtmConsentData)
        }
      }

      const dataLayer = globalThis.dataLayer = globalThis.dataLayer || []
      const gtag = globalThis.gtag = globalThis.gtag || function gtag() { dataLayer.push(arguments) }

      const defaultConsent = new ConsentTokens(false)

      gtag('consent', 'default', defaultConsent.toGTM())
      dataLayer.push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' })

      consentElem.addEventListener('bib:consent:ready', consentListener)
      consentElem.addEventListener('bib:consent:update', consentListener)
    }
  }
}

if (!window.customElements.get('bib-analytics')) {
  window.customElements.define('bib-analytics', BibAnalytics)
}

addToGlobalBib('avis', {})