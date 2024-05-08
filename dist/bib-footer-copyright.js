/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.6.0
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { L as e, c as s, h as i } from "./lit-element-BtQrDsEd.js";
class r extends e {
  render() {
    return i`<div class="MuiBox-root css-kcpkpn"><div class="MuiBox-root css-u1i69a"></div><div class="MuiBox-root css-1t18xo2"><div class="MuiBox-root css-fmkxm3"><a aria-current="page" class="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineHover css-1bs4s4q" href="/">Politique de confidentialité</a></div><div class="MuiBox-root css-fmkxm3"><a aria-current="page" class="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineHover css-1bs4s4q" href="/">Paramètres des témoins</a></div><div class="MuiBox-root css-fmkxm3"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/" style="margin:0;font-size:inherit;font-weight:inherit;line-height:inherit"><span property="dct:title">Ce site</span> est sous licence <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" class="css-nn640c">CC BY 4.0<img style="height:1.125em;margin-left:3px;vertical-align:text-bottom" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"> <img style="height:1.125em;margin-left:3px;vertical-align:text-bottom" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p></div></div></div>`;
  }
}
__publicField(r, "styles", s`:host{color:var(--bib-footer-text-color,#fff);display:flex;width:100%;background-color:var(--bib-palette-primary-main,#0057ac)}`);
window.customElements.define("bib-footer-copyright", r);
export {
  r as BibFooterCopyright
};
//# sourceMappingURL=bib-footer-copyright.js.map
