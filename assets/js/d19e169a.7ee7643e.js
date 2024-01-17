"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[4504],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>h});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},d=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=l(r),m=a,h=u["".concat(c,".").concat(m)]||u[m]||p[m]||o;return r?n.createElement(h,i(i({ref:t},d),{},{components:r})):n.createElement(h,i({ref:t},d))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7545:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const o={slug:"/wordpress-integration/basic-auth"},i="Basic Auth",s={unversionedId:"WordPress Integration/basic-auth",id:"WordPress Integration/basic-auth",title:"Basic Auth",description:"If WordPress is protected by Basic Auth (which is common during development) you can tell HeadstartWP the basic auth creds so that all",source:"@site/documentation/06-WordPress Integration/basic-auth.md",sourceDirName:"06-WordPress Integration",slug:"/wordpress-integration/basic-auth",permalink:"/docs/learn/wordpress-integration/basic-auth",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/docs/documentation/06-WordPress Integration/basic-auth.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1705469587,formattedLastUpdatedAt:"Jan 17, 2024",frontMatter:{slug:"/wordpress-integration/basic-auth"},sidebar:"tutorialSidebar",previous:{title:"On-demand ISR revalidation",permalink:"/docs/learn/wordpress-integration/revalidate"},next:{title:"Feeds",permalink:"/docs/learn/wordpress-integration/feeds"}},c={},l=[],d={toc:l};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"basic-auth"},"Basic Auth"),(0,a.kt)("p",null,"If WordPress is protected by Basic Auth (which is common during development) you can tell HeadstartWP the basic auth creds so that all\nREST API requests include them. To do so, simply add the following env variables:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"WP_BASIC_AUTH_USERNAME=username\nWP_BASIC_AUTH_PASSWORD=password\n")),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"The above env variables will only be accessible server-side and therefore any client-side requests made directly to WordPress will fail. This happens because Next.js only includes env variables prefixed with ",(0,a.kt)("inlineCode",{parentName:"p"},"NEXT_PUBLIC_")," in the browser bundle."),(0,a.kt)("p",{parentName:"admonition"},"If you want your client-side requests to work, prefix the above variables with ",(0,a.kt)("inlineCode",{parentName:"p"},"NEXT_PUBLIC_"),". But note that the basic auth creds will be leaked to the public.")))}u.isMDXComponent=!0}}]);