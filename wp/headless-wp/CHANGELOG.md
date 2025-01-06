# @headstartwp/headstartwp

## 1.1.5-next.0

### Patch Changes

- 8ba6de7: Fix: do not cast menu item ids to number as they are strings

## 1.1.4

### Patch Changes

- 07d0325: Added - Improved tests for the Gutenberg block attribute processing
  Fixed - Gutenberg post content block attribute processing for Synced Patterns and support for multibyte characters.

## 1.1.3

### Patch Changes

- b1d368df: Move yoast to a dev dep

## 1.1.2

### Patch Changes

- 479f0665: PHPCS 3.0 and code styling updates
- 3f1b4f78: fix: hreflangs tags on multilingual sites
- 26246a01: Add the ability to leverage `post.link` for redirecting the previewed post to the appropriate route via the `preview.usePostLinkForRedirect` setting.
- ac0f1684: Fix redirect loop for invalid sitemap paths

## 1.1.1

### Patch Changes

- 0bd8e415: Add ability to preview using an alternative authorization header

## 1.1.0

### Minor Changes

- 8452279a: Implement WordPress native search endpoint

## 1.0.13

### Patch Changes

- d33ffc48: Override Yoast head values to fix seo data for search results page.

## 1.0.12

### Patch Changes

- f18be490: Ensure htmlspecialchars receives an empty string instead of null to fix deprecation warnings.

## 1.0.11

### Patch Changes

- 18d09388: Added - New filter available tenup_headless_wp_revalidate_isr_for_post

## 1.0.10

### Patch Changes

- b54c688e: Fix PHP 8.2 deprecation warnings

## 1.0.9

### Patch Changes

- 569662b6: Improves the Next.js preview cookie handling and fixes a bug where the locale was not properly being passed from WP when previewing.

  First of all, it sets the preview cookie to expire within 5 minutes which aligns with the JWT token expiration.

  Secondly, it will narrow the cookie to the post path being previewed so that `context.preview` is not true for other paths and thus avoiding bypassing getStaticProps until the cookies are cleared (either expires or the browser closes).

## 1.0.9-next.0

### Patch Changes

- 569662b6: Improves the Next.js preview cookie handling and fixes a bug where the locale was not properly being passed from WP when previewing.

  First of all, it sets the preview cookie to expire within 5 minutes which aligns with the JWT token expiration.

  Secondly, it will narrow the cookie to the post path being previewed so that `context.preview` is not true for other paths and thus avoiding bypassing getStaticProps until the cookies are cleared (either expires or the browser closes).

## 1.0.8

### Patch Changes

- d887d837: Adds the filter `tenup_headless_wp_previews_enabled`that can disable preview handling

## 1.0.7

### Patch Changes

- f7bc6b8b: Fix: do not try to parse blocks without a blockName (i.e classic block).
- 4495ffec: Introducing a filter `tenup_headless_wp_render_block_use_tag_processor` to let users to opt into the new `WP_HTML_Tag_Processor` API instead of DomDocument

## 1.0.6

### Patch Changes

- 62ac6b36: Fixing typos.

## 1.0.5

### Patch Changes

- 417d9e00: Fix: do not redirect for missing assets

## 1.0.5-next.0

### Patch Changes

- 417d9e00: Fix: do not redirect for missing assets

## 1.0.4

### Patch Changes

- d7fad023: Improved revalidation logic

## 1.0.3

### Patch Changes

- 3c3a2729: Add support to automatically flushing the cache for the front-end of the site on VIP

## 1.0.2

### Patch Changes

- 5062f08: Fixes several bugs related to Next ISR support

## 1.0.1

### Patch Changes

- 3f43798: Automate plugin versioning

## 1.0.0

### Major Changes

- 1f4491f: Renaming to HeadstartWP

## 1.0.0-next.0

### Major Changes

- 1f4491f: Renaming to HeadstartWP

## 0.9.1

### Patch Changes

- de1f4d7: Fix version mismatch

## 0.9.0

### Minor Changes

- 6d7aaad: Rename plugin name

## 0.7.0

### Minor Changes

- da2386e: 10up Headless Framework is now called HeadstartWP

## 0.6.0

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

- fd2d125: Better app endpoint cache invalidation

## 0.6.0-next.1

### Patch Changes

- fd2d125: Better app endpoint cache invalidation

## 0.6.0-next.0

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

## 0.5.2

### Patch Changes

- e827579: Instead of only checking for HEAD requests, check for a custom header for skipping redirect to the front-end url

## 0.5.2-next.0

### Patch Changes

- e827579: Instead of only checking for HEAD requests, check for a custom header for skipping redirect to the front-end url

## 0.5.1

### Patch Changes

- 9fa4319: Fix previews handling for multisite with locale
