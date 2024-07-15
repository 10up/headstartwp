import { Element } from 'html-react-parser';
import { FrameworkError, warn } from '../utils';

export interface IDataWPBlock {
	[key: string]: unknown;
}

const BLOCK_MISSING = '_HEADLESS_/_MISSING__BLOCK_';

export const DEFAULT_BLOCK_ELEMENT = new Element('div', {
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
 * Represents a parsed block, i.e a block parsed from `data-wp-block` and `data-wp-block-name` attributes
 */
export type ParsedBlock<T extends IDataWPBlock = IDataWPBlock> = {
	/**
	 * The Block attributes
	 */
	attributes: T;

	/**
	 * The Block name
	 */
	name: string;

	/**
	 * The Block class name
	 */
	className: string;
};

/**
 * Returns the block name and attributes
 *
 * @param node DomNode
 *
 * @returns
 */
export function parseBlockAttributes(node?: Element): ParsedBlock {
	if (typeof node === 'undefined') {
		throw new FrameworkError('You are calling `parseBlockAttributes` on a undefined node');
	}

	if (
		typeof node.attribs['data-wp-block-name'] === 'undefined' &&
		typeof node.attribs['data-wp-block'] === 'undefined'
	) {
		warn(
			'[parseBlockAttributes] You are using the `parseBlockAttributes` hook in a node that is not a block.',
		);
	}

	const blockName = node.attribs['data-wp-block-name'] || '';

	if (blockName === BLOCK_MISSING) {
		if (typeof node === 'undefined') {
			throw new FrameworkError('You are calling `parseBlockAttributes` on a undefined node');
		}
	}

	const attrs: IDataWPBlock = node.attribs['data-wp-block']
		? safeParsing(node.attribs['data-wp-block'])
		: {};

	if (attrs.style) {
		attrs.styleConfig = attrs.style;
		delete attrs.style;
	}

	return { attributes: attrs, name: blockName, className: node.attribs.class };
}
