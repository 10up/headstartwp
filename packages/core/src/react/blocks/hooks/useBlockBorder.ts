import { Element } from 'html-react-parser';
import { Border, IBlockAttributes } from '../types';
import { useBlock } from './useBlock';

interface BlockBorderAttributes extends IBlockAttributes {
	styleConfig: {
		border: Border;
	};
}

/**
 * Returns the block style (if available)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockBorder(node: Element) {
	const { attributes } = useBlock<BlockBorderAttributes>(node);

	return attributes?.styleConfig?.border;
}
