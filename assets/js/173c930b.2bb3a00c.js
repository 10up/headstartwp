"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[3446],{3905:(t,e,o)=>{o.d(e,{Zo:()=>u,kt:()=>d});var n=o(7294);function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function a(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function s(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?a(Object(o),!0).forEach((function(e){r(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function i(t,e){if(null==t)return{};var o,n,r=function(t,e){if(null==t)return{};var o,n,r={},a=Object.keys(t);for(n=0;n<a.length;n++)o=a[n],e.indexOf(o)>=0||(r[o]=t[o]);return r}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(n=0;n<a.length;n++)o=a[n],e.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(t,o)&&(r[o]=t[o])}return r}var p=n.createContext({}),c=function(t){var e=n.useContext(p),o=e;return t&&(o="function"==typeof t?t(e):s(s({},e),t)),o},u=function(t){var e=c(t.components);return n.createElement(p.Provider,{value:e},t.children)},l="mdxType",h={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},m=n.forwardRef((function(t,e){var o=t.components,r=t.mdxType,a=t.originalType,p=t.parentName,u=i(t,["components","mdxType","originalType","parentName"]),l=c(o),m=r,d=l["".concat(p,".").concat(m)]||l[m]||h[m]||a;return o?n.createElement(d,s(s({ref:e},u),{},{components:o})):n.createElement(d,s({ref:e},u))}));function d(t,e){var o=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var a=o.length,s=new Array(a);s[0]=m;var i={};for(var p in e)hasOwnProperty.call(e,p)&&(i[p]=e[p]);i.originalType=t,i[l]="string"==typeof t?t:r,s[1]=i;for(var c=2;c<a;c++)s[c]=o[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,o)}m.displayName="MDXCreateElement"},7033:(t,e,o)=>{o.r(e),o.d(e,{assets:()=>p,contentTitle:()=>s,default:()=>l,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=o(7462),r=(o(7294),o(3905));const a={slug:"/data-fetching/creating-your-own-custom-hooks",sidebar_label:"Creating your own custom hooks"},s="Custom hooks",i={unversionedId:"Data Fetching/custom-hooks",id:"Data Fetching/custom-hooks",title:"Custom hooks",description:"Sometimes it might be useful to wrap the framework data-fetching hooks into your own hooks.",source:"@site/documentation/02 - Data Fetching/custom-hooks.md",sourceDirName:"02 - Data Fetching",slug:"/data-fetching/creating-your-own-custom-hooks",permalink:"/docs/learn/data-fetching/creating-your-own-custom-hooks",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/docs/documentation/02 - Data Fetching/custom-hooks.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1713384540,formattedLastUpdatedAt:"Apr 17, 2024",frontMatter:{slug:"/data-fetching/creating-your-own-custom-hooks",sidebar_label:"Creating your own custom hooks"},sidebar:"tutorialSidebar",previous:{title:"Caching",permalink:"/docs/learn/data-fetching/caching"},next:{title:"Prefetching data on the server",permalink:"/docs/learn/data-fetching/prefetching"}},p={},c=[{value:"Creating a custom hook for a custom post type",id:"creating-a-custom-hook-for-a-custom-post-type",level:2},{value:"Creating your own AppSettings hook",id:"creating-your-own-appsettings-hook",level:2},{value:"Custom Strategies",id:"custom-strategies",level:2}],u={toc:c};function l(t){let{components:e,...o}=t;return(0,r.kt)("wrapper",(0,n.Z)({},u,o,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"custom-hooks"},"Custom hooks"),(0,r.kt)("p",null,"Sometimes it might be useful to wrap the framework data-fetching hooks into your own hooks."),(0,r.kt)("h2",{id:"creating-a-custom-hook-for-a-custom-post-type"},"Creating a custom hook for a custom post type"),(0,r.kt)("p",null,"Let's say you have a custom post type and you want to abstract the parameters needed to get that custom post type. You can create your own hook and pass in the required params."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=src/hooks/useBook.js",title:"src/hooks/useBook.js"},"import { usePost } from '@headstartwp/next';\n\nconst defaultParams = {\n    postType: 'book',\n    _embed: true,\n};\n\nexport function useBook(params = {}) {\n    return usePost({ ...params, ...defaultParams }, options);\n}\n\nuseBook.fetcher = (sourceUrl?: string) => {\n    const fetcher = usePost.fetcher(sourceUrl, defaultParams);\n    return fetcher;\n};\n")),(0,r.kt)("p",null,"That way, you don't need to keep passing around the ",(0,r.kt)("inlineCode",{parentName:"p"},"defaultParams")," whenever you want to fetch a single book."),(0,r.kt)("p",null,"By wrapping ",(0,r.kt)("inlineCode",{parentName:"p"},"useBook.fetcher")," we can also pass a set of default params to the default ",(0,r.kt)("inlineCode",{parentName:"p"},"usePost")," fetcher function. This ensures that when you use ",(0,r.kt)("inlineCode",{parentName:"p"},"fetchHookData")," on the server, the data is fetched using the default parameters."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// no need to manually pass `{ params: { postType: 'book' } }\nconst bookData = await fetchHookData(useBook.fetcher(), context);\n")),(0,r.kt)("p",null,"This is also useful if you're using TypeScript and your custom post type has additional meta fields."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=src/hooks/useBook.ts",title:"src/hooks/useBook.ts"},"import { usePost } from '@headstartwp/next';\nimport { PostEntity, PostParams } from '@headstartwp/core';\n\nconst defaultParams: PostParams = {\n    postType: 'book',\n    _embed: true,\n};\n\ninterface Book extends PostEntity {\n    isbn: string;\n}\n\nexport function useBook(params: PostParams | {} = {}) {\n    return usePost<Book>({ ...params, ...defaultParams }, options);\n}\n\nuseBook.fetcher = (sourceUrl?: string) => {\n    const fetcher = usePost.fetcher<Book>(sourceUrl, defaultParams);\n    return fetcher;\n};\n")),(0,r.kt)("p",null,"Then when using the custom hook ",(0,r.kt)("inlineCode",{parentName:"p"},"isbn")," will show up as a property of the returned post objects."),(0,r.kt)("h2",{id:"creating-your-own-appsettings-hook"},"Creating your own AppSettings hook"),(0,r.kt)("p",null,"If you're using TypeScript and you are extending the framework's app endpoint and including new fields, you can create your own custom hook and specify the additional TypeScript types."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=src/hooks/useMyAppSettings.ts",title:"src/hooks/useMyAppSettings.ts"},"import { FetchResponse, AppEntity, AppSettingsStrategy } from '@headstartwp/core';\nimport { FetchHookOptions } from '@headstartwp/core/react';\nimport { useAppSettings } from '@headstartwp/next';\n\nexport interface MyAppSettings extends AppEntity {\n    my_custom_setting: string;\n}\n\nexport function useMyAppSettings(\n    options: FetchHookOptions<FetchResponse<MyAppSettings>> = {},\n) {\n    return useAppSettings<MyAppSettings>({}, options);\n}\n\nuseMyAppSettings.fetcher = (sourceUrl?: string) =>\n    new AppSettingsStrategy<MyAppSettings>(sourceUrl);\n")),(0,r.kt)("h2",{id:"custom-strategies"},"Custom Strategies"),(0,r.kt)("p",null,"Depending on what you're doing you might need to create a completely custom Fetch Strategy. A Fetch strategy must extend ",(0,r.kt)("a",{parentName:"p",href:"/api/classes/headstartwp_core.AbstractFetchStrategy/"},"AbstractFetchStrategy")," and it must contain all of the logic needed to fetch the data."),(0,r.kt)("p",null,"If you feel like to need to create a custom strategy check out the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/10up/headstartwp/tree/develop/packages/core/src/data/strategies"},"default Fetch Strategies")," as well as the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/10up/headstartwp/tree/develop/packages/core/src/react/hooks"},"hooks")," that implements them."))}l.isMDXComponent=!0}}]);