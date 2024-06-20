import { css, html, LitElement, unsafeCSS } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import './bib-consent-dialog.js'
import { DEFAULT_PREFERENCES } from './constants.js'
import styles from './bib-consent-consent-dialog.scss?inline'

function all(value) {
  return Object.keys(DEFAULT_PREFERENCES).reduce((prefs, prop) => ({ ...prefs, [prop]: value }), {})
}

export class BibConsentConsentDialog extends LitElement {
  static properties = {
    debug: {
      type: Boolean,
      reflect: true
    },
    open: {
      type: Boolean,
      state: true
    },
  }

  static styles = [
    css`${unsafeCSS(styles)}`
  ]

  constructor() {
    super()
    this.open = false
    this.dialogRef = createRef()
  }

  setPreferences(preferences) {
    this.dispatchEvent(new CustomEvent('update', { detail: preferences }))
  }

  show() {
    if (this.dialogRef.value && !this.dialogRef.value.open) {
      this.dialogRef.value?.show()
    }
  }

  close() {
    if (this.dialogRef.value && this.dialogRef.value.open) {
      this.dialogRef.value?.close()
    }
  }

  showPreferences() {
    console.log('parent: ', this.getRootNode().host)
    this.dispatchEvent(new CustomEvent('show-preferences'))
  }

  render() {
    return html`
      <bib-consent-dialog id="consent-dialog" class='modal-container' ${ref(this.dialogRef)}>
          <div class="title">L’UdeM reconnaît l’importance de respecter la vie privée</div>
          <p>L’utilisation de témoins nous permet d’améliorer et de personnaliser votre expérience Web. Certains témoins sont obligatoires pour assurer le fonctionnement et la sécurité du site Web, alors que d’autres enregistrent vos préférences. En acceptant tout, vous consentez à notre utilisation de témoins pour mieux répondre à vos besoins.</p>
          <div class="btn-modal-container">
            <button class="btn-consent open-modal-parameter" type="button" @click="${() => this.showPreferences()}">Personnaliser les témoins <span>&gt;</span></button>
            <button class="btn-consent" type="button" @click="${() => this.setPreferences(all(false))}">Tout refuser</button>
            <button class="btn-consent" type="button" @click="${() => this.setPreferences(all(true))}">Tout accepter</button>
          </div>
          <div class="learn-more-container">
            Voir notre <a href="https://vie-privee.umontreal.ca/confidentialite">politique de confidentialité</a> et nos <a href="https://vie-privee.umontreal.ca/conditions-dutilisation">conditions d’utilisation</a>.
          </div>
      </bib-consent-dialog>
    `
  }
}

customElements.define('bib-consent-consent-dialog', BibConsentConsentDialog)