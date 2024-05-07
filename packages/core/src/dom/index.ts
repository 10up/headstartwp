import type { DOMNode } from 'html-react-parser';
import { Element } from 'html-react-parser';
import type { HeadlessConfig } from '../types';
import { isInternalLink } from '../utils/isInternalLink';

export type isAnchorTagOptions = {
	/**
	 * If true, will check if the anchor tag contains a valid internal link.
	 *
	 * if target="_blank" then this option is not taken into account
	 */
	isInternalLink?: boolean;
};

/**
 * Checks if the node is an Element.
 *
 * We rely on this function to avoid issues with instanceof.
 *
 * @see https://github.com/10up/headstartwp/issues/504
 *
 * @param node The dom node
 *
 * @returns Whether the node is of type element or not
 */
export function isElement(node: DOMNode): node is Element {
	const isTagType = node.type === 'tag' || node.type === 'script' || node.type === 'style';

	return node instanceof Element || (typeof (node as Element).name !== 'undefined' && isTagType);
}

/**
 * A small helper function that should probably be removed
 *
 * @param attribs The attributes of the element
 *
 * @internal
 *
 * @returns
 */
export function getAttributes(attribs: Element['attribs']): Record<string, string> {
	const attributes: Record<string, string> = { ...attribs };
	attributes.className = '';

	if (attribs?.class) {
		attributes.className = attributes.class;
		delete attributes.class;
	}

	return attributes;
}

/**
 * Checks if the provided node is an valid anchor tag
 *
 * This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
 * the underlying parser used by {@link BlocksRenderer}.
 *
 * #### Usage
 *
 * ```tsx
 * import { isAnchorTag } from '@headstartwp/core';
 * import { LinkBlock } from '@10up/headless-next';
 *
 * <BlocksRenderer html={html}>
 *  	<LinkBlock test={(node) => isAnchorTag(node, { isInternalLink: true})} />
 * </BlocksRenderer>
 * ```
 *
 * @param node The node to test
 * @param options Supported options
 *
 * @param site
 * @category DOM Helpers
 *
 * @returns Whether it's an anchor tag according to the options passed
 */
export function isAnchorTag(
	node: DOMNode,
	options: isAnchorTagOptions = {},
	site: HeadlessConfig | undefined = undefined,
): node is Element {
	if (!isElement(node)) {
		return false;
	}

	const isAnchor =
		node.type === 'tag' && node.name === 'a' && typeof node?.attribs?.href === 'string';

	if (!isAnchor) {
		return false;
	}

	if (options?.isInternalLink) {
		const { href, target } = node.attribs;

		// there's no client side rendering on links that opens in a new tab
		if (target === '_blank') {
			return false;
		}

		return isInternalLink(href, site);
	}

	return true;
}

export type isImageTagOptions = {
	/**
	 * If true, will check if the image tag contains width and height attributes
	 */
	hasDimensions?: boolean;
};

/**
 * Checks if the provided node is an valid image tag
 *
 * This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
 * the underlying parser used by {@link BlocksRenderer}.
 *
 * #### Usage
 *
 * ```tsx
 * import { isImageTag, ImageBlock } from '@headstartwp/core';
 * import { ImageComponent } from '@10up/headless-next';
 *
 * <BlocksRenderer html={html}>
 *  	<ImageBlock
 * 			test={(node) => isImageTag(node, { hasDimensions: true})}
 * 			component={ImageComponent}
 * 		/>
 * </BlocksRenderer>
 * ```
 *
 * @param node The node to test
 * @param options Supported options.
 *
 * @category DOM Helpers
 *
 * @returns Whether it's an image tag or not according to the options passed
 */
export function isImageTag(node: DOMNode, options: isImageTagOptions = {}) {
	if (!isElement(node)) {
		return false;
	}

	const isImage =
		node.type === 'tag' && node.name === 'img' && typeof node?.attribs?.src === 'string';

	if (!isImage) {
		return false;
	}

	if (options?.hasDimensions) {
		return node?.attribs?.width && node?.attribs?.height;
	}

	return true;
}

