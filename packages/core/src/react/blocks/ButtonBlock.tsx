import { Element, Text } from 'html-react-parser';
import { getAttributes, isBlock } from '../../dom';
import { BlockProps } from '../components';
import { BlockAttributes, GutenbergBlockProps } from './types';

import { useBlockAttributes } from '../hooks/useBlockAttributes';

export interface GutenbergButtonProps extends GutenbergBlockProps, BlockAttributes {
	url?: string;
	title?: string;
	text?: string;
	linkTarget?: string;
	rel?: string;
	placeholder?: string;
}

export interface ButtonBlockProps extends Omit<BlockProps, 'test'> {
	className?: string;
	component: React.FC<GutenbergButtonProps>;
}

export const ButtonBlock = ({ domNode, children, component: Component }: ButtonBlockProps) => {
	// node is not undefined at this point
	const node = domNode as Element;

	const anchor = node.firstChild as Element;
	const text = (anchor.firstChild as Text).data;

	const { align, width, typography, styles } = useBlockAttributes(node);
	const { color } = useBlockAttributes(anchor, { color: true });

	const anchorAttributes = getAttributes(anchor.attribs);
	const attributes = getAttributes(node.attribs);

	return (
		<Component
			name="core/button"
			className={attributes.className}
			attribs={attributes}
			align={align}
			typography={typography}
			styles={styles}
			color={color}
			width={width}
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
