import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import './bib-gtm.js'
import '../bib-consent/bib-consent.js'

export default {
  title: 'Composants/Google Tag Manager',
  component: 'GTM',
  tags: ['autodocs'],
  argTypes: {
    containerId: {
      name: 'Container ID',
      description: 'ID du conteneur Google Tag Manager',
      table: {
        type: {
          summary: 'string'
        },
        defaultValue: {
          summary: 'GTM-K8BQPC'
        }
      }
    }
  },
  parameters: {
  }
}

/**
 * Affiche un message d'urgence
 */
export const GTM = {
  name: 'bib-gtm',
  render: function ({ env, containerId }) {
    return html`
      <bib-consent server-url="/consent-server"></bib-consent>
      <bib-gtm container-id="${ifDefined(containerId)}"></bib-gtm>
    `
  },
  args: {
    containerId: 'GTM-K8BQPC'
  }
}