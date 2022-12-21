# @10up/headless-core

## 0.5.0-next.7

### Patch Changes

- e0dfa77: warn if `removeSourceUrl` is used without valid `link` or `backendUrl` values.
- e1b79c7: Fix: check if current path matches the returned post in the SinglePostFetch strategy

## 0.5.0-next.6

### Minor Changes

- ae938bd: Add ability to use the `yoast_head` html to populate the head tags instead of manually rendering every property of the yoast_head_json

### Patch Changes

- f393ac9: fix: removeSourceUrl should not add a / to the beginning of the link if it's a hash link. [#267](https://github.com/10up/headless/issues/267)

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

  Closes [#240](https://github.com/10up/headless/issues/240)

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
- dc7edb1: Improve seo handling. The framework now assumes the main query is the one that draws params from the URL. The main query can also be manually set. Fixes [#185](https://github.com/10up/headless/issues/185)
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

- dc7edb1: Improve seo handling. The framework now assumes the main query is the one that draws params from the URL. The main query can also be manually set. Fixes [#185](https://github.com/10up/headless/issues/185)

## 0.4.2

### Patch Changes

- 82ac782: Fix [#210](https://github.com/10up/headless/issues/210) - Some params are not taken into account by buildEndpointUrl
- 5df4762: Fix queriedObject: don't assume the first post term/author is the queried object. Moves queried object logic to fetch strategy.
- 18e408f: Introduce `swr` and `fetchStrategyOptions` namespaces in the fetch options. This allow fetchOptions to be passed directly to the fetch strategy.
- b9cece0: Add `type` field to the appropriate post type when previewing post/revisions
- 5fb3696: Fix: Better handle queried object detection for utf8 encoded strings.

## 0.4.2-next.2

### Patch Changes

- 18e408f: Introduce `swr` and `fetchStrategyOptions` namespaces in the fetch options. This allow fetchOptions to be passed directly to the fetch strategy.

## 0.4.2-next.1

### Patch Changes

- 82ac782: Fix [#210](https://github.com/10up/headless/issues/210) - Some params are not taken into account by buildEndpointUrl
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

- 75d2adb: Introduces on-demand isr revalidation from the WordPress plugin. [#184](https://github.com/10up/headless/pull/184)

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
