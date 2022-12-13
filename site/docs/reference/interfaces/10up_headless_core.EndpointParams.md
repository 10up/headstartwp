---
id: "10up_headless_core.EndpointParams"
title: "Interface: EndpointParams"
sidebar_label: "EndpointParams"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).EndpointParams

The base interface for definiting endpoint parameters

Strategies should define type with the actuall supported EndPointParams

## Hierarchy

- **`EndpointParams`**

  ↳ [`PostParams`](10up_headless_core.PostParams.md)

  ↳ [`PostsArchiveParams`](10up_headless_core.PostsArchiveParams.md)

  ↳ [`TaxonomyArchiveParams`](10up_headless_core.TaxonomyArchiveParams.md)

  ↳ [`VerifyTokenParams`](10up_headless_core.VerifyTokenParams.md)

## Indexable

▪ [k: `string`]: `unknown`

## Properties

### \_embed

• `Optional` **\_embed**: `boolean`

The _embed param returneds associated entities in the response

It's recommended to avoid additional requests to fetch data

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:17](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L17)

___

### \_fields

• `Optional` **\_fields**: `string`[]

The _fields parameter is used to return only the specified fields in the response

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:22](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L22)
