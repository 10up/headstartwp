---
id: "10up_headless_core.react.BlockProps"
title: "Interface: BlockProps"
sidebar_label: "@10up/headless-core.react.BlockProps"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).[react](../namespaces/10up_headless_core.react.md).BlockProps

The interface any children of [BlocksRenderer](../namespaces/10up_headless_core.react.md#blocksrenderer) must implement.

## Properties

### children

• `Optional` **children**: `ReactNode`

The children of the domNode that was replaced with the react component

Note: the children of the domNode are recursively parsed.

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:53](https://github.com/10up/headless/blob/d270384/packages/core/src/react/components/BlocksRenderer.tsx#L53)

___

### classList

• `Optional` **classList**: `string` \| `string`[]

The class name of the domNode that should be replaced with the react component

If tagName is specified, then classList is mandatory

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:41](https://github.com/10up/headless/blob/d270384/packages/core/src/react/components/BlocksRenderer.tsx#L41)

___

### domNode

• `Optional` **domNode**: `Element`

The actual domNode that was replaced with the react component

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:46](https://github.com/10up/headless/blob/d270384/packages/core/src/react/components/BlocksRenderer.tsx#L46)

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

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:27](https://github.com/10up/headless/blob/d270384/packages/core/src/react/components/BlocksRenderer.tsx#L27)

___

### style

• `Optional` **style**: `Record`<`string`, `string`\>

The style tag of the domNode as an object.

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:58](https://github.com/10up/headless/blob/d270384/packages/core/src/react/components/BlocksRenderer.tsx#L58)

___

### tagName

• `Optional` **tagName**: `string`

The tag name of the domNode that should be replaced with the react component

If a test function is not supplied, then passing tagName is mandatory

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:34](https://github.com/10up/headless/blob/d270384/packages/core/src/react/components/BlocksRenderer.tsx#L34)

___

### test

• `Optional` **test**: (`domNode`: `Element`, `site?`: [`HeadlessConfig`](../modules/10up_headless_core.md#headlessconfig)) => `boolean`

#### Type declaration

▸ (`domNode`, `site?`): `boolean`

A test function receives a domNode and returns a boolean valua indicating
whether that domNode should be replaced with the react component

##### Parameters

| Name | Type |
| :------ | :------ |
| `domNode` | `Element` |
| `site?` | [`HeadlessConfig`](../modules/10up_headless_core.md#headlessconfig) |

##### Returns

`boolean`

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:19](https://github.com/10up/headless/blob/d270384/packages/core/src/react/components/BlocksRenderer.tsx#L19)
