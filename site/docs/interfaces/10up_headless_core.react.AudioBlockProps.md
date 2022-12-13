---
id: "10up_headless_core.react.AudioBlockProps"
title: "Interface: AudioBlockProps"
sidebar_label: "@10up/headless-core.react.AudioBlockProps"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).[react](../namespaces/10up_headless_core.react.md).AudioBlockProps

The interface for components rendered by [AudioBlock](../namespaces/10up_headless_core.react.md#audioblock)

## Hierarchy

- `IBlockAttributes`

  ↳ **`AudioBlockProps`**

## Properties

### attributes

• `Optional` **attributes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `align` | `Align` |
| `blockStyle?` | `string` |
| `border` | `Border` |
| `colors` | `Colors` |
| `spacing` | `Spacing` |
| `typography` | `Typography` |
| `width?` | `string` |

#### Inherited from

IBlockAttributes.attributes

#### Defined in

[packages/core/src/react/blocks/types.ts:79](https://github.com/10up/headless/blob/d270384/packages/core/src/react/blocks/types.ts#L79)

___

### autoplay

• `Optional` **autoplay**: `boolean`

Whether the audio should be autoplayable

#### Defined in

[packages/core/src/react/blocks/AudioBlock.tsx:19](https://github.com/10up/headless/blob/d270384/packages/core/src/react/blocks/AudioBlock.tsx#L19)

___

### caption

• `Optional` **caption**: `string`

Audio caption

#### Defined in

[packages/core/src/react/blocks/AudioBlock.tsx:24](https://github.com/10up/headless/blob/d270384/packages/core/src/react/blocks/AudioBlock.tsx#L24)

___

### children

• `Optional` **children**: `ReactNode`

#### Inherited from

IBlockAttributes.children

#### Defined in

[packages/core/src/react/blocks/types.ts:77](https://github.com/10up/headless/blob/d270384/packages/core/src/react/blocks/types.ts#L77)

___

### className

• `Optional` **className**: `string`

#### Inherited from

IBlockAttributes.className

#### Defined in

[packages/core/src/react/blocks/types.ts:73](https://github.com/10up/headless/blob/d270384/packages/core/src/react/blocks/types.ts#L73)

___

### domNode

• `Optional` **domNode**: `Element`

#### Inherited from

IBlockAttributes.domNode

#### Defined in

[packages/core/src/react/blocks/types.ts:75](https://github.com/10up/headless/blob/d270384/packages/core/src/react/blocks/types.ts#L75)

___

### htmlAnchor

• `Optional` **htmlAnchor**: `string`

#### Inherited from

IBlockAttributes.htmlAnchor

#### Defined in

[packages/core/src/react/blocks/types.ts:76](https://github.com/10up/headless/blob/d270384/packages/core/src/react/blocks/types.ts#L76)

___

### loop

• `Optional` **loop**: `boolean`

Whether the audio should be played in a loop

#### Defined in

[packages/core/src/react/blocks/AudioBlock.tsx:29](https://github.com/10up/headless/blob/d270384/packages/core/src/react/blocks/AudioBlock.tsx#L29)

___

### name

• **name**: `string`

#### Inherited from

IBlockAttributes.name

#### Defined in

[packages/core/src/react/blocks/types.ts:72](https://github.com/10up/headless/blob/d270384/packages/core/src/react/blocks/types.ts#L72)

___

### preload

• `Optional` **preload**: `string`

Whether to preload the audio or not

#### Defined in

[packages/core/src/react/blocks/AudioBlock.tsx:34](https://github.com/10up/headless/blob/d270384/packages/core/src/react/blocks/AudioBlock.tsx#L34)

___

### src

• **src**: `string`

The audio source URL.

#### Defined in

[packages/core/src/react/blocks/AudioBlock.tsx:14](https://github.com/10up/headless/blob/d270384/packages/core/src/react/blocks/AudioBlock.tsx#L14)

___

### style

• `Optional` **style**: `Record`<`string`, `string`\>

#### Inherited from

IBlockAttributes.style

#### Defined in

[packages/core/src/react/blocks/types.ts:74](https://github.com/10up/headless/blob/d270384/packages/core/src/react/blocks/types.ts#L74)
