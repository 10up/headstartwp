"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[825],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>h});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),d=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},p=function(e){var t=d(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=d(a),m=r,h=u["".concat(l,".").concat(m)]||u[m]||c[m]||i;return a?n.createElement(h,o(o({ref:t},p),{},{components:a})):n.createElement(h,o({ref:t},p))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:r,o[1]=s;for(var d=2;d<i;d++)o[d]=a[d];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},147:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var n=a(7462),r=(a(7294),a(3905));const i={sidebar_position:2,slug:"/wordpress-integration/revalidate"},o="On-demand ISR revalidation",s={unversionedId:"WordPress Integration/revalidate",id:"WordPress Integration/revalidate",title:"On-demand ISR revalidation",description:"On-demand Revalidation is the ability to revalidate static pages programmatically from the CMS.",source:"@site/documentation/06-WordPress Integration/revalidate.md",sourceDirName:"06-WordPress Integration",slug:"/wordpress-integration/revalidate",permalink:"/headstartwp/learn/wordpress-integration/revalidate",draft:!1,editUrl:"https://github.com/10up/headless/tree/trunk/site/documentation/06-WordPress Integration/revalidate.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1685682030,formattedLastUpdatedAt:"Jun 2, 2023",sidebarPosition:2,frontMatter:{sidebar_position:2,slug:"/wordpress-integration/revalidate"},sidebar:"tutorialSidebar",previous:{title:"Multisite",permalink:"/headstartwp/learn/wordpress-integration/multisite"},next:{title:"Feeds",permalink:"/headstartwp/learn/wordpress-integration/feeds"}},l={},d=[{value:"Usage",id:"usage",level:2},{value:"Plugin setup",id:"plugin-setup",level:3},{value:"Revalidate Endpoint",id:"revalidate-endpoint",level:3},{value:"How does it work?",id:"how-does-it-work",level:2}],p={toc:d};function u(e){let{components:t,...i}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"on-demand-isr-revalidation"},"On-demand ISR revalidation"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation"},"On-demand Revalidation")," is the ability to revalidate static pages programmatically from the CMS."),(0,r.kt)("p",null,"Without On-demand ISR revalidation users will need to wait until the time set in the ",(0,r.kt)("inlineCode",{parentName:"p"},"revalidate")," prop has passed before they can see an updated version of that page. This means that if a ",(0,r.kt)("inlineCode",{parentName:"p"},"revalidate")," is set to 5min, users would potentially have to wait up to 5min before they can see new content."),(0,r.kt)("p",null,'It is preferred to have the CMS ask the Next.js app to revalidate those pages when possible. This can be done via "On-Demand Revalidation".'),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("h3",{id:"plugin-setup"},"Plugin setup"),(0,r.kt)("p",null,"10up Headless Framework supports On-Demand Revalidation and it requires installing the WordPress Plugin. On-Demand Revalidation is opt-in and must be manually enabled in the plugin's settings (Settings -> General).\n",(0,r.kt)("img",{alt:"Plugin settings",src:a(7607).Z,width:"835",height:"366"})),(0,r.kt)("p",null,"The plugin expects the revalidate endpoint to live at  ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/revalidate"),". It is possible to customize this endpoint via the ",(0,r.kt)("inlineCode",{parentName:"p"},"tenup_headless_isr_revalidate_endpoint"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * Filters the revalidate endpoint.\n *\n * @param string $revalidate_endpoint The revalidate endpoint\n */\n$revalidate_endpoint = apply_filters( \n    'tenup_headless_isr_revalidate_endpoint', \n    trailingslashit( Plugin::get_react_url() ) . 'api/revalidate' \n);\n")),(0,r.kt)("h3",{id:"revalidate-endpoint"},"Revalidate Endpoint"),(0,r.kt)("p",null,"Simply create a Next.js API endpoint that uses the ",(0,r.kt)("inlineCode",{parentName:"p"},"revalidateHandler")," provided by the framework. "),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"If you changed the default value of the endpoint path via the ",(0,r.kt)("inlineCode",{parentName:"p"},"tenup_headless_isr_revalidate_endpoint")," filter, make sure you change it in the Next.js app as well. ")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript",metastring:'title="src/pages/api/revalidate"',title:'"src/pages/api/revalidate"'},"import { revalidateHandler } from '@headstartwp/next';\n\n/**\n * The revalidate endpoint just needs to proxy the default revalidate handler\n *\n * @param {*} req Next.js request object\n * @param {*} res  Next.js response object\n *\n * @returns\n */\nexport default async function handler(req, res) {\n    return revalidateHandler(req, res);\n}\n")),(0,r.kt)("h2",{id:"how-does-it-work"},"How does it work?"),(0,r.kt)("p",null,"The default implementation will revalidate any post or page upon saving in WordPress. You can see the logic ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/10up/headless/blob/develop/wp/headless-wp/includes/classes/CacheFlush/CacheFlush.php#L40"},"here"),"."))}u.isMDXComponent=!0},7607:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/plugin-settings-ae774c25b95e665be6e060d3045df52c.png"}}]);