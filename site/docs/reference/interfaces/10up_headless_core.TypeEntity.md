---
id: "10up_headless_core.TypeEntity"
title: "Interface: TypeEntity"
sidebar_label: "TypeEntity"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).TypeEntity

Interface for entities from the /wp/v2/types endpoint.

## Hierarchy

- [`Entity`](10up_headless_core.Entity.md)

  ↳ **`TypeEntity`**

## Properties

### description

• `Optional` **description**: `string`

A human-readable description of the post type.

#### Defined in

[packages/core/src/data/types/entities.ts:360](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L360)

___

### hierarchical

• `Optional` **hierarchical**: `boolean`

Whether or not the post type should have children.

#### Defined in

[packages/core/src/data/types/entities.ts:365](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L365)

___

### name

• `Optional` **name**: `string`

The title for the post type.

#### Defined in

[packages/core/src/data/types/entities.ts:370](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L370)

___

### rest\_base

• **rest\_base**: `string`

REST base route for the post type.

#### Defined in

[packages/core/src/data/types/entities.ts:380](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L380)

___

### slug

• `Optional` **slug**: `string`

An alphanumeric identifier for the post type.

#### Defined in

[packages/core/src/data/types/entities.ts:375](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L375)

___

### taxonomies

• **taxonomies**: `string`[]

Taxonomies associated with post type.

#### Defined in

[packages/core/src/data/types/entities.ts:385](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L385)
