import { html } from 'lit'
import './bib-consent.js'
import './bib-consent-server.js'
import { EVENT_NAMES } from './constants.js'

export default {
  title: 'Composants/Consentement des témoins',
  component: 'BibConsent',
  parameters: {
    cssprops: {}
  },
}

const consentElement = document.createElement('bib-consent')
// consentElement.setAttribute('debug', '')
consentElement.setAttribute('server-url', '/consent-server')
Object.values(EVENT_NAMES).forEach(eventName => {
  consentElement.addEventListener(eventName, (event) => {
    console.log(`[bib-consent] Event ${eventName} dispatched:`, event)
  })
})

/**
 * Widget de base
 */
export const ConsentementTemoins = {
  render: function () {

    return html`
    ${consentElement}
    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 1em;">
      <button @click="${() => consentElement.show()}">Open</button>
      <button @click="${() => consentElement.showPreferences()}">Open preferences</button>
      <span style="width: 1px; height: 1em; margin-inline: 2px; background: hsla(203, 50%, 30%, 0.25);"></span>
      <button @click="${() => consentElement.getTokens()}">Get tokens</button>
      <button @click="${() => consentElement.saveTokens({ analytics_consent: true, functionality_consent: false, ad_consent: false })}">Save tokens</button>
      <button @click="${() => consentElement.resetTokens()}">Reset tokens</button>
    </div>
    `
  }
}