import { html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import './bib-avis'

export default {
  title: 'Composants/Avis',
  component: 'Avis',
  tags: ['autodocs'],
  argTypes: {
    service: {
      type: {
        required: true,
      },
      control: {
        type: 'text',
      },
      description: 'URL de base du service',
      if: {
        arg: 'message',
        exists: false
      },
      table: {
        type: {
          summary: 'url'
        },
        defaultValue: {
          summary: 'https://avis.bib.umontreal.ca'
        }
      }
    },
    niveau: {
      description: 'Niveau d\importance de l\'avis: `informatif` ou `important`',
      type: {
        name: 'string',
        required: true,
        value: ['important', 'informatif']
      },
      if: {
        arg: 'message',
        exists: false
      },
      control: { type: 'select' },
      options: ['important', 'informatif'],
      table: {
        value: ['important', 'informatif'],
        defaultValue: {
          summary: 'important'
        }
      }
    },
    contexte: {
      description: 'Contexte d\'affichage du service utilité: `site-web` ou `site-web-dev`',
      type: {
        required: true,
      },
      if: {
        arg: 'message',
        exists: false
      },
      control: { type: 'select' },
      options: ['site-web', 'site-web-dev'],
      table: {
        defaultValue: {
          summary: 'site-web'
        }
      }
    },
    boutonFermer: {
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
        value: '1rem',
        description: 'Taille de la police'
      }
    }
  }
}

/**
 * Affiche un avis
 */
export const Avis = {
  render: function ({ contexte = 'site-web-dev', boutonFermer = true }) {
    return html`<bib-avis contexte="${contexte}" ?boutonFermer=${boutonFermer} />`
  },
  args: {
    boutonFermer: true,
    niveau: 'important',
    contexte: 'site-web-dev'
  }
}

/**
 * Affiche un avis créé localement
 */
export const AvisLocal = {
  name: 'Avis avec un message local',
  render: ({ message, boutonFermer }) => html`<bib-avis ?boutonFermer=${boutonFermer}>${unsafeHTML(message)}</bib-avis>`,
  args: {
    message: 'Ceci est un <strong>avis local</strong> avec un peu de <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">balises html</a>.',
    boutonFermer: false
  }
}