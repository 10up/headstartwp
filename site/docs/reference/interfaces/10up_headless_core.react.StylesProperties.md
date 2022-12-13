---
id: "10up_headless_core.react.StylesProperties"
title: "Interface: StylesProperties"
sidebar_label: "StylesProperties"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).[react](../namespaces/10up_headless_core.react.md).StylesProperties

## Indexable

▪ [k: `string`]: `unknown`

## Properties

### border

• `Optional` **border**: `Object`

Border styles.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `color?` | `string` | Sets the `border-color` CSS property. |
| `radius?` | `string` | Sets the `border-radius` CSS property. |
| `style?` | `string` | Sets the `border-style` CSS property. |
| `width?` | `string` | Sets the `border-width` CSS property. |

#### Defined in

[packages/core/src/react/provider/types.ts:531](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/provider/types.ts#L531)

___

### color

• `Optional` **color**: `Object`

Color styles.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `background?` | `string` | Sets the `background-color` CSS property. |
| `gradient?` | `string` | Sets the `background` CSS property. |
| `text?` | `string` | Sets the `color` CSS property. |

#### Defined in

[packages/core/src/react/provider/types.ts:552](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/provider/types.ts#L552)

___

### spacing

• `Optional` **spacing**: `Object`

Spacing styles.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockGap?` | `string` | Sets the `--wp--style--block-gap` CSS custom property when settings.spacing.blockGap is true. |
| `margin?` | { `bottom?`: `string` ; `left?`: `string` ; `right?`: `string` ; `top?`: `string`  } | Margin styles. |
| `margin.bottom?` | `string` | Sets the `margin-bottom` CSS property. |
| `margin.left?` | `string` | Sets the `margin-left` CSS property. |
| `margin.right?` | `string` | Sets the `margin-right` CSS property. |
| `margin.top?` | `string` | Sets the `margin-top` CSS property. |
| `padding?` | { `bottom?`: `string` ; `left?`: `string` ; `right?`: `string` ; `top?`: `string`  } | Padding styles. |
| `padding.bottom?` | `string` | Sets the `padding-bottom` CSS property. |
| `padding.left?` | `string` | Sets the `padding-left` CSS property. |
| `padding.right?` | `string` | Sets the `padding-right` CSS property. |
| `padding.top?` | `string` | Sets the `padding-top` CSS property. |

#### Defined in

[packages/core/src/react/provider/types.ts:569](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/provider/types.ts#L569)

___

### typography

• `Optional` **typography**: `Object`

Typography styles.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `fontFamily?` | `string` | Sets the `font-family` CSS property. |
| `fontSize?` | `string` | Sets the `font-size` CSS property. |
| `fontStyle?` | `string` | Sets the `font-style` CSS property. |
| `fontWeight?` | `string` | Sets the `font-weight` CSS property. |
| `letterSpacing?` | `string` | Sets the `letter-spacing` CSS property. |
| `lineHeight?` | `string` | Sets the `line-height` CSS property. |
| `textDecoration?` | `string` | Sets the `text-decoration` CSS property. |
| `textTransform?` | `string` | Sets the `text-transform` CSS property. |

#### Defined in

[packages/core/src/react/provider/types.ts:620](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/provider/types.ts#L620)
