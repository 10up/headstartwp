---
id: "10up_headless_core.react"
title: "Namespace: react"
sidebar_label: "@10up/headless-core.react"
custom_edit_url: null
---

[@10up/headless-core](../modules/10up_headless_core.md).react

## @10up/headless-core/react

The react export of the `@10up/headless-core` package.

### Usage

```tsx
import { BlocksRenderer } from "@10up/headless-core/react";
```

## Interfaces

- [AudioBlockProps](../interfaces/10up_headless_core.react.AudioBlockProps.md)
- [BlockProps](../interfaces/10up_headless_core.react.BlockProps.md)
- [BlockRendererProps](../interfaces/10up_headless_core.react.BlockRendererProps.md)
- [ButtonBlockProps](../interfaces/10up_headless_core.react.ButtonBlockProps.md)
- [ButtonsBlockProps](../interfaces/10up_headless_core.react.ButtonsBlockProps.md)
- [CodeBlockProps](../interfaces/10up_headless_core.react.CodeBlockProps.md)
- [ColumnBlockProps](../interfaces/10up_headless_core.react.ColumnBlockProps.md)
- [ColumnsBlockProps](../interfaces/10up_headless_core.react.ColumnsBlockProps.md)
- [CoverBlockProps](../interfaces/10up_headless_core.react.CoverBlockProps.md)
- [FetchHookOptions](../interfaces/10up_headless_core.react.FetchHookOptions.md)
- [FileBlockProps](../interfaces/10up_headless_core.react.FileBlockProps.md)
- [GroupBlockProps](../interfaces/10up_headless_core.react.GroupBlockProps.md)
- [HeadingBlockProps](../interfaces/10up_headless_core.react.HeadingBlockProps.md)
- [HookResponse](../interfaces/10up_headless_core.react.HookResponse.md)
- [IAudioBlock](../interfaces/10up_headless_core.react.IAudioBlock.md)
- [IBlock](../interfaces/10up_headless_core.react.IBlock.md)
- [IButtonBlock](../interfaces/10up_headless_core.react.IButtonBlock.md)
- [IButtonsBlock](../interfaces/10up_headless_core.react.IButtonsBlock.md)
- [ICodeBlock](../interfaces/10up_headless_core.react.ICodeBlock.md)
- [IColumnBlock](../interfaces/10up_headless_core.react.IColumnBlock.md)
- [IColumnsBlock](../interfaces/10up_headless_core.react.IColumnsBlock.md)
- [ICoverBlock](../interfaces/10up_headless_core.react.ICoverBlock.md)
- [IFileBlock](../interfaces/10up_headless_core.react.IFileBlock.md)
- [IGroupBlock](../interfaces/10up_headless_core.react.IGroupBlock.md)
- [IHeadingBlock](../interfaces/10up_headless_core.react.IHeadingBlock.md)
- [IImageBlock](../interfaces/10up_headless_core.react.IImageBlock.md)
- [IListBlock](../interfaces/10up_headless_core.react.IListBlock.md)
- [IMediaTextBlock](../interfaces/10up_headless_core.react.IMediaTextBlock.md)
- [IParagraphBlock](../interfaces/10up_headless_core.react.IParagraphBlock.md)
- [IPreformattedBlock](../interfaces/10up_headless_core.react.IPreformattedBlock.md)
- [IPullQuotekBlock](../interfaces/10up_headless_core.react.IPullQuotekBlock.md)
- [IQuoteBlock](../interfaces/10up_headless_core.react.IQuoteBlock.md)
- [ISeparatorBlock](../interfaces/10up_headless_core.react.ISeparatorBlock.md)
- [ISpacerBlock](../interfaces/10up_headless_core.react.ISpacerBlock.md)
- [ITableBlock](../interfaces/10up_headless_core.react.ITableBlock.md)
- [IVerseBlock](../interfaces/10up_headless_core.react.IVerseBlock.md)
- [ImageBlockProps](../interfaces/10up_headless_core.react.ImageBlockProps.md)
- [ListBlockProps](../interfaces/10up_headless_core.react.ListBlockProps.md)
- [MediaTextBlockProps](../interfaces/10up_headless_core.react.MediaTextBlockProps.md)
- [ParagraphBlockProps](../interfaces/10up_headless_core.react.ParagraphBlockProps.md)
- [PreformattedBlockProps](../interfaces/10up_headless_core.react.PreformattedBlockProps.md)
- [PullQuoteBlockProps](../interfaces/10up_headless_core.react.PullQuoteBlockProps.md)
- [QuoteBlockProps](../interfaces/10up_headless_core.react.QuoteBlockProps.md)
- [SeparatorBlockProps](../interfaces/10up_headless_core.react.SeparatorBlockProps.md)
- [SettingsCustomAdditionalProperties](../interfaces/10up_headless_core.react.SettingsCustomAdditionalProperties.md)
- [SettingsProperties](../interfaces/10up_headless_core.react.SettingsProperties.md)
- [SpacerBlockProps](../interfaces/10up_headless_core.react.SpacerBlockProps.md)
- [StylesElementsPropertiesComplete](../interfaces/10up_headless_core.react.StylesElementsPropertiesComplete.md)
- [StylesProperties](../interfaces/10up_headless_core.react.StylesProperties.md)
- [TableBlockProps](../interfaces/10up_headless_core.react.TableBlockProps.md)
- [VerseBlockProps](../interfaces/10up_headless_core.react.VerseBlockProps.md)
- [WpThemeJSON](../interfaces/10up_headless_core.react.WpThemeJSON.md)
- [useAppSettingsResponse](../interfaces/10up_headless_core.react.useAppSettingsResponse.md)
- [useFetchOptions](../interfaces/10up_headless_core.react.useFetchOptions.md)
- [useMenuResponse](../interfaces/10up_headless_core.react.useMenuResponse.md)
- [usePostResponse](../interfaces/10up_headless_core.react.usePostResponse.md)
- [usePostsResponse](../interfaces/10up_headless_core.react.usePostsResponse.md)
- [useSearchResponse](../interfaces/10up_headless_core.react.useSearchResponse.md)
- [useTermsResponse](../interfaces/10up_headless_core.react.useTermsResponse.md)

