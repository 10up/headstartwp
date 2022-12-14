---
id: "10up_headless_next.FetchHookDataOptions"
title: "Interface: FetchHookDataOptions"
sidebar_label: "@10up/headless-next.FetchHookDataOptions"
custom_edit_url: null
---

[@10up/headless-next](../modules/10up_headless_next.md).FetchHookDataOptions

The supported options for [fetchHookData](../modules/10up_headless_next.md#fetchhookdata)

## Properties

### fetchStrategyOptions

• `Optional` **fetchStrategyOptions**: `FetchOptions`

Optional. If set, will fowardh fetch options to the fetch strategy

#### Defined in

[packages/next/src/data/utils.ts:32](https://github.com/10up/headless/blob/2a6e2a0/packages/next/src/data/utils.ts#L32)

___

### filterData

• `Optional` **filterData**: `FilterDataOptions`<`any`\>

Optional. If set, the data will be filtered given FilterDataOptions

#### Defined in

[packages/next/src/data/utils.ts:27](https://github.com/10up/headless/blob/2a6e2a0/packages/next/src/data/utils.ts#L27)

___

### params

• `Optional` **params**: `any`

This should match params passed to the hook on the client side.

#### Defined in

[packages/next/src/data/utils.ts:22](https://github.com/10up/headless/blob/2a6e2a0/packages/next/src/data/utils.ts#L22)
