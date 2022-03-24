# DOM-related Functions

## wpKsesPost

```typescript
const wpKsesPost = (content: string, allowList?: AllowList | undefined): string
```

The `wpKsesPost` sanitizes html and filter out unwanted or dangeorouly html tags such as `<script>`, invalid html attributes etc. It's ussage is very simple.

```javascript
const markup = "<div>content<script>alert('hey');</script></div>";
const sanitized = wpKsesPost(markup);
// returns "<div>content</div>"
```

It also supports an `allowList` parameter that allows you to specify your own allowed list of html tags and attributes. The default list is defined [here](../../src/dom/wpKsesPost.ts#L35).

```javascript
const markup = "<div>content</div><p class='class-name' data-test='value'>text content</p>";
const sanitized = wpKsesPost(markup, { p: ['class'] });
// returns "<p class='class-name'>text content</p>"
```

## isAnchorTag

```typescript
function isAnchorTag(node: DOMNode, options: isAnchorTagOptions = {}): node is Element
```

The `isAnchorTag` function tests if a `DOMNode` is an anchor tag. It is supposed to be used within [BlocksRenderer](../components/BlocksRenderer.md) component.

It supports an optional `isInternalLink` option which does an additional check for the href value and only return true if it is linking to another page within the site. This is useful to replace internal link in `post_content` with framework-awrare Link components.

```javascript
export const Blocks = ({ html }) => {
	return (
        <BlocksRenderer html={html}>
            <LinkBlock test={(node) => isAnchorTag(node, { isInternalLink: true })} />
        </BlocksRenderer>
	);
};
```

## isImageTag

```typescript
function isImageTag(node: DOMNode, options: isImageTagOptions = {})
```
The `isImageTag` function tests if a `DOMNode` is an image tag. It is supposed to be used within [BlocksRenderer](../components/BlocksRenderer.md) component.

It supports an optional `hasDimensions` option which does an additional check and only return true if the image tag has width/height dimensions. 

```javascript
export const Blocks = ({ html }) => {
	return (
        <BlocksRenderer html={html}>
			<ImageBlock test={(node) => isImageTag(node, { hasDimensions: true })} />
        </BlocksRenderer>
	);
};
```

## isYoutubeEmbed
```typescript
function isYoutubeEmbed(node: DOMNode)
```

The `isYoutubeEmbed` function tests if a `DOMNode` is an youtube embed. It is supposed to be used within [BlocksRenderer](../components/BlocksRenderer.md) component.

```javascript
export const Blocks = ({ html }) => {
	return (
        <BlocksRenderer html={html}>
			<YoutubeLiteBlock test={isYoutubeEmbed} />
        </BlocksRenderer>
	);
};
```

## isTwitterEmbed

```typescript
function isTwitterEmbed(node: DOMNode)
```

The `isTwitterEmbed` function tests if a `DOMNode` is an twitter embed. It is supposed to be used within [BlocksRenderer](../components/BlocksRenderer.md) component.

```javascript
export const Blocks = ({ html }) => {
	return (
        <BlocksRenderer html={html}>
			<TwitterBlock test={isYoutubeEmbed} />
        </BlocksRenderer>
	);
};
```
