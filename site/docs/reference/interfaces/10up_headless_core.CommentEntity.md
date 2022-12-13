---
id: "10up_headless_core.CommentEntity"
title: "Interface: CommentEntity"
sidebar_label: "CommentEntity"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).CommentEntity

Interface for entities from the /wp/v2/comments endpoint.

## Hierarchy

- [`Entity`](10up_headless_core.Entity.md)

  ↳ **`CommentEntity`**

## Properties

### author

• `Optional` **author**: `number`

The ID of the user object, if author was a user.

#### Defined in

[packages/core/src/data/types/entities.ts:561](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L561)

___

### author\_avatar\_urls

• `Optional` **author\_avatar\_urls**: [`AvatarUrls`](10up_headless_core.AvatarUrls.md)

Avatar URLs for the object author.

#### Defined in

[packages/core/src/data/types/entities.ts:621](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L621)

___

### author\_email

• `Optional` **author\_email**: `string`

Email address for the object author.

#### Defined in

[packages/core/src/data/types/entities.ts:566](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L566)

___

### author\_name

• `Optional` **author\_name**: `string`

Display name for the object author.

#### Defined in

[packages/core/src/data/types/entities.ts:571](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L571)

___

### author\_url

• `Optional` **author\_url**: `string`

URL for the object author.

#### Defined in

[packages/core/src/data/types/entities.ts:576](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L576)

___

### content

• `Optional` **content**: `Rendered`

The content for the object.

#### Defined in

[packages/core/src/data/types/entities.ts:581](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L581)

___

### date

• `Optional` **date**: `string`

The date the object was published, in the site's timezone.

#### Defined in

[packages/core/src/data/types/entities.ts:586](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L586)

___

### date\_gmt

• `Optional` **date\_gmt**: `string`

The date the object was published, as GMT.

#### Defined in

[packages/core/src/data/types/entities.ts:591](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L591)

___

### id

• `Optional` **id**: `number`

Unique identifier for the object.

#### Defined in

[packages/core/src/data/types/entities.ts:556](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L556)

___

### link

• `Optional` **link**: `string`

URL to the object.

#### Defined in

[packages/core/src/data/types/entities.ts:596](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L596)

___

### meta

• `Optional` **meta**: `Record`<`string`, `unknown`\>

Meta fields.

#### Defined in

[packages/core/src/data/types/entities.ts:626](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L626)

___

### parent

• `Optional` **parent**: `number`

The ID for the parent of the object.

#### Defined in

[packages/core/src/data/types/entities.ts:601](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L601)

___

### post

• `Optional` **post**: `number`

The ID of the associated post object.

#### Defined in

[packages/core/src/data/types/entities.ts:606](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L606)

___

### status

• `Optional` **status**: `string`

State of the object.

#### Defined in

[packages/core/src/data/types/entities.ts:611](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L611)

___

### type

• **type**: ``"comment"``

Type of Comment for the object.

#### Defined in

[packages/core/src/data/types/entities.ts:616](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L616)
