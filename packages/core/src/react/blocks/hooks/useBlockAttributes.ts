import { Element } from 'html-react-parser';
import { useBlockAlign } from './useBlockAlign';
import { useBlockBorder } from './useBlockBorder';
import { useBlockColors } from './useBlockColors';
import { useBlockSpacing } from './useBlockSpacing';
import { useBlockStyle } from './useBlockStyle';
import { useBlockTypography } from './useBlockTypography';
import { useBlockWidth } from './useBlockWidth';

export type BlockSupports = {
	alignment?: boolean;
	styles?: boolean;
	color?: boolean;
	width?: boolean;
	typography?: boolean;
	dimensions?: boolean;
};

/**
 * useBlockAttributes hooks returns the block attributes for a given block based on what it supports
 *
 * @param node The reference to the dom node of the block
 *
 * @param blockSupports An object with the supported features of the block
 *
 * @returns {BlockAttributes}
 */
export function useBlockAttributes(node: Element) {
	const align = useBlockAlign(node);
	const blockStyle = useBlockStyle(node);
	const border = useBlockBorder(node);
	const colors = useBlockColors(node);
	const typography = useBlockTypography(node);
	const width = useBlockWidth(node);
	const spacing = useBlockSpacing(node);

	return {
		align,
		blockStyle,
		border,
		colors,
		typography,
		width,
		spacing,
	};
}
