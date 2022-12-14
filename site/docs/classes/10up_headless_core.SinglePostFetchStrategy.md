---
id: "10up_headless_core.SinglePostFetchStrategy"
title: "Class: SinglePostFetchStrategy"
sidebar_label: "@10up/headless-core.SinglePostFetchStrategy"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).SinglePostFetchStrategy

The SinglePostFetchStrategy is used to fetch a single post entity from any post type.
Note that custom post types should be defined in `headless.config.js`

This strategy supports extracting endpoint params from url E.g:
- `/post-name` maps to `{ slug: 'post-name'}`
- `/2021/10/20/post-name` maps to `{ year: 2021, month: 10, day: 20, slug: 'post-name }`
- `/2021/` maps to `{ year: 2021, slug: 'post-name' }`

**`See`**

[getParamsFromURL](10up_headless_core.SinglePostFetchStrategy.md#getparamsfromurl) to learn about url param mapping

## Hierarchy

- [`AbstractFetchStrategy`](10up_headless_core.AbstractFetchStrategy.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[], [`PostParams`](../interfaces/10up_headless_core.PostParams.md), [`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)\>

  ↳ **`SinglePostFetchStrategy`**

## Constructors

### constructor

• **new SinglePostFetchStrategy**(`baseURL?`)

The strategy constructor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseURL?` | `string` | The base URL of the API |

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[constructor](10up_headless_core.AbstractFetchStrategy.md#constructor)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:103](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L103)

## Properties

### baseURL

• **baseURL**: `string` = `''`

The base URL where the API is located

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[baseURL](10up_headless_core.AbstractFetchStrategy.md#baseurl)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:90](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L90)

___

### endpoint

• **endpoint**: `string` = `''`

Holds the current endpoint for the strategy

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[endpoint](10up_headless_core.AbstractFetchStrategy.md#endpoint)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:85](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L85)

___

### path

• **path**: `string` = `''`

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:71](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L71)

___

### postType

• **postType**: `string` = `'post'`

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:67](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L67)

___

### revision

• `Optional` **revision**: [`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:69](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L69)

## Methods

### buildEndpointURL

▸ **buildEndpointURL**(`params`): `string`

Handlers post types, revisions and fetching by id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`PostParams`](../interfaces/10up_headless_core.PostParams.md) | The params to build the endpoint url |

#### Returns

`string`

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[buildEndpointURL](10up_headless_core.AbstractFetchStrategy.md#buildendpointurl)

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:92](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L92)

___

### fetcher

▸ **fetcher**(`url`, `params`, `options?`): `Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)\>\>

Handles fetching by multiple post types, authToken and revisions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The url to fetch |
| `params` | [`PostParams`](../interfaces/10up_headless_core.PostParams.md) | The params to build the endpoint url |
| `options` | `Partial`<[`FetchOptions`](../interfaces/10up_headless_core.FetchOptions.md)\> | FetchOptions |

#### Returns

`Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)\>\>

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[fetcher](10up_headless_core.AbstractFetchStrategy.md#fetcher)

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:189](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L189)

___

### filterData

▸ **filterData**(`data`, `filterOptions?`): `any`

Filters the data returned from the API by excluding fields that are not needed in order to reduce
payload size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)\> | The data to filter |
| `filterOptions?` | [`FilterDataOptions`](../interfaces/10up_headless_core.FilterDataOptions.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)\> | - |

#### Returns

`any`

The filtered data

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[filterData](10up_headless_core.AbstractFetchStrategy.md#filterdata)

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:247](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L247)

___

### get

▸ **get**(`params`): `Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)\>\>

This is a simple wrapper to quickly fetch data from the API given a set of params

## Usage

```tsx
import { PostsArchiveFetchStrategy } from '@10up/headless-core';

new PostsArchiveFetchStrategy('http://my-wp-url.com').get({perPage: 10});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`PostParams`](../interfaces/10up_headless_core.PostParams.md) | The endpoint params |

#### Returns

`Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)\>\>

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[get](10up_headless_core.AbstractFetchStrategy.md#get)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:309](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L309)

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

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:73](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L73)

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

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:130](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L130)

___

### getParamsFromURL

▸ **getParamsFromURL**(`path`, `nonUrlParams?`): `Partial`<[`PostParams`](../interfaces/10up_headless_core.PostParams.md)\>

Returns the supported params from the URL if present.

These params are passed to `buildEndpointURL`. If the strategy does not support
mapping url params to endpoint params, it should return an empty object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The Path name |
| `nonUrlParams` | `Partial`<[`PostParams`](../interfaces/10up_headless_core.PostParams.md)\> | The non-url params |

#### Returns

`Partial`<[`PostParams`](../interfaces/10up_headless_core.PostParams.md)\>

params extracted from the URL

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[getParamsFromURL](10up_headless_core.AbstractFetchStrategy.md#getparamsfromurl)

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:78](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L78)

___

### getQueriedObject

▸ **getQueriedObject**(`response`, `params`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\> |
| `params` | `Partial`<[`PostParams`](../interfaces/10up_headless_core.PostParams.md)\> |

#### Returns

`Object`

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[getQueriedObject](10up_headless_core.AbstractFetchStrategy.md#getqueriedobject)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:259](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L259)

___

### isMainQuery

▸ **isMainQuery**(`path`, `nonUrlParams`): `boolean`

Checks if this is the main query for a page

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The page name |
| `nonUrlParams` | `Partial`<[`PostParams`](../interfaces/10up_headless_core.PostParams.md)\> | The non-url params |

#### Returns

`boolean`

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[isMainQuery](10up_headless_core.AbstractFetchStrategy.md#ismainquery)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:157](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L157)

___

### prepareResponse

▸ **prepareResponse**(`response`, `params`): [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)\>

Prepares the post response

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md) \| [`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\> |
| `params` | `Partial`<[`PostParams`](../interfaces/10up_headless_core.PostParams.md)\> |

#### Returns

[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)\>

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[prepareResponse](10up_headless_core.AbstractFetchStrategy.md#prepareresponse)

#### Defined in

[packages/core/src/data/strategies/SinglePostFetchStrategy.ts:129](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/SinglePostFetchStrategy.ts#L129)

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

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:120](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L120)

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

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:116](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L116)
