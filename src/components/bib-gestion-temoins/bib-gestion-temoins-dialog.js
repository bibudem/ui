import { css, html, LitElement, nothing, unsafeCSS } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import PerfectScrollbar from 'perfect-scrollbar'
import { DEFAULT_PREFERENCES } from './constants.js'
import styles from './bib-gestion-temoins-dialog.scss?inline'

function all(value) {
  return Object.keys(DEFAULT_PREFERENCES).reduce((prefs, prop) => ({ ...prefs, [prop]: value }), {})
}

export class BibGestionTemoinsDialog extends LitElement {
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
    this.showClose = false
    this.dialogRef = createRef()
  }

  connectedCallback() {
    super.connectedCallback()
    console.log('this.dialogRef.value: ', this.dialogRef.value)
    console.log('this.dialogRef.value?.querySelector...:', this.dialogRef.value?.querySelector('> .content-container'))
    this.#initScrollbars()
    this.dialogRef.value?.addEventListener('close', () => this.#close())
  }

  setPreferences(preferences) {
    this.dispatchEvent(new CustomEvent('update', { detail: preferences }))
  }

  show() {
    console.log('show')
    if (this.dialogRef.value && !this.dialogRef.value.open) {
      this.dialogRef.value?.show()
      this.open = true
    }

  }

  #close() {
    this.open = false
  }

  close() {
    if (this.dialogRef.value && this.dialogRef.value.open) {
      this.dialogRef.value?.close()
    }
  }

  #initScrollbars() {

    const scrollBarOptions = {
      maxScrollbarLength: 150,
      minScrollbarLength: 150,
      suppressScrollX: true
    }

    this.contentScrollBar = new PerfectScrollbar(this.dialogRef.value.querySelector('> .content-container'), scrollBarOptions)
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
      <dialog id="consent-dialog" class='modal-container' ${ref(this.dialogRef)}>
        ${this.#showCloseButton()}
        <div class="content-container">
          <slot></slot>
          </div>
        </div>
      </dialog>
    `
  }
}

customElements.define('bib-gestion-temoins-dialog', BibGestionTemoinsDialog)