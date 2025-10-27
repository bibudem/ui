/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
class e {
  constructor(e2) {
    if ("boolean" != typeof e2 && "object" != typeof e2) throw new TypeError('The "consent" parameter must be a boolean or an object. Got %s.', typeof e2, e2);
    "boolean" == typeof e2 && (e2 = { analytics_Storage: e2 ? "granted" : "denied", ad_Storage: e2 ? "granted" : "denied" });
    const { analytics_Storage: t = "denied", ad_consent: o = "denied" } = e2;
    this.analytics_Storage = t, this.ad_Storage = o;
  }
}
export {
  e as default
};
//# sourceMappingURL=ConsentTokenV2.js.map
