"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[9605],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},l="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),l=u(r),d=a,h=l["".concat(c,".").concat(d)]||l[d]||m[d]||o;return r?n.createElement(h,s(s({ref:t},p),{},{components:r})):n.createElement(h,s({ref:t},p))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[l]="string"==typeof e?e:a,s[1]=i;for(var u=2;u<o;u++)s[u]=r[u];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},4827:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>l,frontMatter:()=>o,metadata:()=>i,toc:()=>u});var n=r(7462),a=(r(7294),r(3905));const o={slug:"/data-fetching/useterms",sidebar_position:4},s="The useTerms hook",i={unversionedId:"Data Fetching/useTerms",id:"Data Fetching/useTerms",title:"The useTerms hook",description:"The useTerms hook is the Next.js binding for the useFetchTerms.",source:"@site/documentation/02 - Data Fetching/useTerms.md",sourceDirName:"02 - Data Fetching",slug:"/data-fetching/useterms",permalink:"/docs/learn/data-fetching/useterms",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/docs/documentation/02 - Data Fetching/useTerms.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1710434746,formattedLastUpdatedAt:"Mar 14, 2024",sidebarPosition:4,frontMatter:{slug:"/data-fetching/useterms",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"The usePostOrPosts hook",permalink:"/docs/learn/data-fetching/use-post-or-posts"},next:{title:"The useSearch hook",permalink:"/docs/learn/data-fetching/usesearch"}},c={},u=[{value:"Basic Usage",id:"basic-usage",level:2}],p={toc:u};function l(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"the-useterms-hook"},"The useTerms hook"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"The ",(0,a.kt)("a",{parentName:"p",href:"/api/modules/headstartwp_next#useterms"},"useTerms")," hook is the Next.js binding for the ",(0,a.kt)("a",{parentName:"p",href:"/api/namespaces/headstartwp_core.react#usefetchterms"},"useFetchTerms"),".")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"useTerms")," hook returns terms for a given WordPress taxonomy."),(0,a.kt)("h2",{id:"basic-usage"},"Basic Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const {\n    data: { terms },\n} = useTerms({ taxonomy: 'category' });\n")),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"You do not need to use ",(0,a.kt)("inlineCode",{parentName:"p"},"useTerms")," if you simply need to access the term object for a taxonomy archive page (e.g category archive). You should use the ",(0,a.kt)("inlineCode",{parentName:"p"},"queriedObject")," from the ",(0,a.kt)("inlineCode",{parentName:"p"},"usePosts")," hook. See ",(0,a.kt)("a",{parentName:"p",href:"/learn/data-fetching/useposts/#queried-object"},"usePosts docs")," for more details.")))}l.isMDXComponent=!0}}]);