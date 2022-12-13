---
id: "10up_headless_core.TaxonomyTermsStrategy"
title: "Class: TaxonomyTermsStrategy"
sidebar_label: "@10up/headless-core.TaxonomyTermsStrategy"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).TaxonomyTermsStrategy

This fetch strategy does not support extracting url params from the url

## Hierarchy

- [`AbstractFetchStrategy`](10up_headless_core.AbstractFetchStrategy.md)<[`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[], [`TaxonomyArchiveParams`](../interfaces/10up_headless_core.TaxonomyArchiveParams.md)\>

  ↳ **`TaxonomyTermsStrategy`**

## Constructors

### constructor

• **new TaxonomyTermsStrategy**(`baseURL?`)

The strategy constructor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseURL?` | `string` | The base URL of the API |

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[constructor](10up_headless_core.AbstractFetchStrategy.md#constructor)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:103](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L103)

## Properties

### baseURL

• **baseURL**: `string` = `''`

The base URL where the API is located

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[baseURL](10up_headless_core.AbstractFetchStrategy.md#baseurl)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:90](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L90)

___

### defaultTaxonmy

• **defaultTaxonmy**: `string` = `'category'`

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:103](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L103)

___

### endpoint

• **endpoint**: `string` = `''`

Holds the current endpoint for the strategy

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[endpoint](10up_headless_core.AbstractFetchStrategy.md#endpoint)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:85](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L85)

## Methods

### buildEndpointURL

▸ **buildEndpointURL**(`params`): `string`

Builds the final endpoint URL based on the passed parameters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Partial`<[`TaxonomyArchiveParams`](../interfaces/10up_headless_core.TaxonomyArchiveParams.md)\> | The params to add to the request |

#### Returns

`string`

The endpoint URL.

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[buildEndpointURL](10up_headless_core.AbstractFetchStrategy.md#buildendpointurl)

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:118](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L118)

___

### fetcher

▸ **fetcher**(`url`, `params`, `options?`): `Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\>\>

The default fetcher function

The default fetcher function handles authentication headers and errors from the API.

A custom strategy can override this function to run additional logic before or after the fetch call

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to fetch |
| `params` | `Partial`<[`TaxonomyArchiveParams`](../interfaces/10up_headless_core.TaxonomyArchiveParams.md)\> | The request params |
| `options?` | `Partial`<[`FetchOptions`](../interfaces/10up_headless_core.FetchOptions.md)\> | - |

#### Returns

`Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\>\>

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[fetcher](10up_headless_core.AbstractFetchStrategy.md#fetcher)

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:134](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L134)

___

### filterData

▸ **filterData**(`data`, `filterOptions?`): `Object`

Filters the data returned from the API by excluding fields that are not needed in order to reduce
payload size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\> | The data to filter |
| `filterOptions?` | [`FilterDataOptions`](../interfaces/10up_headless_core.FilterDataOptions.md)<[`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\> | - |

#### Returns

`Object`

The filtered data

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageInfo` | [`PageInfo`](../interfaces/10up_headless_core.PageInfo.md) | Contains pagination information |
| `queriedObject` | [`QueriedObject`](../modules/10up_headless_core.md#queriedobject) | Queried Object information |
| `result` | [`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[] \| [`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[][] | - |

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[filterData](10up_headless_core.AbstractFetchStrategy.md#filterdata)

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:142](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L142)

___

### get

▸ **get**(`params`): `Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\>\>

This is a simple wrapper to quickly fetch data from the API given a set of params

## Usage

```tsx
import { PostsArchiveFetchStrategy } from '@10up/headless-core';

new PostsArchiveFetchStrategy('http://my-wp-url.com').get({perPage: 10});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`TaxonomyArchiveParams`](../interfaces/10up_headless_core.TaxonomyArchiveParams.md) | The endpoint params |

#### Returns

`Promise`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\>\>

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[get](10up_headless_core.AbstractFetchStrategy.md#get)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:309](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L309)

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

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:105](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L105)

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

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:130](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L130)

___

### getParamsFromURL

▸ **getParamsFromURL**(`path`, `params?`): `Partial`<[`TaxonomyArchiveParams`](../interfaces/10up_headless_core.TaxonomyArchiveParams.md)\>

Returns the supported params from the URL if present.

These params are passed to `buildEndpointURL`. If the strategy does not support
mapping url params to endpoint params, it should return an empty object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The Path name |
| `params` | `Partial`<[`TaxonomyArchiveParams`](../interfaces/10up_headless_core.TaxonomyArchiveParams.md)\> | The non-url params |

#### Returns

`Partial`<[`TaxonomyArchiveParams`](../interfaces/10up_headless_core.TaxonomyArchiveParams.md)\>

params extracted from the URL

#### Overrides

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[getParamsFromURL](10up_headless_core.AbstractFetchStrategy.md#getparamsfromurl)

#### Defined in

[packages/core/src/data/strategies/TaxonomyTermsStrategy.ts:109](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/TaxonomyTermsStrategy.ts#L109)

___

### getQueriedObject

▸ **getQueriedObject**(`response`, `params`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\> |
| `params` | `Partial`<[`TaxonomyArchiveParams`](../interfaces/10up_headless_core.TaxonomyArchiveParams.md)\> |

#### Returns

`Object`

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[getQueriedObject](10up_headless_core.AbstractFetchStrategy.md#getqueriedobject)

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
| `nonUrlParams` | `Partial`<[`TaxonomyArchiveParams`](../interfaces/10up_headless_core.TaxonomyArchiveParams.md)\> | The non-url params |

#### Returns

`boolean`

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[isMainQuery](10up_headless_core.AbstractFetchStrategy.md#ismainquery)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:157](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L157)

___

### prepareResponse

▸ **prepareResponse**(`response`, `params`): [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\> |
| `params` | `Partial`<[`TaxonomyArchiveParams`](../interfaces/10up_headless_core.TaxonomyArchiveParams.md)\> |

#### Returns

[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\>

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[prepareResponse](10up_headless_core.AbstractFetchStrategy.md#prepareresponse)

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

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[setBaseURL](10up_headless_core.AbstractFetchStrategy.md#setbaseurl)

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

#### Inherited from

[AbstractFetchStrategy](10up_headless_core.AbstractFetchStrategy.md).[setEndpoint](10up_headless_core.AbstractFetchStrategy.md#setendpoint)

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:116](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L116)
