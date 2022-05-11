import { Element, Text } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, Border, Colors, IBlockAttributes, Typography } from './types';

export interface GutenberPullQuoteProps extends IBlockAttributes {
	typography?: Typography;
	align?: Align;
	blockStyle?: string;
	border?: Border;
	colors?: Colors;
	quote: string;
	cite: string;
	borderColor?: string;
}

export interface PullQuotekBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenberPullQuoteProps>;
}

export const PullQuoteBlock = ({
	domNode: node,
	children,
	component: Component,
}: PullQuotekBlockProps) => {
	const { name, className, attributes } = useBlock<GutenberPullQuoteProps>(node);
	const { align, typography, colors, border } = useBlockAttributes(node);

	const blockquote = node.firstChild as Element;
	const paragraph = blockquote.firstChild as Element;
	const cite = blockquote.lastChild as Element;

	const quote = (paragraph.firstChild as Text).data;
	const citeText = (cite.lastChild as Text).data;

	return (
		<Component
			name={name}
			className={className}
			align={align}
			typography={typography}
			colors={colors}
			border={border}
			htmlAnchor={node.attribs.id || ''}
			quote={quote}
			cite={citeText}
			borderColor={attributes.borderColor || ''}
		>
			{children}
		</Component>
	);
};

PullQuoteBlock.defaultProps = {
	test: (node) => {
		return isBlock(node, { tagName: 'figure', className: 'wp-block-pullquote' });
	},
};
