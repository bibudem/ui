import { css, html, LitElement, unsafeCSS } from 'lit'
import styles from './bib-consent-preferences-btn.scss?inline'

export class BibConsentPreferencesBtn extends LitElement {

  static styles = [
    css`${unsafeCSS(styles)}`
  ]

  onBtnClick() {
    document.querySelector('bib-consent')?.showPreferences()
  }

  render() {
    return html`<button class="btn-preferences" @click="${this.onBtnClick}" aria-label="Paramètres des témoins">Paramètres des témoins</button>`
  }
}

if (!window.customElements.get('bib-consent-preferences-btn')) {
  window.customElements.define('bib-consent-preferences-btn', BibConsentPreferencesBtn)
}