import { Element } from 'html-react-parser';
import { useSettings } from '../../provider';
import { IBlockAttributes } from '../types';

/**
 * Parses Json without throwing errors
 *
 * @param json Serialized JSON
 * @returns JSON object
 */
function safeParsing(json): Record<string, any> {
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
export function useBlock<T extends IBlockAttributes>(node: Element) {
	const { useWordPressPlugin } = useSettings();

	if (
		typeof node.attribs['data-wp-block-name'] === 'undefined' &&
		typeof node.attribs['data-wp-block'] === 'undefined'
	) {
		// eslint-disable-next-line no-console
		console.warn('[useBlock] You are using the useBlock hook in a node that is not a block.');

		if (!useWordPressPlugin) {
			// eslint-disable-next-line no-console
			console.warn(
				'[useBlock] In order to use this hook, you must install the WordPress Plugin.',
			);
		}
	}

	const blockName = node.attribs['data-wp-block-name'] || '';
	const attrs: T = node.attribs['data-wp-block']
		? (safeParsing(node.attribs['data-wp-block']) as unknown as T)
		: ({} as T);

	return { attributes: attrs, name: blockName, className: node.attribs.class };
}
