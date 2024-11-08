'use client';

import { Element } from 'html-react-parser';
import { useThemeSetting } from '../../provider';
import { Colors, IBlockAttributes } from '../types';
import { getColorStyles, safeArraySpread } from '../utils';
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
 * Returns the block style (if available)
 *
 * @param node DomNode
 * @returns
 */
export function useBlockColors(node: Element) {
	const { name, attributes } = useBlock<ColorBlockAttributes>(node);

	const defaultColorsSettings = useThemeSetting('color.palette.default', null, []);
	const defaultGradientsSettings = useThemeSetting('color.palette.default', null, []);
	const themeColorsSettings = useThemeSetting('color.palette.theme', null, []);
	const themeGradientsSettings = useThemeSetting('color.palette.theme', null, []);
	const userColorsSettings = useThemeSetting('color.palette.user', null, []);
	const userGradientsSettings = useThemeSetting('color.palette.user', null, []);

	const blockColorsSettings = useThemeSetting('color.palette.theme', name, [], false);
	const blockGradientsSettings = useThemeSetting('color.gradients.theme', name, [], false);

	const allGradients = [
		...safeArraySpread(blockGradientsSettings),
		...safeArraySpread(userGradientsSettings),
		...safeArraySpread(themeGradientsSettings),
		...safeArraySpread(defaultGradientsSettings),
	];
	const allColors = [
		...safeArraySpread(blockColorsSettings),
		...safeArraySpread(userColorsSettings),
		...safeArraySpread(themeColorsSettings),
		...safeArraySpread(defaultColorsSettings),
	];

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
