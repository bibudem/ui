import { Task } from '@lit/task'
import { LitElement, html, css, unsafeCSS } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { openDB } from 'idb'
import { nodeIsEmpty } from '@/utils/dom.js'
import { addToGlobalBib } from '@/utils/bib.js'
import { DB_NAME, DB_STORE_NAME, DB_VERSION } from './constants.js'
import closeIcon from '../../icons/close_FILL0_wght400_GRAD0_opsz24.svg?raw'
import bibAvisStyles from './bib-avis.scss?inline'

/**
 * Génère un hash SHA-256 pour un objet donné
 * @param {Object} obj - L'objet à hasher
 * @returns {Promise<string>} Le hash hexadécimal de l'objet
 */
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
 * Composant d'affichage d'avis pour les Bibliothèques de l'Université de Montréal
 * 
 * Ce composant Web personnalisé permet d'afficher des avis provenant d'un service distant
 * ou du contenu local. Il gère la persistance des avis via IndexedDB pour éviter
 * d'afficher plusieurs fois le même avis à l'utilisateur.
 * 
 * @element bib-avis
 * 
 * @fires bib:show - Émis avant l'affichage d'un avis. Peut être annulé.
 * @fires bib:hide - Émis avant le masquage d'un avis. Peut être annulé.
 * 
 * @slot - Contenu HTML local à afficher comme avis (optionnel)
 * 
 * @example
 * 
 * <!-- Avis depuis un service distant -->
 * <bib-avis service="https://avis.bib.umontreal.ca/api/avis" bouton-fermer></bib-avis>
 * 
 * <!-- Avis avec contenu local -->
 * <bib-avis bouton-fermer>
 *   <p>Ceci est un avis local important.</p>
 * </bib-avis>
 * 
 * 
 * @cssprop --bib-avis-background-color - Couleur de fond de l'avis
 * @cssprop --bib-avis-text-color - Couleur du texte de l'avis
 * @cssprop --bib-avis-border-color - Couleur de la bordure de l'avis
 */
export class BibAvis extends LitElement {
  /**
   * Propriétés réactives du composant
   */
  static properties = {
    /**
     * URL du service d'avis distant
     * @type {string}
     * @default 'https://avis.bib.umontreal.ca/api/avis'
     */
    service: {
      type: String
    },
    /**
     * Affiche ou masque le bouton de fermeture
     * @type {boolean}
     * @default false
     */
    boutonFermer: {
      type: Boolean,
      attribute: 'bouton-fermer'
    },
    /**
     * Message d'avis actuel (état interne)
     * @type {Object|null}
     * @private
     */
    message: {
      state: true
    }
  }

  static styles = [
    css`${unsafeCSS(bibAvisStyles)}`,
    css`
    `
  ]

  /**
   * Données de l'avis actuel
   * @type {Object|null}
   * @private
   */
  #avis

  /**
   * Instance de la base de données IndexedDB
   * @type {IDBDatabase|null}
   * @private
   */
  #db

  /**
   * Constructeur du composant BibAvis
   * Initialise les propriétés par défaut
   */
  constructor() {
    super()

    this.#avis = null
    this.service = 'https://avis.bib.umontreal.ca/api/avis'
    this.boutonFermer = false
  }

