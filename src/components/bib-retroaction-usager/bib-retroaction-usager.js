import { LitElement, css, html, unsafeCSS } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import '@material/web/button/filled-button.js'
import '@material/web/button/text-button.js'
import '@material/web/iconbutton/outlined-icon-button.js'
import '@material/web/progress/circular-progress.js'
import '@material/web/icon/icon.js'

import { VoteData } from './VotePayload'
import thumbUpIcon from '../../icons/thumb_up_24dp_FILL0_wght400_GRAD0_opsz24.svg?raw'
import thumbDownIcon from '../../icons/thumb_down_24dp_FILL0_wght400_GRAD0_opsz24.svg?raw'
import styles from './bib-retroaction-usager.scss?inline'
import { addToGlobalBib } from '@/utils/bib.js'

/**
 * Collecte les impressions d'usagers à propos de la page
 * en cours et les envoie à LibWizard.
 */
export class BibRetroactionUsager extends LitElement {

  static STATES = {
    INITIAL: 'initial',
    SUBMITTING: 'submitting',
    SUBMITTED: 'submitted',
    ERROR: 'error'
  }

  static properties = {
    state: {
      state: true
    },
    _vote: {
      state: true
    }
  }

  static styles = [
    css`${unsafeCSS(styles)}`
  ]

  #service

  constructor() {
    super()
    this.#service = 'https://umontreal.libwizard.com/api/v1/submission'
    this._vote = null
    this.state = 'loaded'
  }

  _onIconClick(event) {
    this._vote = event.target.selected ? event.target.value : null
  }

  async #onSubmit(event) {
    event.preventDefault()

    const submitBtn = event.submitter
    const data = new FormData(event.currentTarget)
    const vote = this.renderRoot.querySelector('.btn-vote[selected]').value

    return new Promise(async (resolve, reject) => {

      this.state = BibRetroactionUsager.STATES.SUBMITTING
      submitBtn.disabled = true

      fetch(`${this.#service}/getguid`)
        .then(async response => {
          if (!response.ok) {
            return reject(new Error('Could not fetch service. response: ', response))
          }

          resolve(await response.json())
        })
        .catch(reason => reject(`Could not GET /guid. Returned status: ${reason}`))
    })
      .then(async id => {
        const voteData = new VoteData(id)
        voteData.vote = vote
        voteData.comment = data.get('comment')

        await fetch(`${this.#service}/insertSubmission`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(voteData)
        })
          .catch(reason => {
            throw new Error('Could not POST vote: ', reason)
          })
      })
      .then(() => {
        this.state = BibRetroactionUsager.STATES.SUBMITTED

      })
      .catch(reason => {
        this.state = BibRetroactionUsager.STATES.ERROR
        console.error('Vote submission failed. ', reason)
      })
      .finally(() => {
        submitBtn.disabled = false
      })
  }

  #onReset() {
    this._vote = null
    this.state = BibRetroactionUsager.STATES.INITIAL
  }

  #renderSentForm() {
    if (this.state === 'submitted') {
      return html`
        <p>Merci! Nous avons reçu vos commentaires.</p>
      `
    }
    if (this.state === 'error') {
      return html`
        <p>Mmm, quelque chose s'est mal passé. Nous tâcherons de réparer le problème.</p>
      `
    }
  }

  #renderForm() {
    if (this.state === 'loaded') {
      return html`
        <form aria-live='polite' @submit="${this.#onSubmit}" @reset="${this.#onReset}">
          <div role="radiogroup" aria-labelledby="survey-title" class="radio-group">
            <md-outlined-icon-button id="btn-vote-y" class="btn-vote" value="oui" name="vote" type="button" toggle aria-label="oui"  @click="${this._onIconClick}" ?selected="${this._vote === 'oui'}">
              <md-icon>${unsafeHTML(thumbUpIcon)}</md-icon>
            </md-outlined-icon-button>
            <md-outlined-icon-button id="btn-vote-n" class="btn-vote" value="non" name="vote" type="button" toggle aria-label="non" @click="${this._onIconClick}" ?selected="${this._vote === 'non'}">
              <md-icon>${unsafeHTML(thumbDownIcon)}</md-icon>
            </md-outlined-icon-button>
          </div>
          ${this.#renderSurveyComment()}
        </form>
      `
    }
  }

  #renderSurveyComment() {
    if (this._vote) {

      return html`
        <p class="form-group">
          <label class="label width-full" for="survey-comment">
            <span>
            ${this._vote === 'oui' ? `Faites-nous savoir ce que nous faisons bien` : `Faites-nous savoir ce que nous pouvons faire mieux`}
            </span>
          </label>
          <textarea class="form-control input-sm width-full" name="comment" id="survey-comment"></textarea>
        </p>

        <p class="write-us f6 color-fg-muted">Si vous avez besoin d'une réponse, <a href="https://bib.umontreal.ca/nous-joindre" target="_blank">veuillez plutôt nous écrire</a>.</p>
        <div class="form-group-submit d-flex flex-justify-end flex-items-center mt-3">
          <md-text-button class="btn" type="reset">Annuler</md-text-button>
          <md-filled-button class="btn btn-submit">
            <span>
              Envoyer 
              <md-circular-progress class="progress" indeterminate></md-circular-progress>
            </span>
          </md-filled-button>
        </div>
      `
    }
  }

  render() {
    return html`
      <p id="survey-title" class="survey-title">Cette page vous a été utile?</p>
      ${this.#renderForm()}
      ${this.#renderSentForm()}
      `
  }
}

if (!window.customElements.get('bib-retroaction-usager')) {
  window.customElements.define('bib-retroaction-usager', BibRetroactionUsager)
}

addToGlobalBib('retroactionUsager', {})