import { Task } from '@lit/task'
import { LitElement, html, css, unsafeCSS } from 'lit'
import { SPACE_KEY, ENTER_KEY } from '../../constants'
import styles from './udem-urgence.scss?inline'

/**
 * Un avis
 * Affiche un avis
 */
export class UdeMUrgence extends LitElement {
  static properties = {
    service: {
      type: String
    },
    grand: {
      type: Boolean,
      // reflect: true
    },
    href: {
      type: String,
      attribute: false
    }
  }

  static styles = [
    css`${unsafeCSS(styles)}`
  ]

  constructor() {
    super()

    this.grand = false
    this.service = 'https://urgence.umontreal.ca/urgence-udem.json'
  }

  connectedCallback() {
    super.connectedCallback()
    this.render()
  }

  #urgenceTask = new Task(this, {
    task: async ([service], { signal }) => {
      const url = new URL(service)
      const response = await fetch(url, {
        headers: {
          "Accept": "application/json"
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

  #onTitleClick(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  #onActivate(event) {
    const isKeyboardActivateEvent = event.key === SPACE_KEY || event.key === ENTER_KEY

    if (isKeyboardActivateEvent || event.type === 'click') {
      window.open(this.href, '_blank')
    }
  }

  render() {
    return this.#urgenceTask.render({
      pending: () => null,
      complete: ({ bannerType, date, fullDay, headerLink, hour, title, url }) => {
        this.href = headerLink ?? url

        if (bannerType) {
          this.grand = bannerType === 'large'
        }

        return title && html`
          <aside class="wrapper" tabindex="0" @click="${this.#onActivate}" @keyup="${this.#onActivate}">
            <div class="container">
              <div class="content">
                <a class="title" href="${this.href}" @click="${this.#onTitleClick}" tabindex="-1">
                  <div>${title}</div>
                </a>
                <time datetime="${date}" class="datetime">
                  <span class="hour">${hour}</span>
                  <span> | </span>
                  <span classid="date">${fullDay}</span>
                </time>
              </div>
            </div>
          </aside>
      `},

    })
  }
}

customElements.define('udem-urgence', UdeMUrgence)