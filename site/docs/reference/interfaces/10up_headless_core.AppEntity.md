---
id: "10up_headless_core.AppEntity"
title: "Interface: AppEntity"
sidebar_label: "AppEntity"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).AppEntity

Empty interface from which all entities inherit.

## Hierarchy

- [`Entity`](10up_headless_core.Entity.md)

  ↳ **`AppEntity`**

## Properties

### menus

• **menus**: `Object`

#### Index signature

▪ [k: `string`]: [`MenuItemEntity`](10up_headless_core.MenuItemEntity.md)[]

#### Defined in

[packages/core/src/data/types/entities.ts:679](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L679)

___

### redirects

• **redirects**: [`Redirect`](../modules/10up_headless_core.md#redirect)[]

#### Defined in

[packages/core/src/data/types/entities.ts:689](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L689)

___

### settings

• **settings**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `posts_per_page` | `string` |
| `site_desc` | `string` |
| `site_name` | `string` |
| `site_rss_url` | `string` |
| `site_wp_url` | `string` |

#### Defined in

[packages/core/src/data/types/entities.ts:682](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L682)
