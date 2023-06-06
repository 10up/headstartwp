"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[7625],{3905:(e,t,a)=>{a.d(t,{Zo:()=>o,kt:()=>w});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),s=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):d(d({},t),e)),a},o=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,p=e.parentName,o=l(e,["components","mdxType","originalType","parentName"]),c=s(a),u=n,w=c["".concat(p,".").concat(u)]||c[u]||m[u]||i;return a?r.createElement(w,d(d({ref:t},o),{},{components:a})):r.createElement(w,d({ref:t},o))}));function w(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,d=new Array(i);d[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[c]="string"==typeof e?e:n,d[1]=l;for(var s=2;s<i;s++)d[s]=a[s];return r.createElement.apply(null,d)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},8632:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>d,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=a(7462),n=(a(7294),a(3905));const i={id:"headstartwp_next.middlewares",title:"Namespace: middlewares",sidebar_label:"@headstartwp/next.middlewares",custom_edit_url:null},d=void 0,l={unversionedId:"namespaces/headstartwp_next.middlewares",id:"namespaces/headstartwp_next.middlewares",title:"Namespace: middlewares",description:"@headstartwp/next.middlewares",source:"@site/docs/namespaces/headstartwp_next.middlewares.md",sourceDirName:"namespaces",slug:"/namespaces/headstartwp_next.middlewares",permalink:"/docs/api/namespaces/headstartwp_next.middlewares",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"headstartwp_next.middlewares",title:"Namespace: middlewares",sidebar_label:"@headstartwp/next.middlewares",custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"@headstartwp/next.config",permalink:"/docs/api/namespaces/headstartwp_next.config"},next:{title:"@headstartwp/core.LOGTYPE",permalink:"/docs/api/enums/headstartwp_core.LOGTYPE"}},p={},s=[{value:"@headstartwp/next/middlewares",id:"headstartwpnextmiddlewares",level:2},{value:"Usage",id:"usage",level:3},{value:"Functions",id:"functions",level:2},{value:"AppMiddleware",id:"appmiddleware",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4}],o={toc:s};function c(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,r.Z)({},o,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/docs/api/modules/headstartwp_next"},"@headstartwp/next"),".middlewares"),(0,n.kt)("h2",{id:"headstartwpnextmiddlewares"},"@headstartwp/next/middlewares"),(0,n.kt)("p",null,"The middlewwares export of the `@headstartwp/next' package."),(0,n.kt)("h3",{id:"usage"},"Usage"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-tsx"},"import { appMiddleware } from '@headstartwp/next/middlewares';\n")),(0,n.kt)("h2",{id:"functions"},"Functions"),(0,n.kt)("h3",{id:"appmiddleware"},"AppMiddleware"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"AppMiddleware"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"req"),"): ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,n.kt)("inlineCode",{parentName:"p"},"NextResponse"),"<",(0,n.kt)("inlineCode",{parentName:"p"},"unknown"),">",">"),(0,n.kt)("h4",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"req")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"NextRequest"))))),(0,n.kt)("h4",{id:"returns"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,n.kt)("inlineCode",{parentName:"p"},"NextResponse"),"<",(0,n.kt)("inlineCode",{parentName:"p"},"unknown"),">",">"),(0,n.kt)("h4",{id:"defined-in"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/10up/headstartwp/blob/48f414e/packages/next/src/middlewares/appMidleware.ts#L15"},"packages/next/src/middlewares/appMidleware.ts:15")))}c.isMDXComponent=!0}}]);