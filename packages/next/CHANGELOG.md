# @10up/headless-next

## 0.4.4-next.0

### Patch Changes

- Updated dependencies [35c2f23]
  - @10up/headless-core@0.4.5-next.0

## 0.4.3

### Patch Changes

- ae8739d: Optimize next.js props
- ec25cdd: Fix queried object detection, account for querying by id as well
- dc7edb1: Improve seo handling. The framework now assumes the main query is the one that drwas params from the URL. The main query can also be manually set. Fixes [#185](https://github.com/10up/headless/issues/185)
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

- dc7edb1: Improve seo handling. The framework now assumes the main query is the one that drwas params from the URL. The main query can also be manually set. Fixes [#185](https://github.com/10up/headless/issues/185)
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

- 9b992b9: Throw an error when trying to access data from useFetch hooks when the data is not yet avaliable.

### Patch Changes

- Updated dependencies [9b992b9]
  - @10up/headless-core@0.3.0

## 0.3.0-next.0

### Minor Changes

- 9b992b9: Throw an error when trying to access data from useFetch hooks when the data is not yet avaliable.

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
