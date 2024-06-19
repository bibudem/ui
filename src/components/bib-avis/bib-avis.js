import { Task } from '@lit/task'
import { LitElement, html, css, unsafeCSS } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { openDB } from 'idb'
import { nodeIsEmpty } from '@/utils/dom.js'
import { name as PKG_NAME } from '../../../package.json'
import closeIcon from '../../icons/close_FILL0_wght400_GRAD0_opsz24.svg?raw'
import bibAvisStyles from './bib-avis.scss?inline'

const DB_VERSION = 1
const STORE_NAME = 'avis'

async function hash(obj) {
  const utf8 = new TextEncoder().encode(JSON.stringify(obj))
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('')
  return hashHex
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
    },
    message: {
      state: true
    }
  }

  static styles = [
    css`${unsafeCSS(bibAvisStyles)}`,
    css`
    `
  ]

  #avis
  #db

  constructor() {
    super()

    this.#avis = null
    this.service = 'https://avis.bib.umontreal.ca'
    this.contexte = 'site-web-dev'
    this.niveau = 'important'
    this.boutonFermer = false
  }

  #getAvis() {
    return new Task(this, {
      task: async ([service, contexte, niveau], { signal }) => {

        const doGetAvis = new Promise(async (resolve, reject) => {
          if (!nodeIsEmpty(this)) {
            return resolve({ isLocal: true, message: this.innerHTML.split(/<!--\?lit\$\d+\$-->/).join('') })
          }

          const url = new URL(`${contexte}/${niveau}`, service)
          const response = await fetch(url, {
            headers: {
              "Accept": "application/json",
            },
            signal
          })

          if (!response.ok) {
            return reject(new Error(response.status))
          }

          const { message } = await response.json()

          resolve({ isLocal: false, message })
        })

        try {
          const data = await doGetAvis
          await this.#processAvis(data)
        } catch (error) {
          console.error('[#getAvis] An error occured: %o', error)
        }

        return data
      },
      args: () => [this.service, this.contexte, this.niveau]
    })
  }

  async #processAvis(avis) {
    if (!avis.message) {
      this.setMessage(null)
      return
    }

    if (!('indexedDB' in window)) {
      this.setMessage(avis.message)
      return
    }

    const db = this.#db = await openDB(PKG_NAME, DB_VERSION, {
      upgrade(db) {
        // Checks if the object store exists:
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME)
        }
      }
    })

    try {
      const id = await hash(avis)
      const storedAvis = await db.get(STORE_NAME, id)
      if (storedAvis) {
        if (!storedAvis.hidden) {
          // Delete old entries
          await db.delete(STORE_NAME, id)
          this.#show(storedAvis)
        }
      } else {
        this.#show(avis)
      }
    } catch (error) {
      console.error('Something went wrong with indexedDB: %o', error)
      this.setMessage(avis.message)
    }
  }

  async #show(avis) {

    const canceled = !this.dispatchEvent(new CustomEvent('bib:show', { bubbles: true, cancelable: true }))

    if (canceled) {
      return
    }

    this.setMessage(avis)

    if (this.#db) {
      const id = await hash(avis)
      await this.#db.put(STORE_NAME, { ...avis, hidden: false }, id)
    }
  }

  async #hide() {

    const canceled = !this.dispatchEvent(new CustomEvent('bib:hide', { bubbles: true, cancelable: true }))

    if (canceled) {
      return
    }

    const id = await hash(this.#avis)
    await this.#db.put(STORE_NAME, { ...this.#avis, hidden: true }, id)
    this.#avis = null
    this.requestUpdate()
  }

  connectedCallback() {
    super.connectedCallback()
    this.#getAvis()
  }

  #onBtnFermerClick() {
    this.#hide()
  }

  _renderBoutonFermer() {
    return this.boutonFermer ? html`<button class="btn-close" aria-label="Fermer" @click="${this.#onBtnFermerClick}">${unsafeHTML(closeIcon)}</button>` : null
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
        throw new Error(response.status)
      }
      return response.json()
    },
    args: () => [this.service, this.contexte, this.niveau]
  })

  render() {
    return this.#avis?.message ? html`<aside class="container"><div class="inner"><div class="message">${unsafeHTML(this.#avis.message)}</div>${this._renderBoutonFermer()}</div></aside>` : null
  }

  setMessage(message) {
    this.#avis = typeof message === 'string' ? { message, isLocal: true } : message
  }
}

customElements.define('bib-avis', BibAvis)