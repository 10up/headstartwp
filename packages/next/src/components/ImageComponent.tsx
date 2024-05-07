import NextImageComponent from 'next/image';
import type { ImageLoaderProps } from 'next/image';
import { ImageBlockProps } from '@headstartwp/core/react';

// See error in https://github.com/vercel/next.js/issues/54777
const Image =
	// @ts-expect-error
	typeof NextImageComponent === 'object' && typeof NextImageComponent.default !== 'undefined'
		? // @ts-expect-error
		  NextImageComponent.default
		: NextImageComponent;

/**
 * Given a width and an aspect ratio, calculate the resulting height. If either the
 * calculation fails or any of the parameters are missing, it won't return anything.
 *
 * @param {?number} width       Given width
 * @param {?string} aspectRatio Aspect Ratio in the form of `16:9`
 */
function calculateHeightFromWidth(width?: number, aspectRatio?: string) {
	let result;

	if (!width || !aspectRatio) {
		return undefined;
	}

	try {
		const [w, h] = aspectRatio.split(':').map(Number);
		const ratio = h / w;
		result = Math.round(width * ratio);
	} catch (error) {
		// Error silently
	}

	return result;
}

export type VIPCustomImageLoader = ImageLoaderProps & { aspectRatio?: string };

/**
 * Custom Image loader for WordPress VIP leveraging Photon's API. This can't be made
 * a global loader because of the local loader used on the custom image component.
 *
 * @param {object}  props 			  The loader props
 * @param {?number} props.quality     Number of quality where 0 is minimum and 100 is maximum. 75 if not passed.
 * @param {string}  props.src         Image source
 * @param {number}  props.width       Width for the image
 * @param {?string} props.aspectRatio Aspect Ratio in the form of `16:9`
 */
export function VIPImageLoader({ quality, src, width, aspectRatio }: VIPCustomImageLoader) {
	if (src.includes('/wp-content/uploads')) {
		const url = new URL(src);
		const height = calculateHeightFromWidth(width, aspectRatio);

		if (width) {
			if (url.searchParams.has('w')) {
				// If it has height but we're overriding, don't bother
				if (url.searchParams.has('h') && !height) {
					const originalHeight = Number(url.searchParams.get('h'));
					const originalWidth = Number(url.searchParams.get('w'));
					const newHeight = Math.round((originalHeight / originalWidth) * width);
					url.searchParams.set('h', `${newHeight}`);
				}
			}

			url.searchParams.set('w', `${width}`);
		}

		if (height) {
			url.searchParams.set('h', `${height}`);
			url.searchParams.set('crop', '1');
		}

		url.searchParams.set('q', `${quality || 75}`);

		return url.toString();
	}

	return src;
}

export interface ImageProps extends ImageBlockProps {
	loader?: (props: VIPCustomImageLoader | ImageLoaderProps) => string;
}

/**
 * An implementation of the ImageBlock (core/image).
 *
 * If `width`, `height` or `src` are not provided, this component will not be used.
 *
 * #### Usage
 *
 * ```tsx
 * import { BlocksRenderer, ImageBlock } from "@headstartwp/core/react";
 * import { ImageComponent } from "@headstartwp/next";
 *
 * <BlocksRenderer html={html}>
 * 	<ImageBlock component={ImageComponent} />
 * </BlocksRenderer>
 * ```
 *
 * @param props {@link ImageBlockProps}
 *
 * @category React Components
 */
export function ImageComponent({ src, alt, width, height, children, style, loader }: ImageProps) {
	if (!src) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <>{children}</>;
	}

	if (!width || !height) {
		return <Image src={src} alt={alt || ''} fill style={style} loader={loader} />;
	}

	return (
		<Image
			src={src}
			alt={alt || ''}
			width={width}
			height={height}
			style={style}
			loader={loader}
		/>
	);
}
