import { DOMNode, Element } from 'html-react-parser';
import { getWPUrl } from '..';
import { isExternalUrl } from '../utils/isExternalUrl';
import { removeSourceUrl } from '../utils/removeSourceUrl';

/**
 * Checks if the provided node is an valid anchor tag
 *
 * @param node The node to test
 *
 * @returns
 */
export function isAnchorTag(node: DOMNode): node is Element {
	if (!(node instanceof Element)) {
		return false;
	}

	return node.type === 'tag' && node.name === 'a' && typeof node?.attribs?.href === 'string';
}

/**
 * Checks if a anchor tag should be replaced with a Link component
 *
 * @param node The node to test
 *
 * @returns true if anchor tag should be replaced
 */
export function isReplaceableAnchorTag(node: DOMNode) {
	if (!isAnchorTag(node)) {
		return false;
	}

	const { href } = node.attribs;

	const link = removeSourceUrl({ link: href, backendUrl: getWPUrl() });

	if (isExternalUrl(link)) {
		return false;
	}

	return true;
}

/**
 * Checks if the provided node is an valid image tag
 *
 * @param node The node to test
 *
 * @returns
 */
export function isImageTag(node: DOMNode) {
	if (!(node instanceof Element)) {
		return false;
	}

	return node.type === 'tag' && node.name === 'img' && typeof node?.attribs?.src === 'string';
}
