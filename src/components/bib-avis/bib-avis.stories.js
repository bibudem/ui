import { html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import './bib-avis'

export default {
  title: 'Composants/Avis',
  component: 'Avis',
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
          summary: 'https://avis.bib.umontreal.ca/api/avis'
        }
      }
    },
    'bouton-fermer': {
      description: 'Afficher le bouton pour fermer l\'avis?',
      control: {
        type: 'boolean'
      },
      options: [true, false],
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    fluide: {
      description: 'Affichage en mode fluide de la bannière',
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
 * Affiche un avis
 */
export const Avis = {
  render: function ({ service, fluide, ...props }) {
    return html`<bib-avis service="${ifDefined(service)}" ?bouton-fermer=${props['bouton-fermer']} ?fluide=${fluide} />`
  },
  args: {
    'bouton-fermer': true
  }
}

/**
 * Affiche un avis créé localement
 */
export const AvisLocal = {
  name: 'Avis avec un message local',
  render: ({ message, ...props }) => html`<bib-avis ?bouton-fermer=${props['bouton-fermer']}>${unsafeHTML(message)}</bib-avis>`,
  args: {
    message: 'Ceci est un <strong>avis local</strong> avec un peu de <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">balises html</a>.',
    'bouton-fermer': false
  }
}

/**
 * Affichage fluide
 */
export const AvisFluide = {
  name: 'Avis fluide',
  render: ({ fluide, ...props }) => html`<bib-avis ?fluide=${fluide} ?bouton-fermer=${props['bouton-fermer']}></bib-avis>`,
  args: {
    fluide: true,
    'bouton-fermer': false
  }
}