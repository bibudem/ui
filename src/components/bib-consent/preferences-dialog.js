import { css, html, LitElement, unsafeCSS } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import PerfectScrollbar from 'perfect-scrollbar'
import '@auroratide/toggle-switch/lib/define.js'
import { SERVER_MODE, DEFAULT_PREFERENCES } from './constants.js'
// import styles from './bib-consent.scss?inline'

export class PreferencesDialog extends LitElement {
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

  // static styles = [
  //   css`${unsafeCSS(styles)}`
  // ]

  #preferencesProxy
  #preferences

  constructor() {
    super()
    this.open = false
    this.consentPanelRef = createRef()
    this.preferencesPanelRef = createRef()
    this.consentDialogRef = createRef()
    this.#preferences = Object.keys(DEFAULT_PREFERENCES).reduce((obj, key) => ({ ...obj, [key]: false }), {})
  }

  get preferences() {
    return this.#preferences
  }

  setPreference(key, value) {
    if (!Object.keys(DEFAULT_PREFERENCES).includes(key)) {
      throw new Error(`${key} is not a valid key.`)
    }

    this.#preferences[key] = value
  }

  async savePreferences(preferences) {
    console.log(preferences)
    await this.#preferencesProxy.setPreferences(preferences)
  }

  async loadPreferences() {
    this.#preferences = await this.#preferencesProxy.getPreferences()
  }

