import { Element } from 'html-react-parser';
import { FrameworkError } from '@headstartwp/core';
import { useBlockAlign } from './useBlockAlign';
import { useBlockBorder } from './useBlockBorder';
import { useBlockColors } from './useBlockColors';
import { useBlockSpacing } from './useBlockSpacing';
import { useBlockStyle } from './useBlockStyle';
import { useBlockTypography } from './useBlockTypography';
import { useBlockWidth } from './useBlockWidth';

/**
 * useBlockAttributes hooks returns the block attributes for a given block based on what it supports
 *
 * @param node The reference to the dom node of the block
 *
 *
 * @returns
 */
export function useBlockAttributes(node?: Element) {
	if (typeof node === 'undefined') {
		throw new FrameworkError('You are using `useBlock` on a undefined node');
	}

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
