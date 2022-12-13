---
id: "10up_headless_core.AttachmentEntity"
title: "Interface: AttachmentEntity"
sidebar_label: "@10up/headless-core.AttachmentEntity"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).AttachmentEntity

Interface for entities from the /wp/v2/media endpoint.

## Hierarchy

- [`PostTypeEntity`](10up_headless_core.PostTypeEntity.md)

  ↳ **`AttachmentEntity`**

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

[packages/core/src/data/types/entities.ts:96](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L96)

___

### alt\_text

• `Optional` **alt\_text**: `string`

Alternative text to display when attachment is not displayed.

#### Defined in

[packages/core/src/data/types/entities.ts:257](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L257)

___

### author

• `Optional` **author**: [`AuthorEntity`](10up_headless_core.AuthorEntity.md)[]

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[author](10up_headless_core.PostTypeEntity.md#author)

#### Defined in

[packages/core/src/data/types/entities.ts:92](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L92)

___

### caption

• `Optional` **caption**: `Rendered`

The attachment caption.

#### Defined in

[packages/core/src/data/types/entities.ts:262](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L262)

___

### comment\_status

• `Optional` **comment\_status**: ``"open"`` \| ``"closed"``

Whether or not comments are open on the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[comment_status](10up_headless_core.PostTypeEntity.md#comment_status)

#### Defined in

[packages/core/src/data/types/entities.ts:104](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L104)

___

### date

• `Optional` **date**: `string`

The date the object was published, in the site's timezone.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[date](10up_headless_core.PostTypeEntity.md#date)

#### Defined in

[packages/core/src/data/types/entities.ts:40](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L40)

___

### date\_gmt

• `Optional` **date\_gmt**: `string`

The date the object was published, as GMT.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[date_gmt](10up_headless_core.PostTypeEntity.md#date_gmt)

#### Defined in

[packages/core/src/data/types/entities.ts:45](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L45)

___

### description

• `Optional` **description**: `Rendered`

The attachment description.

#### Defined in

[packages/core/src/data/types/entities.ts:267](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L267)

___

### guid

• `Optional` **guid**: `Rendered`

The globally unique identifier for the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[guid](10up_headless_core.PostTypeEntity.md#guid)

#### Defined in

[packages/core/src/data/types/entities.ts:50](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L50)

___

### id

• **id**: `number`

Unique identifier for the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[id](10up_headless_core.PostTypeEntity.md#id)

#### Defined in

[packages/core/src/data/types/entities.ts:65](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L65)

___

### link

• **link**: `string`

URL to the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[link](10up_headless_core.PostTypeEntity.md#link)

#### Defined in

[packages/core/src/data/types/entities.ts:70](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L70)

___

### media\_details

• `Optional` **media\_details**: `Object`

Details about the media file, specific to its type.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `string` | The file path relative to `wp-content/uploads`. |
| `height` | `number` | The height of the attachment. |
| `image_meta` | `Record`<`string`, `unknown`\> | The metadata of the attachment. |
| `sizes` | `Record`<`string`, { `file`: `string` ; `height`: `number` ; `mime_type`: `string` ; `source_url`: `string` ; `width`: `number`  }\> | The different sizes that WordPress created for this attachment. |
| `width` | `number` | The width of the attachment. |

#### Defined in

[packages/core/src/data/types/entities.ts:282](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L282)

___

### media\_type

• `Optional` **media\_type**: ``"image"`` \| ``"file"``

Attachment type.

#### Defined in

[packages/core/src/data/types/entities.ts:272](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L272)

___

### meta

• `Optional` **meta**: `Record`<`string`, `unknown`\>

Meta fields.

#### Defined in

[packages/core/src/data/types/entities.ts:247](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L247)

___

### mime\_type

• `Optional` **mime\_type**: `string`

The attachment MIME type.

#### Defined in

[packages/core/src/data/types/entities.ts:277](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L277)

___

### missing\_image\_sizes

• `Optional` **missing\_image\_sizes**: `string`[]

List of the missing image sizes of the attachment.

#### Defined in

[packages/core/src/data/types/entities.ts:350](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L350)

___

### modified

• `Optional` **modified**: `string`

The date the object was last modified, in the site's timezone.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[modified](10up_headless_core.PostTypeEntity.md#modified)

#### Defined in

[packages/core/src/data/types/entities.ts:55](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L55)

___

### modified\_gmt

• `Optional` **modified\_gmt**: `string`

The date the object was last modified, as GMT.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[modified_gmt](10up_headless_core.PostTypeEntity.md#modified_gmt)

#### Defined in

[packages/core/src/data/types/entities.ts:60](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L60)

___

### ping\_status

• `Optional` **ping\_status**: ``"open"`` \| ``"closed"``

Whether or not the object can be pinged.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[ping_status](10up_headless_core.PostTypeEntity.md#ping_status)

#### Defined in

[packages/core/src/data/types/entities.ts:109](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L109)

___

### post

• `Optional` **post**: `number`

The ID for the associated post of the attachment.

#### Defined in

[packages/core/src/data/types/entities.ts:340](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L340)

___

### slug

• **slug**: `string`

An alphanumeric identifier for the object unique to its type.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[slug](10up_headless_core.PostTypeEntity.md#slug)

#### Defined in

[packages/core/src/data/types/entities.ts:75](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L75)

___

### source\_url

• `Optional` **source\_url**: `string`

URL to the original attachment file.

#### Defined in

[packages/core/src/data/types/entities.ts:345](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L345)

___

### status

• `Optional` **status**: ``"publish"`` \| ``"future"`` \| ``"draft"`` \| ``"pending"`` \| ``"private"``

A named status for the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[status](10up_headless_core.PostTypeEntity.md#status)

#### Defined in

[packages/core/src/data/types/entities.ts:80](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L80)

___

### template

• `Optional` **template**: `string`

The theme file to use to display the object.

#### Defined in

[packages/core/src/data/types/entities.ts:252](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L252)

___

### terms

• `Optional` **terms**: `Record`<`string`, [`TermEntity`](10up_headless_core.TermEntity.md)[]\>

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[terms](10up_headless_core.PostTypeEntity.md#terms)

#### Defined in

[packages/core/src/data/types/entities.ts:94](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L94)

___

### title

• `Optional` **title**: `Rendered`

The title for the object.

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[title](10up_headless_core.PostTypeEntity.md#title)

#### Defined in

[packages/core/src/data/types/entities.ts:90](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L90)

___

### type

• **type**: ``"attachment"``

Type of Post for the object.

#### Overrides

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[type](10up_headless_core.PostTypeEntity.md#type)

#### Defined in

[packages/core/src/data/types/entities.ts:242](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L242)

___

### yoast\_head

• **yoast\_head**: ``null`` \| `string`

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[yoast_head](10up_headless_core.PostTypeEntity.md#yoast_head)

#### Defined in

[packages/core/src/data/types/entities.ts:112](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L112)

___

### yoast\_head\_json

• **yoast\_head\_json**: ``null`` \| `Record`<`string`, `any`\>

#### Inherited from

[PostTypeEntity](10up_headless_core.PostTypeEntity.md).[yoast_head_json](10up_headless_core.PostTypeEntity.md#yoast_head_json)

#### Defined in

[packages/core/src/data/types/entities.ts:111](https://github.com/10up/headless/blob/5293da0/packages/core/src/data/types/entities.ts#L111)
