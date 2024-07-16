/**
 * Librairie du system desing des Bibliothèques de l'Université de Montréal
 * @module @bibudem/ui
 * @version 0.10.1
 * @author Christian Rémillard <christian.remillard@umontreal.ca>
 * @license ISC
 * @see https://github.com/bibudem/ui
 */
const t=require("./lit-element-BHNMc-Kg.cjs"),e=require("./directive-DpiRyOsV.cjs");function r(t,e,r,i){var s,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(n<3?s(o):n>3?s(e,r,o):s(e,r))||o);return n>3&&o&&Object.defineProperty(e,r,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=t=>(e,r)=>{void 0!==r?r.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)},s={attribute:!0,type:String,converter:t.u,reflect:!1,hasChanged:t.f},n=(t=s,e,r)=>{const{kind:i,metadata:n}=r;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),o.set(r.name,t),"accessor"===i){const{name:i}=r;return{set(r){const s=e.get.call(this);e.set.call(this,r),this.requestUpdate(i,s,t)},init(e){return void 0!==e&&this.P(i,void 0,t),e}}}if("setter"===i){const{name:i}=r;return function(r){const s=this[i];e.call(this,r),this.requestUpdate(i,s,t)}}throw Error("Unsupported decorator location: "+i)};function o(t){return(e,r)=>"object"==typeof r?n(t,e,r):((t,e,r)=>{const i=e.hasOwnProperty(r);return e.constructor.createProperty(r,i?{...t,wrapped:!0}:t),i?Object.getOwnPropertyDescriptor(e,r):void 0})(t,e,r)
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */}function a(t){return o({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=(t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,r),r);function d(t,e){return(e,r,i)=>l(e,r,{get(){return e=this,e.renderRoot?.querySelector(t)??null;var e}})}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const c=Symbol("attachableController");let h;h=new MutationObserver((t=>{for(const e of t)e.target[c]?.hostConnected()}));class u{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(t){null===t?this.host.removeAttribute("for"):this.host.setAttribute("for",t)}get control(){return this.host.hasAttribute("for")?this.htmlFor&&this.host.isConnected?this.host.getRootNode().querySelector(`#${this.htmlFor}`):null:this.currentControl||this.host.parentElement}set control(t){t?this.attach(t):this.detach()}constructor(t,e){this.host=t,this.onControlChange=e,this.currentControl=null,t.addController(this),t[c]=this,h?.observe(t,{attributeFilter:["for"]})}attach(t){t!==this.currentControl&&(this.setCurrentControl(t),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(t){this.onControlChange(this.currentControl,t),this.currentControl=t}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const p=["focusin","focusout","pointerdown"];class f extends t.s{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new u(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(t){this.attachableController.htmlFor=t}get control(){return this.attachableController.control}set control(t){this.attachableController.control=t}attach(t){this.attachableController.attach(t)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(t){if(!t[m]){switch(t.type){default:return;case"focusin":this.visible=this.control?.matches(":focus-visible")??!1;break;case"focusout":case"pointerdown":this.visible=!1}t[m]=!0}}onControlChange(t,e){for(const r of p)t?.removeEventListener(r,this),e?.addEventListener(r,this)}update(t){t.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(t)}}r([o({type:Boolean,reflect:!0})],f.prototype,"visible",void 0),r([o({type:Boolean,reflect:!0})],f.prototype,"inward",void 0);const m=Symbol("handledByFocusRing"),v=t.i`:host{animation-delay:0s,calc(var(--md-focus-ring-duration,600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration,600ms)*.25),calc(var(--md-focus-ring-duration,600ms)*.75);animation-timing-function:cubic-bezier(.2,0,0,1);box-sizing:border-box;color:var(--md-focus-ring-color,var(--md-sys-color-secondary,#625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) + var(--md-focus-ring-outward-offset,2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) + var(--md-focus-ring-outward-offset,2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) + var(--md-focus-ring-outward-offset,2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) + var(--md-focus-ring-outward-offset,2px));inset:calc(-1*var(--md-focus-ring-outward-offset,2px));outline:var(--md-focus-ring-width,3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) - var(--md-focus-ring-inward-offset,0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) - var(--md-focus-ring-inward-offset,0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) - var(--md-focus-ring-inward-offset,0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start,var(--md-focus-ring-shape,var(--md-sys-shape-corner-full,9999px))) - var(--md-focus-ring-inward-offset,0px));border:var(--md-focus-ring-width,3px) solid currentColor;inset:var(--md-focus-ring-inward-offset,0)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width,8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width,8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width,8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width,8px)}}@media(prefers-reduced-motion){:host{animation:none}}`
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let b=class extends f{};b.styles=[v],b=r([i("md-focus-ring")],b);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const g=e.e(class extends e.i{constructor(t){if(super(t),t.type!==e.t.ATTRIBUTE||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(e,[r]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in r)r[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(r)}const i=e.element.classList;for(const t of this.st)t in r||(i.remove(t),this.st.delete(t));for(const t in r){const e=!!r[t];e===this.st.has(t)||this.nt?.has(t)||(e?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return t.w}});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var y,C;(C=y||(y={}))[C.INACTIVE=0]="INACTIVE",C[C.TOUCH_DELAY=1]="TOUCH_DELAY",C[C.HOLDING=2]="HOLDING",C[C.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK";const x=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"],w=window.matchMedia("(forced-colors: active)");class I extends t.s{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=y.INACTIVE,this.checkBoundsAfterContextMenu=!1,this.attachableController=new u(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(t){this.attachableController.htmlFor=t}get control(){return this.attachableController.control}set control(t){this.attachableController.control=t}attach(t){this.attachableController.attach(t)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){const e={hovered:this.hovered,pressed:this.pressed};return t.x`<div class="surface ${g(e)}"></div>`}update(t){t.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(t)}handlePointerenter(t){this.shouldReactToEvent(t)&&(this.hovered=!0)}handlePointerleave(t){this.shouldReactToEvent(t)&&(this.hovered=!1,this.state!==y.INACTIVE&&this.endPressAnimation())}handlePointerup(t){if(this.shouldReactToEvent(t)){if(this.state!==y.HOLDING)return this.state===y.TOUCH_DELAY?(this.state=y.WAITING_FOR_CLICK,void this.startPressAnimation(this.rippleStartEvent)):void 0;this.state=y.WAITING_FOR_CLICK}}async handlePointerdown(t){if(this.shouldReactToEvent(t)){if(this.rippleStartEvent=t,!this.isTouch(t))return this.state=y.WAITING_FOR_CLICK,void this.startPressAnimation(t);this.checkBoundsAfterContextMenu&&!this.inBounds(t)||(this.checkBoundsAfterContextMenu=!1,this.state=y.TOUCH_DELAY,await new Promise((t=>{setTimeout(t,150)})),this.state===y.TOUCH_DELAY&&(this.state=y.HOLDING,this.startPressAnimation(t)))}}handleClick(){this.disabled||(this.state!==y.WAITING_FOR_CLICK?this.state===y.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation()):this.endPressAnimation())}handlePointercancel(t){this.shouldReactToEvent(t)&&this.endPressAnimation()}handleContextmenu(){this.disabled||(this.checkBoundsAfterContextMenu=!0,this.endPressAnimation())}determineRippleSize(){const{height:t,width:e}=this.getBoundingClientRect(),r=Math.max(t,e),i=Math.max(.35*r,75),s=Math.floor(.2*r),n=Math.sqrt(e**2+t**2)+10;this.initialSize=s,this.rippleScale=""+(n+i)/s,this.rippleSize=`${s}px`}getNormalizedPointerEventCoords(t){const{scrollX:e,scrollY:r}=window,{left:i,top:s}=this.getBoundingClientRect(),n=e+i,o=r+s,{pageX:a,pageY:l}=t;return{x:a-n,y:l-o}}getTranslationCoordinates(t){const{height:e,width:r}=this.getBoundingClientRect(),i={x:(r-this.initialSize)/2,y:(e-this.initialSize)/2};let s;return s=t instanceof PointerEvent?this.getNormalizedPointerEventCoords(t):{x:r/2,y:e/2},s={x:s.x-this.initialSize/2,y:s.y-this.initialSize/2},{startPoint:s,endPoint:i}}startPressAnimation(t){if(!this.mdRoot)return;this.pressed=!0,this.growAnimation?.cancel(),this.determineRippleSize();const{startPoint:e,endPoint:r}=this.getTranslationCoordinates(t),i=`${e.x}px, ${e.y}px`,s=`${r.x}px, ${r.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${i}) scale(1)`,`translate(${s}) scale(${this.rippleScale})`]},{pseudoElement:"::after",duration:450,easing:"cubic-bezier(0.2, 0, 0, 1)",fill:"forwards"})}async endPressAnimation(){this.rippleStartEvent=void 0,this.state=y.INACTIVE;const t=this.growAnimation;let e=1/0;"number"==typeof t?.currentTime?e=t.currentTime:t?.currentTime&&(e=t.currentTime.to("ms").value),e>=225?this.pressed=!1:(await new Promise((t=>{setTimeout(t,225-e)})),this.growAnimation===t&&(this.pressed=!1))}shouldReactToEvent(t){if(this.disabled||!t.isPrimary)return!1;if(this.rippleStartEvent&&this.rippleStartEvent.pointerId!==t.pointerId)return!1;if("pointerenter"===t.type||"pointerleave"===t.type)return!this.isTouch(t);const e=1===t.buttons;return this.isTouch(t)||e}inBounds({x:t,y:e}){const{top:r,left:i,bottom:s,right:n}=this.getBoundingClientRect();return t>=i&&t<=n&&e>=r&&e<=s}isTouch({pointerType:t}){return"touch"===t}async handleEvent(t){if(!w?.matches)switch(t.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(t);break;case"pointerdown":await this.handlePointerdown(t);break;case"pointerenter":this.handlePointerenter(t);break;case"pointerleave":this.handlePointerleave(t);break;case"pointerup":this.handlePointerup(t)}}onControlChange(t,e){for(const r of x)t?.removeEventListener(r,this),e?.addEventListener(r,this)}}r([o({type:Boolean,reflect:!0})],I.prototype,"disabled",void 0),r([a()],I.prototype,"hovered",void 0),r([a()],I.prototype,"pressed",void 0),r([d(".surface")],I.prototype,"mdRoot",void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const S=t.i`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}.surface,:host{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:transparent}.surface::after,.surface::before{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color,var(--md-sys-color-on-surface,#1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side,var(--md-ripple-pressed-color,var(--md-sys-color-on-surface,#1d1b20)) max(100% - 70px,65%),transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color,var(--md-sys-color-on-surface,#1d1b20));opacity:var(--md-ripple-hover-opacity,.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity,.12);transition-duration:105ms}`;let T=class extends I{};T.styles=[S],T=r([i("md-ripple")],T);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E=Symbol.for(""),A=t=>{if(t?.r===E)return t?._$litStatic$},k=(t,...e)=>({_$litStatic$:e.reduce(((e,r,i)=>e+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+t[i+1]),t[0]),r:E}),P=new Map,R=(t=>(e,...r)=>{const i=r.length;let s,n;const o=[],a=[];let l,d=0,c=!1;for(;d<i;){for(l=e[d];d<i&&void 0!==(n=r[d],s=A(n));)l+=s+e[++d],c=!0;d!==i&&a.push(n),o.push(l),d++}if(d===i&&o.push(e[i]),c){const t=o.join("$$lit$$");void 0===(e=P.get(t))&&(o.raw=o,P.set(t,e=o)),r=a}return t(e,...r)})(t.x),$=["ariaAtomic","ariaAutoComplete","ariaBusy","ariaChecked","ariaColCount","ariaColIndex","ariaColSpan","ariaCurrent","ariaDisabled","ariaExpanded","ariaHasPopup","ariaHidden","ariaInvalid","ariaKeyShortcuts","ariaLabel","ariaLevel","ariaLive","ariaModal","ariaMultiLine","ariaMultiSelectable","ariaOrientation","ariaPlaceholder","ariaPosInSet","ariaPressed","ariaReadOnly","ariaRequired","ariaRoleDescription","ariaRowCount","ariaRowIndex","ariaRowSpan","ariaSelected","ariaSetSize","ariaSort","ariaValueMax","ariaValueMin","ariaValueNow","ariaValueText"];
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function _(t){return t.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function L(t){for(const e of $)t.createProperty(e,{attribute:_(e),reflect:!0});t.addInitializer((t=>{const e={hostConnected(){t.setAttribute("role","presentation")}};t.addController(e)}))}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */$.map(_);const z=Symbol("internals"),O=Symbol("privateInternals");function F(t){return class extends t{get[z](){return this[O]||(this[O]=this.attachInternals()),this[O]}}}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function B(t){t.addInitializer((t=>{const e=t;e.addEventListener("click",(async t=>{const{type:r,[z]:i}=e,{form:s}=i;s&&"button"!==r&&(await new Promise((t=>{setTimeout(t)})),t.defaultPrevented||("reset"!==r?(s.addEventListener("submit",(t=>{Object.defineProperty(t,"submitter",{configurable:!0,enumerable:!0,get:()=>e})}),{capture:!0,once:!0}),i.setFormValue(e.value),s.requestSubmit()):s.reset()))}))}))}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function M(t,e=!0){return e&&"rtl"===getComputedStyle(t).getPropertyValue("direction").trim()}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const N=F(t.s);class j extends N{constructor(){super(...arguments),this.disabled=!1,this.flipIconInRtl=!1,this.href="",this.target="",this.ariaLabelSelected="",this.toggle=!1,this.selected=!1,this.type="submit",this.value="",this.flipIcon=M(this,this.flipIconInRtl)}get name(){return this.getAttribute("name")??""}set name(t){this.setAttribute("name",t)}get form(){return this[z].form}get labels(){return this[z].labels}willUpdate(){this.href&&(this.disabled=!1)}render(){const e=this.href?k`div`:k`button`,{ariaLabel:r,ariaHasPopup:i,ariaExpanded:s}=this,n=r&&this.ariaLabelSelected,o=this.toggle?this.selected:t.T;let a=t.T;return this.href||(a=n&&this.selected?this.ariaLabelSelected:r),R`<${e}
        class="icon-button ${g(this.getRenderClasses())}"
        id="button"
        aria-label="${a||t.T}"
        aria-haspopup="${!this.href&&i||t.T}"
        aria-expanded="${!this.href&&s||t.T}"
        aria-pressed="${o}"
        ?disabled="${!this.href&&this.disabled}"
        @click="${this.handleClick}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected?t.T:this.renderIcon()}
        ${this.selected?this.renderSelectedIcon():t.T}
        ${this.renderTouchTarget()}
        ${this.href&&this.renderLink()}
  </${e}>`}renderLink(){const{ariaLabel:e}=this;return t.x`
      <a
        class="link"
        id="link"
        href="${this.href}"
        target="${this.target||t.T}"
        aria-label="${e||t.T}"></a>
    `}getRenderClasses(){return{"flip-icon":this.flipIcon,selected:this.toggle&&this.selected}}renderIcon(){return t.x`<span class="icon"><slot></slot></span>`}renderSelectedIcon(){return t.x`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`}renderTouchTarget(){return t.x`<span class="touch"></span>`}renderFocusRing(){return t.x`<md-focus-ring
      part="focus-ring"
      for=${this.href?"link":"button"}></md-focus-ring>`}renderRipple(){return t.x`<md-ripple
      for=${this.href?"link":t.T}
      ?disabled="${!this.href&&this.disabled}"></md-ripple>`}connectedCallback(){this.flipIcon=M(this,this.flipIconInRtl),super.connectedCallback()}async handleClick(t){await 0,!this.toggle||this.disabled||t.defaultPrevented||(this.selected=!this.selected,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0})))}}L(j),B(j),j.formAssociated=!0,j.shadowRootOptions={mode:"open",delegatesFocus:!0},r([o({type:Boolean,reflect:!0})],j.prototype,"disabled",void 0),r([o({type:Boolean,attribute:"flip-icon-in-rtl"})],j.prototype,"flipIconInRtl",void 0),r([o()],j.prototype,"href",void 0),r([o()],j.prototype,"target",void 0),r([o({attribute:"aria-label-selected"})],j.prototype,"ariaLabelSelected",void 0),r([o({type:Boolean})],j.prototype,"toggle",void 0),r([o({type:Boolean,reflect:!0})],j.prototype,"selected",void 0),r([o()],j.prototype,"type",void 0),r([o({reflect:!0})],j.prototype,"value",void 0),r([a()],j.prototype,"flipIcon",void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const D=t.i`:host{display:inline-flex;outline:0;-webkit-tap-highlight-color:transparent;height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0,(48px - var(--_container-height))/2) max(0,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start:var(--_container-shape-start-start);--md-focus-ring-shape-start-end:var(--_container-shape-start-end);--md-focus-ring-shape-end-end:var(--_container-shape-end-end);--md-focus-ring-shape-end-start:var(--_container-shape-end-start)}:host([disabled]){pointer-events:none}.icon-button{place-items:center;background:0 0;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:0;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{height:100%;outline:0;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors:active){:host([disabled]){--_disabled-icon-opacity:1}}`;exports.IconButton=j,exports.__decorate=r,exports.e=l,exports.e$1=d,exports.e$2=g,exports.internals=z,exports.mixinElementInternals=F,exports.n=o,exports.requestUpdateOnAriaChange=L,exports.setupFormSubmitter=B,exports.styles=D,exports.t=i;
//# sourceMappingURL=shared-styles-Cv-nW515.cjs.map
