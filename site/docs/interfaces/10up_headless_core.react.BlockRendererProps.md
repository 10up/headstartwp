---
id: "10up_headless_core.react.BlockRendererProps"
title: "Interface: BlockRendererProps"
sidebar_label: "@10up/headless-core.react.BlockRendererProps"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).[react](../namespaces/10up_headless_core.react.md).BlockRendererProps

The type definition for the [BlocksRenderer](../namespaces/10up_headless_core.react.md#blocksrenderer) component.

## Properties

### children

• `Optional` **children**: `ReactNode`

The children components that must implements [BlockProps](10up_headless_core.react.BlockProps.md). Failing to implement [BlockProps](10up_headless_core.react.BlockProps.md)
will issue a warning at runtime.

Passing children are not mandatory, if you do not pass them `BlocksRenderer` will simply sanitize the html markup.

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:110](https://github.com/10up/headless/blob/5293da0/packages/core/src/react/components/BlocksRenderer.tsx#L110)

___

### html

• **html**: `string`

The HTML string to be parsed.

```
<BlocksRenderer
		html="<div><p>hello world</p> div content</div>"
/>,
```

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:83](https://github.com/10up/headless/blob/5293da0/packages/core/src/react/components/BlocksRenderer.tsx#L83)

___

### ksesAllowList

• `Optional` **ksesAllowList**: `IWhiteList`

The allow list for the parser

```
<BlocksRenderer
		html="<div><p>hello world</p> div content</div>"
		ksesAllowList={{ div: [] }}
/>,
```

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:95](https://github.com/10up/headless/blob/5293da0/packages/core/src/react/components/BlocksRenderer.tsx#L95)

___

### sanitizeFn

• `Optional` **sanitizeFn**: (`html`: `string`, `ksesAllowList?`: `IWhiteList`) => `string`

#### Type declaration

▸ (`html`, `ksesAllowList?`): `string`

A custom implementation of the sanitize function.

If none is provided it's going to default to [wpKsesPost](../modules/10up_headless_core.md#wpksespost)

##### Parameters

| Name | Type |
| :------ | :------ |
| `html` | `string` |
| `ksesAllowList?` | `IWhiteList` |

##### Returns

`string`

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:102](https://github.com/10up/headless/blob/5293da0/packages/core/src/react/components/BlocksRenderer.tsx#L102)
