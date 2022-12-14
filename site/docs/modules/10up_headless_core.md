---
id: "10up_headless_core"
title: "Module: @10up/headless-core"
sidebar_label: "@10up/headless-core"
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [react](../namespaces/10up_headless_core.react.md)

## Classes

- [AbstractFetchStrategy](../classes/10up_headless_core.AbstractFetchStrategy.md)
- [AppSettingsStrategy](../classes/10up_headless_core.AppSettingsStrategy.md)
- [AuthorArchiveFetchStrategy](../classes/10up_headless_core.AuthorArchiveFetchStrategy.md)
- [ConfigError](../classes/10up_headless_core.ConfigError.md)
- [EndpointError](../classes/10up_headless_core.EndpointError.md)
- [FetchError](../classes/10up_headless_core.FetchError.md)
- [FrameworkError](../classes/10up_headless_core.FrameworkError.md)
- [NotFoundError](../classes/10up_headless_core.NotFoundError.md)
- [PostsArchiveFetchStrategy](../classes/10up_headless_core.PostsArchiveFetchStrategy.md)
- [SearchFetchStrategy](../classes/10up_headless_core.SearchFetchStrategy.md)
- [SinglePostFetchStrategy](../classes/10up_headless_core.SinglePostFetchStrategy.md)
- [TaxonomyTermsStrategy](../classes/10up_headless_core.TaxonomyTermsStrategy.md)
- [VerifyTokenFetchStrategy](../classes/10up_headless_core.VerifyTokenFetchStrategy.md)

## Interfaces

- [AppEntity](../interfaces/10up_headless_core.AppEntity.md)
- [AttachmentEntity](../interfaces/10up_headless_core.AttachmentEntity.md)
- [AuthorEntity](../interfaces/10up_headless_core.AuthorEntity.md)
- [AvatarUrls](../interfaces/10up_headless_core.AvatarUrls.md)
- [CommentEntity](../interfaces/10up_headless_core.CommentEntity.md)
- [EndpointParams](../interfaces/10up_headless_core.EndpointParams.md)
- [Entity](../interfaces/10up_headless_core.Entity.md)
- [FetchOptions](../interfaces/10up_headless_core.FetchOptions.md)
- [FetchResponse](../interfaces/10up_headless_core.FetchResponse.md)
- [FilterDataOptions](../interfaces/10up_headless_core.FilterDataOptions.md)
- [MenuItemEntity](../interfaces/10up_headless_core.MenuItemEntity.md)
- [PageEntity](../interfaces/10up_headless_core.PageEntity.md)
- [PageInfo](../interfaces/10up_headless_core.PageInfo.md)
- [PostEntity](../interfaces/10up_headless_core.PostEntity.md)
- [PostParams](../interfaces/10up_headless_core.PostParams.md)
- [PostTypeEntity](../interfaces/10up_headless_core.PostTypeEntity.md)
- [PostsArchiveParams](../interfaces/10up_headless_core.PostsArchiveParams.md)
- [RevisionEntity](../interfaces/10up_headless_core.RevisionEntity.md)
- [SearchEntity](../interfaces/10up_headless_core.SearchEntity.md)
- [TaxonomyArchiveParams](../interfaces/10up_headless_core.TaxonomyArchiveParams.md)
- [TaxonomyEntity](../interfaces/10up_headless_core.TaxonomyEntity.md)
- [TermEntity](../interfaces/10up_headless_core.TermEntity.md)
- [TypeEntity](../interfaces/10up_headless_core.TypeEntity.md)
- [VerifyTokenParams](../interfaces/10up_headless_core.VerifyTokenParams.md)

## DOM Helpers

### isAnchorTag

▸ **isAnchorTag**(`node`, `options?`, `site?`): node is Element

Checks if the provided node is an valid anchor tag

This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
the underlying parser used by BlocksRenderer.

## Usage

