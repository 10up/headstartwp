import { Element } from 'html-react-parser';
import { useThemeSetting, useThemeStyles } from '../../provider';
import { IBlockAttributes, Spacing } from '../types';
import { useBlock } from './useBlock';

interface BlockSpacingAttributes extends IBlockAttributes {
	style: {
		spacing: {
			padding: Spacing['padding'];
			margin: Spacing['margin'];
		};
	};
}

/**
 * Returns the block style (if avaliable)
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
		padding: attributes?.style?.spacing?.padding,
		margin: attributes?.style?.spacing?.margin,
		supportsMargin,
		supportsPadding,
		supportsBlockGap,
		blockGap: supportsBlockGap && styles?.spacing?.blockGap ? styles?.spacing?.blockGap : '',
	};
}
