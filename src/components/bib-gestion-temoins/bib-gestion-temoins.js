import { css, html, LitElement, unsafeCSS } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import { callServer } from 'postmessage-promise'
import '../bib-button/bib-button-close.js'
import { getIframeServer, getServerMode, k } from './utils.js'
import styles from './bib-gestion-temoins.scss?inline'
import PreferencesProxy from './PreferencesProxy.js'

export class BibGestionTemoins extends LitElement {
  static properties = {
    serverUrl: {
      type: String,
      attribute: 'server-url'
    },
    serverRequestTimeout: {
      type: Number,
      attribute: 'server-request-timeout'
    },
    open: {
      type: Boolean,
      state: true
    },
    displayPanel: {
      type: String,
      state: true
    }
  }

  static styles = [
    css`${unsafeCSS(styles)}`
  ]

  consentRef = createRef()
  preferencesRef = createRef()
  #preferencesProxy

  constructor() {
    super()
    this.open = false
    this.displayPanel = ''
  }

  async setPreferences(preferences) {
    console.log(preferences)
    await this.#preferencesProxy.setPreferences(preferences)
  }

  async getPreferences() {

  }

  connectedCallback() {
    this.serverUrl = this.serverUrl || 'https://bib.umontreal.ca/gestion-temoins/server'
    this.serverRequestTimeout = this.serverRequestTimeout || 500
    this.#preferencesProxy = new PreferencesProxy(this.serverUrl)
    this.#preferencesProxy.addEventListener('proxy-ready', event => {
      console.log('[bib-gestion-temoins:constructor] proxy-ready event: ', event)
    })
  }

  // connectedCallback() {
  //   super.connectedCallback()

  //   this.connectServer()

  // }

  // async connectServer() {
  //   const serverMode = await getServerMode(this)
  //   console.log('serverMode: ', serverMode)
  //   const serverObject = getIframeServer(document.body, this.server)
  //   const { postMessage, listenMessage, destroy } = await callServer(serverObject)
  //   const preferences = await postMessage('getPreferences')
  //   console.log('Got response from server: ', preferences)
  //   if (preferences === null) {
  //     this.show()
  //   }
  // }

  show(mode = 'consent') {
    console.log('[show] ', mode)
    if (typeof mode !== 'string' && !['consent', 'preferences'].includes(mode)) {
      throw new TypeError(`The mode argument must be a string of either values 'consent' or 'preferences'. `, mode)
    }

    this.open = true
    this.displayPanel = mode

    if (mode === 'consent') {
      this.consentRef.value.show()
      if (this.preferencesRef.value.open) {
        this.preferencesRef.value.close()
      }
      return
    }

    this.preferencesRef.value.showModal()
    if (this.consentRef.value.open) {
      this.consentRef.value.close()
    }
  }

  renderConsent() {
    return html`
      <dialog class='modal-container' ${ref(this.consentRef)}>
        <div class="show-modal">
          <span>L’UdeM reconnaît l’importance de respecter la vie privée</span>
          <p>L’utilisation de témoins nous permet d’améliorer et de personnaliser votre expérience Web. Certains témoins sont obligatoires pour assurer le fonctionnement et la sécurité du site Web, alors que d’autres enregistrent vos préférences. En acceptant tout, vous consentez à notre utilisation de témoins pour mieux répondre à vos besoins.</p>
          <div class="btn-modal-container">
            <button class="btn-consent open-modal-parameter" type="button" @click="${() => this.show('preferences')}">Personnaliser les témoins <span>&gt;</span></button>
            <button class="btn-consent" type="button">Tout refuser</button>
            <button class="btn-consent" type="button">Tout accepter</button>
          </div>
          <div class="learn-more-container">
            Voir notre <a href="https://vie-privee.umontreal.ca/confidentialite">politique de confidentialité</a> et nos <a href="https://vie-privee.umontreal.ca/conditions-dutilisation">conditions d’utilisation</a>.
          </div>
        </div>
      </dialog>
    `
  }

  renderPreferences() {
    return html`
      <dialog class='modal-container' ${ref(this.preferencesRef)}>
        <div class="modal-container step-two-container" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <bib-button-close @click="${() => this.show('consent')}" class="btn-close-modal"></bib-button-close>
          <div class="preferences-container ps ps--active-y">
            <span>Personnaliser les témoins</span>
            <div class="personalized-cookies-description">
              <p>Les témoins (aussi appelés «&nbsp;cookies&nbsp;») sont de petits fichiers textes qui sont téléchargés lorsque vous consultez certaines pages d’un site et qui sont enregistrés dans la mémoire de l’appareil que vous utilisez. Ils permettent d’enregistrer certaines informations (type de navigateur, langue, pays, adresse IP, identifiant, etc.) afin d’être récupérées par le serveur lors de visites subséquentes. Ils sont utilisés pour mettre à jour et optimiser nos plateformes en fonction de l’utilisation que vous en faites et de vos besoins.</p>
              <p>L’UdeM collecte des données sur les plateformes, afin d’analyser leur utilisation et d’améliorer l’expérience des visiteurs.</p>
              <p>L’UdeM utilise également les services de <a href="https://vie-privee.umontreal.ca/ga" target="_blank"> Google Analytics</a>, afin d'analyser le trafic Web et de recueillir des données de navigation à des fins statistiques et d’amélioration des Plateformes.</p>
              <p>Parce que nous respectons votre droit à la vie privée, nous vous donnons la possibilité de ne pas autoriser certains types de témoins. Cliquez sur les différentes catégories pour obtenir plus de détails sur chacune d’entre elles et modifier les paramètres par défaut. Toutefois, si vous désactivez certains types de témoins, votre expérience de navigation et les services que nous sommes en mesure de vous offrir peuvent être impactés.</p>
            </div>
            <div class="accordion-container">
              <div class="accordion-list">
                <details class="accordion-item" data-id="" data-is-on-server-opened="false" style="--summary-height: 27px; --content-height: 0px;">
                  <summary class="accordion-item__summary"><span class="accordion-item__summary-title">Témoins nécessaires</span><span class="accordion-item__summary-icon"><span class="close">+</span><span class="open">-</span>
                      <div class="toggle-container label">Toujours activés</div>
                    </span></summary>
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
                <details class="accordion-item" data-id="" data-is-on-server-opened="false" style="--summary-height: 27px; --content-height: 0px;">
                  <summary class="accordion-item__summary"><span class="accordion-item__summary-title">Témoins de performance</span><span class="accordion-item__summary-icon"><span class="close">+</span><span class="open">-</span>
                      <div class="toggle-container" tabindex="0" aria-checked="false" role="switch"><input type="checkbox" id="toggle" name="toggle" value="true" style="display: none;">
                        <div class="toggle toggle-off"><span class="toggle-handle toggle-handle-off"></span><span class="toggle-label">&nbsp;</span><!--v-if--></div>
                      </div>
                    </span></summary>
                  <div class="accordion-item__content">
                    <p>Ces témoins sont utilisés pour analyser la navigation sur nos sites (provenance des visiteurs, fréquence des visites, pages plus ou moins visitées, etc.) dans le but d’en améliorer le fonctionnement et d’offrir une meilleure expérience utilisateurs aux visiteurs. Toutes les informations collectées par ces témoins sont agrégées et donc anonymisées.</p>
                  </div>
                </details>
                <details class="accordion-item" data-id="" data-is-on-server-opened="false" style="--summary-height: 27px; --content-height: 0px;">
                  <summary class="accordion-item__summary"><span class="accordion-item__summary-title">Témoins de fonctionnalité</span><span class="accordion-item__summary-icon"><span class="close">+</span><span class="open">-</span>
                      <div class="toggle-container" tabindex="0" aria-checked="false" role="switch"><input type="checkbox" id="toggle" name="toggle" value="true" style="display: none;">
                        <div class="toggle toggle-off"><span class="toggle-handle toggle-handle-off"></span><span class="toggle-label">&nbsp;</span><!--v-if--></div>
                      </div>
                    </span></summary>
                  <div class="accordion-item__content">
                    <p>Ces témoins permettent d’améliorer les fonctionnalités et la personnalisation de nos sites. Par exemple, ils rendent possible l’utilisation de vidéos et de services de messagerie instantanée ou encore le partage de contenus de nos sites sur des plateformes de médias sociaux. Si vous désactivez ces témoins, votre expérience de navigation et les services que nous sommes en mesure de vous offrir peuvent être impactés.</p>
                  </div>
                </details>
                <details class="accordion-item" data-id="" data-is-on-server-opened="false" style="--summary-height: 27px; --content-height: 0px;">
                  <summary class="accordion-item__summary"><span class="accordion-item__summary-title">Témoins publicitaires</span><span class="accordion-item__summary-icon"><span class="close">+</span><span class="open">-</span>
                      <div class="toggle-container" tabindex="0" aria-checked="false" role="switch"><input type="checkbox" id="toggle" name="toggle" value="true" style="display: none;">
                        <div class="toggle toggle-off"><span class="toggle-handle toggle-handle-off"></span><span class="toggle-label">&nbsp;</span><!--v-if--></div>
                      </div>
                    </span></summary>
                  <div class="accordion-item__content">
                    <p>Ces témoins peuvent être activés sur nos sites web pour établir des profils sur vos intérêts. Ils nous aident à vous proposer des publicités et des contenus personnalisés. Si vous désactivez ces témoins, des publicités et des contenus moins ciblées sur vos intérêts vous seront proposés.</p>
                  </div>
                </details>
              </div>
              <p class="update-information">Vous pouvez modifier en tout temps vos préférences en sélectionnant les paramètres appropriés dans votre navigateur pour accepter ou refuser les témoins.</p>
              <div class="btn-modal-container">
                <button type="button" class="btn-consent confirm-selection">Enregistrer mes préférences</button>
                <button class="btn-consent" type="button">Tout refuser</button>
                <button class="btn-consent" type="button">Tout accepter</button>
              </div>
              <div class="learn-more-container">
                Voir notre <a href="https://vie-privee.umontreal.ca/confidentialite">politique de confidentialité</a> et nos <a href="https://vie-privee.umontreal.ca/conditions-dutilisation">conditions d’utilisation</a>.
              </div>
            </div>
          </div>
        </div>
      </dialog>
    `
  }

  renderCloseButton() {
    return html`
      <bib-button-close @click="${this._onCloseBtnClick}" class="btn-close-modal"></bib-button-close>
    `
  }

  render() {
    return html`
        ${this.renderConsent()}
        ${this.renderPreferences()}
      </dialog>
    `
  }
}

customElements.define('bib-gestion-temoins', BibGestionTemoins)