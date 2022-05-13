import { Element } from 'html-react-parser';
import { Border, IBlockAttributes } from '../types';
import { useBlock } from './useBlock';

interface BlockBorderAttributes extends IBlockAttributes {
	style: {
		border: Border;
	};
}

/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockBorder(node: Element) {
	const { attributes } = useBlock<BlockBorderAttributes>(node);

	return attributes?.style?.border;
}
