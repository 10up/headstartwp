import { Element } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { useBlock, useBlockAttributes } from './hooks';
import { Align, IBlockAttributes, Typography } from './types';

export interface GutenberQuoteProps extends IBlockAttributes {
	typography?: Typography;
	align?: Align;
	blockStyle?: string;
}

export interface QuoteBlockBlockProps extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<GutenberQuoteProps>;
}

export const QuoteBlock = ({
	domNode: node,
	children,
	component: Component,
}: QuoteBlockBlockProps) => {
	const { name, className } = useBlock<GutenberQuoteProps>(node);
	const { align, typography, blockStyle } = useBlockAttributes(node);

	return (
		<Component
			name={name}
			domNode={node}
			className={className}
			align={align}
			typography={typography}
			blockStyle={blockStyle}
			htmlAnchor={node.attribs.id || ''}
		>
			{children}
		</Component>
	);
};

QuoteBlock.defaultProps = {
	test: (node) => {
		return isBlock(node, { tagName: 'blockquote', className: 'wp-block-quote' });
	},
};
