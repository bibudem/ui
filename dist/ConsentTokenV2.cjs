/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
module.exports=class{constructor(e){if("boolean"!=typeof e&&"object"!=typeof e)throw new TypeError('The "consent" parameter must be a boolean or an object. Got %s.',typeof e,e);"boolean"==typeof e&&(e={analytics_Storage:e?"granted":"denied",ad_Storage:e?"granted":"denied"});const{analytics_Storage:o="denied",ad_consent:t="denied"}=e;this.analytics_Storage=o,this.ad_Storage=t}};
//# sourceMappingURL=ConsentTokenV2.cjs.map
