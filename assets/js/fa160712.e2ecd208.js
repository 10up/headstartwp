"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[3589],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>m});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=n.createContext({}),l=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},h="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,s=e.originalType,c=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),h=l(a),d=r,m=h["".concat(c,".").concat(d)]||h[d]||u[d]||s;return a?n.createElement(m,i(i({ref:t},p),{},{components:a})):n.createElement(m,i({ref:t},p))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=a.length,i=new Array(s);i[0]=d;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[h]="string"==typeof e?e:r,i[1]=o;for(var l=2;l<s;l++)i[l]=a[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},7848:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var n=a(7462),r=(a(7294),a(3905));const s={slug:"/data-fetching/usesearch-native",sidebar_position:5},i="The useSearchNative hook",o={unversionedId:"Data Fetching/useSearchNative",id:"Data Fetching/useSearchNative",title:"The useSearchNative hook",description:"The useSearchNative hook is the Next.js binding for the useFetchSearchNative.",source:"@site/documentation/02 - Data Fetching/useSearchNative.md",sourceDirName:"02 - Data Fetching",slug:"/data-fetching/usesearch-native",permalink:"/docs/learn/data-fetching/usesearch-native",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/docs/documentation/02 - Data Fetching/useSearchNative.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1710434746,formattedLastUpdatedAt:"Mar 14, 2024",sidebarPosition:5,frontMatter:{slug:"/data-fetching/usesearch-native",sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"The useSearch hook",permalink:"/docs/learn/data-fetching/usesearch"},next:{title:"The useSeo hook",permalink:"/docs/learn/data-fetching/useSeo"}},c={},l=[{value:"Basic Usage",id:"basic-usage",level:2},{value:"Searching from multiple post types",id:"searching-from-multiple-post-types",level:2},{value:"Searching for terms",id:"searching-for-terms",level:2},{value:"Accessing embeddable data",id:"accessing-embeddable-data",level:2},{value:"QueriedObject",id:"queriedobject",level:2}],p={toc:l};function h(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"the-usesearchnative-hook"},"The useSearchNative hook"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"The ",(0,r.kt)("a",{parentName:"p",href:"/api/modules/headstartwp_next#usesearchnative"},"useSearchNative")," hook is the Next.js binding for the ",(0,r.kt)("a",{parentName:"p",href:"/api/namespaces/headstartwp_core.react#usefetchsearchnative"},"useFetchSearchNative"),".")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"useSearchNative")," hook is the implementation of core ",(0,r.kt)("a",{parentName:"p",href:"https://developer.wordpress.org/rest-api/reference/search-results/"},"Search Results")," endpoint."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"This hook was introduced in ",(0,r.kt)("inlineCode",{parentName:"p"},"@headstartwp/core@1.3.0"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"@headstartwp/next@1.3.0")," and requires the the HeadstartWP WordPress plugin >= 1.1.0")),(0,r.kt)("p",null,"The headstartwp WordPress plugin does additional customizations to ensure the Search Results endpoints return all the embeddable data associated with search results."),(0,r.kt)("h2",{id:"basic-usage"},"Basic Usage"),(0,r.kt)("p",null,"Assuming a ",(0,r.kt)("inlineCode",{parentName:"p"},"src/pages/search/[[...path]].js")," route with the following content."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"This example is using the optional catch-all route ",(0,r.kt)("inlineCode",{parentName:"p"},"[[..path]].js")," because we want the ",(0,r.kt)("inlineCode",{parentName:"p"},"/search")," route to be handled by the same file and fetch the latest posts.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="src/pages/search/[[...path]].js"',title:'"src/pages/search/[[...path]].js"'},"import { useSearchNative } from '@headstartwp/next';\n\nconst ArchivePage = () => {\n    const { loading, error, data } = useSearchNative({ per_page: 10 });\n\n    if (loading) {\n        return 'Loading...';\n    }\n\n    if (error) {\n        return 'error...';\n    }\n\n    if (data.pageInfo.totalItems === 0) {\n        return 'Nothing found';\n    }\n\n    return (\n        <>\n            <h1>Search Results</h1>\n            <ul>\n                {data.searchResults.map((item) => (\n                    <li key={item.id}>\n                        <Link href={item.url}>\n                            {item.id} - {item.title}\n                        </Link>\n                    </li>\n                ))}\n            </ul>\n        </>\n    );\n};\n")),(0,r.kt)("p",null,"The route will automatically render the latest 10 results if no search term is provided. The following paths are automatically handled:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"/search/search-term"),(0,r.kt)("li",{parentName:"ul"},"/search/search-term/page/2"),(0,r.kt)("li",{parentName:"ul"},"/search")),(0,r.kt)("h2",{id:"searching-from-multiple-post-types"},"Searching from multiple post types"),(0,r.kt)("p",null,"You can specify any of the supported parameters described in the ",(0,r.kt)("a",{parentName:"p",href:"https://developer.wordpress.org/rest-api/reference/search-results/#arguments"},"Search Results")," endpoint documentation."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="src/pages/search/[[...path]].js"',title:'"src/pages/search/[[...path]].js"'},"import { useSearchNative } from '@headstartwp/next';\n\nconst ArchivePage = () => {\n    const { loading, error, data } = useSearchNative({ \n        per_page: 10, \n        type: 'post', \n        subtype: ['post', 'page'] \n    });\n\n    if (loading) {\n        return 'Loading...';\n    }\n\n    if (error) {\n        return 'error...';\n    }\n\n    if (data.pageInfo.totalItems === 0) {\n        return 'Nothing found';\n    }\n\n    return (\n        <>\n            <h1>Search Results</h1>\n            <ul>\n                {data.searchResults.map((item) => (\n                    <li key={item.id}>\n                        <Link href={item.url}>\n                            {item.id} - {item.title}\n                        </Link>\n                    </li>\n                ))}\n            </ul>\n        </>\n    );\n};\n")),(0,r.kt)("h2",{id:"searching-for-terms"},"Searching for terms"),(0,r.kt)("p",null,"You can also search for terms:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="src/pages/terms/search/[[...path]].js"',title:'"src/pages/terms/search/[[...path]].js"'},"import { useSearch } from '@headstartwp/next';\n\nconst ArchivePage = () => {\n    const { loading, error, data } = useSearchNative({ \n        per_page: 10, \n        type: 'term',\n        subtype: ['category', 'category'] \n    });\n\n    if (loading) {\n        return 'Loading...';\n    }\n\n    if (error) {\n        return 'error...';\n    }\n\n    if (data.pageInfo.totalItems === 0) {\n        return 'Nothing found';\n    }\n\n    return (\n        <>\n            <h1>Search Results</h1>\n            <ul>\n                {data.searchResults.map((item) => (\n                    <li key={item.id}>\n                        <Link href={item.url}>\n                            {item.id} - {item.title}\n                        </Link>\n                    </li>\n                ))}\n            </ul>\n        </>\n    );\n};\n")),(0,r.kt)("h2",{id:"accessing-embeddable-data"},"Accessing embeddable data"),(0,r.kt)("p",null,"By default, the Search Results endpoints only return the object of the associated search results but do not return embeddable data of the search results entities themselves. For instance, when searching for posts, even if you pass the ",(0,r.kt)("inlineCode",{parentName:"p"},"_embed")," parameter, WordPress won't return the associated term objects, author objects etc."),(0,r.kt)("p",null,"HeadstartWP plugin extends the core endpoint so that it returns these embedded objects to avoid the need for additional queries. Check the ",(0,r.kt)("a",{parentName:"p",href:"/api/interfaces/headstartwp_core.PostSearchEntity/"},"PostSearchEntity")," and ",(0,r.kt)("a",{parentName:"p",href:"/api/interfaces/headstartwp_core.TermSearchEntity/"},"TermSearcheEntity"),"."),(0,r.kt)("h2",{id:"queriedobject"},"QueriedObject"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"useNativeSearch")," hook also exposes a ",(0,r.kt)("inlineCode",{parentName:"p"},"queriedObject"),"."),(0,r.kt)("p",null,"The queried object for this hook is an object of type ",(0,r.kt)("a",{parentName:"p",href:"/api/interfaces/headstartwp_core.SearchEntity/"},"SearchEntity"),"."))}h.isMDXComponent=!0}}]);