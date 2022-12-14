---
id: "10up_headless_core.FilterDataOptions"
title: "Interface: FilterDataOptions<T>"
sidebar_label: "@10up/headless-core.FilterDataOptions"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).FilterDataOptions

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### fields

• **fields**: keyof `T`[]

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:67](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L67)

___

### method

• **method**: ``"ALLOW"`` \| ``"REMOVE"``

If method is 'ALLOW' then only the fields specified in the filter will be returned.
If method is 'REMOVE' then the fields specified in the filter will be removed.

#### Defined in

[packages/core/src/data/strategies/AbstractFetchStrategy.ts:66](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/strategies/AbstractFetchStrategy.ts#L66)
