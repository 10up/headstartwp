---
id: "10up_headless_core.AbstractFetchStrategy"
title: "Class: AbstractFetchStrategy<E, Params, R>"
sidebar_label: "@10up/headless-core.AbstractFetchStrategy"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).AbstractFetchStrategy

Abstract class that lays out a strategy for fetching data

All Fetch Stategies should implement this class and it allows to share logic for fetching data both
on the front-end and on the back-end.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `E` | `E` | The type of entity that is fetched (e.g PostEntity, TermEntity etc) |
| `Params` | extends [`EndpointParams`](../interfaces/10up_headless_core.EndpointParams.md) | The type of the params that are passed to the endpoint |
| `R` | `E` | - |

## Hierarchy

- **`AbstractFetchStrategy`**

  ↳ [`SinglePostFetchStrategy`](10up_headless_core.SinglePostFetchStrategy.md)

  ↳ [`PostsArchiveFetchStrategy`](10up_headless_core.PostsArchiveFetchStrategy.md)

  ↳ [`AppSettingsStrategy`](10up_headless_core.AppSettingsStrategy.md)

  ↳ [`TaxonomyTermsStrategy`](10up_headless_core.TaxonomyTermsStrategy.md)

  ↳ [`VerifyTokenFetchStrategy`](10up_headless_core.VerifyTokenFetchStrategy.md)

## Constructors

### constructor

• **new AbstractFetchStrategy**<`E`, `Params`, `R`\>(`baseURL?`)

The strategy constructor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | `E` |
| `Params` | extends [`EndpointParams`](../interfaces/10up_headless_core.EndpointParams.md) |
| `R` | `E` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseURL?` | `string` | The base URL of the API |

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:103](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L103)

## Properties

### baseURL

• **baseURL**: `string` = `''`

The base URL where the API is located

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:90](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L90)

___

### endpoint

• **endpoint**: `string` = `''`

Holds the current endpoint for the strategy

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:85](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L85)

## Methods

### buildEndpointURL

▸ **buildEndpointURL**(`params`): `string`

Builds the final endpoint URL based on the passed parameters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Partial`<`Params`\> | The params to add to the request |

#### Returns

`string`

The endpoint URL.

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:172](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L172)

___

### fetcher

▸ **fetcher**(`url`, `params`, `options?`): `Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<`R`\>\>

The default fetcher function

The default fetcher function handles authentication headers and errors from the API.

A custom strategy can override this function to run additional logic before or after the fetch call

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to fetch |
| `params` | `Partial`<`Params`\> | The request params |
| `options` | `Partial`<[`FetchOptions`](../interfaces/10up_headless_core.FetchOptions.md)\> | - |

#### Returns

`Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<`R`\>\>

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:205](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L205)

___

### filterData

▸ **filterData**(`data`, `filterOptions?`): `Object`

Filters the data returned from the API by excluding fields that are not needed in order to reduce
payload size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<`R`\> | The data to filter |
| `filterOptions?` | [`FilterDataOptions`](../interfaces/10up_headless_core.FilterDataOptions.md)<`R`\> | - |

#### Returns

`Object`

The filtered data

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageInfo` | [`PageInfo`](../interfaces/10up_headless_core.PageInfo.md) | Contains pagination information |
| `queriedObject` | [`QueriedObject`](../modules/10up_headless_core.md#queriedobject) | Queried Object information |
| `result` | `R` \| `R`[] | - |

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:271](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L271)

___

### get

▸ **get**(`params`): `Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<`R`\>\>

This is a simple wrapper to quickly fetch data from the API given a set of params

## Usage

```tsx
import { PostsArchiveFetchStrategy } from '@10up/headless-core';

new PostsArchiveFetchStrategy('http://my-wp-url.com').get({perPage: 10});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Params` | The endpoint params |

#### Returns

`Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<`R`\>\>

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:309](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L309)

___

### getDefaultEndpoint

▸ `Abstract` **getDefaultEndpoint**(): `string`

A method that must be implemented by concrete implementations which returns the default endpoint
for the strategy

#### Returns

`string`

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:96](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L96)

___

### getEndpoint

▸ **getEndpoint**(): `string`

Returns the endpoint of the strategy. If no endpoint has been set at runtime,
returns the default endpoint

#### Returns

`string`

The current endpoint for the strategy

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:130](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L130)

___

### getParamsFromURL

▸ `Abstract` **getParamsFromURL**(`path`, `nonUrlParams`): `Partial`<`Params`\>

Returns the supported params from the URL if present.

These params are passed to `buildEndpointURL`. If the strategy does not support
mapping url params to endpoint params, it should return an empty object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The Path name |
| `nonUrlParams` | `Partial`<`Params`\> | The non-url params |

#### Returns

`Partial`<`Params`\>

params extracted from the URL

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:149](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L149)

___

### getQueriedObject

▸ **getQueriedObject**(`response`, `params`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<`E`\> |
| `params` | `Partial`<`Params`\> |

#### Returns

`Object`

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:259](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L259)

___

### isMainQuery

▸ **isMainQuery**(`path`, `nonUrlParams`): `boolean`

Checks if this is the main query for a page

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The page name |
| `nonUrlParams` | `Partial`<`Params`\> | The non-url params |

#### Returns

`boolean`

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:157](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L157)

___

### prepareResponse

▸ **prepareResponse**(`response`, `params`): [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<`R`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<`E`\> |
| `params` | `Partial`<`Params`\> |

#### Returns

[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<`R`\>

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:185](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L185)

___

### setBaseURL

▸ **setBaseURL**(`url?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `undefined` \| `string` | `''` |

#### Returns

`void`

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:120](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L120)

___

### setEndpoint

▸ **setEndpoint**(`endpoint`): `void`

The strategy can switch endpoints at runtime if neeeded.

E.g: The actual endpoint for a post depends on its post_type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `endpoint` | `string` | The endpoint to fetch |

#### Returns

`void`

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:116](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L116)
