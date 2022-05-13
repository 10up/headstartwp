import { Element } from 'html-react-parser';
import { IBlockAttributes, Spacing } from '../types';
import { useBlock } from './useBlock';

interface BlockSpacingAttributes extends IBlockAttributes {
	style: {
		spacing: Spacing;
	};
}
/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockSpacing(node: Element) {
	const { attributes } = useBlock<BlockSpacingAttributes>(node);

	return attributes?.style?.spacing;
}
