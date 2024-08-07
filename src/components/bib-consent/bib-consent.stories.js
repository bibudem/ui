import { html } from 'lit'
import './bib-consent'
import './bib-consent-server'
import { EVENT_NAMES } from './constants.js'

export default {
  title: 'Composants/Consentement des témoins',
  component: 'BibConsent',
  parameters: {
    cssprops: {}
  },
}

const consentElement = document.createElement('bib-consent')
consentElement.setAttribute('debug', '')
consentElement.setAttribute('server-url', '/consent-server')
consentElement.setAttribute('allowed-origins', 'http://localhost:*')
consentElement.addEventListener(EVENT_NAMES.UPDATE, (event) => {
  console.log(`This element just got an ${EVENT_NAMES.UPDATE} event:`, event)
})

/**
 * Widget de base
 */
export const ConsentementTemoins = {
  render: function () {

    return html`
    ${consentElement}
    <button @click="${() => consentElement.show()}">Open</button>
    <button @click="${() => consentElement.showPreferences()}">Open preferences</button>
    <button @click="${() => consentElement.getPreferences()}">Get preferences</button>
    <button @click="${() => consentElement.savePreferences({ analytics_consent: true, functionality_consent: false, ad_consent: false })}">Save preferences</button>
    <button @click="${() => consentElement.resetPreferences()}">Reset preferences</button>
    `
  }
}