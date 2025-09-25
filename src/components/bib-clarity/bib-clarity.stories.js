import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { EVENT_NAMES as BIB_CONSENT_EVENT_NAMES } from '../bib-consent/constants.js'
import { CLARITY_PROJECT_ID, EVENT_NAMES as BIB_CLARITY_EVENT_NAMES } from './constants.js'
import './bib-clarity.js'
import '../bib-consent/bib-consent.js'

export default {
  title: 'Composants/Microsoft Clarity',
  component: 'clarity',
  tags: ['autodocs'],
  argTypes: {
    containerId: {
      name: 'Container ID',
      description: 'ID du projet Clarity',
      table: {
        type: {
          summary: 'string'
        },
        defaultValue: {
          summary: CLARITY_PROJECT_ID
        }
      }
    }
  },
  parameters: {
  }
}

/**
 * 
 */
export const Clarity = {
  name: 'bib-clarity',
  render: function ({ env, containerId }) {

    const consentElement = document.createElement('bib-consent')
    consentElement.setAttribute('server-url', '/consent-server')
    consentElement.addEventListener(BIB_CONSENT_EVENT_NAMES.CHANGE, (event) => {
      console.log(`This element just got an ${BIB_CONSENT_EVENT_NAMES.CHANGE} event:`, event)
    })

    const clarityElement = document.createElement('bib-clarity')
    clarityElement.setAttribute('project-id', containerId)

    Object.values(BIB_CLARITY_EVENT_NAMES).forEach(eventName => {
      clarityElement.addEventListener(eventName, (event) => {
        console.log(`This element just got an ${eventName} event:`, event)
      })
    })

    return html`
      ${consentElement}
      ${clarityElement}
      <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 1em;">
        <button @click="${() => consentElement.show()}">Open</button>
        <button @click="${() => consentElement.showPreferences()}">Open preferences</button>
        <span style="width: 1px; height: 1em; margin-inline: 2px; background: hsla(203, 50%, 30%, 0.25);"></span>
        <button @click="${() => consentElement.getTokens()}">Get tokens</button>
        <button @click="${() => consentElement.saveTokens({ analytics_consent: true, functionality_consent: false, ad_consent: false })}">Save tokens</button>
        <button @click="${() => consentElement.resetTokens()}">Reset tokens</button>
      </div>
    `
  },
  args: {
    containerId: CLARITY_PROJECT_ID
  }
}