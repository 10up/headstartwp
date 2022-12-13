---
id: "10up_headless_core.react.useSearchResponse"
title: "Interface: useSearchResponse"
sidebar_label: "@10up/headless-core.react.useSearchResponse"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).[react](../namespaces/10up_headless_core.react.md).useSearchResponse

## Hierarchy

- [`HookResponse`](10up_headless_core.react.HookResponse.md)

  ↳ **`useSearchResponse`**

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

[packages/core/src/react/hooks/useFetchSearch.ts:18](https://github.com/10up/headless/blob/5293da0/packages/core/src/react/hooks/useFetchSearch.ts#L18)

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
