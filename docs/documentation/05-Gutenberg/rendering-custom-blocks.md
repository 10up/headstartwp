---
sidebar_label: Rendering Custom Blocks
sidebar_position: 1
slug: /gutenberg/rendering-custom-blocks
---

# Rendering Custom Blocks

Custom Blocks can be handled in a very similar way. If you need to render your custom block as a react component you should make sure that the block exposes its data via the markup. You can do so by appending additional data to the `data-wp-block-attrs` attribute or serializing the data needed inside the block.

## App Router vs Pages Router

> **Note:** The `BlocksRenderer` used in the App Router is slightly different from the one used in the Pages Router. The App Router version requires manually passing the `settings` prop since server components don't have access to React context.

In the Pages Router, the `BlocksRenderer` can access the headless config through context:

```tsx
// Pages Router
import { BlocksRenderer } from '@headstartwp/core/react';

<BlocksRenderer html={html}>
	<ImageBlock />
	<LinkBlock />
</BlocksRenderer>
```

In the App Router, you must explicitly pass the `settings` prop:

```tsx
// App Router
import { BlocksRenderer } from '@headstartwp/core/react';
import { queryAppSettings } from '@headstartwp/next/app';

const { data } = await queryAppSettings();

<BlocksRenderer
	html={html}
	settings={settings}
	blockContext={{ themeJSON: data['theme.json'].settings }}
>
	<ImageBlock />
	<LinkBlock />
</BlocksRenderer>
```

## BlocksRenderer Props

### `forwardBlockAttributes`

When set to `true`, the `BlocksRenderer` will automatically parse and forward the block attributes from the `data-wp-block` attribute to your custom block components. This allows your components to access the block's Gutenberg attributes directly.

```tsx
<BlocksRenderer
	html={html}
	settings={settings}
	forwardBlockAttributes={true}
>
	<HeroBlock />
</BlocksRenderer>
```

### `settings`

The headless configuration object that's required in the App Router. This contains your site's configuration and is passed to child components via the block context.

```tsx
<BlocksRenderer
	html={html}
	settings={settings} // Required in App Router
>
	<HeroBlock />
</BlocksRenderer>
```

### `blockContext`

An optional context object that gets passed to all child block components. This is useful for sharing data like theme settings, global configuration, or any other data your blocks might need.

```tsx
<BlocksRenderer
	html={html}
	settings={settings}
	blockContext={{
		themeJSON: data['theme.json'].settings,
		customData: { /* your custom data */ }
	}}
>
	<HeroBlock />
</BlocksRenderer>
```

## Creating Custom Blocks

### Basic Custom Block Example

The example below assumes the following `block.json`

```json
{
	"$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 2,
	"name": "custom/hero",
	"title": "Hero Block",
	"description": "A custom hero block with title, content, and background image",
	"category": "design",
	"attributes": {
		"title": {
			"type": "string",
			"default": ""
		},
		"content": {
			"type": "string",
			"default": ""
		},
		"backgroundImage": {
			"type": "object",
			"default": {}
		},
		"buttonText": {
			"type": "string",
			"default": ""
		},
		"buttonUrl": {
			"type": "string", 
			"default": ""
		}
	},
	"supports": {
		"html": false
	}
}
```

Here's an example of a custom hero block that demonstrates proper typing and attribute forwarding.

```tsx
import { BlockFC, BlockProps } from '@headstartwp/core/react';
import { isBlockByName } from '@headstartwp/core';

// Define the block attributes type
type HeroBlockAttributes = {
	title: string;
	content: string;
	backgroundImage?: {
		url: string;
		alt: string;
	};
	buttonText?: string;
	buttonUrl?: string;
};

// Define the block context type
type HeroBlockContext = {
	settings: HeadlessConfig;
	themeJSON: Record<string, any>;
	customData?: {
		siteTitle: string;
		primaryColor: string;
	};
};

// Create the block component using BlockFC type
const HeroBlock: BlockFC<BlockProps<HeroBlockAttributes, HeroBlockContext>> = ({
	block,
	children,
	blockContext,
	style,
	domNode,
}) => {
	// The block prop contains the parsed attributes when forwardBlockAttributes is true
	if (!block) {
		return null;
	}

	const { attributes, name, className } = block;
	const { title, content, backgroundImage, buttonText, buttonUrl } = attributes;
	
	// Access block context data
	const themeJSON = blockContext?.themeJSON;
	const customData = blockContext?.customData;

	return (
		<section 
			className={`hero-block ${className || ''}`}
			style={{
				...style,
				backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : undefined,
				backgroundColor: customData?.primaryColor || themeJSON?.color?.palette?.primary
			}}
		>
			<div className="hero-content">
				<h1>{title}</h1>
				<p>{content}</p>
				{buttonText && buttonUrl && (
					<a href={buttonUrl} className="hero-button">
						{buttonText}
					</a>
				)}
				{children}
			</div>
		</section>
	);
};

// Define the test function to match the block
HeroBlock.test = (node) => {
	return isBlockByName(node, 'custom/hero');
};

export default HeroBlock;
```

### Using the Custom Block

```tsx
import { BlocksRenderer } from '@headstartwp/core/react';
import { queryAppSettings } from '@headstartwp/next/app';
import HeroBlock from './blocks/HeroBlock';

const BlocksComponent = async ({ html, settings }) => {
	const { data } = await queryAppSettings();
	
	return (
		<BlocksRenderer
			html={html}
			settings={settings}
			forwardBlockAttributes={true}
			blockContext={{
				themeJSON: data['theme.json'].settings,
				customData: {
					siteTitle: 'My Site',
					primaryColor: '#007cba'
				}
			}}
		>
			<HeroBlock />
		</BlocksRenderer>
	);
};
```

### Block Attributes in HTML

When the HeadstartWP plugin processes this block, it will add the `data-wp-block` and `data-wp-block-name` attributes to the HTML:

```html
<div 
	class="wp-block-custom-hero" 
	data-wp-block-name="custom/hero"
	data-wp-block='{"title":"Welcome to Our Site","content":"This is the hero section","backgroundImage":{"url":"https://example.com/hero-bg.jpg","alt":"Hero background"},"buttonText":"Learn More","buttonUrl":"/about"}'
>
	<!-- Block content -->
</div>
```

When `forwardBlockAttributes` is enabled, your React component will receive these attributes in the `block.attributes` prop, properly typed according to your `HeroBlockAttributes` interface.