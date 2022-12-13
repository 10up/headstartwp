---
id: "10up_headless_core.PostsArchiveParams"
title: "Interface: PostsArchiveParams"
sidebar_label: "@10up/headless-core.PostsArchiveParams"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).PostsArchiveParams

The EndpointParams supported by the [PostsArchiveFetchStrategy](../classes/10up_headless_core.PostsArchiveFetchStrategy.md)

## Hierarchy

- [`EndpointParams`](10up_headless_core.EndpointParams.md)

  ↳ **`PostsArchiveParams`**

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

### author

• `Optional` **author**: `string` \| `number` \| `number`[]

Limit result set to posts assigned to specific authors.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:82](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L82)

___

### author\_exclude

• `Optional` **author\_exclude**: `number` \| `number`[]

Ensure result set excludes posts assigned to specific authors.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:87](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L87)

___

### categories

• `Optional` **categories**: `string` \| `number` \| `string`[] \| `number`[]

Limit result set to all items that have the specified term assigned in the categories taxonomy.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:155](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L155)

___

### categories\_exclude

• `Optional` **categories\_exclude**: `number` \| `number`[]

Limit result set to all items except those that have the specified term assigned in the categories taxonomy.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:160](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L160)

___

### category

• `Optional` **category**: `string` \| `number` \| `number`[]

If set will filter results by the specified category name

It supports both a category id and category slug

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:43](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L43)

___

### day

• `Optional` **day**: `string`

If set will filter results by the specified day

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:65](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L65)

___

### exclude

• `Optional` **exclude**: `number`[]

Ensure result set excludes specific IDs.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:92](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L92)

___

### include

• `Optional` **include**: `number`[]

Limit result set to specific IDs.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:97](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L97)

___

### month

• `Optional` **month**: `string`

If set will filter results by the specified month

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:60](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L60)

___

### offset

• `Optional` **offset**: `number`

Offset the result set by a specific number of items.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:102](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L102)

___

### order

• `Optional` **order**: ``"asc"`` \| ``"desc"``

Order sort attribute ascending or descending.

**`Default`**

'desc'

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:109](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L109)

___

### orderby

• `Optional` **orderby**: ``"slug"`` \| ``"date"`` \| ``"modified"`` \| ``"id"`` \| ``"title"`` \| ``"author"`` \| ``"parent"`` \| ``"include"`` \| ``"relevance"`` \| ``"include_slugs"``

Sort collection by object attribute.

**`Default`**

'date'

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:128](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L128)

___

### page

• `Optional` **page**: `number`

Current page of the collection.

**`Default`**

1

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:36](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L36)

___

### per\_page

• `Optional` **per\_page**: `number`

Maximum number of items to be returned in result set.

**`Default`**

10

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:72](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L72)

___

### postType

• `Optional` **postType**: `string`

The post type to query for.

**`Default`**

'post'

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:116](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L116)

___

### search

• `Optional` **search**: `string`

Limit results to those matching a string.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:77](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L77)

___

### slug

• `Optional` **slug**: `string` \| `string`[]

Limit result set to posts with one or more specific slugs.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:121](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L121)

___

### status

• `Optional` **status**: `string` \| `string`[]

Limit result set to posts assigned one or more statuses.

**`Default`**

'publish'

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:145](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L145)

___

### sticky

• `Optional` **sticky**: `boolean`

Limit result set to items that are sticky.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:182](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L182)

___

### tag

• `Optional` **tag**: `string` \| `number`

If set will filter results by the specified tag name

It supports both a category id and category slug

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:50](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L50)

___

### tags

• `Optional` **tags**: `string` \| `number` \| `string`[] \| `number`[]

Limit result set to all items that have the specified term assigned in the tags taxonomy.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:172](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L172)

___

### tags\_exclude

• `Optional` **tags\_exclude**: `number` \| `number`[]

Limit result set to all items except those that have the specified term assigned in the tags taxonomy.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:177](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L177)

___

### tax\_relation

• `Optional` **tax\_relation**: ``"AND"`` \| ``"OR"``

Limit result set based on relationship between multiple taxonomies.

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:150](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L150)

___

### taxonomy

• `Optional` **taxonomy**: `string`

Limit results to a specific taxonomy and expects the actual term slug to come from the url]

If you only specify the taxonomy, the term slug will be assumed to be the first segment of the path

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:167](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L167)

___

### year

• `Optional` **year**: `string`

If set will filter results by the specified year

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:55](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L55)
