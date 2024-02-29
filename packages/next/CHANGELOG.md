# @headstartwp/next

## 1.3.2

### Patch Changes

- 5396b238: Hotfix preview alternative headers

## 1.3.1

### Patch Changes

- 0bd8e415: Add ability to preview using an alternative authorization header
- Updated dependencies [0bd8e415]
  - @headstartwp/core@1.3.1

## 1.3.0

### Minor Changes

- 8452279a: Implement WordPress native search endpoint

### Patch Changes

- 6a35eaa0: Fix invalid structured data ld+json
- e0e7c82f: Fix redirect status code when set to permanent'
- Updated dependencies [8452279a]
  - @headstartwp/core@1.3.0

## 1.2.0

### Minor Changes

- 6dc435f7: Add support for archive path matching `matchArchivePath`.
  Add support for passing a function to `customPostTypes` and `customTaxonomies` option in `headstartwp.config.js`.
  Rename `headless.config.js` to `headstartwp.config.js` but keep backward compatibility.
  Automatically load `headstartwp.config.js` or `headless.config.js` in `next.config.js`.

### Patch Changes

- Updated dependencies [6dc435f7]
  - @headstartwp/core@1.2.0

## 1.2.0-next.0

### Minor Changes

- 6dc435f7: Add support for archive path matching `matchArchivePath`.
  Add support for passing a function to `customPostTypes` and `customTaxonomies` option in `headstartwp.config.js`.
  Rename `headless.config.js` to `headstartwp.config.js` but keep backward compatibility.
  Automatically load `headstartwp.config.js` or `headless.config.js` in `next.config.js`.

### Patch Changes

- Updated dependencies [6dc435f7]
  - @headstartwp/core@1.2.0-next.0

## 1.1.6

### Patch Changes

- 5bf90ccd: Fix loading of the headless.config.js file to prevent injecting it twice.

## 1.1.6-next.0

### Patch Changes

- 5bf90ccd: Fix loading of the headless.config.js file to prevent injecting it twice.

## 1.1.5

### Patch Changes

- 556aba2b: Fix previews for custom post types

## 1.1.4

### Patch Changes

- Updated dependencies [15189a03]
- Updated dependencies [772c5f1c]
  - @headstartwp/core@1.1.2

## 1.1.4-next.0

### Patch Changes

- Updated dependencies [15189a03]
  - @headstartwp/core@1.1.2-next.0

## 1.1.3

### Patch Changes

- b07d4f8e: Fix previews

## 1.1.2

### Patch Changes

- 1922ffbd: Fix bug where previews were not working with locales as the redirect path for the preview cookie was incorrect.

## 1.1.1

### Patch Changes

- de501ff7: Fix an issue for images without width or height
- Updated dependencies [de501ff7]
  - @headstartwp/core@1.1.1

## 1.1.0

### Minor Changes

- 4275962b: Introducing `usePostOrPosts`.
- 569662b6: Improves the Next.js preview cookie handling and fixes a bug where the locale was not properly being passed from WP when previewing.

  First of all, it sets the preview cookie to expire within 5 minutes which aligns with the JWT token expiration.

  Secondly, it will narrow the cookie to the post path being previewed so that `context.preview` is not true for other paths and thus avoiding bypassing getStaticProps until the cookies are cleared (either expires or the browser closes).

### Patch Changes

- e6a0c231: Lower compilation target
- 232f4e68: Fix: only convertUrls if url starts with sourceUrl
- 90d5fa3c: Fix typo in files to be published to npm
- 1494a332: Further Optimize next.js props by removing yoast seo bloat.
- 866551f2: Fix an annoying bug that would require deleting the .next/cache folder after changing headless.config.js or .env files. Now you only need to restart the next.js server after changing those files.
- Updated dependencies [e6a0c231]
- Updated dependencies [24f8a99f]
- Updated dependencies [bb39a603]
- Updated dependencies [4275962b]
- Updated dependencies [569662b6]
- Updated dependencies [df3e65ce]
- Updated dependencies [e9064d69]
- Updated dependencies [56ddf9be]
- Updated dependencies [1494a332]
- Updated dependencies [d3ec9d83]
  - @headstartwp/core@1.1.0

