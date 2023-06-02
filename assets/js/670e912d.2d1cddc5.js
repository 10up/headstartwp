"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[1497],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=n.createContext({}),l=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},d=function(e){var t=l(e.components);return n.createElement(u.Provider,{value:t},e.children)},s="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),s=l(r),f=o,m=s["".concat(u,".").concat(f)]||s[f]||p[f]||a;return r?n.createElement(m,c(c({ref:t},d),{},{components:r})):n.createElement(m,c({ref:t},d))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,c=new Array(a);c[0]=f;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[s]="string"==typeof e?e:o,c[1]=i;for(var l=2;l<a;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},1968:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>s,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var n=r(7462),o=(r(7294),r(3905));const a={},c="Implementing a Youtube Facade",i={unversionedId:"Guides/youtube-facade",id:"Guides/youtube-facade",title:"Implementing a Youtube Facade",description:"The headless framework provides an easy way to implement Youtube Facade, in fact, we can do so with one line of code. All that\u2019s needed is to add the YoutubeLiteBlock component",source:"@site/documentation/08-Guides/youtube-facade.md",sourceDirName:"08-Guides",slug:"/Guides/youtube-facade",permalink:"/learn/Guides/youtube-facade",draft:!1,editUrl:"https://github.com/10up/headless/tree/trunk/site/documentation/08-Guides/youtube-facade.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1685681367,formattedLastUpdatedAt:"Jun 2, 2023",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"TypeScript",permalink:"/learn/Guides/typescript"}},u={},l=[],d={toc:l};function s(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"implementing-a-youtube-facade"},"Implementing a Youtube Facade"),(0,o.kt)("p",null,"The headless framework provides an easy way to implement Youtube Facade, in fact, we can do so with one line of code. All that\u2019s needed is to add the YoutubeLiteBlock component"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { BlocksRenderer, YoutubeLiteBlock } from '@headstartwp/core/react';\n\n<BlocksRenderer html={html}>\n    {/*... */}\n    <YoutubeLiteBlock />\n</BlocksRenderer>\n")))}s.isMDXComponent=!0}}]);