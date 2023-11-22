"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[8604],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),l=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=l(e.components);return a.createElement(p.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),c=l(n),g=r,h=c["".concat(p,".").concat(g)]||c[g]||u[g]||o;return n?a.createElement(h,s(s({ref:t},d),{},{components:n})):a.createElement(h,s({ref:t},d))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=g;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[c]="string"==typeof e?e:r,s[1]=i;for(var l=2;l<o;l++)s[l]=n[l];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},260:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>c,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var a=n(7462),r=(n(7294),n(3905));const o={slug:"/getting-started/setting-up-manually",sidebar_position:1},s="Setting up the framework from scratch",i={unversionedId:"Getting Started/setting-up-manually",id:"Getting Started/setting-up-manually",title:"Setting up the framework from scratch",description:"The recommended way to get started with the framework is by installing the official starter project. See Quick Setup for more information.",source:"@site/documentation/01-Getting Started/setting-up-manually.md",sourceDirName:"01-Getting Started",slug:"/getting-started/setting-up-manually",permalink:"/docs/learn/getting-started/setting-up-manually",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/docs/documentation/01-Getting Started/setting-up-manually.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1700617979,formattedLastUpdatedAt:"Nov 22, 2023",sidebarPosition:1,frontMatter:{slug:"/getting-started/setting-up-manually",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Quick Setup",permalink:"/docs/learn/getting-started/quick-setup"},next:{title:"Configuring the Framework",permalink:"/docs/learn/getting-started/headless-config"}},p={},l=[{value:"Bootstrap the Next.js project",id:"bootstrap-the-nextjs-project",level:2},{value:"headstartwp.config.js",id:"headstartwpconfigjs",level:3},{value:"Env variables",id:"env-variables",level:3},{value:"next.config.js",id:"nextconfigjs",level:3},{value:"pages/_app.js",id:"pages_appjs",level:3},{value:"Setting up the preview endpoint",id:"setting-up-the-preview-endpoint",level:3},{value:"Setting up the revalidate endpoint",id:"setting-up-the-revalidate-endpoint",level:3},{value:"Creating your first route",id:"creating-your-first-route",level:3},{value:"Add SSR/SSG",id:"add-ssrssg",level:3}],d={toc:l};function c(e){let{components:t,...o}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"setting-up-the-framework-from-scratch"},"Setting up the framework from scratch"),(0,r.kt)("p",null,"The recommended way to get started with the framework is by installing the official starter project. See ",(0,r.kt)("a",{parentName:"p",href:"/learn/getting-started/quick-setup/"},"Quick Setup")," for more information."),(0,r.kt)("p",null,"This guide will help you set up the framework in a clean Next.js project."),(0,r.kt)("h2",{id:"bootstrap-the-nextjs-project"},"Bootstrap the Next.js project"),(0,r.kt)("p",null,"Start by bootstrapping your next.js project."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx create-next-app@latest --use-npm\n")),(0,r.kt)("p",null,"and install the following packages"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"npm install --save @headstartwp/core @headstartwp/next\n")),(0,r.kt)("h3",{id:"headstartwpconfigjs"},"headstartwp.config.js"),(0,r.kt)("p",null,"Create a ",(0,r.kt)("inlineCode",{parentName:"p"},"headstartwp.config.js")," file at the root of your Next.js project."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="headstartwp.config.js"',title:'"headstartwp.config.js"'},"/**\n * Headless Config\n *\n * @type {import('@headstartwp/core').HeadlessConfig}\n */\nmodule.exports = {\n    sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,\n\n    useWordPressPlugin: true,\n};\n")),(0,r.kt)("h3",{id:"env-variables"},"Env variables"),(0,r.kt)("p",null,"Then create a ",(0,r.kt)("inlineCode",{parentName:"p"},".env")," (or ",(0,r.kt)("inlineCode",{parentName:"p"},".env.local"),") with the following contents:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"NEXT_PUBLIC_HEADLESS_WP_URL=https://my-wordpress.test\n")),(0,r.kt)("p",null,"You can call the env variable anything you want, just make sure to update ",(0,r.kt)("inlineCode",{parentName:"p"},"headstartwp.config.js")," accordingly."),(0,r.kt)("p",null,"If you're developing locally and your WordPress instance uses https but does not have a valid cert, add ",(0,r.kt)("inlineCode",{parentName:"p"},"NODE_TLS_REJECT_UNAUTHORIZED=0")," to your env variables."),(0,r.kt)("h3",{id:"nextconfigjs"},"next.config.js"),(0,r.kt)("p",null,"Create a ",(0,r.kt)("inlineCode",{parentName:"p"},"next.config.js")," file with the following contents:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=next.config.js",title:"next.config.js"},"const { withHeadstartWPConfig } = require('@headstartwp/next/config');\n\n/**\n * Update whatever you need within the nextConfig object.\n *\n * @type {import('next').NextConfig}\n */\nconst nextConfig = {};\n\nmodule.exports = withHeadstartWPConfig(nextConfig);\n")),(0,r.kt)("h3",{id:"pages_appjs"},"pages/_app.js"),(0,r.kt)("p",null,"Create a custom ",(0,r.kt)("inlineCode",{parentName:"p"},"_app.js")," to wrap the application with ",(0,r.kt)("inlineCode",{parentName:"p"},"HeadlessApp")," component."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=src/pages/_app.js",title:"src/pages/_app.js"},"import { HeadlessApp } from '@headstartwp/next';\nimport Link from 'next/link';\nimport Router from 'next/router';\n\nimport '../styles.css';\n\nconst MyApp = ({ Component, pageProps }) => {\n    // only HeadlessApp needs fallback and themeJson, so we remove them from the props we pass down to the pages\n\n    // eslint-disable-next-line react/prop-types, no-unused-vars\n    const { fallback = {}, themeJson = {}, ...props } = pageProps;\n\n    return (\n        <HeadlessApp\n            pageProps={pageProps}\n            settings={{\n                // instruct the framework to use Next.js link component or your own version\n                linkComponent: Link,\n            }}\n        >\n            <Component {...props} />\n        </HeadlessApp>\n    );\n};\n\nexport default MyApp;\n")),(0,r.kt)("h3",{id:"setting-up-the-preview-endpoint"},"Setting up the preview endpoint"),(0,r.kt)("p",null,"The WordPress plugin expects the preview endpoint to be located at ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/preview"),"."),(0,r.kt)("p",null,"To enable support for previews, create a ",(0,r.kt)("inlineCode",{parentName:"p"},"src/pages/api/preview.js")," with the following contents:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=src/pages/api/preview.js",title:"src/pages/api/preview.js"},"import { previewHandler } from '@headstartwp/next';\n\n/**\n * The Preview endpoint just needs to proxy the default preview handler\n *\n * @param {*} req Next.js request object\n * @param {*} res  Next.js response object\n *\n * @returns\n */\nexport default async function handler(req, res) {\n    return previewHandler(req, res);\n}\n")),(0,r.kt)("h3",{id:"setting-up-the-revalidate-endpoint"},"Setting up the revalidate endpoint"),(0,r.kt)("p",null,"The framework supports ISR revalidation triggered by WordPress. To enable ISR revalidate, make sure you have the WordPress plugin enabled and activate the option in WordPress settings."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"ISR Option",src:n(2652).Z,width:"1830",height:"342"})),(0,r.kt)("p",null,"Then add the ",(0,r.kt)("inlineCode",{parentName:"p"},"revalidateHandler")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"src/pages/api/revalidate.js")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=src/pages/api/revalidate.js",title:"src/pages/api/revalidate.js"},"import { revalidateHandler } from '@headstartwp/next';\n\n/**\n * The revalidate endpoint just needs to proxy the default revalidate handler\n *\n * @param {*} req Next.js request object\n * @param {*} res  Next.js response object\n *\n * @returns\n */\nexport default async function handler(req, res) {\n    return revalidateHandler(req, res);\n}\n")),(0,r.kt)("h3",{id:"creating-your-first-route"},"Creating your first route"),(0,r.kt)("p",null,"To make sure everything is working as expected create a catch-all route called ",(0,r.kt)("inlineCode",{parentName:"p"},"pages/[...path].js"),". This route will be responsible for rendering single post and pages."),(0,r.kt)("p",null,"By creating a ",(0,r.kt)("inlineCode",{parentName:"p"},"[...path].js")," route, the framework will automatically detect and extract URL parameters from the ",(0,r.kt)("inlineCode",{parentName:"p"},"path")," argument."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=src/pages/[...path].js",title:"src/pages/[...path].js"},"import {\n    usePost,\n    fetchHookData,\n    addHookData,\n    handleError,\n    usePosts\n} from '@headstartwp/next';\nimport { BlocksRenderer } from '@headstartwp/core/react';\n\nconst params = { postType: ['post', 'page' ] };\n\nconst SinglePostsPage = () => {\n    const { loading, error, data } = usePost(params);\n\n    if (loading) {\n        return 'Loading...';\n    }\n\n    if (error) {\n        return 'error...';\n    }\n\n    return (\n        <div>\n            <h1>{data.post.title.rendered}</h1>\n            <BlocksRenderer html={data.post.content.rendered} />\n        </div>\n    );\n};\n\nexport default SinglePostsPage;\n")),(0,r.kt)("p",null,"Then, visit any single post or page, e.g: ",(0,r.kt)("inlineCode",{parentName:"p"},"http://localhost:3000/hello-world")," and you should see both the title and the content of that post/page."),(0,r.kt)("p",null,"Date URLs will also work: e.g: ",(0,r.kt)("inlineCode",{parentName:"p"},"http://localhost:3000/2022/10/2/hello-world")),(0,r.kt)("h3",{id:"add-ssrssg"},"Add SSR/SSG"),(0,r.kt)("p",null,"With the example above, you might have noticed that the data is only being fetched on the client. You must use one of the Next.js data fetching methods to enable SSR/SSG."),(0,r.kt)("p",null,"Add this to the ",(0,r.kt)("inlineCode",{parentName:"p"},"pages/[...path].js")," file"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="src/pages/[...path].js"',title:'"src/pages/[...path].js"'},"// or export async function getServerSideProps(context)\nexport async function getStaticProps(context) {\n    try {\n        // make sure to pass the same params to fetchHookData and usePost\n        const usePostData = await fetchHookData(usePost.fetcher(), context, { params });\n\n        return addHookData([usePostData], {});\n    } catch (e) {\n        return handleError(e, context);\n    }\n}\n")),(0,r.kt)("p",null,"Then refresh the page and voil\xe1! Data is now being fetched on the server."))}c.isMDXComponent=!0},2652:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/revalidate-option-2ea5f7ed5040a6a9df3edd4ef64315e2.png"}}]);