## 1.1.0-next.3

### Minor Changes

- 4275962b: Introducing `usePostOrPosts`.

### Patch Changes

- 866551f2: Fix an annoying bug that would require deleting the .next/cache folder after changing headless.config.js or .env files. Now you only need to restart the next.js server after changing those files.
- Updated dependencies [4275962b]
  - @headstartwp/core@1.1.0-next.4

## 1.1.0-next.2

### Patch Changes

- e6a0c231: Lower compilation target
- 90d5fa3c: Fix typo in files to be published to npm
- Updated dependencies [e6a0c231]
- Updated dependencies [bb39a603]
  - @headstartwp/core@1.1.0-next.2

## 1.1.0-next.1

### Patch Changes

- 232f4e68: Fix: only convertUrls if url starts with sourceUrl
- 1494a332: Further Optimize next.js props by removing yoast seo bloat.
- Updated dependencies [1494a332]
  - @headstartwp/core@1.1.0-next.1

## 1.1.0-next.0

### Minor Changes

- 569662b6: Improves the Next.js preview cookie handling and fixes a bug where the locale was not properly being passed from WP when previewing.

  First of all, it sets the preview cookie to expire within 5 minutes which aligns with the JWT token expiration.

  Secondly, it will narrow the cookie to the post path being previewed so that `context.preview` is not true for other paths and thus avoiding bypassing getStaticProps until the cookies are cleared (either expires or the browser closes).

### Patch Changes

- Updated dependencies [24f8a99f]
- Updated dependencies [569662b6]
- Updated dependencies [df3e65ce]
- Updated dependencies [d3ec9d83]
  - @headstartwp/core@1.1.0-next.0

## 1.0.6

### Patch Changes

- 62ac6b36: Fixing typos.
- Updated dependencies [62ac6b36]
  - @headstartwp/core@1.0.5

## 1.0.5

### Patch Changes

- 5e63a790: Adding a custom vip image loader for VIP Node.js hosting
- c3de4f3d: Fix: avoid instanceof to prevent weird bugs
- Updated dependencies [c3de4f3d]
- Updated dependencies [2cbaec01]
- Updated dependencies [1beed833]
  - @headstartwp/core@1.0.4

## 1.0.5-next.0

### Patch Changes

- 5e63a790: Adding a custom vip image loader for VIP Node.js hosting
- c3de4f3d: Fix: avoid instanceof to prevent weird bugs
- Updated dependencies [c3de4f3d]
- Updated dependencies [2cbaec01]
- Updated dependencies [1beed833]
  - @headstartwp/core@1.0.4-next.0

## 1.0.4

### Patch Changes

- ba952037: Fix: fetch calls made under getStaticProps now always includes a timestamp in the query to ensure it always get latest content from the api
- Updated dependencies [ba952037]
  - @headstartwp/core@1.0.3

## 1.0.3

### Patch Changes

- 629a77c8: Fix compilation issue on latest next.js version

## 1.0.2

### Patch Changes

- e068bff: Fix config injection for api endpoints
- f00955b: Fix: Update the LinkBlock component to use raw attributes instead of block attributes
- Updated dependencies [b26210d]
  - @headstartwp/core@1.0.2

## 1.0.1

### Patch Changes

- f016b00: Re-exporting html-react-parser from core package
- Updated dependencies [f016b00]
  - @headstartwp/core@1.0.1

## 1.0.0

### Major Changes

- 1f4491f: Renaming to HeadstartWP

### Patch Changes

- af507b7: Updating swr to latest version
- 97ac0b0: Add devMode for more debugging data
- 7ec30e1: Abstract SWRConfig in core package
- 6ce773e: Reverting CJS only
- Updated dependencies [a5c5e52]
- Updated dependencies [1f4491f]
- Updated dependencies [af507b7]
- Updated dependencies [97ac0b0]
- Updated dependencies [7ec30e1]
- Updated dependencies [6ce773e]
  - @headstartwp/core@1.0.0

