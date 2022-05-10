import { Element, Text } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { Align, Border, Colors, IBlockAttributes, Typography } from './types';

import { useBlock } from './hooks';
import { useBlockAttributes } from './hooks/useBlockAttributes';

export interface GutenbergButtonProps extends IBlockAttributes {
	url?: string;
	title?: string;
	text?: string;
	linkTarget?: string;
	rel?: string;
	colors?: Colors;
	placeholder?: string;
	border?: Border;
	blockStyle?: string;
	typography?: Typography;
	align: Align;
	width?: string;
}

export interface ButtonBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenbergButtonProps>;
}

export const ButtonBlock = ({
	domNode: node,
	children,
	component: Component,
}: ButtonBlockProps) => {
	const { className, name } = useBlock(node);
	const { align, blockStyle, border, colors, typography, width } = useBlockAttributes(node);

	const anchor = node.firstChild as Element;
	const text = (anchor.firstChild as Text).data;

	return (
		<Component
			name={name}
			className={className}
			url={anchor.attribs.href}
			title={anchor.attribs.title}
			linkTarget={anchor.attribs.target}
			rel={anchor.attribs.rel}
			placeholder={anchor.attribs.placeholder}
			text={text}
			align={align}
			colors={colors}
			border={border}
			typography={typography}
			width={width}
			blockStyle={blockStyle}
		>
			{children}
		</Component>
	);
};

ButtonBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-button' }),
};
