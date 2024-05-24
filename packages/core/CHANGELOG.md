# @headstartwp/core

## 1.4.4-next.0

### Patch Changes

- f6e005c: Fix: Improve types for better page props type inference.

  It also updates types for data fetching hooks to better reflect the fact that `data` is treated as though it is always there and if users do not check for `loading` or `error` by themselves and there's no preloaded data, a runtime fatal error will be issued instead.

## 1.4.3

### Patch Changes

- b3cd5fe1: Fix: more fixes for esm builds
- e7c84d58: Fix builds with vite
- 399af783: Make ESM builds ESM compatible

## 1.4.3-next.2

### Patch Changes

- b3cd5fe1: Fix: more fixes for esm builds

## 1.4.3-next.1

### Patch Changes

- 399af783: Make ESM builds ESM compatible

## 1.4.3-next.0

### Patch Changes

- e7c84d58: Fix builds with vite

## 1.4.2

### Patch Changes

- 66031ec6: Pass params attr to YoutubeLiteBlock

## 1.4.1

### Patch Changes

- 38563cfd: Fix cache.beforeSet

## 1.4.0

### Minor Changes

- cce64d2e: Introducing fetch strategy caching.

### Patch Changes

- 8d3a0f83: Normalize TTL to secs
- 669441f3: Fix: cache handler types, add isCached property
- 498fb394: caching: pass `fetchStrategyOptions` and `path` to cache functions.
- bdcc37f0: Make cache.enabled optional

## 1.4.0-next.4

### Patch Changes

- 8d3a0f83: Normalize TTL to secs

## 1.4.0-next.3

### Patch Changes

- bdcc37f0: Make cache.enabled optional

## 1.4.0-next.2

### Patch Changes

- 669441f3: Fix: cache handler types, add isCached property

## 1.4.0-next.1

### Patch Changes

- 498fb394: caching: pass `fetchStrategyOptions` and `path` to cache functions.

## 1.4.0-next.0

### Minor Changes

- cce64d2e: Introducing fetch strategy caching.

## 1.3.4

### Patch Changes

- 5d5a856a: Expose swr "bound mutate" function

## 1.3.3

### Patch Changes

- 654681df: Fix: replace camelcase underlying implementation as the previous one only worked in node

## 1.3.2

### Patch Changes

- 95d6eb96: fix: make convertUrl and removeSourceUrl respect the original link's trailingslash
- 26246a01: Add the ability to leverage `post.link` for redirecting the previewed post to the appropriate route via the `preview.usePostLinkForRedirect` setting.

## 1.3.1

### Patch Changes

- 0bd8e415: Add ability to preview using an alternative authorization header

## 1.3.0

### Minor Changes

- 8452279a: Implement WordPress native search endpoint

## 1.2.0

### Minor Changes

- 6dc435f7: Add support for archive path matching `matchArchivePath`.
  Add support for passing a function to `customPostTypes` and `customTaxonomies` option in `headstartwp.config.js`.
  Rename `headless.config.js` to `headstartwp.config.js` but keep backward compatibility.
  Automatically load `headstartwp.config.js` or `headless.config.js` in `next.config.js`.

## 1.2.0-next.0

### Minor Changes

- 6dc435f7: Add support for archive path matching `matchArchivePath`.
  Add support for passing a function to `customPostTypes` and `customTaxonomies` option in `headstartwp.config.js`.
  Rename `headless.config.js` to `headstartwp.config.js` but keep backward compatibility.
  Automatically load `headstartwp.config.js` or `headless.config.js` in `next.config.js`.

## 1.1.2

### Patch Changes

- 15189a03: Adding support for basic auth
- 772c5f1c: Fix: fetchHookData with usePosts and throwIfNotFound set to false will crash the application if no results are found

## 1.1.2-next.1

### Patch Changes

- 772c5f1c: Fix: fetchHookData with usePosts and throwIfNotFound set to false will crash the application if no results are found

## 1.1.2-next.0

### Patch Changes

- 15189a03: Adding support for basic auth

## 1.1.1

### Patch Changes

- de501ff7: Fix an issue for images without width or height

## 1.1.0

### Minor Changes

- 4275962b: Introducing `usePostOrPosts`.
- df3e65ce: Introduces `SafeHtml` and `HtmlDecoder` components.
- e9064d69: Introducing the `useSeo` hook.
- d3ec9d83: Introduces the `decodeHtmlSpecialChars` function.

### Patch Changes