## 1.0.0-next.8

### Patch Changes

- 7ec30e1: Abstract SWRConfig in core package
- Updated dependencies [a5c5e52]
- Updated dependencies [7ec30e1]
  - @headstartwp/core@1.0.0-next.7

## 1.0.0-next.7

### Patch Changes

- f20d010: Re-add workaround
- Updated dependencies [f20d010]
  - @headstartwp/core@1.0.0-next.6

## 1.0.0-next.6

### Patch Changes

- 6ce773e: Reverting CJS only
- Updated dependencies [6ce773e]
  - @headstartwp/core@1.0.0-next.5

## 1.0.0-next.5

### Patch Changes

- 5bdd604: Switching to CJS only
- Updated dependencies [5bdd604]
  - @headstartwp/core@1.0.0-next.4

## 1.0.0-next.4

### Patch Changes

- 97ac0b0: Add devMode for more debugging data
- Updated dependencies [97ac0b0]
  - @headstartwp/core@1.0.0-next.3

## 1.0.0-next.3

### Patch Changes

- af507b7: Updating swr to latest version
- Updated dependencies [af507b7]
  - @headstartwp/core@1.0.0-next.2

## 1.0.0-next.2

### Major Changes

- 1f4491f: Renaming to HeadstartWP

### Patch Changes

- Updated dependencies [1f4491f]
  - @headstartwp/core@1.0.0-next.1

## 0.7.3-next.1

### Patch Changes

- 44d5607: New strategy for loading config
- Updated dependencies [44d5607]
  - @10up/headless-core@0.8.2-next.0

## 0.7.3-next.0

### Patch Changes

- 199baaa: Fix: removing old workaround for config loading

## 0.7.2

### Patch Changes

- 3cd203c: Add support for logging/debugging.
- Updated dependencies [3cd203c]
  - @10up/headless-core@0.8.1

## 0.7.1

### Patch Changes

- Updated dependencies [bd83dc9]
- Updated dependencies [3029765]
  - @10up/headless-core@0.8.0

## 0.7.0

### Minor Changes

- 2c62120: Rewriting feed URLs with front-end URLs (except for admin and wp-content upload links)
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
- 59c9ff9: Fix duplicate Yoast SEO meta tags
- a444791: Fix TS types
- Updated dependencies [60af8c8]
- Updated dependencies [1f7e4ff]
- Updated dependencies [fdde401]
- Updated dependencies [a444791]
  - @10up/headless-core@0.7.0

## 0.7.0-next.3

### Patch Changes

- 59c9ff9: Fix duplicate Yoast SEO meta tags

## 0.7.0-next.2

### Patch Changes

- 60af8c8: Improve package compatibility with system that do not support package.json exports
- Updated dependencies [60af8c8]
- Updated dependencies [1f7e4ff]
  - @10up/headless-core@0.7.0-next.2

## 0.7.0-next.1

### Patch Changes

- a444791: Fix TS types
- Updated dependencies [a444791]
  - @10up/headless-core@0.7.0-next.1

## 0.7.0-next.0

### Minor Changes

- 2c62120: Rewriting feed URLs with front-end URLs (except for admin and wp-content upload links)
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

- Updated dependencies [fdde401]
  - @10up/headless-core@0.7.0-next.0

## 0.6.4

### Patch Changes

- Updated dependencies [e827579]
  - @10up/headless-core@0.6.4

## 0.6.4-next.0

### Patch Changes

- Updated dependencies [e827579]
  - @10up/headless-core@0.6.4-next.0

## 0.6.3

### Patch Changes

- 664f306: Fix redirects by using resolvedUrl instead of req.url
- Updated dependencies [664f306]
  - @10up/headless-core@0.6.3

## 0.6.3-next.0

### Patch Changes

