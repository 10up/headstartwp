import { Element } from 'html-react-parser';
import { useSettings } from '../provider';

/**
 * Parses Json without throwing errors
 *
 * @param json Serialized JSON
 * @returns JSON object
 */
function safeParsing(json) {
	let parsed = {};

	try {
		parsed = JSON.parse(json);
	} catch (e) {
		// do nothing
	}

	return parsed;
}

/**
 * Returns the block name and attributes
 *
 * @param node DomNode
 *
 * @returns
 */
export function useBlock(node: Element) {
	const { useWordPressPlugin } = useSettings();

	if (!useWordPressPlugin) {
		// eslint-disable-next-line no-console
		console.warn(
			'[useBlock] In order to use this hook, you must install the WordPress Plugin and set `useWordPressPlugin` to true.',
		);
	}

	if (
		typeof node.attribs['data-wp-block-name'] === 'undefined' &&
		typeof node.attribs['data-wp-block'] === 'undefined'
	) {
		// eslint-disable-next-line no-console
		console.warn('[useBlock] You are using the useBlock hook in a node that is not a block.');
	}

	const blockName = node.attribs['data-wp-block-name'] || '';
	const attrs = node.attribs['data-wp-block'] ? safeParsing(node.attribs['data-wp-block']) : {};

	return { attributes: attrs, name: blockName, className: node.attribs.class };
}
