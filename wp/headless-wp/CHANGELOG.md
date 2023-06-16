# @headstartwp/headstartwp

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
