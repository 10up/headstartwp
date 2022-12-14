---
id: "10up_headless_core.react.IBlock"
title: "Interface: IBlock<T>"
sidebar_label: "@10up/headless-core.react.IBlock"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).[react](../namespaces/10up_headless_core.react.md).IBlock

The common interface for a block transform component

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `IBlockAttributes` |

## Hierarchy

- `Omit`<[`BlockProps`](10up_headless_core.react.BlockProps.md), ``"test"``\>

  ↳ **`IBlock`**

  ↳↳ [`IButtonBlock`](10up_headless_core.react.IButtonBlock.md)

  ↳↳ [`IButtonsBlock`](10up_headless_core.react.IButtonsBlock.md)

  ↳↳ [`IAudioBlock`](10up_headless_core.react.IAudioBlock.md)

  ↳↳ [`ICodeBlock`](10up_headless_core.react.ICodeBlock.md)

  ↳↳ [`IColumnsBlock`](10up_headless_core.react.IColumnsBlock.md)

  ↳↳ [`IColumnBlock`](10up_headless_core.react.IColumnBlock.md)

  ↳↳ [`ICoverBlock`](10up_headless_core.react.ICoverBlock.md)

  ↳↳ [`IParagraphBlock`](10up_headless_core.react.IParagraphBlock.md)

  ↳↳ [`IHeadingBlock`](10up_headless_core.react.IHeadingBlock.md)

  ↳↳ [`IQuoteBlock`](10up_headless_core.react.IQuoteBlock.md)

  ↳↳ [`IPullQuotekBlock`](10up_headless_core.react.IPullQuotekBlock.md)

  ↳↳ [`IPreformattedBlock`](10up_headless_core.react.IPreformattedBlock.md)

  ↳↳ [`IVerseBlock`](10up_headless_core.react.IVerseBlock.md)

  ↳↳ [`ITableBlock`](10up_headless_core.react.ITableBlock.md)

  ↳↳ [`IGroupBlock`](10up_headless_core.react.IGroupBlock.md)

  ↳↳ [`ISeparatorBlock`](10up_headless_core.react.ISeparatorBlock.md)

  ↳↳ [`ISpacerBlock`](10up_headless_core.react.ISpacerBlock.md)

  ↳↳ [`IListBlock`](10up_headless_core.react.IListBlock.md)

  ↳↳ [`IFileBlock`](10up_headless_core.react.IFileBlock.md)

  ↳↳ [`IMediaTextBlock`](10up_headless_core.react.IMediaTextBlock.md)

  ↳↳ [`IImageBlock`](10up_headless_core.react.IImageBlock.md)

## Properties

### children

• `Optional` **children**: `ReactNode`

The children of the domNode that was replaced with the react component

Note: the children of the domNode are recursively parsed.

#### Inherited from

Omit.children

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:53](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/BlocksRenderer.tsx#L53)

___

### classList

• `Optional` **classList**: `string` \| `string`[]

The class name of the domNode that should be replaced with the react component

If tagName is specified, then classList is mandatory

#### Inherited from

Omit.classList

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:41](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/BlocksRenderer.tsx#L41)

___

### className

• `Optional` **className**: `string`

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:66](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/BlocksRenderer.tsx#L66)

___

### component

• **component**: `FC`<`T`\>

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:67](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/BlocksRenderer.tsx#L67)

___

### domNode

• **domNode**: `Element`

#### Overrides

Omit.domNode

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:65](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/BlocksRenderer.tsx#L65)

___

### exclude

• `Optional` **exclude**: (`childNode`: `Element`, `site?`: [`HeadlessConfig`](../modules/10up_headless_core.md#headlessconfig)) => `boolean`

#### Type declaration

▸ (`childNode`, `site?`): `boolean`

An optional exclude function that also receives a domNode and is executed against every child
of the node being replaced with a react component.

This is useful to selectively disregard certain children of a node when replacing with a react component.

##### Parameters

| Name | Type |
| :------ | :------ |
| `childNode` | `Element` |
| `site?` | [`HeadlessConfig`](../modules/10up_headless_core.md#headlessconfig) |

##### Returns

`boolean`

#### Inherited from

Omit.exclude

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:27](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/BlocksRenderer.tsx#L27)

___

### style

• `Optional` **style**: `Record`<`string`, `string`\>

The style tag of the domNode as an object.

#### Inherited from

Omit.style

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:58](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/BlocksRenderer.tsx#L58)

___

### tagName

• `Optional` **tagName**: `string`

The tag name of the domNode that should be replaced with the react component

If a test function is not supplied, then passing tagName is mandatory

#### Inherited from

Omit.tagName

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:34](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/BlocksRenderer.tsx#L34)
