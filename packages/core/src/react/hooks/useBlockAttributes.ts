import { Element } from 'html-react-parser';
import { BlockAttributes } from '../blocks/types';
import {
	getAlignStyle,
	getBlockStyle,
	getColorStyles,
	getWidthStyles,
	getTypographyStyles,
	getInlineStyles,
} from '../blocks/utils';

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
export function useBlockAttributes(node: Element, blockSupports: BlockSupports = {}) {
	const supports = {
		alignment: true,
		styles: true,
		color: true,
		width: true,
		typography: true,
		dimensions: true,
		...blockSupports,
	};

	const attributes: BlockAttributes = {};

	if (supports.alignment) {
		attributes.align = getAlignStyle(node);
	}

	if (supports.styles) {
		attributes.styles = getBlockStyle(node);
	}

	if (supports.color) {
		attributes.color = getColorStyles(node);
	}

	if (supports.width) {
		attributes.width = getWidthStyles(node);
	}

	if (supports.typography) {
		attributes.typography = getTypographyStyles(node);
	}

	if (supports.dimensions) {
		const inlineStyles = getInlineStyles(node);
		if (inlineStyles) {
			attributes.dimensions = {
				paddingTop: inlineStyles?.paddingTop || '',
				paddingBottom: inlineStyles?.paddingBottom || '',
				paddingLeft: inlineStyles?.paddingLeft || '',
				paddingRight: inlineStyles?.paddingRight || '',
			};
		}
	}

	return attributes;
}
