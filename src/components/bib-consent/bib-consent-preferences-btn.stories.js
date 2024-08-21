import { css, html } from 'lit'
import './bib-consent-preferences-btn.js'
import './bib-consent.js'

export default {
  title: 'Composants/Consentement des témoins',
  component: 'BibConsentPreferencesBtn',
  parameters: {
    cssprops: {}
  },
}

/**
 * Widget de base
 */
export const ConsentementTemoinsBtn = {
  name: 'Bouton de paramètres des témoins',
  render: function () {

    return html`
      <bib-consent-preferences-btn></bib-consent-preferences-btn>
      <bib-consent server-url="/consent-server"></bib-consent>
    `
  }
}

/**
 * Bouton stylé
 */
export const ConsentementTemoinsBtnStyled = {
  name: 'Exemple de bouton stylé',
  render: function () {
    const styles = css`
      footer {
        background-color: #0b113a;
        padding: 1.3rem 2rem;
        display: flex;
        gap: 3.25rem;
      }

      .btn {
        color: #fff;
        font-size: .875rem;
        font-weight: 500;
        text-decoration: none;
      }
      `

    return html`
      <style>${styles}</style>
      <footer>
        <a href="#" class="btn" @click="${e => e.preventDefault()}">Politique de confidentialité</a>
        <bib-consent-preferences-btn class="btn"></bib-consent-preferences-btn>
        <bib-consent server-url="/consent-server"></bib-consent>
      </footer>
    `
  }
}