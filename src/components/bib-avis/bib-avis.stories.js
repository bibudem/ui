import { html } from 'lit'
import './bib-avis'

export default {
  title: 'Composants/Avis',
  component: 'Avis',
  tags: ['autodocs'],
  argTypes: {
    niveau: {
      control: { type: 'select' },
      options: ['important', 'informatif']
    },
    contexte: {
      control: { type: 'select' },
      options: ['site-web', 'site-web-dev']
    },
    boutonFermer: {
      control: {
        type: 'radio'
      },
      options: [true, false]
    }
  }
}

export const Avis = {
  render: function ({ contexte = 'site-web-dev', boutonFermer }) {
    console.log('arguments: %o', arguments)
    return html`<bib-avis contexte="${contexte}" ?boutonFermer=${boutonFermer} />`
  }
}

export const AvisLocal = {

  render: () => html`<bib-avis>Ceci est un avis local</bib-avis>`
}