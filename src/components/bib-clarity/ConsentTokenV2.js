export default class ConsentTokenV2 {
  constructor(consent) {
    if (typeof consent !== 'boolean' && typeof consent !== 'object') {
      throw new TypeError('The "consent" parameter must be a boolean or an object. Got %s.', typeof consent, consent)
    }

    if (typeof consent === 'boolean') {
      consent = {
        analytics_Storage: consent ? 'granted' : 'denied',
        ad_Storage: consent ? 'granted' : 'denied'
      }
    }
    const { analytics_Storage = 'denied', ad_consent = 'denied' } = consent

    this.analytics_Storage = analytics_Storage
    this.ad_Storage = ad_consent
  }
}