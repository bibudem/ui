import { css, html, LitElement, unsafeCSS } from 'lit'
import { ContextConsumer, ContextProvider } from '@lit/context'
import { createRef, ref } from 'lit/directives/ref.js'
import { isBoolean } from 'lodash-es'
import '@auroratide/toggle-switch/lib/define.js'
import { consentContext } from './consent-context.js'
import { DEFAULT_PREFERENCES } from './constants.js'
import styles from './bib-consent-preferences-dialog.scss?inline'

/**
 * Generates an object with the default consent preferences, where each key is set to the provided boolean value.
 *
 * @param {boolean} value - The boolean value to set for each consent preference.
 * @returns {Object} An object with the default consent preferences, where each key is set to the provided value.
 */
function getConsentValues(value) {
  return Object.keys(DEFAULT_PREFERENCES).reduce((obj, key) => ({ ...obj, [key]: value }), {})
}

export class BibConsentPreferencesDialog extends LitElement {
  static properties = {
    debug: {
      type: Boolean,
      reflect: true
    },
    open: {
      type: Boolean,
      state: true
    },
  }

  static styles = [
    css`${unsafeCSS(styles)}`
  ]

  _consentConsumer
  #toggleChoices = getConsentValues(false)

  /**
   * Constructs a new `BibConsentPreferencesDialog` instance.
   *
   * This constructor initializes the component's state, creates a reference to the dialog element, and subscribes to the consent context to retrieve the user's consent preferences.
   *
   * The `open` property is initially set to `false`, and the `#toggleChoices` property is initialized based on the consent context value. If the consent context value is `null`, `#toggleChoices` is set to the default consent preferences.
   */
  constructor() {
    super()
    this.open = false
    this._dialogRef = createRef()
    this._consentConsumer = new ContextConsumer(this, {
      context: consentContext, subscribe: true, callback: value => {
        this.#toggleChoices = value === null ? getConsentValues(false) : value
        // this.requestUpdate()
      }
    })
  }

  /**
   * Saves the user's consent preferences.
   *
   * @param {boolean|Object} preference - The consent preferences to save. If a boolean is provided, it will be used to generate a full set of consent values. If an object is provided, it will be used directly as the consent preferences.
   * @returns {void}
   * @throws {Error} If there is an error saving the preferences.
   */
  async savePreferences(preference) {
    try {
      let preferences

      if (isBoolean(preference)) {
        preferences = getConsentValues(preference)
      } else {
        preferences = this.#toggleChoices
      }

      this.dispatchEvent(new CustomEvent('update', { detail: preferences }))
    } catch (error) {
      console.error('[savePreferences] error: ', error)
      throw error
    }
  }

  /**
   * Shows the consent preferences dialog.
   *
   * This method retrieves the user's consent preferences from the consent context and initializes the `#toggleChoices` property with the values. It then shows the dialog modal.
   *
   * @returns {void}
   */
  show() {
    this.#toggleChoices = this._consentConsumer.value ? { ...this._consentConsumer.value } : getConsentValues(false)
    this._dialogRef.value?.showModal()
  }

  /**
   * Closes the dialog and optionally emits an event.
   *
   * @param {boolean} [emit=true] - Whether to emit the 'close' event when the dialog is closed.
   * @returns {void}
   */
  close(emit = true) {
    this._dialogRef.value?.close(emit)
  }

