/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 1.1.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
import { u as e, h as r } from "./url-B0JPXU6k.js";
import { PREFIX as t, SERVER_REQUEST_DEFAULT_TIMEOUT as o, SERVER_MODE as n } from "./constants2.js";
function s(e2) {
  return `${t}-${e2}`;
}
function a(t2, o2) {
  const n2 = void 0 !== t2 ? t2 : document.body, a2 = e.resolveOrigin(o2), i2 = s("iframe");
  let l;
  return document.querySelector(`#${i2}`) ? l = document.querySelector(`#${i2}`) : (l = document.createElement("iframe"), l.id = i2, r(o2, "debug") ? l.style.cssText = "width: 100%; height: 100%; border: 0;" : (l.ariaHidden = true, l.tabIndex = -1, l.hidden = true, l.style.setProperty("display", "none")), n2.appendChild(l), l.src = o2), { server: l.contentWindow || l.contentDocument.parentWindow, origin: a2, iframe: l };
}
async function i(e2) {
  const r2 = e2.serverUrl, t2 = e2.serverRequestTimeout || o;
  if (!r2) return n.LOCAL;
  const s2 = new AbortController();
  let a2, i2;
  try {
    if (i2 = setTimeout(() => {
      console.warn(`Request timed out after ${t2}ms. Aborting request...`), s2.abort();
    }, t2), a2 = await fetch(r2, { signal: s2.signal }), a2.ok) return n.REMOTE;
  } catch (e3) {
    return console.error(e3), s2.signal.aborted ? (console.error(`Unable to locate server page. The request timed out after ${t2}ms. url: ${r2.href}`), n.LOCAL) : (console.error(`Unable to locate server page : ${r2.href}.`, e3), n.LOCAL);
  } finally {
    clearTimeout(i2);
  }
  throw new Error(`Unable to locate server page. The request failed with status code ${a2.status}. url: ${r2.href}`);
}
export {
  a as getIframeServer,
  s as getKeyName,
  i as getServerMode
};
//# sourceMappingURL=utils.js.map
