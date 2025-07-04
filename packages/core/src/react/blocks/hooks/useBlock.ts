import { Element } from 'html-react-parser';

import { IBlockAttributes } from '../types';
import { parseBlockAttributes } from '../../../dom/parseBlockAttributes';

/**
 * Returns the block name and attributes
 *
 * @param node DomNode
 *
 * @returns
 */
export function useBlock<T extends IBlockAttributes>(node?: Element) {
	// TODO: mark as deprecated
	const { attributes, name, className } = parseBlockAttributes(node);

	return {
		attributes: attributes as unknown as T,
		name,
		className,
	};
}
