---
id: "10up_headless_core.PostsArchiveFetchStrategy"
title: "Class: PostsArchiveFetchStrategy"
sidebar_label: "@10up/headless-core.PostsArchiveFetchStrategy"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).PostsArchiveFetchStrategy

The PostsArchiveFetchStrategy is used to fetch a collection of posts from any post type.
Note that custom post types and custom taxonomies should be defined in `headless.config.js`

This strategy supports extracting endpoint params from url E.g:
- `/category/cat-name/page/2` maps to `{ category: 'cat-name', page: 2 }`
- `/page/2/` maps to `{ page: 2 }`
- `/genre/genre-name/page/2` maps to `{ genre: 'genre-name', page: 2 }` if a `genre` taxonomy is defined in `headless.config.js`

**`See`**

[getParamsFromURL](10up_headless_core.PostsArchiveFetchStrategy.md#getparamsfromurl) to learn about url param mapping

## Hierarchy

- [`AbstractFetchStrategy`](10up_headless_core.AbstractFetchStrategy.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[], [`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md)\>

  ↳ **`PostsArchiveFetchStrategy`**

  ↳↳ [`SearchFetchStrategy`](10up_headless_core.SearchFetchStrategy.md)

  ↳↳ [`AuthorArchiveFetchStrategy`](10up_headless_core.AuthorArchiveFetchStrategy.md)

## Constructors

### constructor

• **new PostsArchiveFetchStrategy**(`baseURL?`)

The strategy constructor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseURL?` | `string` | The base URL of the API |

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[constructor](10up_headless_core.AbstractFetchStrategy.md#constructor)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:103](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L103)

## Properties

### baseURL

• **baseURL**: `string` = `''`

The base URL where the API is located

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[baseURL](10up_headless_core.AbstractFetchStrategy.md#baseurl)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:90](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L90)

___

### endpoint

• **endpoint**: `string` = `''`

Holds the current endpoint for the strategy

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[endpoint](10up_headless_core.AbstractFetchStrategy.md#endpoint)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:85](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L85)

## Methods

### buildEndpointURL

▸ **buildEndpointURL**(`params`): `string`

Handles taxonomy filters and switch endpoint based on post type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Partial`<[`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md)\> | The params to build the endpoint with |

#### Returns

`string`

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[buildEndpointURL](10up_headless_core.AbstractFetchStrategy.md#buildendpointurl)

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:267](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L267)

___

### fetcher

▸ **fetcher**(`url`, `params`, `options?`): `Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\>\>

Before fetching posts, we need handle taxonomy and authors.

If the headless plugin is not being used, then additioinal requests needs to be made to get
authors and terms ids

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to parse |
| `params` | `Partial`<[`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md)\> | The params to build the endpoint with |
| `options` | `Partial`<[`FetchOptions`](../interfaces/10up_headless_core.FetchOptions.md)\> | FetchOptions |

#### Returns

`Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\>\>

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[fetcher](10up_headless_core.AbstractFetchStrategy.md#fetcher)

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:315](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L315)

___

### filterData

▸ **filterData**(`data`, `options?`): [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\>

Filters the data returned from the API by excluding fields that are not needed in order to reduce
payload size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\> | The data to filter |
| `options?` | [`FilterDataOptions`](../interfaces/10up_headless_core.FilterDataOptions.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\> | - |

#### Returns

[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\>

The filtered data

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[filterData](10up_headless_core.AbstractFetchStrategy.md#filterdata)

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:449](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L449)

___

### get

▸ **get**(`params`): `Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\>\>

This is a simple wrapper to quickly fetch data from the API given a set of params

## Usage

```tsx
import { PostsArchiveFetchStrategy } from '@10up/headless-core';

new PostsArchiveFetchStrategy('http://my-wp-url.com').get({perPage: 10});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md) | The endpoint params |

#### Returns

`Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\>\>

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[get](10up_headless_core.AbstractFetchStrategy.md#get)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:309](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L309)

___

### getDefaultEndpoint

▸ **getDefaultEndpoint**(): `string`

A method that must be implemented by concrete implementations which returns the default endpoint
for the strategy

#### Returns

`string`

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[getDefaultEndpoint](10up_headless_core.AbstractFetchStrategy.md#getdefaultendpoint)

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:202](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L202)

___

### getEndpoint

▸ **getEndpoint**(): `string`

Returns the endpoint of the strategy. If no endpoint has been set at runtime,
returns the default endpoint

#### Returns

`string`

The current endpoint for the strategy

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[getEndpoint](10up_headless_core.AbstractFetchStrategy.md#getendpoint)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:130](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L130)

___

### getParamsFromURL

▸ **getParamsFromURL**(`path`, `params?`): `Partial`<[`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md)\>

This strategy automatically extracts taxonomy filters, date filters and paginations params from the URL

It also takes into account the custom taxonomies specified in `headless.config.js`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The URL path to extract params from |
| `params` | `Partial`<[`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md)\> | - |

#### Returns

`Partial`<[`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md)\>

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[getParamsFromURL](10up_headless_core.AbstractFetchStrategy.md#getparamsfromurl)

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:213](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L213)

___

### getQueriedObject

▸ **getQueriedObject**(`response`, `params`): [`QueriedObject`](../modules/10up_headless_core.md#queriedobject)

Returns the queried object if applicable (e.g if querying by category, tag, author or custom taxonomy term)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `response` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\> | The response from the API |
| `params` | `Partial`<[`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md)\> | The request params |

#### Returns

[`QueriedObject`](../modules/10up_headless_core.md#queriedobject)

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[getQueriedObject](10up_headless_core.AbstractFetchStrategy.md#getqueriedobject)

#### Defined in

[packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts:380](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/PostsArchiveFetchStrategy.ts#L380)

___

### isMainQuery

▸ **isMainQuery**(`path`, `nonUrlParams`): `boolean`

Checks if this is the main query for a page

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The page name |
| `nonUrlParams` | `Partial`<[`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md)\> | The non-url params |

#### Returns

`boolean`

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[isMainQuery](10up_headless_core.AbstractFetchStrategy.md#ismainquery)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:157](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L157)

___

### prepareResponse

▸ **prepareResponse**(`response`, `params`): [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\> |
| `params` | `Partial`<[`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md)\> |

#### Returns

[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\>

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[prepareResponse](10up_headless_core.AbstractFetchStrategy.md#prepareresponse)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:185](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L185)

___

### setBaseURL

▸ **setBaseURL**(`url?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `undefined` \| `string` | `''` |

#### Returns

`void`

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[setBaseURL](10up_headless_core.AbstractFetchStrategy.md#setbaseurl)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:120](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L120)

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

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[setEndpoint](10up_headless_core.AbstractFetchStrategy.md#setendpoint)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:116](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L116)
