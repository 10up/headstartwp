---
id: "10up_headless_next.config"
title: "Namespace: config"
sidebar_label: "@10up/headless-next.config"
custom_edit_url: null
---

[@10up/headless-next](../modules/10up_headless_next.md).config

## @10up/headless-next/config

The config export of the `@10up/headless-next` package.

### Usage

```tsx
import { withHeadlessConfig } from '@10up/headless-next/config';
```

## Functions

### withHeadlessConfig

▸ **withHeadlessConfig**(`nextConfig?`, `headlessConfig?`): `NextConfig`

HOC used to wrap the nextjs config object with the headless config object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nextConfig` | `NextConfig` | The nextjs config object |
| `headlessConfig` | `HeadlessConfig` |  |

#### Returns

`NextConfig`

#### Defined in

[packages/next/src/config/withHeadlessConfig.ts:54](https://github.com/10up/headless/blob/5293da0/packages/next/src/config/withHeadlessConfig.ts#L54)
