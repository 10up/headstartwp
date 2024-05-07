"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[9638],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=u(n),h=a,f=p["".concat(c,".").concat(h)]||p[h]||d[h]||o;return n?r.createElement(f,i(i({ref:t},l),{},{components:n})):r.createElement(f,i({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:a,i[1]=s;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},4204:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var r=n(7462),a=(n(7294),n(3905));const o={slug:"/data-fetching/useSeo",sidebar_position:7},i="The useSeo hook",s={unversionedId:"Data Fetching/useSeo",id:"Data Fetching/useSeo",title:"The useSeo hook",description:"This hook was introduced in @headstartwp/next@1.1.0",source:"@site/documentation/02 - Data Fetching/useSeo.md",sourceDirName:"02 - Data Fetching",slug:"/data-fetching/useSeo",permalink:"/docs/learn/data-fetching/useSeo",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/docs/documentation/02 - Data Fetching/useSeo.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1715114956,formattedLastUpdatedAt:"May 7, 2024",sidebarPosition:7,frontMatter:{slug:"/data-fetching/useSeo",sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"The useSearchNative hook",permalink:"/docs/learn/data-fetching/usesearch-native"},next:{title:"Mutating Data",permalink:"/docs/learn/data-fetching/mutating"}},c={},u=[{value:"Basic Usage",id:"basic-usage",level:2}],l={toc:u};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"the-useseo-hook"},"The useSeo hook"),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"This hook was introduced in ",(0,a.kt)("inlineCode",{parentName:"p"},"@headstartwp/next@1.1.0"))),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"useSeo")," hook returns the SEO data for the current page."),(0,a.kt)("h2",{id:"basic-usage"},"Basic Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"// by default it returns the json object\nconst yoast_json = useSeo();\nconst yoast_json = useSeo('json');\n// but you can also get the plain html markup for the metadata\nconst yoast_head = useSeo('html');\n")),(0,a.kt)("p",null,"If there's no seo information for the current route, this hook will return ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," therefore we recommend checking for null before using the return value."))}p.isMDXComponent=!0}}]);