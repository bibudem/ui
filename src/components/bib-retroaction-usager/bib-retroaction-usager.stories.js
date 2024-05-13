import { html } from 'lit'
import './bib-retroaction-usager'

export default {
  title: 'Composants/Rétroaction usager',
  component: 'BibRetroactionUsager',
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
export const RetroactionUsager = {
  render: function () {
    return html`<bib-retroaction-usager />`
  }
}