# @10up/headless-next

## 0.5.1

### Patch Changes

- 1de925a: Fix [#294](https://github.com/10up/headless/issues/294): use the full path for multisite revalidation. PR [#296](https://github.com/10up/headless/pull/296).

## 0.5.0

### Minor Changes

- 33592ea: Update Yoast robots tag and add article:modified_time, twitter:label and twitter:data tags
- 33592ea: Introducing Multisite support to the headless framework.
- 33592ea: Add ability to use the `yoast_head` html to populate the head tags instead of manually rendering every property of the yoast_head_json
- 33592ea: Parses the style attribute of HTML elements into an object, and passes that object down as a prop through the BlocksRenderer component.

  Also updates block components to pass style down as a prop to the provided components.

  Closes [#240](https://github.com/10up/headless/issues/240)

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

  Closes [#240](https://github.com/10up/headless/issues/240)

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
- dc7edb1: Improve seo handling. The framework now assumes the main query is the one that draws params from the URL. The main query can also be manually set. Fixes [#185](https://github.com/10up/headless/issues/185)
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

- dc7edb1: Improve seo handling. The framework now assumes the main query is the one that draws params from the URL. The main query can also be manually set. Fixes [#185](https://github.com/10up/headless/issues/185)
- 7923590: Fix: do not include preview params in swr key
- Updated dependencies [dc7edb1]
  - @10up/headless-core@0.4.3-next.0

## 0.4.2

### Patch Changes

- 82ac782: Fix [#210](https://github.com/10up/headless/issues/210) - Some params are not taken into account by buildEndpointUrl
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

- 82ac782: Fix [#210](https://github.com/10up/headless/issues/210) - Some params are not taken into account by buildEndpointUrl
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
- 75d2adb: Introduces on-demand isr revalidation from the WordPress plugin. [#184](https://github.com/10up/headless/pull/184)

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
