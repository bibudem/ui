import { html } from 'lit'
import { EVENT_NAMES as BIB_CONSENT_EVENT_NAMES } from '../bib-consent/constants.js'
import { CLARITY_PROJECT_ID, EVENT_NAMES as BIB_CLARITY_EVENT_NAMES } from './constants.js'
import './bib-clarity.js'
import '../bib-consent/bib-consent.js'
import './bib-clarity.stories.scss'

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
    consentElement.addEventListener(BIB_CONSENT_EVENT_NAMES.READY, (event) => {
      updateDiv(event.detail)
    })
    consentElement.addEventListener(BIB_CONSENT_EVENT_NAMES.CHANGE, (event) => {
      updateDiv(event.detail)
    })

    Object.values(BIB_CONSENT_EVENT_NAMES).forEach(eventName => {
      consentElement.addEventListener(eventName, (event) => {
        logEvents('consent', event)
      })
    })

    Object.values(BIB_CLARITY_EVENT_NAMES).forEach(eventName => {
      consentElement.addEventListener(eventName, (event) => {
        logEvents('clarity', event)
      })
    })

    const clarityElement = document.createElement('bib-clarity')
    clarityElement.setAttribute('project-id', containerId)

    Object.values(BIB_CLARITY_EVENT_NAMES).forEach(eventName => {
      // console.log('[clarity] adding listener for', eventName)
      clarityElement.addEventListener(eventName, (event) => {
        console.log(`<bib-clarity> dispatched an ${eventName} event with detail:`, event.detail)
      })
    })

    Object.values(BIB_CONSENT_EVENT_NAMES).forEach(eventName => {
      // console.log('[clarity] adding listener for', eventName)
      consentElement.addEventListener(eventName, (event) => {
        console.log(`<bib-consent> dispatched an ${eventName} event with detail:`, event.detail)
      })
    })

    function logEvents(element, event) {
      const containerId = `events-${element}`
      const events = document.getElementById(containerId)
      const time = new Date().toLocaleTimeString()
      events.innerHTML = `<small><code>${time}</code> [${event.type}] <code>${JSON.stringify(event.detail)}</code></small>`
    }

    function updateDiv(tokensData) {
      const div = document.getElementById(`tokens`)
      div.innerHTML = `<pre style="margin: 0">${JSON.stringify(tokensData, null, 2)}</pre>`
    }


    async function getTokens() {
      const tokens = await consentElement.getTokens()
      updateDiv(tokens)
    }

    function onToggleClarityConsent(event) {
      const checked = event.target.checked
      console.log('Setting clarity consent to', checked)
      clarityElement.setConsent(checked)
    }

    return html`
      ${consentElement}
      ${clarityElement}
      <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 1em;">
        <button @click="${() => consentElement.show()}">Open</button>
        <button @click="${() => consentElement.showPreferences()}">Open preferences</button>
        <span style="width: 1px; height: 1em; margin-inline: 2px; background: hsla(203, 50%, 30%, 0.25);"></span>
        <button @click="${getTokens}">Get tokens</button>
        <button @click="${() => consentElement.saveTokens({ analytics_consent: true, functionality_consent: false, ad_consent: false })}">Save tokens</button>
        <button @click="${() => consentElement.resetTokens()}">Reset tokens</button>        
      </div>
      <div id="tokens" style="margin-top: 1rem; padding: 1rem; border: 1px solid hsla(203, 50%, 30%, 0.25); font-size: .8em; background: hsla(203, 50%, 30%, 0.05);"></div>
      <p><b>Événements</b></p>
      <div><b style="font-size: smaller;">bib-consent</b><div id="events-consent"></div></div>
      <div><b style="font-size: smaller;">bib-clarity</b><div id="events-clarity"></div></div>
    `
  },
  args: {
    containerId: CLARITY_PROJECT_ID
  }
}