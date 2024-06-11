import { LitElement, css, html, unsafeCSS } from 'lit'
import '../bib-button/bib-button-close.js'

export class BibGestionTemoinsDialog extends LitElement {
  static properties = {
    open: {
      type: Boolean
    }
  }

  constructor() {
    super()
    this.open = false
  }

  // createRenderRoot() {
  //   return document.body
  // }

  _onCloseBtnClick(event) {
    console.log('[_onCloseBtnClick] event: ', event)
  }

  renderConsent() {
    return html`
      <div class="show-modal">
        <span>L’UdeM reconnaît l’importance de respecter la vie privée</span>
        <p>L’utilisation de témoins nous permet d’améliorer et de personnaliser votre expérience Web. Certains témoins sont obligatoires pour assurer le fonctionnement et la sécurité du site Web, alors que d’autres enregistrent vos préférences. En acceptant tout, vous consentez à notre utilisation de témoins pour mieux répondre à vos besoins.</p>
        <div class="btn-modal-container">
          <button class="btn-consent open-modal-parameter" type="button">Personnaliser les témoins <span>&gt;</span></button>
          <button class="btn-consent" type="button">Tout refuser</button>
          <button class="btn-consent" type="button">Tout accepter</button>
        </div>
        <div class="learn-more-container">
          Voir notre <a href="https://vie-privee.umontreal.ca/confidentialite">politique de confidentialité</a> et nos <a href="https://vie-privee.umontreal.ca/conditions-dutilisation">conditions d’utilisation</a>.
        </div>
      </div>
    `
  }

  render() {
    return html`
    <dialog ?open=${this.open}>
      <bib-button-close @click="${this._onCloseBtnClick}" class="btn-close-modal"></bib-button-close>
      <slot></slot>
      <!-- ${this.renderConsent()} -->
    </dialog>
    `
  }
}

customElements.define('bib-gestion-temoins-dialog', BibGestionTemoinsDialog)