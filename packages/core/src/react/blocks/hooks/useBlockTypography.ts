import type { Element } from 'html-react-parser';
import { useThemeSetting } from '../../provider';
import type { IBlockAttributes, Typography } from '../types';
import { useBlock } from './useBlock';
import { safeArraySpread } from '../utils';

interface BlockTypographyAttributes extends IBlockAttributes {
	fontSize?: string;
	styleConfig: {
		typography: {
			lineHeight?: string;
			textTransform?: string;
			letterSpacing?: string;
			fontSize?: string;
		};
	};
}

/**
 * Returns the block style (if available)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockTypography(node: Element): Typography {
	const { name, attributes } = useBlock<BlockTypographyAttributes>(node);
	const defaultFontSizesSettings = useThemeSetting('typography.fontSizes.default', null, []);
	const themeFontSizesSettings = useThemeSetting('typography.fontSizes.theme', null, []);
	const userFontSizesSettings = useThemeSetting('typography.fontSizes.user', null, []);
	const blockFontSizesSettings = useThemeSetting('typography.fontSizes.theme', name, [], false);

	const supportsCustomFontSize = !!useThemeSetting('typography.customFontSize', name);
	const supportsFontStyle = !!useThemeSetting('typography.fontStyle', name);
	const supportsFontWeight = !!useThemeSetting('typography.fontWeight', name);
	const supportsLetterSpacing = !!useThemeSetting('typography.letterSpacing', name);
	const supportsLineHeight = !!useThemeSetting('typography.lineHeight', name);
	const supportsTextDecoration = !!useThemeSetting('typography.textDecoration', name);
	const supportsTextTransform = !!useThemeSetting('typography.textTransform', name);

	const allFontSizes = [
		...safeArraySpread(blockFontSizesSettings),
		...safeArraySpread(userFontSizesSettings),
		...safeArraySpread(themeFontSizesSettings),
		...safeArraySpread(defaultFontSizesSettings),
	];

	const fontSizePreset = attributes?.fontSize;

	if (fontSizePreset) {
		return {
			fontSize: {
				slug: fontSizePreset || '',
				value:
					allFontSizes.find((f) => f.slug === fontSizePreset)?.size ||
					attributes?.style?.typography,
			},
			supportsFontStyle,
			supportsCustomFontSize,
			supportsFontWeight,
			supportsLetterSpacing,
			supportsLineHeight,
			supportsTextDecoration,
			supportsTextTransform,
			lineHeight: attributes?.styleConfig?.typography?.lineHeight,
			textTransform: attributes?.styleConfig?.typography?.textTransform,
			letterSpacing: attributes?.styleConfig?.typography?.letterSpacing,
		};
	}

	return {
		fontSize: {
			slug: '',
			value: '',
		},
		supportsFontStyle,
		supportsCustomFontSize,
		supportsFontWeight,
		supportsLetterSpacing,
		supportsLineHeight,
		supportsTextDecoration,
		supportsTextTransform,
		lineHeight: '',
		textTransform: '',
		letterSpacing: '',
	};
}