  /**
   * Crée et retourne une tâche pour récupérer les avis
   * @returns {Task} Tâche de récupération des avis
   * @private
   */
  #getAvis() {
    return new Task(this, {
      task: async ([service], { signal }) => {

        const doGetAvis = new Promise(async (resolve, reject) => {
          if (!nodeIsEmpty(this)) {
            return resolve({ isLocal: true, message: this.innerHTML.split(/<!--\?lit\$\d+\$-->/).join('') })
          }

          const url = new URL(service)
          const response = await fetch(url, {
            headers: {
              "Accept": "application/json",
            },
            signal
          })
            .catch(console.error)

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
      args: () => [this.service]
    })
  }

  /**
   * Traite les données d'avis récupérées et gère la persistance
   * @param {Object} avis - Données de l'avis à traiter
   * @param {string} avis.message - Contenu HTML du message
   * @param {boolean} [avis.isLocal] - Indique si l'avis provient du contenu local
   * @returns {Promise<void>}
   * @private
   */
  async #processAvis(avis) {
    if (!avis.message) {
      this.setMessage(null)
      return
    }

    if (!('indexedDB' in window)) {
      this.setMessage(avis.message)
      return
    }

    const db = this.#db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Checks if the object store exists:
        if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
          db.createObjectStore(DB_STORE_NAME)
        }
      }
    })

    try {
      const id = await hash(avis)
      const storedAvis = await db.get(DB_STORE_NAME, id)
      if (storedAvis) {
        if (!storedAvis.hidden) {
          // Delete old entries
          await db.delete(DB_STORE_NAME, id)
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

  /**
   * Affiche l'avis et le sauvegarde en base de données
   * @param {Object} avis - Données de l'avis à afficher
   * @returns {Promise<void>}
   * @private
   */
  async #show(avis) {

    const canceled = !this.dispatchEvent(new CustomEvent('bib:show', { bubbles: true, cancelable: true }))

    if (canceled) {
      return
    }

    this.setMessage(avis)

    if (this.#db) {
      const id = await hash(avis)
      await this.#db.put(DB_STORE_NAME, { ...avis, hidden: false }, id)
    }
  }

  /**
   * Masque l'avis et met à jour son statut en base de données
   * @returns {Promise<void>}
   * @private
   */
  async #hide() {

    const canceled = !this.dispatchEvent(new CustomEvent('bib:hide', { bubbles: true, cancelable: true }))

    if (canceled) {
      return
    }

    const id = await hash(this.#avis)
    await this.#db.put(DB_STORE_NAME, { ...this.#avis, hidden: true }, id)
    this.#avis = null
    this.requestUpdate()
  }

  /**
   * Méthode du cycle de vie appelée lorsque l'élément est connecté au DOM
   * Initialise la récupération des avis
   */
  connectedCallback() {
    super.connectedCallback()
    this.#getAvis()
  }

  /**
   * Gestionnaire de clic pour le bouton de fermeture
   * @private
   */
  #onBtnFermerClick() {
    this.#hide()
  }

  /**
   * Rendu conditionnel du bouton de fermeture
   * @returns {TemplateResult|null} Template du bouton ou null
   * @private
   */
  _renderBoutonFermer() {
    return this.boutonFermer ? html`<button class="btn-close" aria-label="Fermer" @click="${this.#onBtnFermerClick}">${unsafeHTML(closeIcon)}</button>` : null
  }

  /**
   * Tâche alternative pour la récupération d'avis (non utilisée actuellement)
   * @type {Task}
   * @private
   */
  _avisTask = new Task(this, {
    task: async ([service], { signal }) => {
      const url = new URL(service)
      const response = await fetch(url, {
        headers: {
          "Accept": "application/json",
        },
        signal
      })
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
    },
    args: () => [this.service]
  })

  /**
   * Méthode de rendu du composant
   * @returns {TemplateResult|null} Template HTML de l'avis ou null si aucun message
   */
  render() {
    return this.#avis?.message ? html`<aside class="container"><div class="inner"><div class="message">${unsafeHTML(this.#avis.message)}</div>${this._renderBoutonFermer()}</div></aside>` : null
  }

  /**
   * Définit le message d'avis à afficher
   * @param {string|Object|null} message - Message à afficher ou objet contenant le message
   * @public
   */
  setMessage(message) {
    this.#avis = typeof message === 'string' ? { message, isLocal: true } : message
  }
}

if (!window.customElements.get('bib-avis')) {
  window.customElements.define('bib-avis', BibAvis)
}

addToGlobalBib('avis', {})