# @10up/headless-core

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

- 9b992b9: Throw an error when trying to access data from useFetch hooks when the data is not yet avaliable.

## 0.3.0-next.0

### Minor Changes

- 9b992b9: Throw an error when trying to access data from useFetch hooks when the data is not yet avaliable.

## 0.2.1

### Patch Changes

- e9c7ef0: remove emotion dep from core package

## 0.2.1-next.0

### Patch Changes

- e9c7ef0: remove emotion dep from core package

## 0.2.0

### Minor Changes

- a68a9b7: Release stable version
