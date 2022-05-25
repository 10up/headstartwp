import { Element } from 'html-react-parser';
import { useThemeSetting } from '../../provider';
import { IBlockAttributes, Typography } from '../types';
import { useBlock } from './useBlock';

interface BlockTypographyAttributes extends IBlockAttributes {
	fontSize?: string;
	style: {
		typography: {
			lineHeight?: string;
			textTransform?: string;
			letterSpacing?: string;
			fontSize?: string;
		};
	};
}

/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockTypography(node: Element): Typography {
	const { name, attributes } = useBlock<BlockTypographyAttributes>(node);
	const defaultfFontSizesSettings = useThemeSetting('typography.fontSizes.default', null, []);
	const fontSizesSettings = useThemeSetting('typography.fontSizes', name, []);
	const supportsCustomFontSize = !!useThemeSetting('typography.customFontSize', name);
	const supportsFontStyle = !!useThemeSetting('typography.fontStyle', name);
	const supportsFontWeight = !!useThemeSetting('typography.fontWeight', name);
	const supportsLetterSpacing = !!useThemeSetting('typography.letterSpacing', name);
	const supportsLineHight = !!useThemeSetting('typography.lineHeight', name);
	const supportsTextDecoration = !!useThemeSetting('typography.textDecoration', name);
	const supportsTextTransform = !!useThemeSetting('typography.textTransform', name);

	// either use the block settings or try the theme or default one
	const fontSizes = Array.isArray(fontSizesSettings)
		? fontSizesSettings
		: fontSizesSettings?.theme;

	const allFontSizes = [...defaultfFontSizesSettings, ...fontSizes];

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
			supportsLineHight,
			supportsTextDecoration,
			supportsTextTransform,
			lineHeight: attributes?.style?.typography?.lineHeight,
			textTransform: attributes?.style?.typography?.textTransform,
			letterSpacing: attributes?.style?.typography?.letterSpacing,
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
		supportsLineHight,
		supportsTextDecoration,
		supportsTextTransform,
		lineHeight: '',
		textTransform: '',
		letterSpacing: '',
	};
}
