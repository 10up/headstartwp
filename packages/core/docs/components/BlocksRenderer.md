# BlocksRenderer

The `BlocksRenderer` component takes in arbitrary html markup and receives a list of react components as children that allows replacing dom nodes with React Components.

The html prop is sanitized through `wpKsesPost` so it's safe for rendering arbitrary html markup.

## Usage

### Framework agnostic example

```javascript
import {
	BlocksRenderer,
	isAnchorTag,
	isImageTag
} from '@10up/headless-core';
import { ImageBlock, LinkBlock, TwitterBlock, YoutubeLiteBlock } from '@10up/headless-next';
import PropTypes from 'prop-types';

const MyLinkBlock = ({domNode, children}) => {
    // get the html attributes from the dom node
    const { href, rel } = domNode.attribs;

    return (
        <MyFrameWorkSpecificLinkComponent href={href} rel={rel}>
            {children}
        </MyFrameWorkSpecificLinkComponent>
    )
};

export const Blocks = ({ html }) => {
	return (
        <BlocksRenderer html={html}>
            <MyLinkBlock test={(node) => isAnchorTag(node, { isInternalLink: true })} />
        </BlocksRenderer>
	);
};
```

### Next.js example
Using in conjuction with `@10up/headless-next` you can easily replace Links, Images, Youtube embeds and twitter embeds with Next.js-ready components.

```javascript
import {
	BlocksRenderer,
	isAnchorTag,
	isImageTag,
	isTwitterEmbed,
	isYoutubeEmbed,
} from '@10up/headless-core';
import { ImageBlock, LinkBlock, TwitterBlock, YoutubeLiteBlock } from '@10up/headless-next';
import PropTypes from 'prop-types';

export const Blocks = ({ html }) => {
	return (
		<div style={{ position: 'relative' }}>
			<BlocksRenderer html={html}>
				<LinkBlock test={(node) => isAnchorTag(node, { isInternalLink: true })} />
				<ImageBlock test={(node) => isImageTag(node, { hasDimensions: true })} />
				<YoutubeLiteBlock test={isYoutubeEmbed} />
				<TwitterBlock test={isTwitterEmbed} />
			</BlocksRenderer>
		</div>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};

```
## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `html` | `string`    | `''`   | The HTML markup to be parsed and rendered         |
| `ksesAllowList` | [`AllowList`](../../src/dom/wpKsesPost.ts) | `undefined` | An Record containing html tags as keys and the allowed attributes. It is a optional argument if not passed a [default list](../../src/dom/wpKsesPost.ts) will be used. |
| `children` | `ReactNode` | It's required. | The children are a list of react components of type [`BlockProps`](../../src//components/BlocksRenderer.tsx#L5). The `test` function must be passed as a prop (not as a default value); |

## Related
- isAnchorTag
- isImageTag
- isTwitterEmbed
- isYoutubeEmbed