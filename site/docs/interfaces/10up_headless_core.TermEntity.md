---
id: "10up_headless_core.TermEntity"
title: "Interface: TermEntity"
sidebar_label: "@10up/headless-core.TermEntity"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).TermEntity

Interface for entities that belong to a taxonomy.

For example:
- entities from the /wp/v2/categories endpoint.
- entities from the /wp/v2/tags endpoint.

## Hierarchy

- [`Entity`](10up_headless_core.Entity.md)

  ↳ **`TermEntity`**

## Properties

### count

• `Optional` **count**: `number`

Number of published posts for the term.

#### Defined in

[packages/core/src/data/types/entities.ts:439](https://github.com/10up/headless/blob/d270384/packages/core/src/data/types/entities.ts#L439)

___

### description

• `Optional` **description**: `string`

HTML description of the term.

#### Defined in

[packages/core/src/data/types/entities.ts:444](https://github.com/10up/headless/blob/d270384/packages/core/src/data/types/entities.ts#L444)

___

### id

• **id**: `number`

Unique identifier for the term.

#### Defined in

[packages/core/src/data/types/entities.ts:434](https://github.com/10up/headless/blob/d270384/packages/core/src/data/types/entities.ts#L434)

___

### link

• **link**: `string`

URL of the term.

#### Defined in

[packages/core/src/data/types/entities.ts:449](https://github.com/10up/headless/blob/d270384/packages/core/src/data/types/entities.ts#L449)

___

### meta

• `Optional` **meta**: `Record`<`string`, `unknown`\>

Meta fields.

#### Defined in

[packages/core/src/data/types/entities.ts:474](https://github.com/10up/headless/blob/d270384/packages/core/src/data/types/entities.ts#L474)

___

### name

• `Optional` **name**: `string`

HTML title for the term.

#### Defined in

[packages/core/src/data/types/entities.ts:454](https://github.com/10up/headless/blob/d270384/packages/core/src/data/types/entities.ts#L454)

___

### parent

• `Optional` **parent**: `number`

The parent term ID.

#### Defined in

[packages/core/src/data/types/entities.ts:469](https://github.com/10up/headless/blob/d270384/packages/core/src/data/types/entities.ts#L469)

___

### slug

• `Optional` **slug**: `string`

An alphanumeric identifier for the term unique to its type.

#### Defined in

[packages/core/src/data/types/entities.ts:459](https://github.com/10up/headless/blob/d270384/packages/core/src/data/types/entities.ts#L459)

___

### taxonomy

• **taxonomy**: `string`

Type attribution for the term.

#### Defined in

[packages/core/src/data/types/entities.ts:464](https://github.com/10up/headless/blob/d270384/packages/core/src/data/types/entities.ts#L464)

___

### yoast\_head

• **yoast\_head**: ``null`` \| `string`

#### Defined in

[packages/core/src/data/types/entities.ts:477](https://github.com/10up/headless/blob/d270384/packages/core/src/data/types/entities.ts#L477)

___

### yoast\_head\_json

• **yoast\_head\_json**: ``null`` \| `Record`<`string`, `any`\>

#### Defined in

[packages/core/src/data/types/entities.ts:476](https://github.com/10up/headless/blob/d270384/packages/core/src/data/types/entities.ts#L476)
