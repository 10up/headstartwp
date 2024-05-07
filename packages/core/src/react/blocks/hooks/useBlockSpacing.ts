import type { Element } from 'html-react-parser';
import { useThemeSetting, useThemeStyles } from '../../provider';
import type { IBlockAttributes, Spacing } from '../types';
import { useBlock } from './useBlock';

interface BlockSpacingAttributes extends IBlockAttributes {
	styleConfig: {
		spacing: {
			padding: Spacing['padding'];
			margin: Spacing['margin'];
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

	return {
		padding: attributes?.styleConfig?.spacing?.padding,
		margin: attributes?.styleConfig?.spacing?.margin,
		supportsMargin,
		supportsPadding,
		supportsBlockGap,
		blockGap: supportsBlockGap && styles?.spacing?.blockGap ? styles?.spacing?.blockGap : '',
	};
}
