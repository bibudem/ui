/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.2.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { u as e, h as r } from "./url-B0JPXU6k.js";
import { PREFIX as t, SERVER_REQUEST_DEFAULT_TIMEOUT as o, SERVER_MODE as n } from "./constants2.js";
function i(e2) {
  return `${t}-${e2}`;
}
function s(t2, o2) {
  const n2 = void 0 !== t2 ? t2 : document.body, s2 = e.resolveOrigin(o2), a2 = i("iframe");
  let c;
  return document.querySelector(`#${a2}`) ? c = document.querySelector(`#${a2}`) : (c = document.createElement("iframe"), c.id = a2, r(o2, "debug") ? c.style.cssText = "width: 100%; height: 100%; border: 0;" : (c.ariaHidden = true, c.tabIndex = -1, c.hidden = true, c.style.setProperty("display", "none")), n2.appendChild(c), c.src = o2), { server: c.contentWindow || c.contentDocument.parentWindow, origin: s2, iframe: c };
}
async function a(e2) {
  const r2 = e2.serverUrl, t2 = e2.serverRequestTimeout || o;
  if (!r2) return n.LOCAL;
  const i2 = new AbortController();
  let s2, a2;
  try {
    if (a2 = setTimeout(() => {
      console.warn(`Request timed out after ${t2}ms. Aborting request...`), i2.abort();
    }, t2), s2 = await fetch(r2, { signal: i2.signal }), s2.ok) return n.REMOTE;
  } catch (e3) {
    return i2.signal.aborted ? (console.error(`Unable to locate server page. The request timed out after ${t2}ms. url: ${r2.href}`), n.LOCAL) : (console.error(`Unable to locate server page : ${r2.href}.`, e3), n.LOCAL);
  } finally {
    clearTimeout(a2);
  }
}
export {
  s as getIframeServer,
  i as getKeyName,
  a as getServerMode
};
//# sourceMappingURL=utils.js.map
