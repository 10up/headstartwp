import Image from 'next/image';

import { ImageBlockProps } from '@headstartwp/react';

/**
 * An implementation of the ImageBlock (core/image).
 *
 * If `width`, `height` or `src` are not provided, this component will not be used.
 *
 * ## Usage
 *
 * ```tsx
 * import { BlocksRenderer, ImageBlock } from "@headstartwp/react";
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
export function ImageComponent({ src, alt, width, height, children, style }: ImageBlockProps) {
	if (!src) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <>{children}</>;
	}

	if (!width || !height) {
		<Image src={src} alt={alt || ''} fill style={style} />;
	}

	return <Image src={src} alt={alt || ''} width={width} height={height} style={style} />;
}
