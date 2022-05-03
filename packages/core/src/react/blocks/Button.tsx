import { ReactElement } from 'react';
import { Element, Text } from 'html-react-parser';
import { getAttributes, isBlock } from '../../dom';
import { BlockProps } from '../components';
import {
	AlignBlockProps,
	ColorBlockProps,
	GutenbergBlockProps,
	TypographyBlockProps,
} from './types';
import {
	getAlignStyle,
	getBlockStyle,
	getColorStyles,
	getWidthStyles,
	getTypographyStyles,
} from './utils';

export interface ButtonProps extends GutenbergBlockProps {
	className: string;

	// supports
	align?: AlignBlockProps;
	styles?: string;
	color?: ColorBlockProps;
	typography?: TypographyBlockProps;
	width?: number;

	// block attrs
	url?: string;
	title?: string;
	text?: string;
	linkTarget?: string;
	rel?: string;
	placeholder?: string;
}

export const Button = ({ children }: ButtonProps) => {
	return <div>{children}</div>;
};

export interface ButtonBlockProps extends Omit<BlockProps, 'test'> {
	className?: string;
	component?: ReactElement;
}

export const ButtonBlock = ({ domNode, children, component }: ButtonBlockProps) => {
	if (!domNode) {
		return null;
	}

	const anchor = domNode.firstChild as Element;
	const text = (anchor.firstChild as Text).data;
	const anchorAttributes = getAttributes(anchor.attribs);
	const attributes = getAttributes(domNode.attribs);

	const alignStyles = getAlignStyle(domNode);
	const blockStyle = getBlockStyle(domNode);
	const colorStyles = getColorStyles(anchor);
	const widthStyles = getWidthStyles(domNode);
	const typographyStyles = getTypographyStyles(domNode);

	const Component = typeof component === 'function' ? component : Button;

	return (
		<Component
			className={attributes.className}
			attribs={attributes}
			align={alignStyles}
			typography={typographyStyles}
			styles={blockStyle}
			color={colorStyles}
			width={widthStyles}
			url={anchorAttributes.href}
			title={anchorAttributes.title}
			linkTarget={anchorAttributes.target}
			rel={anchorAttributes.rel}
			placeholder={anchorAttributes.placeholder}
			text={text}
		>
			{children}
		</Component>
	);
};

ButtonBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-button' }),
};