- 664f306: Fix redirects by using resolvedUrl instead of req.url
- Updated dependencies [664f306]
  - @10up/headless-core@0.6.3-next.0

## 0.6.2

### Patch Changes

- 9fa4319: Fix previews handling for multisite with locale
- Updated dependencies [9bf3642]
- Updated dependencies [9fa4319]
- Updated dependencies [3671143]
- Updated dependencies [61231c3]
  - @10up/headless-core@0.6.2

## 0.6.1

### Patch Changes

- 97c7cbb: Fix: improved check in isPreviewRequest and exposing defaultRedirect handler in previewHandler
- Updated dependencies [6282580]
  - @10up/headless-core@0.6.1

## 0.6.1-next.0

### Patch Changes

- 97c7cbb: Fix: improved check in isPreviewRequest and exposing defaultRedirect handler in previewHandler
- Updated dependencies [6282580]
  - @10up/headless-core@0.6.1-next.0

## 0.6.0

### Minor Changes

- 0c0350a: Improve TypeScript Support

### Patch Changes

- 83f2fd6: Remove unnecessary dependency.
- 4093142: Introducing types for next.js data-fetching methods and the ability to pass default param via fetcher()
- d062e6e: Fix: addHookData ts typing
- 13a1327: Update TypeScript types for WP entities
- Updated dependencies [83f2fd6]
- Updated dependencies [4093142]
- Updated dependencies [0c0350a]
- Updated dependencies [906f32a]
- Updated dependencies [d062e6e]
- Updated dependencies [13a1327]
  - @10up/headless-core@0.6.0

## 0.6.0-next.4

### Patch Changes

- 83f2fd6: Remove unnecessary dependency.
- Updated dependencies [83f2fd6]
  - @10up/headless-core@0.6.0-next.5

## 0.6.0-next.3

### Patch Changes

- d062e6e: Fix: addHookData ts typing
- Updated dependencies [d062e6e]
  - @10up/headless-core@0.6.0-next.4

## 0.6.0-next.2

### Patch Changes

- 4093142: Introducing types for next.js data-fetching methods and the ability to pass default param via fetcher()
- Updated dependencies [4093142]
  - @10up/headless-core@0.6.0-next.2

## 0.6.0-next.1

### Minor Changes

- 0c0350a: Improve TypeScript Support

### Patch Changes

- Updated dependencies [0c0350a]
  - @10up/headless-core@0.6.0-next.1

## 0.5.6-next.0

### Patch Changes

- 13a1327: Update TypeScript types for WP entities
- Updated dependencies [13a1327]
  - @10up/headless-core@0.5.4-next.0

## 0.5.5

### Patch Changes

- 2a35630: fix ts entry points in package.json
- Updated dependencies [2a35630]
  - @10up/headless-core@0.5.3

## 0.5.4

### Patch Changes

