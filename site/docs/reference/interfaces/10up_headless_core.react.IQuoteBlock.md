---
id: "10up_headless_core.react.IQuoteBlock"
title: "Interface: IQuoteBlock"
sidebar_label: "IQuoteBlock"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).[react](../namespaces/10up_headless_core.react.md).IQuoteBlock

The common interface for a block transform component

## Hierarchy

- [`IBlock`](10up_headless_core.react.IBlock.md)<[`QuoteBlockProps`](10up_headless_core.react.QuoteBlockProps.md)\>

  ↳ **`IQuoteBlock`**

## Properties

### children

• `Optional` **children**: `ReactNode`

The children of the domNode that was replaced with the react component

Note: the children of the domNode are recursively parsed.

#### Inherited from

[IBlock](10up_headless_core.react.IBlock.md).[children](10up_headless_core.react.IBlock.md#children)

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:53](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/components/BlocksRenderer.tsx#L53)

___

### classList

• `Optional` **classList**: `string` \| `string`[]

The class name of the domNode that should be replaced with the react component

If tagName is specified, then classList is mandatory

#### Inherited from

[IBlock](10up_headless_core.react.IBlock.md).[classList](10up_headless_core.react.IBlock.md#classlist)

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:41](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/components/BlocksRenderer.tsx#L41)

___

### className

• `Optional` **className**: `string`

#### Inherited from

[IBlock](10up_headless_core.react.IBlock.md).[className](10up_headless_core.react.IBlock.md#classname)

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:66](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/components/BlocksRenderer.tsx#L66)

___

### component

• **component**: `FC`<[`QuoteBlockProps`](10up_headless_core.react.QuoteBlockProps.md)\>

#### Inherited from

[IBlock](10up_headless_core.react.IBlock.md).[component](10up_headless_core.react.IBlock.md#component)

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:67](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/components/BlocksRenderer.tsx#L67)

___

### domNode

• **domNode**: `Element`

#### Inherited from

[IBlock](10up_headless_core.react.IBlock.md).[domNode](10up_headless_core.react.IBlock.md#domnode)

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:65](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/components/BlocksRenderer.tsx#L65)

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

[IBlock](10up_headless_core.react.IBlock.md).[exclude](10up_headless_core.react.IBlock.md#exclude)

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:27](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/components/BlocksRenderer.tsx#L27)

___

### style

• `Optional` **style**: `Record`<`string`, `string`\>

The style tag of the domNode as an object.

#### Inherited from

[IBlock](10up_headless_core.react.IBlock.md).[style](10up_headless_core.react.IBlock.md#style)

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:58](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/components/BlocksRenderer.tsx#L58)

___

### tagName

• `Optional` **tagName**: `string`

The tag name of the domNode that should be replaced with the react component

If a test function is not supplied, then passing tagName is mandatory

#### Inherited from

[IBlock](10up_headless_core.react.IBlock.md).[tagName](10up_headless_core.react.IBlock.md#tagname)

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:34](https://github.com/10up/headless/blob/32c3bf4/packages/core/src/react/components/BlocksRenderer.tsx#L34)
