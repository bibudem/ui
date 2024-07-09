import { html } from 'lit'
import './bib-consent'
import './bib-consent-server'
import PreferencesProxy from './PreferencesProxy.js'

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

const preferencesProxy = new PreferencesProxy(consentElement)

/**
 * Widget de base
 */
export const GestionTemoins = {
  render: function () {
    // return html`<bib-consent debug server-url="/consent-server"></bib-consent>`
    return html`
    ${consentElement}
    <button @click="${() => consentElement.show()}">Open</button>
    <button @click="${() => consentElement.showPreferences()}">Open preferences</button>
    <button @click="${() => preferencesProxy.resetPreferences(null)}">Reset preferences</button>
    `
  }
}