  #onDetailsClick(event) {
    // Prevent the <details> element to open if user clics on the toggle button
    if (event.composedPath().some(node => node.matches?.('toggle-switch.switch'))) {
      event.preventDefault()
    }
  }

  #onToggleSwitchChange(event) {
    const { target, detail } = event
    const { checked } = detail
    const name = target.getAttribute('name')
    this.#toggleChoices[name] = checked
  }

  render() {

    return html`
      <bib-consent-dialog show-close class='preferences-dialog' ${ref(this._dialogRef)}>
        <div class="content-container">
          <div class="title">Personnaliser les témoins</div>
          <div class="personalized-cookies-description">
            <p>Les témoins (aussi appelés «&nbsp;cookies&nbsp;») sont de petits fichiers textes qui sont téléchargés lorsque vous consultez certaines pages d’un site et qui sont enregistrés dans la mémoire de l’appareil que vous utilisez. Ils permettent d’enregistrer certaines informations (type de navigateur, langue, pays, adresse IP, identifiant, etc.) afin d’être récupérées par le serveur lors de visites subséquentes. Ils sont utilisés pour mettre à jour et optimiser nos plateformes en fonction de l’utilisation que vous en faites et de vos besoins.</p>
            <p>L’UdeM collecte des données sur les plateformes, afin d’analyser leur utilisation et d’améliorer l’expérience des visiteurs.</p>
            <p>L’UdeM utilise également les services de <a href="https://vie-privee.umontreal.ca/ga" target="_blank"> Google Analytics</a>, afin d'analyser le trafic Web et de recueillir des données de navigation à des fins statistiques et d’amélioration des Plateformes.</p>
            <p>Parce que nous respectons votre droit à la vie privée, nous vous donnons la possibilité de ne pas autoriser certains types de témoins. Cliquez sur les différentes catégories pour obtenir plus de détails sur chacune d’entre elles et modifier les paramètres par défaut. Toutefois, si vous désactivez certains types de témoins, votre expérience de navigation et les services que nous sommes en mesure de vous offrir peuvent être impactés.</p>
          </div>
          <div class="accordion-container">
            <div class="accordion-list">
              <details class="accordion-item">
                <summary class="accordion-item__summary">
                  <span class="accordion-item__summary-title">Témoins nécessaires</span>
                  <span class="accordion-item__summary-icon">
                    <span class="close">+</span>
                    <span class="open">-</span>
                    <div class="toggle-container label">Toujours activés</div>
                  </span>
                </summary>
                <div class="accordion-item__content">
                  <p>Ces témoins sont essentiels au bon fonctionnement et à la sécurité de nos sites Web et services en ligne. Ils ne peuvent pas être désactivés. Ils nous permettent notamment de sécuriser votre connexion en recueillant vos informations d’identification, personnaliser votre interface (ex. : choix de langue) et conserver vos préférences.</p>
                  <p class="list-title">Les renseignements suivants sont notamment recueillis&nbsp;:</p>
                  <ul class="list-disc">
                    <li>le type et la version du navigateur;</li>
                    <li>le type et la version du système d’exploitation;</li>
                    <li>le type et le modèle d’appareil (téléphone, tablette ou ordinateur);</li>
                    <li>la résolution de l’écran de l’appareil que vous utilisez;</li>
                    <li>la langue utilisée par le navigateur.</li>
                  </ul>
                </div>
              </details>

              <details class="accordion-item" @click="${{ handleEvent: this.#onDetailsClick, capture: true }}">
                <summary class="accordion-item__summary">
                  <div class="accordion-item__summary-title">Témoins de performance</div>
                  <div class="accordion-item__summary-icon">
                    <span class="close">+</span>
                    <span class="open">-</span>
                    <div class="toggle-container">
                      <toggle-switch name="performanceCookies" class="switch" ?checked="${this.#toggleChoices.performanceCookies}" @toggle-switch:change="${this.#onToggleSwitchChange}"></toggle-switch>
                    </div>
                  </div>
                </summary>
                <div class="accordion-item__content">
                  <p>Ces témoins sont utilisés pour analyser la navigation sur nos sites (provenance des visiteurs, fréquence des visites, pages plus ou moins visitées, etc.) dans le but d’en améliorer le fonctionnement et d’offrir une meilleure expérience utilisateurs aux visiteurs. Toutes les informations collectées par ces témoins sont agrégées et donc anonymisées.</p>
                </div>
              </details>

              <details class="accordion-item" @click="${{ handleEvent: this.#onDetailsClick, capture: true }}">
                <summary class="accordion-item__summary">
                  <span class="accordion-item__summary-title">Témoins de fonctionnalité</span>
                  <span class="accordion-item__summary-icon">
                    <span class="close">+</span>
                    <span class="open">-</span>
                    <div class="toggle-container">
                      <toggle-switch name="functionalityCookies" class="switch" ?checked="${this.#toggleChoices.functionalityCookies}" @toggle-switch:change="${this.#onToggleSwitchChange}"></toggle-switch>
                    </div>
                  </span>
                </summary>
                <div class="accordion-item__content">
                  <p>Ces témoins permettent d’améliorer les fonctionnalités et la personnalisation de nos sites. Par exemple, ils rendent possible l’utilisation de vidéos et de services de messagerie instantanée ou encore le partage de contenus de nos sites sur des plateformes de médias sociaux. Si vous désactivez ces témoins, votre expérience de navigation et les services que nous sommes en mesure de vous offrir peuvent être impactés.</p>
                </div>
              </details>
              <details class="accordion-item" @click="${{ handleEvent: this.#onDetailsClick, capture: true }}">
                <summary class="accordion-item__summary"><span class="accordion-item__summary-title">Témoins publicitaires</span><span class="accordion-item__summary-icon"><span class="close">+</span><span class="open">-</span>
                    <div class="toggle-container">
                      <toggle-switch name="adsCookies" class="switch" ?checked="${this.#toggleChoices.adsCookies}" @toggle-switch:change="${this.#onToggleSwitchChange}"></toggle-switch>
                    </div>
                  </span></summary>
                <div class="accordion-item__content">
                  <p>Ces témoins peuvent être activés sur nos sites web pour établir des profils sur vos intérêts. Ils nous aident à vous proposer des publicités et des contenus personnalisés. Si vous désactivez ces témoins, des publicités et des contenus moins ciblées sur vos intérêts vous seront proposés.</p>
                </div>
              </details>
            </div>
            <p class="update-information">Vous pouvez modifier en tout temps vos préférences en sélectionnant les paramètres appropriés dans votre navigateur pour accepter ou refuser les témoins.</p>
            <div class="actions-container">
              <button class="btn--filled" type="button" @click="${() => this.savePreferences()}">Enregistrer mes préférences</button>
              <button class="btn--filled" type="button" @click="${() => this.savePreferences(false)}">Tout refuser</button>
              <button class="btn--filled" type="button" @click="${() => this.savePreferences(true)}">Tout accepter</button>
            </div>
            <div class="learn-more-container">Voir notre <a href="https://vie-privee.umontreal.ca/confidentialite">politique de confidentialité</a> et nos <a href="https://vie-privee.umontreal.ca/conditions-dutilisation">conditions d’utilisation</a>. </div>
          </div>
        </div>
      </bib-consent-dialog>
    `
  }
}

if (!window.customElements.get('bib-consent-preferences-dialog')) {
  window.customElements.define('bib-consent-preferences-dialog', BibConsentPreferencesDialog)
}