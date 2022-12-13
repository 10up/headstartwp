---
id: "10up_headless_core.TaxonomyEntity"
title: "Interface: TaxonomyEntity"
sidebar_label: "TaxonomyEntity"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).TaxonomyEntity

Interface for entities from the /wp/v2/taxonomy endpoint.

## Hierarchy

- [`Entity`](10up_headless_core.Entity.md)

  ↳ **`TaxonomyEntity`**

## Properties

### description

• `Optional` **description**: `string`

A human-readable description of the taxonomy.

#### Defined in

[packages/core/src/data/types/entities.ts:395](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L395)

___

### hierarchical

• `Optional` **hierarchical**: `boolean`

Whether or not the taxonomy should have children.

#### Defined in

[packages/core/src/data/types/entities.ts:400](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L400)

___

### name

• `Optional` **name**: `string`

The title for the taxonomy.

#### Defined in

[packages/core/src/data/types/entities.ts:405](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L405)

___

### rest\_base

• **rest\_base**: `string`

REST base route for the taxonomy.

#### Defined in

[packages/core/src/data/types/entities.ts:415](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L415)

___

### slug

• `Optional` **slug**: `string`

An alphanumeric identifier for the taxonomy.

#### Defined in

[packages/core/src/data/types/entities.ts:410](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L410)

___

### types

• **types**: `string`[]

Types associated with the taxonomy.

#### Defined in

[packages/core/src/data/types/entities.ts:420](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L420)
