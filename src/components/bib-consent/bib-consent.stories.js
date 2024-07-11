import { html } from 'lit'
import './bib-consent'
import './bib-consent-server'

export default {
  title: 'Composants/Consentement des témoins',
  component: 'BibConsent',
  parameters: {
    cssprops: {}
  }
}

const consentElement = document.createElement('bib-consent')
consentElement.setAttribute('debug', '')
consentElement.setAttribute('server-url', '/consent-server')
consentElement.setAttribute('allowed-origins', 'http://localhost:*')

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
    <button @click="${() => consentElement.savePreferences({ performanceCookies: true, functionalityCookies: false, adsCookies: false })}">Save preferences</button>
    <button @click="${() => consentElement.resetPreferences()}">Reset preferences</button>
    `
  }
}