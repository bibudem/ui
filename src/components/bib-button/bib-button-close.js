import { LitElement, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import '@material/web/iconbutton/icon-button.js'
import closeIcon from '../../icons/close_24dp_FILL0_wght400_GRAD0_opsz24.svg?raw'

export class BibButtonClose extends LitElement {

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
      <md-icon-button aria-label="fermer">
        ${unsafeHTML(closeIcon)}
      </md-icon-button>
    `
  }
}

if (!window.customElements.get('bib-button-close')) {
  window.customElements.define('bib-button-close', BibButtonClose)
}