  connectedCallback() {
    super.connectedCallback()
    const self = this
    this.debug = this.debug || false
    this.serverUrl = this.serverUrl || 'https://bib.umontreal.ca/consent/server'
    this.serverRequestTimeout = this.serverRequestTimeout || 500
    this.#preferencesProxy = new PreferencesProxy(this)
    this.#preferencesProxy.addEventListener.call(self, 'ready', event => {
      console.log('[#preferencesProxy] ready event: ', event)

      // this.#initScrollbars()

      this.dispatchEvent(new CustomEvent('bib:consent:ready'))

      if (event.detail) {
        this.#preferences = event.detail
      } else {
        this.show('consent')
      }
    })

    this.#preferencesProxy.addEventListener.call(self, 'update', event => {
      console.log('[#preferencesProxy] update event: ', event)

      this.#preferences = event.detail
    })

    console.log('ici: ', this.consentDialogRef.value)
  }

  #initScrollbars() {

    const scrollBarOptions = {
      maxScrollbarLength: 150,
      minScrollbarLength: 150,
      suppressScrollX: true
    }
    const consentPanel = this.renderRoot.querySelector('#consent-dialog .consent-container')
    console.log('consentPanel: ', this.consentPanelRef.value)
    const consentPanelScrollBar = new PerfectScrollbar(this.consentPanelRef.value, scrollBarOptions)
    const preferencesPanelScrollBar = new PerfectScrollbar(this.preferencesPanelRef.value, scrollBarOptions)

    console.log('preferencesPanelScrollBar: ', preferencesPanelScrollBar)
  }

  show(panel = 'consent') {
    console.log('[show] ', panel)
    if (typeof panel !== 'string' && !['consent', 'preferences'].includes(panel)) {
      throw new TypeError(`The panel argument must be a string of either values 'consent' or 'preferences'. `, panel)
    }

    this.open = true

    const newPanel = this.shadowRoot.querySelector(`#${panel}-dialog`)
    const newDialog = panel === 'consent' ? this.consentDialogRef.value : null

    if (newPanel) {
      this.shadowRoot.querySelector('dialog[open]')?.close()
      // newPanel.show()
    }
    newDialog.show()
  }

  render() {
    return html`
      <bib-consent-dialog id="preferences-dialog" class='modal-container step-two-container' ${ref(this.preferencesPanelRef)}>
          <div class="title">Personnaliser les témoins</div>
          <div class="personalized-cookies-description">
            <p>Les témoins (aussi appelés «&nbsp;cookies&nbsp;») sont de petits fichiers textes qui sont téléchargés lorsque vous consultez certaines pages d’un site et qui sont enregistrés dans la mémoire de l’appareil que vous utilisez. Ils permettent d’enregistrer certaines informations (type de navigateur, langue, pays, adresse IP, identifiant, etc.) afin d’être récupérées par le serveur lors de visites subséquentes. Ils sont utilisés pour mettre à jour et optimiser nos plateformes en fonction de l’utilisation que vous en faites et de vos besoins.</p>
            <p>L’UdeM collecte des données sur les plateformes, afin d’analyser leur utilisation et d’améliorer l’expérience des visiteurs.</p>
            <p>L’UdeM utilise également les services de <a href="https://vie-privee.umontreal.ca/ga" target="_blank"> Google Analytics</a>, afin d'analyser le trafic Web et de recueillir des données de navigation à des fins statistiques et d’amélioration des Plateformes.</p>
            <p>Parce que nous respectons votre droit à la vie privée, nous vous donnons la possibilité de ne pas autoriser certains types de témoins. Cliquez sur les différentes catégories pour obtenir plus de détails sur chacune d’entre elles et modifier les paramètres par défaut. Toutefois, si vous désactivez certains types de témoins, votre expérience de navigation et les services que nous sommes en mesure de vous offrir peuvent être impactés.</p>
          </div>
          <div class="accordion-container">
            <div class="accordion-list">
              <details class="accordion-item" data-id="" data-is-on-server-opened="false" style="--summary-height: 0px; --content-height: 0px;">
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

              <details class="accordion-item" data-id="" data-is-on-server-opened="false" style="--summary-height: 0px; --content-height: 0px;">
                <summary class="accordion-item__summary">
                  <div class="accordion-item__summary-title">Témoins de performance</div>
                  <div class="accordion-item__summary-icon">
                    <span class="close">+</span>
                    <span class="open">-</span>
                    <div class="toggle-container" @click="${event => { event.stopPropagation() }}">
                      <toggle-switch ?checked="${this.#preferences.performanceCookies}" @toggle-switch:change="${event => { this.setPreference('performanceCookies', event.detail.checked); event.stopPropagation() }}"></toggle-switch>
                    </div>
                  </div>
                </summary>
                <div class="accordion-item__content">
                  <p>Ces témoins sont utilisés pour analyser la navigation sur nos sites (provenance des visiteurs, fréquence des visites, pages plus ou moins visitées, etc.) dans le but d’en améliorer le fonctionnement et d’offrir une meilleure expérience utilisateurs aux visiteurs. Toutes les informations collectées par ces témoins sont agrégées et donc anonymisées.</p>
                </div>
              </details>

              <details class="accordion-item" data-id="" data-is-on-server-opened="false" style="--summary-height: 0px; --content-height: 0px;">
                <summary class="accordion-item__summary">
                  <span class="accordion-item__summary-title">Témoins de fonctionnalité</span>
                  <span class="accordion-item__summary-icon">
                    <span class="close">+</span>
                    <span class="open">-</span>
                    <div class="toggle-container" tabindex="0" aria-checked="false" role="switch"><input type="checkbox" id="toggle" name="toggle" value="true" style="display: none;">
                      <div class="toggle toggle-off"><span class="toggle-handle toggle-handle-off"></span><span class="toggle-label">&nbsp;</span></div>
                    </div>
                  </span>
                </summary>
                <div class="accordion-item__content">
                  <p>Ces témoins permettent d’améliorer les fonctionnalités et la personnalisation de nos sites. Par exemple, ils rendent possible l’utilisation de vidéos et de services de messagerie instantanée ou encore le partage de contenus de nos sites sur des plateformes de médias sociaux. Si vous désactivez ces témoins, votre expérience de navigation et les services que nous sommes en mesure de vous offrir peuvent être impactés.</p>
                </div>
              </details>
              <details class="accordion-item" data-id="" data-is-on-server-opened="false" style="--summary-height: 0px; --content-height: 0px;">
                <summary class="accordion-item__summary"><span class="accordion-item__summary-title">Témoins publicitaires</span><span class="accordion-item__summary-icon"><span class="close">+</span><span class="open">-</span>
                    <div class="toggle-container" tabindex="0" aria-checked="false" role="switch"><input type="checkbox" id="toggle" name="toggle" value="true" style="display: none;">
                      <div class="toggle toggle-off"><span class="toggle-handle toggle-handle-off"></span><span class="toggle-label">&nbsp;</span></div>
                    </div>
                  </span></summary>
                <div class="accordion-item__content">
                  <p>Ces témoins peuvent être activés sur nos sites web pour établir des profils sur vos intérêts. Ils nous aident à vous proposer des publicités et des contenus personnalisés. Si vous désactivez ces témoins, des publicités et des contenus moins ciblées sur vos intérêts vous seront proposés.</p>
                </div>
              </details>
            </div>
            <p class="update-information">Vous pouvez modifier en tout temps vos préférences en sélectionnant les paramètres appropriés dans votre navigateur pour accepter ou refuser les témoins.</p>
            <div class="btn-modal-container"><button type="button" class="btn-consent confirm-selection">Enregistrer mes préférences</button><button class="btn-consent" type="button">Tout refuser</button><button class="btn-consent" type="button">Tout accepter</button></div>
            <div class="learn-more-container">Voir notre <a href="https://vie-privee.umontreal.ca/confidentialite">politique de confidentialité</a> et nos <a href="https://vie-privee.umontreal.ca/conditions-dutilisation">conditions d’utilisation</a>. </div>
          </div>
        </div>
      </bib-consent-dialog>
    `
  }
}

customElements.define('preferences-dialog', PreferencesDialog)