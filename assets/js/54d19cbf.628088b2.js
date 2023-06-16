"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[825],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=d(n),m=r,h=u["".concat(l,".").concat(m)]||u[m]||c[m]||i;return n?a.createElement(h,o(o({ref:t},p),{},{components:n})):a.createElement(h,o({ref:t},p))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:r,o[1]=s;for(var d=2;d<i;d++)o[d]=n[d];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},147:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var a=n(7462),r=(n(7294),n(3905));const i={sidebar_position:2,slug:"/wordpress-integration/revalidate"},o="On-demand ISR revalidation",s={unversionedId:"WordPress Integration/revalidate",id:"WordPress Integration/revalidate",title:"On-demand ISR revalidation",description:"On-demand Revalidation is the ability to revalidate static pages programmatically from the CMS.",source:"@site/documentation/06-WordPress Integration/revalidate.md",sourceDirName:"06-WordPress Integration",slug:"/wordpress-integration/revalidate",permalink:"/docs/learn/wordpress-integration/revalidate",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/site/documentation/06-WordPress Integration/revalidate.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1686919216,formattedLastUpdatedAt:"Jun 16, 2023",sidebarPosition:2,frontMatter:{sidebar_position:2,slug:"/wordpress-integration/revalidate"},sidebar:"tutorialSidebar",previous:{title:"Multisite",permalink:"/docs/learn/wordpress-integration/multisite"},next:{title:"Feeds",permalink:"/docs/learn/wordpress-integration/feeds"}},l={},d=[{value:"Usage",id:"usage",level:2},{value:"Plugin setup",id:"plugin-setup",level:3},{value:"Revalidate Endpoint",id:"revalidate-endpoint",level:3},{value:"How does it work?",id:"how-does-it-work",level:2}],p={toc:d};function u(e){let{components:t,...i}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"on-demand-isr-revalidation"},"On-demand ISR revalidation"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation"},"On-demand Revalidation")," is the ability to revalidate static pages programmatically from the CMS."),(0,r.kt)("p",null,"Without On-demand ISR revalidation users will need to wait until the time set in the ",(0,r.kt)("inlineCode",{parentName:"p"},"revalidate")," prop has passed before they can see an updated version of that page. This means that if a ",(0,r.kt)("inlineCode",{parentName:"p"},"revalidate")," is set to 5min, users would potentially have to wait up to 5min before they can see new content."),(0,r.kt)("p",null,'It is preferred to have the CMS ask the Next.js app to revalidate those pages when possible. This can be done via "On-Demand Revalidation".'),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("h3",{id:"plugin-setup"},"Plugin setup"),(0,r.kt)("p",null,"HeadstartWP supports On-Demand Revalidation and it requires installing the WordPress Plugin. On-Demand Revalidation is opt-in and must be manually enabled in the plugin's settings (Settings -> General).\n",(0,r.kt)("img",{alt:"Plugin settings",src:n(7607).Z,width:"835",height:"366"})),(0,r.kt)("p",null,"The plugin expects the revalidate endpoint to live at  ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/revalidate"),". It is possible to customize this endpoint via the ",(0,r.kt)("inlineCode",{parentName:"p"},"tenup_headless_isr_revalidate_endpoint"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * Filters the revalidate endpoint.\n *\n * @param string $revalidate_endpoint The revalidate endpoint\n */\n$revalidate_endpoint = apply_filters( \n    'tenup_headless_isr_revalidate_endpoint', \n    trailingslashit( Plugin::get_react_url() ) . 'api/revalidate' \n);\n")),(0,r.kt)("h3",{id:"revalidate-endpoint"},"Revalidate Endpoint"),(0,r.kt)("p",null,"Simply create a Next.js API endpoint that uses the ",(0,r.kt)("inlineCode",{parentName:"p"},"revalidateHandler")," provided by the framework. "),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"If you changed the default value of the endpoint path via the ",(0,r.kt)("inlineCode",{parentName:"p"},"tenup_headless_isr_revalidate_endpoint")," filter, make sure you change it in the Next.js app as well. ")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript",metastring:'title="src/pages/api/revalidate"',title:'"src/pages/api/revalidate"'},"import { revalidateHandler } from '@headstartwp/next';\n\n/**\n * The revalidate endpoint just needs to proxy the default revalidate handler\n *\n * @param {*} req Next.js request object\n * @param {*} res  Next.js response object\n *\n * @returns\n */\nexport default async function handler(req, res) {\n    return revalidateHandler(req, res);\n}\n")),(0,r.kt)("h2",{id:"how-does-it-work"},"How does it work?"),(0,r.kt)("p",null,"The default implementation will revalidate any post or page upon saving in WordPress. You can see the logic ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/10up/headstartwp/blob/develop/wp/headless-wp/includes/classes/CacheFlush/CacheFlush.php#L40"},"here"),"."))}u.isMDXComponent=!0},7607:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/plugin-settings-ae774c25b95e665be6e060d3045df52c.png"}}]);