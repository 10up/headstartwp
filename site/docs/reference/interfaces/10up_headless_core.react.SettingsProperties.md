---
id: "10up_headless_core.react.SettingsProperties"
title: "Interface: SettingsProperties"
sidebar_label: "SettingsProperties"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).[react](../namespaces/10up_headless_core.react.md).SettingsProperties

## Indexable

▪ [k: `string`]: `unknown`

## Properties

### appearanceTools

• `Optional` **appearanceTools**: `boolean`

Setting that enables ui tools.

#### Defined in

[packages/core/src/react/provider/types.ts:295](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/provider/types.ts#L295)

___

### border

• `Optional` **border**: `Object`

Settings related to borders.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `color?` | `boolean` | Allow users to set custom border colors. |
| `radius?` | `boolean` | Allow users to set custom border radius. |
| `style?` | `boolean` | Allow users to set custom border styles. |
| `width?` | `boolean` | Allow users to set custom border widths. |

#### Defined in

[packages/core/src/react/provider/types.ts:299](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/provider/types.ts#L299)

___

### color

• `Optional` **color**: `Object`

Settings related to colors.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `background?` | `boolean` | Allow users to set background colors. |
| `custom?` | `boolean` | Allow users to select custom colors. |
| `customDuotone?` | `boolean` | Allow users to create custom duotone filters. |
| `customGradient?` | `boolean` | Allow users to create custom gradients. |
| `defaultGradients?` | `boolean` | Allow users to choose colors from the default gradients. |
| `defaultPalette?` | `boolean` | Allow users to choose colors from the default palette. |
| `duotone?` | { `colors`: `string`[] ; `name`: `string` ; `slug`: `string`  }[] | Duotone presets for the duotone picker. Doesn't generate classes or properties. |
| `gradients?` | { `gradient`: `string` ; `name`: `string` ; `slug`: `string`  }[] | Gradient presets for the gradient picker. Generates a single class (`.has-{slug}-background`) and custom property (`--wp--preset--gradient--{slug}`) per preset value. |
| `link?` | `boolean` | Allow users to set link colors. |
| `palette?` | { `color`: `string` ; `name`: `string` ; `slug`: `string`  }[] | Color palette presets for the color picker. Generates three classes (`.has-{slug}-color`, `.has-{slug}-background-color`, and `.has-{slug}-border-color`) and a single custom property (`--wp--preset--color--{slug}`) per preset value. |
| `text?` | `boolean` | Allow users to set text colors. |

#### Defined in

[packages/core/src/react/provider/types.ts:320](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/provider/types.ts#L320)

___

### custom

• `Optional` **custom**: `Object`

Generate custom CSS custom properties of the form `--wp--custom--{key}--{nested-key}: {value};`. `camelCased` keys are transformed to `kebab-case` as to follow the CSS property naming schema. Keys at different depth levels are separated by `--`, so keys should not include `--` in the name.

#### Index signature

▪ [k: `string`]: `string` \| `number` \| [`SettingsCustomAdditionalProperties`](10up_headless_core.react.SettingsCustomAdditionalProperties.md)

#### Defined in

[packages/core/src/react/provider/types.ts:519](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/provider/types.ts#L519)

___

### layout

• `Optional` **layout**: `Object`

Settings related to layout.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contentSize?` | `string` | Sets the max-width of the content. |
| `wideSize?` | `string` | Sets the max-width of wide (`.alignwide`) content. |

#### Defined in

[packages/core/src/react/provider/types.ts:411](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/provider/types.ts#L411)

___

### spacing

• `Optional` **spacing**: `Object`

Settings related to spacing.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockGap?` | ``null`` \| `boolean` | Enables `--wp--style--block-gap` to be generated from styles.spacing.blockGap. A value of `null` instead of `false` further disables layout styles from being generated. |
| `margin?` | `boolean` | Allow users to set a custom margin. |
| `padding?` | `boolean` | Allow users to set a custom padding. |
| `units?` | `string`[] | List of units the user can use for spacing values. |

#### Defined in

[packages/core/src/react/provider/types.ts:424](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/provider/types.ts#L424)

___

### typography

• `Optional` **typography**: `Object`

Settings related to typography.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `customFontSize?` | `boolean` | Allow users to set custom font sizes. |
| `dropCap?` | `boolean` | Enable drop cap. |
| `fontFamilies?` | { `fontFamily?`: `string` ; `name?`: `string` ; `slug?`: `string`  }[] | Font family presets for the font family selector. Generates a single custom property (`--wp--preset--font-family--{slug}`) per preset value. |
| `fontSizes?` | { `name?`: `string` ; `size?`: `string` ; `slug?`: `string`  }[] | Font size presets for the font size selector. Generates a single class (`.has-{slug}-color`) and custom property (`--wp--preset--font-size--{slug}`) per preset value. |
| `fontStyle?` | `boolean` | Allow users to set custom font styles. |
| `fontWeight?` | `boolean` | Allow users to set custom font weights. |
| `letterSpacing?` | `boolean` | Allow users to set custom letter spacing. |
| `lineHeight?` | `boolean` | Allow users to set custom line height. |
| `textDecoration?` | `boolean` | Allow users to set custom text decorations. |
| `textTransform?` | `boolean` | Allow users to set custom text transforms. |

#### Defined in

[packages/core/src/react/provider/types.ts:446](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/provider/types.ts#L446)
