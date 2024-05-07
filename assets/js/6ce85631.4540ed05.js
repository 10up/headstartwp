"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[1659],{3905:(e,t,n)=>{n.d(t,{Zo:()=>h,kt:()=>u});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),l=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},h=function(e){var t=l(e.components);return a.createElement(s.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,h=c(e,["components","mdxType","originalType","parentName"]),d=l(n),g=r,u=d["".concat(s,".").concat(g)]||d[g]||p[g]||i;return n?a.createElement(u,o(o({ref:t},h),{},{components:n})):a.createElement(u,o({ref:t},h))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=g;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[d]="string"==typeof e?e:r,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},9458:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var a=n(7462),r=(n(7294),n(3905));const i={slug:"/data-fetching/caching",sidebar_position:10},o="Caching",c={unversionedId:"Data Fetching/caching",id:"Data Fetching/caching",title:"Caching",description:"HeadstartWP offers a way to cache the results of any fetch strategy. This can be useful when you're not rendering static pages and therefore unable to leverage ISR. However, for most cases, we encourage leveraging Next.js built-in ISR mechanism. So before considering adopting fetch strategy caching, we recommend reviewing the on-demand revalidation docs.",source:"@site/documentation/02 - Data Fetching/caching.md",sourceDirName:"02 - Data Fetching",slug:"/data-fetching/caching",permalink:"/docs/learn/data-fetching/caching",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/docs/documentation/02 - Data Fetching/caching.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1715114956,formattedLastUpdatedAt:"May 7, 2024",sidebarPosition:10,frontMatter:{slug:"/data-fetching/caching",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Mutating Data",permalink:"/docs/learn/data-fetching/mutating"},next:{title:"Creating your own custom hooks",permalink:"/docs/learn/data-fetching/creating-your-own-custom-hooks"}},s={},l=[{value:"Enabling fetch strategy caching",id:"enabling-fetch-strategy-caching",level:2},{value:"In-Memory caching",id:"in-memory-caching",level:2},{value:"Custom cache handler",id:"custom-cache-handler",level:2},{value:"Other options",id:"other-options",level:2},{value:"afterGet",id:"afterget",level:3},{value:"beforeSet",id:"beforeset",level:3}],h={toc:l};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"caching"},"Caching"),(0,r.kt)("p",null,"HeadstartWP offers a way to cache the results of any fetch strategy. This can be useful when you're not rendering static pages and therefore unable to leverage ISR. However, for most cases, we encourage leveraging Next.js built-in ISR mechanism. So before considering adopting fetch strategy caching, we recommend reviewing the ",(0,r.kt)("a",{parentName:"p",href:"/learn/wordpress-integration/revalidate/"},"on-demand revalidation docs"),"."),(0,r.kt)("p",null,"The fetch strategy cache only runs server-side, i.e., any client-side requests coming out of fetch strategies would still reach the origin directly, this is by design since it doesn't make sense to bypass client-side fetch requests with a local cache. Additionally, certain cache handlers would simply not work in the context of the browser (redis, node-lru-cache, etc...). "),(0,r.kt)("p",null,"On the client-side, we already cache server data via ",(0,r.kt)("inlineCode",{parentName:"p"},"swr")," internal caching mechanism to avoid multiple requests to the origin when multiple components need the same data, anything beyond that simply doesn't make sense client-side."),(0,r.kt)("p",null,"You should consider fetch strategy caching if:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"You are using ",(0,r.kt)("inlineCode",{parentName:"li"},"getServerSideProps")),(0,r.kt)("li",{parentName:"ul"},"You are creating custom fetch strategies for third-party endpoints that are slow or don't have CDN caching."),(0,r.kt)("li",{parentName:"ul"},"The WordPress REST-API endpoints cannot be cached at the CDN level.")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Bear in mind that if you stack multiple layers of caching in your application it will get harder and harder to properly flush the cache. Before considering utilizing fetch strategy cache, make sure you have a plan of how content/cache will be flushed when content changes in the CMS.")),(0,r.kt)("h2",{id:"enabling-fetch-strategy-caching"},"Enabling fetch strategy caching"),(0,r.kt)("p",null,"There are two ways to enable fetch strategy caching in HeadstartWP: individually on each ",(0,r.kt)("inlineCode",{parentName:"p"},"fetchHookData")," call, or globally in ",(0,r.kt)("inlineCode",{parentName:"p"},"headstartwp.config.js"),"/",(0,r.kt)("inlineCode",{parentName:"p"},"headstartwp.config.server.js"),". "),(0,r.kt)("p",null,"Since fetch strategy caching only runs server-side, we recommend moving the cache config to ",(0,r.kt)("inlineCode",{parentName:"p"},"headstartwp.config.server.js"),", not doing so could lead to server-side code being injected in the client-side bundle which would break your build (i.e if you try to set up a Redis cache chandler). See ",(0,r.kt)("a",{parentName:"p",href:"/learn/getting-started/headless-config/#splitting-clientserver-config"},"splitting config docs"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="Enabling caching in fetchHookData"',title:'"Enabling',caching:!0,in:!0,'fetchHookData"':!0},"fetchHookData(\n    usePost.fetcher(), \n    ctx, \n    { cache: { enabled: true } }\n);\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"fetchHookData")," cache params support the same parameters as the ",(0,r.kt)("a",{parentName:"p",href:"/api/modules/headstartwp_core/#fetchstrategycacheconfig"},"cache")," property of the global config."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="Enabling caching in headstartwp.config.server.js"',title:'"Enabling',caching:!0,in:!0,'headstartwp.config.server.js"':!0},"const baseConfig = require('./headstartwp.config.client');\n\n/**\n * Config\n *\n * @type {import('@headstartwp/core').HeadlessConfig}\n */\nmodule.exports = {\n    ...baseConfig,\n    cache: {\n        enabled: ({ fetchStrategy }) => {\n            // cache app endpoints in-memory by default\n            return fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app';\n        },\n        // ttl in seconds, can also be a function\n        ttl: 5 * 60,\n    },\n};\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"cache.enabled")," can also be a function so you can decide whether to cache or not based on the fetchStrategy itself."),(0,r.kt)("h2",{id:"in-memory-caching"},"In-Memory caching"),(0,r.kt)("p",null,"The default cache handler is a TTL in-memory cache. This cache handler can be useful when you're not hosting on a serverless platform (e.g. Vercel) since the node process would be alive and therefore you can cache things in memory. On serverless hosting, by design you cannot hold state between functions invocations, therefore if you try to use an In-Memory caching it would only last for the lifetime of a single request."),(0,r.kt)("p",null,"The main use case for In-Memory caching is when you want to cache/dedupe fetch calls when you're hosting Next.js on non-serverless hostings. Note that if you have multiple node containers/pod each one of them would have its own In-Memory caching."),(0,r.kt)("h2",{id:"custom-cache-handler"},"Custom cache handler"),(0,r.kt)("p",null,"You can provide your own cache handler. For instance, if you want to cache things in Redis you can easily provide your own cache handler."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="redis cache handler"',title:'"redis',cache:!0,'handler"':!0},"const { getRedisClient } = require('@10up/next-redis-cache-provider');\nconst baseConfig = require('./headstartwp.config.client');\n\nconst redisClient = getRedisClient();\n\n/**\n * Config\n *\n * @type {import('@headstartwp/core').HeadlessConfig}\n */\nmodule.exports = {\n    ...baseConfig,\n    cache: {\n        enabled: ({ fetchStrategy }) => {\n            // cache only the app endpoint\n            return fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app' || fetchStrategy.getEndpoint() === '/wp-json/wp/v2/posts';\n        },\n\n        ttl: ({ fetchStrategy }) => {\n            if (fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app') {\n                // 30min\n                return 30 * 60;\n            }\n\n            // 5min\n            return 5 * 60;\n        },\n\n        /**\n         * @type {import('@headstartwp/core').FetchStrategyCacheHandler}\n         */\n        cacheHandler: {\n            async set(key, data, ttl) {\n                return redisClient.set(key, JSON.stringify(data), 'EX', ttl);\n            },\n            async get(key) {\n                const data = await redisClient.get(key);\n                return JSON.parse(data);\n            },\n        },\n    },\n};\n")),(0,r.kt)("h2",{id:"other-options"},"Other options"),(0,r.kt)("h3",{id:"afterget"},"afterGet"),(0,r.kt)("p",null,"This is a function that will get called after retrieving data from the cache and can be used to modify the response."),(0,r.kt)("h3",{id:"beforeset"},"beforeSet"),(0,r.kt)("p",null,"This is a function that will get called before storing data in the cache and can be used to modify the data that is going to be cached. This can be used to remove things that should not be cached."),(0,r.kt)("p",null,"As an example, you might want to remove particular fields from the cache and always calculate it dynamically with ",(0,r.kt)("inlineCode",{parentName:"p"},"afterGet"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="redis cache handler with afterGet and beforeGet"',title:'"redis',cache:!0,handler:!0,with:!0,afterGet:!0,and:!0,'beforeGet"':!0},"const { getRedisClient } = require('@10up/next-redis-cache-provider');\nconst baseConfig = require('./headstartwp.config.client');\n\nconst redisClient = getRedisClient();\n\n/**\n * Config\n *\n * @type {import('@headstartwp/core').HeadlessConfig}\n */\nmodule.exports = {\n    ...baseConfig,\n    cache: {\n        enabled: ({ fetchStrategy }) => {\n            // cache app endpoints in-memory by default\n            return fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app';\n        },\n\n        /**\n         * @type {import('@headstartwp/core').FetchStrategyCacheHandler}\n         */\n        cacheHandler: {\n            async set(key, data, ttl) {\n                return redisClient.set(key, JSON.stringify(data), 'EX', ttl);\n            },\n            async get(key) {\n                const data = await redisClient.get(key);\n                return JSON.parse(data);\n            },\n        },\n\n        // This assumes the app endpoints include user data if user is logged in\n        afterGet: async ({ fetchStrategy }, data) => {\n            if (fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app') {\n                const user = await getUserData();\n                data.result.user = user;\n            }\n\n            return data;\n        },\n\n        beforeSet: async ({ fetchStrategy }, data) => {\n            if (fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app') {\n                // do not store user data\n                delete data.result.data;\n            }\n\n            return data;\n        },\n    },\n};\n")))}d.isMDXComponent=!0}}]);