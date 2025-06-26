# Implementing a YouTube Facade

HeadstartWP provides an easy way to implement YouTube Facade, which improves page performance by loading a lightweight preview image instead of the full YouTube iframe until the user interacts with it. In fact, we can do so with one line of code by adding the YoutubeLiteBlock component to your BlocksRenderer.

## Basic Usage

```tsx title="src/components/PostContent.tsx"
import { BlocksRenderer, YoutubeLiteBlock } from '@headstartwp/core/react';

interface PostContentProps {
	html: string;
}

export function PostContent({ html }: PostContentProps) {
	return (
		<BlocksRenderer html={html}>
			<YoutubeLiteBlock />
		</BlocksRenderer>
	);
}
```

## How It Works

The `YoutubeLiteBlock` component automatically detects YouTube embeds in your WordPress content and replaces them with a lightweight facade that:

1. **Shows a preview image** from YouTube's thumbnail API
2. **Displays a play button overlay** to indicate it's clickable
3. **Loads the actual iframe** only when the user clicks to play
4. **Improves Core Web Vitals** by reducing initial page load time

## Complete Example in App Router

Here's a complete example showing how to use the YouTube facade in an App Router page:

```tsx title="src/app/[...path]/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import { BlocksRenderer, YoutubeLiteBlock } from '@headstartwp/core/react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { HeadstartWPRoute } from '@headstartwp/next/app';

interface PageProps {
	params: Promise<{ path?: string[] }>;
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const { seo } = await queryPost({
		routeParams: await params,
		params: {
			postType: ['post', 'page'],
		},
	});

	return seo.metadata;
}

export default async function PostPage({ params }: HeadstartWPRoute) {
	const { data } = await queryPost({
		routeParams: await params,
		params: {
			postType: ['post', 'page'],
		},
	});

	return (
		<article className="prose lg:prose-xl mx-auto">
			<h1>{data.post.title.rendered}</h1>
			
			<BlocksRenderer html={data.post.content.rendered}>
				<YoutubeLiteBlock />
			</BlocksRenderer>
		</article>
	);
}
```

## Customizing the YouTube Facade

You can customize the appearance and behavior of the YouTube facade by passing props to the `YoutubeLiteBlock` component:

```tsx title="src/components/PostContent.tsx"
import { BlocksRenderer, YoutubeLiteBlock } from '@headstartwp/core/react';

export function PostContent({ html }: { html: string }) {
	return (
		<BlocksRenderer html={html}>
			<YoutubeLiteBlock
				className="my-youtube-facade"
				playButtonStyle={{
					backgroundColor: 'rgba(255, 0, 0, 0.8)',
					borderRadius: '12px',
				}}
				thumbnailQuality="maxresdefault" // Options: default, mqdefault, hqdefault, sddefault, maxresdefault
			/>
		</BlocksRenderer>
	);
}
```

## Styling the Facade

You can style the YouTube facade with CSS. Here are the default classes you can target:

```css title="src/styles/youtube-facade.css"
/* Container for the YouTube facade */
.youtube-lite {
	position: relative;
	background-color: #000;
	border-radius: 8px;
	overflow: hidden;
	cursor: pointer;
	transition: transform 0.2s ease;
}

.youtube-lite:hover {
	transform: scale(1.02);
}

/* Thumbnail image */
.youtube-lite__thumbnail {
	width: 100%;
	height: auto;
	display: block;
}

/* Play button overlay */
.youtube-lite__play-button {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 68px;
	height: 48px;
	background: rgba(255, 0, 0, 0.8);
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.2s ease;
}

.youtube-lite:hover .youtube-lite__play-button {
	background: rgba(255, 0, 0, 1);
}

/* Play button triangle */
.youtube-lite__play-button::before {
	content: '';
	width: 0;
	height: 0;
	border-left: 16px solid white;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	margin-left: 3px;
}

/* Loading state when iframe is being loaded */
.youtube-lite--loading {
	opacity: 0.7;
}
```

## Multiple YouTube Facades

If you have multiple YouTube videos in your content, each will automatically get its own facade:

```tsx title="src/app/video-gallery/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import { BlocksRenderer, YoutubeLiteBlock } from '@headstartwp/core/react';

export default async function VideoGalleryPage() {
	const { data } = await queryPost({
		routeParams: {},
		params: {
			slug: 'video-gallery',
			postType: 'page',
		},
	});

	return (
		<div className="container mx-auto px-4">
			<h1 className="text-3xl font-bold mb-8">{data.post.title.rendered}</h1>
			
			{/* All YouTube embeds in the content will get facades */}
			<BlocksRenderer html={data.post.content.rendered}>
				<YoutubeLiteBlock />
			</BlocksRenderer>
		</div>
	);
}
```

## Performance Benefits

Using the YouTube facade provides several performance benefits:

- **Reduced Initial Load Time**: No iframe means faster page rendering
- **Lower Cumulative Layout Shift (CLS)**: Preview images prevent layout jumps
- **Smaller Initial Bundle**: YouTube's iframe and scripts only load when needed
- **Better Core Web Vitals**: Improved Largest Contentful Paint (LCP) scores
- **Bandwidth Savings**: Especially important for users on slower connections

## Analytics and Tracking

You can track YouTube facade interactions for analytics:

```tsx title="src/components/TrackingYoutubeFacade.tsx"
'use client';

import { YoutubeLiteBlock } from '@headstartwp/core/react';
import { useEffect } from 'react';

export function TrackingYoutubeFacade() {
	useEffect(() => {
		const handleYouTubeClick = (event: Event) => {
			const target = event.target as HTMLElement;
			if (target.closest('.youtube-lite')) {
				// Track the click event
				if (typeof window !== 'undefined' && window.gtag) {
					window.gtag('event', 'youtube_facade_click', {
						event_category: 'Video',
						event_label: 'YouTube Facade Interaction',
					});
				}
			}
		};

		document.addEventListener('click', handleYouTubeClick);
		return () => document.removeEventListener('click', handleYouTubeClick);
	}, []);

	return <YoutubeLiteBlock />;
}
```

Then use it in your content:

```tsx title="src/components/PostContent.tsx"
import { BlocksRenderer } from '@headstartwp/core/react';
import { TrackingYoutubeFacade } from './TrackingYoutubeFacade';

export function PostContent({ html }: { html: string }) {
	return (
		<BlocksRenderer html={html}>
			<TrackingYoutubeFacade />
		</BlocksRenderer>
	);
}
```

## WordPress Integration

The YouTube facade works automatically with any YouTube embeds in your WordPress content, including:

- **Gutenberg YouTube blocks**
- **Classic editor embeds**
- **Custom YouTube shortcodes**
- **Manually embedded YouTube URLs**

Simply add the `YoutubeLiteBlock` to your `BlocksRenderer` and it will automatically detect and replace all YouTube embeds with performant facades.

This implementation provides a seamless way to improve your site's performance while maintaining a great user experience for video content.
