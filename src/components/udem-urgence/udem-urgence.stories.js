import { html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import './udem-urgence'

export default {
  title: 'Composants UdeM/Urgence',
  component: 'Urgence',
  tags: ['autodocs'],
  argTypes: {
    service: {
      type: {
        name: 'string'
      },
      control: {
        type: 'text',
      },
      description: 'URL de base du service',
      table: {
        type: {
          summary: 'url'
        },
        defaultValue: {
          summary: 'https://urgence.umontreal.ca/urgence-udem.json'
        }
      }
    },
    grand: {
      description: 'Afficher la version grande du message',
      control: {
        type: 'boolean'
      },
      options: [true, false],
      table: {
        defaultValue: {
          summary: false
        }
      }
    }
  },
  parameters: {
    cssprops: {
      'bib-avis-container-color': {
        value: '#fffac6',
        defaultValue: 'var(--md-sys-color-warningContainer, #fffac6)',
        description: 'Couleur du fond'
      },
      'bib-avis-size': {
        value: 'inherit',
        description: 'Taille de la police'
      }
    }
  }
}

/**
 * Affiche un message d'urgence
 */
export const Urgence = {
  render: function ({ service, grand }) {
    return html`<udem-urgence service="${ifDefined(service)}" ?grand=${grand} />`
  },
  args: {
    service: 'https://coquille.umontreal.ca/urgence-test-bcrp/urgence-udem.json',
    grand: true
  }
}

/**
 * Affiche un message d'urgence
 */
export const UrgencePetit = {
  name: 'Affichage petit',
  render: function ({ service, grand }) {
    return html`<udem-urgence service="${ifDefined(service)}" ?grand=${grand} />`
  },
  args: {
    service: 'https://coquille.umontreal.ca/urgence-test-bcrp/urgence-udem.json',
    grand: false
  }
}