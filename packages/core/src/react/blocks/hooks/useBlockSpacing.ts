'use client';

import { Element } from 'html-react-parser';
import { useThemeSetting, useThemeStyles } from '../../provider';
import { IBlockAttributes, Spacing } from '../types';
import { useBlock } from './useBlock';

interface BlockSpacingAttributes extends IBlockAttributes {
	styleConfig: {
		spacing: {
			padding: Spacing['padding'];
			margin: Spacing['margin'];
			blockGap: Spacing['blockGap'];
		};
	};
}

/**
 * Returns the block style (if available)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockSpacing(node: Element): Spacing {
	const { name, attributes } = useBlock<BlockSpacingAttributes>(node);
	const supportsBlockGap = !!useThemeSetting('spacing.blockGap', name);
	const supportsMargin = !!useThemeSetting('spacing.margin', name);
	const supportsPadding = !!useThemeSetting('spacing.padding', name);
	const styles = useThemeStyles();

	let blockGap: Spacing['blockGap'] = '';
	if (supportsBlockGap && attributes?.styleConfig?.spacing?.blockGap) {
		blockGap = attributes?.styleConfig?.spacing?.blockGap;
	} else if (supportsBlockGap && styles?.spacing?.blockGap) {
		blockGap = styles?.spacing?.blockGap;
	}

	return {
		padding: attributes?.styleConfig?.spacing?.padding,
		margin: attributes?.styleConfig?.spacing?.margin,
		supportsMargin,
		supportsPadding,
		supportsBlockGap,
		blockGap,
	};
}
