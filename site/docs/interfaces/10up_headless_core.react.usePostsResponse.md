---
id: "10up_headless_core.react.usePostsResponse"
title: "Interface: usePostsResponse"
sidebar_label: "@10up/headless-core.react.usePostsResponse"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).[react](../namespaces/10up_headless_core.react.md).usePostsResponse

## Hierarchy

- [`HookResponse`](10up_headless_core.react.HookResponse.md)

  ↳ **`usePostsResponse`**

## Properties

### data

• `Optional` **data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `pageInfo` | [`PageInfo`](10up_headless_core.PageInfo.md) |
| `posts` | [`PostEntity`](10up_headless_core.PostEntity.md)[] |
| `queriedObject` | [`QueriedObject`](../modules/10up_headless_core.md#queriedobject) |

#### Overrides

[HookResponse](10up_headless_core.react.HookResponse.md).[data](10up_headless_core.react.HookResponse.md#data)

#### Defined in

[packages/core/src/react/hooks/useFetchPosts.ts:59](https://github.com/10up/headless/blob/5293da0/packages/core/src/react/hooks/useFetchPosts.ts#L59)

___

### error

• `Optional` **error**: `string`

#### Inherited from

[HookResponse](10up_headless_core.react.HookResponse.md).[error](10up_headless_core.react.HookResponse.md#error)

#### Defined in

[packages/core/src/react/hooks/types.ts:6](https://github.com/10up/headless/blob/5293da0/packages/core/src/react/hooks/types.ts#L6)

___

### isMainQuery

• **isMainQuery**: `boolean`

#### Inherited from

[HookResponse](10up_headless_core.react.HookResponse.md).[isMainQuery](10up_headless_core.react.HookResponse.md#ismainquery)

#### Defined in

[packages/core/src/react/hooks/types.ts:8](https://github.com/10up/headless/blob/5293da0/packages/core/src/react/hooks/types.ts#L8)

___

### loading

• **loading**: `boolean`

#### Inherited from

[HookResponse](10up_headless_core.react.HookResponse.md).[loading](10up_headless_core.react.HookResponse.md#loading)

#### Defined in

[packages/core/src/react/hooks/types.ts:7](https://github.com/10up/headless/blob/5293da0/packages/core/src/react/hooks/types.ts#L7)

___

### pageType

• **pageType**: [`PageType`](../namespaces/10up_headless_core.react.md#pagetype)

#### Defined in

[packages/core/src/react/hooks/useFetchPosts.ts:64](https://github.com/10up/headless/blob/5293da0/packages/core/src/react/hooks/useFetchPosts.ts#L64)
