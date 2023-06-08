"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[521],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),p=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},l=function(e){var t=p(e.components);return a.createElement(c.Provider,{value:t},e.children)},d="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),d=p(n),u=r,f=d["".concat(c,".").concat(u)]||d[u]||h[u]||o;return n?a.createElement(f,s(s({ref:t},l),{},{components:n})):a.createElement(f,s({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=u;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[d]="string"==typeof e?e:r,s[1]=i;for(var p=2;p<o;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6448:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const o={slug:"/data-fetching/prefetching"},s="Prefetching data on the server",i={unversionedId:"Data Fetching/prefetching-data-server",id:"Data Fetching/prefetching-data-server",title:"Prefetching data on the server",description:"To enable prefetching data on the server use the fetchHookData function alongside addHookData.",source:"@site/documentation/02 - Data Fetching/prefetching-data-server.md",sourceDirName:"02 - Data Fetching",slug:"/data-fetching/prefetching",permalink:"/docs/learn/data-fetching/prefetching",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/site/documentation/02 - Data Fetching/prefetching-data-server.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Oliveira",lastUpdatedAt:1686239007,formattedLastUpdatedAt:"Jun 8, 2023",frontMatter:{slug:"/data-fetching/prefetching"},sidebar:"tutorialSidebar",previous:{title:"Creating your own custom hooks",permalink:"/docs/learn/data-fetching/creating-your-own-custom-hooks"},next:{title:"Rendering Blocks",permalink:"/docs/learn/gutenberg/rendering-blocks"}},c={},p=[],l={toc:p};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"prefetching-data-on-the-server"},"Prefetching data on the server"),(0,r.kt)("p",null,"To enable prefetching data on the server use the ",(0,r.kt)("inlineCode",{parentName:"p"},"fetchHookData")," function alongside ",(0,r.kt)("inlineCode",{parentName:"p"},"addHookData"),".\nWe also recommend using the ",(0,r.kt)("inlineCode",{parentName:"p"},"handleError")," function and to wrap the ",(0,r.kt)("inlineCode",{parentName:"p"},"fetchHookData")," call in a try/catch."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="src/pages/[...path].js"',title:'"src/pages/[...path].js"'},"import { \n    usePost, \n    fetchHookData, \n    addHookData, \n    handleError\n} from '@headstartwp/next';\n\nconst params = { postType: ['post', 'page'] };\n\nconst SinglePostsPage = () => {\n    const { data } = usePost(params);\n\n    // when doing ssr/ssg data will always be avaliable so handling loading/error state is optional\n\n    return (\n        <div>\n            <h2>{data?.post.title.rendered}</h2>\n        </div>\n    );\n};\n\nexport default SinglePostsPage;\n\n// or export async function getServerSideProps(context)\nexport async function getStaticProps(context) {\n    try {\n        const usePostHook = await fetchHookData(usePost.fetcher(), context, { params });\n\n        return addHookData([usePostHook], { myCustomProp: 'value' });\n    } catch (e) {\n        return handleError(e, context);\n    }\n}\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("a",{parentName:"li",href:"/api/modules/headstartwp_next#fetchhookdata"},"fetchHookData")," function receives a ",(0,r.kt)("a",{parentName:"li",href:"/api/classes/headstartwp_core.AbstractFetchStrategy/"},"strategy"),", the Next.js context object and an object containing the params. The ",(0,r.kt)("inlineCode",{parentName:"li"},"params")," must match the params passed to the hook, hence why it's been moved into a variable outside of the ",(0,r.kt)("inlineCode",{parentName:"li"},"SinglePostsPage")," component."),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("a",{parentName:"li",href:"/api/modules/headstartwp_next#addhookdata"},"addHookData")," receives an array of responses returned by ",(0,r.kt)("inlineCode",{parentName:"li"},"fetchHookData")," and prepares that data to be returned to the page as props. If you need to pass additional props just pass them in the second argument."),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("a",{parentName:"li",href:"/api/modules/headstartwp_next#ahandleError"},"handleError")," function handles errors such as 404, redirects (when redirects are set to 404) among other things.")),(0,r.kt)("p",null,"We recommend reviewing the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/10up/headstartwp/tree/develop/projects/wp-nextjs"},"starter project")," for more examples of prefetching data on the server."))}d.isMDXComponent=!0}}]);