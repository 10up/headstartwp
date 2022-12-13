---
id: "10up_headless_core.PostParams"
title: "Interface: PostParams"
sidebar_label: "PostParams"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).PostParams

The EndpointParams supported by the [SinglePostFetchStrategy](../classes/10up_headless_core.SinglePostFetchStrategy.md)

## Hierarchy

- [`EndpointParams`](10up_headless_core.EndpointParams.md)

  ↳ **`PostParams`**

## Properties

### \_embed

• `Optional` **\_embed**: `boolean`

The _embed param returneds associated entities in the response

It's recommended to avoid additional requests to fetch data

#### Inherited from

[EndpointParams](10up_headless_core.EndpointParams.md).[_embed](10up_headless_core.EndpointParams.md#_embed)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:17](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L17)

___

### \_fields

• `Optional` **\_fields**: `string`[]

The _fields parameter is used to return only the specified fields in the response

#### Inherited from

[EndpointParams](10up_headless_core.EndpointParams.md).[_fields](10up_headless_core.EndpointParams.md#_fields)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:22](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L22)

___

### authToken

• `Optional` **authToken**: `string`

The authToken, required to fetch revisions or non-published posts

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:46](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L46)

___

### id

• `Optional` **id**: `Number`

Fetch post by id

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:36](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L36)

___

### postType

• `Optional` **postType**: `string` \| `string`[]

Post Types where we should look for

If multiple post types are specified
multiple requests will be issued to each post type until a matching post is found

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:31](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L31)

___

### revision

• `Optional` **revision**: `Boolean`

If set will fetch the latest post revision

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:41](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L41)

___

### slug

• `Optional` **slug**: `string`

The slug of the post to fetch

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:23](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L23)
