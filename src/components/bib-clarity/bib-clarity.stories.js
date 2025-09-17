import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { CLARITY_PROJECT_ID } from './constants.js'
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
 * Affiche un message d'urgence
 */
export const GTM = {
  render: function ({ env, containerId }) {
    return html`
      <bib-consent server-url="/consent-server"></bib-consent>
      <bib-clarity project-id="${ifDefined(containerId)}" />
    `
  },
  args: {
    containerId: CLARITY_PROJECT_ID
  }
}