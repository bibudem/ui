import { html } from 'lit'
import './bib-gestion-temoins'
import './bib-gestion-temoins-server'

export default {
  title: 'Composants/Gestion des témoins',
  component: 'BibGestionTemoins',
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
    return html`<bib-gestion-temoins server-url="/server-gestion-temoins?debug"><p>Ceci est du texte avec du <strong>gras</strong>...</p></bib-gestion-temoins>`
  }
}

/**
 * Composant serveur
 */
export const GestionTemoinsServer = {
  render: function () {
    return html`<bib-gestion-temoins-server></bib-gestion-temoins-server>`
  }
}