/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const t = { bubbles: true, composed: true };
function e(e2, n, o = {}) {
  return o = { ...t, ...o }, e2.dispatchEvent(new CustomEvent(n, o));
}
export {
  e as d
};
//# sourceMappingURL=events-BtF7lCmA.js.map