## Blocks

### AudioBlock

▸ **AudioBlock**(`props`): `Element`

The AudioBlock components implements block parsing for the Audio block.

This component must be used within a [BlocksRenderer](10up_headless_core.react.md#blocksrenderer) component.

```tsx
<BlocksRenderer html={html}>
	<AudioBlock component={DebugComponent} />
</BlocksRenderer>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IAudioBlock`](../interfaces/10up_headless_core.react.IAudioBlock.md) | Component properties |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/AudioBlock.tsx:58](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/AudioBlock.tsx#L58)

___

### ButtonBlock

▸ **ButtonBlock**(`props`): `Element`

The ButtonBlock component implements block parsing for the Button block.

This component must be used within a [BlocksRenderer](10up_headless_core.react.md#blocksrenderer) component.

```tsx
<BlocksRenderer html={html}>
	<ButtonBlock component={DebugComponent} />
</BlocksRenderer>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IButtonBlock`](../interfaces/10up_headless_core.react.IButtonBlock.md) | Component properties |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/ButtonBlock.tsx:62](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/ButtonBlock.tsx#L62)

___

### ButtonsBlock

▸ **ButtonsBlock**(`props`): `Element`

The ButtonsBlock component implements block parsing for the Buttons block.

This component must be used within a [BlocksRenderer](10up_headless_core.react.md#blocksrenderer) component.

```tsx
<BlocksRenderer html={html}>
	<ButtonsBlock component={DebugComponent} />
</BlocksRenderer>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IButtonsBlock`](../interfaces/10up_headless_core.react.IButtonsBlock.md) | Component properties |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/ButtonsBlock.tsx:28](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/ButtonsBlock.tsx#L28)

___

### CodeBlock

▸ **CodeBlock**(`props`): `Element`

The CodeBlock component implements block parsing for the core/code block.

This component must be used within a [BlocksRenderer](10up_headless_core.react.md#blocksrenderer) component.

```tsx
<BlocksRenderer html={html}>
	<CodeBlock component={DebugComponent} />
</BlocksRenderer>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`ICodeBlock`](../interfaces/10up_headless_core.react.ICodeBlock.md) | Component properties |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/CodeBlock.tsx:32](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/CodeBlock.tsx#L32)

## Data Fetching Hooks

### useFetch

▸ **useFetch**<`E`, `Params`, `R`\>(`params`, `fetchStrategy`, `options?`, `path?`): `Object`

The use Fetch Hook is the foundation for most hooks in the headless framework. It is a wrapper around
`useSWR` and provides a consistent API for fetching data from the API. It requires a fetch strategy which implements
the actual data fetching logic

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | `E` |
| `Params` | extends [`EndpointParams`](../interfaces/10up_headless_core.EndpointParams.md) |
| `R` | `E` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `params` | `Params` | `undefined` | The list of params to pass to the fetch strategy. It overrides the ones in the URL. |
| `fetchStrategy` | [`AbstractFetchStrategy`](../classes/10up_headless_core.AbstractFetchStrategy.md)<`E`, `Params`, `R`\> | `undefined` | The fetch strategy. |
| `options` | [`FetchHookOptions`](../interfaces/10up_headless_core.react.FetchHookOptions.md)<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<`R`\>\> | `{}` | The options to pass to the swr hook. |
| `path` | `string` | `''` | The path of the url to get url params from. |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data?` | [`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<`R`\> |
| `error?` | `any` |
| `isMainQuery` | `boolean` |
| `isValidating` | `boolean` |
| `mutate` | `KeyedMutator`<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<`R`\>\> |
| `params` | `Partial`<`Params`\> & `Params` |

#### Defined in

[packages/core/src/react/hooks/useFetch.ts:26](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/hooks/useFetch.ts#L26)

___

### useFetchAppSettings

▸ **useFetchAppSettings**(`params?`, `options?`): [`useAppSettingsResponse`](../interfaces/10up_headless_core.react.useAppSettingsResponse.md)

The useAppSettings hook

See useAppSettings

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | The list of params to pass to the fetch strategy. It overrides the ones in the URL. |
| `options` | [`FetchHookOptions`](../interfaces/10up_headless_core.react.FetchHookOptions.md)<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`AppEntity`](../interfaces/10up_headless_core.AppEntity.md)\>\> | The options to pass to the swr hook. |

#### Returns

[`useAppSettingsResponse`](../interfaces/10up_headless_core.react.useAppSettingsResponse.md)

#### Defined in

[packages/core/src/react/hooks/useFetchAppSettings.ts:21](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/hooks/useFetchAppSettings.ts#L21)

___

### useFetchMenu

▸ **useFetchMenu**(`menuLocation`, `options?`): [`useMenuResponse`](../interfaces/10up_headless_core.react.useMenuResponse.md)

The useFetchMenu hooks. Returns a Menu object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `menuLocation` | `string` | The slug of the menu location you want to fetch |
| `options` | [`FetchHookOptions`](../interfaces/10up_headless_core.react.FetchHookOptions.md)<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`AppEntity`](../interfaces/10up_headless_core.AppEntity.md)\>\> | SWR configuration options |

#### Returns

[`useMenuResponse`](../interfaces/10up_headless_core.react.useMenuResponse.md)

#### Defined in

[packages/core/src/react/hooks/useFetchMenu.ts:50](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/hooks/useFetchMenu.ts#L50)

___

### useFetchPosts

▸ **useFetchPosts**(`params?`, `options?`, `path?`, `fetcher?`): [`usePostsResponse`](../interfaces/10up_headless_core.react.usePostsResponse.md)

The useFetchPosts hook. Returns a collection of post entities

See usePosts for usage instructions.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `params` | [`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md) | `{}` | The list of params to pass to the fetch strategy. It overrides the ones in the URL. |
| `options` | [`FetchHookOptions`](../interfaces/10up_headless_core.react.FetchHookOptions.md)<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\>\> | `{}` | The options to pass to the swr hook. |
| `path` | `string` | `''` | The path of the url to get url params from. |
| `fetcher` | `undefined` \| [`PostsArchiveFetchStrategy`](../classes/10up_headless_core.PostsArchiveFetchStrategy.md) | `undefined` | The fetch strategy to use. If none is passed, the default one is used |

#### Returns

[`usePostsResponse`](../interfaces/10up_headless_core.react.usePostsResponse.md)

#### Defined in

[packages/core/src/react/hooks/useFetchPosts.ts:79](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/hooks/useFetchPosts.ts#L79)

___

### useFetchSearch

▸ **useFetchSearch**(`params?`, `options?`, `path?`): [`useSearchResponse`](../interfaces/10up_headless_core.react.useSearchResponse.md)

The useFetchSearch hook. Returns a collection of post entities

See useSearch for usage instructions.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `params` | [`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md) | `{}` | The list of params to pass to the fetch strategy. It overrides the ones in the URL. |
| `options` | [`FetchHookOptions`](../interfaces/10up_headless_core.react.FetchHookOptions.md)<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\>\> | `{}` | The options to pass to the swr hook. |
| `path` | `string` | `''` | The path of the url to get url params from. |

#### Returns

[`useSearchResponse`](../interfaces/10up_headless_core.react.useSearchResponse.md)

#### Defined in

[packages/core/src/react/hooks/useFetchSearch.ts:32](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/hooks/useFetchSearch.ts#L32)

___

### useFetchTerms

▸ **useFetchTerms**(`params`, `options?`, `path?`): [`useTermsResponse`](../interfaces/10up_headless_core.react.useTermsResponse.md)

The useFetchTerms hook. Returns a collection of term entities

See useTerms for usage instructions.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `params` | [`TaxonomyArchiveParams`](../interfaces/10up_headless_core.TaxonomyArchiveParams.md) | `undefined` | The list of params to pass to the fetch strategy. It overrides the ones in the URL. |
| `options` | [`FetchHookOptions`](../interfaces/10up_headless_core.react.FetchHookOptions.md)<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\>\> | `{}` | The options to pass to the swr hook. |
| `path` | `string` | `''` | The path of the url to get url params from. |

#### Returns

[`useTermsResponse`](../interfaces/10up_headless_core.react.useTermsResponse.md)

#### Defined in

[packages/core/src/react/hooks/useFetchTerms.ts:29](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/hooks/useFetchTerms.ts#L29)

## Other

### ItemWrapper

Ƭ **ItemWrapper**: (`props`: [`ItemWrapperProps`](10up_headless_core.react.md#itemwrapperprops)) => `JSX.Element`

#### Type declaration

▸ (`props`): `JSX.Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ItemWrapperProps`](10up_headless_core.react.md#itemwrapperprops) |

##### Returns

`JSX.Element`

#### Defined in

[packages/core/src/react/components/Menu.tsx:15](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/Menu.tsx#L15)

___

### ItemWrapperProps

Ƭ **ItemWrapperProps**: `PropsWithChildren`<{ `className`: `string` ; `depth`: `number` ; `item`: [`MenuItemEntity`](../interfaces/10up_headless_core.MenuItemEntity.md)  }\>

#### Defined in

[packages/core/src/react/components/Menu.tsx:10](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/Menu.tsx#L10)

___

### LinkWrapper

Ƭ **LinkWrapper**: (`props`: [`LinkWrapperProps`](10up_headless_core.react.md#linkwrapperprops)) => `JSX.Element`

#### Type declaration

▸ (`props`): `JSX.Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`LinkWrapperProps`](10up_headless_core.react.md#linkwrapperprops) |

##### Returns

`JSX.Element`

#### Defined in

[packages/core/src/react/components/Menu.tsx:27](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/Menu.tsx#L27)

___

### LinkWrapperProps

Ƭ **LinkWrapperProps**: `PropsWithChildren`<{ `depth`: `number` ; `href`: `string`  }\>

#### Defined in

[packages/core/src/react/components/Menu.tsx:23](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/Menu.tsx#L23)

___

### MenuItemsProp

Ƭ **MenuItemsProp**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `depth` | `number` |
| `itemWrapper` | [`ItemWrapper`](10up_headless_core.react.md#itemwrapper) |
| `items` | [`MenuItemEntity`](../interfaces/10up_headless_core.MenuItemEntity.md)[] |
| `linkWrapper` | [`LinkWrapper`](10up_headless_core.react.md#linkwrapper) |
| `menuWrapper` | [`MenuWrapper`](10up_headless_core.react.md#menuwrapper) |
| `topLevelItemsClickable` | `boolean` |

#### Defined in

[packages/core/src/react/components/Menu.tsx:29](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/Menu.tsx#L29)

___

### MenuWrapper

Ƭ **MenuWrapper**: (`props`: [`MenuWrapperProps`](10up_headless_core.react.md#menuwrapperprops)) => `JSX.Element`

#### Type declaration

▸ (`props`): `JSX.Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`MenuWrapperProps`](10up_headless_core.react.md#menuwrapperprops) |

##### Returns

`JSX.Element`

#### Defined in

[packages/core/src/react/components/Menu.tsx:21](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/Menu.tsx#L21)

___

### MenuWrapperProps

Ƭ **MenuWrapperProps**: `PropsWithChildren`<{ `className`: `string` ; `depth`: `number`  }\>

#### Defined in

[packages/core/src/react/components/Menu.tsx:17](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/Menu.tsx#L17)

___

### PageType

Ƭ **PageType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `isAuthorArchive` | `boolean` | Author Archive |
| `isCategoryArchive` | `boolean` | Category Archive |
| `isPostArchive` | `boolean` | Regular post archive |
| `isPostTypeArchive` | `boolean` | Custom Post Type Archive |
| `isSearch` | `boolean` | Search route |
| `isTagArchive` | `boolean` | Tag Archive |
| `isTaxonomyArchive` | `boolean` | Custom Taxonomy Archive |
| `postType` | `string` | Which post type this archive is for |
| `taxonomy` | `string` | Which taxonomy this archive is for |

#### Defined in

[packages/core/src/react/hooks/useFetchPosts.ts:19](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/hooks/useFetchPosts.ts#L19)

___

### SettingsContextProps

Ƭ **SettingsContextProps**: { `imageComponent?`: `React.FC`<[`IImageBlock`](../interfaces/10up_headless_core.react.IImageBlock.md)\> ; `linkComponent?`: `ReactNode`  } & [`HeadlessConfig`](../modules/10up_headless_core.md#headlessconfig)

#### Defined in

[packages/core/src/react/provider/types.ts:5](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/provider/types.ts#L5)

___

### SettingsPropertiesComplete

Ƭ **SettingsPropertiesComplete**: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md) & { `border?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"border"``] ; `color?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"color"``] ; `custom?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"custom"``] ; `layout?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"layout"``] ; `spacing?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"spacing"``] ; `typography?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"typography"``]  }

#### Defined in

[packages/core/src/react/provider/types.ts:10](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/provider/types.ts#L10)

___

### StylesPropertiesAndElementsComplete

Ƭ **StylesPropertiesAndElementsComplete**: [`StylesProperties`](../interfaces/10up_headless_core.react.StylesProperties.md) & { `border?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"border"``] ; `color?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"color"``] ; `elements?`: [`StylesElementsPropertiesComplete`](../interfaces/10up_headless_core.react.StylesElementsPropertiesComplete.md) ; `spacing?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"spacing"``] ; `typography?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"typography"``]  }

#### Defined in

[packages/core/src/react/provider/types.ts:24](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/provider/types.ts#L24)

___

### StylesPropertiesComplete

Ƭ **StylesPropertiesComplete**: [`StylesProperties`](../interfaces/10up_headless_core.react.StylesProperties.md) & { `border?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"border"``] ; `color?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"color"``] ; `spacing?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"spacing"``] ; `typography?`: [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md)[``"typography"``]  }

#### Defined in

[packages/core/src/react/provider/types.ts:18](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/provider/types.ts#L18)

___

### ThemeJSON

Ƭ **ThemeJSON**: `Pick`<[`WpThemeJSON`](../interfaces/10up_headless_core.react.WpThemeJSON.md), ``"styles"`` \| ``"settings"``\>

#### Defined in

[packages/core/src/react/provider/types.ts:289](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/provider/types.ts#L289)

___

### SettingsContext

• `Const` **SettingsContext**: `Context`<`Partial`<[`SettingsContextProps`](10up_headless_core.react.md#settingscontextprops)\>\>

#### Defined in

[packages/core/src/react/provider/Provider.tsx:5](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/provider/Provider.tsx#L5)

___

### ThemeSettingsContext

• `Const` **ThemeSettingsContext**: `Context`<[`ThemeJSON`](10up_headless_core.react.md#themejson)\>

#### Defined in

[packages/core/src/react/provider/ThemeSettingsProvider.tsx:4](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/provider/ThemeSettingsProvider.tsx#L4)

___

### ColumnBlock

▸ **ColumnBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IColumnBlock`](../interfaces/10up_headless_core.react.IColumnBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/ColumnBlock.tsx:11](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/ColumnBlock.tsx#L11)

___

### ColumnsBlock

▸ **ColumnsBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IColumnsBlock`](../interfaces/10up_headless_core.react.IColumnsBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/ColumnsBlocks.tsx:11](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/ColumnsBlocks.tsx#L11)

___

### CoverBlock

▸ **CoverBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ICoverBlock`](../interfaces/10up_headless_core.react.ICoverBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/CoverBlock.tsx:24](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/CoverBlock.tsx#L24)

___

### DebugBlock

▸ **DebugBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/DebugBlock.tsx:4](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/DebugBlock.tsx#L4)

___

### FileBlock

▸ **FileBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IFileBlock`](../interfaces/10up_headless_core.react.IFileBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/FileBlock.tsx:14](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/FileBlock.tsx#L14)

___

### GroupBlock

▸ **GroupBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IGroupBlock`](../interfaces/10up_headless_core.react.IGroupBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/GroupBlock.tsx:17](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/GroupBlock.tsx#L17)

___

### HeadingBlock

▸ **HeadingBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IHeadingBlock`](../interfaces/10up_headless_core.react.IHeadingBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/HeadingBlock.tsx:12](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/HeadingBlock.tsx#L12)

___

### ImageBlock

▸ **ImageBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IImageBlock`](../interfaces/10up_headless_core.react.IImageBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/ImageBlock.tsx:19](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/ImageBlock.tsx#L19)

___

### ListBlock

▸ **ListBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IListBlock`](../interfaces/10up_headless_core.react.IListBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/ListBlock.tsx:12](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/ListBlock.tsx#L12)

___

### MediaTextBlock

▸ **MediaTextBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IMediaTextBlock`](../interfaces/10up_headless_core.react.IMediaTextBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/MediaTextBlock.tsx:22](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/MediaTextBlock.tsx#L22)

___

### Menu

▸ **Menu**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `MenuProps` |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/components/Menu.tsx:109](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/Menu.tsx#L109)

___

### MenuItems

▸ **MenuItems**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`MenuItemsProp`](10up_headless_core.react.md#menuitemsprop) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/components/Menu.tsx:54](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/Menu.tsx#L54)

___

### ParagraphBlock

▸ **ParagraphBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IParagraphBlock`](../interfaces/10up_headless_core.react.IParagraphBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/ParagraphBlock.tsx:13](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/ParagraphBlock.tsx#L13)

___

### PreformattedBlock

▸ **PreformattedBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IPreformattedBlock`](../interfaces/10up_headless_core.react.IPreformattedBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/PreformatedBlock.tsx:11](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/PreformatedBlock.tsx#L11)

___

### PullQuoteBlock

▸ **PullQuoteBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IPullQuotekBlock`](../interfaces/10up_headless_core.react.IPullQuotekBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/PullQuote.tsx:15](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/PullQuote.tsx#L15)

___

### QuoteBlock

▸ **QuoteBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IQuoteBlock`](../interfaces/10up_headless_core.react.IQuoteBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/QuoteBlock.tsx:10](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/QuoteBlock.tsx#L10)

___

### SeparatorBlock

▸ **SeparatorBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ISeparatorBlock`](../interfaces/10up_headless_core.react.ISeparatorBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/SeparatorBlock.tsx:10](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/SeparatorBlock.tsx#L10)

___

### SettingsProvider

▸ **SettingsProvider**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`<`ProviderProps`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/index.d.ts:543

___

### SpacerBlock

▸ **SpacerBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ISpacerBlock`](../interfaces/10up_headless_core.react.ISpacerBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/SpacerBlock.tsx:12](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/SpacerBlock.tsx#L12)

___

### TableBlock

▸ **TableBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ITableBlock`](../interfaces/10up_headless_core.react.ITableBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/TableBlock.tsx:12](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/TableBlock.tsx#L12)

___

### ThemeSettingsProvider

▸ **ThemeSettingsProvider**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`<`ProviderProps`\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/index.d.ts:543

___

### VerseBlock

▸ **VerseBlock**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`IVerseBlock`](../interfaces/10up_headless_core.react.IVerseBlock.md) |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/VerseBlock.tsx:11](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/VerseBlock.tsx#L11)

___

### YoutubeLiteBlock

▸ **YoutubeLiteBlock**(`props`): `Element`

Renders Youtube embeds with lite-youtube-embed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | The Block props |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/blocks/YoutubeLiteBlock.tsx:32](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/YoutubeLiteBlock.tsx#L32)

___

### useBlock

▸ **useBlock**<`T`\>(`node`): `Object`

Returns the block name and attributes

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `IBlockAttributes` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Element` | DomNode |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `attributes` | `T` |
| `className` | `string` |
| `name` | `string` |

#### Defined in

[packages/core/src/react/blocks/hooks/useBlock.ts:30](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/hooks/useBlock.ts#L30)

___

### useBlockAlign

▸ **useBlockAlign**(`node`): `Align`

Returns the block align style (if avaliable)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Element` | DomNode |

#### Returns

`Align`

#### Defined in

[packages/core/src/react/blocks/hooks/useBlockAlign.ts:16](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/hooks/useBlockAlign.ts#L16)

___

### useBlockAttributes

▸ **useBlockAttributes**(`node`): `Object`

useBlockAttributes hooks returns the block attributes for a given block based on what it supports

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Element` | The reference to the dom node of the block |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `align` | `Align` |
| `blockStyle` | `string` |
| `border` | `Border` |
| `colors` | `Colors` |
| `spacing` | `Spacing` |
| `typography` | `Typography` |
| `width` | `undefined` \| `string` |

#### Defined in

[packages/core/src/react/blocks/hooks/useBlockAttributes.ts:18](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/hooks/useBlockAttributes.ts#L18)

___

### useBlockBorder

▸ **useBlockBorder**(`node`): `Border`

Returns the block style (if avaliable)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Element` | DomNode |

#### Returns

`Border`

#### Defined in

[packages/core/src/react/blocks/hooks/useBlockBorder.ts:17](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/hooks/useBlockBorder.ts#L17)

___

### useBlockColors

▸ **useBlockColors**(`node`): `Colors`

Returns the block style (if avaliable)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Element` | DomNode |

#### Returns

`Colors`

#### Defined in

[packages/core/src/react/blocks/hooks/useBlockColors.ts:25](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/hooks/useBlockColors.ts#L25)

___

### useBlockSpacing

▸ **useBlockSpacing**(`node`): `Spacing`

Returns the block style (if avaliable)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Element` | DomNode |

#### Returns

`Spacing`

#### Defined in

[packages/core/src/react/blocks/hooks/useBlockSpacing.ts:21](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/hooks/useBlockSpacing.ts#L21)

___

### useBlockStyle

▸ **useBlockStyle**(`node`): `string`

Returns the block style (if avaliable)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Element` | DomNode |

#### Returns

`string`

#### Defined in

[packages/core/src/react/blocks/hooks/useBlockStyle.ts:10](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/hooks/useBlockStyle.ts#L10)

___

### useBlockTypography

▸ **useBlockTypography**(`node`): `Typography`

Returns the block style (if avaliable)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Element` | DomNode |

#### Returns

`Typography`

#### Defined in

[packages/core/src/react/blocks/hooks/useBlockTypography.ts:24](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/hooks/useBlockTypography.ts#L24)

___

### useBlockWidth

▸ **useBlockWidth**(`node`): `undefined` \| `string`

Returns the block style (if avaliable)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Element` | DomNode |

#### Returns

`undefined` \| `string`

#### Defined in

[packages/core/src/react/blocks/hooks/useBlockWidth.ts:16](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/blocks/hooks/useBlockWidth.ts#L16)

___

### useFetchAuthorArchive

▸ **useFetchAuthorArchive**(`params?`, `options?`, `path?`): [`usePostsResponse`](../interfaces/10up_headless_core.react.usePostsResponse.md)

The useFetchAuthorArchive hook

See useAuthorArchive

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `params` | [`PostsArchiveParams`](../interfaces/10up_headless_core.PostsArchiveParams.md) | `{}` | The list of params to pass to the fetch strategy. It overrides the ones in the URL. |
| `options` | [`FetchHookOptions`](../interfaces/10up_headless_core.react.FetchHookOptions.md)<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)[]\>\> | `{}` | The options to pass to the swr hook. |
| `path` | `string` | `''` | The path of the url to get url params from. |

#### Returns

[`usePostsResponse`](../interfaces/10up_headless_core.react.usePostsResponse.md)

#### Defined in

[packages/core/src/react/hooks/useFetchAuthorArchive.ts:22](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/hooks/useFetchAuthorArchive.ts#L22)

___

### useFetchPost

▸ **useFetchPost**(`params?`, `options?`, `path?`): [`usePostResponse`](../interfaces/10up_headless_core.react.usePostResponse.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `params` | [`PostParams`](../interfaces/10up_headless_core.PostParams.md) | `{}` |
| `options` | [`FetchHookOptions`](../interfaces/10up_headless_core.react.FetchHookOptions.md)<[`FetchResponse`](../interfaces/10up_headless_core.FetchResponse.md)<[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)\>\> | `{}` |
| `path` | `string` | `''` |

#### Returns

[`usePostResponse`](../interfaces/10up_headless_core.react.usePostResponse.md)

#### Defined in

[packages/core/src/react/hooks/useFetchPost.ts:30](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/hooks/useFetchPost.ts#L30)

___

### useSettings

▸ **useSettings**(): `Partial`<[`SettingsContextProps`](10up_headless_core.react.md#settingscontextprops)\>

#### Returns

`Partial`<[`SettingsContextProps`](10up_headless_core.react.md#settingscontextprops)\>

#### Defined in

[packages/core/src/react/provider/useSettings.ts:4](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/provider/useSettings.ts#L4)

___

### useThemeSetting

▸ **useThemeSetting**(`path`, `blockName?`, `defaultValue?`): `any`

Returns a single theme setting normalized

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string` | `undefined` | The path to the setting |
| `blockName` | ``null`` \| `string` | `''` | The block name |
| `defaultValue` | `any` | `''` | - |

#### Returns

`any`

#### Defined in

[packages/core/src/react/provider/useThemeSetting.ts:20](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/provider/useThemeSetting.ts#L20)

___

### useThemeSettings

▸ **useThemeSettings**(): `undefined` \| [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md) & { `blocks?`: { `core/archives?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/audio?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/block?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/button?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/buttons?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/calendar?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/categories?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/code?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/column?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/columns?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-author-avatar?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-author-name?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-content?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-date?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-edit-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-reply-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-template?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comments-query-loop?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/cover?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/embed?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/file?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/freeform?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/gallery?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/group?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/heading?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/home-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/html?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/image?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/latest-comments?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/latest-posts?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/legacy-widget?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/list?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/loginout?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/media-text?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/missing?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/more?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/navigation?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/navigation-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/nextpage?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/page-list?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/paragraph?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-author?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-comments?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-comments-count?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-comments-form?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-comments-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-content?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-date?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-excerpt?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-featured-image?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-navigation-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-template?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-terms?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-title?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/preformatted?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/pullquote?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/query?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/query-pagination?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/query-pagination-next?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/query-pagination-numbers?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/query-pagination-previous?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/query-title?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/quote?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/rss?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/search?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/separator?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/shortcode?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/site-logo?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/site-tagline?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/site-title?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/social-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/social-links?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/spacer?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/table?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/table-of-contents?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/tag-cloud?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/template-part?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/term-description?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/text-columns?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/verse?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/video?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/widget-area?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/widget-group?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete)  } ; `border?`: { `color?`: `boolean` ; `radius?`: `boolean` ; `style?`: `boolean` ; `width?`: `boolean`  } ; `color?`: { `background?`: `boolean` ; `custom?`: `boolean` ; `customDuotone?`: `boolean` ; `customGradient?`: `boolean` ; `defaultGradients?`: `boolean` ; `defaultPalette?`: `boolean` ; `duotone?`: { `colors`: `string`[] ; `name`: `string` ; `slug`: `string`  }[] ; `gradients?`: { `gradient`: `string` ; `name`: `string` ; `slug`: `string`  }[] ; `link?`: `boolean` ; `palette?`: { `color`: `string` ; `name`: `string` ; `slug`: `string`  }[] ; `text?`: `boolean`  } ; `custom?`: { `[k: string]`: `string` \| `number` \| [`SettingsCustomAdditionalProperties`](../interfaces/10up_headless_core.react.SettingsCustomAdditionalProperties.md);  } ; `layout?`: { `contentSize?`: `string` ; `wideSize?`: `string`  } ; `spacing?`: { `blockGap?`: ``null`` \| `boolean` ; `margin?`: `boolean` ; `padding?`: `boolean` ; `units?`: `string`[]  } ; `typography?`: { `customFontSize?`: `boolean` ; `dropCap?`: `boolean` ; `fontFamilies?`: { `fontFamily?`: `string` ; `name?`: `string` ; `slug?`: `string`  }[] ; `fontSizes?`: { `name?`: `string` ; `size?`: `string` ; `slug?`: `string`  }[] ; `fontStyle?`: `boolean` ; `fontWeight?`: `boolean` ; `letterSpacing?`: `boolean` ; `lineHeight?`: `boolean` ; `textDecoration?`: `boolean` ; `textTransform?`: `boolean`  }  }

Returns the raw theme.json settings definitions

#### Returns

`undefined` \| [`SettingsProperties`](../interfaces/10up_headless_core.react.SettingsProperties.md) & { `blocks?`: { `core/archives?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/audio?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/block?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/button?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/buttons?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/calendar?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/categories?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/code?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/column?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/columns?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-author-avatar?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-author-name?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-content?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-date?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-edit-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-reply-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comment-template?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/comments-query-loop?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/cover?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/embed?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/file?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/freeform?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/gallery?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/group?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/heading?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/home-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/html?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/image?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/latest-comments?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/latest-posts?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/legacy-widget?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/list?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/loginout?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/media-text?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/missing?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/more?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/navigation?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/navigation-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/nextpage?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/page-list?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/paragraph?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-author?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-comments?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-comments-count?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-comments-form?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-comments-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-content?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-date?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-excerpt?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-featured-image?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-navigation-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-template?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-terms?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/post-title?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/preformatted?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/pullquote?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/query?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/query-pagination?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/query-pagination-next?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/query-pagination-numbers?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/query-pagination-previous?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/query-title?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/quote?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/rss?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/search?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/separator?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/shortcode?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/site-logo?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/site-tagline?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/site-title?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/social-link?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/social-links?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/spacer?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/table?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/table-of-contents?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/tag-cloud?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/template-part?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/term-description?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/text-columns?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/verse?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/video?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/widget-area?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete) ; `core/widget-group?`: [`SettingsPropertiesComplete`](10up_headless_core.react.md#settingspropertiescomplete)  } ; `border?`: { `color?`: `boolean` ; `radius?`: `boolean` ; `style?`: `boolean` ; `width?`: `boolean`  } ; `color?`: { `background?`: `boolean` ; `custom?`: `boolean` ; `customDuotone?`: `boolean` ; `customGradient?`: `boolean` ; `defaultGradients?`: `boolean` ; `defaultPalette?`: `boolean` ; `duotone?`: { `colors`: `string`[] ; `name`: `string` ; `slug`: `string`  }[] ; `gradients?`: { `gradient`: `string` ; `name`: `string` ; `slug`: `string`  }[] ; `link?`: `boolean` ; `palette?`: { `color`: `string` ; `name`: `string` ; `slug`: `string`  }[] ; `text?`: `boolean`  } ; `custom?`: { `[k: string]`: `string` \| `number` \| [`SettingsCustomAdditionalProperties`](../interfaces/10up_headless_core.react.SettingsCustomAdditionalProperties.md);  } ; `layout?`: { `contentSize?`: `string` ; `wideSize?`: `string`  } ; `spacing?`: { `blockGap?`: ``null`` \| `boolean` ; `margin?`: `boolean` ; `padding?`: `boolean` ; `units?`: `string`[]  } ; `typography?`: { `customFontSize?`: `boolean` ; `dropCap?`: `boolean` ; `fontFamilies?`: { `fontFamily?`: `string` ; `name?`: `string` ; `slug?`: `string`  }[] ; `fontSizes?`: { `name?`: `string` ; `size?`: `string` ; `slug?`: `string`  }[] ; `fontStyle?`: `boolean` ; `fontWeight?`: `boolean` ; `letterSpacing?`: `boolean` ; `lineHeight?`: `boolean` ; `textDecoration?`: `boolean` ; `textTransform?`: `boolean`  }  }

#### Defined in

[packages/core/src/react/provider/useThemeSettings.ts:9](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/provider/useThemeSettings.ts#L9)

___

### useThemeStyles

▸ **useThemeStyles**(): `undefined` \| [`StylesProperties`](../interfaces/10up_headless_core.react.StylesProperties.md) & { `blocks?`: { `core/archives?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/audio?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/block?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/button?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/buttons?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/calendar?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/categories?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/code?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/column?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/columns?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-author-avatar?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-author-name?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-content?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-date?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-edit-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-reply-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-template?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comments-query-loop?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/cover?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/embed?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/file?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/freeform?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/gallery?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/group?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/heading?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/home-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/html?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/image?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/latest-comments?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/latest-posts?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/legacy-widget?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/list?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/loginout?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/media-text?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/missing?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/more?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/navigation?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/navigation-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/nextpage?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/page-list?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/paragraph?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-author?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-comments?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-comments-count?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-comments-form?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-comments-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-content?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-date?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-excerpt?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-featured-image?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-navigation-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-template?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-terms?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-title?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/preformatted?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/pullquote?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/query?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/query-pagination?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/query-pagination-next?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/query-pagination-numbers?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/query-pagination-previous?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/query-title?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/quote?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/rss?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/search?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/separator?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/shortcode?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/site-logo?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/site-tagline?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/site-title?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/social-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/social-links?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/spacer?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/table?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/table-of-contents?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/tag-cloud?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/template-part?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/term-description?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/text-columns?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/verse?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/video?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/widget-area?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/widget-group?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete)  } ; `border?`: `unknown` ; `color?`: `unknown` ; `elements?`: { `h1?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete) ; `h2?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete) ; `h3?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete) ; `h4?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete) ; `h5?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete) ; `h6?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete) ; `link?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete)  } ; `spacing?`: `unknown` ; `typography?`: `unknown`  }

Returns the theme.json styles definitions

#### Returns

`undefined` \| [`StylesProperties`](../interfaces/10up_headless_core.react.StylesProperties.md) & { `blocks?`: { `core/archives?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/audio?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/block?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/button?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/buttons?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/calendar?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/categories?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/code?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/column?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/columns?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-author-avatar?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-author-name?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-content?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-date?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-edit-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-reply-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comment-template?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/comments-query-loop?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/cover?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/embed?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/file?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/freeform?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/gallery?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/group?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/heading?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/home-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/html?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/image?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/latest-comments?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/latest-posts?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/legacy-widget?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/list?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/loginout?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/media-text?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/missing?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/more?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/navigation?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/navigation-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/nextpage?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/page-list?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/paragraph?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-author?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-comments?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-comments-count?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-comments-form?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-comments-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-content?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-date?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-excerpt?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-featured-image?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-navigation-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-template?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-terms?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/post-title?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/preformatted?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/pullquote?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/query?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/query-pagination?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/query-pagination-next?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/query-pagination-numbers?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/query-pagination-previous?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/query-title?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/quote?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/rss?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/search?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/separator?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/shortcode?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/site-logo?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/site-tagline?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/site-title?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/social-link?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/social-links?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/spacer?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/table?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/table-of-contents?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/tag-cloud?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/template-part?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/term-description?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/text-columns?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/verse?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/video?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/widget-area?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete) ; `core/widget-group?`: [`StylesPropertiesAndElementsComplete`](10up_headless_core.react.md#stylespropertiesandelementscomplete)  } ; `border?`: `unknown` ; `color?`: `unknown` ; `elements?`: { `h1?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete) ; `h2?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete) ; `h3?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete) ; `h4?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete) ; `h5?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete) ; `h6?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete) ; `link?`: [`StylesPropertiesComplete`](10up_headless_core.react.md#stylespropertiescomplete)  } ; `spacing?`: `unknown` ; `typography?`: `unknown`  }

#### Defined in

[packages/core/src/react/provider/useThemeStyles.ts:9](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/provider/useThemeStyles.ts#L9)

## React Components

### BlocksRenderer

▸ **BlocksRenderer**(`props`): `Element`

The `BlocksRenderer` components provides an easy way to convert HTML markup into corresponding
React components.

The `BlocksRenderer` component takes in arbitrary html markup and receives a list of react components
as children that allows replacing dom nodes with React Components.

The html prop is sanitized through [wpKsesPost](../modules/10up_headless_core.md#wpksespost) so it's safe for rendering arbitrary html markup.

The children components must implement the [BlockProps](../interfaces/10up_headless_core.react.BlockProps.md) interface

## Usage

### Usage with the test function

{@codeblock ~~/examples/core/BlocksRenderer.tsx#test-function}

### Usage with classList and tagName props

{@codeblock ~~/examples/core/BlocksRenderer.tsx#props}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`BlockRendererProps`](../interfaces/10up_headless_core.react.BlockRendererProps.md) | Component properties |

#### Returns

`Element`

#### Defined in

[packages/core/src/react/components/BlocksRenderer.tsx:157](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/react/components/BlocksRenderer.tsx#L157)
