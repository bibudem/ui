var o = Object.defineProperty;
var c = (i, e, r) => e in i ? o(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[e] = r;
var s = (i, e, r) => (c(i, typeof e != "symbol" ? e + "" : e, r), r);
import { LitElement as n, css as a, html as l } from "lit";
class t extends n {
  render() {
    return l`<div class="MuiBox-root css-kcpkpn"><div class="MuiBox-root css-u1i69a"></div><div class="MuiBox-root css-1t18xo2"><div class="MuiBox-root css-fmkxm3"><a aria-current="page" class="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineHover css-1bs4s4q" href="/">Politique de confidentialité</a></div><div class="MuiBox-root css-fmkxm3"><a aria-current="page" class="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineHover css-1bs4s4q" href="/">Paramètres des témoins</a></div><div class="MuiBox-root css-fmkxm3"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/" style="margin:0;font-size:inherit;font-weight:inherit;line-height:inherit"><span property="dct:title">Ce site</span> est sous licence <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" class="css-nn640c">CC BY 4.0<img style="height:1.125em;margin-left:3px;vertical-align:text-bottom" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"> <img style="height:1.125em;margin-left:3px;vertical-align:text-bottom" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a></p></div></div></div>`;
  }
}
s(t, "styles", a`:host{color:var(--bib-footer-text-color,#fff);display:flex;width:100%;background-color:var(--bib-palette-primary-main,#0057ac)}`);
window.customElements.define("bib-footer-copyright", t);
export {
  t as BibFooterCopyright
};
//# sourceMappingURL=bib-footer-copyright.js.map
