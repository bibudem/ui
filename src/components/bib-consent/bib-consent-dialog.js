import { css, html, LitElement, nothing, unsafeCSS } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import { DEFAULT_PREFERENCES } from './constants.js'
import styles from './bib-consent-dialog.scss?inline'

function all(value) {
  return Object.keys(DEFAULT_PREFERENCES).reduce((prefs, prop) => ({ ...prefs, [prop]: value }), {})
}

export class BibConsentDialog extends LitElement {
  static properties = {
    debug: {
      type: Boolean,
      reflect: true
    },
    open: {
      type: Boolean,
      reflect: true
    },
    showClose: {
      type: Boolean,
      reflect: true,
      attribute: 'show-close'
    }
  }

  static styles = [
    css`${unsafeCSS(styles)}`
  ]

  constructor() {
    super()
    this.open = false
    this.showClose = this.showClose || false
    this._dialogRef = createRef()
  }

  connectedCallback() {
    super.connectedCallback()

    this._dialogRef.value?.addEventListener('close', () => this.close())
  }

  #showCloseButton() {
    return this.showClose ? html`
        <bib-button-close @click="${() => this.close()}" class="btn-close"></bib-button-close>
        ` : nothing
  }

  #show(mode = '') {
    if (this._dialogRef.value && !this._dialogRef.value.open) {
      mode === 'modal' ? this._dialogRef.value?.showModal() : this._dialogRef.value?.show()
      this.open = true
    }
  }

  show() {
    this.#show()
  }

  showModal() {
    this.#show('modal')
  }

  close() {
    this.open = false
    if (this._dialogRef.value && this._dialogRef.value.open) {
      this._dialogRef.value?.close()
    }
    this.dispatchEvent(new CustomEvent('bib:close'))
  }

  render() {
    return html`
      <dialog class="dialog" ${ref(this._dialogRef)}>
        ${this.#showCloseButton()}
        <div class="dialog-container">
          <div class="content-container">
            <slot></slot>
          </div>
        </div>
      </dialog>
    `
  }
}

if (!window.customElements.get('bib-consent-dialog')) {
  window.customElements.define('bib-consent-dialog', BibConsentDialog)
}