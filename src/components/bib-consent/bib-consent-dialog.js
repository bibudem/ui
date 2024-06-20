import { css, html, LitElement, nothing, unsafeCSS } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import PerfectScrollbar from 'perfect-scrollbar'
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


  _containerRef = createRef()

  constructor() {
    super()
    this.open = false
    this.showClose = this.showClose || false
    this._dialogRef = createRef()
    // this._containerRef = createRef()
  }

  connectedCallback() {
    super.connectedCallback()
    console.log('this._dialogRef.value: ', this._dialogRef.value)
    console.log('this._dialogRef.value?.querySelector...:', this._dialogRef.value?.querySelector('> .content-container'))

    console.log('[connectedCallback] this._containerRef.value:', this._containerRef.value)
    this._dialogRef.value?.addEventListener('close', () => this.#close())
  }

  // firstUpdated() {
  //   console.log('[firstUpdated] this._containerRef.value:', this._containerRef.value)
  //   this.#initScrollbars()
  // }

  setPreferences(preferences) {
    this.dispatchEvent(new CustomEvent('update', { detail: preferences }))
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

  #close() {
    this.open = false
  }

  close() {
    if (this._dialogRef.value && this._dialogRef.value.open) {
      this._dialogRef.value?.close()
    }
  }

  #initScrollbars() {

    const scrollBarOptions = {
      maxScrollbarLength: 150,
      minScrollbarLength: 150,
      suppressScrollX: true
    }

    this.contentScrollBar = new PerfectScrollbar(this._containerRef.value, scrollBarOptions)
  }

  #handleOnCloseBtnClick(event) {
    this.dispatchEvent(new Event('close'))
  }

  #showCloseButton() {
    return this.showClose ? html`
        <bib-button-close @click="${this.#handleOnCloseBtnClick}" class="btn-close-modal"></bib-button-close>
        ` : nothing
  }

  showPreferences() {
    console.log('parent: ', this.parentElement)
    this.dispatchEvent(new CustomEvent('show-preferences'))
  }

  render() {
    return html`
      <dialog class='dialog' ${ref(this._dialogRef)}>
        ${this.#showCloseButton()}
        <div class="dialog-container">
          <slot></slot>
        </div>
      </dialog>
    `
  }
}

customElements.define('bib-consent-dialog', BibConsentDialog)