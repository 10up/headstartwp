---
id: "10up_headless_core.TaxonomyArchiveParams"
title: "Interface: TaxonomyArchiveParams"
sidebar_label: "@10up/headless-core.TaxonomyArchiveParams"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).TaxonomyArchiveParams

The endpoint params supported by [TaxonomyTermsStrategy](../classes/10up_headless_core.TaxonomyTermsStrategy.md)

## Hierarchy

- [`EndpointParams`](10up_headless_core.EndpointParams.md)

  ↳ **`TaxonomyArchiveParams`**

## Properties

### \_embed

• `Optional` **\_embed**: `boolean`

The _embed param returneds associated entities in the response

It's recommended to avoid additional requests to fetch data

#### Inherited from

[EndpointParams](10up_headless_core.EndpointParams.md).[_embed](10up_headless_core.EndpointParams.md#_embed)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:17](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L17)

___

### \_fields

• `Optional` **\_fields**: `string`[]

The _fields parameter is used to return only the specified fields in the response

#### Inherited from

[EndpointParams](10up_headless_core.EndpointParams.md).[_fields](10up_headless_core.EndpointParams.md#_fields)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:22](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L22)

___

### exclude

• `Optional` **exclude**: `number` \| `number`[]

Ensure result set excludes specific IDs.

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:49](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L49)

___

### hide\_empty

• `Optional` **hide\_empty**: `string`

Whether to hide terms not assigned to any posts.

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:76](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L76)

___

### include

• `Optional` **include**: `number` \| `number`[]

Limit result set to specific IDs.

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:44](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L44)

___

### order

• `Optional` **order**: ``"asc"`` \| ``"desc"``

Order sort attribute ascending or descending.

**`Default`**

'asc'

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:56](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L56)

___

### orderby

• `Optional` **orderby**: ``"slug"`` \| ``"id"`` \| ``"description"`` \| ``"name"`` \| ``"count"`` \| ``"include"`` \| ``"include_slugs"`` \| ``"term_group"``

Sort collection by term attribute.

**`Default`**

'name'

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:63](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L63)

___

### page

• `Optional` **page**: `string`

Current page of the collection.

**`Default`**

1

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:27](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L27)

___

### parent

• `Optional` **parent**: `number`

Limit result set to terms assigned to a specific parent.

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:81](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L81)

___

### per\_page

• `Optional` **per\_page**: `string`

Maximum number of items to be returned in result set.

**`Default`**

10

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:34](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L34)

___

### post

• `Optional` **post**: `number`

Limit result set to terms assigned to a specific post.

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:86](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L86)

___

### search

• `Optional` **search**: `string`

Limit results to those matching a string

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:39](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L39)

___

### slug

• `Optional` **slug**: `string` \| `string`[]

Limit result set to terms with one or more specific slugs.

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:91](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L91)

___

### taxonomy

• `Optional` **taxonomy**: `string`

The taxonomy the terms are to be fetched from.

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:20](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L20)
