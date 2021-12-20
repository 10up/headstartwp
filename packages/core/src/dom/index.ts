import { DOMNode, Element } from 'html-react-parser';

/**
 * Checks if the provided node is an valid anchor tag
 *
 * @param node The node to test
 *
 * @returns
 */
export function isAnchorTag(node: DOMNode) {
	if (!(node instanceof Element)) {
		return false;
	}

	return node.type === 'tag' && node.name === 'a' && typeof node?.attribs?.href === 'string';
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
