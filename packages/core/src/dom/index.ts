import { DOMNode, Element } from 'html-react-parser';
import { isInternalLink } from '../utils/isInternalLink';

type isAnchorTagOptions = {
	isInternalLink?: boolean;
};

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
 * @param node The node to test
 * @param options Supported options
 * @returns
 */
export function isAnchorTag(node: DOMNode, options: isAnchorTagOptions = {}): node is Element {
	if (!(node instanceof Element)) {
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

		return isInternalLink(href);
	}

	return true;
}

type isImageTagOptions = {
	hasDimensions?: boolean;
};

/**
 * Checks if the provided node is an valid image tag
 *
 * @param node The node to test
 * @param options Supported options.
 * @returns
 */
export function isImageTag(node: DOMNode, options: isImageTagOptions = {}) {
	if (!(node instanceof Element)) {
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
 * @param node The node to test
 *
 * @returns true if the node is a youtube embed
 */
export function isYoutubeEmbed(node: DOMNode) {
	if (!(node instanceof Element)) {
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
 * @param node The node to test
 *
 * @returns true if the node is a youtube embed
 */
export function isTwitterEmbed(node: DOMNode) {
	if (!(node instanceof Element)) {
		return false;
	}
	const isFigure = node.type === 'tag' && node.name === 'figure';
	const className = node.attribs?.class || '';

	return isFigure && className.split(' ').includes('wp-block-embed-twitter');
}

export function isButtonBlock(node: DOMNode) {
	if (!(node instanceof Element)) {
		return false;
	}

	const isDiv = node.type === 'tag' && node.name === 'div';
	const className = node.attribs?.class || '';

	return isDiv && className.split(' ').includes('wp-block-button');
}

export type isBlockOptions = {
	tagName?: string;
	className?: string | string[];
};

export function isBlock(node: DOMNode, _options: isBlockOptions) {
	if (!(node instanceof Element)) {
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
 * Tests if a block by name
 *
 * Requires the headless plugin
 *
 * @param node The dom node
 * @param name The block name
 * @returns true if it's a matching block
 */
export function isBlockByName(node: DOMNode, name: string) {
	if (!(node instanceof Element)) {
		return false;
	}

	if (!isBlock(node, { tagName: 'p' })) {
		return false;
	}

	const blockName = node.attribs['data-wp-block-name'];

	return blockName === name;
}

export * from './wpKsesPost';
