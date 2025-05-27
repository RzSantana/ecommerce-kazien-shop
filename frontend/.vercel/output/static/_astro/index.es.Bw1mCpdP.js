import{g as kn,R as Le}from"./index.6otl1p8d.js";var pt={exports:{}},X={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var te;function Pn(){if(te)return X;te=1;var t=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(a,r,o){var i=null;if(o!==void 0&&(i=""+o),r.key!==void 0&&(i=""+r.key),"key"in r){o={};for(var s in r)s!=="key"&&(o[s]=r[s])}else o=r;return r=o.ref,{$$typeof:t,type:a,key:i,ref:r!==void 0?r:null,props:o}}return X.Fragment=e,X.jsx=n,X.jsxs=n,X}var ee;function On(){return ee||(ee=1,pt.exports=Pn()),pt.exports}var tt=On();const ne={primary:"bg-(--color-primary) hover:bg-[#FF3131]/70",secundary:"bg-[#F4F4F5] text-black hover:bg-[#F4F4F5]/70",outline:"border-1 border-gray-200/60 hover:border-transparent hover:bg-stone-800",destructive:"bg-[#7F1D1D] text-white hover:bg-[#7F1D1D]/70",ghost:"hover:bg-stone-800",link:"hover:underline hover:underline-offset-4"};function $r({id:t,icon:e,text:n,type:a,onClick:r,href:o}){return tt.jsx(tt.Fragment,{children:a!=="link"&&!o?tt.jsxs("button",{id:t,onClick:r,className:`
                    px-3 py-2 rounded-sm font-semibold
                    h-10
                    flex flex-row justify-center items-center gap-1
                    cursor-pointer
                    overflow-visible
                    [&>*]:h-full [&>*]:w-4
                    ${ne[a]}`,children:[e," ",n]}):tt.jsxs("a",{href:o,className:`
                    px-3 py-2 rounded-sm font-semibold
                    h-10
                    flex flex-row justify-center items-center gap-1
                    cursor-pointer
                    overflow-visible
                    [&>*]:h-full [&>*]:w-4
                    ${ne[a]}`,children:[e," ",n]})})}/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */function Sn(t,e,n){return(e=In(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function ae(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?ae(Object(n),!0).forEach(function(a){Sn(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ae(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function En(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var a=n.call(t,e);if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function In(t){var e=En(t,"string");return typeof e=="symbol"?e:e+""}const re=()=>{};let Ht={},je={},De=null,ze={mark:re,measure:re};try{typeof window<"u"&&(Ht=window),typeof document<"u"&&(je=document),typeof MutationObserver<"u"&&(De=MutationObserver),typeof performance<"u"&&(ze=performance)}catch{}const{userAgent:oe=""}=Ht.navigator||{},M=Ht,h=je,ie=De,et=ze;M.document;const _=!!h.documentElement&&!!h.head&&typeof h.addEventListener=="function"&&typeof h.createElement=="function",We=~oe.indexOf("MSIE")||~oe.indexOf("Trident/");var Tn=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Cn=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,Ye={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},Nn={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},Ue=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],A="classic",lt="duotone",Fn="sharp",_n="sharp-duotone",He=[A,lt,Fn,_n],Rn={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},Mn={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},Ln=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),jn={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},Dn=["fak","fa-kit","fakd","fa-kit-duotone"],se={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},zn=["kit"],Wn={kit:{"fa-kit":"fak"}},Yn=["fak","fakd"],Un={kit:{fak:"fa-kit"}},le={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},nt={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Hn=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],Gn=["fak","fa-kit","fakd","fa-kit-duotone"],$n={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Xn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},qn={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},Pt={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},Bn=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],Ot=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...Hn,...Bn],Vn=["solid","regular","light","thin","duotone","brands"],Ge=[1,2,3,4,5,6,7,8,9,10],Kn=Ge.concat([11,12,13,14,15,16,17,18,19,20]),Jn=[...Object.keys(qn),...Vn,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",nt.GROUP,nt.SWAP_OPACITY,nt.PRIMARY,nt.SECONDARY].concat(Ge.map(t=>"".concat(t,"x"))).concat(Kn.map(t=>"w-".concat(t))),Qn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}};const N="___FONT_AWESOME___",St=16,$e="fa",Xe="svg-inline--fa",z="data-fa-i2svg",Et="data-fa-pseudo-element",Zn="data-fa-pseudo-element-pending",Gt="data-prefix",$t="data-icon",fe="fontawesome-i2svg",ta="async",ea=["HTML","HEAD","STYLE","SCRIPT"],qe=(()=>{try{return!0}catch{return!1}})();function Q(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[A]}})}const Be=l({},Ye);Be[A]=l(l(l(l({},{"fa-duotone":"duotone"}),Ye[A]),se.kit),se["kit-duotone"]);const na=Q(Be),It=l({},jn);It[A]=l(l(l(l({},{duotone:"fad"}),It[A]),le.kit),le["kit-duotone"]);const ce=Q(It),Tt=l({},Pt);Tt[A]=l(l({},Tt[A]),Un.kit);const Xt=Q(Tt),Ct=l({},Xn);Ct[A]=l(l({},Ct[A]),Wn.kit);Q(Ct);const aa=Tn,Ve="fa-layers-text",ra=Cn,oa=l({},Rn);Q(oa);const ia=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],gt=Nn,sa=[...zn,...Jn],B=M.FontAwesomeConfig||{};function la(t){var e=h.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function fa(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}h&&typeof h.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,a]=e;const r=fa(la(n));r!=null&&(B[a]=r)});const Ke={styleDefault:"solid",familyDefault:A,cssPrefix:$e,replacementClass:Xe,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};B.familyPrefix&&(B.cssPrefix=B.familyPrefix);const G=l(l({},Ke),B);G.autoReplaceSvg||(G.observeMutations=!1);const c={};Object.keys(Ke).forEach(t=>{Object.defineProperty(c,t,{enumerable:!0,set:function(e){G[t]=e,V.forEach(n=>n(c))},get:function(){return G[t]}})});Object.defineProperty(c,"familyPrefix",{enumerable:!0,set:function(t){G.cssPrefix=t,V.forEach(e=>e(c))},get:function(){return G.cssPrefix}});M.FontAwesomeConfig=c;const V=[];function ca(t){return V.push(t),()=>{V.splice(V.indexOf(t),1)}}const R=St,I={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function ua(t){if(!t||!_)return;const e=h.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=h.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const o=n[r],i=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(a=o)}return h.head.insertBefore(e,a),t}const ma="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function K(){let t=12,e="";for(;t-- >0;)e+=ma[Math.random()*62|0];return e}function $(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function qt(t){return t.classList?$(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function Je(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function da(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(Je(t[n]),'" '),"").trim()}function ft(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function Bt(t){return t.size!==I.size||t.x!==I.x||t.y!==I.y||t.rotate!==I.rotate||t.flipX||t.flipY}function pa(t){let{transform:e,containerWidth:n,iconWidth:a}=t;const r={transform:"translate(".concat(n/2," 256)")},o="translate(".concat(e.x*32,", ").concat(e.y*32,") "),i="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),u={transform:"".concat(o," ").concat(i," ").concat(s)},f={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:u,path:f}}function ga(t){let{transform:e,width:n=St,height:a=St,startCentered:r=!1}=t,o="";return r&&We?o+="translate(".concat(e.x/R-n/2,"em, ").concat(e.y/R-a/2,"em) "):r?o+="translate(calc(-50% + ".concat(e.x/R,"em), calc(-50% + ").concat(e.y/R,"em)) "):o+="translate(".concat(e.x/R,"em, ").concat(e.y/R,"em) "),o+="scale(".concat(e.size/R*(e.flipX?-1:1),", ").concat(e.size/R*(e.flipY?-1:1),") "),o+="rotate(".concat(e.rotate,"deg) "),o}var ha=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function Qe(){const t=$e,e=Xe,n=c.cssPrefix,a=c.replacementClass;let r=ha;if(n!==t||a!==e){const o=new RegExp("\\.".concat(t,"\\-"),"g"),i=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");r=r.replace(o,".".concat(n,"-")).replace(i,"--".concat(n,"-")).replace(s,".".concat(a))}return r}let ue=!1;function ht(){c.autoAddCss&&!ue&&(ua(Qe()),ue=!0)}var ba={mixout(){return{dom:{css:Qe,insertCss:ht}}},hooks(){return{beforeDOMElementCreation(){ht()},beforeI2svg(){ht()}}}};const F=M||{};F[N]||(F[N]={});F[N].styles||(F[N].styles={});F[N].hooks||(F[N].hooks={});F[N].shims||(F[N].shims=[]);var T=F[N];const Ze=[],tn=function(){h.removeEventListener("DOMContentLoaded",tn),ot=1,Ze.map(t=>t())};let ot=!1;_&&(ot=(h.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(h.readyState),ot||h.addEventListener("DOMContentLoaded",tn));function ya(t){_&&(ot?setTimeout(t,0):Ze.push(t))}function Z(t){const{tag:e,attributes:n={},children:a=[]}=t;return typeof t=="string"?Je(t):"<".concat(e," ").concat(da(n),">").concat(a.map(Z).join(""),"</").concat(e,">")}function me(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var bt=function(e,n,a,r){var o=Object.keys(e),i=o.length,s=n,u,f,m;for(a===void 0?(u=1,m=e[o[0]]):(u=0,m=a);u<i;u++)f=o[u],m=s(m,e[f],f,e);return m};function va(t){const e=[];let n=0;const a=t.length;for(;n<a;){const r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const o=t.charCodeAt(n++);(o&64512)==56320?e.push(((r&1023)<<10)+(o&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function Nt(t){const e=va(t);return e.length===1?e[0].toString(16):null}function xa(t,e){const n=t.length;let a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function de(t){return Object.keys(t).reduce((e,n)=>{const a=t[n];return!!a.icon?e[a.iconName]=a.icon:e[n]=a,e},{})}function Ft(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=de(e);typeof T.hooks.addPack=="function"&&!a?T.hooks.addPack(t,de(e)):T.styles[t]=l(l({},T.styles[t]||{}),r),t==="fas"&&Ft("fa",e)}const{styles:J,shims:Aa}=T,en=Object.keys(Xt),wa=en.reduce((t,e)=>(t[e]=Object.keys(Xt[e]),t),{});let Vt=null,nn={},an={},rn={},on={},sn={};function ka(t){return~sa.indexOf(t)}function Pa(t,e){const n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!ka(r)?r:null}const ln=()=>{const t=a=>bt(J,(r,o,i)=>(r[i]=bt(o,a,{}),r),{});nn=t((a,r,o)=>(r[3]&&(a[r[3]]=o),r[2]&&r[2].filter(s=>typeof s=="number").forEach(s=>{a[s.toString(16)]=o}),a)),an=t((a,r,o)=>(a[o]=o,r[2]&&r[2].filter(s=>typeof s=="string").forEach(s=>{a[s]=o}),a)),sn=t((a,r,o)=>{const i=r[2];return a[o]=o,i.forEach(s=>{a[s]=o}),a});const e="far"in J||c.autoFetchSvg,n=bt(Aa,(a,r)=>{const o=r[0];let i=r[1];const s=r[2];return i==="far"&&!e&&(i="fas"),typeof o=="string"&&(a.names[o]={prefix:i,iconName:s}),typeof o=="number"&&(a.unicodes[o.toString(16)]={prefix:i,iconName:s}),a},{names:{},unicodes:{}});rn=n.names,on=n.unicodes,Vt=ct(c.styleDefault,{family:c.familyDefault})};ca(t=>{Vt=ct(t.styleDefault,{family:c.familyDefault})});ln();function Kt(t,e){return(nn[t]||{})[e]}function Oa(t,e){return(an[t]||{})[e]}function D(t,e){return(sn[t]||{})[e]}function fn(t){return rn[t]||{prefix:null,iconName:null}}function Sa(t){const e=on[t],n=Kt("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function L(){return Vt}const cn=()=>({prefix:null,iconName:null,rest:[]});function Ea(t){let e=A;const n=en.reduce((a,r)=>(a[r]="".concat(c.cssPrefix,"-").concat(r),a),{});return He.forEach(a=>{(t.includes(n[a])||t.some(r=>wa[a].includes(r)))&&(e=a)}),e}function ct(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=A}=e,a=na[n][t];if(n===lt&&!t)return"fad";const r=ce[n][t]||ce[n][a],o=t in T.styles?t:null;return r||o||null}function Ia(t){let e=[],n=null;return t.forEach(a=>{const r=Pa(c.cssPrefix,a);r?n=r:a&&e.push(a)}),{iconName:n,rest:e}}function pe(t){return t.sort().filter((e,n,a)=>a.indexOf(e)===n)}function ut(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e;let a=null;const r=Ot.concat(Gn),o=pe(t.filter(g=>r.includes(g))),i=pe(t.filter(g=>!Ot.includes(g))),s=o.filter(g=>(a=g,!Ue.includes(g))),[u=null]=s,f=Ea(o),m=l(l({},Ia(i)),{},{prefix:ct(u,{family:f})});return l(l(l({},m),Fa({values:t,family:f,styles:J,config:c,canonical:m,givenPrefix:a})),Ta(n,a,m))}function Ta(t,e,n){let{prefix:a,iconName:r}=n;if(t||!a||!r)return{prefix:a,iconName:r};const o=e==="fa"?fn(r):{},i=D(a,r);return r=o.iconName||i||r,a=o.prefix||a,a==="far"&&!J.far&&J.fas&&!c.autoFetchSvg&&(a="fas"),{prefix:a,iconName:r}}const Ca=He.filter(t=>t!==A||t!==lt),Na=Object.keys(Pt).filter(t=>t!==A).map(t=>Object.keys(Pt[t])).flat();function Fa(t){const{values:e,family:n,canonical:a,givenPrefix:r="",styles:o={},config:i={}}=t,s=n===lt,u=e.includes("fa-duotone")||e.includes("fad"),f=i.familyDefault==="duotone",m=a.prefix==="fad"||a.prefix==="fa-duotone";if(!s&&(u||f||m)&&(a.prefix="fad"),(e.includes("fa-brands")||e.includes("fab"))&&(a.prefix="fab"),!a.prefix&&Ca.includes(n)&&(Object.keys(o).find(d=>Na.includes(d))||i.autoFetchSvg)){const d=Ln.get(n).defaultShortPrefixId;a.prefix=d,a.iconName=D(a.prefix,a.iconName)||a.iconName}return(a.prefix==="fa"||r==="fa")&&(a.prefix=L()||"fas"),a}class _a{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(o=>{this.definitions[o]=l(l({},this.definitions[o]||{}),r[o]),Ft(o,r[o]);const i=Xt[A][o];i&&Ft(i,r[o]),ln()})}reset(){this.definitions={}}_pullDefinitions(e,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:o,iconName:i,icon:s}=a[r],u=s[2];e[o]||(e[o]={}),u.length>0&&u.forEach(f=>{typeof f=="string"&&(e[o][f]=s)}),e[o][i]=s}),e}}let ge=[],Y={};const H={},Ra=Object.keys(H);function Ma(t,e){let{mixoutsTo:n}=e;return ge=t,Y={},Object.keys(H).forEach(a=>{Ra.indexOf(a)===-1&&delete H[a]}),ge.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(o=>{typeof r[o]=="function"&&(n[o]=r[o]),typeof r[o]=="object"&&Object.keys(r[o]).forEach(i=>{n[o]||(n[o]={}),n[o][i]=r[o][i]})}),a.hooks){const o=a.hooks();Object.keys(o).forEach(i=>{Y[i]||(Y[i]=[]),Y[i].push(o[i])})}a.provides&&a.provides(H)}),n}function _t(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(Y[t]||[]).forEach(i=>{e=i.apply(null,[e,...a])}),e}function W(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];(Y[t]||[]).forEach(o=>{o.apply(null,n)})}function j(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return H[t]?H[t].apply(null,e):void 0}function Rt(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||L();if(e)return e=D(n,e)||e,me(un.definitions,n,e)||me(T.styles,n,e)}const un=new _a,La=()=>{c.autoReplaceSvg=!1,c.observeMutations=!1,W("noAuto")},ja={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return _?(W("beforeI2svg",t),j("pseudoElements2svg",t),j("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;c.autoReplaceSvg===!1&&(c.autoReplaceSvg=!0),c.observeMutations=!0,ya(()=>{za({autoReplaceSvgRoot:e}),W("watch",t)})}},Da={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:D(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=ct(t[0]);return{prefix:n,iconName:D(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(c.cssPrefix,"-"))>-1||t.match(aa))){const e=ut(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||L(),iconName:D(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=L();return{prefix:e,iconName:D(e,t)||t}}}},P={noAuto:La,config:c,dom:ja,parse:Da,library:un,findIconDefinition:Rt,toHtml:Z},za=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=h}=t;(Object.keys(T.styles).length>0||c.autoFetchSvg)&&_&&c.autoReplaceSvg&&P.dom.i2svg({node:e})};function mt(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>Z(n))}}),Object.defineProperty(t,"node",{get:function(){if(!_)return;const n=h.createElement("div");return n.innerHTML=t.html,n.children}}),t}function Wa(t){let{children:e,main:n,mask:a,attributes:r,styles:o,transform:i}=t;if(Bt(i)&&n.found&&!a.found){const{width:s,height:u}=n,f={x:s/u/2,y:.5};r.style=ft(l(l({},o),{},{"transform-origin":"".concat(f.x+i.x/16,"em ").concat(f.y+i.y/16,"em")}))}return[{tag:"svg",attributes:r,children:e}]}function Ya(t){let{prefix:e,iconName:n,children:a,attributes:r,symbol:o}=t;const i=o===!0?"".concat(e,"-").concat(c.cssPrefix,"-").concat(n):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:l(l({},r),{},{id:i}),children:a}]}]}function Jt(t){const{icons:{main:e,mask:n},prefix:a,iconName:r,transform:o,symbol:i,title:s,maskId:u,titleId:f,extra:m,watchable:g=!1}=t,{width:d,height:y}=n.found?n:e,k=Yn.includes(a),O=[c.replacementClass,r?"".concat(c.cssPrefix,"-").concat(r):""].filter(S=>m.classes.indexOf(S)===-1).filter(S=>S!==""||!!S).concat(m.classes).join(" ");let b={children:[],attributes:l(l({},m.attributes),{},{"data-prefix":a,"data-icon":r,class:O,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(d," ").concat(y)})};const x=k&&!~m.classes.indexOf("fa-fw")?{width:"".concat(d/y*16*.0625,"em")}:{};g&&(b.attributes[z]=""),s&&(b.children.push({tag:"title",attributes:{id:b.attributes["aria-labelledby"]||"title-".concat(f||K())},children:[s]}),delete b.attributes.title);const v=l(l({},b),{},{prefix:a,iconName:r,main:e,mask:n,maskId:u,transform:o,symbol:i,styles:l(l({},x),m.styles)}),{children:w,attributes:C}=n.found&&e.found?j("generateAbstractMask",v)||{children:[],attributes:{}}:j("generateAbstractIcon",v)||{children:[],attributes:{}};return v.children=w,v.attributes=C,i?Ya(v):Wa(v)}function he(t){const{content:e,width:n,height:a,transform:r,title:o,extra:i,watchable:s=!1}=t,u=l(l(l({},i.attributes),o?{title:o}:{}),{},{class:i.classes.join(" ")});s&&(u[z]="");const f=l({},i.styles);Bt(r)&&(f.transform=ga({transform:r,startCentered:!0,width:n,height:a}),f["-webkit-transform"]=f.transform);const m=ft(f);m.length>0&&(u.style=m);const g=[];return g.push({tag:"span",attributes:u,children:[e]}),o&&g.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),g}function Ua(t){const{content:e,title:n,extra:a}=t,r=l(l(l({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),o=ft(a.styles);o.length>0&&(r.style=o);const i=[];return i.push({tag:"span",attributes:r,children:[e]}),n&&i.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),i}const{styles:yt}=T;function Mt(t){const e=t[0],n=t[1],[a]=t.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(c.cssPrefix,"-").concat(gt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(c.cssPrefix,"-").concat(gt.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(c.cssPrefix,"-").concat(gt.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:e,height:n,icon:r}}const Ha={found:!1,width:512,height:512};function Ga(t,e){!qe&&!c.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Lt(t,e){let n=e;return e==="fa"&&c.styleDefault!==null&&(e=L()),new Promise((a,r)=>{if(n==="fa"){const o=fn(t)||{};t=o.iconName||t,e=o.prefix||e}if(t&&e&&yt[e]&&yt[e][t]){const o=yt[e][t];return a(Mt(o))}Ga(t,e),a(l(l({},Ha),{},{icon:c.showMissingIcons&&t?j("missingIconAbstract")||{}:{}}))})}const be=()=>{},jt=c.measurePerformance&&et&&et.mark&&et.measure?et:{mark:be,measure:be},q='FA "6.7.2"',$a=t=>(jt.mark("".concat(q," ").concat(t," begins")),()=>mn(t)),mn=t=>{jt.mark("".concat(q," ").concat(t," ends")),jt.measure("".concat(q," ").concat(t),"".concat(q," ").concat(t," begins"),"".concat(q," ").concat(t," ends"))};var Qt={begin:$a,end:mn};const at=()=>{};function ye(t){return typeof(t.getAttribute?t.getAttribute(z):null)=="string"}function Xa(t){const e=t.getAttribute?t.getAttribute(Gt):null,n=t.getAttribute?t.getAttribute($t):null;return e&&n}function qa(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(c.replacementClass)}function Ba(){return c.autoReplaceSvg===!0?rt.replace:rt[c.autoReplaceSvg]||rt.replace}function Va(t){return h.createElementNS("http://www.w3.org/2000/svg",t)}function Ka(t){return h.createElement(t)}function dn(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?Va:Ka}=e;if(typeof t=="string")return h.createTextNode(t);const a=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(o){a.setAttribute(o,t.attributes[o])}),(t.children||[]).forEach(function(o){a.appendChild(dn(o,{ceFn:n}))}),a}function Ja(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const rt={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(dn(n),e)}),e.getAttribute(z)===null&&c.keepOriginalSource){let n=h.createComment(Ja(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~qt(e).indexOf(c.replacementClass))return rt.replace(t);const a=new RegExp("".concat(c.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const o=n[0].attributes.class.split(" ").reduce((i,s)=>(s===c.replacementClass||s.match(a)?i.toSvg.push(s):i.toNode.push(s),i),{toNode:[],toSvg:[]});n[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",o.toNode.join(" "))}const r=n.map(o=>Z(o)).join(`
`);e.setAttribute(z,""),e.innerHTML=r}};function ve(t){t()}function pn(t,e){const n=typeof e=="function"?e:at;if(t.length===0)n();else{let a=ve;c.mutateApproach===ta&&(a=M.requestAnimationFrame||ve),a(()=>{const r=Ba(),o=Qt.begin("mutate");t.map(r),o(),n()})}}let Zt=!1;function gn(){Zt=!0}function Dt(){Zt=!1}let it=null;function xe(t){if(!ie||!c.observeMutations)return;const{treeCallback:e=at,nodeCallback:n=at,pseudoElementsCallback:a=at,observeMutationsRoot:r=h}=t;it=new ie(o=>{if(Zt)return;const i=L();$(o).forEach(s=>{if(s.type==="childList"&&s.addedNodes.length>0&&!ye(s.addedNodes[0])&&(c.searchPseudoElements&&a(s.target),e(s.target)),s.type==="attributes"&&s.target.parentNode&&c.searchPseudoElements&&a(s.target.parentNode),s.type==="attributes"&&ye(s.target)&&~ia.indexOf(s.attributeName))if(s.attributeName==="class"&&Xa(s.target)){const{prefix:u,iconName:f}=ut(qt(s.target));s.target.setAttribute(Gt,u||i),f&&s.target.setAttribute($t,f)}else qa(s.target)&&n(s.target)})}),_&&it.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function Qa(){it&&it.disconnect()}function Za(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((a,r)=>{const o=r.split(":"),i=o[0],s=o.slice(1);return i&&s.length>0&&(a[i]=s.join(":").trim()),a},{})),n}function tr(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"";let r=ut(qt(t));return r.prefix||(r.prefix=L()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=Oa(r.prefix,t.innerText)||Kt(r.prefix,Nt(t.innerText))),!r.iconName&&c.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function er(t){const e=$(t.attributes).reduce((r,o)=>(r.name!=="class"&&r.name!=="style"&&(r[o.name]=o.value),r),{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return c.autoA11y&&(n?e["aria-labelledby"]="".concat(c.replacementClass,"-title-").concat(a||K()):(e["aria-hidden"]="true",e.focusable="false")),e}function nr(){return{iconName:null,title:null,titleId:null,prefix:null,transform:I,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Ae(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=tr(t),o=er(t),i=_t("parseNodeAttributes",{},t);let s=e.styleParser?Za(t):[];return l({iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:I,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:s,attributes:o}},i)}const{styles:ar}=T;function hn(t){const e=c.autoReplaceSvg==="nest"?Ae(t,{styleParser:!1}):Ae(t);return~e.extra.classes.indexOf(Ve)?j("generateLayersText",t,e):j("generateSvgReplacementMutation",t,e)}function rr(){return[...Dn,...Ot]}function we(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!_)return Promise.resolve();const n=h.documentElement.classList,a=m=>n.add("".concat(fe,"-").concat(m)),r=m=>n.remove("".concat(fe,"-").concat(m)),o=c.autoFetchSvg?rr():Ue.concat(Object.keys(ar));o.includes("fa")||o.push("fa");const i=[".".concat(Ve,":not([").concat(z,"])")].concat(o.map(m=>".".concat(m,":not([").concat(z,"])"))).join(", ");if(i.length===0)return Promise.resolve();let s=[];try{s=$(t.querySelectorAll(i))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();const u=Qt.begin("onTree"),f=s.reduce((m,g)=>{try{const d=hn(g);d&&m.push(d)}catch(d){qe||d.name==="MissingIcon"&&console.error(d)}return m},[]);return new Promise((m,g)=>{Promise.all(f).then(d=>{pn(d,()=>{a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),u(),m()})}).catch(d=>{u(),g(d)})})}function or(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;hn(t).then(n=>{n&&pn([n],e)})}function ir(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(e||{}).icon?e:Rt(e||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:Rt(r||{})),t(a,l(l({},n),{},{mask:r}))}}const sr=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=I,symbol:a=!1,mask:r=null,maskId:o=null,title:i=null,titleId:s=null,classes:u=[],attributes:f={},styles:m={}}=e;if(!t)return;const{prefix:g,iconName:d,icon:y}=t;return mt(l({type:"icon"},t),()=>(W("beforeDOMElementCreation",{iconDefinition:t,params:e}),c.autoA11y&&(i?f["aria-labelledby"]="".concat(c.replacementClass,"-title-").concat(s||K()):(f["aria-hidden"]="true",f.focusable="false")),Jt({icons:{main:Mt(y),mask:r?Mt(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:g,iconName:d,transform:l(l({},I),n),symbol:a,title:i,maskId:o,titleId:s,extra:{attributes:f,styles:m,classes:u}})))};var lr={mixout(){return{icon:ir(sr)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=we,t.nodeCallback=or,t}}},provides(t){t.i2svg=function(e){const{node:n=h,callback:a=()=>{}}=e;return we(n,a)},t.generateSvgReplacementMutation=function(e,n){const{iconName:a,title:r,titleId:o,prefix:i,transform:s,symbol:u,mask:f,maskId:m,extra:g}=n;return new Promise((d,y)=>{Promise.all([Lt(a,i),f.iconName?Lt(f.iconName,f.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(k=>{let[O,b]=k;d([e,Jt({icons:{main:O,mask:b},prefix:i,iconName:a,transform:s,symbol:u,maskId:m,title:r,titleId:o,extra:g,watchable:!0})])}).catch(y)})},t.generateAbstractIcon=function(e){let{children:n,attributes:a,main:r,transform:o,styles:i}=e;const s=ft(i);s.length>0&&(a.style=s);let u;return Bt(o)&&(u=j("generateAbstractTransformGrouping",{main:r,transform:o,containerWidth:r.width,iconWidth:r.width})),n.push(u||r.icon),{children:n,attributes:a}}}},fr={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return mt({type:"layer"},()=>{W("beforeDOMElementCreation",{assembler:t,params:e});let a=[];return t(r=>{Array.isArray(r)?r.map(o=>{a=a.concat(o.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(c.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},cr={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:o={}}=e;return mt({type:"counter",content:t},()=>(W("beforeDOMElementCreation",{content:t,params:e}),Ua({content:t.toString(),title:n,extra:{attributes:r,styles:o,classes:["".concat(c.cssPrefix,"-layers-counter"),...a]}})))}}}},ur={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=I,title:a=null,classes:r=[],attributes:o={},styles:i={}}=e;return mt({type:"text",content:t},()=>(W("beforeDOMElementCreation",{content:t,params:e}),he({content:t,transform:l(l({},I),n),title:a,extra:{attributes:o,styles:i,classes:["".concat(c.cssPrefix,"-layers-text"),...r]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:a,transform:r,extra:o}=n;let i=null,s=null;if(We){const u=parseInt(getComputedStyle(e).fontSize,10),f=e.getBoundingClientRect();i=f.width/u,s=f.height/u}return c.autoA11y&&!a&&(o.attributes["aria-hidden"]="true"),Promise.resolve([e,he({content:e.innerHTML,width:i,height:s,transform:r,title:a,extra:o,watchable:!0})])}}};const mr=new RegExp('"',"ug"),ke=[1105920,1112319],Pe=l(l(l(l({},{FontAwesome:{normal:"fas",400:"fas"}}),Mn),Qn),$n),zt=Object.keys(Pe).reduce((t,e)=>(t[e.toLowerCase()]=Pe[e],t),{}),dr=Object.keys(zt).reduce((t,e)=>{const n=zt[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function pr(t){const e=t.replace(mr,""),n=xa(e,0),a=n>=ke[0]&&n<=ke[1],r=e.length===2?e[0]===e[1]:!1;return{value:Nt(r?e[0]:e),isSecondary:a||r}}function gr(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(e),r=isNaN(a)?"normal":a;return(zt[n]||{})[r]||dr[n]}function Oe(t,e){const n="".concat(Zn).concat(e.replace(":","-"));return new Promise((a,r)=>{if(t.getAttribute(n)!==null)return a();const i=$(t.children).filter(d=>d.getAttribute(Et)===e)[0],s=M.getComputedStyle(t,e),u=s.getPropertyValue("font-family"),f=u.match(ra),m=s.getPropertyValue("font-weight"),g=s.getPropertyValue("content");if(i&&!f)return t.removeChild(i),a();if(f&&g!=="none"&&g!==""){const d=s.getPropertyValue("content");let y=gr(u,m);const{value:k,isSecondary:O}=pr(d),b=f[0].startsWith("FontAwesome");let x=Kt(y,k),v=x;if(b){const w=Sa(k);w.iconName&&w.prefix&&(x=w.iconName,y=w.prefix)}if(x&&!O&&(!i||i.getAttribute(Gt)!==y||i.getAttribute($t)!==v)){t.setAttribute(n,v),i&&t.removeChild(i);const w=nr(),{extra:C}=w;C.attributes[Et]=e,Lt(x,y).then(S=>{const An=Jt(l(l({},w),{},{icons:{main:S,mask:cn()},prefix:y,iconName:v,extra:C,watchable:!0})),dt=h.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(dt,t.firstChild):t.appendChild(dt),dt.outerHTML=An.map(wn=>Z(wn)).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function hr(t){return Promise.all([Oe(t,"::before"),Oe(t,"::after")])}function br(t){return t.parentNode!==document.head&&!~ea.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(Et)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function Se(t){if(_)return new Promise((e,n)=>{const a=$(t.querySelectorAll("*")).filter(br).map(hr),r=Qt.begin("searchPseudoElements");gn(),Promise.all(a).then(()=>{r(),Dt(),e()}).catch(()=>{r(),Dt(),n()})})}var yr={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=Se,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=h}=e;c.searchPseudoElements&&Se(n)}}};let Ee=!1;var vr={mixout(){return{dom:{unwatch(){gn(),Ee=!0}}}},hooks(){return{bootstrap(){xe(_t("mutationObserverCallbacks",{}))},noAuto(){Qa()},watch(t){const{observeMutationsRoot:e}=t;Ee?Dt():xe(_t("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const Ie=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),o=r[0];let i=r.slice(1).join("-");if(o&&i==="h")return n.flipX=!0,n;if(o&&i==="v")return n.flipY=!0,n;if(i=parseFloat(i),isNaN(i))return n;switch(o){case"grow":n.size=n.size+i;break;case"shrink":n.size=n.size-i;break;case"left":n.x=n.x-i;break;case"right":n.x=n.x+i;break;case"up":n.y=n.y-i;break;case"down":n.y=n.y+i;break;case"rotate":n.rotate=n.rotate+i;break}return n},e)};var xr={mixout(){return{parse:{transform:t=>Ie(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=Ie(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:a,containerWidth:r,iconWidth:o}=e;const i={transform:"translate(".concat(r/2," 256)")},s="translate(".concat(a.x*32,", ").concat(a.y*32,") "),u="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),f="rotate(".concat(a.rotate," 0 0)"),m={transform:"".concat(s," ").concat(u," ").concat(f)},g={transform:"translate(".concat(o/2*-1," -256)")},d={outer:i,inner:m,path:g};return{tag:"g",attributes:l({},d.outer),children:[{tag:"g",attributes:l({},d.inner),children:[{tag:n.icon.tag,children:n.icon.children,attributes:l(l({},n.icon.attributes),d.path)}]}]}}}};const vt={x:0,y:0,width:"100%",height:"100%"};function Te(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function Ar(t){return t.tag==="g"?t.children:[t]}var wr={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),a=n?ut(n.split(" ").map(r=>r.trim())):cn();return a.prefix||(a.prefix=L()),t.mask=a,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:a,main:r,mask:o,maskId:i,transform:s}=e;const{width:u,icon:f}=r,{width:m,icon:g}=o,d=pa({transform:s,containerWidth:m,iconWidth:u}),y={tag:"rect",attributes:l(l({},vt),{},{fill:"white"})},k=f.children?{children:f.children.map(Te)}:{},O={tag:"g",attributes:l({},d.inner),children:[Te(l({tag:f.tag,attributes:l(l({},f.attributes),d.path)},k))]},b={tag:"g",attributes:l({},d.outer),children:[O]},x="mask-".concat(i||K()),v="clip-".concat(i||K()),w={tag:"mask",attributes:l(l({},vt),{},{id:x,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[y,b]},C={tag:"defs",children:[{tag:"clipPath",attributes:{id:v},children:Ar(g)},w]};return n.push(C,{tag:"rect",attributes:l({fill:"currentColor","clip-path":"url(#".concat(v,")"),mask:"url(#".concat(x,")")},vt)}),{children:n,attributes:a}}}},kr={provides(t){let e=!1;M.matchMedia&&(e=M.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:l(l({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});const o=l(l({},r),{},{attributeName:"opacity"}),i={tag:"circle",attributes:l(l({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||i.children.push({tag:"animate",attributes:l(l({},r),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:l(l({},o),{},{values:"1;0;1;1;0;1;"})}),n.push(i),n.push({tag:"path",attributes:l(l({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:l(l({},o),{},{values:"1;0;0;0;0;1;"})}]}),e||n.push({tag:"path",attributes:l(l({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:l(l({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},Pr={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return t.symbol=a,t}}}},Or=[ba,lr,fr,cr,ur,yr,vr,xr,wr,kr,Pr];Ma(Or,{mixoutsTo:P});P.noAuto;P.config;P.library;P.dom;const Wt=P.parse;P.findIconDefinition;P.toHtml;const Sr=P.icon;P.layer;P.text;P.counter;var xt={exports:{}},At,Ce;function Er(){if(Ce)return At;Ce=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return At=t,At}var wt,Ne;function Ir(){if(Ne)return wt;Ne=1;var t=Er();function e(){}function n(){}return n.resetWarningCache=e,wt=function(){function a(i,s,u,f,m,g){if(g!==t){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}a.isRequired=a;function r(){return a}var o={array:a,bigint:a,bool:a,func:a,number:a,object:a,string:a,symbol:a,any:a,arrayOf:r,element:a,elementType:a,instanceOf:r,node:a,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:n,resetWarningCache:e};return o.PropTypes=o,o},wt}var Fe;function Tr(){return Fe||(Fe=1,xt.exports=Ir()()),xt.exports}var Cr=Tr();const p=kn(Cr);function _e(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function E(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?_e(Object(n),!0).forEach(function(a){U(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):_e(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function st(t){"@babel/helpers - typeof";return st=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},st(t)}function U(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Nr(t,e){if(t==null)return{};var n={},a=Object.keys(t),r,o;for(o=0;o<a.length;o++)r=a[o],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function Fr(t,e){if(t==null)return{};var n=Nr(t,e),a,r;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)a=o[r],!(e.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}function Yt(t){return _r(t)||Rr(t)||Mr(t)||Lr()}function _r(t){if(Array.isArray(t))return Ut(t)}function Rr(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Mr(t,e){if(t){if(typeof t=="string")return Ut(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Ut(t,e)}}function Ut(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function Lr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function jr(t){var e,n=t.beat,a=t.fade,r=t.beatFade,o=t.bounce,i=t.shake,s=t.flash,u=t.spin,f=t.spinPulse,m=t.spinReverse,g=t.pulse,d=t.fixedWidth,y=t.inverse,k=t.border,O=t.listItem,b=t.flip,x=t.size,v=t.rotation,w=t.pull,C=(e={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":o,"fa-shake":i,"fa-flash":s,"fa-spin":u,"fa-spin-reverse":m,"fa-spin-pulse":f,"fa-pulse":g,"fa-fw":d,"fa-inverse":y,"fa-border":k,"fa-li":O,"fa-flip":b===!0,"fa-flip-horizontal":b==="horizontal"||b==="both","fa-flip-vertical":b==="vertical"||b==="both"},U(e,"fa-".concat(x),typeof x<"u"&&x!==null),U(e,"fa-rotate-".concat(v),typeof v<"u"&&v!==null&&v!==0),U(e,"fa-pull-".concat(w),typeof w<"u"&&w!==null),U(e,"fa-swap-opacity",t.swapOpacity),e);return Object.keys(C).map(function(S){return C[S]?S:null}).filter(function(S){return S})}function Dr(t){return t=t-0,t===t}function bn(t){return Dr(t)?t:(t=t.replace(/[\-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""}),t.substr(0,1).toLowerCase()+t.substr(1))}var zr=["style"];function Wr(t){return t.charAt(0).toUpperCase()+t.slice(1)}function Yr(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var a=n.indexOf(":"),r=bn(n.slice(0,a)),o=n.slice(a+1).trim();return r.startsWith("webkit")?e[Wr(r)]=o:e[r]=o,e},{})}function yn(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(u){return yn(t,u)}),r=Object.keys(e.attributes||{}).reduce(function(u,f){var m=e.attributes[f];switch(f){case"class":u.attrs.className=m,delete e.attributes.class;break;case"style":u.attrs.style=Yr(m);break;default:f.indexOf("aria-")===0||f.indexOf("data-")===0?u.attrs[f.toLowerCase()]=m:u.attrs[bn(f)]=m}return u},{attrs:{}}),o=n.style,i=o===void 0?{}:o,s=Fr(n,zr);return r.attrs.style=E(E({},r.attrs.style),i),t.apply(void 0,[e.tag,E(E({},r.attrs),s)].concat(Yt(a)))}var vn=!1;try{vn=!0}catch{}function Ur(){if(!vn&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function Re(t){if(t&&st(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(Wt.icon)return Wt.icon(t);if(t===null)return null;if(t&&st(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}function kt(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?U({},t,e):{}}var Me={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},xn=Le.forwardRef(function(t,e){var n=E(E({},Me),t),a=n.icon,r=n.mask,o=n.symbol,i=n.className,s=n.title,u=n.titleId,f=n.maskId,m=Re(a),g=kt("classes",[].concat(Yt(jr(n)),Yt((i||"").split(" ")))),d=kt("transform",typeof n.transform=="string"?Wt.transform(n.transform):n.transform),y=kt("mask",Re(r)),k=Sr(m,E(E(E(E({},g),d),y),{},{symbol:o,title:s,titleId:u,maskId:f}));if(!k)return Ur("Could not find icon",m),null;var O=k.abstract,b={ref:e};return Object.keys(n).forEach(function(x){Me.hasOwnProperty(x)||(b[x]=n[x])}),Hr(O[0],b)});xn.displayName="FontAwesomeIcon";xn.propTypes={beat:p.bool,border:p.bool,beatFade:p.bool,bounce:p.bool,className:p.string,fade:p.bool,flash:p.bool,mask:p.oneOfType([p.object,p.array,p.string]),maskId:p.string,fixedWidth:p.bool,inverse:p.bool,flip:p.oneOf([!0,!1,"horizontal","vertical","both"]),icon:p.oneOfType([p.object,p.array,p.string]),listItem:p.bool,pull:p.oneOf(["right","left"]),pulse:p.bool,rotation:p.oneOf([0,90,180,270]),shake:p.bool,size:p.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:p.bool,spinPulse:p.bool,spinReverse:p.bool,symbol:p.oneOfType([p.bool,p.string]),title:p.string,titleId:p.string,transform:p.oneOfType([p.string,p.object]),swapOpacity:p.bool};var Hr=yn.bind(null,Le.createElement);export{$r as B,xn as F,tt as j};
