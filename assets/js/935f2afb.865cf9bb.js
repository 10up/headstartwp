"use strict";(self.webpackChunkheadless_doc=self.webpackChunkheadless_doc||[]).push([[53],{1109:e=>{e.exports=JSON.parse('{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"link","label":"Introduction","href":"/docs/learn/","docId":"index"},{"type":"category","label":"Getting Started","collapsible":true,"collapsed":false,"items":[{"type":"link","label":"Quick Setup","href":"/docs/learn/getting-started/quick-setup","docId":"Getting Started/quick-setup"},{"type":"link","label":"Setting up the framework from scratch","href":"/docs/learn/getting-started/setting-up-manually","docId":"Getting Started/setting-up-manually"},{"type":"link","label":"Configuring the Framework","href":"/docs/learn/getting-started/headless-config","docId":"Getting Started/headless-config"},{"type":"link","label":"Installing WordPress Plugin","href":"/docs/learn/getting-started/installing-wordpress-plugin","docId":"Getting Started/wordpress-plugin"},{"type":"link","label":"Quick Introduction to the Framework","href":"/docs/learn/getting-started/quick-tutorial","docId":"Getting Started/quick-tutorial"}]},{"type":"category","label":"Data Fetching","collapsible":true,"collapsed":false,"items":[{"type":"link","label":"Introduction","href":"/docs/learn/data-fetching","docId":"Data Fetching/introduction"},{"type":"link","label":"The usePost hook","href":"/docs/learn/data-fetching/usepost","docId":"Data Fetching/usePost"},{"type":"link","label":"The usePosts hook","href":"/docs/learn/data-fetching/useposts","docId":"Data Fetching/usePosts"},{"type":"link","label":"The useAuthorArchive Hook","href":"/docs/learn/data-fetching/useauthorarchive","docId":"Data Fetching/useAuthorArchive"},{"type":"link","label":"The usePostOrPosts hook","href":"/docs/learn/data-fetching/use-post-or-posts","docId":"Data Fetching/usePostOrPosts"},{"type":"link","label":"The useTerms hook","href":"/docs/learn/data-fetching/useterms","docId":"Data Fetching/useTerms"},{"type":"link","label":"The useSearch hook","href":"/docs/learn/data-fetching/usesearch","docId":"Data Fetching/useSearch"},{"type":"link","label":"The useSearchNative hook","href":"/docs/learn/data-fetching/usesearch-native","docId":"Data Fetching/useSearchNative"},{"type":"link","label":"The useSeo hook","href":"/docs/learn/data-fetching/useSeo","docId":"Data Fetching/useSeo"},{"type":"link","label":"Mutating Data","href":"/docs/learn/data-fetching/mutating","docId":"Data Fetching/mutating"},{"type":"link","label":"Caching","href":"/docs/learn/data-fetching/caching","docId":"Data Fetching/caching"},{"type":"link","label":"Creating your own custom hooks","href":"/docs/learn/data-fetching/creating-your-own-custom-hooks","docId":"Data Fetching/custom-hooks"},{"type":"link","label":"Prefetching data on the server","href":"/docs/learn/data-fetching/prefetching","docId":"Data Fetching/prefetching-data-server"}]},{"type":"category","label":"Utilities","collapsible":true,"collapsed":false,"items":[{"type":"link","label":"Escaping & Sanitization","href":"/docs/learn/utilities/sanitization","docId":"Utilities/sanitization"}]},{"type":"category","label":"Gutenberg","collapsible":true,"collapsed":false,"items":[{"type":"link","label":"Rendering Blocks","href":"/docs/learn/gutenberg/rendering-blocks","docId":"Gutenberg/rendering-blocks"},{"type":"link","label":"Rendering Custom Blocks","href":"/docs/learn/gutenberg/rendering-custom-blocks","docId":"Gutenberg/rendering-custom-blocks"},{"type":"link","label":"Rendering Blocks in React Native","href":"/docs/learn/gutenberg/rendering-blocks-in-react-native","docId":"Gutenberg/rendering-blocks-in-react-native"}]},{"type":"category","label":"WordPress Integration","collapsible":true,"collapsed":false,"items":[{"type":"link","label":"Previews","href":"/docs/learn/wordpress-integration/previews","docId":"WordPress Integration/previews"},{"type":"link","label":"Multisite","href":"/docs/learn/wordpress-integration/multisite","docId":"WordPress Integration/multisite"},{"type":"link","label":"On-demand ISR revalidation","href":"/docs/learn/wordpress-integration/revalidate","docId":"WordPress Integration/revalidate"},{"type":"link","label":"Basic Auth","href":"/docs/learn/wordpress-integration/basic-auth","docId":"WordPress Integration/basic-auth"},{"type":"link","label":"Feeds","href":"/docs/learn/wordpress-integration/feeds","docId":"WordPress Integration/feeds"},{"type":"link","label":"Gutenberg","href":"/docs/learn/wordpress-integration/gutenberg","docId":"WordPress Integration/gutenberg"},{"type":"link","label":"Polylang Integration","href":"/docs/learn/wordpress-integration/polylang","docId":"WordPress Integration/polylang"}]},{"type":"category","label":"Guides","collapsible":true,"collapsed":false,"items":[{"type":"link","label":"A/B Test SPA vs MPA navigation","href":"/docs/learn/Guides/ab-test-link","docId":"Guides/ab-test-link"},{"type":"link","label":"Linaria (CSS-in-JS)","href":"/docs/learn/Guides/linaria","docId":"Guides/linaria"},{"type":"link","label":"TypeScript","href":"/docs/learn/Guides/typescript","docId":"Guides/typescript"},{"type":"link","label":"Implementing a Youtube Facade","href":"/docs/learn/Guides/youtube-facade","docId":"Guides/youtube-facade"}]}]},"docs":{"Data Fetching/caching":{"id":"Data Fetching/caching","title":"Caching","description":"HeadstartWP offers a way to cache the results of any fetch strategy. This can be useful when you\'re not rendering static pages and therefore unable to leverage ISR. However, for most cases, we encourage leveraging Next.js built-in ISR mechanism. So before considering adopting fetch strategy caching, we recommend reviewing the on-demand revalidation docs.","sidebar":"tutorialSidebar"},"Data Fetching/custom-hooks":{"id":"Data Fetching/custom-hooks","title":"Custom hooks","description":"Sometimes it might be useful to wrap the framework data-fetching hooks into your own hooks.","sidebar":"tutorialSidebar"},"Data Fetching/introduction":{"id":"Data Fetching/introduction","title":"Introduction","description":"HeadstartWP exposes several customs react hooks that provide a seamless data-fetching experience with WordPress. Those hooks are built to be \\"isomorphic\\" i.e can be executed either on the browser or on the server (e.g: Node.js).","sidebar":"tutorialSidebar"},"Data Fetching/mutating":{"id":"Data Fetching/mutating","title":"Mutating Data","description":"It is possible to use the useSwr mutate function to mutate data on the client. The data-fetching hooks expose the \\"bound mutate\\" function from swr. Below is an example of optimistically updating the UI to like a post.","sidebar":"tutorialSidebar"},"Data Fetching/prefetching-data-server":{"id":"Data Fetching/prefetching-data-server","title":"Prefetching data on the server","description":"To enable prefetching data on the server use the fetchHookData function alongside addHookData.","sidebar":"tutorialSidebar"},"Data Fetching/useAuthorArchive":{"id":"Data Fetching/useAuthorArchive","title":"The useAuthorArchive Hook","description":"The useAuthorArchive hook is the Next.js binding for the useFetchAuthorArchive.","sidebar":"tutorialSidebar"},"Data Fetching/usePost":{"id":"Data Fetching/usePost","title":"The usePost hook","description":"The usePost hook is the Next.js binding for the useFetchPost.","sidebar":"tutorialSidebar"},"Data Fetching/usePostOrPosts":{"id":"Data Fetching/usePostOrPosts","title":"The usePostOrPosts hook","description":"This hook was introduced in @headstartwp/core@1.1.0 and @headstartwp/next@1.1.0","sidebar":"tutorialSidebar"},"Data Fetching/usePosts":{"id":"Data Fetching/usePosts","title":"The usePosts hook","description":"The usePosts hook is the Next.js binding for the useFetchPosts.","sidebar":"tutorialSidebar"},"Data Fetching/useSearch":{"id":"Data Fetching/useSearch","title":"The useSearch hook","description":"The useSearch hook is the Next.js binding for the useFetchSearch.","sidebar":"tutorialSidebar"},"Data Fetching/useSearchNative":{"id":"Data Fetching/useSearchNative","title":"The useSearchNative hook","description":"The useSearchNative hook is the Next.js binding for the useFetchSearchNative.","sidebar":"tutorialSidebar"},"Data Fetching/useSeo":{"id":"Data Fetching/useSeo","title":"The useSeo hook","description":"This hook was introduced in @headstartwp/next@1.1.0","sidebar":"tutorialSidebar"},"Data Fetching/useTerms":{"id":"Data Fetching/useTerms","title":"The useTerms hook","description":"The useTerms hook is the Next.js binding for the useFetchTerms.","sidebar":"tutorialSidebar"},"Getting Started/headless-config":{"id":"Getting Started/headless-config","title":"Configuring the Framework","description":"The headstartwp.config.js (previously, headless.config.js) file contains several config options for HeadstartWP. This file should export an object of type HeadlessConfig.","sidebar":"tutorialSidebar"},"Getting Started/quick-setup":{"id":"Getting Started/quick-setup","title":"Quick Setup","description":"If you\'re new to Next.js, we recommend reviewing Next.js docs.","sidebar":"tutorialSidebar"},"Getting Started/quick-tutorial":{"id":"Getting Started/quick-tutorial","title":"Quick Introduction to the Framework","description":"Introduction","sidebar":"tutorialSidebar"},"Getting Started/setting-up-manually":{"id":"Getting Started/setting-up-manually","title":"Setting up the framework from scratch","description":"The recommended way to get started with the framework is by installing the official starter project. See Quick Setup for more information.","sidebar":"tutorialSidebar"},"Getting Started/wordpress-plugin":{"id":"Getting Started/wordpress-plugin","title":"Installing WordPress Plugin","description":"Composer Installation (Recommended)","sidebar":"tutorialSidebar"},"Guides/ab-test-link":{"id":"Guides/ab-test-link","title":"A/B Testing SPA vs MPA navigation","description":"In this guide, we\u2019ll implement a custom Link component that will replace every Link in the post content with a custom React component that will implement SPA or MPA navigation based on an A/B test. By \u201cSPA navigation\u201d I mean navigating to other pages via client-side rendering instead of a full-page reload. MPA navigation is the opposite and traditional way of navigation.","sidebar":"tutorialSidebar"},"Guides/linaria":{"id":"Guides/linaria","title":"Linaria (CSS-in-JS)","description":"HeadstartWP offers a straightforward integration with Linaria, a zero-runtime CSS-in-JS solution. To use it, simply install the following linaria packages.","sidebar":"tutorialSidebar"},"Guides/typescript":{"id":"Guides/typescript","title":"TypeScript","description":"","sidebar":"tutorialSidebar"},"Guides/youtube-facade":{"id":"Guides/youtube-facade","title":"Implementing a Youtube Facade","description":"HeadstartWP provides an easy way to implement Youtube Facade, in fact, we can do so with one line of code. All that\u2019s needed is to add the YoutubeLiteBlock component","sidebar":"tutorialSidebar"},"Gutenberg/rendering-blocks":{"id":"Gutenberg/rendering-blocks","title":"Rendering Blocks","description":"Introduction","sidebar":"tutorialSidebar"},"Gutenberg/rendering-blocks-in-react-native":{"id":"Gutenberg/rendering-blocks-in-react-native","title":"Rendering Blocks in React Native","description":"Introduction","sidebar":"tutorialSidebar"},"Gutenberg/rendering-custom-blocks":{"id":"Gutenberg/rendering-custom-blocks","title":"Rendering Custom Blocks","description":"Custom Blocks can be handled in a very similar way. If you need to render your custom block as a react component you should make sure that the block exposes its data via the markup. You can do so by appending additional data to the data-wp-block-attrs attribute or serializing the data needed inside the block.","sidebar":"tutorialSidebar"},"index":{"id":"index","title":"Introduction","description":"Welcome to HeadstartWP documentation site! If you are new, we highly recommend reading all the way through Getting Started first.","sidebar":"tutorialSidebar"},"Utilities/sanitization":{"id":"Utilities/sanitization","title":"Escaping & Sanitization","description":"As you\'re probably aware, React won\'t render raw HTML by default. If you want to do so you must use dangerouslySetInnerHTML.","sidebar":"tutorialSidebar"},"WordPress Integration/basic-auth":{"id":"WordPress Integration/basic-auth","title":"Basic Auth","description":"If WordPress is protected by Basic Auth (which is common during development) you can tell HeadstartWP the basic auth creds so that all","sidebar":"tutorialSidebar"},"WordPress Integration/feeds":{"id":"WordPress Integration/feeds","title":"Feeds","description":"Feeds are proxied via Next.js rewrites by default. meaning that you can directly access the feed via your front-end/Next.js URL.","sidebar":"tutorialSidebar"},"WordPress Integration/gutenberg":{"id":"WordPress Integration/gutenberg","title":"Gutenberg","description":"The HeadstartWP Plugin enhances every block with two special attributes directly in the markup: data-wp-block-name and data-wp-block. The first holds the name of the block and the second holds all of the block attributes.","sidebar":"tutorialSidebar"},"WordPress Integration/multisite":{"id":"WordPress Integration/multisite","title":"Multisite","description":"HeadstartWP has built-in support for WordPress multisite via the sites property in the headstartwp.config.js file. This transforms the Next.js app into a multi-tenant app.","sidebar":"tutorialSidebar"},"WordPress Integration/polylang":{"id":"WordPress Integration/polylang","title":"Polylang Integration","description":"Polylang Pro is required since only Polylang Pro offers the REST API integration.","sidebar":"tutorialSidebar"},"WordPress Integration/previews":{"id":"WordPress Integration/previews","title":"Previews","description":"The preview feature requires the HeadstartWP plugin installed. The preview functionality is built on top of Next.js preview API. It uses a short-lived JWT token generated on the WordPress side that can only be used for previewing, this means it is not necessary to set up a hardcoded secret between WP and Next.js.","sidebar":"tutorialSidebar"},"WordPress Integration/revalidate":{"id":"WordPress Integration/revalidate","title":"On-demand ISR revalidation","description":"On-demand Revalidation is the ability to revalidate static pages programmatically from the CMS.","sidebar":"tutorialSidebar"}}}')}}]);