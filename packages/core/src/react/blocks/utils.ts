import { Element } from 'html-react-parser';
import camelCase from '../../utils/camelcase';
import { Colors } from './types';

export function getAlignStyle(domNode: Element) {
	if (!domNode.attribs.class) {
		return 'none';
	}

	const classes = domNode.attribs.class.split(' ');

	for (const cls of classes) {
		switch (cls) {
			case 'alignleft':
				return 'left';
			case 'alignright':
				return 'right';
			case 'aligncenter':
				return 'center';
			case 'alignwide':
				return 'wide';
			case 'alignfull':
				return 'full';
			default:
				break;
		}
	}

	return 'none';
}

/**
 * Returns the block style (is-style-{block-style})
 *
 * @param domNode DomNode
 *
 * @returns string with block style
 */
export function getBlockStyle(domNode: Element) {
	if (!domNode.attribs.class) {
		return 'none';
	}
	const classes = domNode.attribs.class.split(' ');
	const prefix = 'is-style-';

	for (const cls of classes) {
		if (cls.startsWith('is-style-')) {
			return cls.substring(prefix.length);
		}
	}

	return 'none';
}

/**
 * Infer GB color styles from classnames
 *
 * @param domNode DomNode
 *
 * @returns ColorBlockProps object
 */
export function getColorStyles(domNode: Element): Colors {
	const colorObject: Colors = {
		textColorSlug: '',
		textColor: '',
		linkColorSlug: '',
		linkColor: '',
		gradientSlug: '',
		gradient: '',
		backgroundColorSlug: '',
		backgroundColor: '',
	};

	if (!domNode.attribs.class) {
		return colorObject;
	}

	const classes = domNode.attribs.class.split(' ');

	const hasText = classes.find((cls) => cls === 'has-text-color') !== undefined;
	const hasLink = classes.find((cls) => cls === 'has-link-color') !== undefined;
	const hasBackground = classes.find((cls) => cls === 'has-background') !== undefined;

	for (const cls of classes) {
		if (!['has-text-color', 'has-background', 'has-link-color'].includes(cls)) {
			if (hasBackground) {
				const match = cls.match(/has-(.*)-background-color/);

				if (match) {
					colorObject.backgroundColor = match ? match[1] : '';
				}
			}

			if (hasLink) {
				const match = cls.match(/has-(.*)-link-color/);
				if (match) {
					colorObject.linkColor = match ? match[1] : '';
				}
			}

			if (hasText && !cls.endsWith('-background-color') && !cls.endsWith('-link-color')) {
				const match = cls.match(/has-(.*)-color/);
				if (match) {
					colorObject.textColor = match ? match[1] : '';
				}
			}
		}
	}

	return colorObject;
}

/**
 * Converts inline styles to a stylesObject for use in react components
 *
 * @param domNode DomNode
 *
 * @returns
 */
export function getInlineStyles(domNode: Element) {
	const styles = domNode.attribs.style;

	if (!styles) {
		return false;
	}
	const stylesArray = styles.split(';');
	const stylesObject: Record<string, string> = {};

	stylesArray.forEach((style) => {
		if (!style) {
			return;
		}
		const position = style.indexOf(':');
		const prop = style.substring(0, position).trim();
		const value = style.substring(position).substring(1).trim();
		stylesObject[camelCase(prop, {})] = value;
	});

	return stylesObject;
}

/**
 * Returns the width size of a block
 *
 * @param domNode DomNode
 *
 * @returns
 */
export function getWidthStyles(domNode: Element) {
	if (!domNode.attribs.class) {
		return undefined;
	}
	const classes = domNode.attribs.class.split(' ');
	const hasCustomWidth = classes.find((cls) => cls === 'has-custom-width') !== undefined;

	if (!hasCustomWidth) {
		return undefined;
	}

	for (const cls of classes) {
		const match = cls.match(/.+__width-(\d+)$/);
		if (match) {
			return match[1];
		}
	}

	return undefined;
}

/**
 * Returns the typography styles of a block
 *
 * @param domNode DomNode
 *
 * @returns
 */
export function getTypographyStyles(domNode: Element) {
	const typography = {
		fontSize: '',
		style: {
			fontSize: '',
			lineHeight: '',
		},
	};

	if (!domNode.attribs.class) {
		return typography;
	}

	const classes = domNode.attribs.class.split(' ');
	const hasCustomFontSize = classes.find((cls) => cls === 'has-custom-font-size') !== undefined;
	/* const hasCustomLineHeight =
		classes.find((cls) => cls === 'has-custom-line-height') !== undefined; */

	for (const cls of classes) {
		if (!['has-custom-font-size', 'has-custom-line-height'].includes(cls)) {
			const match = cls.match(/has-(.*)-font-size/);
			if (match) {
				typography.fontSize = match ? match[1] : '';
			}
		}
	}

	// didn't find a preset
	if (hasCustomFontSize && typography.fontSize === '') {
		const styles = getInlineStyles(domNode);

		if (styles && styles.fontSize) {
			typography.style.fontSize = styles.fontSize;
		}

		if (styles && styles.lineHeight) {
			typography.style.lineHeight = styles.lineHeight;
		}
	}

	return typography;
}
