import { Element } from 'html-react-parser';
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
	const { attributes } = useBlock<ColorBlockAttributes>(node);
	const color: Colors = {
		backgroundColor: '',
		textColor: '',
		gradient: '',
		linkColor: '',
	};

	let foundInAttributes = false;
	if (attributes.backgroundColor) {
		foundInAttributes = true;
		color.backgroundColor = attributes.backgroundColor;
	}

	if (attributes.textColor) {
		foundInAttributes = true;
		color.textColor = attributes.textColor;
	}

	if (attributes.gradient) {
		foundInAttributes = true;
		color.gradient = attributes.gradient;
	}

	if (!foundInAttributes) {
		return getColorStyles(node);
	}

	return color;
}
