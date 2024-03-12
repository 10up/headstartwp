"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[1425],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),p=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=p(n),c=r,m=u["".concat(l,".").concat(c)]||u[c]||h[c]||a;return n?o.createElement(m,s(s({ref:t},d),{},{components:n})):o.createElement(m,s({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,s=new Array(a);s[0]=c;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:r,s[1]=i;for(var p=2;p<a;p++)s[p]=n[p];return o.createElement.apply(null,s)}return o.createElement.apply(null,n)}c.displayName="MDXCreateElement"},6265:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var o=n(7462),r=(n(7294),n(3905));const a={slug:"/getting-started/headless-config",sidebar_position:3},s="Configuring the Framework",i={unversionedId:"Getting Started/headless-config",id:"Getting Started/headless-config",title:"Configuring the Framework",description:"The headstartwp.config.js (previously, headless.config.js) file contains several config options for HeadstartWP. This file should export an object of type HeadlessConfig.",source:"@site/documentation/01-Getting Started/headless-config.md",sourceDirName:"01-Getting Started",slug:"/getting-started/headless-config",permalink:"/docs/learn/getting-started/headless-config",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/docs/documentation/01-Getting Started/headless-config.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1710262450,formattedLastUpdatedAt:"Mar 12, 2024",sidebarPosition:3,frontMatter:{slug:"/getting-started/headless-config",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Setting up the framework from scratch",permalink:"/docs/learn/getting-started/setting-up-manually"},next:{title:"Installing WordPress Plugin",permalink:"/docs/learn/getting-started/installing-wordpress-plugin"}},l={},p=[{value:"Usage with Next.js",id:"usage-with-nextjs",level:2},{value:"sourceUrl",id:"sourceurl",level:2},{value:"useWordPressPlugin",id:"usewordpressplugin",level:2},{value:"hostUrl",id:"hosturl",level:2},{value:"host",id:"host",level:2},{value:"customPostTypes",id:"customposttypes",level:2},{value:"customTaxonomies",id:"customtaxonomies",level:2},{value:"restParam",id:"restparam",level:3},{value:"rewrite",id:"rewrite",level:3},{value:"redirectStrategy",id:"redirectstrategy",level:2},{value:"debug",id:"debug",level:2},{value:"preview",id:"preview",level:2},{value:"alternativeAuthorizationHeader",id:"alternativeauthorizationheader",level:3},{value:"usePostLinkForRedirect",id:"usepostlinkforredirect",level:3}],d={toc:p};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"configuring-the-framework"},"Configuring the Framework"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"headstartwp.config.js")," (previously, ",(0,r.kt)("inlineCode",{parentName:"p"},"headless.config.js"),") file contains several config options for HeadstartWP. This file should export an object of type ",(0,r.kt)("a",{parentName:"p",href:"/api/modules/headstartwp_core/#headlessconfig"},"HeadlessConfig"),"."),(0,r.kt)("h2",{id:"usage-with-nextjs"},"Usage with Next.js"),(0,r.kt)("p",null,"The file ",(0,r.kt)("strong",{parentName:"p"},"must be named")," either ",(0,r.kt)("inlineCode",{parentName:"p"},"headstartwp.config.js")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"headless.config.js"),". When ",(0,r.kt)("inlineCode",{parentName:"p"},"injectConfig")," param of ",(0,r.kt)("inlineCode",{parentName:"p"},"withHeadstartWPConfig")," (previously ",(0,r.kt)("inlineCode",{parentName:"p"},"withHeadlessConfig"),") is set to true, the framework will look for these two files to be injected and loaded in the runtime bundle of the Next.js App."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=next.config.js",title:"next.config.js"},"const { withHeadstartWPConfig } = require('@headstartwp/next/config');\n\n/**\n * Update whatever you need within the nextConfig object.\n *\n * @type {import('next').NextConfig}\n */\nconst nextConfig = {};\n\nmodule.exports = withHeadstartWPConfig(nextConfig);\n")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Since ",(0,r.kt)("inlineCode",{parentName:"p"},"@headstartwp/next@1.2.0")," you do not need to import ",(0,r.kt)("inlineCode",{parentName:"p"},"headstartwp.config.js")," in ",(0,r.kt)("inlineCode",{parentName:"p"},"next.config.js")," anymore, the framework will dynamically load the config.")),(0,r.kt)("p",null,"Here's a sample config file"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript",metastring:'title="headstartwp.config.js"',title:'"headstartwp.config.js"'},"module.exports = {\n    sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,\n    hostUrl: process.env.HOST_URL,\n    customPostTypes: [],\n    customTaxonomies: [],\n    redirectStrategy: '404',\n    useWordPressPlugin: true,\n    debug: {\n        redirects: false,\n        requests: false,\n    }\n};\n")),(0,r.kt)("h2",{id:"sourceurl"},"sourceUrl"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"sourceUrl")," option should point to a valid WordPress installation from where the headless site should be sourced to."),(0,r.kt)("h2",{id:"usewordpressplugin"},"useWordPressPlugin"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"useWordPressPlugin")," indicates whether the WordPress instance at ",(0,r.kt)("inlineCode",{parentName:"p"},"sourceUrl")," contains the Headless WordPress plugin. While it is possible to use this framework without the plugin, it is strongly recommended to install the WP plugin and set this option to true."),(0,r.kt)("h2",{id:"hosturl"},"hostUrl"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"hostUrl")," option should contain the value where the frontend app lives. This would typically be the public domain of the site."),(0,r.kt)("h2",{id:"host"},"host"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"host")," option is automatically inferred if ",(0,r.kt)("inlineCode",{parentName:"p"},"hostUrl")," is set. You probably don't need to set this option by yourself. The ",(0,r.kt)("inlineCode",{parentName:"p"},"host")," value is used by the multisite feature to match the current site to a site config."),(0,r.kt)("h2",{id:"customposttypes"},"customPostTypes"),(0,r.kt)("p",null,"To add support for custom post types, add your custom post type to the ",(0,r.kt)("inlineCode",{parentName:"p"},"customPostTypes")," setting in ",(0,r.kt)("inlineCode",{parentName:"p"},"headstartwp.config.js"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="headstartwp.config.js"',title:'"headstartwp.config.js"'},"module.exports = {\n    sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,\n    hostUrl: process.env.HOST_URL,\n    customPostTypes: [\n        {\n            slug: 'book',\n            endpoint: '/wp-json/wp/v2/book',\n            // these should match your file-system routing\n            single: '/book',\n            archive: '/books',\n        },\n    ],\n}\n")),(0,r.kt)("p",null,"After adding a custom post type to the config, you will be able to fetch posts from the registered post type via the slug:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"usePost({ postType: ['book'] });\nusePosts({ postType:'book', perPage: 10 });\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"single")," option is required for several things including:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},'properly previewing custom post types when the "single" route is at a different prefix. E.g: ',(0,r.kt)("inlineCode",{parentName:"li"},"/book/da-vince-code")," instead of ",(0,r.kt)("inlineCode",{parentName:"li"},"/da-vice-code"),"; In this case, the framework will use the ",(0,r.kt)("inlineCode",{parentName:"li"},"single")," path to redirect the previewed post to the right path/route."),(0,r.kt)("li",{parentName:"ul"},"Matching post path permalinks with the current URL. E.g: when fetching a single custom post type the framework will filter the returned posts to the one that matches the existing URL. Therefore, the framework needs to know the single prefix url for custom post types. This is required to properly handle parent pages that share the same child slug. See ",(0,r.kt)("a",{parentName:"li",href:"/learn/data-fetching/usepost/#post-path-matching"},"post path mapping")," for more info.")),(0,r.kt)("p",null,"It is also possible to pass a function, when doing so the default post types (post and pages) will be passed to the function. The code snipped below will disable ",(0,r.kt)("a",{parentName:"p",href:"/learn/data-fetching/usepost/#post-path-matching"},"post path mapping")," to the default post types."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="headstartwp.config.js"',title:'"headstartwp.config.js"'},"module.exports = {\n    sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,\n    hostUrl: process.env.HOST_URL,\n    customPostTypes: (defaultPostTypes) => {\n        // disable post path mapping for default post types\n        return defaultPostTypes.map((postType) => ({...postType, matchSinglePath: false}));\n    }\n}\n")),(0,r.kt)("h2",{id:"customtaxonomies"},"customTaxonomies"),(0,r.kt)("p",null,"To add support for custom taxonomies, add your custom taxonomy to the ",(0,r.kt)("inlineCode",{parentName:"p"},"customTaxonomies")," setting in ",(0,r.kt)("inlineCode",{parentName:"p"},"headstartwp.config.js"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="headstartwp.config.js"',title:'"headstartwp.config.js"'},"module.exports = {\n    customPostTypes: [\n        {\n            slug: 'book',\n            endpoint: '/wp-json/wp/v2/book',\n            // these should match your file-system routing\n            single: '/book',\n            archive: '/books',\n        },\n    ],\n    customTaxonomies: [\n        { \n            slug: 'genre',\n            endpoint: '/wp-json/wp/v2/genre',\n            postType: ['book'],\n            rewrite: 'genre',\n            restParam: 'genre'\n        },\n    ],\n}\n")),(0,r.kt)("p",null,"After adding a custom taxonomy to the config, you will be able to filter posts by the registered taxonomy or fetch terms from it."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"usePost({ postType: ['book'], genre: 'action' });\nusePosts({ postType:'book', genre: 'action', perPage: 10 });\nuseTerms({ taxonomy: 'genre' });\n")),(0,r.kt)("p",null,"Additionally, if you have an archive route such as ",(0,r.kt)("inlineCode",{parentName:"p"},"/blog")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"/books")," filtering for all registered taxonomies works out of the box. For instance, take the headless config above the following page route:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=src/pages/books/[[...path]].js",title:"src/pages/books/[[...path]].js"},"import { usePosts } from '@headstartwp/next';\nconst BooksPage = () => {\n    const { data, error, loading } = usePosts({postType: 'book'});\n\n    if (error) {\n        return 'error';\n    }\n\n    if (loading) {\n        return 'Loading...';\n    }\n\n    return (\n        <ul>\n            {data.posts.map((post) => (\n                <li key={post.id}>{post.title.rendered}</li>\n            ))}\n        </ul>\n    );\n};\n\nexport default BooksPage;\n")),(0,r.kt)("p",null,"This route would automatically handle the following URLs:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"/books -> list latest books"),(0,r.kt)("li",{parentName:"ul"},"/books/page/x -> paginate books"),(0,r.kt)("li",{parentName:"ul"},"/books/genre/genre-name -> filter books by genre"),(0,r.kt)("li",{parentName:"ul"},"/books/genre/genre-name/page/2 -> paginate books filtered by genre")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"The code snippet above does not implement pre-fetching, which you probably want to. Check out the ",(0,r.kt)("a",{parentName:"p",href:"/learn/data-fetching/prefetching"},"pre-fetching docs")," for instructions.")),(0,r.kt)("p",null,"It is also possible to specify a function for 'customTaxonomies', when doing so the default taxonomies will be passed to the function. This can be used for instance to enable ",(0,r.kt)("a",{parentName:"p",href:"/learn/data-fetching/useposts#archive-path-matching"},"archive path matching"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="headstartwp.config.js"',title:'"headstartwp.config.js"'},"module.exports = {\n    customPostTypes: [\n        {\n            slug: 'book',\n            endpoint: '/wp-json/wp/v2/book',\n            // these should match your file-system routing\n            single: '/book',\n            archive: '/books',\n        },\n    ],\n    customTaxonomies: (defaultTaxonomies) => {\n        return defaultTaxonomies.map((taxonomy) => ({ ...taxonomy, matchArchivePath: true })),\n    },\n}\n")),(0,r.kt)("h3",{id:"restparam"},"restParam"),(0,r.kt)("p",null,"This option shouldn't be necessary most of the time, but this is used to map a custom taxonomy to its REST API parameter. Most of the times the slug is equal to the restParam but in some cases it differs. For instance, the default post tag taxonomy has a slug of ",(0,r.kt)("inlineCode",{parentName:"p"},"post_tag")," but a ",(0,r.kt)("inlineCode",{parentName:"p"},"restParam")," of ",(0,r.kt)("inlineCode",{parentName:"p"},"tags")," (i.e., to filter posts by ",(0,r.kt)("inlineCode",{parentName:"p"},"tags")," in the REST API, we must use ",(0,r.kt)("inlineCode",{parentName:"p"},"tags=<tag-id>"),")."),(0,r.kt)("h3",{id:"rewrite"},"rewrite"),(0,r.kt)("p",null,"This option controls the expected prefix the taxonomy must use in front-end urls. This generally should match ",(0,r.kt)("inlineCode",{parentName:"p"},"rewrite.slug")," of the ",(0,r.kt)("a",{parentName:"p",href:"https://developer.wordpress.org/reference/functions/register_taxonomy/"},"register_taxonomy")," function."),(0,r.kt)("h2",{id:"redirectstrategy"},"redirectStrategy"),(0,r.kt)("p",null,"This option control how redirects are handled. There are 2 supported methods of handling redirects."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"404: If a route 404, the framework will check to see if there's a redirect for that page in WP. If so it performs the redirect. This is the recommended option."),(0,r.kt)("li",{parentName:"ul"},"always: When this option is set, the framework will ",(0,r.kt)("strong",{parentName:"li"},"always")," check for redirects before rendering any page. Using this option carefully since it will impact performance.")),(0,r.kt)("h2",{id:"debug"},"debug"),(0,r.kt)("p",null,"You can enable log debugging for both requests and redirects. ",(0,r.kt)("inlineCode",{parentName:"p"},"debug.requests")," will enable logging all API requests made by the framework and ",(0,r.kt)("inlineCode",{parentName:"p"},"debug.redirects")," will log all attempts to detect and fetch a redirect from WordPress."),(0,r.kt)("h2",{id:"preview"},"preview"),(0,r.kt)("h3",{id:"alternativeauthorizationheader"},"alternativeAuthorizationHeader"),(0,r.kt)("p",null,"Tells HeadstartWP to use an alternative header (",(0,r.kt)("inlineCode",{parentName:"p"},"X-HeadstartWP-Authorization"),") instead of the default ",(0,r.kt)("inlineCode",{parentName:"p"},"Authorization")," header for making authenticated preview requests."),(0,r.kt)("p",null,"Make sure you have HeadstartWP plugin >= 1.0.1, ",(0,r.kt)("inlineCode",{parentName:"p"},"@headstartwp/core")," >= 1.3.1 and ",(0,r.kt)("inlineCode",{parentName:"p"},"@headstartwp/next"),">= 1.3.1 to use this setting."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"module.exports = {\n    // other configs.\n    // ...\n\n    preview: {\n        alternativeAuthorizationHeader: true\n    }\n}\n")),(0,r.kt)("h3",{id:"usepostlinkforredirect"},"usePostLinkForRedirect"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"This feature was added in ",(0,r.kt)("inlineCode",{parentName:"p"},"@headstartwp/next@1.3.3")," and requires the plugin version >= 1.1.2.")),(0,r.kt)("p",null,"This option, if enabled, will use the ",(0,r.kt)("inlineCode",{parentName:"p"},"post.link")," property of the post being previewed to redirect to the appropriate route for previewing. This can be very useful to avoid the need for providing a custom ",(0,r.kt)("a",{parentName:"p",href:"/learn/wordpress-integration/previews#getredirectpath"},"getRedirectPath")," implementation by telling the preview handler to simply use the post's link as returned via the WordPress ",(0,r.kt)("inlineCode",{parentName:"p"},"get_permalink")," function."),(0,r.kt)("p",null,"Note that you will want to make sure that your WordPress permalink structure closely follows the route structure of your Next.js app for this option to work well."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"module.exports = {\n    // other configs.\n    // ...\n\n    preview: {\n        usePostLinkForRedirect: true\n    }\n}\n")),(0,r.kt)("p",null,"More for info check out the ",(0,r.kt)("a",{parentName:"p",href:"/learn/wordpress-integration/previews#the-usepostlinkforredirect-setting"},"preview docs"),"."))}u.isMDXComponent=!0}}]);