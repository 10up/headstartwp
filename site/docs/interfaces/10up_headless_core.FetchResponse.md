---
id: "10up_headless_core.FetchResponse"
title: "Interface: FetchResponse<T>"
sidebar_label: "@10up/headless-core.FetchResponse"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).FetchResponse

The type of the fetch response

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### pageInfo

• **pageInfo**: [`PageInfo`](10up_headless_core.PageInfo.md)

Contains pagination information

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:38](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L38)

___

### queriedObject

• **queriedObject**: [`QueriedObject`](../modules/10up_headless_core.md#queriedobject)

Queried Object information

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:43](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L43)

___

### result

• **result**: `T`

Contains the actual data returned from the API

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:33](https://github.com/10up/headless/blob/d270384/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L33)
