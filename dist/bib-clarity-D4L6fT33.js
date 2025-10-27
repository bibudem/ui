/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.3.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const t = { init(t2) {
  !function(t3) {
    try {
      return e2 = window, n = document, i = "clarity", r = "script", a = t3, void (n.getElementById("clarity-script") || (e2[i] = e2[i] || function() {
        (e2[i].q = e2[i].q || []).push(arguments);
      }, (c = n.createElement(r)).async = 1, c.src = "https://www.clarity.ms/tag/" + a + "?ref=npm", c.id = "clarity-script", (o = n.getElementsByTagName(r)[0]).parentNode.insertBefore(c, o)));
    } catch (t4) {
      return;
    }
    var e2, n, i, r, a, c, o;
  }(t2);
}, setTag(t2, e2) {
  window.clarity("set", t2, e2);
}, identify(t2, e2, n, i) {
  window.clarity("identify", t2, e2, n, i);
}, consent(t2 = true) {
  window.clarity("consent", t2);
}, upgrade(t2) {
  window.clarity("upgrade", t2);
}, event(t2) {
  window.clarity("event", t2);
} }, e = "@layer component{:host(hidden){display:none}}";
export {
  t as C,
  e as s
};
//# sourceMappingURL=bib-clarity-D4L6fT33.js.map
