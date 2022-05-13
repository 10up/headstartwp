import { Element } from 'html-react-parser';
import { IBlockAttributes, Typography } from '../types';
import { getTypographyStyles } from '../utils';
import { useBlock } from './useBlock';

interface BlockTypographyAttributes extends IBlockAttributes {
	fontSize?: Typography['fontSize'];
	style: {
		typography: Typography['style'];
	};
}

/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockTypography(node: Element) {
	const { attributes } = useBlock<BlockTypographyAttributes>(node);

	const fontSizePreset = attributes?.fontSize;

	if (attributes?.style?.typography) {
		return { fontSize: fontSizePreset, style: attributes?.style?.typography };
	}

	return getTypographyStyles(node);
}