```tsx
import { isAnchorTag } from '@10up/headless-core';
import { LinkBlock } from '@10up/headless-next';

<BlocksRenderer html={html}>
 	<LinkBlock test={(node) => isAnchorTag(node, { isInternalLink: true})} />
</BlocksRenderer>
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `node` | `DOMNode` | `undefined` | The node to test |
| `options` | [`isAnchorTagOptions`](10up_headless_core.md#isanchortagoptions) | `{}` | Supported options |
| `site` | `undefined` \| [`HeadlessConfig`](10up_headless_core.md#headlessconfig) | `undefined` | - |

#### Returns

node is Element

Whether it's a anchor tag accoriding to the options passed

#### Defined in

[packages/core/src/dom/index.ts:59](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/dom/index.ts#L59)

___

### isBlock

▸ **isBlock**(`node`, `_options`): `boolean`

Tests a node by tagName and/or className

This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
the underlying parser used by BlocksRenderer.

## Usage

```tsx
import { isBlock } from '@10up/headless-core';

<BlocksRenderer html={html}>
 	<MyCustomBlock
			test={(node) => isBlock(node, { tagName: 'div', classList: ['block-class-name'] })}
		/>
</BlocksRenderer>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `DOMNode` | The node to test |
| `_options` | [`isBlockOptions`](10up_headless_core.md#isblockoptions) | - |

#### Returns

`boolean`

true if the node passes the test

#### Defined in

[packages/core/src/dom/index.ts:259](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/dom/index.ts#L259)

___

### isBlockByName

▸ **isBlockByName**(`node`, `name`): `boolean`

Tests a node by block name. This requires the Headless WP Plugin to be installed.

The Headless WP Plugin will append `data-wp-block-name` and `data-wp-block` to every block,
this function relies on those attributes to determine if the node is a block.

This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
the underlying parser used by BlocksRenderer.

## Usage

```tsx
import { isBlockByName } from '@10up/headless-core';

<BlocksRenderer html={html}>
 	<MyCustomBlock
			test={(node) => isBlock(node, 'core/paragraph')}
		/>
</BlocksRenderer>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `DOMNode` | The node to test |
| `name` | `string` | The block name |

#### Returns

`boolean`

true if the node passes the test

#### Defined in

[packages/core/src/dom/index.ts:315](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/dom/index.ts#L315)

___

### isImageTag

▸ **isImageTag**(`node`, `options?`): `string` \| `boolean`

Checks if the provided node is an valid image tag

This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
the underlying parser used by BlocksRenderer.

## Usage

```tsx
import { isImageTag, ImageBlock } from '@10up/headless-core';
import { ImageComponent } from '@10up/headless-next';

<BlocksRenderer html={html}>
 	<ImageBlock
			test={(node) => isImageTag(node, { hasDimensions: true})}
			component={ImageComponent}
		/>
</BlocksRenderer>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `DOMNode` | The node to test |
| `options` | [`isImageTagOptions`](10up_headless_core.md#isimagetagoptions) | Supported options. |

#### Returns

`string` \| `boolean`

Whether it's an image tag or not according to the options passed

#### Defined in

[packages/core/src/dom/index.ts:123](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/dom/index.ts#L123)

___

### isTwitterEmbed

▸ **isTwitterEmbed**(`node`): `boolean`

Checks if the node is an twitter embed

This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
the underlying parser used by BlocksRenderer.

## Usage

```tsx
import { isTwitterEmbed } from '@10up/headless-core';

<BlocksRenderer html={html}>
 	<MyTwitterBlock
			test={isTwitterEmbed}
		/>
</BlocksRenderer>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `DOMNode` | The node to test |

#### Returns

`boolean`

true if the node is a twitter embed

#### Defined in

[packages/core/src/dom/index.ts:209](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/dom/index.ts#L209)

___

### isYoutubeEmbed

▸ **isYoutubeEmbed**(`node`): `boolean`

Checks if the node is an youtube embed

This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
the underlying parser used by BlocksRenderer.

## Usage

```tsx
import { isYoutubeEmbed } from '@10up/headless-core';

<BlocksRenderer html={html}>
 	<MyYoutubeBlock
			test={isYoutubeEmbed}
		/>
</BlocksRenderer>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `DOMNode` | The node to test |

#### Returns

`boolean`

true if the node is a youtube embed

#### Defined in

[packages/core/src/dom/index.ts:169](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/dom/index.ts#L169)

___

### wpKsesPost

▸ **wpKsesPost**(`content`, `allowList?`, `options?`): `string`

Sanitize HTML content by the wp_kses_post() requirements

## Usage

```tsx
import { wpKsesPost } from '@10up/headless-core';
wpKsesPost(html);
```

**`See`**

https://codex.wordpress.org/Function_Reference/wp_kses_post

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` | The content to sanitize. |
| `allowList?` | `IWhiteList` | Optional. The list of allowed HTML tags and attributes. If not set, the default allow list will be used. |
| `options?` | `IFilterXSSOptions` | Optional. IFilterXSSOptions. |

#### Returns

`string`

Sanitized string of HTML.

#### Defined in

[packages/core/src/dom/wpKsesPost.ts:25](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/dom/wpKsesPost.ts#L25)

## Data Fetching

### apiGet

▸ **apiGet**(`url`, `args?`, `withMinute?`): `Promise`<{ `headers`: { `[index: string]`: `any`;  } = receivedHeaders; `json`: `any`  }\>

Fetch Wrapper to handle GET requests.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `url` | `string` | `undefined` | The URL where to make the request to |
| `args` | `Object` | `{}` | The arguments |
| `withMinute` | `boolean` | `false` | Whether it should burst cahcing on every minute |

#### Returns

`Promise`<{ `headers`: { `[index: string]`: `any`;  } = receivedHeaders; `json`: `any`  }\>

#### Defined in

[packages/core/src/data/api/fetch-utils.ts:40](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/api/fetch-utils.ts#L40)

___

### apiPost

▸ **apiPost**(`url`, `args?`): `Promise`<`any`\>

Fetch Wrapper to handle POST requests

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL where to make the request to |
| `args` | `Object` | The arguments |

#### Returns

`Promise`<`any`\>

#### Defined in

[packages/core/src/data/api/fetch-utils.ts:17](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/api/fetch-utils.ts#L17)

## Data Handling

### getPostAuthor

▸ **getPostAuthor**(`post`): [`AuthorEntity`](../interfaces/10up_headless_core.AuthorEntity.md)[]

Returns the author object from the post object if it exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `post` | [`PostEntity`](../interfaces/10up_headless_core.PostEntity.md) | The Post object |

#### Returns

[`AuthorEntity`](../interfaces/10up_headless_core.AuthorEntity.md)[]

#### Defined in

[packages/core/src/data/utils/postHandling.ts:11](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/utils/postHandling.ts#L11)

___

### getPostTerms

▸ **getPostTerms**(`post`): `Record`<`string`, [`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\>

Returns the terms assoiacted with the post

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `post` | [`PostEntity`](../interfaces/10up_headless_core.PostEntity.md) | The Post object |

#### Returns

`Record`<`string`, [`TermEntity`](../interfaces/10up_headless_core.TermEntity.md)[]\>

#### Defined in

[packages/core/src/data/utils/postHandling.ts:22](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/utils/postHandling.ts#L22)

## Other

### CustomPostTypes

Ƭ **CustomPostTypes**: { `archive?`: `string` ; `endpoint`: `string` ; `single?`: `string` ; `slug`: `string`  }[]

#### Defined in

[packages/core/src/types.ts:1](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/types.ts#L1)

___

### CustomTaxonomies

Ƭ **CustomTaxonomies**: { `endpoint`: `string` ; `restParam?`: `string` ; `rewrite?`: `string` ; `slug`: `string`  }[]

#### Defined in

[packages/core/src/types.ts:8](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/types.ts#L8)

___

### HeadlessConfig

Ƭ **HeadlessConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `customPostTypes?` | [`CustomPostTypes`](10up_headless_core.md#customposttypes) |
| `customTaxonomies?` | [`CustomTaxonomies`](10up_headless_core.md#customtaxonomies) |
| `host?` | `string` |
| `hostUrl?` | `string` |
| `locale?` | `string` |
| `redirectStrategy?` | [`RedirectStrategy`](10up_headless_core.md#redirectstrategy) |
| `sites?` | [`HeadlessConfig`](10up_headless_core.md#headlessconfig)[] |
| `sourceUrl?` | `string` |
| `useWordPressPlugin?` | `boolean` |

#### Defined in

[packages/core/src/types.ts:15](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/types.ts#L15)

___

### Matcher

Ƭ **Matcher**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `pattern` | `string` |
| `priority` | `number` |

#### Defined in

[packages/core/src/data/utils/matchers.ts:1](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/utils/matchers.ts#L1)

___

### QueriedObject

Ƭ **QueriedObject**: `Object`

The QueriedObject represents the object that the current requests is subjected to.

Quering by taxonomy and/or author will set the queried object.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `author?` | [`AuthorEntity`](../interfaces/10up_headless_core.AuthorEntity.md) | If the request is an author query, this will be populated with the author object |
| `search?` | [`SearchEntity`](../interfaces/10up_headless_core.SearchEntity.md) | If the request is an search query, this will be populated with the search entiry object |
| `term?` | [`TermEntity`](../interfaces/10up_headless_core.TermEntity.md) | If the request is an term query, this will be populated with the term object |

#### Defined in

[packages/core/src/data/types/entities.ts:703](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L703)

___

### Redirect

Ƭ **Redirect**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ID` | `number` |
| `enable_regex` | `boolean` |
| `post_status` | `string` |
| `redirect_from` | `string` |
| `redirect_to` | `string` |
| `status_code` | `number` |

#### Defined in

[packages/core/src/data/types/entities.ts:648](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/types/entities.ts#L648)

___

### RedirectData

Ƭ **RedirectData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `location` | `string` \| `undefined` \| ``null`` | The redirect new locaton will be null if no redirect is found |
| `status` | `number` | The status number of the redorect Will be 0 if the redirect is not found |

#### Defined in

[packages/core/src/utils/fetchRedirect.ts:3](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/fetchRedirect.ts#L3)

___

### RedirectStrategy

Ƭ **RedirectStrategy**: ``"404"`` \| ``"none"`` \| ``"always"``

#### Defined in

[packages/core/src/types.ts:7](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/types.ts#L7)

___

### isAnchorTagOptions

Ƭ **isAnchorTagOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `isInternalLink?` | `boolean` | If true, will check if the anchor tag contains a valid internal link. if target="_blank" then this option is not taken into account |

#### Defined in

[packages/core/src/dom/index.ts:5](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/dom/index.ts#L5)

___

### isBlockOptions

Ƭ **isBlockOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `className?` | `string` \| `string`[] | A single or array of classNames to check for If an array of class names is passed, the block will be considered valid if all of the class names are found |
| `tagName?` | `string` | The tagName to check for |

#### Defined in

[packages/core/src/dom/index.ts:220](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/dom/index.ts#L220)

___

### isImageTagOptions

Ƭ **isImageTagOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hasDimensions?` | `boolean` | If true, will check if the image tag contains wdith and height attributes |

#### Defined in

[packages/core/src/dom/index.ts:89](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/dom/index.ts#L89)

___

### removeSourceUrlType

Ƭ **removeSourceUrlType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `backendUrl` | `string` | The backend url. |
| `link` | `string` | The link url, possibly with the source url. |
| `publicUrl?` | `string` | The public url. Defaults to '/'. |

#### Defined in

[packages/core/src/utils/removeSourceUrl.ts:1](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/removeSourceUrl.ts#L1)

___

### authorArchivesMatchers

• `Const` **authorArchivesMatchers**: [`Matcher`](10up_headless_core.md#matcher)[]

#### Defined in

[packages/core/src/data/utils/matchers.ts:43](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/utils/matchers.ts#L43)

___

### endpoints

• `Const` **endpoints**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `appSettings` | `string` |
| `category` | `string` |
| `pages` | `string` |
| `posts` | `string` |
| `tags` | `string` |
| `tokenVerify` | `string` |
| `yoast` | `string` |

#### Defined in

[packages/core/src/data/utils/endpoints.ts:1](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/utils/endpoints.ts#L1)

___

### ksesAllowedList

• `Const` **ksesAllowedList**: `IWhiteList`

Default Allowed HTML Attributes

**`See`**

https://codex.wordpress.org/Function_Reference/wp_kses_post

#### Defined in

[packages/core/src/dom/wpKsesPost.ts:72](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/dom/wpKsesPost.ts#L72)

___

### postMatchers

• `Const` **postMatchers**: [`Matcher`](10up_headless_core.md#matcher)[]

#### Defined in

[packages/core/src/data/utils/matchers.ts:7](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/utils/matchers.ts#L7)

___

### postsMatchers

• `Const` **postsMatchers**: [`Matcher`](10up_headless_core.md#matcher)[]

#### Defined in

[packages/core/src/data/utils/matchers.ts:20](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/utils/matchers.ts#L20)

___

### searchMatchers

• `Const` **searchMatchers**: [`Matcher`](10up_headless_core.md#matcher)[]

#### Defined in

[packages/core/src/data/utils/matchers.ts:56](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/utils/matchers.ts#L56)

___

### youtubeEmbedRegex

• `Const` **youtubeEmbedRegex**: `RegExp`

#### Defined in

[packages/core/src/dom/index.ts:142](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/dom/index.ts#L142)

___

### addQueryArgs

▸ **addQueryArgs**(`url`, `args`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `args` | `Record`<`string`, `any`\> |

#### Returns

`string`

#### Defined in

[packages/core/src/utils/url.ts:167](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/url.ts#L167)

___

### asyncForEach

▸ **asyncForEach**(`array`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `any`[] |
| `callback` | (`el`: `any`, `index`: `number`, `array`: `any`[]) => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/core/src/utils/asyncForEach.ts:1](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/asyncForEach.ts#L1)

___

### buildQueryString

▸ **buildQueryString**(`data`): `string`

Generates URL-encoded query string using input query data.

It is intended to behave equivalent as PHP's `http_build_query`, configured
with encoding type PHP_QUERY_RFC3986 (spaces as `%20`).

**`Example`**

```js
const queryString = buildQueryString( {
   simple: 'is ok',
   arrays: [ 'are', 'fine', 'too' ],
   objects: {
      evenNested: {
         ok: 'yes',
      },
   },
} );
// "simple=is%20ok&arrays%5B0%5D=are&arrays%5B1%5D=fine&arrays%5B2%5D=too&objects%5BevenNested%5D%5Bok%5D=yes"
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Record`<`string`, `any`\> | Data to encode. |

#### Returns

`string`

Query string.

#### Defined in

[packages/core/src/utils/url.ts:129](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/url.ts#L129)

___

### fetchRedirect

▸ **fetchRedirect**(`pathname`, `sourceUrl`): `Promise`<[`RedirectData`](10up_headless_core.md#redirectdata)\>

Fetches a redirect from the WordPress origin by making a HEAD request and checking the response

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pathname` | `string` | The path to the page to fetch the redirect for |
| `sourceUrl` | `string` | - |

#### Returns

`Promise`<[`RedirectData`](10up_headless_core.md#redirectdata)\>

The redirect data

#### Defined in

[packages/core/src/utils/fetchRedirect.ts:48](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/fetchRedirect.ts#L48)

___

### getAuthHeader

▸ **getAuthHeader**(): ``null``

#### Returns

``null``

#### Defined in

[packages/core/src/data/api/fetch-utils.ts:3](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/api/fetch-utils.ts#L3)

___

### getCustomPostType

▸ **getCustomPostType**(`slug`, `sourceUrl?`): `undefined` \| { `archive?`: `string` ; `endpoint`: `string` ; `single?`: `string` ; `slug`: `string`  }

Returns a single post type by slug if defined

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slug` | `string` | post type slug |
| `sourceUrl?` | `string` | - |

#### Returns

`undefined` \| { `archive?`: `string` ; `endpoint`: `string` ; `single?`: `string` ; `slug`: `string`  }

#### Defined in

[packages/core/src/utils/getHeadlessConfig.ts:235](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/getHeadlessConfig.ts#L235)

___

### getCustomPostTypes

▸ **getCustomPostTypes**(`sourceUrl?`): [`CustomPostTypes`](10up_headless_core.md#customposttypes)

Returns the avaliable post types

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceUrl?` | `string` |

#### Returns

[`CustomPostTypes`](10up_headless_core.md#customposttypes)

#### Defined in

[packages/core/src/utils/getHeadlessConfig.ts:202](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/getHeadlessConfig.ts#L202)

___

### getCustomPostTypesSlugs

▸ **getCustomPostTypesSlugs**(`sourceUrl?`): `string`[]

Returns the avaliable post type slugs

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceUrl?` | `string` |

#### Returns

`string`[]

#### Defined in

[packages/core/src/utils/getHeadlessConfig.ts:189](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/getHeadlessConfig.ts#L189)

___

### getCustomTaxonomies

▸ **getCustomTaxonomies**(`sourceUrl?`): [`CustomTaxonomies`](10up_headless_core.md#customtaxonomies)

Returns the avaliable taxonomies

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceUrl?` | `string` |

#### Returns

[`CustomTaxonomies`](10up_headless_core.md#customtaxonomies)

#### Defined in

[packages/core/src/utils/getHeadlessConfig.ts:145](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/getHeadlessConfig.ts#L145)

___

### getCustomTaxonomy

▸ **getCustomTaxonomy**(`slug`, `sourceUrl?`): `undefined` \| { `endpoint`: `string` ; `restParam?`: `string` ; `rewrite?`: `string` ; `slug`: `string`  }

Returns a single post type by slug if defined

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slug` | `string` | post type slug |
| `sourceUrl?` | `string` | - |

#### Returns

`undefined` \| { `endpoint`: `string` ; `restParam?`: `string` ; `rewrite?`: `string` ; `slug`: `string`  }

#### Defined in

[packages/core/src/utils/getHeadlessConfig.ts:179](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/getHeadlessConfig.ts#L179)

___

### getCustomTaxonomySlugs

▸ **getCustomTaxonomySlugs**(`sourceUrl?`): `string`[]

Returns the avaliable taxonomy slugs

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceUrl?` | `string` |

#### Returns

`string`[]

#### Defined in

[packages/core/src/utils/getHeadlessConfig.ts:132](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/getHeadlessConfig.ts#L132)

___

### getHeadlessConfig

▸ **getHeadlessConfig**(): [`HeadlessConfig`](10up_headless_core.md#headlessconfig)

Returns the contents of headless.config.js

This function requires framework integration in order to work. The contents of `headless.config.js`
needs to be injected at build time into a global variable.

Make sure you are using one of the framework's integration (such as next) before using this function.

#### Returns

[`HeadlessConfig`](10up_headless_core.md#headlessconfig)

The contents of headless.config.js

#### Defined in

[packages/core/src/utils/getHeadlessConfig.ts:16](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/getHeadlessConfig.ts#L16)

___

### getHostUrl

▸ **getHostUrl**(): `string`

Returns the WP URL based on the headless config

#### Returns

`string`

#### Defined in

[packages/core/src/utils/getHeadlessConfig.ts:252](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/getHeadlessConfig.ts#L252)

___

### getQueryArgs

▸ **getQueryArgs**(`url`): `Record`<`string`, `any`\>

Returns an object of query arguments of the given URL. If the given URL is
invalid or has no querystring, an empty object is returned.

**`Example`**

```js
const foo = getQueryArgs( 'https://wordpress.org?foo=bar&bar=baz' );
// { "foo": "bar", "bar": "baz" }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | URL. |

#### Returns

`Record`<`string`, `any`\>

Query args object.

#### Defined in

[packages/core/src/utils/url.ts:78](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/url.ts#L78)

___

### getQueryString

▸ **getQueryString**(`url`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`any`

#### Defined in

[packages/core/src/utils/url.ts:49](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/url.ts#L49)

___

### getSite

▸ **getSite**(`site?`): [`HeadlessConfig`](10up_headless_core.md#headlessconfig)

Get a config for a specific site

#### Parameters

| Name | Type |
| :------ | :------ |
| `site?` | [`HeadlessConfig`](10up_headless_core.md#headlessconfig) |

#### Returns

[`HeadlessConfig`](10up_headless_core.md#headlessconfig)

#### Defined in

[packages/core/src/utils/getHeadlessConfig.ts:62](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/getHeadlessConfig.ts#L62)

___

### getSiteByHost

▸ **getSiteByHost**(`hostOrUrl`, `locale?`): ``null`` \| [`HeadlessConfig`](10up_headless_core.md#headlessconfig)

Finds a site by host and optionally locale

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hostOrUrl` | `string` | The hostname |
| `locale?` | `string` | - |

#### Returns

``null`` \| [`HeadlessConfig`](10up_headless_core.md#headlessconfig)

#### Defined in

[packages/core/src/utils/getHeadlessConfig.ts:84](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/getHeadlessConfig.ts#L84)

___

### getSiteBySourceUrl

▸ **getSiteBySourceUrl**(`sourceUrl`): [`HeadlessConfig`](10up_headless_core.md#headlessconfig)

Get a site by source url

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceUrl` | `string` |

#### Returns

[`HeadlessConfig`](10up_headless_core.md#headlessconfig)

HeadlessConfig

#### Defined in

[packages/core/src/utils/getHeadlessConfig.ts:122](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/getHeadlessConfig.ts#L122)

___

### getWPUrl

▸ **getWPUrl**(): `string`

Returns the WP URL based on the headless config

#### Returns

`string`

#### Defined in

[packages/core/src/utils/getHeadlessConfig.ts:244](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/getHeadlessConfig.ts#L244)

___

### isExternalUrl

▸ **isExternalUrl**(`link`): `boolean`

Checks if the provided link is an external Url.

Inspired on the Frontity implementation

**`See`**

https://github.com/frontity/frontity/blob/dev/packages/components/link/utils.ts

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `link` | `string` | The link Url. |

#### Returns

`boolean`

True if the link is an external Url.

#### Defined in

[packages/core/src/utils/isExternalUrl.ts:12](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/isExternalUrl.ts#L12)

___

### isInternalLink

▸ **isInternalLink**(`url`, `site?`): `boolean`

Checks if the url is for an internal link

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The url to check |
| `site?` | [`HeadlessConfig`](10up_headless_core.md#headlessconfig) | - |

#### Returns

`boolean`

#### Defined in

[packages/core/src/utils/isInternalLink.ts:13](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/isInternalLink.ts#L13)

___

### removeFieldsFromPostRelatedData

▸ **removeFieldsFromPostRelatedData**(`fieldsToRemove`, `post`): [`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fieldsToRemove` | (`string` \| `number`)[] |
| `post` | [`PostEntity`](../interfaces/10up_headless_core.PostEntity.md) |

#### Returns

[`PostEntity`](../interfaces/10up_headless_core.PostEntity.md)

#### Defined in

[packages/core/src/data/utils/postHandling.ts:47](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/utils/postHandling.ts#L47)

___

### removeSourceUrl

▸ **removeSourceUrl**(`«destructured»`): `string`

Make the link relative if it belongs to the backend, to force client-side
navigation.

Inspired on the Frontity implementation

**`See`**

https://github.com/frontity/frontity/blob/dev/packages/components/link/utils.ts

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`removeSourceUrlType`](10up_headless_core.md#removesourceurltype) |

#### Returns

`string`

The URL without the Source URL.

#### Defined in

[packages/core/src/utils/removeSourceUrl.ts:28](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/removeSourceUrl.ts#L28)

___

### warn

▸ **warn**(`message`): `void`

Logs a warning in the console in dev mode

**`Example`**

```ts
warn("You should do/change something.")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message that describes the warning. |

#### Returns

`void`

#### Defined in

[packages/core/src/utils/errors.ts:45](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/utils/errors.ts#L45)

## Utility Functions

### parsePath

▸ **parsePath**(`matchers`, `path`): `Record`<`string`, `string`\>

Parses a path and extracts the parameters from it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matchers` | [`Matcher`](10up_headless_core.md#matcher)[] | An array of Matchers |
| `path` | `string` | The path |

#### Returns

`Record`<`string`, `string`\>

the extracted parameters

#### Defined in

[packages/core/src/data/utils/parsePath.ts:46](https://github.com/10up/headless/blob/2a6e2a0/packages/core/src/data/utils/parsePath.ts#L46)
