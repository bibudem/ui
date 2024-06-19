import { html } from 'lit'
import './bib-consent'
import './bib-consent-server'

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

/**
 * Widget de base
 */
export const GestionTemoins = {
  render: function () {
    return html`<bib-consent debug server-url="/consent-server"><p>Ceci est du texte avec du <strong>gras</strong>...</p></bib-consent>`
  }
}

/**
 * Composant serveur
 */
export const GestionTemoinsServer = {
  render: function () {
    return html`<bib-consent-server></bib-consent-server>`
  }
}