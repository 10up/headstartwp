"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[825],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>g});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=d(n),h=i,g=u["".concat(l,".").concat(h)]||u[h]||c[h]||r;return n?a.createElement(g,o(o({ref:t},p),{},{components:n})):a.createElement(g,o({ref:t},p))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:i,o[1]=s;for(var d=2;d<r;d++)o[d]=n[d];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},147:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>d});var a=n(7462),i=(n(7294),n(3905));const r={sidebar_position:2,slug:"/wordpress-integration/revalidate"},o="On-demand ISR revalidation",s={unversionedId:"WordPress Integration/revalidate",id:"WordPress Integration/revalidate",title:"On-demand ISR revalidation",description:"On-demand Revalidation is the ability to revalidate static pages programmatically from the CMS.",source:"@site/documentation/06-WordPress Integration/revalidate.md",sourceDirName:"06-WordPress Integration",slug:"/wordpress-integration/revalidate",permalink:"/docs/learn/wordpress-integration/revalidate",draft:!1,editUrl:"https://github.com/10up/headstartwp/tree/trunk/docs/documentation/06-WordPress Integration/revalidate.md",tags:[],version:"current",lastUpdatedBy:"N\xedcholas Andr\xe9",lastUpdatedAt:1701451989,formattedLastUpdatedAt:"Dec 1, 2023",sidebarPosition:2,frontMatter:{sidebar_position:2,slug:"/wordpress-integration/revalidate"},sidebar:"tutorialSidebar",previous:{title:"Multisite",permalink:"/docs/learn/wordpress-integration/multisite"},next:{title:"Basic Auth",permalink:"/docs/learn/wordpress-integration/basic-auth"}},l={},d=[{value:"Usage",id:"usage",level:2},{value:"Plugin setup",id:"plugin-setup",level:3},{value:"Revalidate Endpoint",id:"revalidate-endpoint",level:3},{value:"How does it work?",id:"how-does-it-work",level:2},{value:"Supporting Next.js ISR outside of Vercel",id:"supporting-nextjs-isr-outside-of-vercel",level:2},{value:"@10up/next-redis-cache-provider",id:"10upnext-redis-cache-provider",level:3},{value:"Purging the CDN Cache",id:"purging-the-cdn-cache",level:3},{value:"A note about WordPress VIP",id:"a-note-about-wordpress-vip",level:4},{value:"Revalidating in a Cron Job",id:"revalidating-in-a-cron-job",level:3}],p={toc:d};function u(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"on-demand-isr-revalidation"},"On-demand ISR revalidation"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation"},"On-demand Revalidation")," is the ability to revalidate static pages programmatically from the CMS."),(0,i.kt)("p",null,"Without On-demand ISR revalidation users will need to wait until the time set in the ",(0,i.kt)("inlineCode",{parentName:"p"},"revalidate")," prop has passed before they can see an updated version of that page. This means that if a ",(0,i.kt)("inlineCode",{parentName:"p"},"revalidate")," is set to 5min, users would potentially have to wait up to 5min before they can see new content."),(0,i.kt)("p",null,'It is preferred to have the CMS ask the Next.js app to revalidate those pages when possible. This can be done via "On-Demand Revalidation".'),(0,i.kt)("p",null,"HeadstartWP supports Next.js ISR via the WordPress plugin and via ",(0,i.kt)("inlineCode",{parentName:"p"},"@10up/next-redis-cache-provider")," for hosts that do not natively support Next.js ISR (e.g. VIP, WPEngine etc)."),(0,i.kt)("h2",{id:"usage"},"Usage"),(0,i.kt)("h3",{id:"plugin-setup"},"Plugin setup"),(0,i.kt)("p",null,"HeadstartWP supports On-Demand Revalidation and it requires installing the WordPress Plugin. On-Demand Revalidation is opt-in and must be manually enabled in the plugin's settings (Settings -> General).\n",(0,i.kt)("img",{alt:"Plugin settings",src:n(7607).Z,width:"835",height:"270"})),(0,i.kt)("p",null,"The plugin expects the revalidate endpoint to live at  ",(0,i.kt)("inlineCode",{parentName:"p"},"/api/revalidate"),". It is possible to customize this endpoint via the ",(0,i.kt)("inlineCode",{parentName:"p"},"tenup_headless_isr_revalidate_endpoint"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * Filters the revalidate endpoint.\n *\n * @param string $revalidate_endpoint The revalidate endpoint\n */\n$revalidate_endpoint = apply_filters( \n    'tenup_headless_isr_revalidate_endpoint', \n    trailingslashit( Plugin::get_react_url() ) . 'api/revalidate' \n);\n")),(0,i.kt)("h3",{id:"revalidate-endpoint"},"Revalidate Endpoint"),(0,i.kt)("p",null,"Simply create a Next.js API endpoint that uses the ",(0,i.kt)("inlineCode",{parentName:"p"},"revalidateHandler")," provided by the framework. "),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"If you changed the default value of the endpoint path via the ",(0,i.kt)("inlineCode",{parentName:"p"},"tenup_headless_isr_revalidate_endpoint")," filter, make sure you change it in the Next.js app as well. ")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript",metastring:'title="src/pages/api/revalidate"',title:'"src/pages/api/revalidate"'},"import { revalidateHandler } from '@headstartwp/next';\n\n/**\n * The revalidate endpoint just needs to proxy the default revalidate handler\n *\n * @param {*} req Next.js request object\n * @param {*} res  Next.js response object\n *\n * @returns\n */\nexport default async function handler(req, res) {\n    return revalidateHandler(req, res);\n}\n")),(0,i.kt)("h2",{id:"how-does-it-work"},"How does it work?"),(0,i.kt)("p",null,"The default implementation will revalidate any post or page upon saving in WordPress. You can see the logic ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/10up/headstartwp/blob/develop/wp/headless-wp/includes/classes/CacheFlush/CacheFlush.php#L40"},"here"),"."),(0,i.kt)("h2",{id:"supporting-nextjs-isr-outside-of-vercel"},"Supporting Next.js ISR outside of Vercel"),(0,i.kt)("p",null,"If your host does not support Next.js ISR natively (e.g. WordPress VIP, WPEngine etc), ISR won't work well. If your hosting is serving your app via a traditional non-serverless setup using docker/kubernetes you most likely will run into issues trying to leverage Next.js ISR."),(0,i.kt)("p",null,"First off, if multiple containers are running to serve the requests to your website, a call to revalidate a particular page will only ever hit one of the containers that are running. This will lead to users being served by the containers that weren't hit by the WP call to still serve the old page. Even worse, the same user might be served by different containers and get both old and new responses for a page (e.g. the initial HTML is updated but the JSON associated with the page isn't)."),(0,i.kt)("p",null,"Officially, Next.js ",(0,i.kt)("a",{parentName:"p",href:"https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#self-hosting-isr"},"recommends")," sharing a writable volume across all the containers but that has some performance implications and some hosts simply don't support this setup."),(0,i.kt)("h3",{id:"10upnext-redis-cache-provider"},"@10up/next-redis-cache-provider"),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"If you are hosting on Vercel you do not need this package.")),(0,i.kt)("p",null,"Our solution to this problem has been to replace the filesystem cache with a redis cache provider. So whenever Next.js revalidates a page instead of storing the static page in disk, it will write to a shared redis instance that all of the containers would be talking to. The diagram below exemplifies how it works."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Plugin settings",src:n(5218).Z,width:"2318",height:"819"})),(0,i.kt)("p",null,"To set up ",(0,i.kt)("inlineCode",{parentName:"p"},"@10up/next-redis-cache-provider")," first install it via npm:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm install --save @10up/next-redis-cache-provider\n")),(0,i.kt)("p",null,"Then add it in ",(0,i.kt)("inlineCode",{parentName:"p"},"next.config.js"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="next.config.js"',title:'"next.config.js"'},"const { withHeadstartWPConfig } = require('@headstartwp/next/config');\n\n/**\n * Update whatever you need within the nextConfig object.\n *\n * @type {import('next').NextConfig}\n */\nconst nextConfig = {\n    eslint: {\n        ignoreDuringBuilds: true,\n    },\n};\n\n\nif (process.env.NEXT_REDIS_URL || process.env.VIP_REDIS_PRIMARY) {\n    // eslint-disable-next-line global-require\n    const { initRedisClient } = require('@10up/next-redis-cache-provider');\n    initRedisClient();\n    nextConfig.experimental = {\n        incrementalCacheHandlerPath: require.resolve('@10up/next-redis-cache-provider'),\n    };\n}\n\nmodule.exports = withHeadstartWPConfig(nextConfig);\n")),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"The HeadstartWP ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/10up/headstartwp/tree/develop/projects/wp-nextjs"},"scaffold")," already includes the code above")),(0,i.kt)("p",null,"The code above checks for ",(0,i.kt)("inlineCode",{parentName:"p"},"NEXT_REDIS_URL")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"VIP_REDIS_PRIMARY")," (which is specific for WordPress VIP hosting), however there are several other env variables you can use to configure your redis connection."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"NEXT_REDIS_URL"),": It's the simplest way to set up your redis connection, simply pass the full redis connection string."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"VIP_REDIS_PRIMARY")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"VIP_REDIS_PASSWORD"),": this is specific to WordPress VIP hosting, if Redis is enabled on VIP hosting these env variables will be automatically set for you so you do not need to add them yourself."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"NEXT_REDIS_HOST"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"NEXT_REDIS_PORT")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"NEXT_REDIS_PASS"),": Instead of a full redis connection string you can specify the host, port and password separately."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"NEXT_REDIS_SENTINEL_NAME"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"NEXT_REDIS_SENTINEL_PASSWORD"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"NEXT_REDIS_PASS"),": This is only needed if you want to connect to a redis sentinel cluster. If you do so, you also need to set the ",(0,i.kt)("inlineCode",{parentName:"li"},"NEXT_REDIS_HOST"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"NEXT_REDIS_PORT")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"NEXT_REDIS_PASS")," variables.")),(0,i.kt)("h3",{id:"purging-the-cdn-cache"},"Purging the CDN Cache"),(0,i.kt)("p",null,"Another thing you want to consider is flushing the CDN cache ",(0,i.kt)("strong",{parentName:"p"},"after")," you revalidate the page in Next.js. This can be done on the WordPress side by hooking up to the ",(0,i.kt)("inlineCode",{parentName:"p"},"tenup_headless_wp_revalidate")," action. This action is fired off after Next.js has finished revalidating the page."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"add_filter( 'tenup_headless_wp_revalidate', function( $post, $front_end_post_url ) {\n    // $front_end_psot_url is the URL for the post with the front-end/headless url.\n    function_to_clear_my_favorite_cdn_cache( $front_end_post_url );\n}, 10, 2 );\n")),(0,i.kt)("h4",{id:"a-note-about-wordpress-vip"},"A note about WordPress VIP"),(0,i.kt)("p",null,"If you are hosting on WordPress VIP the plugin already clears the VIP CDN cache, so you don't need to handle this yourself. The ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/10up/headstartwp/blob/develop/wp/headless-wp/includes/classes/CacheFlush/CacheFlush.php#L122C6-L122C6"},"following code")," is included in the plugin:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"if ( 200 === (int) $status_code && function_exists( 'wpcom_vip_purge_edge_cache_for_url' ) ) {\n    wpcom_vip_purge_edge_cache_for_url( $headless_post_url );\n}\n")),(0,i.kt)("h3",{id:"revalidating-in-a-cron-job"},"Revalidating in a Cron Job"),(0,i.kt)("p",null,"If you prefer to run the revalidation logic in the background, you can tell the plugin to schedule a one-off cron job for immediate execution every time a post is saved. This can be enabled with the ",(0,i.kt)("inlineCode",{parentName:"p"},"tenup_headless_wp_revalidate_on_cron")," filter (it defaults to false)."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"add_filter( 'tenup_headless_wp_revalidate_on_cron', '___return_true' );\n")),(0,i.kt)("p",null,"This can be useful when the revalidation or the CDN cache purge is slow sp this can be used to speed up the post saving process."))}u.isMDXComponent=!0},7607:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/plugin-settings-cd21201c2690c652abab12a4be1b0e31.png"},5218:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/next-redis-cache-provider-fd13dd0eb17e43a3cd567dac08b80cd9.png"}}]);