export const youtubeEmbedRegex =
	/(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;

/**
 * Checks if the node is an youtube embed
 *
 * This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
 * the underlying parser used by {@link BlocksRenderer}.
 *
 * #### Usage
 *
 * ```tsx
 * import { isYoutubeEmbed } from '@headstartwp/core';
 *
 * <BlocksRenderer html={html}>
 *  	<MyYoutubeBlock
 * 			test={isYoutubeEmbed}
 * 		/>
 * </BlocksRenderer>
 * ```
 *
 * @param node The node to test
 *
 * @category DOM Helpers
 *
 * @returns true if the node is a youtube embed
 */
export function isYoutubeEmbed(node: DOMNode) {
	if (!isElement(node)) {
		return false;
	}

	const isIframe = node.type === 'tag' && node.name === 'iframe';

	if (!isIframe) {
		return false;
	}

	const { src } = node.attribs || '';

	return !!src.match(youtubeEmbedRegex);
}

/**
 * Checks if the node is an twitter embed
 *
 * This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
 * the underlying parser used by {@link BlocksRenderer}.
 *
 * #### Usage
 *
 * ```tsx
 * import { isTwitterEmbed } from '@headstartwp/core';
 *
 * <BlocksRenderer html={html}>
 *  	<MyTwitterBlock
 * 			test={isTwitterEmbed}
 * 		/>
 * </BlocksRenderer>
 * ```
 *
 * @param node The node to test
 *
 * @category DOM Helpers
 *
 * @returns true if the node is a twitter embed
 */
export function isTwitterEmbed(node: DOMNode) {
	if (!isElement(node)) {
		return false;
	}

	const isFigure = node.type === 'tag' && node.name === 'figure';
	const className = node.attribs?.class || '';

	return isFigure && className.split(' ').includes('wp-block-embed-twitter');
}

export type isBlockOptions = {
	/**
	 * The tagName to check for
	 */
	tagName?: string;

	/**
	 * A single or array of classNames to check for
	 *
	 * If an array of class names is passed,
	 * the block will be considered valid if all of the class names are found
	 */
	className?: string | string[];
};

/**
 * Tests a node by tagName and/or className
 *
 * This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
 * the underlying parser used by {@link BlocksRenderer}.
 *
 * #### Usage
 *
 * ```tsx
 * import { isBlock } from '@headstartwp/core';
 *
 * <BlocksRenderer html={html}>
 *  	<MyCustomBlock
 * 			test={(node) => isBlock(node, { tagName: 'div', classList: ['block-class-name'] })}
 * 		/>
 * </BlocksRenderer>
 * ```
 *
 * @param node The node to test
 *
 * @param _options
 * @category DOM Helpers
 *
 * @returns true if the node passes the test
 */
export function isBlock(node: DOMNode, _options: isBlockOptions) {
	if (!isElement(node)) {
		return false;
	}

	const options = { tagName: 'div', ..._options };
	const isTag = node.type === 'tag' && node.name === options.tagName;

	if (!isTag) {
		return false;
	}

	const { className } = getAttributes(node.attribs);

	if (Array.isArray(options.className)) {
		return (
			options.className.filter((c) => className.split(' ').includes(c)).length ===
			options.className.length
		);
	}

	if (options.className) {
		return className.split(' ').includes(options.className);
	}

	return isTag;
}

/**
 * Tests a node by block name. This requires the Headless WP Plugin to be installed.
 *
 * The Headless WP Plugin will append `data-wp-block-name` and `data-wp-block` to every block,
 * this function relies on those attributes to determine if the node is a block.
 *
 * This function expects to be used with `DOMNode` objects from `html-react-parser`, which is
 * the underlying parser used by {@link BlocksRenderer}.
 *
 * #### Usage
 *
 * ```tsx
 * import { isBlockByName } from '@headstartwp/core';
 *
 * <BlocksRenderer html={html}>
 *  	<MyCustomBlock
 * 			test={(node) => isBlock(node, 'core/paragraph')}
 * 		/>
 * </BlocksRenderer>
 * ```
 *
 * @param node The node to test
 * @param name The block name
 *
 * @category DOM Helpers
 *
 * @returns true if the node passes the test
 */
export function isBlockByName(node: DOMNode, name: string) {
	if (!isElement(node)) {
		return false;
	}

	const blockName = node.attribs['data-wp-block-name'];

	return blockName === name;
}

export * from './wpKsesPost';
export * from './stripTags';
