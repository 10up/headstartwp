---
id: "10up_headless_core.AuthorEntity"
title: "Interface: AuthorEntity"
sidebar_label: "@10up/headless-core.AuthorEntity"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).AuthorEntity

Interface for entities from the /wp/v2/users endpoint.

## Hierarchy

- [`Entity`](10up_headless_core.Entity.md)

  ↳ **`AuthorEntity`**

## Properties

### avatar\_urls

• `Optional` **avatar\_urls**: [`AvatarUrls`](10up_headless_core.AvatarUrls.md)

Avatar URLs for the user.

#### Defined in

[packages/core/src/data/types/entities.ts:538](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L538)

___

### description

• `Optional` **description**: `string`

Description of the user.

#### Defined in

[packages/core/src/data/types/entities.ts:523](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L523)

___

### id

• **id**: `number`

Unique identifier for the user.

#### Defined in

[packages/core/src/data/types/entities.ts:508](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L508)

___

### link

• **link**: `string`

Author URL of the user.

#### Defined in

[packages/core/src/data/types/entities.ts:528](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L528)

___

### meta

• `Optional` **meta**: `Record`<`string`, `unknown`\>

Meta fields.

#### Defined in

[packages/core/src/data/types/entities.ts:543](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L543)

___

### name

• `Optional` **name**: `string`

Display name for the user.

#### Defined in

[packages/core/src/data/types/entities.ts:513](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L513)

___

### slug

• `Optional` **slug**: `string`

An alphanumeric identifier for the user.

#### Defined in

[packages/core/src/data/types/entities.ts:533](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L533)

___

### url

• `Optional` **url**: `string`

URL of the user.

#### Defined in

[packages/core/src/data/types/entities.ts:518](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L518)

___

### yoast\_head

• **yoast\_head**: ``null`` \| `string`

#### Defined in

[packages/core/src/data/types/entities.ts:546](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L546)

___

### yoast\_head\_json

• **yoast\_head\_json**: ``null`` \| `Record`<`string`, `any`\>

#### Defined in

[packages/core/src/data/types/entities.ts:545](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L545)