- d039566: [#318](https://github.com/10up/headstartwp/pull/318) feat: add an official yoast seo integration.
- Updated dependencies [d039566]
  - @10up/headless-core@0.5.2

## 0.5.3

### Patch Changes

- e7f94b9: [#313](https://github.com/10up/headstartwp/pull/313) feat: add support for yoast sitemaps.

## 0.5.2

### Patch Changes

- 6c68bea: feat: add a default rewrite rule for robots.txt

## 0.5.1

### Patch Changes

- 1de925a: Fix [#294](https://github.com/10up/headstartwp/issues/294): use the full path for multisite revalidation. PR [#296](https://github.com/10up/headstartwp/pull/296).

## 0.5.0

### Minor Changes

- 33592ea: Update Yoast robots tag and add article:modified_time, twitter:label and twitter:data tags
- 33592ea: Introducing Multisite support to the headless framework.
- 33592ea: Add ability to use the `yoast_head` html to populate the head tags instead of manually rendering every property of the yoast_head_json
- 33592ea: Parses the style attribute of HTML elements into an object, and passes that object down as a prop through the BlocksRenderer component.

  Also updates block components to pass style down as a prop to the provided components.

  Closes [#240](https://github.com/10up/headstartwp/issues/240)

- 33592ea: Add React 18 and Next.js 13 support.

### Patch Changes

- 33592ea: Merge rewrites config.
- 33592ea: Fix url replacement on Yoast component
- 33592ea: add missing key prop in `Yoast` component.
- 33592ea: Fix duplicate yoast tags
- 33592ea: Redirect :path/page/1 to :path/
- Updated dependencies [33592ea]
- Updated dependencies [33592ea]
- Updated dependencies [33592ea]
- Updated dependencies [33592ea]
- Updated dependencies [33592ea]
- Updated dependencies [33592ea]
- Updated dependencies [33592ea]
- Updated dependencies [33592ea]
- Updated dependencies [33592ea]
- Updated dependencies [33592ea]
- Updated dependencies [33592ea]
  - @10up/headless-core@0.5.0

## 0.5.0-next.6

### Patch Changes

- d41be3b: Fix duplicate yoast tags

## 0.5.0-next.5

### Patch Changes

- b5e59cd: Fix url replacement on Yoast component

## 0.5.0-next.4

### Minor Changes

- ae938bd: Add ability to use the `yoast_head` html to populate the head tags instead of manually rendering every property of the yoast_head_json

### Patch Changes

- 3fc39d3: Redirect :path/page/1 to :path/
- Updated dependencies [f393ac9]
- Updated dependencies [ae938bd]
  - @10up/headless-core@0.5.0-next.6

## 0.5.0-next.3

### Patch Changes

- 79c4d07: add missing key prop in `Yoast` component.
- Updated dependencies [9aea8ab]
  - @10up/headless-core@0.5.0-next.5

## 0.5.0-next.2

### Minor Changes

- be4137f: Update Yoast robots tag and add article:modified_time, twitter:label and twitter:data tags
- 73e2dc6: Parses the style attribute of HTML elements into an object, and passes that object down as a prop through the BlocksRenderer component.

  Also updates block components to pass style down as a prop to the provided components.

  Closes [#240](https://github.com/10up/headstartwp/issues/240)

- 7e3a45e: Add React 18 and Next.js 13 support.

### Patch Changes

- Updated dependencies [73e2dc6]
- Updated dependencies [7e3a45e]
  - @10up/headless-core@0.5.0-next.3

## 0.5.0-next.1

### Patch Changes

- 5b9bc8b: Merge rewrites config.

## 0.5.0-next.0

### Minor Changes

- ad92a7a: Introducing Multisite support to the headless framework.

### Patch Changes

- Updated dependencies [ad92a7a]
  - @10up/headless-core@0.5.0-next.0

## 0.4.3

### Patch Changes

- ae8739d: Optimize next.js props
- ec25cdd: Fix queried object detection, account for querying by id as well
- dc7edb1: Improve seo handling. The framework now assumes the main query is the one that draws params from the URL. The main query can also be manually set. Fixes [#185](https://github.com/10up/headstartwp/issues/185)
- 7923590: Fix: do not include preview params in swr key
- 9141bb3: Convert back-end urls in seo metadata to front-end urls
- b3d2216: Further optimize next.js props
- Updated dependencies [ae8739d]
- Updated dependencies [ec25cdd]
- Updated dependencies [dc7edb1]
- Updated dependencies [9141bb3]
- Updated dependencies [b3d2216]
  - @10up/headless-core@0.4.3

## 0.4.3-next.4

### Patch Changes

- b3d2216: Further optimize next.js props
- Updated dependencies [b3d2216]
  - @10up/headless-core@0.4.3-next.4

## 0.4.3-next.3

### Patch Changes

- ae8739d: Optimize next.js props
- Updated dependencies [ae8739d]
  - @10up/headless-core@0.4.3-next.3

## 0.4.3-next.2

### Patch Changes

- ec25cdd: Fix queried object detection, account for querying by id as well
- Updated dependencies [ec25cdd]
  - @10up/headless-core@0.4.3-next.2

## 0.4.3-next.1

### Patch Changes

- 9141bb3: Convert back-end urls in seo metadata to front-end urls
- Updated dependencies [9141bb3]
  - @10up/headless-core@0.4.3-next.1

## 0.4.3-next.0

### Patch Changes

- dc7edb1: Improve seo handling. The framework now assumes the main query is the one that draws params from the URL. The main query can also be manually set. Fixes [#185](https://github.com/10up/headstartwp/issues/185)
- 7923590: Fix: do not include preview params in swr key
- Updated dependencies [dc7edb1]
  - @10up/headless-core@0.4.3-next.0

## 0.4.2

### Patch Changes

- 82ac782: Fix [#210](https://github.com/10up/headstartwp/issues/210) - Some params are not taken into account by buildEndpointUrl
- 5df4762: Fix queriedObject: don't assume the first post term/author is the queried object. Moves queried object logic to fetch strategy.
- 18e408f: Introduce `swr` and `fetchStrategyOptions` namespaces in the fetch options. This allow fetchOptions to be passed directly to the fetch strategy.
- Updated dependencies [82ac782]
- Updated dependencies [5df4762]
- Updated dependencies [18e408f]
- Updated dependencies [b9cece0]
- Updated dependencies [5fb3696]
  - @10up/headless-core@0.4.2

## 0.4.2-next.2

### Patch Changes

- 18e408f: Introduce `swr` and `fetchStrategyOptions` namespaces in the fetch options. This allow fetchOptions to be passed directly to the fetch strategy.
- Updated dependencies [18e408f]
  - @10up/headless-core@0.4.2-next.2

## 0.4.2-next.1

### Patch Changes

- 82ac782: Fix [#210](https://github.com/10up/headstartwp/issues/210) - Some params are not taken into account by buildEndpointUrl
- Updated dependencies [82ac782]
- Updated dependencies [5fb3696]
  - @10up/headless-core@0.4.2-next.1

## 0.4.2-next.0

### Patch Changes

- 5df4762: Fix queriedObject: don't assume the first post term/author is the queried object. Moves queried object logic to fetch strategy.
- Updated dependencies [5df4762]
- Updated dependencies [b9cece0]
  - @10up/headless-core@0.4.2-next.0

## 0.4.1

### Patch Changes

- d41a49a: Optimize `addHookData` by removing duplicate theme.json and yoast_head_json

## 0.4.0

### Minor Changes

- 730d47e: Stop using `instanceof` since cjs builds does not work with instanceof. Instead check the error name property.
- 75d2adb: Introduces on-demand isr revalidation from the WordPress plugin. [#184](https://github.com/10up/headstartwp/pull/184)

### Patch Changes

- Updated dependencies [75d2adb]
  - @10up/headless-core@0.4.0

## 0.3.1

### Patch Changes

- 8268ca5: Fix: Allow overriding images in next config
- Updated dependencies [8268ca5]
  - @10up/headless-core@0.3.2

## 0.3.0

### Minor Changes

- 9b992b9: Throw an error when trying to access data from useFetch hooks when the data is not yet available.

### Patch Changes

- Updated dependencies [9b992b9]
  - @10up/headless-core@0.3.0

## 0.3.0-next.0

### Minor Changes

- 9b992b9: Throw an error when trying to access data from useFetch hooks when the data is not yet available.

### Patch Changes

- Updated dependencies [9b992b9]
  - @10up/headless-core@0.3.0-next.0

## 0.2.1

### Patch Changes

- Updated dependencies [e9c7ef0]
  - @10up/headless-core@0.2.1

## 0.2.1-next.0

### Patch Changes

- Updated dependencies [e9c7ef0]
  - @10up/headless-core@0.2.1-next.0

## 0.2.0

### Minor Changes

- a68a9b7: Release stable version

### Patch Changes

- Updated dependencies [a68a9b7]
  - @10up/headless-core@0.2.0
