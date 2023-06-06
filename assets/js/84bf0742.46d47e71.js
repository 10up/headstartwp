"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[5145],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>u});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},d="mdxType",k={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=s(r),m=a,u=d["".concat(p,".").concat(m)]||d[m]||k[m]||l;return r?n.createElement(u,o(o({ref:t},c),{},{components:r})):n.createElement(u,o({ref:t},c))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[d]="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8781:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const l={id:"headstartwp_core.react.BlockRendererProps",title:"Interface: BlockRendererProps",sidebar_label:"@headstartwp/core.react.BlockRendererProps",custom_edit_url:null},o=void 0,i={unversionedId:"interfaces/headstartwp_core.react.BlockRendererProps",id:"interfaces/headstartwp_core.react.BlockRendererProps",title:"Interface: BlockRendererProps",description:"@headstartwp/core.react.BlockRendererProps",source:"@site/docs/interfaces/headstartwp_core.react.BlockRendererProps.md",sourceDirName:"interfaces",slug:"/interfaces/headstartwp_core.react.BlockRendererProps",permalink:"/docs/api/interfaces/headstartwp_core.react.BlockRendererProps",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"headstartwp_core.react.BlockRendererProps",title:"Interface: BlockRendererProps",sidebar_label:"@headstartwp/core.react.BlockRendererProps",custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"@headstartwp/core.react.BlockProps",permalink:"/docs/api/interfaces/headstartwp_core.react.BlockProps"},next:{title:"@headstartwp/core.react.ButtonBlockProps",permalink:"/docs/api/interfaces/headstartwp_core.react.ButtonBlockProps"}},p={},s=[{value:"Properties",id:"properties",level:2},{value:"children",id:"children",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"html",id:"html",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"ksesAllowList",id:"ksesallowlist",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"sanitizeFn",id:"sanitizefn",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"Parameters",id:"parameters",level:5},{value:"Returns",id:"returns",level:5},{value:"Defined in",id:"defined-in-3",level:4}],c={toc:s};function d(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api/modules/headstartwp_core"},"@headstartwp/core"),".",(0,a.kt)("a",{parentName:"p",href:"/docs/api/namespaces/headstartwp_core.react"},"react"),".BlockRendererProps"),(0,a.kt)("p",null,"The type definition for the ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/namespaces/headstartwp_core.react#blocksrenderer"},"BlocksRenderer")," component."),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("h3",{id:"children"},"children"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"children"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"ReactNode")),(0,a.kt)("p",null,"The children components that must implements ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/interfaces/headstartwp_core.react.BlockProps"},"BlockProps"),". Failing to implement ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/interfaces/headstartwp_core.react.BlockProps"},"BlockProps"),"\nwill issue a warning at runtime."),(0,a.kt)("p",null,"Passing children are not mandatory, if you do not pass them ",(0,a.kt)("inlineCode",{parentName:"p"},"BlocksRenderer")," will simply sanitize the html markup."),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/10up/headstartwp/blob/48f414e/packages/core/src/react/components/BlocksRenderer.tsx#L110"},"packages/core/src/react/components/BlocksRenderer.tsx:110")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"html"},"html"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"html"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("p",null,"The HTML string to be parsed."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'<BlocksRenderer\n        html="<div><p>hello world</p> div content</div>"\n/>,\n')),(0,a.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/10up/headstartwp/blob/48f414e/packages/core/src/react/components/BlocksRenderer.tsx#L83"},"packages/core/src/react/components/BlocksRenderer.tsx:83")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"ksesallowlist"},"ksesAllowList"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"ksesAllowList"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"IWhiteList")),(0,a.kt)("p",null,"The allow list for the parser"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'<BlocksRenderer\n        html="<div><p>hello world</p> div content</div>"\n        ksesAllowList={{ div: [] }}\n/>,\n')),(0,a.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/10up/headstartwp/blob/48f414e/packages/core/src/react/components/BlocksRenderer.tsx#L95"},"packages/core/src/react/components/BlocksRenderer.tsx:95")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"sanitizefn"},"sanitizeFn"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"sanitizeFn"),": (",(0,a.kt)("inlineCode",{parentName:"p"},"html"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"ksesAllowList?"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"IWhiteList"),") => ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"type-declaration"},"Type declaration"),(0,a.kt)("p",null,"\u25b8 (",(0,a.kt)("inlineCode",{parentName:"p"},"html"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"ksesAllowList?"),"): ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("p",null,"A custom implementation of the sanitize function."),(0,a.kt)("p",null,"If none is provided it's going to default to ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/modules/headstartwp_core#wpksespost"},"wpKsesPost")),(0,a.kt)("h5",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"html")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"string"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"ksesAllowList?")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"IWhiteList"))))),(0,a.kt)("h5",{id:"returns"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/10up/headstartwp/blob/48f414e/packages/core/src/react/components/BlocksRenderer.tsx#L102"},"packages/core/src/react/components/BlocksRenderer.tsx:102")))}d.isMDXComponent=!0}}]);