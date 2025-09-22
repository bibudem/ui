import { css, html, LitElement, unsafeCSS } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import './bib-consent-dialog.js'
import { DEFAULT_PREFERENCES } from './constants.js'
import styles from './bib-consent-consent-dialog.scss?inline'

/**
 * Creates an object with all properties of `DEFAULT_PREFERENCES` set to the provided `value`.
 *
 * @param {boolean} value - The value to set for all properties in the returned object.
 * @returns {Object} An object with all properties of `DEFAULT_PREFERENCES` set to the provided `value`.
 */
function all(value) {
  return Object.keys(DEFAULT_PREFERENCES).reduce((prefs, prop) => ({ ...prefs, [prop]: value }), {})
}

/**
 * The `BibConsentConsentDialog` component creates a consent dialog for managing user preferences related to cookies and other tracking technologies.
 *
 * The component provides the following functionality:
 * - Displays a consent dialog with options to customize preferences, accept all, or reject all.
 * - Allows setting preferences by dispatching a `change` event with the new preferences.
 * - Provides methods to show, close, and display the preferences dialog.
 *
 * The component uses the `bib-consent-dialog` component to render the actual dialog.
 */
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

  /**
   * Sets the preferences for the consent dialog.
   *
   * @param {Object} preferences - An object containing the preferences to set.
   * @emits update - Dispatches a custom event with the updated preferences.
   */
  setConsentTokens(preferences) {
    this.dispatchEvent(new CustomEvent('update', { detail: preferences }))
  }

  /**
   * Shows the consent dialog if it is not already open.
   */
  show() {
    if (this.dialogRef.value && !this.dialogRef.value.open) {
      this.dialogRef.value?.show()
    }
  }

  /**
   * Closes the consent dialog if it is currently open.
   */
  close() {
    if (this.dialogRef.value && this.dialogRef.value.open) {
      this.dialogRef.value?.close()
    }
  }

  /**
   * Shows the preferences dialog for the consent dialog.
   *
   * This method dispatches a custom 'show-preferences' event to notify other components that the preferences dialog should be shown.
   */
  showPreferences() {
    this.dispatchEvent(new CustomEvent('show-preferences'))
  }

  render() {
    return html`
      <bib-consent-dialog class="consent-dialog" ${ref(this.dialogRef)}>
        <div class="title" autofocus>
          L’UdeM reconnaît l’importance de respecter la vie privée
        </div>
        <p>
          Vos données personnelles sont utilisées pour enregistrer vos préférences, votre consentement et produire des statistiques anonymes.<br> Pour plus d'informations, veuillez consulter notre 
          <a href="https://vie-privee.umontreal.ca/confidentialite" target="_blank" rel="noopener noreferrer">politique de confidentialité</a> 
          et nos 
          <a href="https://vie-privee.umontreal.ca/conditions-dutilisation" target="_blank" rel="noopener noreferrer">conditions d’utilisation</a>.
        </p>
        <div class="actions-container">
          <a href="#" @click="${() => this.showPreferences()}" class="consent-link">Personnaliser les témoins</a>
          <button class="btn--outlined" type="button" @click="${() => this.setConsentTokens(false)}">Tout refuser</button>
          <button class="btn--filled" type="button" @click="${() => this.setConsentTokens(true)}">Tout accepter</button>
        </div>
      </bib-consent-dialog>
    `
  }
}

if (!window.customElements.get('bib-consent-consent-dialog')) {
  window.customElements.define('bib-consent-consent-dialog', BibConsentConsentDialog)
}