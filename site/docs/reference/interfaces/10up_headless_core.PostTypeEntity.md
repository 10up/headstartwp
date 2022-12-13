---
id: "10up_headless_core.PostTypeEntity"
title: "Interface: PostTypeEntity"
sidebar_label: "PostTypeEntity"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).PostTypeEntity

Base interface for all post type entities.

Interfaces that extends from this one are:
- [PostEntity](10up_headless_core.PostEntity.md).
- [PageEntity](10up_headless_core.PageEntity.md).
- [AttachmentEntity](10up_headless_core.AttachmentEntity.md).
- [RevisionEntity](10up_headless_core.RevisionEntity.md).

## Hierarchy

- [`Entity`](10up_headless_core.Entity.md)

  ↳ **`PostTypeEntity`**

  ↳↳ [`PostEntity`](10up_headless_core.PostEntity.md)

  ↳↳ [`RevisionEntity`](10up_headless_core.RevisionEntity.md)

  ↳↳ [`PageEntity`](10up_headless_core.PageEntity.md)

  ↳↳ [`AttachmentEntity`](10up_headless_core.AttachmentEntity.md)

## Properties

### \_embedded

• **\_embedded**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `author` | [`AuthorEntity`](10up_headless_core.AuthorEntity.md)[] |
| `wp:term` | [`TermEntity`](10up_headless_core.TermEntity.md)[][] |

#### Defined in

[packages/core/src/data/types/entities.ts:96](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L96)

___

### author

• `Optional` **author**: [`AuthorEntity`](10up_headless_core.AuthorEntity.md)[]

#### Defined in

[packages/core/src/data/types/entities.ts:92](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L92)

___

### comment\_status

• `Optional` **comment\_status**: ``"open"`` \| ``"closed"``

Whether or not comments are open on the object.

#### Defined in

[packages/core/src/data/types/entities.ts:104](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L104)

___

### date

• `Optional` **date**: `string`

The date the object was published, in the site's timezone.

#### Defined in

[packages/core/src/data/types/entities.ts:40](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L40)

___

### date\_gmt

• `Optional` **date\_gmt**: `string`

The date the object was published, as GMT.

#### Defined in

[packages/core/src/data/types/entities.ts:45](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L45)

___

### guid

• `Optional` **guid**: `Rendered`

The globally unique identifier for the object.

#### Defined in

[packages/core/src/data/types/entities.ts:50](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L50)

___

### id

• **id**: `number`

Unique identifier for the object.

#### Defined in

[packages/core/src/data/types/entities.ts:65](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L65)

___

### link

• **link**: `string`

URL to the object.

#### Defined in

[packages/core/src/data/types/entities.ts:70](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L70)

___

### modified

• `Optional` **modified**: `string`

The date the object was last modified, in the site's timezone.

#### Defined in

[packages/core/src/data/types/entities.ts:55](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L55)

___

### modified\_gmt

• `Optional` **modified\_gmt**: `string`

The date the object was last modified, as GMT.

#### Defined in

[packages/core/src/data/types/entities.ts:60](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L60)

___

### ping\_status

• `Optional` **ping\_status**: ``"open"`` \| ``"closed"``

Whether or not the object can be pinged.

#### Defined in

[packages/core/src/data/types/entities.ts:109](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L109)

___

### slug

• **slug**: `string`

An alphanumeric identifier for the object unique to its type.

#### Defined in

[packages/core/src/data/types/entities.ts:75](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L75)

___

### status

• `Optional` **status**: ``"publish"`` \| ``"future"`` \| ``"draft"`` \| ``"pending"`` \| ``"private"``

A named status for the object.

#### Defined in

[packages/core/src/data/types/entities.ts:80](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L80)

___

### terms

• `Optional` **terms**: `Record`<`string`, [`TermEntity`](10up_headless_core.TermEntity.md)[]\>

#### Defined in

[packages/core/src/data/types/entities.ts:94](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L94)

___

### title

• `Optional` **title**: `Rendered`

The title for the object.

#### Defined in

[packages/core/src/data/types/entities.ts:90](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L90)

___

### type

• `Optional` **type**: `string`

Type of Post for the object.

#### Defined in

[packages/core/src/data/types/entities.ts:85](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L85)

___

### yoast\_head

• **yoast\_head**: ``null`` \| `string`

#### Defined in

[packages/core/src/data/types/entities.ts:112](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L112)

___

### yoast\_head\_json

• **yoast\_head\_json**: ``null`` \| `Record`<`string`, `any`\>

#### Defined in

[packages/core/src/data/types/entities.ts:111](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/data/types/entities.ts#L111)
