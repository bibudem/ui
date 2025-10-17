import { css, html, LitElement, nothing, unsafeCSS } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import styles from './bib-consent-dialog.scss?inline'
import { EVENT_NAMES } from './constants.js'

/**
 * A custom dialog element that can be shown or hidden, with an optional close button.
 * 
 * The dialog can be shown either as a modal or non-modal dialog. It dispatches a 'close' event when closed.
 * 
 * @property {boolean} debug - Indicates whether the dialog is in debug mode.
 * @property {boolean} open - Indicates whether the dialog is currently open.
 * @property {boolean} showClose - Indicates whether a close button should be displayed.
 */
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

  /**
   * Initializes the `BibConsentDialog` component.
   * 
   * This constructor sets the initial state of the component, including whether the dialog is open and whether a close button should be displayed.
   * 
   * The `_dialogRef` property is a reference to the dialog element, which is used to control the dialog's visibility and behavior.
   */
  constructor() {
    super()
    this.open = false
    this.showClose = this.showClose || false
    this._dialogRef = createRef()
  }

  /**
   * Adds an event listener to the dialog element to listen for the 'close' event, and calls the `close()` method when the dialog is closed.
   * 
   * This method is called when the component is connected to the DOM, and sets up the necessary event listener to handle the dialog's closing.
   */
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

  /**
   * Shows the dialog.
   * 
   * This method sets the `open` property to `true` and calls the `show()` method on the dialog element to display it.
   */
  show() {
    this.#show()
  }

  /**
   * Shows the dialog in modal mode.
   * 
   * This method sets the `open` property to `true` and calls the `showModal()` method on the dialog element to display it in modal mode.
   */
  showModal() {
    this.#show('modal')
  }

  /**
   * Closes the dialog and optionally dispatches a 'close' event.
   * 
   * This method sets the `open` property to `false` and calls the `close()` method on the dialog element to hide it. If the `emit` parameter is `true`, it also dispatches a 'close' event that bubbles up and is composed.
   * 
   * @param {boolean} [emit=true] - Whether to dispatch a 'close' event.
   * @emits bib:close - Emits a 'bib:close' event.
   */
  close() {
    this.open = false
    if (this._dialogRef.value && this._dialogRef.value.open) {
      this._dialogRef.value?.close()
    }
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