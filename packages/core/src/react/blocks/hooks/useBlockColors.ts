import { Element } from 'html-react-parser';
import { useThemeSetting } from '../../provider';
import { Colors, IBlockAttributes } from '../types';
import { getColorStyles } from '../utils';
import { useBlock } from './useBlock';

interface ColorBlockAttributes extends IBlockAttributes, Colors {
	styleConfig?: {
		elements?: {
			link?: {
				color?: {
					text?: string;
				};
			};
		};
	};
}

/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockColors(node: Element) {
	const { name, attributes } = useBlock<ColorBlockAttributes>(node);

	const defaultColorsSettings = useThemeSetting('color.palette.default', null, []);
	const defaultGradientsSettings = useThemeSetting('color.palette.default', null, []);

	const colorsSettings = useThemeSetting('color.palette', name, []);
	const grandientsSettings = useThemeSetting('color.gradients', name, []);

	const colors = Array.isArray(colorsSettings) ? colorsSettings : colorsSettings?.theme;
	const gradients = Array.isArray(grandientsSettings)
		? grandientsSettings
		: grandientsSettings?.theme;

	const allGradients = [...defaultGradientsSettings, ...gradients];
	const allColors = [...defaultColorsSettings, ...colors];

	const color: Colors = {
		backgroundColorSlug: '',
		backgroundColor: '',
		textColorSlug: '',
		textColor: '',
		gradientSlug: '',
		gradient: '',
		linkColorSlug: '',
		linkColor: '',
	};

	let foundInAttributes = false;
	if (attributes.backgroundColor) {
		foundInAttributes = true;
		color.backgroundColorSlug = attributes.backgroundColor;
		color.backgroundColor = allColors.find((c) => c.slug === attributes.backgroundColor)?.color;
	}

	if (attributes.textColor) {
		foundInAttributes = true;
		color.textColorSlug = attributes.textColor;
		color.textColor = allColors.find((c) => c.slug === attributes.textColor)?.color;
	}

	if (attributes.gradient) {
		foundInAttributes = true;
		color.gradientSlug = attributes.gradient;
		color.gradient = allGradients.find((c) => c.slug === attributes.gradient)?.gradient;
	}

	if (attributes?.styleConfig?.elements?.link?.color?.text) {
		foundInAttributes = true;
		color.linkColorSlug =
			attributes?.styleConfig?.elements?.link?.color?.text?.split('|').pop() || '';
		color.linkColor = allColors.find((c) => c.slug === color.linkColorSlug)?.color;
	}

	if (!foundInAttributes) {
		return getColorStyles(node);
	}

	return color;
}
