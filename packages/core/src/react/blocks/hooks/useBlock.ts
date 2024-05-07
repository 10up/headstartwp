import { Element } from 'html-react-parser';
import { FrameworkError } from '../../../utils';
import { useSettings } from '../../provider';
import type { IBlockAttributes, IDataWPBlock } from '../types';

const BLOCK_MISSING = '_HEADLESS_/_MISSING__BLOCK_';

export const defaultElement = new Element('div', {
	'data-wp-block': JSON.stringify({}),
	'data-wp-block-name': BLOCK_MISSING,
});

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
export function useBlock<T extends IBlockAttributes>(node?: Element) {
	const { useWordPressPlugin } = useSettings();

	if (typeof node === 'undefined') {
		throw new FrameworkError('You are using `useBlock` on a undefined node');
	}

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

	if (blockName === BLOCK_MISSING) {
		if (typeof node === 'undefined') {
			throw new FrameworkError('You are using `useBlock` on a undefined node');
		}
	}

	const attrs: IDataWPBlock = node.attribs['data-wp-block']
		? safeParsing(node.attribs['data-wp-block'])
		: {};

	if (attrs.style) {
		attrs.styleConfig = attrs.style;
		delete attrs.style;
	}

	return { attributes: attrs as unknown as T, name: blockName, className: node.attribs.class };
}
