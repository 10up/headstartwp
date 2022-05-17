import { Element } from 'html-react-parser';
import { useThemeSetting } from '../../provider';
import { Colors, IBlockAttributes } from '../types';
import { getColorStyles } from '../utils';
import { useBlock } from './useBlock';

interface ColorBlockAttributes extends IBlockAttributes, Colors {}
/**
 * Returns the block style (if avaliable)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockColors(node: Element) {
	const { name, attributes } = useBlock<ColorBlockAttributes>(node);
	const colorsSettings = useThemeSetting('color.palette', name);
	const grandientsSettings = useThemeSetting('color.gradients', name);

	// if colors settings is an array then it's what we need,
	// if it isn't let try the theme one first then the default one
	const colors = Array.isArray(colorsSettings)
		? colorsSettings
		: colorsSettings?.theme || colorsSettings?.default;
	const gradients = Array.isArray(grandientsSettings)
		? grandientsSettings
		: grandientsSettings?.theme || grandientsSettings?.default;

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
		color.backgroundColor = colors.find((c) => c.slug === attributes.backgroundColor)?.color;
	}

	if (attributes.textColor) {
		foundInAttributes = true;
		color.textColorSlug = attributes.textColor;
		color.textColor = colors.find((c) => c.slug === attributes.textColor)?.color;
	}

	if (attributes.gradient) {
		foundInAttributes = true;
		color.gradientSlug = attributes.gradient;
		color.gradient = gradients.find((c) => c.slug === attributes.gradient)?.gradient;
	}

	if (!foundInAttributes) {
		return getColorStyles(node);
	}

	return color;
}
