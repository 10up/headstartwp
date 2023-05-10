import { Element } from 'html-react-parser';
import { IBlockAttributes } from '../types';
import { getWidthStyles } from '../utils';
import { useBlock } from './useBlock';

interface BlockWidthAttributes extends IBlockAttributes {
	width: string;
}

/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockWidth(node: Element) {
	const { attributes } = useBlock<BlockWidthAttributes>(node);

	if (attributes.width) {
		return attributes.width;
	}

	return getWidthStyles(node);
}