- e6a0c231: Lower compilation target
- 24f8a99f: Fix theme.json handling in `useBlockColors` and `useBlockTypography`.

  Thanks @riccardodicurti @dhamibirendra for [the bug report](https://github.com/10up/headstartwp/issues/541).

- bb39a603: Fixes useSearch error when Yoast SEO plugin is deactivated.
- 569662b6: Improves the Next.js preview cookie handling and fixes a bug where the locale was not properly being passed from WP when previewing.

  First of all, it sets the preview cookie to expire within 5 minutes which aligns with the JWT token expiration.

  Secondly, it will narrow the cookie to the post path being previewed so that `context.preview` is not true for other paths and thus avoiding bypassing getStaticProps until the cookies are cleared (either expires or the browser closes).

- 56ddf9be: Fix theme.json handling for block settings
- 1494a332: Further Optimize next.js props by removing yoast seo bloat.

## 1.1.0-next.5

### Minor Changes

- e9064d69: Introducing the `useSeo` hook.

## 1.1.0-next.4

### Minor Changes

- 4275962b: Introducing `usePostOrPosts`.

## 1.1.0-next.3

### Patch Changes

- 56ddf9be: Fix theme.json handling for block settings

## 1.1.0-next.2

### Patch Changes

- e6a0c231: Lower compilation target
- bb39a603: Fixes useSearch error when Yoast SEO plugin is deactivated.

## 1.1.0-next.1

### Patch Changes

- 1494a332: Further Optimize next.js props by removing yoast seo bloat.

## 1.1.0-next.0

### Minor Changes

- df3e65ce: Introduces `SafeHtml` and `HtmlDecoder` components.
- d3ec9d83: Introduces the `decodeHtmlSpecialChars` function.

### Patch Changes

- 24f8a99f: Fix theme.json handling in `useBlockColors` and `useBlockTypography`.

  Thanks @riccardodicurti @dhamibirendra for [the bug report](https://github.com/10up/headstartwp/issues/541).

- 569662b6: Improves the Next.js preview cookie handling and fixes a bug where the locale was not properly being passed from WP when previewing.

  First of all, it sets the preview cookie to expire within 5 minutes which aligns with the JWT token expiration.

  Secondly, it will narrow the cookie to the post path being previewed so that `context.preview` is not true for other paths and thus avoiding bypassing getStaticProps until the cookies are cleared (either expires or the browser closes).

## 1.0.6

### Patch Changes

- 225724d8: Fix an issue where an empty result would still yield a "matching slug error" when thrownIfNotFound was set to false

## 1.0.5

### Patch Changes

- 62ac6b36: Fixing typos.

## 1.0.4

### Patch Changes

- c3de4f3d: Fix: avoid instanceof to prevent weird bugs
- 2cbaec01: Fix: add attributes that should not be stripped by wpKsesPost to the allowlist
- 1beed833: fix: youtube lite embeds

## 1.0.4-next.0

### Patch Changes

- c3de4f3d: Fix: avoid instanceof to prevent weird bugs
- 2cbaec01: Fix: add attributes that should not be stripped by wpKsesPost to the allowlist
- 1beed833: fix: youtube lite embeds

## 1.0.3

### Patch Changes

- ba952037: Fix: fetch calls made under getStaticProps now always includes a timestamp in the query to ensure it always get latest content from the api

## 1.0.2

### Patch Changes

- b26210d: Fix: anchor attributes being stripped by wpKsesPost

## 1.0.1

### Patch Changes

- f016b00: Re-exporting html-react-parser from core package

## 1.0.0

### Major Changes

- 1f4491f: Renaming to HeadstartWP

### Patch Changes

- a5c5e52: Fix middlewares do that it doesnt load the whole core library
- af507b7: Updating swr to latest version
- 97ac0b0: Add devMode for more debugging data
- 7ec30e1: Abstract SWRConfig in core package
- 6ce773e: Reverting CJS only

## 1.0.0-next.7

### Patch Changes

- a5c5e52: Fix middlewares do that it doesnt load the whole core library
- 7ec30e1: Abstract SWRConfig in core package

## 1.0.0-next.6

### Patch Changes

- f20d010: Re-add workaround

## 1.0.0-next.5

### Patch Changes

- 6ce773e: Reverting CJS only

## 1.0.0-next.4

### Patch Changes

- 5bdd604: Switching to CJS only

## 1.0.0-next.3

### Patch Changes

- 97ac0b0: Add devMode for more debugging data

## 1.0.0-next.2

### Patch Changes

- af507b7: Updating swr to latest version

## 1.0.0-next.1

### Major Changes

- 1f4491f: Renaming to HeadstartWP

## 0.8.2-next.0

### Patch Changes

- 44d5607: New strategy for loaidng config

## 0.8.1

### Patch Changes

- 3cd203c: Add support for logging/debugging.

## 0.8.0

### Minor Changes

- bd83dc9: Added SVG support, so they don't get automatically stripped by the sanitizer

### Patch Changes

- 3029765: Updated parseSeo utility function to remove async/await

## 0.7.0

### Minor Changes

- 1f7e4ff: Added parseSeo utility function
- fdde401: Introduces a new feature: The PolyLang Integration. To use simply enable the integration

  ```js title="headless.config.js"
  module.exports = {
    // other settings
    integrations: {
      yoastSEO: {
        enable: true,
      },
      polylang: {
        enable: true,
      },
    },
  };
  ```

  and add the supported locales to next.config.js.

  ```js title="next.config.js"
  module.exports = {
    i18n: {
      // These are all the locales you want to support in
      // your application
      locales: ["en", "fr", "nl"],
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: "en",
    },
  };
  ```

### Patch Changes

- 60af8c8: Improve package compatibility with system that do not support package.json exports
- a444791: Fix TS types

## 0.7.0-next.2

### Minor Changes

- 1f7e4ff: Added parseSeo utility function

### Patch Changes

- 60af8c8: Improve package compatibility with system that do not support package.json exports

## 0.7.0-next.1

### Patch Changes

- a444791: Fix TS types

## 0.7.0-next.0

### Minor Changes

- fdde401: Introduces a new feature: The PolyLang Integration. To use simply enable the integration

  ```js title="headless.config.js"
  module.exports = {
    // other settings
    integrations: {
      yoastSEO: {
        enable: true,
      },
      polylang: {
        enable: true,
      },
    },
  };
  ```

  and add the supported locales to next.config.js.

  ```js title="next.config.js"
  module.exports = {
    i18n: {
      // These are all the locales you want to support in
      // your application
      locales: ["en", "fr", "nl"],
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: "en",
    },
  };
  ```

## 0.6.4

### Patch Changes

- e827579: Instead of only checking for HEAD requests, check for a custom header for skipping redirect to the front-end url

## 0.6.4-next.0

### Patch Changes

- e827579: Instead of only checking for HEAD requests, check for a custom header for skipping redirect to the front-end url

## 0.6.3

### Patch Changes

- 664f306: Fix redirects by using resolvedUrl instead of req.url

## 0.6.3-next.0

### Patch Changes

- 664f306: Fix redirects by using resolvedUrl instead of req.url

## 0.6.2

### Patch Changes

- 9bf3642: Check for wp-admin and related paths in isInternalLink
- 9fa4319: Fix previews handling for multisite with locale
- 3671143: Fixes an issue where taxonomy archives would support non-standard WP routes (/category/author/author-name and /category/:year/:month/:day) and adds support for nested taxonomy routes (/parent-category/category).
- 61231c3: Fix: add css allowlist similar to WordPress wp_kses_post

## 0.6.1

### Patch Changes

- 6282580: Introducing `matchCurrentPath` flag and `fullPath` option to usePost hook for better control over post path mapping

## 0.6.1-next.0

### Patch Changes

- 6282580: Introducing `matchCurrentPath` flag and `fullPath` option to usePost hook for better control over post path mapping

## 0.6.0

### Minor Changes

- 0c0350a: Improve TypeScript Support

### Patch Changes

- 83f2fd6: Remove unnecessary dependency.
- 4093142: Introducing types for next.js data-fetching methods and the ability to pass default param via fetcher()
- 906f32a: Fix: defaultParams were not being taken into account
- d062e6e: Fix: addHookData ts typing
- 13a1327: Update TypeScript types for WP entities

## 0.6.0-next.5

### Patch Changes

- 83f2fd6: Remove unnecessary dependency.

## 0.6.0-next.4

### Patch Changes

- d062e6e: Fix: addHookData ts typing

## 0.6.0-next.3

### Patch Changes

- 906f32a: Fix: defaultParams were not being taken into account

## 0.6.0-next.2

### Patch Changes

- 4093142: Introducing types for next.js data-fetching methods and the ability to pass default param via fetcher()

## 0.6.0-next.1

### Minor Changes

- 0c0350a: Improve TypeScript Support

## 0.5.4-next.0

### Patch Changes

- 13a1327: Update TypeScript types for WP entities

## 0.5.3

### Patch Changes

- 2a35630: fix ts entry points in package.json

## 0.5.2

### Patch Changes

- d039566: [#318](https://github.com/10up/headstartwp/pull/318) feat: add an official yoast seo integration.

## 0.5.1

### Patch Changes

- 1bff95c: [#305](https://github.com/10up/headstartwp/issues/305)]. Fix post path mapping for custom post types.

  Since the introduction of [#286](https://github.com/10up/headstartwp/pull/286) fetching single custom post types would always yield a 404. This PR fixes the issue by properly matching the current path with the custom post permalinks.

  This requires that the `single` property is set in `headless.config.js`.

  ```js
  customPostTypes: [
          {
              slug: 'book',
              endpoint: '/wp-json/wp/v2/book',
              // these should match your file-system routing
              single: '/book',
              archive: '/books',
          },
      ],
  ```

  Without the `single` property set the headless framework can't properly match the current URL to the custom post's permalink.

  This PR builds on top of the philosophy that the WordPress permalink structure should match the front-end permalink structure, meaning that your front-end routes should match the permalink structure set in WordPress.

- 1bff95c: [#304](https://github.com/10up/headstartwp/pull/304) fix: post path mapping for ut8encoded slugs.

  Previously the code that would match the path of the current page with post's links would always fails for any URLs that contains encoded UTF-8 characters. This patch fixes the issue.

## 0.5.0

### Minor Changes

- 33592ea: Introducing Multisite support to the headless framework.
- 33592ea: Add ability to use the `yoast_head` html to populate the head tags instead of manually rendering every property of the yoast_head_json
- 33592ea: Parses the style attribute of HTML elements into an object, and passes that object down as a prop through the BlocksRenderer component.

  Also updates block components to pass style down as a prop to the provided components.

  Closes [#240](https://github.com/10up/headstartwp/issues/240)

- 33592ea: Add React 18 and Next.js 13 support.

### Patch Changes

- 33592ea: warn if `removeSourceUrl` is used without valid `link` or `backendUrl` values.
- 33592ea: fix: removeSourceUrl should not add a / to the beginning of the link if it's a hash link. [#267](https://github.com/10up/headstartwp/issues/267)
- 33592ea: Export block-related hooks
- 33592ea: Fix: check if current path matches the returned post in the SinglePostFetch strategy
- 33592ea: Improve redirect handling in `fetchRedirect`.

  It now detects redirects that might cause infinite loop and ignore redirects for `wp-login.php`, `wp-register.php` and `wp-admin`.

- 33592ea: add js-xss options param to wpKsesPost and exposing sanitizeFn function to BlocksRenderer

  ## wpKsesPost

  e.g

  ```javascript
  wpKsesPost(
      `<p data-post='${JSON.stringify(json_object)}'>Hello World</p>`,
      {
          p: ['data-post'],
      },
      {
          onTag(tag, html, options) {
              if (options.isWhite && tag === 'p') {
                  return html;
              }

              return undefined;
          },
      },
  ),
  ```

  ## BlocksRenderer

  ```javascript
  <BlocksRenderer html={html} sanitizeFn={(html) => mySanitizitationFn(html)}>
      {children}
  </BLocksRenderer>
  ```

- 33592ea: Fix child pages with same slugs but different parent. Takes the link property in account to properly match the right page.

## 0.5.0-next.7

### Patch Changes

- e0dfa77: warn if `removeSourceUrl` is used without valid `link` or `backendUrl` values.
- e1b79c7: Fix: check if current path matches the returned post in the SinglePostFetch strategy

## 0.5.0-next.6

### Minor Changes

- ae938bd: Add ability to use the `yoast_head` html to populate the head tags instead of manually rendering every property of the yoast_head_json

### Patch Changes

- f393ac9: fix: removeSourceUrl should not add a / to the beginning of the link if it's a hash link. [#267](https://github.com/10up/headstartwp/issues/267)

## 0.5.0-next.5

### Patch Changes

- 9aea8ab: Fix child pages with same slugs but different parent. Takes the link property in account to properly match the right page.

## 0.5.0-next.4

### Patch Changes

- d7c9871: Export block-related hooks

## 0.5.0-next.3

### Minor Changes

- 73e2dc6: Parses the style attribute of HTML elements into an object, and passes that object down as a prop through the BlocksRenderer component.

  Also updates block components to pass style down as a prop to the provided components.

  Closes [#240](https://github.com/10up/headstartwp/issues/240)

- 7e3a45e: Add React 18 and Next.js 13 support.

## 0.5.0-next.2

### Patch Changes

- 4c52fbc: Improve redirect handling in `fetchRedirect`.

  It now detects redirects that might cause infinite loop and ignore redirects for `wp-login.php`, `wp-register.php` and `wp-admin`.

## 0.5.0-next.1

### Patch Changes

- 6bd469a: add js-xss options param to wpKsesPost and exposing sanitizeFn function to BlocksRenderer

  ## wpKsesPost

  e.g

  ```javascript
  wpKsesPost(
      `<p data-post='${JSON.stringify(json_object)}'>Hello World</p>`,
      {
          p: ['data-post'],
      },
      {
          onTag(tag, html, options) {
              if (options.isWhite && tag === 'p') {
                  return html;
              }

              return undefined;
          },
      },
  ),
  ```

  ## BlocksRenderer

  ```javascript
  <BlocksRenderer html={html} sanitizeFn={html => mySanitizitationFn(html)}>
    {children}
  </BLocksRenderer>
  ```

## 0.5.0-next.0

### Minor Changes

- ad92a7a: Introducing Multisite support to the headless framework.

## 0.4.4

### Patch Changes

- 803299e: Fix previewing revisions of published posts

## 0.4.3

### Patch Changes

- ae8739d: Optimize next.js props
- ec25cdd: Fix queried object detection, account for querying by id as well
- dc7edb1: Improve seo handling. The framework now assumes the main query is the one that draws params from the URL. The main query can also be manually set. Fixes [#185](https://github.com/10up/headstartwp/issues/185)
- 9141bb3: Convert back-end urls in seo metadata to front-end urls
- b3d2216: Further optimize next.js props

## 0.4.3-next.4

### Patch Changes

- b3d2216: Further optimize next.js props

## 0.4.3-next.3

### Patch Changes

- ae8739d: Optimize next.js props

## 0.4.3-next.2

### Patch Changes

- ec25cdd: Fix queried object detection, account for querying by id as well

## 0.4.3-next.1

### Patch Changes

- 9141bb3: Convert back-end urls in seo metadata to front-end urls

## 0.4.3-next.0

### Patch Changes

- dc7edb1: Improve seo handling. The framework now assumes the main query is the one that draws params from the URL. The main query can also be manually set. Fixes [#185](https://github.com/10up/headstartwp/issues/185)

## 0.4.2

### Patch Changes

- 82ac782: Fix [#210](https://github.com/10up/headstartwp/issues/210) - Some params are not taken into account by buildEndpointUrl
- 5df4762: Fix queriedObject: don't assume the first post term/author is the queried object. Moves queried object logic to fetch strategy.
- 18e408f: Introduce `swr` and `fetchStrategyOptions` namespaces in the fetch options. This allow fetchOptions to be passed directly to the fetch strategy.
- b9cece0: Add `type` field to the appropriate post type when previewing post/revisions
- 5fb3696: Fix: Better handle queried object detection for utf8 encoded strings.

## 0.4.2-next.2

### Patch Changes

- 18e408f: Introduce `swr` and `fetchStrategyOptions` namespaces in the fetch options. This allow fetchOptions to be passed directly to the fetch strategy.

## 0.4.2-next.1

### Patch Changes

- 82ac782: Fix [#210](https://github.com/10up/headstartwp/issues/210) - Some params are not taken into account by buildEndpointUrl
- 5fb3696: Fix: Better handle queried object detection for utf8 encoded strings.

## 0.4.2-next.0

### Patch Changes

- 5df4762: Fix queriedObject: don't assume the first post term/author is the queried object. Moves queried object logic to fetch strategy.
- b9cece0: Add `type` field to the appropriate post type when previewing post/revisions

## 0.4.1

### Patch Changes

- dc79cc1: fix domToReact conversion of child nodes.

## 0.4.0

### Minor Changes

- 75d2adb: Introduces on-demand isr revalidation from the WordPress plugin. [#184](https://github.com/10up/headstartwp/pull/184)

## 0.3.2

### Patch Changes

- 8268ca5: Fix: Allow overriding images in next config

## 0.3.1

### Patch Changes

- a920bd8: Fix data.queriedObject for tags

## 0.3.0

### Minor Changes

- 9b992b9: Throw an error when trying to access data from useFetch hooks when the data is not yet available.

## 0.3.0-next.0

### Minor Changes

- 9b992b9: Throw an error when trying to access data from useFetch hooks when the data is not yet available.

## 0.2.1

### Patch Changes

- e9c7ef0: remove emotion dep from core package

## 0.2.1-next.0

### Patch Changes

- e9c7ef0: remove emotion dep from core package

## 0.2.0

### Minor Changes

- a68a9b7: Release stable version
