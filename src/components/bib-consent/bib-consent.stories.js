import { html } from 'lit'
import './bib-consent'
import './bib-consent-server'
import PreferencesProxy from './PreferencesProxy.js'

export default {
  title: 'Composants/Gestion des témoins',
  component: 'BibConsent',
  tags: ['autodocs'],
  parameters: {
    cssprops: {
      'bib-comp-retroaction-usager-size': {
        value: 'inherit',
        description: 'Taille de la police'
      }
    }
  }
}

const consentElement = document.createElement('bib-consent')
consentElement.debug = true
consentElement.serverUrl = '/consent-server'
consentElement.allowedOrigins = ['http://localhost:*']

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

// /**
//  * Composant serveur
//  */
// export const GestionTemoinsServer = {
//   render: function () {
//     return html`<bib-consent-server></bib-consent-server>`
//   }
// }