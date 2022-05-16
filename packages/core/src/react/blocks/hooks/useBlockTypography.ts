import { Element } from 'html-react-parser';
import { useThemeSetting } from '../../provider';
import { IBlockAttributes, Typography } from '../types';
import { useBlock } from './useBlock';

interface BlockTypographyAttributes extends IBlockAttributes {
	fontSize?: string;
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
export function useBlockTypography(node: Element): Typography {
	const { name, attributes } = useBlock<BlockTypographyAttributes>(node);
	const fontSizesSettings = useThemeSetting('typography.fontSizes', name);

	// either use the block settings or try the theme or default one
	const fontSizes = Array.isArray(fontSizesSettings)
		? fontSizesSettings
		: fontSizesSettings.theme || fontSizesSettings.default;

	const fontSizePreset = attributes?.fontSize;

	if (fontSizePreset) {
		return {
			fontSize: {
				slug: fontSizePreset || '',
				value: fontSizes.find((f) => f.slug === fontSizePreset).size,
			},
			style: attributes?.style?.typography || {},
		};
	}

	return {
		fontSize: {
			slug: '',
			value: '',
		},
		style: {},
	};
}
