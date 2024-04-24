import { Task } from '@lit/task'
import { LitElement, css, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import closeIcon from '../../icons/close_FILL0_wght400_GRAD0_opsz24.svg?raw'

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
      type: Boolean
    }
  }

  static styles = css`
    :host,
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      background: var(--bib-avis-bg-color, #fffac6)
    }

    .inner {
      display: flex;
      align-items: center;
      max-width: 1220px;
      margin: 0 auto;
      padding: 11px 19px;
    }

    .message {
      flex-grow: 1;
      min-height: 24px;
    }

    .btn-close {
      display: inline-flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      background-color: transparent;
      outline: 0px;
      border: 0px;
      margin: 0px;
      cursor: pointer;
      user-select: none;
      vertical-align: middle;
      appearance: none;
      text-decoration: none;
      text-align: center;
      flex: 0 0 auto;
      font-size: 1.5rem;
      font-size: 36px;
      font-weight: 700;
      line-height: 1;
      position: relative;
      padding: 8px;
      padding: 0;
      border-radius: 50%;
      overflow: visible;
      color: var(--bib-btn-close-color, rgba(0, 0, 0, 0.4));
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .btn-close:hover {
      color: var(--bib-btn-close-hover-color, rgba(0, 0, 0, 0.8));
    }

    .btn-close::after {
      content: '';
      position: absolute;
      width: calc(100% + 16px);
      height: calc(100% + 16px);
      border-radius: 50%;
      background-color: transparent;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .btn-close:hover::after {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .btn-close > svg {
      fill: currentColor;
    }
  `

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
    return message ? html`<div class="container"><div class="inner"><div class="message">${unsafeHTML(message)}</div>${this._renderBoutonFermer()}</div></div>` : null
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