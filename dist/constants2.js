/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.2.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { n } from "./package-BDyrcNL-.js";
const e = `${n}/consent`, t = 2, o = "consent", a = { READY: "bib:ready", STATE: "bib:state", CHANGE: "bib:change", CLOSE: "bib:close" }, c = "bib-consent", s = "https://bib.umontreal.ca/consent/server/", i = { LOCAL: "local", REMOTE: "remote" }, b = 500, l = { analytics_consent: null, functionality_consent: null, ad_consent: null }, E = { INDETERMINATE: "indeterminate", DETERMINATE: "determinate" };
export {
  E as CONSENT_STATES,
  e as DB_NAME,
  o as DB_STORE_NAME,
  t as DB_VERSION,
  l as DEFAULT_PREFERENCES,
  a as EVENT_NAMES,
  c as PREFIX,
  s as SERVER_DEFAULT_URL,
  i as SERVER_MODE,
  b as SERVER_REQUEST_DEFAULT_TIMEOUT
};
//# sourceMappingURL=constants2.js.map
