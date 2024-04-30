import { Task } from '@lit/task'
import { LitElement, html, css, unsafeCSS } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import closeIcon from '../../icons/close_FILL0_wght400_GRAD0_opsz24.svg?raw'
import bibAvisStyles from './bib-avis.scss?inline'

console.log('bibAvisStyles: ', bibAvisStyles)

function isEmpty(node) {
  return node.textContent.trim() === ""
}

/**
 * Un avis
 * Affiche un avis
 */
export class BibAvis extends LitElement {
  static properties = {
    service: {
      type: String
    },
    contexte: {
      type: String,
      default: 'site-web'
    },
    niveau: {
      type: String
    },
    boutonFermer: {
      type: Boolean,
      attribute: 'bouton-fermer'
    }
  }

  static styles = [
    css`${unsafeCSS(bibAvisStyles)}`,
    css`
    `
  ]

  constructor() {
    super()

    this.service = 'https://avis.bib.umontreal.ca'
    this.contexte = 'site-web-dev'
    this.niveau = 'important'
    this.boutonFermer = false
  }

  _onBtnFermerClick() {
    alert('Fonction à venir!')
  }

  _renderBoutonFermer() {
    return this.boutonFermer ? html`<button class="btn-close" aria-label="Fermer" @click="${this._onBtnFermerClick}">${unsafeHTML(closeIcon)}</button>` : null
  }

  _renderAvis(message) {
    return message ? html`<aside class="container"><div class="inner"><div class="message">${unsafeHTML(message)}</div>${this._renderBoutonFermer()}</div></aside>` : null
  }

  _avisTask = new Task(this, {
    task: async ([service, contexte, niveau], { signal }) => {
      const url = new URL(`${contexte}/${niveau}`, service)
      const response = await fetch(url, {
        headers: {
          "Accept": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        signal
      })
      if (!response.ok) {
        throw new Error(reaponse.status)
      }
      return response.json()
    },
    args: () => [this.service, this.contexte, this.niveau]
  })

  _renderRemote() {
    return this._avisTask.render({
      pending: () => html``,
      complete: (avis) => this._renderAvis(avis.message),
      error: e => {
        console.log(e)
        return null
      }
    })
  }

  _renderLocal() {
    return this._renderAvis(`<slot />`)
  }

  render() {
    return isEmpty(this) ? this._renderRemote() : this._renderLocal()
  }
}

customElements.define('bib-avis', BibAvis)