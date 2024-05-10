import { html } from 'lit'
import './bib-retroaction-usager'

export default {
  title: 'Composants/Rétroaction usager',
  component: 'Urgence',
  tags: ['autodocs'],
}

/**
 * Widget de base
 */
export const RetroactionUsager = {
  render: function ({ service, grand }) {
    return html`<bib-retroaction-usager />`
  },
  args: {
    service: 'https://coquille.umontreal.ca/urgence-test-bcrp/urgence-udem.json',
    grand: true
  }
}