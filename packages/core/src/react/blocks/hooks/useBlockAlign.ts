import { Element } from 'html-react-parser';
import { Align, IBlockAttributes } from '../types';
import { getAlignStyle } from '../utils';
import { useBlock } from './useBlock';

interface BlockAlignAttributes extends IBlockAttributes {
	align?: Align;
}

/**
 * Returns the block align style (if available)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockAlign(node: Element): Align {
	const { attributes } = useBlock<BlockAlignAttributes>(node);

	if (attributes.align) {
		return attributes.align;
	}

	return getAlignStyle(node);
}
