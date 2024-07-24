import { LitElement, css, html, unsafeCSS } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import closeIcon from '../../icons/close_24dp_FILL0_wght400_GRAD0_opsz24.svg?raw'
import styles from './bib-button-close.scss?inline'

export class BibButtonClose extends LitElement {

  static styles = [
    css`${unsafeCSS(styles)}`
  ]

  constructor() {
    super()
    this.addEventListener('click', this.handleClick)
  }

  handleClick() {
    const closeEvent = new MouseEvent('bib:close', { bubbles: true })
    this.dispatchEvent(closeEvent)
  }

  render() {
    return html`
      <button aria-label="fermer">
        ${unsafeHTML(closeIcon)}
      </button>
    `
  }
}

if (!window.customElements.get('bib-button-close')) {
  window.customElements.define('bib-button-close', BibButtonClose)
}