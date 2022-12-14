---
id: "10up_headless_core.RevisionEntity"
title: "Interface: RevisionEntity"
sidebar_label: "@10up/headless-core.RevisionEntity"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).RevisionEntity

Interface for entities from the /wp/v2/posts/1/revisions endpoint.

## Hierarchy

- [`PostTypeEntity`](10up_headless_core.PostTypeEntity.md)

  ↳ **`RevisionEntity`**

## Properties

### \_embedded

• **\_embedded**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `author` | [`AuthorEntity`](10up_headless_core.AuthorEntity.md)[] |
| `wp:term` | [`TermEntity`](10up_headless_core.TermEntity.md)[][] |

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[_embedded](10up_headless_core.PostTypeEntity.md#_embedded)

#### Defined in

[packages/core/src/data/types/entities.ts:96](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L96)

___

### author

• `Optional` **author**: [`AuthorEntity`](10up_headless_core.AuthorEntity.md)[]

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[author](10up_headless_core.PostTypeEntity.md#author)

#### Defined in

[packages/core/src/data/types/entities.ts:92](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L92)

___

### comment\_status

• `Optional` **comment\_status**: ``"open"`` \| ``"closed"``

Whether or not comments are open on the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[comment_status](10up_headless_core.PostTypeEntity.md#comment_status)

#### Defined in

[packages/core/src/data/types/entities.ts:104](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L104)

___

### content

• `Optional` **content**: `Rendered`

The content for the object.

#### Defined in

[packages/core/src/data/types/entities.ts:187](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L187)

___

### date

• `Optional` **date**: `string`

The date the object was published, in the site's timezone.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[date](10up_headless_core.PostTypeEntity.md#date)

#### Defined in

[packages/core/src/data/types/entities.ts:40](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L40)

___

### date\_gmt

• `Optional` **date\_gmt**: `string`

The date the object was published, as GMT.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[date_gmt](10up_headless_core.PostTypeEntity.md#date_gmt)

#### Defined in

[packages/core/src/data/types/entities.ts:45](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L45)

___

### excerpt

• `Optional` **excerpt**: `Rendered`

The excerpt for the object.

#### Defined in

[packages/core/src/data/types/entities.ts:192](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L192)

___

### guid

• `Optional` **guid**: `Rendered`

The globally unique identifier for the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[guid](10up_headless_core.PostTypeEntity.md#guid)

#### Defined in

[packages/core/src/data/types/entities.ts:50](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L50)

___

### id

• **id**: `number`

Unique identifier for the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[id](10up_headless_core.PostTypeEntity.md#id)

#### Defined in

[packages/core/src/data/types/entities.ts:65](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L65)

___

### link

• **link**: `string`

URL to the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[link](10up_headless_core.PostTypeEntity.md#link)

#### Defined in

[packages/core/src/data/types/entities.ts:70](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L70)

___

### modified

• `Optional` **modified**: `string`

The date the object was last modified, in the site's timezone.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[modified](10up_headless_core.PostTypeEntity.md#modified)

#### Defined in

[packages/core/src/data/types/entities.ts:55](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L55)

___

### modified\_gmt

• `Optional` **modified\_gmt**: `string`

The date the object was last modified, as GMT.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[modified_gmt](10up_headless_core.PostTypeEntity.md#modified_gmt)

#### Defined in

[packages/core/src/data/types/entities.ts:60](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L60)

___

### parent

• `Optional` **parent**: `number`

The ID for the parent of the object.

#### Defined in

[packages/core/src/data/types/entities.ts:182](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L182)

___

### ping\_status

• `Optional` **ping\_status**: ``"open"`` \| ``"closed"``

Whether or not the object can be pinged.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[ping_status](10up_headless_core.PostTypeEntity.md#ping_status)

#### Defined in

[packages/core/src/data/types/entities.ts:109](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L109)

___

### slug

• **slug**: `string`

An alphanumeric identifier for the object unique to its type.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[slug](10up_headless_core.PostTypeEntity.md#slug)

#### Defined in

[packages/core/src/data/types/entities.ts:75](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L75)

___

### status

• `Optional` **status**: ``"publish"`` \| ``"future"`` \| ``"draft"`` \| ``"pending"`` \| ``"private"``

A named status for the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[status](10up_headless_core.PostTypeEntity.md#status)

#### Defined in

[packages/core/src/data/types/entities.ts:80](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L80)

___

### terms

• `Optional` **terms**: `Record`<`string`, [`TermEntity`](10up_headless_core.TermEntity.md)[]\>

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[terms](10up_headless_core.PostTypeEntity.md#terms)

#### Defined in

[packages/core/src/data/types/entities.ts:94](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L94)

___

### title

• `Optional` **title**: `Rendered`

The title for the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[title](10up_headless_core.PostTypeEntity.md#title)

#### Defined in

[packages/core/src/data/types/entities.ts:90](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L90)

___

### type

• `Optional` **type**: `string`

Type of Post for the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[type](10up_headless_core.PostTypeEntity.md#type)

#### Defined in

[packages/core/src/data/types/entities.ts:85](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L85)

___

### yoast\_head

• **yoast\_head**: ``null`` \| `string`

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[yoast_head](10up_headless_core.PostTypeEntity.md#yoast_head)

#### Defined in

[packages/core/src/data/types/entities.ts:112](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L112)

___

### yoast\_head\_json

• **yoast\_head\_json**: ``null`` \| `Record`<`string`, `any`\>

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[yoast_head_json](10up_headless_core.PostTypeEntity.md#yoast_head_json)

#### Defined in

[packages/core/src/data/types/entities.ts:111](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L111)
