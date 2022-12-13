---
id: "10up_headless_core.VerifyTokenParams"
title: "Interface: VerifyTokenParams"
sidebar_label: "VerifyTokenParams"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).VerifyTokenParams

The EndpointParams supported by the [VerifyTokenFetchStrategy](../classes/10up_headless_core.VerifyTokenFetchStrategy.md)

## Hierarchy

- [`EndpointParams`](10up_headless_core.EndpointParams.md)

  ↳ **`VerifyTokenParams`**

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

#### Defined in

[packages/core/src/data/strategies/VerifyTokenFetchStrategy.ts:9](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/strategies/VerifyTokenFetchStrategy.ts#L9)
